# Taxonomy Audit — Phase 1

Source: `source/taxonomy-v0.md` (frozen copy of the original). Nothing in it has been changed.
Stats come from `python3 scripts/audit_stats.py source/taxonomy-v0.md`. The judgements are mine.

**How the legacy file was parsed.** `##` = Pillar (depth 1), `###` = Category (2).
`- Name: a · b · c` = Subcategory (3) with Leaves (4). `- a · b · c` with no colon = several
Subcategories that have no children. `[tags]` and the trailing `(parenthetical)` are pulled out
as tags and notes, so they don't count toward name length.

---

## 1. Stats

**Total: 1,073 nodes** (6 pillars · 74 categories · 441 subcategories · 552 leaves)

| Pillar | Categories | Nodes | Terminal nodes | Min depth | Max depth | Avg terminal depth | `hot` tags |
|---|---|---|---|---|---|---|---|
| Health | **19** | 343 | 268 | 3 | 4 | 3.76 | 17 |
| Wealth | 9 | 273 | 222 | 3 | 4 | 3.84 | 20 |
| Relationships | 10 | 194 | 151 | 3 | 4 | 3.88 | 4 |
| Mind, Meaning & Growth | 8 | **63** | 49 | 3 | 4 | 3.27 | 7 |
| Lifestyle, Home & Experiences | 11 | 110 | 92 | 3 | 4 | 3.15 | 19 |
| Society, Planet & Frontier Industries | **17** | 90 | 72 | 3 | **3** | 3.00 | 10 |

<details><summary>Per-category depth table (74 rows)</summary>

"Depth" here is the depth of the terminal nodes: 3 means a flat list under the category, 4 means it has leaves.

| Pillar | Category | Direct children | Nodes | Min | Max | Avg |
|---|---|---|---|---|---|---|
| Health | Preventive Health | 6 | 17 | 3 | 4 | 3.77 |
| Health | Nutrition | 9 | 32 | 3 | 4 | 3.85 |
| Health | Fitness | 8 | 31 | 3 | 4 | 3.88 |
| Health | Sleep | 3 | 13 | 3 | 4 | 3.90 |
| Health | Mental Health | **14** | 49 | 3 | 4 | 3.85 |
| Health | Women's Health | 6 | 26 | 3 | 4 | 3.95 |
| Health | Men's Health | 7 | 18 | 3 | 4 | 3.71 |
| Health | Sexual Health | 10 | 11 | 3 | 3 | 3.00 |
| Health | LGBTQ+ & Gender-Affirming Care | 3 | 4 | 3 | 3 | 3.00 |
| Health | Children's Health | 5 | 6 | 3 | 3 | 3.00 |
| Health | Dental & Oral Health | 4 | 5 | 3 | 3 | 3.00 |
| Health | Vision & Hearing | 4 | 5 | 3 | 3 | 3.00 |
| Health | Skin, Hair & Dermatology | 3 | 4 | 3 | 3 | 3.00 |
| Health | Chronic Conditions | 10 | 31 | 3 | 4 | 3.80 |
| Health | Pain & Rehabilitation | 6 | 18 | 3 | 4 | 3.85 |
| Health | Complementary & Integrative Medicine | 5 | 15 | 3 | 4 | 3.82 |
| Health | Aging & Longevity | 6 | 23 | 3 | 4 | 3.94 |
| Health | Healthcare Services | 5 | 19 | 3 | 4 | 3.93 |
| Health | Healthcare Technology | 4 | 15 | 3 | 4 | 3.91 |
| Wealth | Personal Finance | **13** | 41 | 3 | 4 | 3.82 |
| Wealth | Investing | 9 | 50 | 3 | 4 | 3.95 |
| Wealth | Trading | 7 | 22 | 3 | 4 | 3.82 |
| Wealth | Entrepreneurship | **13** | 46 | 3 | 4 | 3.82 |
| Wealth | Career & Income | 9 | 32 | 3 | 4 | 3.81 |
| Wealth | Tax & Legal Finance | 7 | 25 | 3 | 4 | 3.85 |
| Wealth | Retirement | 4 | 13 | 3 | 4 | 3.80 |
| Wealth | Insurance | 7 | 22 | 3 | 4 | 3.82 |
| Wealth | Business Finance | 7 | 21 | 3 | 4 | 3.76 |
| Relationships | Dating | 6 | 29 | 3 | 4 | 3.92 |
| Relationships | Romantic Relationships | 6 | 24 | 3 | 4 | 3.89 |
| Relationships | Marriage | 5 | 22 | 3 | 4 | 3.94 |
| Relationships | Breakups & Divorce | 4 | 17 | 3 | 4 | 3.92 |
| Relationships | Family Relationships | **11** | 28 | 3 | 4 | 3.73 |
| Relationships | Friendships | 4 | 17 | 3 | 4 | 3.92 |
| Relationships | Social Skills | 4 | 17 | 3 | 4 | 3.92 |
| Relationships | Sexual Relationships | 3 | 16 | 4 | 4 | 4.00 |
| Relationships | Relationship Psychology | 4 | 5 | 3 | 3 | 3.00 |
| Relationships | Community & Social Life | 3 | 18 | 4 | 4 | 4.00 |
| Mind | Mindfulness & Contemplative Practice | 5 | 6 | 3 | 3 | 3.00 |
| Mind | Spirituality & Faith | 4 | 7 | 3 | 4 | 3.40 |
| Mind | Purpose & Life Direction | 3 | 10 | 3 | 4 | 3.86 |
| Mind | Productivity & Personal Management | 6 | 7 | 3 | 3 | 3.00 |
| Mind | Learning & Education | 9 | 15 | 3 | 4 | 3.42 |
| Mind | Creativity & Craft | 6 | 7 | 3 | 3 | 3.00 |
| Mind | Inner Growth | 5 | 6 | 3 | 3 | 3.00 |
| Mind | Identity & Community | 3 | 4 | 3 | 3 | 3.00 |
| Lifestyle | Travel & Adventure | 10 | 17 | 3 | 4 | 3.43 |
| Lifestyle | Food & Beverage | 9 | 10 | 3 | 3 | 3.00 |
| Lifestyle | Home & Living | 9 | 10 | 3 | 3 | 3.00 |
| Lifestyle | Hobbies, Sports & Recreation | **11** | 16 | 3 | 4 | 3.31 |
| Lifestyle | Entertainment & Nightlife | 4 | 5 | 3 | 3 | 3.00 |
| Lifestyle | Fashion, Beauty & Personal Care | **12** | 13 | 3 | 3 | 3.00 |
| Lifestyle | Pets & Animal Companions | 8 | 9 | 3 | 3 | 3.00 |
| Lifestyle | Events & Celebrations | 4 | 5 | 3 | 3 | 3.00 |
| Lifestyle | Kids & Baby | 5 | 6 | 3 | 3 | 3.00 |
| Lifestyle | Automotive & Mobility | 5 | 6 | 3 | 3 | 3.00 |
| Lifestyle | Death, Grief & Legacy | 7 | 12 | 3 | 4 | 3.44 |
| Society | *all 17 categories* | 3–9 | 4–10 | 3 | 3 | 3.00 |

