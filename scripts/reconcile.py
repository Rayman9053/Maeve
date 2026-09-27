#!/usr/bin/env python3
"""Check that no node was deleted silently between two versions of the taxonomy.

Every node in OLD must satisfy one of:
  1. a node with the same name (case-insensitive) exists in NEW (kept, possibly moved), or
  2. its name appears in a `backticked` span in reports/changelog.md (renamed/merged/moved), or
  3. its name appears in a `backticked` span in reports/cut.md (cut, with a reason).

Inside a backticked span, " > " (a path) and " · " (a list) separate individual names.

It can also list the additions: NEW nodes whose name is neither in OLD nor mentioned in the
changelog's before/after columns. With --write-additions, that list replaces the block between
the ADDITIONS markers in reports/changelog.md.

Usage:
    python3 scripts/reconcile.py source/taxonomy-v0.md            # legacy markdown as OLD
    python3 scripts/reconcile.py old-taxonomy.yaml                # a previous YAML version as OLD
    python3 scripts/reconcile.py OLD --new taxonomy.yaml
    python3 scripts/reconcile.py OLD --additions [--write-additions]

Exits 1 and lists any unaccounted nodes.
"""
import argparse
import os
import re
import sys

from taxonomy_lib import ROOT_DIR, TAXONOMY_PATH, load, walk

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


def old_names(path):
    if path.endswith((".yaml", ".yml")):
        return [(n["name"], " > ".join(p)) for n, d, p in walk(load(path)) if d > 0]
    from audit_stats import parse  # legacy markdown parser
    root = parse(open(path, encoding="utf-8").read())

    def w(n):
        yield n
        for c in n["children"]:
            yield from w(c)
    return [(n["name"], " > ".join(n["path"])) for n in w(root) if n["depth"] > 0]


ADD_START, ADD_END = "<!-- ADDITIONS:START -->", "<!-- ADDITIONS:END -->"


def strip_additions(text):
    return re.sub(re.escape(ADD_START) + ".*?" + re.escape(ADD_END), "", text, flags=re.S)


def logged_names(*files):
    names = set()
    for f in files:
        if not os.path.exists(f):
            continue
        text = strip_additions(open(f, encoding="utf-8").read())
        for span in re.findall(r"`([^`]+)`", text):
            for part in re.split(r" > | · ", span):
                names.add(part.strip().lower())
    return names


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("old")
    ap.add_argument("--new", default=TAXONOMY_PATH)
    ap.add_argument("--additions", action="store_true", help="list new nodes not logged as renames")
    ap.add_argument("--write-additions", action="store_true", help="write that list into changelog.md")
    a = ap.parse_args()

    new_root = load(a.new)
    new = {n["name"].lower() for n, d, _ in walk(new_root) if d > 0}
    changelog = os.path.join(ROOT_DIR, "reports", "changelog.md")
    cut = os.path.join(ROOT_DIR, "reports", "cut.md")
    logged = logged_names(changelog, cut)

    if a.additions or a.write_additions:
        olds = {name.lower() for name, _ in old_names(a.old)}
        groups = {}
        for n, d, p in walk(new_root):
            if d > 0 and n["name"].lower() not in olds and n["name"].lower() not in logged:
                groups.setdefault(" › ".join(p[:-1]) or "(root)", []).append(n["name"])
        lines = [f"- **{parent}**: " + " · ".join(names) for parent, names in groups.items()]
        total = sum(len(v) for v in groups.values())
        block = f"{ADD_START}\n{total} added nodes.\n\n" + "\n".join(lines) + f"\n{ADD_END}"
        if a.write_additions:
            text = open(changelog, encoding="utf-8").read()
            text = re.sub(re.escape(ADD_START) + ".*?" + re.escape(ADD_END), lambda m: block, text, flags=re.S)
            open(changelog, "w", encoding="utf-8").write(text)
            print(f"wrote {total} additions to {changelog}")
        else:
            print(block)
        return 0

    missing, kept, logged_n = [], 0, 0
    for name, path in old_names(a.old):
        key = name.lower()
        if key in new:
            kept += 1
        elif key in logged:
            logged_n += 1
        else:
            missing.append(path)

    print(f"old nodes: {kept + logged_n + len(missing)} | kept by name: {kept} | "
          f"logged in changelog/cut: {logged_n} | UNACCOUNTED: {len(missing)}")
    for p in missing:
        print(f"  - {p}")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
