# Handoff

## v15: no more three-leaf subcategories

All 96 three-leaf subcategories are fixed, so every subcategory now has 4–8 leaves.
- 84 gained a distinct, actionable leaf: 77 scored 3 and 8 scored 4.
- The other 12 were combined in 7 merges with a closely related sibling, e.g. Meditation + Journaling → Meditation & reflection, and Homebuying + Home equity → Home financing.
- Sixteen first-choice leaves were rejected because the v12 prune had archived the same idea.

| | v14 | v15 |
|---|---|---|
| Total nodes | 2,048 | 2,126 |
| Leaves | 1,610 | 1,695 |
| Subcategories | 367 | 360 |
| Smallest subcategory | 3 leaves (96 of them) | 4 leaves (194) |
| Solo-founder view | 552 leaves | 597 leaves |

Trade-off: the map is now 88 nodes larger than right after the v12 prune (2,038).

Decision: the validator minimum stays at 3 leaves per subcategory. A complete 3-leaf subcategory is valid and never
needs padding. The 4-leaf floor reached in v15 is a result, not a rule.

Details are in `changelog.md` (v15). Every version (v0–v14) reconciles with 0 unaccounted.

---

## v14: no more two-leaf subcategories

All 27 two-leaf subcategories left by the v12 prune are fixed. Every non-leaf has 3–8 children again, and the
validator's 3-leaf minimum is back.
- 17 subcategories gained a new, actionable leaf, all scored 3–4. Examples: Home sleep testing, Diabetic foot care, Robotaxi fleet operations and Orbital transfer vehicles.
- The other 10 were merged or folded into a sibling, e.g. Breathwork + Somatics → Breathwork & somatics, Tasks & habits + Time management → Tasks & time, and Beverages into Better-for-you food & drink.
- Eight first-choice leaves were rejected because the prune had archived near-identical ones. Adding them back would undo the prune.

| | v13 | v14 |
|---|---|---|
| Total nodes | 2,038 | 2,048 |
| Leaves | 1,593 | 1,610 |
| Subcategories | 374 | 367 |
| Two-leaf subcategories | 27 | 0 |
| Solo-founder view | 543 leaves | 552 leaves |

Details are in `changelog.md` (v14). Every version (v0–v13) reconciles with 0 unaccounted.

---

## v13: solo-founder models are tags now

The four solo-founder labels now live in `taxonomy.yaml` as tags: `service-business`, `content`, `marketplace` and
`no-code-friendly`. `data/solo-founder.csv` is gone. The move was lossless: `mindmap-solofounder.html` still shows
the same 543 leaves with the same badges.
- Where a whole subcategory shared a model, the tag sits on the subcategory (29 cases), following the existing rule
  that a tag covers its subtree.
- `validate.py` now rejects any model tag other than `content` inside a `regulated` subtree.
- The model tags also appear in the other outputs, like any tag: full-map tooltips, `taxonomy.md`, OPML
  hashtags and FreeMind attributes.

---

## v12: actionability prune

Every leaf was scored 1–5 on startup-actionability. The 423 leaves scoring 1–2 moved to `taxonomy-archive.yaml`,
at their original paths. Nothing was deleted. Per your approval, subcategories may now hold 2 leaves, and the
file keeps its hand-written formatting (divider comments, one-line leaves, quoted notes).

| | v11 | v12 |
|---|---|---|
| Total nodes | 2,490 | 2,038 |
| Leaves | 2,016 | 1,593 |
| Subcategories | 403 | 374 |
| Categories / pillars | 63 / 8 | 63 / 8 |
| `trending` | 67 | 67 |
| `regulated` | 79 | 68 |
| Cross-references | 79 | 68 |

The remaining leaves score 3 (946), 4 (543) or 5 (104).

Structure:
- 9 subcategories moved whole, because every one of their leaves scored ≤ 2.
- Public markets, Automated investing and Trading platforms merged into **Investing tools**.
- 18 subcategories kept only one leaf, so each survivor was folded into a sibling. Two receiving subcategories were renamed: Matchmaking, coaching & events and Rebuilding after separation.
- 27 subcategories now have 2 leaves.

