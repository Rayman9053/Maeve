# Changelog

## v1: canonical refinement of `source/taxonomy-v0.md` → `taxonomy.yaml`

Approved decisions (Phase 1 audit):

| | Decision |
|---|---|
| A | Split into **8 pillars**: Health → *Health & Wellness* + *Care & Conditions*; Society → *Enterprise & AI* + *Planet & Frontier* |
| B | Collapse self-help content-topic lists into notes (every node is logged in `cut.md`) |
| C | Add the gaps, including *Media & streaming*, *Semiconductors & AI chips*, *Commerce & Retail Tech* |
| D | **Exclude** cannabis/CBD, abortion-related services, relationship structures, sports betting and prediction markets. None were added |
| E | Keep brand examples in `note:` (as of 2026) |

Two structural consequences of A, flagged here so you can veto them in the YAML:

- **Every pillar now has at most 8 categories.** Getting there required category-level merges and moves: Trading was merged into Investing, Career & Income moved to Mind, Business Finance moved to Enterprise & AI, Death, Grief & Legacy moved to Relationships, and Kids & Baby and Events & Celebrations were dissolved into neighbours.
- **Two approved "new categories" landed one level lower, as subcategories** (Media & streaming → *Entertainment & Events › Streaming & video / Podcasts & audio*; Semiconductors & AI chips → *Deep Tech › Semiconductors & AI chips*). Their pillars were already at 8 categories. *Commerce & Retail Tech* is a full category.

**Reason codes** used below:
- **R1** name ≤ 4 words
- **R2** strip a word repeated from the parent
- **R3** duplicate → one home + cross-ref
- **R4** split an "&" pair of unlike things
- **R5** move to the home dictated by the placement rules (financial product → Wealth, clinical → Care/Health, relational → Relationships, consumer spend → Lifestyle, horizontal B2B → Enterprise & AI, physical/deep tech → Planet & Frontier)
- **R6** disambiguate an ambiguous name
- **R7** structure: 3–8 children, max depth 4, uniform depth
- **R8** fix a tautology or level error
- **R9** leaf test (market vs. content topic)

Other global changes:
- Tags normalized: `hot` → `trending`, pruned from 77 to 48 nodes (criterion: clear 2024–26 funding/adoption inflection). `regulated` went from 6 to 60 nodes. `underserved by software` was dropped. `consumer` and `ai-native` were added. A tag now covers its subtree and is never repeated below it.
- The 10 informal "see also" strings are replaced by 45 structured `see:` paths, all verified by `validate.py`.
- Numeric marketing claims were removed or sourced ("~$100B" weddings and "fastest-growing clinic category" were removed; Pickleball is now sourced to SFIA 2021–24).
- Every subcategory now has 3–8 leaves (uniform depth 4). This is why the node count rose even though content topics were cut. The new leaves are listed under **Additions** at the end.

---

### Pillars and categories

| Old | New | Reason |
|---|---|---|
| `Health` | `Health & Wellness` + `Care & Conditions` | A: 19 categories can't fit 3–8 |
| `Society, Planet & Frontier Industries` | `Enterprise & AI` + `Planet & Frontier` | A: 17 categories; R1 |
| `Preventive Health` | `Prevention & Diagnostics` | Scope now includes diagnostics |
| `Nutrition` | `Nutrition & Metabolic Health` | Absorbs GLP-1/metabolic |
| `Fitness` | `Fitness & Recovery` | Absorbs athletic recovery |
| `Women's Health` · `Men's Health` · `Children's Health` · `LGBTQ+ & Gender-Affirming Care` | `Care & Conditions > Population-Specific Care` (subcategories) | R7: population lens grouped; generic items moved to need-based homes |
| `Sexual Health` | `Health & Wellness > Sexual & Reproductive Health` | R3: one home for fertility, contraception, pregnancy, STI and dysfunction |
| `Dental & Oral Health` · `Vision & Hearing` · `Skin, Hair & Dermatology` | `Care & Conditions > Specialty Care` | R7: tiny categories (3–4 items) grouped |
| `Chronic Conditions` | `Care & Conditions > Chronic Conditions` | Moved |
| `Pain & Rehabilitation` | `Pain & Musculoskeletal` | Absorbs chronic pain and ergonomics |
| `Complementary & Integrative Medicine` | `Integrative Medicine` | R1 |
| `Healthcare Services` | `Care Delivery` | Access/payment/pharmacy/navigation regrouped |
| `Healthcare Technology` | `Health Technology` | B2B health-system tech |
| `Personal Finance` | `Money Management` + `Banking & Payments` | 13 children → split |
| `Investing` · `Trading` | `Investing & Trading` | Pillar ≤ 8 |
| `Career & Income` | `Mind, Meaning & Growth > Career Development` | Pillar ≤ 8; career growth sits with learning |
| `Tax & Legal Finance` | `Tax & Legal` | R8: immigration and consumer law are not finance |
| `Retirement` | `Retirement & Wealth Planning` | Absorbs estate planning and wealth management |
| `Business Finance` | `Enterprise & AI > Business Finance Tech` | R5: B2B software |
| `Romantic Relationships` · `Marriage` | `Couples & Marriage` | R3: overlapping content |
| `Sexual Relationships` | `Intimacy & Sexuality` | R3: absorbs three intimacy nodes |
| `Relationship Psychology` | `Social Skills > Relationship psychology` | R7: 4 items |
| `Family Relationships` | `Parenting & Family` | Absorbs Kids & Baby |
| `Friendships` · `Community & Social Life` | `Friendship & Community` | R3 |
| `Mindfulness & Contemplative Practice` | `Contemplative Practice` | R1 |
| `Purpose & Life Direction` | `Purpose & Life Transitions` | Clearer scope |
| `Productivity & Personal Management` | `Productivity` | R1 |
| `Inner Growth` | `Personal Development` | Absorbs circles from Identity & Community |
| `Identity & Community` | dissolved | Items moved to Mental Health, Personal Development, Friendship & Community |
| `Hobbies, Sports & Recreation` | `Sports & Hobbies` | Gaming moved to Entertainment |
| `Entertainment & Nightlife` · `Events & Celebrations` | `Entertainment & Events` | Pillar ≤ 8; adds media & streaming |
| `Fashion, Beauty & Personal Care` | `Fashion & Beauty` | R1 |
| `Pets & Animal Companions` | `Pets & Animal Care` | Wording |
| `Kids & Baby` | `Relationships > Parenting & Family` (Childcare; Baby & kids products) | Pillar ≤ 8; family spend sits with parenting |
| `Automotive & Mobility` | `Cars & Transportation` | R6: "Mobility" was ambiguous |
| `Death, Grief & Legacy` | `Relationships > Death, Grief & Legacy` | Pillar ≤ 8; loss and legacy are relational/family events |
| `AI & Automation Infrastructure` | `AI Infrastructure` | R1 |
| `Cybersecurity` | `Cybersecurity & Trust` | Adds trust & safety |
| `Work & HR Technology` | `Work & HR Tech` | R1 |
| `Legal, Risk & Compliance Tech` | `Legal & Compliance Tech` | R1 |
| `PropTech & Construction` | `Built Environment` | Wording |
| `Logistics & Supply Chain` · `Manufacturing & Industry 4.0` | `Industry & Supply Chain` | Pillar ≤ 8 |
| `Climate, Energy & Environment` | `Climate & Energy` | R1 |
| `Space & Frontier Tech` · `Defense & Security Tech` | `Aerospace & Defense` + `Deep Tech` | R8: quantum and robotics are not space |
| `Government, Civic & Public Interest` · `Accessibility & Assistive Tech` · `Social Impact & Development` | `Public Interest & Impact` | Pillar ≤ 8 |

---

### Node changes: Health (old pillar)

