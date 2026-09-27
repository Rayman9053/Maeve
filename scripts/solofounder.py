#!/usr/bin/env python3
"""Solo-founder view: the part of taxonomy.yaml a single founder with little capital could start.

Each leaf is labelled in data/solo-founder.csv (path,models) with zero or more business models,
space-separated. A leaf gets a model only if one person could launch it that way within a few
months, for under about $10k, without a professional license or regulatory approval:

  service-business   sell your own time or a small team's: coaching, consulting, agency,
                     done-for-you, local and concierge services
  content            an audience actively seeks information or community on the topic:
                     newsletter, course, community, templates, media
  marketplace        fragmented supply and demand to match, with no inventory or license:
                     niche directories and two-sided marketplaces on off-the-shelf tools
  no-code-friendly   an MVP a non-engineer can ship with no-code tools and AI APIs; excludes
                     hardware, deep tech, infrastructure, money movement and clinical data

Rule enforced by --check: a leaf inside a `regulated` subtree may only be labelled `content`
(writing about a regulated topic is fine; practising it needs a license).

Labels live outside taxonomy.yaml because they describe one audience's constraints, not the market.
scripts/build.py builds output/mindmap-solofounder.html from this view.

Usage:
    python3 scripts/solofounder.py --check    # every leaf labelled, no stale rows, rule holds
    python3 scripts/solofounder.py            # print the view's counts
"""
import argparse
import csv
import os
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from taxonomy_lib import ROOT_DIR, children, load, path_str, walk  # noqa: E402

LABELS_PATH = os.path.join(ROOT_DIR, "data", "solo-founder.csv")
MODELS = {  # model -> badge shown in the view
    "service-business": "🛠️",
    "content": "✍️",
    "marketplace": "🤝",
    "no-code-friendly": "🧩",
}


def load_labels(path=LABELS_PATH):
    with open(path, encoding="utf-8") as f:
        return {r["path"]: r["models"].split() for r in csv.DictReader(f)}


def write_labels(rows, path=LABELS_PATH):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["path", "models"])
        for p, models in rows:
            w.writerow([p, " ".join(m for m in MODELS if m in models)])


def leaves(root):
    """(node, path, inherited tags) for every leaf."""
    out = []

    def rec(node, path, inherited):
        tags = inherited | set(node.get("tags") or [])
        if not children(node) and path:
            out.append((node, path, tags))
        for c in children(node):
            rec(c, path + (c["name"],), tags)
    rec(root, (), set())
    return out


def check(root, labels):
    problems = []
    paths = set()
    for node, path, tags in leaves(root):
        p = path_str(path)
        paths.add(p)
        if p not in labels:
            problems.append(f"unlabelled leaf: {p}")
            continue
        for m in labels[p]:
            if m not in MODELS:
                problems.append(f"unknown model '{m}': {p}")
        if "regulated" in tags and set(labels[p]) - {"content"}:
            problems.append(f"regulated leaf may only be 'content': {p}")
    problems += [f"stale row (no such leaf): {p}" for p in sorted(set(labels) - paths)]
    return problems


def view(root, labels):
    """Copy of the tree keeping only labelled leaves (models attached) and their ancestors."""
    def rec(node, path):
        if not children(node):
            models = labels.get(path_str(path)) or []
            return dict(node, models=models) if models else None
        kept = [k for k in (rec(c, path + (c["name"],)) for c in children(node)) if k]
        if not kept and path:
            return None
        return dict(node, children=kept)
    return rec(root, ())


def summary(v):
    counts = Counter(m for n, _, _ in walk(v) for m in n.get("models") or [])
    n_leaves = sum(1 for n, _, _ in walk(v) if "models" in n)
    return n_leaves, counts


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true")
    a = ap.parse_args()
    root, labels = load(), load_labels()
    problems = check(root, labels)
    for p in problems:
        print(p)
    if a.check:
        print("OK" if not problems else f"{len(problems)} problem(s)")
        return 1 if problems else 0
    v = view(root, labels)
    n, counts = summary(v)
    total = len(leaves(root))
    print(f"{n} of {total} leaves in the solo-founder view ({n / total:.0%})")
    for m, badge in MODELS.items():
        print(f"  {badge} {m}: {counts[m]}")
    for pillar in children(v):
        print(f"  {pillar['name']}: {sum(1 for x, _, _ in walk(pillar) if 'models' in x)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
