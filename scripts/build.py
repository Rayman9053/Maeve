#!/usr/bin/env python3
"""Build every mindmap output from taxonomy.yaml.

Usage:
    python3 scripts/build.py              # validate, then build everything
    python3 scripts/build.py --no-html    # skip the Markmap HTML (no Node/npx needed)

Outputs (all regenerated; never edit by hand):
    output/mindmap-full.html        interactive Markmap, all levels, self-contained
    output/mindmap-condensed.html   interactive Markmap, pillars + categories only
    output/mindmap.mmd              Mermaid mindmap, all levels
    output/mindmap-condensed.mmd    Mermaid mindmap, pillars + categories (Mermaid struggles past ~150 nodes)
    output/mindmap.mm               FreeMind XML (imports into XMind / FreeMind / Freeplane)
    output/mindmap.opml             OPML outline (Workflowy / Dynalist)
    output/taxonomy.md              indented markdown with notes, tags and cross-references
    output/mindmap-solofounder.html interactive Markmap of the solo-founder, low-capital view
                                    (leaves labelled in data/solo-founder.csv; see scripts/solofounder.py)
    output/markmap-*.md             Markmap sources for the HTML files
    reports/stats.md                current stats
"""
import argparse
import html
import os
import shutil
import subprocess
import sys
from xml.sax.saxutils import escape, quoteattr

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from taxonomy_lib import ROOT_DIR, TAG_VOCAB, children, load, path_str, stats, walk  # noqa: E402
from validate import validate  # noqa: E402
import solofounder  # noqa: E402

OUT = os.path.join(ROOT_DIR, "output")
MARKMAP_CLI = "markmap-cli@0.18.12"  # pinned for reproducible output
FIRE = "🔥"

# One color per pillar, in pillar order. Hues are spaced so neighbours stay distinct.
PALETTE = ["#1B9E77", "#1F78B4", "#C99A06", "#D63A7A", "#7570B3", "#E0620D", "#4A5A70", "#5E9E1E"]

GENERATED = "Generated from taxonomy.yaml by scripts/build.py. Do not edit; edit the YAML and rebuild."


def is_trending(node):
    return "trending" in (node.get("tags") or [])


def label(node, fire=True):
    return node["name"] + (f" {FIRE}" if fire and is_trending(node) else "")


def pillar_colors(root):
    return {p["name"]: PALETTE[i % len(PALETTE)] for i, p in enumerate(children(root))}


# ─────────────────────────────────────────────── Markmap (HTML)

def markmap_md(root, max_depth, title, expand_level, header=None):
    # Markmap hands the first color to the root node, so lead with a neutral grey.
    colors = ["#8A8F98"] + [PALETTE[i % len(PALETTE)] for i in range(len(children(root)))]
    s = stats(root)
    lines = [
        "---",
        f"title: \"{title}\"",
        "markmap:",
        "  colorFreezeLevel: 2",
        "  color: [" + ", ".join(f'"{c}"' for c in colors) + "]",
        f"  initialExpandLevel: {expand_level}",
        "  maxWidth: 300",
        "  spacingVertical: 6",
        "---",
        "",
        f"# {root['name']}<br><small>" + (header or f"{FIRE} trending · ↗ cross-reference · {s['total']:,} nodes")
        + " · click to expand, hover for notes</small>",
        "",
    ]

    def tooltip(node):
        bits = []
        if node.get("note"):
            bits.append(node["note"])
        other = [t for t in node.get("tags") or [] if t != "trending"]
        if other:
            bits.append("Tags: " + ", ".join(other))
        if node.get("models"):
            bits.append("Solo-founder models: " + ", ".join(node["models"]))
        for ref in node.get("see") or []:
            bits.append("See also: " + ref)
        return " | ".join(bits)

    def text(node):
        badges = "".join(solofounder.MODELS[m] for m in node.get("models") or [])
        t = html.escape(label(node), quote=False) + (f" {badges}" if badges else "")
        tip = tooltip(node)
        if tip:
            marker = " ↗" if node.get("see") else ""
            t = f'<span title="{html.escape(tip, quote=True)}">{t}{marker}</span>'
        return t

    for node, depth, _ in walk(root):
        if depth == 0 or depth > max_depth:
            continue
        if depth <= 2:
            lines.append(f"{'#' * (depth + 1)} {text(node)}")
        else:
            lines.append(f"{'  ' * (depth - 3)}- {text(node)}")
    return "\n".join(lines) + "\n"


def build_html(md_path, html_path):
    npx = shutil.which("npx")
    if not npx:
        raise RuntimeError("npx not found; install Node.js 18+ or run with --no-html")
    cmd = [npx, "-y", MARKMAP_CLI, "--offline", "--no-open", "-o", html_path, md_path]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


# ─────────────────────────────────────────────── Mermaid