| Old location | Before | After | Reason |
|---|---|---|---|
| Preventive Health › Health screenings | `Executive health checkups` | `Executive physicals` | R1 |
| Preventive Health | `At-home diagnostics & lab testing` | `At-home testing` | R1 |
| Preventive Health | `Whole-body imaging & early detection` | `Early-detection imaging` + `Whole-body MRI` | R1, R7 |
| Preventive Health | `Genomics & precision health` | `Genomics` | R1 |
| Preventive Health | `Vaccination` | `Immunization` | Wording |
| Vaccination | `Adult vaccination` · `Travel vaccination` · `Workplace vaccination` | `Adult immunization` · `Travel vaccines` · `Workplace flu clinics` | R2 |
| Preventive Health | `Corporate & employer wellness programs` | `Enterprise & AI > Work & HR Tech > Employee wellbeing > Wellness programs` | R3, R5 |
| Nutrition | `GLP-1 & medical weight management` | `GLP-1 economy` | R1 |
| Healthcare Technology | `GLP-1 telehealth platforms` | `GLP-1 economy > GLP-1 telehealth` | R3 |
| Sports nutrition | `Endurance nutrition` · `Strength-training nutrition` · `Competition nutrition` | `Endurance fueling` · `Strength & protein` · `Competition prep` | R2 |
| Nutrition | `Specialized diets` | `Special diets` | Wording |
| Specialized diets | `Low-carb` · `Keto` | `Low-carb & keto` | R3: keto is a low-carb diet |
| Supplements | `Vitamins` · `Minerals` | `Vitamins & minerals` | R7 |
| Supplements | `Protein` | `Protein powders` | R6 |
| Nutrition | `Longevity supplements` | `Supplements > Longevity supplements` | R7 |
| Personalized nutrition | `CGM-based programs` | `CGM programs` | R1 |
| Nutrition | `Medical nutrition therapy & dietitian telehealth` | `Clinical nutrition > Dietitian telehealth` · `Medical nutrition therapy` | R1, R4 |
| Nutrition | `Eating-disorder recovery & intuitive eating` | `Eating-disorder treatment` · `Intuitive eating` | R4: clinical vs non-clinical |
| Fitness | `Cardiovascular fitness` | `Cardio & endurance` | Wording |
| Fitness | `Mobility` | `Mobility & flexibility` | R6 |
| Mobility | `Flexibility` | `Stretching` | R3 |
| Fitness | `Home fitness` | `Connected fitness` | Scope |
| Fitness | `Athletic recovery science` | `Athletic recovery` | R1, R6 |
| Athletic recovery | `Sauna & heat therapy` | `Sauna & heat` | Wording |
| Fitness | `Group fitness & boutique studios` | `Gyms & studios` + `Boutique franchises` | R1 |
| Fitness | `Youth athletics & sports performance` | `Youth sports` | R1 |
| Sleep optimization | `Sleep tracking` · `Sleep routines` · `Circadian rhythm` · `Sleep environment` · `Sleep-cooling tech & smart mattresses` | `Sleep trackers` · `Routines & coaching` · `Circadian lighting` · `Bedroom environment` · `Cooling & smart beds` | R2, R1 |
| Sleep | `Sleep tourism` | `Lifestyle, Home & Experiences > Travel & Adventure > Wellness travel > Sleep tourism` | R5; xref from Sleep |
| Sleep disorders | `Insomnia` | `Insomnia & CBT-I` | Names the treatment market |
| Children's Health | `Infant & child sleep` | `Sleep > Infant & child sleep` | R5 |
| Mental Health | `Anxiety` · `Depression` | `Anxiety & mood` | R7: Mental Health had 14 children |
| Anxiety | `General anxiety` · `Panic` | `Generalized anxiety` · `Panic disorder` | Clinical names |
| Depression | `Postpartum depression` · `Paternal postpartum depression` | `Perinatal depression` | R3; clinical term |
| Mental Health | `Stress management` | `Stress & burnout` | Wording |
| Mental Health | `Therapy` | `Therapy access` | R6 |
| Therapy | `Provider directories & matching` · `Sliding-scale & community clinics` | `Therapist matching` · `Sliding-scale clinics` | R1 |
| Mental Health | `Trauma` | `Trauma & PTSD` | Wording |
| Trauma | `Grief` | `Relationships > Death, Grief & Legacy > Grief support` | Grief ≠ trauma; R3 |
| Mental Health | `Neurodiversity` | `Care & Conditions > Brain & Neurological Health > Neurodivergence` | Not a mental illness; R5 |
| Neurodiversity | `Dyslexia` · `Executive function` · `Late-diagnosis adult ADHD/autism` | `Dyslexia & learning differences` · `Executive-function coaching` · `Late diagnosis` | R1, R9 |
| Mental Health | `Meditation & mindfulness apps` | `Mind, Meaning & Growth > Contemplative Practice > Meditation > Meditation apps` | R3 |
| Mental Health | `Digital therapeutics & prescription apps` · `AI mental-health companions` · `Peer-support communities` | `Digital mental health` (subcategory) | R7 |
| Mental Health | `Psychedelic-assisted therapy` | `Acute & advanced care > Psychedelic-assisted therapy` | R7 |
| Addiction recovery | `Gambling` · `Opioids` | `Gambling addiction` · `Opioid recovery` | R6 |
| Identity & Community | `Recovery communities` | `Addiction recovery > Recovery communities` | R3, R5 |
| Mental Health | `Men's mental health & men's groups` | `Men's mental health` | R1 |
| Men's Health | `Fatherhood & men's emotional health` | merged into `Men's mental health` | R3 |
| Mental Health | `Affirmative & culturally responsive care` | `Population-focused care` | R1 |
| Affirmative care | `Bilingual therapy` | merged into `Culturally responsive therapy` | R3 |
| Women's Health | `Reproductive health` | `Sexual & Reproductive Health` (category) | R3 |
| Reproductive health | `Fertility` | `IVF & fertility clinics` | R6 |
| Reproductive health | `Pregnancy` · `Postpartum` | `Pregnancy & postpartum > Prenatal care` · `Postpartum recovery` | R7 |
| Reproductive health | `Egg freezing & fertility preservation` | `Egg freezing` | R1 |
| Reproductive health | `Contraception` | `Contraception` (subcategory) | R7 |
| Reproductive health | `Pregnancy-loss support` | `Pregnancy & postpartum > Pregnancy-loss support` | R7 |
| Women's Health | `Hormonal health` · `Pelvic health` · `Breast health` · `Femtech platforms` | dissolved into `Women's health` leaves | R7: depth 4 |
| Hormonal health | `PMS` | `PMS & PMDD` | Scope |
| Hormonal health | `Menopause` · `Perimenopause` | `Menopause & perimenopause` | R3 |
| Pelvic health | `Pelvic floor` · `Incontinence` | `Pelvic floor & incontinence` | R3 |
| Breast health | `Breast screening` | merged into `Cancer screening` | R3 |
| Breast health | `Breastfeeding` | `Lactation support` | R5 |
| Breast health | `Breast cancer support` | `Chronic Conditions > Oncology > Breast cancer support` | R5 |
| Women's Health | `Menstrual health & period products` | `Menstrual health` | R1 |
| Femtech platforms | `Cycle tracking` | merged into `Menstrual health` (note) | R7 |
| Men's Health | `Sexual health` | dissolved | R3: dup of Sexual Health category |
| Men's sexual health | `Erectile dysfunction` · `Male fertility` | `Sexual health services > Erectile dysfunction` · `Fertility & family building > Male fertility` | R3, R5 |
| Men's sexual health | `Libido` | `Low libido` | R3, R6 |
| Men's sexual health | `Testosterone` | `Testosterone therapy` | R6 |
| Men's Health | `Prostate health` | `Prostate care` | R7 |
| Prostate health | `Prostate screening` | merged into `Cancer screening` | R3 |
| Prostate health | `BPH` | merged into `Prostate care` | R7 |
| Prostate health | `Prostate cancer support` | `Oncology > Prostate cancer support` | R5 |
| Men's Health | `Hair loss & male dermatology` | `Specialty Care > Dermatology > Hair loss` | R5; all genders |
| Men's Health | `Vasectomy & male family planning` | `Contraception > Vasectomy` | R1, R5 |
| Men's Health | `Men's telehealth` | `Population-Specific Care > Men's health > Men's telehealth` | Moved |
| Sexual Health | `Sexual dysfunction` | split into `Erectile dysfunction` · `Low libido` | R9 |
| Sexual Health | `Libido` | `Low libido` | R3 |
| Sexual Health | `Reproductive health` | merged into `Sexual & Reproductive Health` | R3 |
| Sexual Health | `LGBTQ+ sexual health` | `PrEP access` | R6 |
| Sexual Health | `Menopause & sexuality` | merged into `Menopause & perimenopause` (note) | R3 |
| Sexual Health | `Sex tech & devices` · `Sex education platforms` · `Sexual wellness` | `Sexual wellness` (subcategory) | R7 |
| — | `LGBTQ+ & Gender-Affirming Care` | `Population-Specific Care > LGBTQ+ health` | R7 |
| Dental & Oral Health | `DTC aligners` | `Clear aligners` | Wording |
| — | `Vision & Hearing` | `Vision` · `Hearing` subcategories | R4 |
| — | `Skin, Hair & Dermatology` | `Dermatology` | R1 |
| Skin, Hair & Dermatology | `Med spas & medical aesthetics` | `Medical aesthetics > Med spas` | R1 |
| Chronic Conditions | `Cardiovascular disease` | `Cardiometabolic disease` | Scope (adds kidney, liver) |
| Cardiovascular disease | `Stroke recovery` | `Brain & Neurological Health > Neurological conditions > Stroke recovery` | Stroke is cerebrovascular |
| Autoimmune disease | `Multiple sclerosis` | kept in `Autoimmune disease` | — |
| Digestive health | `Gut microbiome` | merged into `Microbiome testing` (xref) | R3 |
| Chronic Conditions | `Respiratory health` | `Respiratory & allergy` | Scope |
| Respiratory health | `Allergies` | `Seasonal allergies` · `Food allergies` | R6: food allergies aren't respiratory |
| Chronic Conditions | `Oncology support & cancer navigation` | `Oncology > Cancer navigation` | R1, R7 |
| Chronic Conditions | `Long COVID, ME/CFS & chronic fatigue` | `Long COVID` · `ME/CFS` | R4: ME/CFS ≠ generic fatigue |
| Chronic Conditions | `Rare-disease communities & diagnostics` | `Rare-disease communities` · `Rare-disease diagnostics` | R4 |
| Chronic Conditions | `Migraine & headache` | `Brain & Neurological Health > Neurological conditions` | R5 |
| Chronic Conditions | `Chronic-pain programs` | `Pain & Musculoskeletal > Chronic pain > Non-opioid pain programs` | R3 |
| Pain & Rehabilitation | `Back pain` · `Neck pain` | `Back & neck` | R7: Neck pain had 2 children |
| Pain & Rehabilitation | `Joint health` | `Joint & bone health` | Scope (adds osteoporosis) |
| Joint health | `Arthritis` | `Osteoarthritis` | R6 vs rheumatoid |
| Physical rehabilitation | `Post-surgery rehabilitation` · `Sports rehabilitation` · `Occupational rehabilitation` | `Post-surgical rehab` · `Sports rehab` · `Occupational rehab` | R2 |
| Pain & Rehabilitation | `Musculoskeletal tele-PT` | `Digital MSK > Virtual physical therapy` | Wording |
| Pain & Rehabilitation | `Ergonomics & workplace injury prevention` | `Ergonomics > Workplace injury prevention` | R1 |
| Complementary medicine | `Traditional systems` | `Whole systems` | Includes homeopathy and naturopathy |
| Traditional systems | `Unani & Indigenous medicine` | `Unani` · `Indigenous medicine` | R4 |
| Manual therapies | `Naturopathy` | `Whole systems > Naturopathy` | Not a manual therapy |
| Complementary medicine | `Homeopathy` | `Whole systems > Homeopathy` (regulated; evidence note) | R7 |
| Complementary medicine | `Functional & integrative medicine` | `Integrative clinics > Functional medicine` | R1 |
| Complementary medicine | `Energy practices` | `Energy & movement practices` | R7: had 2 children |
| Healthy aging | `Mobility` · `Cognitive health` · `Nutrition for seniors` | `Senior mobility` · `Cognitive fitness` · `Senior nutrition` | R6 |
| Aging & Longevity | `Longevity science` · `Longevity clinics & membership medicine` | `Longevity medicine` | R3 |
| Longevity science | `Biomarkers` · `Healthspan` | `Biomarker tracking` · `Healthspan programs` | R9 |
| Longevity clinics | `Longevity clinics & membership medicine` | `Longevity clinics` | R1 |
| Aging & Longevity | `Anti-aging` | dissolved | R7: had 2 children |
| Anti-aging | `Skincare` | xref to `Fashion & Beauty > Beauty & skincare > Skincare DTC` | R3 |
| Anti-aging | `Regenerative medicine` | `Longevity medicine > Regenerative medicine` | R7 |
| Aging & Longevity | `Biohacking & human optimization` | `Biohacking` | R1 |
| Biohacking | `NAD+ protocols` | merged into `Longevity supplements` | R3 |
| Aging & Longevity | `Age tech & silver economy` | `Age tech` | R1 |
| Age tech | `Caregiving coordination` | `Caregiving > Care coordination` | R3 |
| Age tech | `Senior fitness` | `Adaptive & inclusive fitness > Senior fitness` | R3 |
| — | `Healthcare Services` | `Care Delivery` | Wording |
| Healthcare Services | `Access & delivery` | split into `Primary & urgent care` · `Home & virtual care` · `Population-Specific Care` | Not MECE (mixed care types, channels, populations) |
| Access & delivery | `Primary care` · `Specialist care` | `Tech-enabled primary care` · `Specialist e-consults` | R9 |
| Access & delivery | `Elder care` | merged into `Caregiving > Home care agencies` | R3 |
| Access & delivery | `Rural & underserved health` | `Rural & underserved care` | Wording |
| Access & delivery | `Veterans' health` | `Population-Specific Care > Veterans' health` | R7 |
| Healthcare Services | `Payment models` | dissolved | R7: had 2 children |
| Payment models | `Direct primary care & concierge medicine` | `Membership primary care` | R1 |
| Payment models | `Cash-pay & price-transparent surgery` | `Patient navigation > Cash-pay surgery` | R1 |
| Pharmacy | `Online pharmacy & Rx savings` | `Online pharmacy` · `Rx price transparency` | R4; Pharmacy had 1 child |
| Healthcare Services | `Navigation` | `Patient navigation` | R6 |
| Navigation | `Patient advocacy & navigation` | `Patient advocacy` | R2 |
| Healthcare Services | `Health insurance` | xref to `Wealth > Insurance > Health & benefits` | R3: every insurance line lives in Wealth |
| — | `Healthcare Technology` | `Health Technology` | R1 |
| Healthcare Technology | `Consumer health tech` | dissolved | R8 |
| Consumer health tech | `Wearables` | `Medical devices > Consumer health wearables` | R6 |
| Consumer health tech | `Remote monitoring` | `Home & virtual care > Remote patient monitoring` | R6 |
| Clinical AI | `AI healthcare` | `Clinical decision support` · `AI imaging diagnostics` | R8: child was broader than parent |
| Clinical AI | `Ambient AI scribes & documentation` | `Ambient AI scribes` | R1 |
| Clinical AI | `Prior-authorization & revenue-cycle automation` | `Revenue cycle & payer > Prior authorization` · `Revenue-cycle automation` | R4 |
| Healthcare Technology | `Infrastructure` | `Health data infrastructure` | R6 |
| Infrastructure | `Interoperability & data exchange` | `Interoperability` | R1 |
| Infrastructure | `Medical devices` | `Medical devices` (subcategory) | Device ≠ infrastructure |

