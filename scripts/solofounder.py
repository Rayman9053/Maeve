#!/usr/bin/env python3
"""Solo-founder view: the part of taxonomy.yaml a single founder with little capital could start.

Four tags in taxonomy.yaml mark the business models a node can be started as. A node gets a model
only if one person could launch it that way within a few months, for under about $10k, without a
professional license or regulatory approval:

  service-business   sell your own time or a small team's: coaching, consulting, agency,
                     done-for-you, local and concierge services
  content            an audience actively seeks information or community on the topic:
                     newsletter, course, community, templates, media
  marketplace        fragmented supply and demand to match, with no inventory or license:
                     niche directories and two-sided marketplaces on off-the-shelf tools
  no-code-friendly   an MVP a non-engineer can ship with no-code tools and AI APIs; excludes
                     hardware, deep tech, infrastructure, money movement and clinical data

Like every tag, a model tag covers its subtree. Inside a `regulated` subtree only `content` is
allowed (writing about a regulated topic is fine; practising it needs a license); validate.py
enforces this.

scripts/build.py builds output/mindmap-solofounder.html from view(). Run this script alone for counts.
"""
import os
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from taxonomy_lib import SOLO_MODELS, children, load, walk  # noqa: E402

BADGES = dict(zip(SOLO_MODELS, ("🛠️", "✍️", "🤝", "🧩")))


def view(root):
    """Copy of the tree keeping only leaves with a model tag (own or inherited) and their ancestors.
    Kept leaves carry `models`, the full list of models that apply to them."""
    def rec(node, inherited):
        here = inherited + [t for t in node.get("tags") or [] if t in SOLO_MODELS and t not in inherited]
        if not children(node):
            models = [m for m in SOLO_MODELS if m in here]
            return dict(node, models=models) if models else None
        kept = [k for k in (rec(c, here) for c in children(node)) if k]
        return dict(node, children=kept) if kept else None
    return rec(root, []) or dict(root, children=[])


def summary(v):
    """(leaves in the view, Counter of models across those leaves)."""
    kept = [n for n, _, _ in walk(v) if "models" in n]
    return len(kept), Counter(m for n in kept for m in n["models"])


def main():
    root = load()
    v = view(root)
    n, counts = summary(v)
    total = sum(1 for x, d, _ in walk(root) if d > 0 and not children(x))
    print(f"{n} of {total} leaves in the solo-founder view ({n / total:.0%})")
    for m, badge in BADGES.items():
        print(f"  {badge} {m}: {counts[m]}")
    for pillar in children(v):
        print(f"  {pillar['name']}: {sum(1 for x, _, _ in walk(pillar) if 'models' in x)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
