"""Shared helpers for loading and walking taxonomy.yaml."""
import os
import re

import yaml

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAXONOMY_PATH = os.path.join(ROOT_DIR, "taxonomy.yaml")

TAG_VOCAB = ("trending", "underserved", "regulated", "b2b", "consumer", "ai-native")
ALLOWED_KEYS = {"name", "note", "tags", "see", "children"}
MAX_DEPTH = 4
MIN_CHILDREN, MAX_CHILDREN = 3, 8
MIN_LEAVES = 2  # subcategories may hold 2-8 leaves since the v12 actionability prune
MAX_NAME_WORDS = 4
PATH_SEP = " > "
LEVELS = {0: "Root", 1: "Pillar", 2: "Category", 3: "Subcategory", 4: "Leaf"}


def load(path=TAXONOMY_PATH):
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def children(node):
    return node.get("children") or []


def walk(node, depth=0, path=()):
    """Yield (node, depth, path) depth-first. The root has depth 0 and an empty path."""
    yield node, depth, path
    for c in children(node):
        yield from walk(c, depth + 1, path + (c.get("name"),))


def path_str(path):
    return PATH_SEP.join(path)


def index_paths(root):
    """Map 'Pillar > Category > ...' to its node."""
    return {path_str(p): n for n, d, p in walk(root) if d > 0}


def name_words(name):
    return [w for w in re.split(r"\s+", name.strip()) if w not in ("&", "/")]


def norm(name):
    s = name.lower()
    s = re.sub(r"[’']s\b", "", s)
    s = re.sub(r"[^a-z0-9+ ]", " ", s)
    out = []
    for w in s.split():
        if len(w) > 3 and w.endswith("ies"):
            w = w[:-3] + "y"
        elif len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
            w = w[:-1]
        out.append(w)
    return " ".join(out)


def stats(root):
    """Summary numbers used by build.py and the handoff report."""
    nodes = [(n, d, p) for n, d, p in walk(root) if d > 0]
    by_depth = {d: sum(1 for _, dd, _ in nodes if dd == d) for d in range(1, MAX_DEPTH + 1)}
    pillars = []
    for pillar in children(root):
        sub = [(n, d) for n, d, _ in walk(pillar, 1)]
        term = [d for n, d in sub if not children(n)]
        pillars.append({
            "name": pillar["name"],
            "categories": len(children(pillar)),
            "nodes": len(sub),
            "terminal": len(term),
            "min_depth": min(term),
            "max_depth": max(term),
            "avg_depth": sum(term) / len(term),
            "trending": sum(1 for n, _ in sub if "trending" in (n.get("tags") or [])),
        })
    tag_counts = {t: sum(1 for n, _, _ in nodes if t in (n.get("tags") or [])) for t in TAG_VOCAB}
    xrefs = sum(len(n.get("see") or []) for n, _, _ in nodes)
    return {"total": len(nodes), "by_depth": by_depth, "pillars": pillars,
            "tags": tag_counts, "xrefs": xrefs}