### Node changes: Wealth

| Old location | Before | After | Reason |
|---|---|---|---|
| — | `Personal Finance` | `Money Management` + `Banking & Payments` | R7 |
| Budgeting | `Cash-flow management` | `Household cash flow` | R6 vs corporate |
| Saving | `Children's savings` | `Kids' savings` | Wording |
| Debt management | `Mortgage debt` | merged into `Housing & Real Estate > Homebuying > Mortgages` | R3 |
| Debt management | `Credit cards` | `Credit-card debt` | R3, R6 |
| Credit | `Credit optimization` | `Rewards optimization` | R2 |
| Personal Finance | `Neobanks & challenger banking` | `Digital banking > Neobanks` | R1 |
| Personal Finance | `BNPL & consumer lending` | `Consumer lending > Buy now pay later` | R1 |
| Personal Finance | `Remittances & cross-border money` | `Cross-border money > Remittances` | R1 |
| Personal Finance | `Financial literacy & education` | `Financial wellness` | R1 |
| Financial literacy | `Youth` · `First-generation` · `Workplace programs` | `Youth financial education` · `First-generation guidance` · `Workplace financial wellness` | R6: context-free names |
| Personal Finance | `Money psychology & financial therapy` | `Financial wellness > Financial therapy` | R1 |
| Personal Finance | `Wealth transitions` | `Life-event finance` | Wording |
| Wealth transitions | `Widowhood` | `Widowhood finance` | R6 |
| Wealth transitions | `Inheritance` | `Windfall management` | R3 vs estate planning |
| Wealth transitions | `Divorce finance` | xref to `Relationships > Breakups & Divorce > Divorce finance` | R3 |
| Financial inclusion | `Credit-building for the unbanked` | merged into `Credit building` | R3 |
| Personal Finance | `Gig & creator finance` | + `Gig-worker retirement` merged in | R3 |
| Retirement | `Gig-worker retirement` | `Gig & creator finance > Gig-worker retirement` | R3 |
| — | `Investing` · `Trading` | `Investing & Trading` | Pillar ≤ 8 |
| Investing | `Stocks` · `Bonds` · `Mutual funds` · `ETFs` | `Public markets` | R9, R7 |
| Mutual funds / ETFs | `Index funds` · `Broad-market ETFs` | `Index funds & ETFs` | R3 |
| Mutual funds / ETFs | `Active funds` · `Sector funds` · `Sector ETFs` | `Active & sector funds` | R3 |
| ETFs | `Commodity ETFs` | merged into `Commodities & precious metals` | R3 |
| Investing | `Robo-advisory` | `Automated investing > Robo-advisors` | Wording |
| Investing | `Real estate investing` | `Housing & Real Estate > Real estate investing` | New housing category |
| Real estate investing | `Vacation rentals` · `Crowdfunding` | `Short-term rentals` · `Real estate crowdfunding` | Wording, R6 |
| Alternative investments | `Private equity` · `Venture capital` | `Private equity & VC` | R7: had 9 children |
| Alternative investments | `Commodities` · `Precious metals` | `Commodities & precious metals` | R3 |
| Alternative investments | `Collectibles` · `Art` · `Wine & spirits` | `Collectible assets` | R3, R6 vs hobby collecting |
| Investing | `Private-market retail access` | `Alternative investments > Private-market access` | R1 |
| Digital assets | `Cryptocurrency` · `Bitcoin` · `Ethereum` | `Crypto exchanges & wallets` | R8: Bitcoin/Ethereum were siblings of their parent |
| Digital assets | `Crypto tax & compliance` | merged into `Tax planning > Crypto tax` | R3 |
| Trading | `Stock trading` | `Active trading` | R7 |
| Stock trading | `Day trading` · `Swing trading` · `Momentum trading` | `Day & swing trading` | R3 |
| Trading | `Forex` | `Retail forex` | R7 |
| Trading | `Options` · `Options trading` | `Options trading` | R3 |
| Trading | `Futures` | `Active trading > Futures` | R7 |
| Trading | `Prop firms & funded accounts` · `Social & copy trading` · `AI trading tools & simulators` | `Trading platforms > Prop firms` · `Copy trading` · `AI trading tools` · `Trading simulators` | R1, R4 |
| Starting a business | `Business ideas` · `Business validation` | `Idea validation` | R3 |
| Entrepreneurship | `Buying a business (ETA / micro-PE)` | `Acquisition entrepreneurship` | R1 |
| Entrepreneurship | `Solopreneur & one-person-business models` | `Solopreneurship` | R1 |
| Small business | `Local businesses` · `Service businesses` · `Retail businesses` | `Local services` · `Retail shops` | R2, R3 |
| Entrepreneurship | `Skilled-trades businesses` | `Small business > Skilled-trades businesses` | R7 |
| Online business | `Online education` | `Online courses` | R6 |
| Entrepreneurship | `No-code launches` | xref to `Enterprise & AI > Software & Developer Tools > No-code & low-code` | R3 |
| Creator economy | `Influencer businesses` · `Personal brands` | `Influencer brands` | R3 |
| Creator economy | `Live shopping & social commerce` · `Fan/membership platforms` | `Live & social commerce` · `Fan memberships` | R1 |
| Creator economy | `UGC marketplaces` | `Enterprise & AI > Marketing & Sales Tech > Creator platforms > UGC marketplaces` | R3, R5 |
| Entrepreneurship | `Freelancing` · `Fractional executives` | `Freelancing & fractional` | R7 |
| Agencies | `AI automation` | `AI automation agencies` | R6 |
| Entrepreneurship | `SMB operations software` | `Enterprise & AI > Commerce & Retail Tech > SMB vertical software` | R5 |
| — | `Career & Income` | `Mind, Meaning & Growth > Career Development` | Pillar ≤ 8 |
| Career development | `Job searching` · `Resume optimization` | `Job search > Job boards` · `Resume tools` | R2, R9 |
| Career & Income | `AI-era reskilling` | `Upskilling > AI upskilling` | R3 |
| Career & Income | `Returnships & career re-entry` · `Veterans' career transition` | `Career transitions > Returnships` · `Veterans' transition` | R1 |
| Career & Income | `Neurodivergent employment` | `Inclusive employment > Neurodivergent hiring` | R9 |
| Career & Income | `Professional skills` · `High-income skills` | `Upskilling` | R9 |
| Professional skills | `Leadership` · `AI skills` | `Leadership development` · merged into `AI upskilling` | R9, R3 |
| High-income skills | `Sales` | `Sales training` | R9 |
| Career & Income | `Employment models` | `Work arrangements` | Wording |
| Employment models | `Remote work` · `Executive careers` | `Remote job boards` · `Executive search` | R9 |
| Employment models | `Freelancing` | xref to `Wealth > Entrepreneurship > Freelancing & fractional` | R3 |
| Employment models | `Global remote hiring` | `Enterprise & AI > Work & HR Tech > Global workforce > Global hiring` | R3 |
| Career & Income | `Skilled trades & vocational careers` | `Skilled trades careers` | R1 |
| Social Skills › Confidence | `Networking` | `Career Development > Professional networking` | Networking isn't a confidence subtopic |
| — | `Tax & Legal Finance` | `Tax & Legal` | R8 |
| Tax planning | `Business tax` · `International tax` · `Crypto/DeFi tax` | `Small-business tax` · `International & expat tax` · `Crypto tax` | R6, R3 |
| Tax & Legal Finance | `AI tax prep` | `Tax preparation > AI tax prep` | R7 |
| Tax & Legal Finance | `Estate planning` | `Retirement & Wealth Planning > Estate planning` | R7 |
| Estate planning | `Inheritance` | `Inheritance planning` | R6 |
| Tax & Legal Finance | `Asset protection` | `Wealth management > Asset protection` | R7 |
| Asset protection | `Business structures` | merged into `Business formation` | R3 |
| Asset protection | `Trust structures` | merged into `Trusts` | R3 |
| Asset protection | `Liability management` | merged into `Asset protection` | R7 |
| Tax & Legal Finance | `Consumer legal tech` | `Consumer legal services` | R9 |
| Consumer legal tech | `Online wills` | merged into `Wills` | R3 |
| Consumer legal tech | `Online divorce` | `Relationships > Breakups & Divorce > Divorce process > Online divorce` | R3 |
| Consumer legal tech | `Landlord-tenant` | `Housing & Real Estate > Renting > Landlord-tenant disputes` | R5 |
| Tax & Legal Finance | `Immigration legal services` | `Immigration services` | R1 |
| Tax & Legal Finance | `Business formation & compliance` | `Entrepreneurship > Starting a business > Business formation` | R3 |
| — | `Retirement` | `Retirement & Wealth Planning` | Scope |
| Retirement planning | `Early retirement` · `FIRE` | `Early retirement & FIRE` | R3 |
| Retirement | `Home-equity release` | `Housing & Real Estate > Home equity > Equity release` | R5 |
| Retirement | `Retirement investing` | `Retirement accounts` | Wording |
| Retirement investing | `Retirement accounts` | `IRAs & 401(k)s` | R2 |
| Retirement investing | `Social security planning` | `Retirement planning > Social Security planning` | R7 |
| Insurance | `Health insurance` · `Property insurance` · `Specialty insurance` | `Health & benefits` · `Property & casualty` · `Specialty lines` | R2 |
| Property insurance | `Commercial property` | `Commercial property insurance` | R6 vs real-estate investing |
| Specialty insurance | `Travel` · `Disability` · `Long-term care` · `Business` · `Pet` | `Travel insurance` · `Disability insurance` · `Long-term care insurance` · `Small-business insurance` · `Pet insurance` | R6: context-free names |
| Pets | `Pet insurance` | kept once in `Specialty lines`; xref from Pets | R3 |
| Insurance | `Embedded & usage-based insurance` | `Embedded insurance` · `Usage-based insurance` | R4 |
| — | `Business Finance` | `Enterprise & AI > Business Finance Tech` | R5 |
| Accounting | `Payroll` | `Work & HR Tech > Global workforce > Payroll software` | R3 |
| Accounting | `AI bookkeeping` | merged into `Bookkeeping` (tags `trending`, `ai-native`) | AI is a tag, not a sibling |
| Corporate finance | `Fundraising` · `Cash-flow management` · `Financial modeling` · `M&A` | `Fundraising tools` · `Treasury management` · `FP&A` · `M&A tools` | R9, R6 |
| Business lending | `Business loans` | `Term loans` | R2 |
| Business Finance | `Spend management & corporate cards` | `Spend management > Corporate cards` | R1 |
| Business Finance | `Global payroll, EOR & contractor compliance` | `Work & HR Tech > Global workforce` | R1, R5 |
| Business Finance | `Equity & cap-table management` | `Equity management > Cap-table software` | R1 |
| Business Finance | `SMB fintech & POS ecosystems` | `Commerce & Retail Tech > Point of sale` | R1, R5 |

### Node changes: Relationships

