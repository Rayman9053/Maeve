#!/usr/bin/env python3
"""Actionability prune: move low-scoring leaves from taxonomy.yaml to taxonomy-archive.yaml.

Scores live in data/actionability.csv (path,score), one row per leaf, 1-5:
  5  venture-scale, product-shaped market; clear buyer; active 2024-26 company formation
  4  clear product/service a startup can build and sell; proven demand
  3  actionable but niche, services-heavy, local, slow-selling or regulation-heavy
  2  weak as a startup market: a condition/activity/topic label rather than a product,
     or dominated by incumbents or free content
  1  not realistically startup-actionable

Structural fixes for subcategories that would be left too thin are declared in
data/prune-resolution.yaml (folds, merges, and the post-prune minimum leaves per subcategory).

Usage:
    python3 scripts/prune.py --check      # every leaf scored, no stale rows
    python3 scripts/prune.py --preview    # simulate everything; write reports/prune-preview.md; change nothing
    python3 scripts/prune.py --apply      # write taxonomy.yaml + taxonomy-archive.yaml (only after approval)
    python3 scripts/prune.py --threshold 2
"""
import argparse
import copy
import csv
import os
import sys
from collections import Counter

import yaml

from taxonomy_lib import ROOT_DIR, TAXONOMY_PATH, children, load, path_str, stats, walk
from validate import validate

SCORES_PATH = os.path.join(ROOT_DIR, "data", "actionability.csv")
RESOLUTION_PATH = os.path.join(ROOT_DIR, "data", "prune-resolution.yaml")
ARCHIVE_PATH = os.path.join(ROOT_DIR, "taxonomy-archive.yaml")
PREVIEW_PATH = os.path.join(ROOT_DIR, "reports", "prune-preview.md")
SEP = " > "


def load_scores():
    with open(SCORES_PATH, encoding="utf-8") as f:
        return {row["path"]: int(row["score"]) for row in csv.DictReader(f)}


def check(root, scores):
    leaves = {path_str(p) for n, d, p in walk(root) if d == 4}
    return (sorted(leaves - set(scores)), sorted(set(scores) - leaves),
            sorted(p for p, s in scores.items() if s not in (1, 2, 3, 4, 5)))


def find(root, path):
    node = root
    for name in path.split(SEP):
        node = next(c for c in children(node) if c["name"] == name)
    return node


