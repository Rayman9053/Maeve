# Handoff

## v2: the five weakest branches, reworked

| Branch | v1 | v2 | What changed |
|---|---|---|---|
| Relationships › Social Skills | 5 subcats / 18 leaves, mostly skill topics | 4 / 16, all things you could sell | Coaching, AI roleplay, speech-feedback AI, speaking clubs, EQ assessments/training, SEL. Relationship psychology dissolved |
| Mind › Purpose & Life Transitions | 3 / 10 | 4 / 15 | Now "guidance on direction and life stages": coaching, self-discovery assessments, life-stage programs, sabbaticals |
| Mind › Personal Development | 3 / 12 | 4 / 15 | Now "self-directed growth products": content, non-clinical inner-work programs, transformational experiences, peer groups. No overlap with Purpose |
| Relationships › Intimacy & Sexuality | 3 / 10, fuzzy border with Health | 4 / 14, cross-referenced both ways | Partnered intimacy here; individual sexual health, devices and sex-ed in Health |
| Planet › Biotech & Life Sciences | 6 / 18, every subcat at the 3-leaf minimum | 8 / 37 | Specific modalities, tools, services (CROs, CDMOs), longevity biotech |
| Planet › Agriculture & Food Systems | 5 / 15, every subcat at the minimum | 8 / 33 | Biologicals & genetics, livestock & aquaculture, farm operations & finance |
| Enterprise › Commerce & Retail Tech | 4 / 12, overlapped Lifestyle | 6 / 23 | Horizontal only: e-commerce, marketplace selling, fulfillment, SMB operations. Restaurant POS and field-service software moved to their verticals |

Overall: 1,725 → 1,795 nodes; subcategories sitting at the 3-leaf minimum 192 → 177 (of 362).
Cross-references 45 → 53. No pillar or category was added or removed.
`reconcile.py` shows every v1 node kept or logged (v2 section of `changelog.md` / `cut.md`), and the
original v0 input still reconciles with 0 unaccounted.

### Next weakest (for v3)

Same signals as before: share of subcategories at the minimum, and how well the leaves pass the leaf test.

1. **Planet › Public Interest & Impact** (6 of 7 subcats at the minimum). Still a catch-all of three merged categories.
2. **Planet › Industry & Supply Chain** (7 of 8 at the minimum). Big industries with generic leaves.
3. **Enterprise › Legal & Compliance Tech** (5 of 5 at the minimum). Legal AI deserves more resolution.
4. **Relationships › Death, Grief & Legacy** (5 of 5 at the minimum). An underserved area worth deepening.
5. **Mind › Spirituality & Faith** and **Mind › Productivity** (5 of 5 each). Thin leaves.

---

## v1

### Before → after

| Metric | Before (`source/taxonomy-v0.md`) | After (`taxonomy.yaml`) |
|---|---|---|
| Total nodes | 1,073 | 1,725 |
| Pillars / categories / subcategories / leaves | 6 / 74 / 441 / 552 | 8 / 63 / 353 / 1,301 |
| Max children on one node | 19 (Health) | 8 |
| Non-leaf nodes with < 3 children | 18 | 0 |
| Categories mixing depth-3 and depth-4 children | 35 of 74 | 0 |
| Fully flat categories (no leaves) | 37 of 74 | 0 |
| Avg terminal depth per pillar | 3.00–3.88 | 4.00 everywhere |
| Names over 4 words | 60 | 0 |
| Duplicate names across the tree | 27 exact groups + ~25 conceptual | 0 (validator-enforced) |
| Cross-references | 10 free-text, 0 resolving | 45 structured, all resolving |
| `hot` / `trending` tags | 77 | 48 |
| `regulated` tags | 6 | 60 |
| Nodes with notes | 124 | 193 |
| Original nodes silently lost | — | 0 (472 kept by name, 601 logged in changelog/cut) |

The node count **went up**, although the audit estimated it would fall to 750–900. Two things
account for that:
- The approved gap-fills added nodes.
- Every flat subcategory was given 3–8 leaves so depth is uniform. That added 709 nodes, listed in `changelog.md` › Additions.

102 nodes were cut (`cut.md`), mostly self-help content topics folded into notes. The rest of the 601 missing names are renames and merges (`changelog.md`). If you'd rather have a smaller map, the
fastest lever is to let atomic subcategories stay leafless. That means relaxing the
uniform-depth warning in `validate.py`, then deleting the thinnest leaf lists.

Names containing "&" dropped only from 233 to 229. The pairs that joined *unlike* things were split. The remaining ones join like things ("Vitamins & minerals").

Per-pillar numbers are in `reports/stats.md`.

### The 5 weakest branches in v1 (addressed in v2)

Signals used:
- the share of subcategories sitting at the 3-leaf minimum (192 of 353 overall)
- the share of leaves that are new in v1 and so haven't had your review
- how well the leaves pass the "can a startup sell into this?" test

1. **Relationships › Social Skills.** The leaf test is applied least here. Only 27% of its leaves are new, because the old skill lists survived (Active listening, Empathy, Self-awareness, Assertiveness). These are curriculum topics, not markets. Next step: recast as markets (communication coaching, EQ assessments, social-skills apps) or fold them into Personal Development.
2. **Mind › Personal Development**, with *Purpose & Life Transitions* close behind. There are only 3 subcategories each, and the leaves are vague (Self-esteem, Transformational workshops, Quarter-life). Next step: merge the two categories, or re-cut them around buyable products: coaching, assessments, retreats, apps.
3. **Relationships › Intimacy & Sexuality.** It's the smallest category (3 subcategories, 10 leaves, 90% new). The border with *Health › Sexual & Reproductive Health › Sexual wellness* is also still soft: an intimacy-app founder could look in either place. Next step: decide whether to merge it into Couples & Marriage as one subcategory.
4. **Planet & Frontier › Biotech & Life Sciences**, and likewise *Agriculture & Food Systems*. Every subcategory sits at the 3-leaf minimum and 100% of the leaves are new, so resolution is low for huge industries. For example, "Gene & cell therapy" has three generic leaves. Next step: a focused pass with a domain expert, or pick modalities and business models (tools/CRO/platform/therapeutics) as the leaf axis.
5. **Enterprise & AI › Commerce & Retail Tech.** It's the newest category: 4/4 subcategories at the minimum, all leaves new, and it overlaps *Restaurant tech* (Lifestyle) and *Salon & spa tech* (Lifestyle). Next step: decide whether vertical SMB software should live here as one family, and pull those two in via cross-references or moves.

Honourable mention: **Public Interest & Impact** (6 of 7 subcategories at the minimum). It's a catch-all created by merging three old categories.

### Other open items

- **Brand examples to re-verify** (flagged "verify" in notes): Woebot, Catch, Common coliving. Examples in general are as of 2026.
- **Regulatory flags that depend on recollection**, marked "verify" in notes: 2025 US lab-test rule status, state AI-therapy restrictions, GLP-1 compounding status.
- **Structural choices you may want to revisit:**
  - Death, Grief & Legacy under Relationships
  - Career Development under Mind
  - Media & streaming, and Semiconductors & AI chips, as subcategories rather than categories (the pillars were full)