| Old location | Before | After | Reason |
|---|---|---|---|
| Dating | `Online dating` | `Dating platforms` | R2 (the "Dating apps under Online dating" case) |
| Online dating | `Dating apps` | `Swipe apps` · `Curated apps` | R2, R9 |
| Online dating | `Dating profiles` | `Profile optimization` | R2 |
| Dating | `AI dating assistants` | `AI dating tools` | Wording |
| Dating | `Dating skills` | `Dating coaching` | R9 |
| Dating skills | `Conversation skills` | `Social Skills > Communication skills > Conversation skills` | R3 |
| Dating strategies | `Matchmaking` | `Matchmaking & events` | R3 |
| Community & Social Life | `Matchmaking` | merged into `Matchmaking & events` | R3 |
| Community › Events | `Singles events` | `Dating > Matchmaking & events > Singles events` | R5 |
| Dating | `Specialized dating` | `Niche dating` | Wording |
| Specialized dating | `Long-distance dating` | merged into `Couples & Marriage > Long-distance relationships` | R3 |
| Specialized dating | `Faith & culture-based apps` | `Faith-based dating` (culture → `Intercultural dating`) | R3 |
| Dating | `Dating safety & verification` | `Dating safety` | R1 |
| Romantic Relationships | `Intimacy` | merged into `Intimacy & Sexuality` | R3 |
| Romantic Relationships | `Relationship challenges` | `Relationship repair` | R9 |
| Relationship challenges | `Infidelity` | `Infidelity recovery` | R9 |
| Romantic Relationships | `Relationship apps & AI coaching` | `Relationship coaching > Couples apps` · `AI relationship coaching` | R1, R4 |
| Romantic Relationships | `Long-distance relationship tools` | `Long-distance relationships > LDR apps` | R1 |
| Marriage | `Premarital` | `Premarital` (kept) | — |
| Premarital | `Compatibility` | `Compatibility assessments` | R9 |
| Premarital | `Financial planning` | merged into `Wealth > Money Management > Life-event finance > Couples' finances` | R3, R5 |
| Marriage | `Married life` | `Shared household` | R9 |
| Married life | `Shared finances` | merged into `Couples' finances` | R3 |
| Married life | `Household responsibilities` | `Household-task apps` | R9 |
| Marriage enrichment | `Date nights` | `Date-night services` | R9 |
| Marriage enrichment | `Intimacy` | merged into `Intimacy & Sexuality` | R3 |
| Marriage | `Marital conflict` | merged into `Relationship repair` | R3 |
| Marriage | `Wedding industry` | xref to `Lifestyle, Home & Experiences > Entertainment & Events > Weddings` | Xref-only node → `see:` |
| Breakups & Divorce | `Breakup recovery` | `Breakup support` | R6 ("Recovery") |
| Breakup recovery | `No-contact strategies` | `No-contact apps` | R9 |
| Divorce process | `Mediation` · `Financial transition` · `Co-parenting` | `Divorce mediation` · `Divorce finance > Financial transition planning` · `Co-parenting` (subcategory) | R6, R7 |
| Breakups & Divorce | `Divorce fintech` | `Divorce finance` | Also absorbs Wealth › Divorce finance |
| Breakups & Divorce | `Post-divorce life` | `Life after divorce` | Wording |
| Post-divorce life | `Rebuilding social life` | `Social rebuilding` | R1 |
| Post-divorce life | `Single parenting` | `Parenting & Family > Family structures > Single parents` | R5 |
| — | `Family Relationships` | `Parenting & Family` | Scope |
| Family Relationships | `Parenting` | `Parenting stages` | R2 |
| Parenting | `New parents` · `Infant parenting` · `Toddler parenting` · `Teen parenting` | `Newborns` · `Toddlers` · `Teens` | R2, R3 |
| Parent-child relationships | `Adult children` | `Parenting stages > Adult children` | R7 |
| Family Relationships | `Parent-child relationships` | `Parenting support` | R9 |
| Family Relationships | `Sibling relationships` | merged into `Extended family` | R7 |
| Sibling relationships | `Adult siblings` | `Extended family > Adult siblings` | R7 |
| Extended family | `In-laws` · `Grandparents` · `Multigenerational families` | `In-law relationships` · `Grandparenting` · `Family structures > Multigenerational households` | R9 |
| Family Relationships | `Parenting apps & family coordination` | `Parenting support > Family organizers` · `Chore & allowance apps` | R1 |
| Family Relationships | `Child safety & parental controls` | `Child online safety > Parental controls` | R1 |
| Kids & Baby | `Child safety` | merged into `Child online safety` | R3 |
| Family Relationships | `Special-needs parenting` · `Blended families` | `Special-needs parenting` · `Family structures > Blended families` | R7 |
| Family Relationships | `Adoption & foster-care support` | `Family structures > Adoption & foster care` | R1 |
| Family Relationships | `Caregiver support` | `Health & Wellness > Aging & Longevity > Caregiving > Family caregiver support` | R3 |
| Family Relationships | `Fertility & family-building journeys` | `Health & Wellness > Sexual & Reproductive Health > Fertility & family building` | R3, R5 |
| Fertility journeys | `IVF support` · `Donor & surrogacy navigation` | merged into `IVF & fertility clinics` · `Donor & surrogacy` | R3 |
| — | `Friendships` | `Friendship & Community` | Absorbs Community & Social Life |
| Friendships | `Loneliness & social connection` | `Loneliness & connection` | R1 |
| Social Skills | `Confidence` | `Social confidence` | R6 |
| Communication skills | `Conversation` | `Conversation skills` | R3 |
| Social Skills | `Neurodivergent social-skills training` | `Neurodivergent social skills` | R1 |
| — | `Sexual Relationships` | `Intimacy & Sexuality` | R3 |
| Sexual Relationships | `Sexual wellness` | dissolved (clinical side is Health › Sexual wellness; xref) | R3 |
| Sexual wellness | `Consent` · `Sexual education` | `Connection tools > Consent education` · merged into `Sex education platforms` | R9, R3 |
| Sexual Relationships | `Intimacy` | merged into `Intimacy & Sexuality` | R3 |
| Intimacy | `Desire` · `Couples intimacy` | `Desire mismatch` · `Couples intimacy programs` | R9 |
| Sexual Relationships | `Sexual challenges` | `Relational challenges` | Wording |
| Sexual challenges | `Sexual dysfunction` | merged into `Health & Wellness > Sexual & Reproductive Health > Sexual health services` | R3 |
| Sexual challenges | `Performance anxiety` | `Sexual performance anxiety` | R6 vs stage/sport anxiety |
| Sexual challenges | `Desire mismatch` · `Intimacy after childbirth` | `Desire mismatch` · `Postpartum intimacy` | R1 |
| — | `Relationship Psychology` | `Social Skills > Relationship psychology` | R7 |
| — | `Community & Social Life` | merged into `Friendship & Community` | R3 |
| Community & Social Life | `Social groups` · `Events` | `Clubs & groups` | R3 |
| Social groups | `Hobby communities` · `Local communities` · `Community activities` | `Hobby clubs` · `Local community groups` | R3 |
| Social groups | `Religious communities` | xref to `Mind, Meaning & Growth > Spirituality & Faith > Faith tech` | R3 |
| Social groups | `Professional communities` · `Networking events` | `Career Development > Professional networking` | R5 |
| Social groups | `Cohousing & coliving` | `Home & Living > Living arrangements > Cohousing` · `Coliving` | R3, R4 |
| — | `Death, Grief & Legacy` | moved from Lifestyle to Relationships | Pillar ≤ 8 |
| Death, Grief & Legacy | `Death tech` | category note + `underserved` tag | Node was a label for the whole category |
| Death, Grief & Legacy | `Digital legacy & account management` | `Digital legacy > Account closure` | R1 |
| Death, Grief & Legacy | `Funeral innovation` | `Funeral services` | R9 |
| Death, Grief & Legacy | `Grief support & online memorials` | `Grief support` · `Online memorials` | R4 |
| Death, Grief & Legacy | `Estate cleanout & downsizing` | `After-death logistics > Estate cleanout` · `Downsizing services` | R4 |
| End-of-life planning | `Wills` | xref to `Wealth > Retirement & Wealth Planning > Estate planning` | R3 |
| End-of-life planning | `Death doulas` | `End-of-life planning > Death doulas` | Kept |

### Node changes: Mind, Meaning & Growth