def simulate(root, scores, threshold, resolution):
    """Return (new_root, archive_root, report) without touching disk."""
    new = copy.deepcopy(root)
    archive = {"name": "Startup Opportunity Map (archive)",
               "note": "Leaves moved out of taxonomy.yaml by the actionability prune (score <= "
                       f"{threshold}). Scores: data/actionability.csv.",
               "children": []}
    moved, remap = [], {}          # remap: old path -> new path (None = archived)

    def arch_container(parent, name, template):
        for c in parent["children"]:
            if c["name"] == name:
                return c
        c = {k: v for k, v in template.items() if k in ("name", "note", "tags")}
        c["children"] = []
        parent["children"].append(c)
        return c

    # 1. split leaves
    for pillar in children(new):
        for cat in children(pillar):
            for sub in children(cat):
                keep = []
                for leaf in children(sub):
                    p = SEP.join((pillar["name"], cat["name"], sub["name"], leaf["name"]))
                    if scores[p] <= threshold:
                        ap = arch_container(archive, pillar["name"], pillar)
                        ac = arch_container(ap, cat["name"], cat)
                        asub = arch_container(ac, sub["name"], sub)
                        asub["children"].append(leaf)
                        moved.append((p, scores[p]))
                        remap[p] = None
                    else:
                        keep.append(leaf)
                sub["children"] = keep

    folds_done, merges_done, renames = [], [], []

    # 2. merges
    for m in resolution.get("merges", []):
        cat = find(new, m["category"])
        leaves, first_idx = [], None
        for src in m["from"]:
            sub = find(new, src)
            idx = cat["children"].index(sub)
            first_idx = idx if first_idx is None else min(first_idx, idx)
            for leaf in sub["children"]:
                remap[src + SEP + leaf["name"]] = m["category"] + SEP + m["name"] + SEP + leaf["name"]
                leaves.append(leaf)
            remap[src] = m["category"] + SEP + m["name"]
        cat["children"] = [c for c in cat["children"] if SEP.join((m["category"], c["name"])) not in m["from"]]
        cat["children"].insert(first_idx, {"name": m["name"], "children": leaves})
        merges_done.append((m, [l["name"] for l in leaves]))

    # 3. folds
    for f in resolution.get("folds", []):
        src, dst = find(new, f["from"]), find(new, f["to"])
        src_cat = find(new, f["from"].rsplit(SEP, 1)[0])
        dst_path = f["to"]
        if f.get("rename_to"):
            new_dst = dst_path.rsplit(SEP, 1)[0] + SEP + f["rename_to"]
            for leaf in dst["children"]:
                remap[dst_path + SEP + leaf["name"]] = new_dst + SEP + leaf["name"]
            remap[dst_path] = new_dst
            renames.append((dst["name"], f["rename_to"]))
            dst["name"] = f["rename_to"]
            dst_path = new_dst
        survivors = [l["name"] for l in src["children"]]
        for leaf in src["children"]:
            remap[f["from"] + SEP + leaf["name"]] = dst_path + SEP + leaf["name"]
        dst["children"].extend(src["children"])
        src_cat["children"].remove(src)
        remap[f["from"]] = None  # dissolved: refs to the subcategory itself are dropped
        folds_done.append((f, survivors, dst_path))

    # 4. drop emptied subcategories
    emptied = []
    for pillar in children(new):
        for cat in children(pillar):
            for sub in list(children(cat)):
                if not sub["children"]:
                    emptied.append(SEP.join((pillar["name"], cat["name"], sub["name"])))
                    remap[emptied[-1]] = None
                    cat["children"].remove(sub)

    # 5. tags: a moved node must not repeat a tag its new ancestors already carry
    tag_changes = []

    def dedupe(node, inherited, path):
        own = node.get("tags") or []
        dup = [t for t in own if t in inherited]
        if dup:
            node["tags"] = [t for t in own if t not in inherited]
            if not node["tags"]:
                del node["tags"]
            tag_changes.append((path_str(path), dup))
        for c in children(node):
            dedupe(c, inherited | set(own), path + (c["name"],))
    dedupe(new, set(), ())

    # 6. cross-references
    xref_changes = []

    def resolve(ref):
        if ref in remap:
            return remap[ref]
        # a ref may point inside a remapped subtree
        for old, new_p in remap.items():
            if new_p and ref.startswith(old + SEP):
                return new_p + ref[len(old):]
        return ref

    for node, d, p in walk(new):
        if node.get("see"):
            out = []
            for ref in node["see"]:
                r = resolve(ref)
                if r != ref:
                    xref_changes.append((path_str(p), ref, r))
                if r:
                    out.append(r)
            if out:
                node["see"] = out
            else:
                del node["see"]

    errors, warnings = validate(new, min_leaves=resolution.get("min_subcategory_children", 3))
    return new, archive, {"moved": moved, "folds": folds_done, "merges": merges_done,
                          "renames": renames, "emptied": emptied, "xrefs": xref_changes, "tags": tag_changes,
                          "errors": errors, "warnings": warnings}


def fmt(items):
    return ", ".join(f"{name} ({sc})" for name, sc in items)


