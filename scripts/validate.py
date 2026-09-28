#!/usr/bin/env python3
"""Validate taxonomy.yaml.

Usage:
    python3 scripts/validate.py            # errors -> exit 1; warnings are printed
    python3 scripts/validate.py --strict   # warnings also fail
    python3 scripts/validate.py path/to/other.yaml

Errors (must fix):
  - YAML does not parse / wrong types / unknown keys
  - missing or empty name; name longer than 4 words (excluding "&" and "/")
  - symbols or [tags] embedded in names
  - duplicate sibling names (case-insensitive)
  - depth > 4 (Pillar > Category > Subcategory > Leaf)
  - a non-leaf with fewer than 3 or more than 8 children (MIN_CHILDREN, MIN_LEAVES)
  - tags outside the vocabulary, repeated tags, a tag repeating an ancestor's tag,
    b2b and consumer on the same node
  - a solo-founder model other than `content` inside a `regulated` subtree
  - cross-references (see:) that don't resolve to exactly one node, or that point
    at the node itself or one of its ancestors
Warnings:
  - the same normalized name appears in more than one place in the tree
  - a category mixes subcategories with and without leaves
  - notes longer than 200 characters
"""
import argparse
import re
import sys
from collections import defaultdict

import yaml

from taxonomy_lib import (ALLOWED_KEYS, LEVELS, MAX_CHILDREN, MAX_DEPTH, MAX_NAME_WORDS,
                          MIN_CHILDREN, MIN_LEAVES, REGULATED_ONLY, SOLO_MODELS, TAG_VOCAB, TAXONOMY_PATH, children, index_paths,
                          name_words, norm, path_str, walk)

NAME_BAD_CHARS = re.compile(r"[\[\]{}#🔥⭐*!]")


def validate(root, min_leaves=MIN_LEAVES):
    """min_leaves: minimum children for a subcategory (depth 3); other levels use MIN_CHILDREN."""
    errors, warnings = [], []

    def err(path, msg):
        errors.append(f"{path_str(path) or '<root>'}: {msg}")

    def warn(path, msg):
        warnings.append(f"{path_str(path) or '<root>'}: {msg}")

    if not isinstance(root, dict) or "children" not in root:
        return ["<root>: top level must be a mapping with 'name' and 'children'"], []

    # Structural and per-node checks
    for node, depth, path in walk(root):
        if not isinstance(node, dict):
            err(path, f"node must be a mapping, got {type(node).__name__}")
            continue
        unknown = set(node) - ALLOWED_KEYS
        if unknown:
            err(path, f"unknown keys {sorted(unknown)}")
        name = node.get("name")
        if not isinstance(name, str) or not name.strip():
            err(path, "missing or empty 'name'")
            continue
        if name != name.strip():
            err(path, "name has leading/trailing whitespace")
        if depth > 0 and len(name_words(name)) > MAX_NAME_WORDS:
            err(path, f"name has {len(name_words(name))} words (max {MAX_NAME_WORDS})")
        if NAME_BAD_CHARS.search(name):
            err(path, "name contains tag/emoji/markup characters; use 'tags' instead")
        if "note" in node and not isinstance(node["note"], str):
            err(path, "'note' must be a string")
        elif len(node.get("note") or "") > 200:
            warn(path, f"note is {len(node['note'])} chars (keep notes short)")

        tags = node.get("tags")
        if tags is not None:
            if not isinstance(tags, list) or not all(isinstance(t, str) for t in tags):
                err(path, "'tags' must be a list of strings")
            else:
                for t in tags:
                    if t not in TAG_VOCAB:
                        err(path, f"unknown tag '{t}' (allowed: {', '.join(TAG_VOCAB)})")
                if len(set(tags)) != len(tags):
                    err(path, "duplicate tags")
                if "b2b" in tags and "consumer" in tags:
                    err(path, "node is tagged both b2b and consumer")

        see = node.get("see")
        if see is not None and (not isinstance(see, list) or not all(isinstance(s, str) for s in see)):
            err(path, "'see' must be a list of path strings")

        kids = node.get("children")
        if kids is not None and not isinstance(kids, list):
            err(path, "'children' must be a list")
            continue
        kids = kids or []
        if depth >= MAX_DEPTH and kids:
            err(path, f"depth {depth + 1} exceeds max depth {MAX_DEPTH}; promote or split instead")
        lo = min_leaves if depth == 3 else MIN_CHILDREN
        if kids and not (lo <= len(kids) <= MAX_CHILDREN):
            err(path, f"{LEVELS.get(depth, depth)} has {len(kids)} children "
                      f"(expected {lo}-{MAX_CHILDREN})")
        if depth in (1, 2) and not kids:
            err(path, f"{LEVELS[depth]} has no children")
        seen = {}
        for c in kids:
            if isinstance(c, dict) and isinstance(c.get("name"), str):
                key = c["name"].strip().lower()
                if key in seen:
                    err(path, f"duplicate sibling name '{c['name']}'")
                seen[key] = True

    if errors:  # later checks assume a well-formed tree
        return errors, warnings

    # Tag inheritance: a tag covers the subtree, so descendants must not repeat it
    def check_tags(node, inherited, path):
        own = set(node.get("tags") or [])
        for t in sorted(own & inherited):
            err(path, f"tag '{t}' repeats an ancestor's tag")
        if "regulated" in own | inherited:
            for t in sorted((own & set(SOLO_MODELS)) - REGULATED_ONLY):
                err(path, f"tag '{t}' is not allowed under 'regulated' (only {', '.join(sorted(REGULATED_ONLY))})")
        for c in children(node):
            check_tags(c, inherited | own, path + (c["name"],))
    check_tags(root, set(), ())

    # Cross-references
    index = index_paths(root)
    for node, depth, path in walk(root):
        for ref in node.get("see") or []:
            target = tuple(ref.split(" > "))
            if ref not in index:
                err(path, f"see: '{ref}' does not resolve to any node")
            elif target == path[:len(target)]:
                err(path, f"see: '{ref}' points at this node or one of its ancestors")

    # Warnings
    where = defaultdict(list)
    for node, depth, path in walk(root):
        if depth > 0:
            where[norm(node["name"])].append(path_str(path))
    for key, paths in sorted(where.items()):
        if len(paths) > 1:
            warnings.append(f"duplicate name '{key}' at: " + " | ".join(paths))
    for node, depth, path in walk(root):
        if depth == 2:
            with_leaves = [c for c in children(node) if children(c)]
            if with_leaves and len(with_leaves) != len(children(node)):
                warn(path, "mixes subcategories with and without leaves")

    return errors, warnings


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path", nargs="?", default=TAXONOMY_PATH)
    ap.add_argument("--strict", action="store_true", help="treat warnings as errors")
    args = ap.parse_args()
    try:
        with open(args.path, encoding="utf-8") as f:
            root = yaml.safe_load(f)
    except (OSError, yaml.YAMLError) as e:
        print(f"ERROR: could not parse {args.path}: {e}")
        return 1

    errors, warnings = validate(root)
    for w in warnings:
        print(f"WARN  {w}")
    for e in errors:
        print(f"ERROR {e}")
    total = sum(1 for _, d, _ in walk(root) if d > 0) if not errors else "?"
    print(f"\n{len(errors)} error(s), {len(warnings)} warning(s); {total} nodes checked.")
    if errors or (args.strict and warnings):
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