def mermaid_text(name):
    # Brackets and parentheses are shape delimiters in Mermaid mindmaps; swap in look-alikes.
    for a, b in (("(", "❨"), (")", "❩"), ("[", "⟦"), ("]", "⟧"), ("{", "❴"), ("}", "❵"), ('"', "'")):
        name = name.replace(a, b)
    return name


def mermaid(root, max_depth):
    lines = ["mindmap", f"  root(({mermaid_text(root['name'])}))"]
    for node, depth, _ in walk(root):
        if 0 < depth <= max_depth:
            lines.append("  " * (depth + 1) + mermaid_text(label(node)))
    return "\n".join(lines) + "\n"


# ─────────────────────────────────────────────── FreeMind

def freemind(root):
    colors = pillar_colors(root)
    ids = {}
    counter = [0]

    def assign(node, path):
        ids[path_str(path)] = f"ID_{counter[0]}"
        counter[0] += 1
        for c in children(node):
            assign(c, path + (c["name"],))
    assign(root, ())

    out = ['<map version="1.0.1">',
           f"<!-- {escape(GENERATED)} -->"]

    def emit(node, depth, path, color, indent):
        pad = "  " * indent
        attrs = [f'TEXT={quoteattr(label(node))}', f'ID="{ids[path_str(path)]}"']
        if depth == 1:
            attrs.append(f'POSITION="{"right" if list(colors).index(node["name"]) % 2 == 0 else "left"}"')
            attrs.append(f'COLOR="#ffffff" BACKGROUND_COLOR="{color}"')
        elif color:
            attrs.append(f'COLOR="{color}"')
        if depth >= 2 and children(node):
            attrs.append('FOLDED="true"')
        out.append(f"{pad}<node {' '.join(attrs)}>")
        if depth == 1:
            out.append(f'{pad}  <font BOLD="true" NAME="SansSerif" SIZE="14"/>')
        if color:
            out.append(f'{pad}  <edge COLOR="{color}" WIDTH="{2 if depth <= 2 else 1}"/>')
        if is_trending(node):
            out.append(f'{pad}  <icon BUILTIN="launch"/>')
        for ref in node.get("see") or []:
            if ref in ids:
                out.append(f'{pad}  <arrowlink DESTINATION="{ids[ref]}" ENDARROW="Default" '
                           f'STARTARROW="None" COLOR="#999999"/>')
        tags = node.get("tags") or []
        if tags:
            out.append(f'{pad}  <attribute NAME="tags" VALUE={quoteattr(", ".join(tags))}/>')
        note_bits = [node["note"]] if node.get("note") else []
        note_bits += [f"See also: {r}" for r in node.get("see") or []]
        if note_bits:
            body = "".join(f"<p>{escape(b)}</p>" for b in note_bits)
            out.append(f'{pad}  <richcontent TYPE="NOTE"><html><head></head><body>{body}</body></html></richcontent>')
        for c in children(node):
            emit(c, depth + 1, path + (c["name"],), color or colors.get(c["name"]), indent + 1)
        out.append(f"{pad}</node>")

    emit(root, 0, (), None, 0)
    out.append("</map>")
    return "\n".join(out) + "\n"


# ─────────────────────────────────────────────── OPML

def opml(root):
    out = ['<?xml version="1.0" encoding="UTF-8"?>', '<opml version="2.0">',
           f"  <head><title>{escape(root['name'])}</title></head>", "  <body>",
           f"  <!-- {escape(GENERATED)} -->"]

    def emit(node, indent):
        pad = "  " * indent
        text = node["name"] + "".join(f" #{t}" for t in node.get("tags") or [])
        note = [node["note"]] if node.get("note") else []
        note += [f"See also: {r}" for r in node.get("see") or []]
        attrs = f"text={quoteattr(text)}" + (f" _note={quoteattr(' | '.join(note))}" if note else "")
        kids = children(node)
        if not kids:
            out.append(f"{pad}<outline {attrs}/>")
            return
        out.append(f"{pad}<outline {attrs}>")
        for c in kids:
            emit(c, indent + 1)
        out.append(f"{pad}</outline>")

    emit(root, 2)
    out += ["  </body>", "</opml>"]
    return "\n".join(out) + "\n"


# ─────────────────────────────────────────────── Markdown

def anchor(name):
    return "".join(ch for ch in name.lower().replace(" ", "-") if ch.isalnum() or ch == "-")


