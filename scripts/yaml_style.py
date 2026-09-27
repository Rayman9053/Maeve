"""Emit taxonomy YAML in the repository's house style, so scripted edits keep the file hand-readable.

House style:
  - the comment header above `name:` is preserved verbatim
  - each pillar is preceded by a divider comment:  `  # ───── N`
  - one blank line before every category except the first in its pillar
  - parents are block mappings with keys in the order name, tags, note, see, children
  - leaves are one-line flow mappings: `- {name: X, tags: [a], note: "...", see: ["..."]}`
  - notes and cross-references are double-quoted; a single `see` stays inline, several go one per line

Round-trip check: python3 scripts/yaml_style.py  (emit(load(taxonomy.yaml)) must equal the file byte for byte)
"""
import os
import re
import sys

import yaml

DIVIDER = "  # " + "─" * 57 + " {n}"
KEY_ORDER = ("name", "tags", "note", "see", "children")


def _q(text):
    return '"' + text.replace("\\", "\\\\").replace('"', '\\"') + '"'


def _name(name, flow):
    # '&' and apostrophes are fine inside plain scalars; only quote when YAML would misparse.
    risky = re.compile(r"[\[\]{}#]|: |^[-?:!&*|>'\"%@`\s]|\s$" + (r"|," if flow else ""))
    if risky.search(name):
        return _q(name)
    loaded = yaml.safe_load(f"k: {name}")["k"]
    return name if loaded == name else _q(name)


def _tags(tags):
    return "[" + ", ".join(tags) + "]"


def _leaf(node):
    parts = [f"name: {_name(node['name'], flow=True)}"]
    if node.get("tags"):
        parts.append(f"tags: {_tags(node['tags'])}")
    if node.get("note"):
        parts.append(f"note: {_q(node['note'])}")
    if node.get("see"):
        parts.append("see: [" + ", ".join(_q(s) for s in node["see"]) + "]")
    return "{" + ", ".join(parts) + "}"


def _block(node, indent, lines, depth):
    pad = " " * indent
    lines.append(f"{pad}- name: {_name(node['name'], flow=False)}")
    inner = pad + "  "
    if node.get("tags"):
        lines.append(f"{inner}tags: {_tags(node['tags'])}")
    if node.get("note"):
        lines.append(f"{inner}note: {_q(node['note'])}")
    see = node.get("see") or []
    if len(see) == 1:
        lines.append(f"{inner}see: [{_q(see[0])}]")
    elif see:
        lines.append(f"{inner}see:")
        lines.extend(f"{inner}  - {_q(s)}" for s in see)
    lines.append(f"{inner}children:")
    for i, child in enumerate(node.get("children") or []):
        if depth + 1 == 2 and i > 0:
            lines.append("")
        if child.get("children"):
            _block(child, indent + 4, lines, depth + 1)
        else:
            lines.append(f"{' ' * (indent + 4)}- {_leaf(child)}")


def emit(root, header):
    unknown = {k for n in _walk(root) for k in n} - set(KEY_ORDER)
    if unknown:
        raise ValueError(f"unknown keys {unknown}")
    lines = [f"name: {_name(root['name'], flow=False)}"]
    if root.get("note"):
        lines.append(f"note: {_q(root['note'])}")
    lines.append("children:")
    for n, pillar in enumerate(root["children"], 1):
        lines.append(DIVIDER.format(n=n))
        _block(pillar, 2, lines, 1)
    return header + "\n".join(lines) + "\n"


def _walk(node):
    yield node
    for c in node.get("children") or []:
        yield from _walk(c)


def read_header(path):
    """Everything above the first top-level `name:` line."""
    text = open(path, encoding="utf-8").read()
    idx = text.find("\nname:")
    return text[: idx + 1] if idx >= 0 else ""


def write(path, root, header):
    text = emit(root, header)
    if yaml.safe_load(text) != root:
        raise RuntimeError("emitted YAML does not round-trip to the same data")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


if __name__ == "__main__":
    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, "taxonomy.yaml")
    original = open(path, encoding="utf-8").read()
    root = yaml.safe_load(original)
    out = emit(root, read_header(path))
    if out == original:
        print(f"round-trip OK: {path} is already in house style")
        sys.exit(0)
    import difflib
    diff = list(difflib.unified_diff(original.splitlines(), out.splitlines(), "file", "emitted", lineterm="", n=1))
    print("\n".join(diff[:80]))
    print(f"... {sum(1 for d in diff if d.startswith(('+', '-')) and not d.startswith(('+++', '---')))} changed lines")
    sys.exit(1)