Every trending leaf survived. The `regulated` and cross-reference counts fell because they pointed at archived leaves.
Details: `changelog.md` and `cut.md` (v12), and `prune-preview.md`. Every version (v0–v11) reconciles with 0 unaccounted.

Where to look next: the 27 two-leaf subcategories are the thinnest parts of the map. Each one can gain a leaf or be
folded into a sibling.

---

## v11: fact check and 2026 momentum pass

**Fact check.** Every note with a dated claim, and every brand whose status could have changed, was checked
against live sources in September 2026. 25 notes were corrected or updated. All "verify" flags are now resolved.
Two corrections matter most:
- The prop-firms note cited *CFTC v. My Forex Funds* as enforcement, but the case was dismissed in 2025 with sanctions against the CFTC.
- Coliving's example, Common, shut down in 2024. It's replaced with Habyt and Tripalink.

Brands confirmed active or updated: Catch, FOLX, Plume, Outdoorsy, F45, ZOE, Havenly, Mindtrip, Guild, Paired, Peanut, Sunnyside, Empathy, Wysa, Nomad List, Flow Club, Focusmate, Levels, Function Health, Prenuvo.

Brands with ownership changes, now reflected in notes: Poppi (PepsiCo), Depop (eBay), Topgolf (Leonard Green), Udemy (Coursera), Lasting (Talkspace), Oak Street (CVS), and Bumble BFF (relaunched as a standalone app).

Well-established brands were not individually re-checked: public companies and category leaders such as Calm, Duolingo, Notion, Chime, Wise, Carvana, Toast, Square, Roblox, Starlink, Deel, Ramp, Harvey and Abridge.

**Momentum pass.**
- 20 new nodes where 2026 momentum had zero coverage. These include a new Customer support subcategory (AI support agents, voice AI contact centers), AI glasses, oral GLP-1s, smart rings, AI health assistants, AI receptionists, sovereign AI clouds, rare-earth magnets, creatine and child investment accounts.
- `trending` added to 9 nodes and removed from 2 (AI SDRs, AI meeting notetakers).
- 2 nodes cut as dated: Ghost kitchens and iBuying.

Every change has a source in `changelog.md` (v11).

Totals: 2,472 → 2,490 nodes; `trending` 60 → 67. Every version (v0–v10) reconciles with 0 unaccounted.

Open decision: nicotine pouches have large 2024-26 growth but were not added (health-harm product). Tell me if you want them.

---

## v10: the weak-branch work is finished

Format: subcategories / leaves / subcategories still at the 3-leaf minimum.

| Branch | v9 | v10 | What changed |
|---|---|---|---|
| Lifestyle › Home & Living | 8 / 28 / 4 | 8 / 44 / 0 | Home robots, smart-home installation, water-leak sensors, AI interior design, move admin, senior move management, renovation financing, accessibility retrofits, home warranties, plant-care apps, induction cooking, rebate navigation |
| Lifestyle › Entertainment & Events | 8 / 31 / 4 | 8 / 51 / 0 | FAST channels, audio dramas, cloud gaming, game UGC platforms, AI game-dev tools, ticket resale, karaoke, immersive theater, elopements, wedding vendor software, group gifting |
| Planet › Climate & Energy | 7 / 26 / 3 | 8 / 49 / 0 | New Clean fuels & industry (hydrogen, e-fuels, industrial heat). Wind, long-duration storage, advanced transmission, interconnection software, carbon removal, MRV, methane detection, PFAS remediation, e-waste and textile recycling, vehicle-to-grid |
| Health › Aging & Longevity | 5 / 19 / 2 | 6 / 33 / 0 | New Senior living. Sarcopenia programs, longevity telehealth, off-label longevity drugs (regulated, evidence note), passive home monitoring, senior tech support, paid family caregiving, caregiver marketplaces |
| Enterprise › AI Infrastructure | 5 / 18 / 2 | 6 / 34 / 0 | New Model training & serving. On-device models, model gateways, computer-use agents, agent memory, agent tool protocols (MCP), prompt management, RAG frameworks, GPU marketplaces, data-center cooling, training-data licensing |