def markdown(root):
    s = stats(root)
    lines = [f"# {root['name']}", "", f"> {GENERATED}", "",
             root.get("note", ""), "",
             f"**{s['total']:,} nodes**: {s['by_depth'][1]} pillars · {s['by_depth'][2]} categories · "
             f"{s['by_depth'][3]} subcategories · {s['by_depth'][4]} leaves.", "",
             "Legend: " + FIRE + " trending · tags in `code` · ↗ = cross-reference to where a topic lives.", "",
             "## Pillars", ""]
    for i, p in enumerate(children(root), 1):
        lines.append(f"{i}. [{p['name']}](#{anchor(p['name'])}): {len(children(p))} categories")
    lines.append("")

    def head(node):
        tags = [x for x in node.get("tags") or [] if x != "trending"]
        return label(node) + "".join(f" `{x}`" for x in tags)

    def note(node):
        return f": *{node['note']}*" if node.get("note") else ""

    def see(node, pad):
        return [f"{pad}↗ *see* {r}" for r in node.get("see") or []]

    for node, depth, _ in walk(root):
        if depth in (1, 2):
            lines += (["---", "", f"## {head(node)}"] if depth == 1 else ["", f"### {head(node)}"]) + [""]
            extra = ([f"*{node['note']}*"] if node.get("note") else []) + see(node, "")
            if extra:
                lines += [x + "  " for x in extra] + [""]
        elif depth == 3:
            lines.append(f"- **{label(node)}**" + "".join(
                f" `{x}`" for x in node.get("tags") or [] if x != "trending") + note(node))
            lines += see(node, "  - ")
        elif depth == 4:
            lines.append(f"  - {head(node)}{note(node)}")
            lines += see(node, "    - ")
    return "\n".join(lines) + "\n"


def stats_md(root):
    s = stats(root)
    lines = ["# Taxonomy stats", "", f"> {GENERATED}", "",
             f"**Total nodes:** {s['total']:,} "
             f"({s['by_depth'][1]} pillars · {s['by_depth'][2]} categories · "
             f"{s['by_depth'][3]} subcategories · {s['by_depth'][4]} leaves)", "",
             "| Pillar | Categories | Nodes | Terminal | Min depth | Max depth | Avg depth | Trending |",
             "|---|---|---|---|---|---|---|---|"]
    for p in s["pillars"]:
        lines.append(f"| {p['name']} | {p['categories']} | {p['nodes']} | {p['terminal']} | "
                     f"{p['min_depth']} | {p['max_depth']} | {p['avg_depth']:.2f} | {p['trending']} |")
    lines += ["", "**Tags:** " + " · ".join(f"`{t}` {s['tags'][t]}" for t in TAG_VOCAB),
              "", f"**Cross-references:** {s['xrefs']}", ""]
    return "\n".join(lines)


# ─────────────────────────────────────────────── main

def s_leaves(root):
    return sum(1 for n, d, _ in walk(root) if d > 0 and not children(n))


def write(path, text):
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"  wrote {os.path.relpath(path, ROOT_DIR)}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--no-html", action="store_true", help="skip Markmap HTML generation (no Node needed)")
    args = ap.parse_args()

    root = load()
    errors, _ = validate(root)
    if errors:
        print("taxonomy.yaml has validation errors; run scripts/validate.py", file=sys.stderr)
        return 1

    os.makedirs(OUT, exist_ok=True)
    print("Building outputs from taxonomy.yaml")
    full_md = os.path.join(OUT, "markmap-full.md")
    cond_md = os.path.join(OUT, "markmap-condensed.md")
    write(full_md, markmap_md(root, 4, "Startup Opportunity Map", expand_level=3))
    write(cond_md, markmap_md(root, 2, "Startup Opportunity Map (condensed)", expand_level=3))
    write(os.path.join(OUT, "mindmap.mmd"), mermaid(root, 4))
    write(os.path.join(OUT, "mindmap-condensed.mmd"), mermaid(root, 2))
    write(os.path.join(OUT, "mindmap.mm"), freemind(root))
    write(os.path.join(OUT, "mindmap.opml"), opml(root))
    write(os.path.join(OUT, "taxonomy.md"), markdown(root))
    write(os.path.join(ROOT_DIR, "reports", "stats.md"), stats_md(root))
    html_targets = [(full_md, "mindmap-full.html"), (cond_md, "mindmap-condensed.html")]

    if os.path.exists(solofounder.LABELS_PATH):
        labels = solofounder.load_labels()
        for problem in solofounder.check(root, labels):
            print(f"  warning: solo-founder labels: {problem}", file=sys.stderr)
        view = solofounder.view(root, labels)
        view["name"] = "Solo Founder, Low Capital"
        n, counts = solofounder.summary(view)
        header = (f"{n:,} of {s_leaves(root):,} leaves one founder could start for under ~$10k · "
                  + " · ".join(f"{b} {m} ({counts[m]})" for m, b in solofounder.MODELS.items())
                  + f" · {FIRE} trending")
        solo_md = os.path.join(OUT, "markmap-solofounder.md")
        write(solo_md, markmap_md(view, 4, "Startup Opportunity Map: solo founder", 3, header))
        html_targets.append((solo_md, "mindmap-solofounder.html"))

    if not args.no_html:
        for md, name in html_targets:
            dest = os.path.join(OUT, name)
            try:
                build_html(md, dest)
            except (RuntimeError, subprocess.CalledProcessError) as e:
                detail = getattr(e, "stderr", b"") or b""
                print(f"HTML build failed: {e} {detail.decode(errors='replace')[-500:]}", file=sys.stderr)
                return 1
            print(f"  wrote {os.path.relpath(dest, ROOT_DIR)}")
    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