</details>

**Structural health metrics**

| Metric | Value |
|---|---|
| Nodes with >8 children | 20 (pillars: Health 19, Society 17, Lifestyle 11, Relationships 10, Wealth 9) |
| Nodes with <3 children (not leaves) | 18 (e.g. *Pharmacy* has 1, *Neck pain* 2, *Energy practices* 2) |
| Categories that mix depth-3 and depth-4 children | 35 of 74 |
| Categories that are fully flat (no leaves at all) | 37 of 74 |
| Names over 4 words | 60 |
| Names containing "&" (often two concepts in one node) | 233 (22%) |
| Nodes carrying a note / example | 124 |
| Tagged nodes | 106 (`hot` 77, `underserved` 22, `b2b` 14, `regulated` 6, `underserved by software` 1) |
| Cross-references ("see also") | 10, and **none resolve to an exact path** (see §2.3) |

---

## 2. Duplicates

Legend: **Keep@X** = keep one canonical node at X · **Merge** = fold both into one new node ·
**Xref** = add a cross-reference note at the other location · **Distinct** = same word, different
meaning (disambiguate the names, don't merge).

### 2.1 Exact or near-exact duplicates

| # | Topic | Locations | Recommendation |
|---|---|---|---|
| 1 | **Libido** | Men's Health › Sexual health; Sexual Health | Keep@Sexual Health › Sexual dysfunction. Drop from Men's; Xref |
| 2 | **Sexual health** | Men's Health › *Sexual health* (subcat) vs Health › *Sexual Health* (category) | Merge ED/libido into Sexual Health. Move Testosterone → Men's › Hormone health. Move Male fertility → Fertility |
| 3 | **Reproductive health** | Women's Health › Reproductive health; Sexual Health › Reproductive health | Keep@Women's/Fertility. Drop from Sexual Health |
| 4 | **Sexual dysfunction** | Health › Sexual Health; Relationships › Sexual Relationships › Sexual challenges | Keep@Health (clinical). Relationships keeps *desire mismatch* (relational); Xref |
| 5 | **Sexual wellness / sex education** | Sexual Health › *Sexual wellness*, *Sex education platforms*; Sexual Relationships › *Sexual wellness › Sexual education* | Merge into one "Sex education" node; Xref |
| 6 | **Intimacy** (×3) | Romantic › Intimacy; Marriage › Marriage enrichment › Intimacy; Sexual Relationships › Intimacy | Merge into one Relationships › *Intimacy & Sexuality* category |
| 7 | **Menopause** | Women's › Hormonal health › Menopause/Perimenopause; Sexual Health › Menopause & sexuality | Keep@Women's; Xref |
| 8 | **Fertility / family building** (×5) | Women's › Reproductive (Fertility, Egg freezing); Men's › Male fertility, Vasectomy; Family Relationships › Fertility & family-building journeys (IVF, Donor & surrogacy) | Merge into Health › *Fertility & Family Building*; Relationships Xref |
| 9 | **Performance anxiety** | Mental Health › Anxiety; Sexual Relationships › Sexual challenges | Distinct → rename "Performance anxiety" (stage/sport) vs "Sexual performance anxiety" |
| 10 | **Matchmaking** | Dating › Dating strategies › Matchmaking; Community & Social Life › *Matchmaking* (subcat, 4 leaves) | Keep@Dating; also move *Singles events* to Dating |
| 11 | **Coliving** (×3) | Travel › Digital nomadism › Coliving; Home & Living › Coliving; Community › Social groups › Cohousing & coliving | Keep@Home & Living; Xref ×2 |
| 12 | **Child safety** | Family Relationships › Child safety & parental controls; Kids & Baby › Child safety | Keep@Family (parental controls); Xref |
| 13 | **Collectibles** | Investing › Alternative investments › Collectibles; Hobbies › Collectibles | Distinct: "Collectibles as assets" vs "Collecting hobbies". Sneakers also duplicated (#14) |
| 14 | **Sneakers** | Hobbies › Collectibles › Sneakers; Fashion › Sneakers & streetwear | Keep@Fashion; Xref |
| 15 | **Freelancing** | Entrepreneurship › Freelancing; Career › Employment models › Freelancing | Keep@Entrepreneurship; Xref |
| 16 | **Consulting, Copywriting** | Entrepreneurship › Freelancing; Career › High-income skills | Keep@Freelancing; cut the High-income skills list (see §4) |
| 17 | **Credit cards** | Personal Finance › Debt management; › Credit | Keep@Credit (the product). Debt mgmt gets "Credit-card debt" |
| 18 | **Credit building** | Personal Finance › Credit › Credit building; Financial inclusion › Credit-building for the unbanked | Merge |
| 19 | **Inheritance / Wills** (×4) | Wealth transitions › Inheritance; Estate planning › Inheritance, Wills; Consumer legal tech › Online wills; Death › End-of-life planning › Wills | Keep@Estate planning; Xref from Death and Wealth transitions; drop "Online wills" (a channel, not a market) |
| 20 | **Divorce finance** (×4) | Wealth transitions › Divorce finance; Breakups & Divorce › Divorce process › Financial transition, *Divorce fintech*; Consumer legal tech › Online divorce | Keep@Breakups & Divorce; Xref from Wealth |
| 21 | **Health insurance** | Healthcare Services › Health insurance (xref-only node); Wealth › Insurance › Health insurance | Keep@Wealth › Insurance. Health gets an Xref, not a node |
| 22 | **Pet insurance** | Insurance › Specialty › Pet; Pets › Pet insurance | Keep@Insurance. Rule: every insurance line lives in Wealth. Xref from Pets |
| 23 | **Asset protection › Insurance** | Tax & Legal › Asset protection; Wealth › Insurance | Drop the leaf; Xref |
| 24 | **AI-era reskilling / upskilling / AI skills** | Career › AI-era reskilling; Learning › AI-era upskilling; Career › Professional skills › AI skills | Merge into one "AI upskilling" node |
| 25 | **Corporate L&D** | Learning › Corporate L&D; Work & HR Tech › L&D platforms | Merge (Keep@Work & HR Tech) |
| 26 | **No-code** | Entrepreneurship › No-code launches; Dev Tools › No-code/low-code | Keep@Dev Tools; Xref |
| 27 | **Remote hiring / EOR** | Career › Employment models › Global remote hiring; Business Finance › Global payroll, EOR…; HR Tech › Remote & hybrid collaboration | Merge the hiring/EOR pair; collaboration is Distinct |
| 28 | **Employer wellness** | Preventive Health › Corporate & employer wellness; HR Tech › Employee wellbeing & benefits | Merge (Keep@HR Tech, Xref from Health) |
| 29 | **GLP-1** | Nutrition › GLP-1 & medical weight management; Healthcare Tech › GLP-1 telehealth platforms | Merge under Nutrition/Metabolic |
| 30 | **NAD+ / longevity supplements** | Nutrition › Longevity supplements; Aging › Biohacking › NAD+ protocols | Merge; tag `regulated` (see §7) |
| 31 | **Meditation** | Mental Health › Meditation & mindfulness apps; Mind › Mindfulness › Meditation apps & retreats | Keep@Mind › Mindfulness; Xref |
| 32 | **Yoga** | Fitness › Mobility › Yoga; Mindfulness › Yoga & embodiment | Keep@Fitness (studios/classes); Xref |
| 33 | **Addiction recovery communities** | Mental Health › Addiction recovery; Mind › Identity & Community › Recovery communities | Keep@Mental Health › Addiction recovery |
| 34 | **Men's groups** (×3) | Mental Health › Men's mental health & men's groups; Men's Health › Fatherhood & men's emotional health; Identity & Community › Men's groups & women's circles | Merge men's mental health into one node under Mental Health. Circles/groups go to Community; Xref |
| 35 | **Senior fitness** | Age tech › Senior fitness; Fitness › Adaptive & inclusive fitness (seniors) | Merge into Adaptive fitness |
| 36 | **Men's fitness** | Men's Health › Men's fitness (Muscle building · Fat loss · Performance) | Duplicates Fitness › Strength training and Nutrition › Weight management. Cut (→ cut.md) |
| 37 | **Caregiving** (×4) | Family › Caregiver support; Age tech › Caregiving coordination; Healthcare Services › Elder care, Home healthcare | Merge into one "Caregiving" subcategory (Aging); Xref from Family |
| 38 | **Chronic pain** | Chronic Conditions › Chronic-pain programs; Pain & Rehabilitation (whole category) | Merge into Pain & Rehab |
| 39 | **Cancer** (×5) | Preventive › Cancer screening; Breast cancer support; Prostate cancer support; Breast/Prostate screening; Chronic › Oncology support | Screening → Preventive; support → Oncology; the population categories Xref |
| 40 | **Microbiome** (×4) | Digestive › Gut microbiome; Personalized nutrition › Microbiome testing; Supplements › Probiotics; Dental › Oral microbiome | Keep@Personalized nutrition (testing); Xref from Digestive |
| 41 | **Options** | Trading › Stock trading › Options trading; Trading › *Options* (subcat) | Keep the Options subcat |
| 42 | **Commodities** (×4) | Alt investments › Commodities, Precious metals; ETFs › Commodity ETFs; Futures › Commodity futures | Collapse. The instrument-level split doesn't map to distinct startup markets |
| 43 | **Crypto tax** | Digital assets › Crypto tax & compliance; Tax planning › Crypto/DeFi tax | Keep@Tax; Xref |
| 44 | **Financial inclusion** | Personal Finance › Financial inclusion; Social Impact › Financial-inclusion infrastructure | Keep@Wealth (consumer), Xref from Social Impact (infra) |
| 45 | **EV charging** | Automotive › EV charging & ownership; Climate › EV charging networks | Distinct: "EV ownership" (consumer) vs "Charging networks" (infra); Xref |
| 46 | **Delivery** | Food › Delivery & quick commerce; Logistics › Last-mile & autonomous delivery | Distinct: consumer service vs infra; Xref |
| 47 | **Creator/UGC** | Entrepreneurship › Creator economy › UGC marketplaces; Martech › Influencer & UGC platforms | Keep@Martech (b2b); Xref |
| 48 | **Craft** | Hobbies › Crafting revival; Creativity › Visual arts & craft studios, Maker culture | Keep@Creativity; cut "Crafting revival" (→ cut.md) |
| 49 | **Performing arts** | Entertainment › Comedy & performing arts; Creativity › Improv & performing arts | Distinct: attend vs participate; rename both |
| 50 | **Responsible AI** | Social Impact › Responsible & ethical AI; Legal Tech › RegTech & AI-governance | Merge into "AI governance" |

### 2.2 Same word, different meaning (false positives, keep both)

*Commercial property* (investing vs insurance) · *Trusts* (estate vs relational) · *Cash-flow
management* (household vs corporate; rename the personal one "Household cash flow") ·
*Cybersecurity* (career skill vs industry; the career leaf gets cut with High-income skills) ·
*Mobility* (flexibility training / senior mobility / transportation / mobility devices), which needs
renaming (§5).

### 2.3 Cross-references: all 10 are informal and none resolve exactly

| At | Points to | Actual target |
|---|---|---|
| Sleep › Sleep tourism | "Lifestyle > Travel > **Wellness travel**" | **No such node.** Closest is *Travel & Adventure › Wellness & medical tourism* |
| Anti-aging › Skincare | "Lifestyle > Beauty" | *Fashion, Beauty & Personal Care* |
| Navigation › Medical tourism | "Lifestyle > Travel" | *Travel & Adventure* |
| Healthcare Services › Health insurance | "Wealth > Insurance > Health Insurance" | Case mismatch; resolves loosely |
| Specialty insurance › Pet | "Lifestyle > Pets" | *Pets & Animal Companions* |
| Marriage › Wedding industry | "Lifestyle > Events & Celebrations" | Pillar name abbreviated |
| Travel › Wellness & medical tourism | "Health > Healthcare Services" | Resolves (category level) |
| Fashion › Skincare & beauty DTC | "Health > Dermatology" | *Skin, Hair & Dermatology* |
| Pets › Pet insurance | "Wealth > Insurance" | Resolves (category level) |
| Death › End-of-life planning › Wills | "Wealth > Estate Planning" | Skips *Tax & Legal Finance* |

In Phase 2, cross-refs become structured (`see: [exact path]`) and the validator will reject any that don't resolve.

---

## 3. Misplacements

| Node | Current parent | Problem | Proposed home |
|---|---|---|---|
| Grief | Mental Health › **Trauma** | Grief isn't inherently trauma. The framing is clinically questionable | Death, Grief & Legacy › Grief support (Xref from Mental Health) |
| Neurodiversity (ADHD, Autism, Dyslexia…) | Mental Health | Dyslexia is a learning difference, and autism isn't generally classed as a mental illness. Many in the community object to this framing | Its own node under Health (e.g. *Neurodivergence*), with Xrefs to Career, Social Skills and Productivity |
| Men's fitness | Men's Health | Duplicates Fitness (#36) | Cut |
| Menopause & sexuality, Reproductive health | Sexual Health | Belong with Women's/Fertility | See #3, #7 |
| Fertility & family-building journeys | Family **Relationships** | Clinical/navigation market | Health › Fertility & Family Building |
| GLP-1 telehealth platforms | Healthcare **Technology** | It's a weight-management market, not a tech layer | Nutrition › GLP-1 |
| Naturopathy | Complementary › **Manual** therapies | Naturopathy isn't a manual therapy | Traditional/whole systems |
| Recovery communities | Mind › Identity & Community | Addiction recovery | Mental Health › Addiction recovery |
| Immigration legal services, Consumer legal tech | Wealth › Tax & Legal **Finance** | Not finance | Rename the category "Tax & Legal", or create a Legal subcategory |
| Asset protection › Business structures; Business formation & compliance | Tax & Legal | Overlaps Entrepreneurship › Starting a business | One *Business formation* node |
| Professional skills, High-income skills | Career & Income | These are curriculum topics, not markets. They overlap Learning & Education | Collapse into one "Upskilling" node; → cut.md |
| SMB operations software | Wealth › Entrepreneurship | B2B software market, not a founder path | Business Finance or the B2B pillar |
| AI-native products | Entrepreneurship | A product modality, not a business model. Overlaps the AI pillar | Tag `ai-native` instead; cut the node |
| Social Skills › Confidence › **Networking** | Confidence | Networking isn't a subtopic of confidence | Career or Community |
| Community › Social groups › **Religious communities** | Relationships | Spirituality & Faith › Faith communities already exists | Xref |
| Healthcare Services › Access & delivery | — | Mixes care types (Primary, Specialist), channels (Telehealth, Home) and populations (Rural, Veterans) in one list. Not MECE | Split by one axis |
| Healthcare Tech › Infrastructure › **Medical devices** | Infrastructure | A device is not infrastructure, and it's a whole industry | Its own subcategory |
| Space & Frontier › **Quantum computing**, **Humanoid robotics** | Space | Not space | Rename the category "Frontier Tech" or split out Robotics |
| Accessibility › Prosthetics & mobility devices | Society | Medical devices | Xref with Health |
| Cybersecurity › Consumer privacy & fraud protection | a `[b2b]` category | It's a consumer market | Tag `consumer`, or move to Personal Finance › Fraud protection |
| Travel › Digital nomadism › Nomad tax **(Nomad List)** | — | Nomad List isn't a tax product. Example and node don't match | Fix the note |
| Chronic › Respiratory › **Allergies** | Respiratory | Food allergies aren't respiratory | Rename "Seasonal allergies" or move to Immunology |
| Aging › Longevity science › **Preventive medicine** | Aging | Duplicates the Preventive Health category | Cut |
| Anti-aging › Skincare | Aging | Duplicates Fashion/Beauty and Dermatology | Xref only |

---

## 4. Granularity problems

1. **Two taxonomies in one file.** Health, Wealth and Relationships decompose into *self-help
   content topics*: Jealousy, Appreciation, Quality time, Swing trading, Value investing, Resume
   optimization. Lifestyle and Society decompose into *markets*: Freight marketplaces, Ghost
   kitchens. This is the root cause of most other problems. For a *startup-opportunity* map I'd
   propose one leaf test: **"could a company sell a product into this?"** Content topics that fail
   the test become notes or go to cut.md. Most affected: Romantic Relationships, Marriage,
   Friendships, Social Skills, Sexual Relationships, Investing (Stocks/Bonds/Mutual funds/ETFs),
   Trading, Career › skills lists.
2. **Depth mismatch between pillars.** Relationships averages 3.88 and all 17 Society categories
   are exactly 3.00. *Swing trading* gets its own leaf, while *Gaming & esports* (a very large
   industry) is one node with no children, and so are *Weddings* and *Climate* items like *Batteries
   & storage*.
3. **Mixed depth inside categories.** 35 of 74 categories have leaf-bearing subcategories next to
   bare ones. Mental Health is the worst: 6 detailed subcategories plus 8 bare items.
4. **Pillars are too wide for a max-depth-4 tree.** Health has 19 categories and Society 17. The
   3–8 rule can't hold for them without either merging categories (which loses resolution) or
   adding pillars. **This needs your decision** (§8, decision A).
5. **Undersized nodes**, which should merge up or gain siblings: *Pharmacy* (1 child), *Neck pain*,
   *Energy practices*, *Payment models*, *Navigation*, *Anti-aging*, *Personalized nutrition*,
   *Femtech platforms*, *Financial inclusion*, *Racquet sports*, *Collectibles*, *Modern
   spirituality*, *Kids' enrichment*, *End-of-life planning*, *Funeral innovation*, *Fertility &
   family-building journeys* (2 each). Also the Society categories with 3 children: *Legal Tech*,
   *Defense*, *Government*, *Accessibility*.
6. **Oversized nodes**: Mental Health (14), Personal Finance (13), Entrepreneurship (13), Fashion
   (12), Family Relationships (11), Hobbies (11), Travel (10), Sexual Health (10), Chronic (10),
   Alternative investments (9 leaves).
7. **Xref-only nodes**: *Health insurance* (Healthcare Services) and *Wedding industry* (Marriage)
   exist only to point elsewhere. They should become notes, not nodes.
8. **"AI-X" siblings.** AI appears as a sibling of the thing it modifies: AI bookkeeping next to
   Bookkeeping, AI tax prep, AI trading tools, AI dating assistants, AI tutors, AI trip planning,
   AI mental-health companions, AI coaches. AI is an orthogonal axis. I'd make it a tag
   (`ai-native`) except where the AI product is genuinely its own market (AI companions, ambient
   scribes, AI agents).
9. **The same pattern with Telehealth.** It appears as a generic node (Access & delivery ›
   Telehealth) and also as ~9 condition-specific variants: men's, pediatric, dental, derm, PT,
   dietitian, vet, GLP-1, online therapy. I'd drop the generic node and keep the specific markets.

---

## 5. Naming issues

**Child repeats the parent** (the "Dating apps under Online Dating" pattern). Proposed rule: strip
the repeated word only when the remainder still reads unambiguously on its own. Keep established
terms of art ("Sleep apnea", "Social anxiety", "Municipal bonds").

| Parent | Children today | Proposed |
|---|---|---|
| Online dating | Dating apps · Dating profiles · Profile photography · Online messaging | Apps · Profile optimization · Profile photography · Messaging |
| Vaccination | Adult/Travel/Workplace vaccination | Adult · Travel · Workplace |
| Sports nutrition | Athlete/Endurance/Strength-training/Competition nutrition | Endurance · Strength · Competition *(Athlete is redundant)* |
| Sleep optimization | Sleep tracking · Sleep routines · Sleep environment · Sleep-cooling tech… | Trackers · Routines · Bedroom environment · Cooling & smart beds |
| Credit | Credit building/repair/monitoring/cards/optimization | Building · Repair · Monitoring · Cards · Rewards optimization |
| Physical rehabilitation | Post-surgery/Sports/Occupational rehabilitation | Post-surgical · Sports · Occupational |
| Making friends | Adult/Workplace/Community/Online friendships · Friendship apps | Friendship apps · Adult friendship · … *(collapse)* |
| Marital conflict | Communication/Financial/Extended-family conflicts | *(content topics, collapse)* |
| Parenting | New parents · Infant/Toddler/Teen parenting | By stage: Newborn · Toddler · School-age · Teen |
| Stock trading, Forex, Futures, Bonds, Mutual funds | *X trading / X futures / X bonds / X funds* | Collapse (§4.1) |

**Tautologies and level errors**
- *Forex › Currency trading*: forex **is** currency trading.
- *Clinical AI › AI healthcare*: the child is broader than the parent.
- *Consumer health tech › Digital health*: likewise. *Health apps* overlaps it.
- *Digital assets › Cryptocurrency · Bitcoin · Ethereum*: Bitcoin and Ethereum are children of Cryptocurrency, not siblings.
- *Personal Finance › Credit › Credit cards* next to *Debt management › Credit cards*.

**Too long (>4 words): 60 names.** The worst, with proposed short forms:

| Current | Proposed |
|---|---|
| Medical nutrition therapy & dietitian telehealth | Dietitian care |
| Men's mental health & men's groups | Men's mental health |
| Global payroll, EOR & contractor compliance | Global payroll & EOR |
| Grid modernization & virtual power plants | Grid & VPPs |
| Long COVID, ME/CFS & chronic fatigue | Long COVID & ME/CFS |
| Direct primary care & concierge medicine | Membership primary care |
| Eating-disorder recovery & intuitive eating | Eating-disorder care *(intuitive eating is a different thing, see below)* |
| Society, Planet & Frontier Industries | *(depends on decision A)* |
| Age tech & silver economy | Age tech |
| Longevity clinics & membership medicine | Longevity clinics |

**"&" conjunctions (233 names).** Many are harmless ("Dental & Oral"). Some join *unlike* things and
break MECE, for example *Eating-disorder recovery & intuitive eating* (clinical treatment + a
non-clinical eating philosophy), *Wellness & medical tourism*, *Astrology & tarot*, *Gaming &
esports*, *Fishing & hunting*, *Motorsports & boating*. I'd split these or pick one.

**Ambiguous names that need disambiguating**
- **Recovery**: Athletic recovery science / Addiction recovery / Breakup recovery / Eating-disorder recovery / Abuse recovery / Stroke recovery.
- **Mobility**: Fitness › Mobility / Healthy aging › Mobility / Automotive & Mobility / mobility devices.
- **Performance**: Men's fitness › *Performance* (athletic or sexual?).
- **Security**: Smart home & security / Cybersecurity / Defense & Security Tech.
- **Community / Communities**: 7 different nodes.
- **Context-free leaves**: *Marketplaces* and *Certification* (under Life coaching), *Youth* (under Financial literacy), *Business* (under Specialty insurance), *Art*, *Music*, *Coding*.

**Plural/singular and case**
- Domain nodes use mass nouns (Nutrition, Fitness) but also plurals (Chronic Conditions, Healthcare Services, Supplements, Specialized diets).
- Instrument nodes switch too: Stocks vs Forex vs Futures vs ETFs.
- Proposed rule: domain = mass noun ("Sleep"); market = plural countable product ("Meal kits", "Dating apps"); condition = its clinical name.
- Case is mixed: "Health Insurance" in one xref, "Health insurance" elsewhere. Proposed: Title Case for pillars/categories, sentence case below.

**Tags**
- `hot` is on 77 nodes (7%), including both a category *and* its children (AI Infrastructure + AI agents).
- `underserved by software` is off-vocabulary.
- `regulated` is on only 6 nodes, but at least ~40 clearly qualify (all insurance, lending, crypto, psychedelics, GLP-1, TRT, supplements, trading, gambling, telehealth prescribing…).
- Proposed vocabulary: `trending`, `underserved`, `regulated`, `b2b`, `consumer`, and optionally `ai-native`. No tag is inherited from the parent.

**Examples inside names.** Brand examples are mostly in parentheses already. Proposal: keep them in `note`
with an "as of 2026" stamp. Some are probably stale and should be re-checked: Woebot (I believe its
consumer app was discontinued in 2025), Catch, Common coliving.

---

## 6. Gaps (adjacent categories that are missing)

I've prioritized 2024–26 momentum and obvious MECE holes. **★ = I'd add it in Phase 2 by default.**
Items marked **(new category)** need your approval under the structural-surgery rule.

**Health**
- ★ Brain health & dementia. Only "Cognitive health" exists under Healthy aging.
- ★ Youth & teen mental health.
- ★ Crisis & suicide-prevention services.
- ★ Serious mental illness (bipolar, schizophrenia).
- OCD.
- ★ Maternal care & doulas.
- Bone health / osteoporosis.
- Kidney disease; liver disease (MASLD), which rises with GLP-1 attention.
- ★ Compounding & Rx price transparency (Cost Plus-style) `regulated`.
- ★ Environmental health testing (air/water quality, mold, microplastics).
- Neurotech & consumer EEG/neurofeedback.
- Healthcare staffing marketplaces `b2b`.
- Hospital-at-home.
- Personal health records & health data portability.
- Clinical-trial matching for patients.
- Women's hair loss. Hair loss is currently male-only.
- Cannabis & CBD (medical and adult-use) `regulated` **(flag: legality varies by jurisdiction; your call whether to include)**.

**Wealth**
- ★ Homebuying & mortgages (consumer). Mortgage appears only as debt and as B2B tech.
- ★ Wealth management & advisor tech. Only robo-advice exists.
- ★ Earned wage access `regulated`.
- ★ Prediction markets `regulated` `trending`.
- ★ Sports betting & iGaming `regulated`. Only gambling *addiction* appears.
- ★ Consumer payments & P2P.
- Couples' finance (joint accounts). Xref with Marriage.
- College savings & education financing.
- HSAs & benefits accounts.
- Philanthropy & donor-advised funds.
- Embedded finance / BaaS `b2b`.
- AP/AR automation & procurement `b2b`.
- ★ Trade & tariff compliance `b2b` `trending`.
- Elder financial-fraud protection.

**Relationships**
- ★ AI companions `regulated`-adjacent `trending`. This is a large 2024–26 market with open ethical and regulatory questions; flag, don't assert.
- Domestic-violence safety & support (sensitive; neutral framing).
- Workplace relationships & conflict.
- Relationship structures (e.g. non-monogamy), if you want it for inclusivity. It's viewpoint-neutral as a market; your call.

**Mind & Growth**
- ★ Early-childhood education & preschool.
- ★ College admissions & student services.
- ★ Public speaking. It's a large coaching market and currently missing (only "Public interaction").
- Special education.
- EdTech for schools & teachers `b2b`.
- Micro-credentials.
- Book summaries & audio learning.
- Philosophy & Stoicism is buried under "Modern spirituality".

**Lifestyle**
- ★ Media, streaming & podcasts (consumer) **(new category)**.
- ★ Social & community apps.
- ★ Women's sports (fandom, leagues, gear) `trending`.
- ★ Outdoor recreation (hiking, climbing, ski). Only Outdoors (vanlife) exists under Travel.
- Fantasy sports.
- Grocery & cooking.
- Alcohol & spirits (non-NA).
- Renting & renter services.
- Moving (currently a note under Home services).
- Home electrification (heat pumps, rooftop solar) for consumers.
- ★ Autonomous vehicles & robotaxis `trending`.
- Personal safety devices.
- Luxury & resale beyond fashion.
- Pet pharmacy.

**Society / B2B / Frontier**
- ★ Semiconductors & AI chips **(new category)**.
- ★ AI data centers & power `trending`.
- ★ Nuclear, geothermal & fusion `trending`.
- Critical minerals & mining.
- ★ Neurotech & BCI.
- Synthetic biology.
- ★ Deepfake detection & content provenance `trending`.
- Trust & safety / moderation.
- ★ Commerce & retail tech (e-commerce enablement) **(new category)**.
- Travel & hospitality tech `b2b`.
- Fintech infrastructure (payments, stablecoin rails) `b2b`.
- Aviation & eVTOL, maritime, autonomous trucking.
- Telecom & connectivity.
- Climate adaptation (wildfire, flood, heat).
- Legal aid / access to justice.
- Elections & civic participation.
- Education access is currently only under Social Impact › emerging markets.

---

## 7. Medically / legally dubious items: flagged, not asserted

These are flags for review. They aren't medical or legal advice, and rules change by jurisdiction.
Items marked "verify" rest on my recollection of events and should be checked.

| Node | Flag | Proposed handling |
|---|---|---|
| Homeopathy | Scientific consensus finds no efficacy beyond placebo. US FTC/FDA scrutinize OTC homeopathic claims | Keep (it's a real market) with `regulated` and a note about the evidence base. Already noted in source |
| Reiki, Qigong (Energy practices) | Limited evidence for therapeutic claims. Qigong has some evidence as gentle exercise | Note: claims-marketing risk |
| Functional & integrative medicine | Contested evidence base for some "root-cause" protocols; cash-pay testing | Note |
| Naturopathy | Licensure and scope vary widely by state/country | `regulated` |
| Longevity supplements: **peptides**, NAD+ | Many "peptides" are drugs rather than supplements under US law. FDA restricted several for compounding (verify current list). NAD+ has limited human evidence; IV NAD+ is a clinic procedure | `regulated`; note |
| Regenerative medicine (Anti-aging) | Unapproved stem-cell/exosome clinics have drawn repeated FDA warnings | `regulated`; note |
| Whole-body imaging (Prenuvo) | Major radiology bodies do not recommend whole-body MRI screening for asymptomatic people (incidental findings, overdiagnosis) | Note |
| Preventive blood panels / at-home labs; Epigenetic age clocks; Microbiome testing | Clinical utility for healthy people is debated. US lab-test regulation shifted in 2025 (FDA LDT rule litigation; verify current status) | `regulated` on diagnostics; note on clocks and microbiome |
| CGM-based programs for non-diabetics | OTC CGMs were FDA-cleared in 2024, but evidence of benefit for non-diabetics is limited | Note |
| GLP-1 (incl. compounded) | Compounding rules tightened after FDA removed semaglutide/tirzepatide from the shortage list (2024–25; verify). Telehealth prescribing rules apply | `regulated` |
| Testosterone / TRT | Schedule III controlled substance; prescribing to men without deficiency is contested | `regulated` |
| Psychedelic-assisted therapy | Psilocybin/MDMA are federally Schedule I (US). FDA declined MDMA-AT in 2024. State programs (OR, CO) and off-label ketamine vary | Already `regulated`; add note |
| AI mental-health companions | Several US states restricted AI "therapy" in 2025 (verify, e.g. Illinois). Duty-of-care concerns. Example list may be stale (Woebot) | `regulated`; refresh examples |
| Digital therapeutics | Need FDA clearance; the reimbursement path is hard | Already `regulated` |
| Gender-affirming care / HRT access | Legal status varies sharply by jurisdiction and age. In the US, several states restrict care for minors (upheld in *US v. Skrmetti*, 2025) | `regulated`; neutral note "varies by jurisdiction" |
| Reproductive health | Abortion-related services are omitted. They're a legally volatile category in the US post-*Dobbs* | Your call whether to include; neutral if so |
| Donor & surrogacy | Commercial surrogacy is prohibited in many jurisdictions | `regulated` |
| PrEP access | Coverage mandates subject to litigation (*Braidwood*) | `regulated` |
| Med spas & medical aesthetics | Supervision/corporate-practice rules vary. "Fastest-growing clinic category" is an unsourced claim | `regulated`; drop the claim |
| DTC aligners, Teledentistry, Online eye exams, Myopia control | State dental/optometry boards restrict some remote models. SmileDirectClub collapsed in 2023. US approval of low-dose atropine for myopia: verify | `regulated` |
| Sauna / cold plunge / red-light / float | Therapeutic claims vary in evidence. Some red-light devices are FDA-cleared for specific uses only | Note on claims |
| Eating-disorder recovery & intuitive eating | ED treatment needs clinical care. "Intuitive eating" is a separate non-clinical approach | Split (§5) |
| "Paternal postpartum depression" | Literature more often says "paternal perinatal depression". It isn't a distinct DSM diagnosis | Rename |
| "Long COVID, ME/CFS & chronic fatigue" | ME/CFS is a distinct diagnosis. Patient communities object to conflating it with generic "chronic fatigue" | Rename (§5) |
| Prop firms & funded accounts | US regulators have acted against some operators (e.g. CFTC v. My Forex Funds, 2023). Model is often fee-driven | `regulated` |
| Retail forex, Copy trading, AI trading tools, Day trading | Retail loss rates are high. Copy trading and algorithmic advice can count as regulated investment advice | `regulated` |
| Debt settlement, Credit repair | Heavily regulated (FTC TSR, CROA); frequent enforcement | `regulated` |
| BNPL | US regulatory treatment changed in 2024–25 | Already `regulated` |
| Fractional art/wine/farmland, Real estate crowdfunding, Private-market retail access, Tokenized RWAs | Securities law (Reg A/CF, accreditation) | `regulated` |
| All insurance lines | State-licensed | `regulated` |
| Immigration legal services | Unauthorized-practice-of-law and "notario fraud" risk. Needs attorneys or DOJ-accredited reps | `regulated` |
| Consumer legal tech (online wills/divorce) | UPL rules | `regulated` |
| Sex tech & devices | Payment-processor restrictions; 2024–25 age-verification laws in many US states | `regulated` note |
| Childcare marketplaces, Child safety & parental controls, Dating safety (background checks) | Licensing, COPPA/age-appropriate-design laws, FCRA | `regulated` |
| Funeral innovation (direct cremation, green burial) | State funeral law; FTC Funeral Rule | `regulated` |
| AI recruiting | NYC LL 144 bias audits; EU AI Act high-risk. Already noted | `regulated` |
| Defense, Drones | ITAR/export controls; FAA | `regulated` |
| Unsourced figures | "~$100B" weddings (US estimates are usually lower; scope unclear), "fastest-growing US sport" (true per SFIA for 2021–24, but time-bound), "declared an epidemic" (US Surgeon General advisory, 2023: accurate) | Strip figures from notes or add source + year |

**Inclusivity / neutrality**
- "AA alternatives" frames recovery against one program. Proposed: "12-step & non-12-step communities".
- *Menstrual health* sits under Women's Health. That's fine, but the note should say "people who menstruate".
- Otherwise the file reads as inclusive and neutral.

---

## 8. Top 10 recommended changes

1. **Decision A: fix the pillar/category shape.** Health (19) and Society (17) can't meet 3–8 at max depth 4. **Recommended: 8 pillars.**
   - Split Health into *Health & Wellness* (prevention, nutrition, fitness, sleep, mental, sexual & reproductive, aging) and *Care & Conditions* (conditions, specialty care, delivery, health tech).
   - Split Society into *Enterprise & AI* (AI, dev tools, cyber, HR, legal, martech, commerce, fintech infra) and *Planet & Frontier* (climate, energy, ag, manufacturing, logistics, proptech, biotech, space, defense, civic).
   - Alternative: keep 6 pillars and allow up to ~12 categories per pillar as a documented exception. *(Structural: needs your approval.)*
2. **One leaf test: "can a startup sell into this?"** Collapse the self-help content-topic lists (Relationships, Investing/Trading instruments, Career skills) into market nodes plus notes, logging every cut. This will probably cut 150–250 nodes and make depth consistent across pillars.
3. **Deduplicate the 50 conflicts in §2** with explicit home rules:
   - financial products → Wealth
   - clinical → Health
   - relational → Relationships
   - consumer goods & experiences → Lifestyle
   - B2B infrastructure → Enterprise/Frontier

   Everything else becomes a structured `see:` cross-reference.
4. **Consolidate sexual & reproductive health.** Create one *Fertility & Family Building* node and one *Sexual Health* node (clinical). Relationships keeps a single *Intimacy & Sexuality* category (relational), replacing today's 3 intimacy nodes, Sexual Relationships and Relationship Psychology.
5. **Fix the ~25 misplacements in §3.** The most important: Grief out of Trauma, Neurodiversity out of Mental Health, Men's fitness cut, GLP-1 unified, Recovery communities → Addiction recovery, Immigration/legal out of "finance", Quantum/robotics out of Space.
6. **Make AI and telehealth attributes, not siblings.** Add an `ai-native` tag and drop generic *Telehealth* and duplicate *AI-X* nodes, except where they're standalone markets (AI companions, ambient scribes, AI agents).
7. **Normalize tags.**
   - `hot` → `trending`, pruned to roughly 40 nodes with a stated criterion (strong 2024–26 funding/adoption momentum).
   - Apply `regulated` consistently (about 6 → 45 nodes).
   - Add `consumer`/`b2b` where a pillar mixes them.
   - Drop "underserved by software".
8. **Apply the naming rules.** 1–4 words; strip parent repetition; split unlike "&" pairs; disambiguate *Recovery / Mobility / Security / Performance / Community*; fix the tautologies (Forex › Currency trading, Clinical AI › AI healthcare).
9. **Fill the ★ gaps in §6** (~35 nodes). The top ones are prediction markets & sports betting, AI companions, brain health & dementia, homebuying & mortgages, wealth/advisor tech, media & streaming, AI chips & data-center power, nuclear/geothermal, deepfake detection, trade & tariff compliance, youth mental health, and autonomous vehicles. The three **(new category)** items need approval.
10. **Clean up notes and cross-refs.**
    - Move brand examples to `note` with an as-of year and refresh the stale ones.
    - Strip or source numeric claims.
    - Replace the 10 informal "see also" strings with exact-path `see:` references that the Phase 3 validator enforces.
    - Tag and annotate every item in §7 neutrally.

**Estimated result:** ~750–900 nodes, 8 pillars × 6–8 categories, every non-leaf 3–8 children
(pillar level may be 9 where unavoidable), max depth 4, zero exact duplicates, zero unresolved cross-refs.

### Decisions I need from you before Phase 2

- **A. Pillars:** 8-pillar split (recommended) *or* 6 pillars with a wider-pillar exception?
- **B. Leaf test / content-topic collapse** (#2): OK to cut self-help topic lists into notes (logged in `cut.md`)?
- **C. New categories:** approve *Media & Streaming*, *Semiconductors & AI Chips*, *Commerce & Retail Tech*? Any gaps from §6 to skip?
- **D. Sensitive inclusions:** include *Cannabis & CBD*, *Abortion-related services*, *Relationship structures*, *Sports betting / prediction markets* (all tagged `regulated`, neutral notes)? Include / exclude / your call each.
- **E. Brand examples:** keep in notes (as-of 2026), or strip them entirely?
