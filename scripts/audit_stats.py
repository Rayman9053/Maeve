#!/usr/bin/env python3
"""Parse the legacy markdown taxonomy and print audit statistics.

Usage:
    python3 scripts/audit_stats.py source/taxonomy-v0.md          # markdown report
    python3 scripts/audit_stats.py source/taxonomy-v0.md --json   # parsed tree as JSON

Legacy format:
    ## Pillar
    ### Category [tag]
    - Subcategory [tag] (note): Leaf · Leaf · Leaf
    - Item · Item · Item          (each item is a subcategory with no leaves)

Depth convention: Pillar=1, Category=2, Subcategory=3, Leaf=4.
"""
import argparse
import difflib
import json
import re
import statistics
import sys
from collections import defaultdict

TAG_RE = re.compile(r"\[([^\]]+)\]")


def split_top(text, sep):
    """Split on `sep` only where not nested inside () or []."""
    parts, depth, buf, i = [], 0, "", 0
    while i < len(text):
        ch = text[i]
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        if depth == 0 and text.startswith(sep, i):
            parts.append(buf)
            buf = ""
            i += len(sep)
            continue
        buf += ch
        i += 1
    parts.append(buf)
    return [p.strip() for p in parts if p.strip()]


def parse_label(raw):
    """'Name [hot] [regulated] (note)' -> (name, tags, note)."""
    tags = TAG_RE.findall(raw)
    s = TAG_RE.sub("", raw)
    note = None
    m = re.search(r"\(([^()]*)\)\s*$", s)
    if m:
        note = m.group(1).strip()
        s = s[: m.start()]
    name = re.sub(r"\s+", " ", s).strip()
    return name, tags, note


def node(raw, depth, path):
    name, tags, note = parse_label(raw)
    return {"name": name, "raw": raw, "tags": tags, "note": note,
            "depth": depth, "path": path + [name], "children": []}


def parse(md_text):
    root = {"name": "ROOT", "depth": 0, "path": [], "children": []}
    pillar = category = None
    for line in md_text.splitlines():
        line = line.rstrip()
        if line.startswith("## "):
            pillar = node(line[3:], 1, [])
            root["children"].append(pillar)
            category = None
        elif line.startswith("### "):
            category = node(line[4:], 2, pillar["path"])
            pillar["children"].append(category)
        elif line.startswith("- ") and category is not None:
            body = line[2:].strip()
            head_tail = split_top(body, ": ")
            if len(head_tail) >= 2:
                head = head_tail[0]
                tail = ": ".join(head_tail[1:])
                sub = node(head, 3, category["path"])
                for leaf in split_top(tail, " · "):
                    sub["children"].append(node(leaf, 4, sub["path"]))
                category["children"].append(sub)
            else:
                for item in split_top(body, " · "):
                    category["children"].append(node(item, 3, category["path"]))
    return root


def walk(n):
    yield n
    for c in n["children"]:
        yield from walk(c)


def terminal_depths(n):
    return [d["depth"] for d in walk(n) if not d["children"]]


def norm(name):
    s = name.lower()
    s = re.sub(r"[’']s\b", "", s)
    s = re.sub(r"[^a-z0-9+ ]", " ", s)
    words = []
    for w in s.split():
        if len(w) > 3 and w.endswith("ies"):
            w = w[:-3] + "y"
        elif len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
            w = w[:-1]
        words.append(w)
    return " ".join(words)


def report(root):
    out = []
    allnodes = [n for n in walk(root) if n["depth"] > 0]
    out.append(f"**Total nodes (excl. root):** {len(allnodes)}\n")
    by_depth = defaultdict(int)
    for n in allnodes:
        by_depth[n["depth"]] += 1
    out.append("| Depth | Level | Count |\n|---|---|---|")
    for d, lbl in zip(range(1, 5), ["Pillar", "Category", "Subcategory", "Leaf"]):
        out.append(f"| {d} | {lbl} | {by_depth[d]} |")
    out.append("")

    out.append("### Per pillar\n")
    out.append("| Pillar | Categories | Total nodes | Terminal nodes | Min depth | Max depth | Avg depth |")
    out.append("|---|---|---|---|---|---|---|")
    for p in root["children"]:
        nodes = list(walk(p))
        td = terminal_depths(p)
        out.append(f"| {p['name']} | {len(p['children'])} | {len(nodes)} | {len(td)} | "
                   f"{min(td)} | {max(td)} | {statistics.mean(td):.2f} |")
    out.append("")

    out.append("### Per category (branch)\n")
    out.append("Depth = depth of terminal nodes (3 = flat list under category, 4 = has leaves).\n")
    out.append("| Pillar | Category | Direct children | Total nodes | Min | Max | Avg |")
    out.append("|---|---|---|---|---|---|---|")
    for p in root["children"]:
        for c in p["children"]:
            td = terminal_depths(c)
            out.append(f"| {p['name']} | {c['name']} | {len(c['children'])} | {len(list(walk(c)))} | "
                       f"{min(td)} | {max(td)} | {statistics.mean(td):.2f} |")
    out.append("")

    out.append("### Child-count outliers (target 3–8)\n")
    out.append("| Node | Depth | Children |\n|---|---|---|")
    for n in allnodes:
        k = len(n["children"])
        if n["children"] and (k < 3 or k > 8):
            out.append(f"| {' > '.join(n['path'])} | {n['depth']} | {k} |")
    out.append("")

    out.append("### Exact duplicates (normalized name)\n")
    groups = defaultdict(list)
    for n in allnodes:
        groups[norm(n["name"])].append(n)
    for k, ns in sorted(groups.items()):
        if len(ns) > 1:
            out.append(f"- **{k}**: " + " | ".join(" > ".join(n["path"]) for n in ns))
    out.append("")

    out.append("### Near-duplicate candidates (similarity ≥ 0.8, different paths)\n")
    names = [(norm(n["name"]), n) for n in allnodes]
    seen = set()
    for i, (a, na) in enumerate(names):
        for b, nb in names[i + 1:]:
            if a == b or (a, b) in seen:
                continue
            r = difflib.SequenceMatcher(None, a, b).ratio()
            if r >= 0.8:
                seen.add((a, b))
                out.append(f"- {r:.2f}: {' > '.join(na['path'])} ~ {' > '.join(nb['path'])}")
    out.append("")

    out.append("### Child repeats parent word\n")
    for n in allnodes:
        if n["depth"] < 2:
            continue
        parent_words = {w for w in norm(n["path"][-2]).split() if len(w) > 3}
        own = set(norm(n["name"]).split())
        if parent_words & own:
            out.append(f"- {' > '.join(n['path'][-2:])}")
    out.append("")

    out.append("### Long names (> 4 words, excluding notes/tags)\n")
    for n in allnodes:
        if len(n["name"].split()) > 4:
            out.append(f"- ({len(n['name'].split())}w) {' > '.join(n['path'])}")
    out.append("")

    out.append("### Tag usage\n")
    tags = defaultdict(int)
    for n in allnodes:
        for t in n["tags"]:
            tags[t] += 1
    for t, c in sorted(tags.items(), key=lambda x: -x[1]):
        out.append(f"- `{t}`: {c}")
    out.append("")
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("path")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    root = parse(open(a.path, encoding="utf-8").read())
    if a.json:
        json.dump(root, sys.stdout, indent=1, ensure_ascii=False)
    else:
        print(report(root))


if __name__ == "__main__":
    main()