def preview_md(root, new, rep, scores, threshold, resolution):
    dist = Counter(scores.values())
    total = sum(dist.values())
    before, after = stats(root), stats(new)
    L = ["# Prune preview (nothing has been changed yet)", "",
         f"Leaves scoring **≤ {threshold}** move to `taxonomy-archive.yaml`. "
         "Scores are in `data/actionability.csv`; the rubric is in `scripts/prune.py`. "
         "The structural plan is in `data/prune-resolution.yaml`.", "",
         "## Scores", "", "| Score | Meaning | Leaves | Share |", "|---|---|---|---|"]
    meaning = {5: "venture-scale, clear buyer, active formation", 4: "clear product and buyer",
               3: "niche / services / slow or regulated", 2: "label, not a product; incumbent- or content-dominated",
               1: "not realistically startup-actionable"}
    for sc in (5, 4, 3, 2, 1):
        L.append(f"| {sc} | {meaning[sc]} | {dist[sc]} | {100 * dist[sc] / total:.0f}% |")
    L += ["", "## Before → after", "", "| | Now | After prune |", "|---|---|---|",
          f"| Total nodes | {before['total']:,} | {after['total']:,} |",
          f"| Leaves | {before['by_depth'][4]:,} | {after['by_depth'][4]:,} |",
          f"| Subcategories | {before['by_depth'][3]} | {after['by_depth'][3]} |",
          f"| Categories | {before['by_depth'][2]} | {after['by_depth'][2]} |",
          f"| Pillars | {before['by_depth'][1]} | {after['by_depth'][1]} |",
          f"| Leaves moved to archive | — | {len(rep['moved'])} |", "",
          "| Pillar | Leaves now | Moving | Remaining |", "|---|---|---|---|"]
    for pb, pa in zip(before["pillars"], after["pillars"]):
        now = sum(1 for n, d, p in walk(root) if d == 4 and p[0] == pb["name"])
        rem = sum(1 for n, d, p in walk(new) if d == 4 and p[0] == pa["name"])
        L.append(f"| {pb['name']} | {now} | {now - rem} | {rem} |")

    v = "passes" if not rep["errors"] else f"FAILS ({len(rep['errors'])} errors)"
    L += ["", f"**Simulated result {v} validation** (with subcategories allowed "
              f"{resolution.get('min_subcategory_children', 3)}–8 leaves).", ""]
    for e in rep["errors"]:
        L.append(f"- ERROR {e}")

    L += ["## Structural changes this requires", "",
          f"### Subcategories that move entirely ({len(rep['emptied'])})", "",
          "Every leaf scored ≤ 2, so the subcategory itself goes to the archive.", ""]
    for e in rep["emptied"]:
        L.append(f"- {e}")
    L += ["", f"### Merged ({len(rep['merges'])})", ""]
    for m, names in rep["merges"]:
        L.append(f"- **{m['name']}** ← " + " + ".join(x.rsplit(SEP, 1)[1] for x in m["from"])
                 + f": {', '.join(names)}")
    L += ["", f"### Folded into a sibling ({len(rep['folds'])})", "",
          "These subcategories would keep only one leaf, so the survivor moves and the subcategory dissolves.", "",
          "| Dissolved subcategory | Survivor | Moves to |", "|---|---|---|"]
    for f, surv, dst in rep["folds"]:
        L.append(f"| {f['from'].split(SEP, 2)[2]} | {', '.join(surv)} | {dst.split(SEP, 1)[1]} |")
    if rep["renames"]:
        L += ["", "Renamed to fit their new contents: " + "; ".join(f"`{a}` → `{b}`" for a, b in rep["renames"]) + "."]
    two = [(p, n) for n, d, p in walk(new) if d == 3 and len(children(n)) == 2]
    L += ["", f"### Left with 2 leaves ({len(two)})", "",
          "Allowed under the relaxed rule. The alternative is keeping some 2-scored leaves to pad them back to 3.", ""]
    for p, n in two:
        L.append(f"- {SEP.join(p[1:])}: {', '.join(c['name'] for c in children(n))}")
    if rep["tags"]:
        L += ["", f"### Tags dropped because the new parent already carries them ({len(rep['tags'])})", ""]
        for at, dup in rep["tags"]:
            L.append(f"- {at}: {', '.join(dup)}")
    if rep["xrefs"]:
        L += ["", f"### Cross-references updated ({len(rep['xrefs'])})", ""]
        for at, old, new_ref in rep["xrefs"]:
            L.append(f"- at {at}: `{old}` → " + (f"`{new_ref}`" if new_ref else "removed (target archived)"))

    L += ["", f"## Every leaf that would move ({len(rep['moved'])})", ""]
    by_sub = {}
    for p, sc in rep["moved"]:
        sub, leaf = p.rsplit(SEP, 1)
        by_sub.setdefault(sub, []).append((leaf, sc))
    cur_pillar = None
    for sub, items in by_sub.items():
        pillar = sub.split(SEP)[0]
        if pillar != cur_pillar:
            L += ["", f"### {pillar}", ""]
            cur_pillar = pillar
        L.append(f"- {sub.split(SEP, 1)[1]}: {fmt(items)}")
    return "\n".join(L) + "\n"


def dump(path, root, header):
    with open(path, "w", encoding="utf-8") as f:
        f.write(header)
        yaml.safe_dump(root, f, sort_keys=False, allow_unicode=True, width=120)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--threshold", type=int, default=2)
    a = ap.parse_args()

    root = load(TAXONOMY_PATH)
    scores = load_scores()
    missing, stale, bad = check(root, scores)
    if missing or stale or bad:
        for label, items in (("unscored leaf", missing), ("stale score row", stale), ("invalid score", bad)):
            for i in items:
                print(f"ERROR {label}: {i}")
        return 1
    if a.check:
        print(f"OK: {len(scores)} leaves scored")
        return 0

    with open(RESOLUTION_PATH, encoding="utf-8") as f:
        resolution = yaml.safe_load(f)
    new, archive, rep = simulate(root, scores, a.threshold, resolution)

    if a.preview:
        with open(PREVIEW_PATH, "w", encoding="utf-8") as f:
            f.write(preview_md(root, new, rep, scores, a.threshold, resolution))
        print(f"wrote {os.path.relpath(PREVIEW_PATH, ROOT_DIR)}: {len(rep['moved'])} leaves move; "
              f"{len(rep['emptied'])} subcategories emptied, {len(rep['merges'])} merged, "
              f"{len(rep['folds'])} folded; validation "
              f"{'OK' if not rep['errors'] else str(len(rep['errors'])) + ' errors'}")
        return 0 if not rep["errors"] else 1

    if a.apply:
        if rep["errors"]:
            print("Refusing to apply: simulated result fails validation. Run --preview.")
            return 1
        print("Apply writes taxonomy.yaml in normalized YAML formatting; see README before running.")
        return 1

    ap.print_help()
    return 0


if __name__ == "__main__":
    sys.exit(main())