Overall: 2,380 → 2,472 nodes; subcategories at the 3-leaf minimum 45 → 30 (of 402); cross-references 76 → 79.
No pillar or category was added or removed, and nothing was cut or renamed. Every version (v0–v9) reconciles with 0 unaccounted.

### Where things stand

**No category is weak by the structural measure any more.**
- 37 of 63 categories have no subcategory at the 3-leaf minimum.
- The other 26 have only 1–2 each.
- The smallest category now has 15 leaves.

The 30 remaining 3-leaf subcategories are mostly complete as they are:
- Life insurance: term, whole, universal.
- Immunization, Hearing, Home equity, Equity management, Point of sale.
- Several young niches that were only added in v2–v9.

Another "weakest five" round would now mostly add filler. Recommended next steps are quality work rather than more nodes:

1. **Verify the "verify" notes and brand examples.** About a dozen notes rest on recollection: 2025 regulatory events, company status, e.g. Woebot, Catch, Common.
2. **Rebalance `trending`** (60 tags). Several v2–v10 additions could be retagged against the 2024–26 criterion.
3. **Consider trimming the map for presentations.** At 2,472 nodes, the full map is best explored interactively. The condensed map (pillars + categories) is the one to present.

---

## v9: the next five weakest branches, reworked

Format: subcategories / leaves / subcategories still at the 3-leaf minimum.

| Branch | v8 | v9 | What changed |
|---|---|---|---|
| Relationships › Intimacy & Sexuality | 4 / 14 / 2 | 4 / 19 / 0 | Later-life intimacy, intimacy after cancer, trauma-informed intimacy programs, intimacy challenges, sex-therapist certification |
| Care › Care Delivery | 4 / 15 / 2 | 5 / 27 / 1 | New Emergency care (EMS tech, ER triage apps, air-ambulance memberships with a consumer-protection note). Senior-focused primary care, retail clinics, home infusion, mobile phlebotomy, specialty pharmacy, medication adherence, employer health navigation, price comparison |
| Wealth › Tax & Legal | 4 / 15 / 2 | 5 / 26 / 1 | New Family & elder law (powers of attorney, guardianship, elder law). Tax-loss harvesting, tax-pro marketplaces, tax-credit finders, prepaid legal plans, compensation claims, online notarization, asylum legal aid |
| Care › Brain & Neurological Health | 4 / 16 / 2 | 5 / 26 / 1 | New Brain health & prevention. ADHD medication access, blood-based Alzheimer's tests and anti-amyloid navigation (verify notes), neuropathy, neurorehab tech, vagus-nerve stimulation devices |
| Lifestyle › Fashion & Beauty | 6 / 21 / 3 | 7 / 41 / 0 | New Fashion & beauty tech (virtual try-on, AI styling, size & fit, AI skin analysis). Athleisure, kids' clothing, petite/tall and maternity, gender-neutral fashion, makeup, clean beauty, K-beauty (trending), shaving subscriptions, salon-suite platforms |

Overall: 2,318 → 2,380 nodes; subcategories at the 3-leaf minimum 53 → 45 (of 399); cross-references 72 → 76.
No pillar or category was added or removed, and nothing was cut or renamed. Every version (v0–v8) reconciles with 0 unaccounted.

### How much is left

Of the 63 categories:
- **32** have no subcategory at the 3-leaf minimum.
- **29** have 1–3 thin subcategories.
- **2** are still weak: **Home & Living** and **Entertainment & Events** (4 of 8 each).

So **1 more round (v10)** finishes the weak-branch work. That round can cover those two categories plus a
sweep of the ~37 scattered 3-leaf subcategories. The sweep should top up only the ones where the market really
has more to it, and leave naturally small ones alone (e.g. Life coaching, Carbon).