| Old location | Before | After | Reason |
|---|---|---|---|
| — | `Mindfulness & Contemplative Practice` | `Contemplative Practice` | R1 |
| Mindfulness | `Meditation apps & retreats` | `Meditation > Meditation apps` · `Meditation retreats` | R4, R7 |
| Mindfulness | `Yoga & embodiment` | `Yoga` kept in Fitness (xref) + `Somatics & embodiment` | R3, R4 |
| Mindfulness | `Digital wellness & screen-time balance` | `Digital wellness` | R1 |
| Spirituality & Faith | `Faith communities & church tech` | `Faith tech` | R1 |
| Spirituality & Faith | `Prayer & scripture apps` | `Prayer & scripture` | R7 |
| Modern spirituality | `Astrology & tarot` | `Astrology apps` · `Tarot & divination` | R4 |
| Modern spirituality | `Secular philosophy & Stoicism` | `Philosophy & Stoicism` (subcategory) | Buried under the wrong parent |
| — | `Purpose & Life Direction` | `Purpose & Life Transitions` | Scope |
| Life coaching | `Certification` · `Marketplaces` · `AI coaches` | `Coach certification` · `Coaching marketplaces` · `AI life coaches` | R6: context-free names |
| Purpose & Life Direction | `Purpose & ikigai work` | `Purpose work` | R1 |
| — | `Productivity & Personal Management` | `Productivity` | R1 |
| Productivity | `Time management & calendar AI` | `Time management > AI calendars` | R1 |
| Productivity | `Second brain / PKM` | `Knowledge management` | R1 |
| Productivity | `AI personal assistants & agents` | `AI personal assistants` | R1 |
| Productivity | `Habit trackers` · `Goal-setting & accountability` | `Tasks & habits` (subcategory) | R7 |
| Learning & Education | `Online courses & MOOCs` | `Online learning > MOOCs` | R1 |
| Learning & Education | `AI-era upskilling` | merged into `Career Development > Upskilling > AI upskilling` | R3 |
| Learning & Education | `Test prep & certifications` | `Test prep & credentials` | Scope |
| Learning & Education | `Language learning` · `AI tutors` | `Language learning` · `AI tutoring` (subcategories) | R7 |
| Learning & Education | `Bootcamps & higher-ed alternatives` | `Higher education > Bootcamps` | R1 |
| Learning & Education | `Kids' enrichment` | `Early & enrichment learning` | R7: had 2 children |
| Kids' enrichment | `Coding` · `Music` | `Kids' coding classes` · `Music lessons` | R6 |
| Learning & Education | `Corporate L&D` | merged into `Enterprise & AI > Work & HR Tech > Learning & development` | R3 |
| Creativity & Craft | `Writing & storytelling` | `Writing` | R7 |
| Creativity & Craft | `Visual arts & craft studios` | `Visual arts & craft` | R1 |
| Creativity & Craft | `Photography & filmmaking` | `Photo & video` | R7 |
| Creativity & Craft | `Maker culture & 3D printing` | `Maker culture > 3D printing` | R1 |
| Creativity & Craft | `Improv & performing arts` | `Performing arts > Improv classes` | R6 vs attending |
| Hobbies | `Crafting revival` | merged into `Visual arts & craft > Craft kits` | R3 |
| — | `Inner Growth` | `Personal Development` | Scope |
| Inner Growth | `Self-esteem & self-acceptance` | `Inner work > Self-esteem` | R3 |
| Inner Growth | `Emotional regulation & resilience` | `Resilience training` (+ `Emotional regulation` in Social Skills) | R3, R4 |
| Inner Growth | `Boundaries & attachment healing` | `Attachment healing` · `Boundaries coaching` | R4 |
| — | `Identity & Community` | dissolved | R7 |
| Identity & Community | `Men's groups & women's circles` | `Growth communities > Men's circles` · `Women's circles` | R4 |
| Identity & Community | `Expat & immigrant belonging` | `Friendship & Community > Clubs & groups > Expat & immigrant communities` | R9 |

### Node changes: Lifestyle, Home & Experiences

| Old location | Before | After | Reason |
|---|---|---|---|
| Travel & Adventure | `AI trip planning` | `Trip planning > AI trip planners` | R7 |
| Travel & Adventure | `Adventure & experiential travel` | `Experiential travel` | R1 |
| Digital nomadism | `Visas` | `Nomad visas` | R6 |
| Digital nomadism | `Coliving` | xref to `Home & Living > Living arrangements > Coliving` | R3 |
| Digital nomadism | `Nomad tax` | merged into `Wealth > Tax & Legal > Tax planning > International & expat tax` | R3; its example (Nomad List) moved to `Nomad communities` |
| Travel & Adventure | `Wellness & medical tourism` | `Wellness travel` + xref to `Care Delivery > Patient navigation > Medical tourism` | R4 |
| Travel & Adventure | `Solo travel` · `Family travel` · `Group travel` · `Accessible travel` | `Traveler segments` (subcategory) | R7 |
| Travel & Adventure | `Outdoors` | `Road & outdoor travel` | R6 vs outdoor recreation |
| Food & Beverage | `Meal kits & prepared meals` | `Meal solutions > Meal kits` · `Prepared meals` | R4 |
| Food & Beverage | `Coffee & specialty DTC` | `Beverages > Specialty coffee` | R1 |
| Food & Beverage | `Restaurant tech & ghost kitchens` | `Restaurant tech > Ghost kitchens` | R7 |
| Food & Beverage | `Allergen-free & diet-specific foods` | `Allergen-free foods` · `Diet-specific foods` | R4 |
| Food & Beverage | `Food-waste reduction` | `Food waste` | Wording |
| Home & Living | `Smart home & security` | `Smart home > Home security` | R6 vs cybersecurity |
| Home & Living | `E-design & decor` | `Design & decor > E-design` | R7 |
| Home & Living | `Organization & decluttering` | `Organizing & moving > Decluttering services` | Absorbs moving |
| Home & Living | `DIY & home improvement` | `Home improvement > DIY projects` | R7 |
| Home & Living | `Gardening & houseplants` | `Gardening & plants > Houseplants` | R7 |
| Home & Living | `Home services marketplaces` | `Home services` | R2 |
| Home & Living | `Coliving` | `Living arrangements > Coliving` | R3: single home |
| — | `Hobbies, Sports & Recreation` | `Sports & Hobbies` | Wording |
| Hobbies | `Gaming & esports` | `Entertainment & Events > Gaming > Esports` | R4, R5 |
| Hobbies | `Golf` | `Social sports > Golf entertainment` | R7 |
| Hobbies | `Run clubs` | `Social sports > Run clubs` | R7 |
| Hobbies | `Chess & board games` | `Games & puzzles > Chess` · `Board games` | R4 |
| Hobbies | `Books & BookTok` | `Reading > Book discovery` | R7 |
| Hobbies | `Collectibles` | `Collecting` | R6 vs collectible assets |
| Collectibles | `Sneakers` | `Sneaker collecting` | R3, R6 vs streetwear |
| Hobbies | `Fishing & hunting` | `Outdoor recreation > Fishing` · `Hunting` | R4 |
| Hobbies | `Motorsports & boating` | `Car ownership > Motorsports & track days` · `Outdoor recreation > Boating` | R4 |
| — | `Entertainment & Nightlife` | `Entertainment & Events` | Pillar ≤ 8 |
| Entertainment | `Live events & concerts` | `Live events > Concerts` | R7 |
| Entertainment | `Comedy & performing arts` | `Live events > Comedy shows` · `Theater` | R4 |
| Entertainment | `Social venues & nightlife` | `Nightlife & venues` | R1 |
| — | `Fashion, Beauty & Personal Care` | `Fashion & Beauty` | R1 |
| Fashion | `DTC fashion & basics` | `Apparel & accessories > DTC basics` | R1 |
| Fashion | `Inclusive sizing & plus-size` | `Inclusive fashion > Plus-size fashion` | R3 |
| Fashion | `Jewelry & watches` | `Jewelry` · `Watches` | R4 |
| Fashion | `Skincare & beauty DTC` | `Beauty & skincare > Skincare DTC` | R1 |
| Fashion | `Salon & barbershop tech` | `Salon & spa tech` | Scope |
| — | `Pets & Animal Companions` | `Pets & Animal Care` | Wording |
| Pets | `Vet care & telehealth` | `Pet health > Vet telehealth` · `Modern vet clinics` | R4 |
| Pets | `Grooming, boarding & daycare` | `Pet services > Pet grooming` · `Boarding & daycare` | R4 |
| — | `Events & Celebrations` | merged into `Entertainment & Events` | Pillar ≤ 8 |
| Events | `Weddings` | `Weddings` (subcategory; unsourced "$100B" removed) | R7 |
| Events | `Parties & milestones` | `Celebrations & gifting > Party planning` | R9 |
| Events | `Corporate events & team experiences` | `Team experiences` | R1 |
| — | `Kids & Baby` | dissolved into `Parenting & Family` | Pillar ≤ 8 |
| Kids & Baby | `Kids' activities` | `Baby & kids products > Kids' activity booking` | R9 |
| Kids & Baby | `Childcare marketplaces` | `Parenting & Family > Childcare > Childcare marketplaces` | R7 |
| — | `Automotive & Mobility` | `Cars & Transportation` | R6 |
| Automotive | `Car buying & subscriptions` | `Car buying > Online car buying` · `Car subscriptions` | R4 |
| Automotive | `EV charging & ownership` | `EV ownership` (+ xref to Planet charging networks) | R3 |

### Node changes: Society, Planet & Frontier Industries

| Old location | Before | After | Reason |
|---|---|---|---|
| — | `AI & Automation Infrastructure` | `Enterprise & AI > AI Infrastructure` | R1 |
| AI Infrastructure | `Foundation-model APIs` | `Foundation models > Model APIs` | R1 |
| AI Infrastructure | `AI agents & workflow automation` | `AI agents > Workflow automation` | R4 |
| AI Infrastructure | `GPU cloud & compute` | `Compute & data centers > GPU cloud` | R7 |
| Software & Dev Tools | `Dev platforms & open source` | `Developer platforms` | R1 |
| Software & Dev Tools | `No-code/low-code` | `No-code & low-code` | Wording; absorbs No-code launches |
| Software & Dev Tools | `Observability & DevOps` | `DevOps & observability` | Wording |
| — | `Cybersecurity` | `Cybersecurity & Trust` | Scope |
| Cybersecurity | `Consumer privacy & fraud protection` | `Consumer security` (tag `consumer`) | R1 |
| — | `Work & HR Technology` | `Work & HR Tech` | R1 |
| Work & HR | `AI recruiting & skills-based hiring` | `Recruiting > AI recruiting` · `Skills-based hiring` | R4 |
| Work & HR | `Remote & hybrid collaboration` | `Collaboration` | R1 |
| Work & HR | `Employee wellbeing & benefits` | `Employee wellbeing` | R1 |
| — | `Legal, Risk & Compliance Tech` | `Legal & Compliance Tech` | R1 |
| Legal | `RegTech & AI-governance compliance` | `Regulatory compliance` · `AI governance` | R4 |
| Social Impact | `Responsible & ethical AI` | merged into `AI governance` | R3 |
| Marketing & Sales | `Generative content automation` | `Generative marketing` | R1 |
| Marketing & Sales | `Influencer & UGC platforms` | `Creator platforms` | R3 |
| Marketing & Sales | `Attribution & analytics` | `Analytics & attribution` | Wording |
| — | `PropTech & Construction` | `Planet & Frontier > Built Environment` | Wording |
| — | `Logistics & Supply Chain` · `Manufacturing & Industry 4.0` | `Industry & Supply Chain` | Pillar ≤ 8 |
| Logistics | `Last-mile & autonomous delivery` | `Last-mile delivery` | R1 |
| Logistics | `Warehouse automation` | `Warehousing` | R7 |
| Logistics | `Returns & reverse logistics` | `Reverse logistics` | R3 |
| Manufacturing | `Industrial IoT & predictive maintenance` | `Industrial IoT > Predictive maintenance` | R4 |
| Manufacturing | `Reshoring & smart factories` | `Smart manufacturing` | R1 |
| Agriculture | `Vertical farming` | `Controlled-environment agriculture > Vertical farms` | R7 |
| — | `Climate, Energy & Environment` | `Climate & Energy` | R1 |
| Climate | `Solar & community energy` | `Clean power > Utility-scale solar` · `Community energy` | R4 |
| Climate | `EV charging networks` | `EV infrastructure > Charging networks` | R2 |
| Climate | `Grid modernization & virtual power plants` | `Storage & grid > Grid modernization` · `Virtual power plants` | R1, R4 |
| Climate | `Carbon markets, capture & accounting` | `Carbon > Carbon markets` · `Carbon capture` · `Carbon accounting` | R1, R4 |
| Climate | `Circular economy & waste` | `Circular economy > Waste management` | R7 |
| Climate | `Sustainable materials & packaging` | `Sustainable materials` · `Sustainable packaging` | R4 |
| Climate | `Climate-risk analytics` | `Climate adaptation > Climate-risk analytics` | R7 |
| Biotech | `Gene editing & cell therapy` | `Gene & cell therapy > Gene editing` · `Cell therapy` | R4 |
| Biotech | `Decentralized clinical trials` | `Clinical trials > Decentralized trials` | R2 |
| — | `Space & Frontier Tech` | `Aerospace & Defense` + `Deep Tech` | R8 |
| Space & Frontier | `Launch & satellites` | `Commercial space > Launch services` · `Satellite connectivity` · `Earth-observation imagery` | R4 |
| Space & Frontier | `Space tourism` | `Commercial space > Space tourism` | R7 |
| Space & Frontier | `Quantum computing` | `Deep Tech > Quantum computing` | R8 |
| Space & Frontier | `Humanoid robotics` | `Deep Tech > Robotics > Humanoid robots` | R8 |
| — | `Defense & Security Tech` | merged into `Aerospace & Defense` | Pillar ≤ 8; standard industry grouping |
| Defense | `Dual-use startups` | `Defense tech > Dual-use hardware` | R9 |
| Defense | `Defense software & sensors` | `Defense software` · `Sensors & ISR` | R4 |
| — | `Government, Civic & Public Interest` · `Social Impact & Development` · `Accessibility & Assistive Tech` | `Public Interest & Impact` | Pillar ≤ 8 |
| Government | `Emergency response & resilience` | `Emergency response` | R1 |
| Accessibility | `Screen readers & AAC` | `Screen readers` · `AAC devices` | R4 |
| Accessibility | `Prosthetics & mobility devices` | `Prosthetics & mobility aids` | R6 ("mobility") |
| Accessibility | `Accessibility-as-a-service` | `Accessibility compliance` | R1 |
| Social Impact | `Humanitarian & disaster tech` | `Emergency response > Disaster response` | R3 |
| Social Impact | `Education access in emerging markets` | `Development & inclusion > Emerging-market edtech` | R1 |

---

### Additions

These nodes are new: gap fills approved in decision C, plus leaves added so that every subcategory
has 3–8 leaves. The list is generated by `python3 scripts/reconcile.py source/taxonomy-v0.md --additions`
and is grouped by parent.

<!-- ADDITIONS:START -->
709 added nodes.

- **Health & Wellness › Prevention & Diagnostics › At-home testing**: Home lab kits · Blood-test memberships · Hormone tests
- **Health & Wellness › Prevention & Diagnostics › Early-detection imaging**: Coronary calcium scoring · DEXA body scans · Mole mapping
- **Health & Wellness › Prevention & Diagnostics › Genomics**: Hereditary risk panels
- **Health & Wellness › Prevention & Diagnostics**: Environmental health
- **Health & Wellness › Prevention & Diagnostics › Environmental health**: Indoor air quality · Water testing & filtration · Mold & toxin testing · Microplastics testing
- **Health & Wellness › Nutrition & Metabolic Health › GLP-1 economy**: Compounded GLP-1s · Muscle preservation · GLP-1 companion foods · Maintenance & off-ramp
- **Health & Wellness › Nutrition & Metabolic Health › Personalized nutrition**: Nutrigenomics · AI meal planning
- **Health & Wellness › Nutrition & Metabolic Health › Sports nutrition**: Hydration & electrolytes
- **Health & Wellness › Fitness & Recovery › Mobility & flexibility**: Pilates
- **Health & Wellness › Fitness & Recovery › Connected fitness**: AI personal trainers
- **Health & Wellness › Fitness & Recovery › Gyms & studios**: Budget gyms · Climbing gyms · Gym management software
- **Health & Wellness › Fitness & Recovery › Adaptive & inclusive fitness**: Plus-size fitness · Adaptive training · Prenatal & postnatal fitness
- **Health & Wellness › Fitness & Recovery › Youth sports**: Skills training · College recruiting · League & club software
- **Health & Wellness › Sleep › Infant & child sleep**: Sleep consultants · Smart bassinets · Sleep-training apps
- **Health & Wellness › Sleep**: Sleep products
- **Health & Wellness › Sleep › Sleep products**: Mattresses & bedding · Sleep audio apps · Sleep aids · Snoring solutions
- **Health & Wellness › Mental Health › Anxiety & mood**: OCD
- **Health & Wellness › Mental Health › Trauma & PTSD**: Domestic-violence support
- **Health & Wellness › Mental Health › Digital mental health**: Mental-health apps · Digital therapeutics
- **Health & Wellness › Mental Health › Acute & advanced care**: Crisis & suicide prevention · Serious mental illness · Ketamine & TMS clinics
- **Health & Wellness › Mental Health › Population-focused care**: Youth mental health
- **Health & Wellness › Sexual & Reproductive Health › Fertility & family building**: Fertility benefits
- **Health & Wellness › Sexual & Reproductive Health › Pregnancy & postpartum**: Doulas & birth support
- **Health & Wellness › Sexual & Reproductive Health › Contraception**: Birth-control telehealth · Emergency contraception · Male contraception
- **Health & Wellness › Sexual & Reproductive Health › Sexual wellness**: Sexual wellness apps
- **Health & Wellness › Aging & Longevity › Biohacking**: Self-experiment platforms
- **Health & Wellness › Aging & Longevity › Age tech**: Aging in place · Senior social connection
- **Health & Wellness › Aging & Longevity › Caregiving**: Respite care · Senior living search
- **Care & Conditions › Chronic Conditions › Cardiometabolic disease**: Kidney disease · Fatty liver disease
- **Care & Conditions › Chronic Conditions › Oncology**: Survivorship support
- **Care & Conditions › Chronic Conditions**: Complex & rare illness
- **Care & Conditions › Chronic Conditions › Complex & rare illness**: POTS & dysautonomia
- **Care & Conditions › Pain & Musculoskeletal › Joint & bone health**: Osteoporosis
- **Care & Conditions › Pain & Musculoskeletal › Digital MSK**: Motion-tracking apps · Employer MSK programs
- **Care & Conditions › Pain & Musculoskeletal › Chronic pain**: Pain psychology · Neuromodulation devices
- **Care & Conditions › Pain & Musculoskeletal › Ergonomics**: Ergonomic equipment · Ergonomic assessments
- **Care & Conditions › Brain & Neurological Health**: Dementia & cognitive decline · Consumer neurotech
- **Care & Conditions › Brain & Neurological Health › Dementia & cognitive decline**: Cognitive assessments · Memory care · Dementia care navigation
- **Care & Conditions › Brain & Neurological Health › Neurological conditions**: Epilepsy · Parkinson's · Concussion & TBI
- **Care & Conditions › Brain & Neurological Health › Consumer neurotech**: EEG headbands · Neurofeedback · Brain-training apps
- **Care & Conditions › Specialty Care › Vision**: Contact lenses
- **Care & Conditions › Specialty Care › Hearing**: Online hearing tests · Tinnitus management
- **Care & Conditions › Specialty Care › Dermatology**: Psoriasis & rosacea
- **Care & Conditions › Specialty Care › Medical aesthetics**: Injectables · Laser & energy devices · IV hydration
- **Care & Conditions › Population-Specific Care › Veterans' health**: VA care navigation · Disability claims support · Veteran PTSD programs
- **Care & Conditions › Population-Specific Care › Rural & underserved care**: Rural telehealth · Mobile clinics · Community health workers
- **Care & Conditions › Care Delivery › Home & virtual care**: Hospital at home
- **Care & Conditions › Care Delivery › Pharmacy**: Compounding pharmacies
- **Care & Conditions › Care Delivery › Patient navigation**: Medical bill negotiation · Second opinions
- **Care & Conditions › Health Technology › Revenue cycle & payer**: Claims integrity · Value-based care enablement
- **Care & Conditions › Health Technology › Health data infrastructure**: Personal health records
- **Care & Conditions › Health Technology › Medical devices**: Diagnostic devices · Surgical robotics
- **Care & Conditions › Health Technology**: Healthcare workforce
- **Care & Conditions › Health Technology › Healthcare workforce**: Staffing marketplaces · Nurse scheduling · Clinician credentialing
- **Care & Conditions › Integrative Medicine › Integrative clinics**: Integrative health coaching · Practitioner platforms
- **Care & Conditions › Integrative Medicine › Energy & movement practices**: Tai chi
- **Wealth › Money Management › Budgeting**: AI money coaches
- **Wealth › Money Management › Saving**: College savings
- **Wealth › Money Management › Life-event finance**: New-parent finances
- **Wealth › Money Management › Gig & creator finance**: Tax withholding tools · Portable benefits · Income smoothing
- **Wealth › Banking & Payments › Digital banking**: Teen & family banking · Immigrant banking
- **Wealth › Banking & Payments**: Consumer payments
- **Wealth › Banking & Payments › Consumer payments**: P2P payments · Digital wallets · Stablecoin payments
- **Wealth › Banking & Payments › Cross-border money**: Multi-currency accounts · Diaspora investing
- **Wealth › Banking & Payments › Consumer lending**: Earned wage access · Small-dollar loans · Auto loans
- **Wealth › Banking & Payments › Islamic finance**: Sharia-compliant banking · Halal investing · Islamic home finance
- **Wealth › Banking & Payments › Financial inclusion**: Unbanked onboarding · Microloans
- **Wealth › Investing & Trading › Public markets**: Stock investing · Direct indexing
- **Wealth › Investing & Trading › Automated investing**: Micro-investing · AI investing copilots
- **Wealth › Housing & Real Estate › Homebuying**: Home search · First-time buyer programs · Down-payment assistance · Rent-to-own
- **Wealth › Housing & Real Estate › Renting**: Rental search · Rent reporting · Renter services
- **Wealth › Housing & Real Estate › Home equity**: HELOCs · Home-equity investments
- **Wealth › Retirement & Wealth Planning › Retirement accounts**: Small-business retirement plans
- **Wealth › Retirement & Wealth Planning › Wealth management**: Financial advisors · Advisor tech · Family offices · AI financial advisors · Philanthropy & DAFs
- **Wealth › Insurance › Health & benefits**: HSAs · ICHRA
- **Wealth › Insurance › Property & casualty**: Auto insurance · Umbrella policies
- **Wealth › Insurance › Insurtech**: Digital insurers
- **Wealth › Tax & Legal › Tax preparation**: DIY filing software · Tax resolution
- **Wealth › Tax & Legal › Consumer legal services**: Legal marketplaces · Small claims & disputes · AI legal assistants
- **Wealth › Tax & Legal › Immigration services**: Visa applications · Green cards · Citizenship · Employer immigration
- **Wealth › Entrepreneurship › Acquisition entrepreneurship**: Search funds · Business-for-sale marketplaces · SBA acquisition loans · Small-business roll-ups
- **Wealth › Entrepreneurship › Solopreneurship**: AI-leveraged solo businesses · Micro-SaaS · Productized services · Solo operator tools
- **Relationships › Dating › AI dating tools**: AI profile writing · AI message coaching · AI matchmaking
- **Relationships › Dating › Dating coaching**: Dating coaches · Dating courses · Image consulting
- **Relationships › Dating › Dating safety**: Identity verification · Background checks · Date check-in apps · Romance-scam protection
- **Relationships › Couples & Marriage › Premarital**: Premarital courses · Prenups
- **Relationships › Couples & Marriage › Relationship coaching**: Couples coaching · Relationship courses
- **Relationships › Couples & Marriage › Long-distance relationships**: Shared-experience tools · Visit planning
- **Relationships › Couples & Marriage › Relationship repair**: Discernment counseling
- **Relationships › Couples & Marriage › Shared household**: Shared calendars · Mental-load tools
- **Relationships › Intimacy & Sexuality**: Intimacy coaching
- **Relationships › Intimacy & Sexuality › Intimacy coaching**: Sex therapy · Intimacy coaches
- **Relationships › Intimacy & Sexuality › Relational challenges**: Midlife intimacy
- **Relationships › Intimacy & Sexuality › Connection tools**: Couples intimacy apps · Conversation card games
- **Relationships › Breakups & Divorce › Breakup support**: Breakup coaching · Heartbreak programs
- **Relationships › Breakups & Divorce › Divorce process**: Divorce coaching
- **Relationships › Breakups & Divorce › Divorce finance**: Asset-splitting tools · Divorce financial analysts
- **Relationships › Breakups & Divorce › Co-parenting**: Co-parenting apps · Custody scheduling · Parallel parenting support
- **Relationships › Parenting & Family › Parenting stages**: School-age kids
- **Relationships › Parenting & Family › Parenting support**: Parent coaching · Parenting courses · Parenting communities
- **Relationships › Parenting & Family › Child online safety**: Kids' phones · Age verification · Online-safety education
- **Relationships › Parenting & Family › Childcare**: Nannies & babysitters · Nanny shares · Employer childcare
- **Relationships › Parenting & Family › Family structures**: Kinship care
- **Relationships › Parenting & Family › Special-needs parenting**: IEP & school advocacy · Therapy coordination · Special-needs parent communities
- **Relationships › Parenting & Family › Extended family**: Genealogy & family history
- **Relationships › Friendship & Community › Making friends**: Friend-matching dinners · Newcomer networks · Online friendship communities
- **Relationships › Friendship & Community › Loneliness & connection**: Third places · Social prescribing · Intergenerational programs
- **Relationships › Friendship & Community**: AI companions · Community platforms
- **Relationships › Friendship & Community › AI companions**: Companion apps · Voice companions · Companion safety & age checks
- **Relationships › Friendship & Community › Community platforms**: Community software · Social event apps · Neighborhood networks
- **Relationships › Social Skills › Social confidence**: Public speaking · Charisma coaching
- **Relationships › Social Skills › Neurodivergent social skills**: Social-skills groups · Workplace social coaching · Social-skills apps
- **Relationships › Death, Grief & Legacy › End-of-life planning**: Hospice & palliative care
- **Relationships › Death, Grief & Legacy › Funeral services**: Funeral price comparison
- **Relationships › Death, Grief & Legacy › Grief support**: Grief support groups · Grief counseling
- **Relationships › Death, Grief & Legacy › Digital legacy**: Digital estate vaults · Legacy memoirs
- **Relationships › Death, Grief & Legacy › After-death logistics**: Probate navigation
- **Mind, Meaning & Growth › Contemplative Practice › Meditation**: Teacher training · Workplace mindfulness
- **Mind, Meaning & Growth › Contemplative Practice › Breathwork**: Breathwork apps · Breathwork facilitators · Breath-training devices
- **Mind, Meaning & Growth › Contemplative Practice › Journaling & reflection**: Journaling apps · AI journaling · Guided reflection programs
- **Mind, Meaning & Growth › Contemplative Practice › Somatics & embodiment**: Somatic practices · Ecstatic dance · Embodiment coaching
- **Mind, Meaning & Growth › Contemplative Practice › Digital wellness**: Screen-time apps · Minimalist phones · Digital detox retreats
- **Mind, Meaning & Growth › Spirituality & Faith › Faith tech**: Church management · Giving platforms · Service streaming
- **Mind, Meaning & Growth › Spirituality & Faith › Prayer & scripture**: Prayer apps · Scripture study · Faith-based meditation
- **Mind, Meaning & Growth › Spirituality & Faith**: Spiritual guidance
- **Mind, Meaning & Growth › Spirituality & Faith › Spiritual guidance**: Pilgrimages & retreats · Interfaith communities
- **Mind, Meaning & Growth › Spirituality & Faith › Modern spirituality**: Spiritual retail
- **Mind, Meaning & Growth › Spirituality & Faith › Philosophy & Stoicism**: Stoicism apps · Philosophy courses · Secular communities
- **Mind, Meaning & Growth › Purpose & Life Transitions › Purpose work**: Purpose programs · Values & strengths assessments · Sabbatical planning
- **Mind, Meaning & Growth › Purpose & Life Transitions › Life transitions**: Empty nest
- **Mind, Meaning & Growth › Personal Development**: Growth programs
- **Mind, Meaning & Growth › Personal Development › Growth programs**: Transformational workshops · Book summaries & audio · Personal development apps
- **Mind, Meaning & Growth › Personal Development › Growth communities**: Mastermind groups
- **Mind, Meaning & Growth › Productivity › Tasks & habits**: To-do apps
- **Mind, Meaning & Growth › Productivity › Time management**: Time tracking · Focus apps
- **Mind, Meaning & Growth › Productivity › Knowledge management**: Note-taking apps · Read-later & highlights · AI knowledge assistants
- **Mind, Meaning & Growth › Productivity › ADHD-friendly productivity**: Body doubling · ADHD planners · Visual timers
- **Mind, Meaning & Growth › Productivity › AI personal assistants**: Personal AI agents · Inbox & email AI · Voice assistants
- **Mind, Meaning & Growth › Learning & Education › Online learning**: Course marketplaces · Cohort-based courses
- **Mind, Meaning & Growth › Learning & Education › AI tutoring**: Homework help apps · AI study tools
- **Mind, Meaning & Growth › Learning & Education › Test prep & credentials**: Test prep · Professional certifications · Micro-credentials
- **Mind, Meaning & Growth › Learning & Education › Language learning**: Language apps · Conversation practice · Immersion programs
- **Mind, Meaning & Growth › Learning & Education › K-12 & alternatives**: Microschools · Special education
- **Mind, Meaning & Growth › Learning & Education › Early & enrichment learning**: Early-learning apps · Preschools · After-school programs
- **Mind, Meaning & Growth › Learning & Education › Higher education**: College admissions · Student services · Online degrees
- **Mind, Meaning & Growth › Learning & Education**: School EdTech
- **Mind, Meaning & Growth › Learning & Education › School EdTech**: Teacher tools · School management · AI grading & assessment
- **Mind, Meaning & Growth › Creativity & Craft › Writing**: Writing tools · Self-publishing · Storytelling courses
- **Mind, Meaning & Growth › Creativity & Craft › Music creation**: Music production · Instrument learning · AI music tools
- **Mind, Meaning & Growth › Creativity & Craft › Visual arts & craft**: Pottery studios · Paint-and-sip · Art supplies
- **Mind, Meaning & Growth › Creativity & Craft › Photo & video**: Photography · Filmmaking · Editing tools
- **Mind, Meaning & Growth › Creativity & Craft › Maker culture**: Electronics kits · Makerspaces
- **Mind, Meaning & Growth › Creativity & Craft › Performing arts**: Acting & theater · Dance classes
- **Mind, Meaning & Growth › Career Development › Job search**: AI job-application tools
- **Mind, Meaning & Growth › Career Development › Upskilling**: Technical upskilling
- **Mind, Meaning & Growth › Career Development › Career transitions**: Outplacement
- **Mind, Meaning & Growth › Career Development › Inclusive employment**: Disability employment · Second-chance hiring
- **Mind, Meaning & Growth › Career Development › Skilled trades careers**: Trade schools · Apprenticeship marketplaces · Licensing exam prep
- **Mind, Meaning & Growth › Career Development › Professional networking**: Mentorship platforms
- **Lifestyle, Home & Experiences › Travel & Adventure › Trip planning**: Booking & deals · Itinerary apps · Travel rewards
- **Lifestyle, Home & Experiences › Travel & Adventure › Experiential travel**: Adventure tours · Expedition travel · Experiences marketplaces
- **Lifestyle, Home & Experiences › Travel & Adventure › Digital nomadism**: Nomad insurance
- **Lifestyle, Home & Experiences › Travel & Adventure › Wellness travel**: Wellness retreats · Spa & thermal travel
- **Lifestyle, Home & Experiences › Travel & Adventure › Sustainable tourism**: Eco-lodges · Low-carbon travel · Community-based tourism
- **Lifestyle, Home & Experiences › Travel & Adventure › Road & outdoor travel**: Campground booking
- **Lifestyle, Home & Experiences › Food & Beverage › Meal solutions**: Meal-planning apps
- **Lifestyle, Home & Experiences › Food & Beverage**: Better-for-you foods · Cooking & groceries
- **Lifestyle, Home & Experiences › Food & Beverage › Better-for-you foods**: Protein-forward foods
- **Lifestyle, Home & Experiences › Food & Beverage › Restaurant tech**: Restaurant ops software · Reservations & waitlists
- **Lifestyle, Home & Experiences › Food & Beverage › Delivery & quick commerce**: Food delivery · Quick commerce · Grocery delivery
- **Lifestyle, Home & Experiences › Food & Beverage › Artisanal & local food**: Farmers-market platforms · Specialty food DTC · Farm subscriptions
- **Lifestyle, Home & Experiences › Food & Beverage › Food waste**: Surplus-food apps · Home composting · Upcycled foods
- **Lifestyle, Home & Experiences › Food & Beverage › Cooking & groceries**: Recipe apps · Cooking classes · Kitchen gadgets
- **Lifestyle, Home & Experiences › Home & Living › Smart home**: Smart home devices · Home energy monitors
- **Lifestyle, Home & Experiences › Home & Living › Design & decor**: Furniture DTC · Decor marketplaces
- **Lifestyle, Home & Experiences › Home & Living › Organizing & moving**: Storage solutions · Moving services
- **Lifestyle, Home & Experiences › Home & Living › Home improvement**: Renovation platforms · Home inspection
- **Lifestyle, Home & Experiences › Home & Living › Home services**: Handyman marketplaces · Lawn & pest services
- **Lifestyle, Home & Experiences › Home & Living › Gardening & plants**: Home gardening · Landscape design
- **Lifestyle, Home & Experiences › Home & Living › Living arrangements**: ADUs & tiny homes · Roommate matching
- **Lifestyle, Home & Experiences › Home & Living**: Home electrification
- **Lifestyle, Home & Experiences › Home & Living › Home electrification**: Heat pumps · Rooftop solar · Home batteries · Energy audits
- **Lifestyle, Home & Experiences › Fashion & Beauty › Resale & circular fashion**: Resale marketplaces · Luxury resale · Clothing rental · Repair & upcycling
- **Lifestyle, Home & Experiences › Fashion & Beauty › Beauty & skincare**: Textured hair care
- **Lifestyle, Home & Experiences › Fashion & Beauty › Men's grooming**: Grooming products · Men's skincare · Barbershop booking
- **Lifestyle, Home & Experiences › Fashion & Beauty › Salon & spa tech**: Salon booking software · Salon management · Beauty-pro marketplaces
- **Lifestyle, Home & Experiences › Pets & Animal Care**: Pet food · Pet lifestyle
- **Lifestyle, Home & Experiences › Pets & Animal Care › Pet food**: Treats & supplements · Raw & specialty diets
- **Lifestyle, Home & Experiences › Pets & Animal Care › Pet health**: Pet pharmacy
- **Lifestyle, Home & Experiences › Pets & Animal Care › Pet tech**: GPS trackers · Pet cameras · Smart feeders
- **Lifestyle, Home & Experiences › Pets & Animal Care › Pet services**: Dog walking
- **Lifestyle, Home & Experiences › Pets & Animal Care › Pet lifestyle**: Pet adoption
- **Lifestyle, Home & Experiences › Sports & Hobbies › Racquet sports**: Tennis
- **Lifestyle, Home & Experiences › Sports & Hobbies › Social sports**: Adult rec leagues
- **Lifestyle, Home & Experiences › Sports & Hobbies**: Women's sports
- **Lifestyle, Home & Experiences › Sports & Hobbies › Women's sports**: Pro leagues & fandom · Women's sports gear · Girls' sports participation
- **Lifestyle, Home & Experiences › Sports & Hobbies › Outdoor recreation**: Hiking & camping · Climbing · Skiing & snowboarding
- **Lifestyle, Home & Experiences › Sports & Hobbies › Games & puzzles**: Puzzles · Tabletop RPGs
- **Lifestyle, Home & Experiences › Sports & Hobbies › Collecting**: Comics & memorabilia · Grading & authentication
- **Lifestyle, Home & Experiences › Sports & Hobbies › Reading**: Indie bookstores
- **Lifestyle, Home & Experiences › Entertainment & Events**: Streaming & video · Podcasts & audio
- **Lifestyle, Home & Experiences › Entertainment & Events › Streaming & video**: Streaming services · Microdramas · Creator-led media
- **Lifestyle, Home & Experiences › Entertainment & Events › Podcasts & audio**: Podcast apps · Audiobooks · Audio creator tools
- **Lifestyle, Home & Experiences › Entertainment & Events › Gaming**: Mobile games · PC & console games · Game streaming
- **Lifestyle, Home & Experiences › Entertainment & Events › Live events**: Festivals · Ticketing
- **Lifestyle, Home & Experiences › Entertainment & Events › Nightlife & venues**: Bars & clubs · Eatertainment venues · Sober nightlife
- **Lifestyle, Home & Experiences › Entertainment & Events › Immersive experiences**: Escape rooms · Interactive art · VR arcades
- **Lifestyle, Home & Experiences › Entertainment & Events › Weddings**: Wedding planning platforms · Registries · Venues · Wedding attire · Honeymoons
- **Lifestyle, Home & Experiences › Entertainment & Events › Celebrations & gifting**: Kids' parties · Corporate gifting
- **Lifestyle, Home & Experiences › Cars & Transportation › Car buying**: Car-buying advisors
- **Lifestyle, Home & Experiences › Cars & Transportation › Car ownership**: Maintenance & repair · Parking apps
- **Lifestyle, Home & Experiences › Cars & Transportation › EV ownership**: Home charging · Charging apps · Used EVs & battery health
- **Lifestyle, Home & Experiences › Cars & Transportation › Micromobility**: E-bikes · E-scooters · Bike & scooter sharing
- **Lifestyle, Home & Experiences › Cars & Transportation**: Autonomous & shared rides
- **Lifestyle, Home & Experiences › Cars & Transportation › Autonomous & shared rides**: Robotaxis · Ride-hailing · Carpooling
- **Enterprise & AI › AI Infrastructure › Foundation models**: Open-weight models · Domain-specific models
- **Enterprise & AI › AI Infrastructure › AI agents**: Vertical agents · Coding agents · Agent orchestration
- **Enterprise & AI › AI Infrastructure › AI tooling**: Evals · LLM observability · Guardrails & safety
- **Enterprise & AI › AI Infrastructure › Compute & data centers**: Inference optimization · AI data centers · Edge AI
- **Enterprise & AI › AI Infrastructure › Data infrastructure**: Data labeling · Synthetic data · Vector databases · Data pipelines
- **Enterprise & AI › Software & Developer Tools › Developer platforms**: Open-source commercialization · Code hosting · Developer portals
- **Enterprise & AI › Software & Developer Tools › No-code & low-code**: App builders · Internal-tool builders · AI app generators · Workflow builders
- **Enterprise & AI › Software & Developer Tools › DevOps & observability**: Observability · CI/CD · Incident management · Cloud cost management
- **Enterprise & AI › Software & Developer Tools › API economy**: API marketplaces · API management · Integration platforms
- **Enterprise & AI › Cybersecurity & Trust › Identity & zero trust**: Identity management · Zero-trust access · Passwordless authentication
- **Enterprise & AI › Cybersecurity & Trust**: Security operations · Trust & safety
- **Enterprise & AI › Cybersecurity & Trust › Security operations**: Threat detection · Vulnerability management
- **Enterprise & AI › Cybersecurity & Trust › Security for AI**: Model security · AI red-teaming · AI data-leak prevention
- **Enterprise & AI › Cybersecurity & Trust › Trust & safety**: Deepfake detection · Content provenance · Content moderation · Bot & fraud detection
- **Enterprise & AI › Cybersecurity & Trust › Consumer security**: Identity-theft protection · Data-broker removal · Scam protection · Privacy tools
- **Enterprise & AI › Work & HR Tech › Recruiting**: Interview intelligence
- **Enterprise & AI › Work & HR Tech › Collaboration**: Async collaboration · Virtual offices · AI meeting notetakers
- **Enterprise & AI › Work & HR Tech › Employee wellbeing**: Mental-health benefits · Benefits administration
- **Enterprise & AI › Work & HR Tech › Learning & development**: Coaching platforms · Skills intelligence
- **Enterprise & AI › Work & HR Tech › Global workforce**: Employer of record · Contractor compliance
- **Enterprise & AI › Work & HR Tech**: Frontline workforce
- **Enterprise & AI › Work & HR Tech › Frontline workforce**: Shift scheduling · Frontline communication · Workforce management
- **Enterprise & AI › Legal & Compliance Tech**: Legal AI · Trade compliance · Legal operations
- **Enterprise & AI › Legal & Compliance Tech › Legal AI**: Legal research AI
- **Enterprise & AI › Legal & Compliance Tech › Regulatory compliance**: KYC & AML · Compliance automation · Regulatory monitoring
- **Enterprise & AI › Legal & Compliance Tech › AI governance**: AI risk management · AI audits · EU AI Act compliance
- **Enterprise & AI › Legal & Compliance Tech › Trade compliance**: Tariff management · Export controls · Sanctions screening
- **Enterprise & AI › Legal & Compliance Tech › Legal operations**: Matter management · Legal spend management · Law-firm practice management
- **Enterprise & AI › Marketing & Sales Tech › Generative marketing**: AI content generation · Creative automation · AI video ads
- **Enterprise & AI › Marketing & Sales Tech › Creator platforms**: Influencer marketplaces · Affiliate networks
- **Enterprise & AI › Marketing & Sales Tech**: Retail media & ads · Sales tech
- **Enterprise & AI › Marketing & Sales Tech › Retail media & ads**: CTV advertising · Ad measurement
- **Enterprise & AI › Marketing & Sales Tech › Analytics & attribution**: Multi-touch attribution · Marketing mix modeling · Customer data platforms
- **Enterprise & AI › Marketing & Sales Tech › Sales tech**: AI SDRs · Sales engagement · Revenue intelligence · CRM
- **Enterprise & AI › Commerce & Retail Tech**: E-commerce enablement · Retail operations
- **Enterprise & AI › Commerce & Retail Tech › E-commerce enablement**: Storefront platforms · Shopify-app ecosystem · Checkout & conversion
- **Enterprise & AI › Commerce & Retail Tech › Retail operations**: Inventory management · Store analytics · Retail robotics
- **Enterprise & AI › Commerce & Retail Tech › SMB vertical software**: Field-service software · Booking & scheduling · Invoicing & quotes
- **Enterprise & AI › Commerce & Retail Tech › Point of sale**: Restaurant POS · Retail POS · Mobile POS
- **Enterprise & AI › Business Finance Tech › Accounting**: Close automation · Sales-tax compliance · AR automation
- **Enterprise & AI › Business Finance Tech › Spend management**: Expense management · Procurement · AP automation
- **Enterprise & AI › Business Finance Tech › Equity management**: 409A valuations · Employee equity tools
- **Enterprise & AI › Business Finance Tech**: Fintech infrastructure
- **Enterprise & AI › Business Finance Tech › Fintech infrastructure**: Payment processing · Banking-as-a-service · Embedded finance · Stablecoin rails
- **Planet & Frontier › Climate & Energy › Clean power**: Nuclear & SMRs · Geothermal · Fusion
- **Planet & Frontier › Climate & Energy › Storage & grid**: Data-center power
- **Planet & Frontier › Climate & Energy › Water tech**: Water purification · Leak detection · Desalination
- **Planet & Frontier › Climate & Energy › Circular economy**: Recycling tech
- **Planet & Frontier › Climate & Energy › Climate adaptation**: Wildfire tech · Flood resilience · Extreme-heat solutions
- **Planet & Frontier › Climate & Energy › EV infrastructure**: Fleet electrification · Battery recycling
- **Planet & Frontier › Agriculture & Food Systems › Precision agriculture**: Farm data platforms · Aerial crop scouting · Precision irrigation
- **Planet & Frontier › Agriculture & Food Systems › Ag robotics**: Harvest robots · Autonomous tractors · Weeding robots
- **Planet & Frontier › Agriculture & Food Systems › Controlled-environment agriculture**: Greenhouse tech · Indoor grow lighting
- **Planet & Frontier › Agriculture & Food Systems › Alternative proteins**: Plant-based meat · Precision fermentation · Cultivated meat
- **Planet & Frontier › Agriculture & Food Systems**: Food supply chain
- **Planet & Frontier › Agriculture & Food Systems › Food supply chain**: Food traceability · Cold chain · Food-safety testing
- **Planet & Frontier › Industry & Supply Chain › Smart manufacturing**: Reshoring platforms · Factory automation · Contract-manufacturing marketplaces
- **Planet & Frontier › Industry & Supply Chain › Additive manufacturing**: Industrial 3D printing · On-demand parts · Printing materials
- **Planet & Frontier › Industry & Supply Chain › Industrial IoT**: Industrial sensors
- **Planet & Frontier › Industry & Supply Chain**: Freight & shipping · Critical minerals
- **Planet & Frontier › Industry & Supply Chain › Freight & shipping**: Freight visibility · Autonomous trucking · Maritime tech
- **Planet & Frontier › Industry & Supply Chain › Warehousing**: Warehouse robotics · Warehouse management systems · 3PL marketplaces
- **Planet & Frontier › Industry & Supply Chain › Last-mile delivery**: Delivery drones · Sidewalk robots · Route optimization
- **Planet & Frontier › Industry & Supply Chain › Reverse logistics**: Returns management · Liquidation marketplaces · Refurbishment
- **Planet & Frontier › Industry & Supply Chain › Critical minerals**: AI mineral exploration · Battery-metal refining · Urban mining
- **Planet & Frontier › Built Environment**: Property management · Real estate transactions
- **Planet & Frontier › Built Environment › Property management**: Tenant experience · Short-term rental operations
- **Planet & Frontier › Built Environment › Construction tech**: Prefab & modular · Construction robotics · Construction project management · Permitting automation
- **Planet & Frontier › Built Environment › Smart buildings**: Building automation · Building energy management · Occupancy analytics
- **Planet & Frontier › Built Environment › Real estate transactions**: Title & escrow · Brokerage tech
- **Planet & Frontier › Biotech & Life Sciences › AI drug discovery**: Protein design · Target discovery · AI chemistry
- **Planet & Frontier › Biotech & Life Sciences › Gene & cell therapy**: Gene delivery
- **Planet & Frontier › Biotech & Life Sciences › Diagnostics & biosensors**: Liquid biopsy · Biosensors · Point-of-care diagnostics
- **Planet & Frontier › Biotech & Life Sciences › Clinical trials**: Patient recruitment · Trial data platforms
- **Planet & Frontier › Biotech & Life Sciences › Lab automation**: Lab robotics · Cloud labs · ELN & LIMS
- **Planet & Frontier › Biotech & Life Sciences**: Synthetic biology
- **Planet & Frontier › Biotech & Life Sciences › Synthetic biology**: Biomanufacturing · Engineered microbes · Biomaterials
- **Planet & Frontier › Aerospace & Defense › Commercial space**: In-space servicing
- **Planet & Frontier › Aerospace & Defense**: Next-gen aviation
- **Planet & Frontier › Aerospace & Defense › Next-gen aviation**: eVTOL air taxis · Sustainable aviation fuel · Supersonic flight
- **Planet & Frontier › Aerospace & Defense › Drones & counter-drone**: Military drones · Commercial drones · Counter-drone systems
- **Planet & Frontier › Deep Tech**: Semiconductors & AI chips · Neurotech & BCI · Advanced materials
- **Planet & Frontier › Deep Tech › Semiconductors & AI chips**: AI accelerators · Chip design tools · Photonics · Advanced packaging
- **Planet & Frontier › Deep Tech › Quantum computing**: Quantum hardware · Quantum software · Post-quantum cryptography
- **Planet & Frontier › Deep Tech › Robotics**: Robot foundation models · Service robots
- **Planet & Frontier › Deep Tech › Neurotech & BCI**: Brain-computer interfaces · Neurostimulation · Neural data platforms
- **Planet & Frontier › Deep Tech › Advanced materials**: AI materials discovery · Advanced composites · Next-gen batteries
- **Planet & Frontier › Public Interest & Impact › GovTech**: Permitting software · Benefits access · Government procurement
- **Planet & Frontier › Public Interest & Impact › Emergency response**: 911 & dispatch tech · Early-warning systems
- **Planet & Frontier › Public Interest & Impact › Smart cities & transit**: Transit tech · Traffic management · Civic data platforms
- **Planet & Frontier › Public Interest & Impact**: Accessibility tech · Civic participation & justice
- **Planet & Frontier › Public Interest & Impact › Nonprofit tech**: Fundraising platforms · Nonprofit CRM · Volunteer management
- **Planet & Frontier › Public Interest & Impact › Development & inclusion**: Digital public infrastructure
- **Planet & Frontier › Public Interest & Impact › Civic participation & justice**: Access to justice · Civic engagement platforms · Election administration
<!-- ADDITIONS:END -->