---

## v8: the next five weakest branches, reworked

Format: subcategories / leaves / subcategories still at the 3-leaf minimum.

| Branch | v7 | v8 | What changed |
|---|---|---|---|
| Mind › Learning & Education | 8 / 29 / 5 | 8 / 44 / 0 | Masterclass and microlearning platforms, AI reading coaches, credential verification, online proctoring, AI language tutors, workplace English, financial-aid navigation, campus mental health, lesson-planning AI, curriculum marketplaces |
| Mind › Career Development | 7 / 25 / 4 | 8 / 42 / 0 | New Workplace navigation (employer reviews, salary data, leave navigation, employment-law help). Salary negotiation, manager training, education-benefit platforms, career coaching, older-worker and refugee employment, warm-intro tools |
| Lifestyle › Travel & Adventure | 7 / 24 / 4 | 8 / 44 / 0 | New Hospitality tech (audit gap from Phase 1). Group trip planning, culinary and heritage travel, coworking passes, longevity retreats, senior and LGBTQ+ travel, voluntourism (ethics note), RV rentals |
| Lifestyle › Sports & Hobbies | 7 / 26 / 4 | 8 / 41 / 0 | New Fandom & spectating. Court booking, fitness racing (trending), pickup-game apps, women's sports media, word games, board-game cafes, live collectible auctions (trending), reading trackers |
| Enterprise › Software & Developer Tools | 4 / 14 / 2 | 8 / 36 / 1 | New AI coding tools, Testing & quality, Hosting & compute and Databases. Cloud dev environments, package registries, infrastructure as code, error monitoring, SDK generation, webhooks |

Overall: 2,222 → 2,318 nodes; subcategories at the 3-leaf minimum 71 → 53 (of 395); cross-references 68 → 72.
No pillar or category was added or removed, and nothing was cut or renamed. Every version (v0–v7) reconciles with 0 unaccounted.

### How much is left

Of the 63 categories:
- **30** have no subcategory at the 3-leaf minimum.
- **26** have a minority of thin subcategories.
- **7** are still weak (half or more of their subcategories at the minimum).

That leaves **2 more rounds**: v9 with five categories, then v10 with the last two. v10 could also do a one-pass sweep of the remaining thin subcategories.

### Next weakest (for v9)

1. **Relationships › Intimacy & Sexuality**: 2 of 4 at the minimum, 14 leaves.
2. **Care › Care Delivery**: 2 of 4, 15 leaves.
3. **Wealth › Tax & Legal**: 2 of 4, 15 leaves.
4. **Care › Brain & Neurological Health**: 2 of 4, 16 leaves.
5. **Lifestyle › Fashion & Beauty**: 3 of 6.

Then for v10: **Home & Living** and **Entertainment & Events** (4 of 8 each).

---

## v7: the next five weakest branches, reworked

Format: subcategories / leaves / subcategories still at the 3-leaf minimum.

| Branch | v6 | v7 | What changed |
|---|---|---|---|
| Relationships › Couples & Marriage | 6 / 20 / 4 | 7 / 33 / 0 | New Couples communities (intercultural, LGBTQ+, military, caregiver couples). Cohabitation agreements, faith-based marriage prep, check-in tools, vow renewals, marriage intensives, couples programs in recovery, household managers |
| Care › Pain & Musculoskeletal | 6 / 21 / 4 | 7 / 34 / 1 | New Foot & ankle care. Hip pain, joint-replacement navigation, prehab, MSK care navigation, remote therapeutic monitoring, fibromyalgia, interventional pain clinics, industrial exoskeletons |
| Care › Population-Specific Care | 6 / 24 / 4 | 6 / 35 / 0 | Men's health now cross-references its four need-based homes and adds preventive care and male pelvic health. Pediatric specialty access, adolescent health, LGBTQ+ primary care and family-building, veteran peer support, medical interpretation, refugee health |
| Enterprise › Cybersecurity & Trust | 5 / 17 / 3 | 8 / 40 / 1 | New Cloud & application security, Data security and Human risk. Non-human identity (trending), MDR, incident response, AI agent security, prompt-injection defense, account takeover, password managers; cyber insurance added to Wealth › Insurance |
| Relationships › Friendship & Community | 5 / 18 / 3 | 5 / 29 / 0 | Parent-friendship and activity-partner apps, community dinners, friendly-visitor services, warmlines, alumni networks, senior AI companions, companion robots, mutual-aid platforms |

Overall: 2,145 → 2,222 nodes; subcategories at the 3-leaf minimum 87 → 71 (of 388); cross-references 62 → 68.
No pillar or category was added or removed, and nothing was cut or renamed. Every version (v0–v6) reconciles with 0 unaccounted.

### How much is left

Across the 63 categories:
- **26** have no subcategory at the 3-leaf minimum.
- **25** have only 1–3 thin subcategories (under half). These are minor.
- **12** still have half or more of their subcategories at the minimum. These are the real remaining weak branches:
  - Learning & Education, Career Development, Travel & Adventure, Sports & Hobbies
  - Brain & Neurological Health, Care Delivery, Tax & Legal, Intimacy & Sexuality
  - Home & Living, Fashion & Beauty, Entertainment & Events, Software & Developer Tools

At five per round, that's **about 3 more rounds (v8–v10)**. After that the "weakest five" signal flattens out.
The remaining ~40 thin subcategories would be better handled in a single sweep, or left alone: a
3-leaf subcategory is not wrong in itself when the market really is small (e.g. Life coaching).

### Next weakest (for v8)

1. **Mind › Learning & Education**: 5 of 8 subcategories at the minimum.
2. **Mind › Career Development**: 4 of 7.
3. **Lifestyle › Travel & Adventure**: 4 of 7.
4. **Lifestyle › Sports & Hobbies**: 4 of 7.
5. **Enterprise › Software & Developer Tools**: 2 of 4, and only 14 leaves for a very large market.

---

## v6: the next five weakest branches, reworked

Format: subcategories / leaves / subcategories still at the 3-leaf minimum.

| Branch | v5 | v6 | What changed |
|---|---|---|---|
| Relationships › Breakups & Divorce | 5 / 16 / 4 | 6 / 31 / 0 | New Safe separation (safety planning, protective orders, stalkerware detection, emergency housing; trauma-informed note). Collaborative divorce, attorney matching, QDROs, support calculators, co-parent expense sharing, children's divorce support, name-change services |
| Mind › Contemplative Practice | 5 / 16 / 4 | 6 / 28 / 1 | New Nature practices (forest bathing, nature therapy). Meditation studios, breathwork certification, gratitude apps, nervous-system regulation apps, phone lockers, phone-free social events |
| Care › Integrative Medicine | 4 / 15 / 3 | 6 / 26 / 1 | New Herbal medicine and Practitioner tools (practice software, certification, marketplaces, practitioner-grade supplement dispensaries). Integrative primary care and oncology, reflexology and cupping (evidence notes), yoga therapy |
| Mind › Personal Development | 4 / 15 / 3 | 5 / 24 / 0 | New Performance & mindset. Self-help media, challenge programs, personal-growth festivals, peer coaching networks |
| Lifestyle › Food & Beverage | 8 / 26 / 6 | 8 / 44 / 0 | Personal chefs, school meals, corporate catering, gut-health and low-sugar foods, tea & matcha (trending), energy drinks, online ordering, kitchen automation, senior meal delivery, cottage-food businesses, food donation logistics, AI cooking assistants |

Overall: 2,075 → 2,145 nodes; subcategories at the 3-leaf minimum 105 → 87 (of 383); cross-references 60 → 62.
No pillar or category was added or removed, and nothing was cut. Every version (v0–v5) reconciles with 0 unaccounted.

### Next weakest (for v7)

1. **Relationships › Couples & Marriage**: 4 of 6 subcategories at the minimum.
2. **Care › Pain & Musculoskeletal**: 4 of 6 at the minimum.
3. **Care › Population-Specific Care**: 4 of 6 at the minimum (Men's health has only 3 leaves).
4. **Enterprise › Cybersecurity & Trust**: 3 of 5 at the minimum, and only 17 leaves for a very large market.
5. **Relationships › Friendship & Community**: 3 of 5 at the minimum.

Close behind: Learning & Education, Travel & Adventure, Career Development, Sports & Hobbies.

---

## v5: the next five weakest branches, reworked

Format: subcategories / leaves / subcategories still at the 3-leaf minimum.

| Branch | v4 | v5 | What changed |
|---|---|---|---|
| Planet › Built Environment | 4 / 13 / 3 | 7 / 37 / 0 | New Commercial real estate tech, Construction supply chain (procurement, subcontractors, lien waivers) and Housing supply (zoning analytics, office-to-residential). BIM, estimating AI, jobsite safety, resident screening, iBuying, AVMs |
| Planet › Aerospace & Defense | 4 / 14 / 3 | 5 / 30 / 0 | Commercial space split into Launch & in-space and Satellites & space data. Electric aircraft, aviation MRO tech, autonomous systems, electronic warfare, defense manufacturing, drone components and traffic management |
| Enterprise › Marketing & Sales Tech | 5 / 16 / 4 | 7 / 36 / 0 | New Lifecycle marketing and Event marketing. Generative engine optimization, data clean rooms, incrementality testing, sales data & enrichment, CPQ |
| Lifestyle › Cars & Transportation | 5 / 17 / 4 | 6 / 32 / 0 | New Car enthusiasts. Car marketplaces, trade-in valuation, mobile mechanics, connected-car apps, charger installation, cargo bikes, P2P car sharing, medical & senior rides |
| Lifestyle › Pets & Animal Care | 5 / 16 / 4 | 6 / 30 / 1 | New Other animals (equine, poultry, aquarium & reptile). Pet wellness plans, pet DNA, vet practice software, health wearables, smart litter boxes, pet sitting, aftercare |

Overall: 1,978 → 2,075 nodes; subcategories at the 3-leaf minimum 122 → 105 (of 378). No pillar or category was
added or removed, and nothing was cut. Every version (v0–v4) reconciles with 0 unaccounted.

### Next weakest (for v6)

1. **Relationships › Breakups & Divorce**: 4 of 5 subcategories at the minimum.
2. **Mind › Contemplative Practice**: 4 of 5 at the minimum.
3. **Care › Integrative Medicine**: 3 of 4 at the minimum.
4. **Mind › Personal Development**: 3 of 4 at the minimum (improved structurally in v2, still thin).
5. **Lifestyle › Food & Beverage**: 6 of 8 at the minimum.

Close behind: Couples & Marriage, Pain & Musculoskeletal, Population-Specific Care, Cybersecurity & Trust, Learning & Education.

---

## v4: the next five weakest branches, reworked

Format: subcategories / leaves / subcategories still at the 3-leaf minimum.

| Branch | v3 | v4 | What changed |
|---|---|---|---|
| Care › Health Technology | 5 / 16 / 4 | 7 / 38 / 0 | New Care operations (intake, telehealth infrastructure, hospital ops) and Life-science commercial tech (pharma CRM, HCP engagement, pharmacovigilance). AI pathology, medical-coding AI, risk adjustment, healthcare APIs and cybersecurity, SaMD, device QMS |
| Wealth › Banking & Payments | 6 / 19 / 5 | 6 / 33 / 0 | Pay by bank, bill pay, subscription management, cross-border bill pay, credit-builder loans, medical financing, Sharia-compliant BNPL, zakat apps, alternative credit data |
| Enterprise › Work & HR Tech | 6 / 19 / 5 | 7 / 37 / 0 | New HRIS & people analytics. Candidate sourcing, employment screening, caregiving benefits, recognition, mentoring, internal mobility, shift marketplaces. Cross-references to fertility and financial-wellness benefits |
| Planet › Deep Tech | 5 / 16 / 4 | 5 / 29 / 0 | Edge and neuromorphic chips, semiconductor equipment, quantum sensing/networking/cloud, robot training data, actuators, RaaS, BCIs split into implantable and non-invasive, metamaterials, low-carbon cement & steel |
| Mind › Creativity & Craft | 6 / 19 / 5 | 7 / 38 / 0 | New Fiber arts. AI writing assistants, screenwriting, sample marketplaces, music distribution, digital art tools, AI video generation, stock media, woodworking, CNC, voice lessons |

Overall: 1,888 → 1,978 nodes; subcategories at the 3-leaf minimum 145 → 122 (of 370); cross-references 58 → 60.
No pillar or category was added or removed, and nothing was cut. Every version (v0–v3) reconciles with 0 unaccounted.

### Next weakest (for v5)

1. **Planet › Built Environment**: only 13 leaves; 3 of 4 subcategories at the minimum.
2. **Planet › Aerospace & Defense**: 14 leaves; 3 of 4 at the minimum.
3. **Enterprise › Marketing & Sales Tech**: 4 of 5 at the minimum.
4. **Lifestyle › Cars & Transportation**: 4 of 5 at the minimum.
5. **Lifestyle › Pets & Animal Care**: 4 of 5 at the minimum.

Close behind: Breakups & Divorce, Contemplative Practice, Integrative Medicine, Personal Development, Food & Beverage.

---

## v3: the next five weakest branches, reworked

Format: subcategories / leaves / subcategories still at the 3-leaf minimum.

| Branch | v2 | v3 | What changed |
|---|---|---|---|
| Planet › Public Interest & Impact | 7 / 22 / 6 | 7 / 42 / 0 | Scope note (government, nonprofit or development-funder buyer, plus accessibility). Public safety, global development (health, off-grid energy, smallholder agtech), court modernization and reentry, grantmaking, live captioning and sign-language AI |
| Planet › Industry & Supply Chain | 8 / 25 / 7 | 8 / 42 / 0 | MES, cobots, digital twins, OT security, freight audit, micro-fulfillment, parcel lockers, B2B recommerce, rare-earth processing |
| Enterprise › Legal & Compliance Tech | 5 / 15 / 5 | 8 / 37 / 1 | New privacy, ESG-reporting and IP subcategories; CLM, legal intake, litigation analytics; forced-labor and customs compliance |
| Relationships › Death, Grief & Legacy | 5 / 15 / 5 | 6 / 28 / 0 | New Memorialization subcategory (incl. AI memorial avatars, with an ethics note), alternative dispositions, funeral-home software, bereavement benefits, crypto inheritance |
| Mind › Spirituality & Faith | 5 / 15 / 5 | 5 / 24 / 0 | Note covering all traditions; chaplaincy, online religious education, AI scripture study, sermons & audio, philosophy media |
| Mind › Productivity | 5 / 15 / 5 | 5 / 23 / 0 | Scheduling links, time-blocking, personal wikis, whiteboards, AI task breakdown, AI browser agents |

Overall: 1,795 → 1,888 nodes; subcategories at the 3-leaf minimum 177 → 145 (of 366); cross-references 53 → 58.
No pillar or category was added or removed, and nothing was cut. All versions (v0, v1, v2) reconcile with 0 unaccounted.

### Next weakest (for v4)

1. **Care › Health Technology**: 4 of 5 subcategories at the minimum, and only 16 leaves for a very large B2B market.
2. **Wealth › Banking & Payments**: 5 of 6 at the minimum.
3. **Enterprise › Work & HR Tech**: 5 of 6 at the minimum.
4. **Planet › Deep Tech**: 4 of 5 at the minimum. Quantum, robotics and BCI each have 3 generic leaves.
5. **Mind › Creativity & Craft**: 5 of 6 at the minimum.

Close behind: Marketing & Sales Tech, Cars & Transportation, Pets & Animal Care, Breakups & Divorce, Contemplative Practice.

---

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
