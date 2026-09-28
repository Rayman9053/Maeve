# Cut nodes

Every node removed from the tree is listed here with a one-line reason; nothing is deleted
silently. `scripts/reconcile.py` checks this file together with `changelog.md` and fails if any
original node is missing from both.

"Folded into note" means the topic is still described in the named node's `note:`, but it's no
longer a node of its own. That was the result of decision B: self-help content topics are not
startup markets.

Format: `node name` (old location): reason.

## v13

No nodes cut.

## v12

Moved, not deleted: every leaf below scored 1–2 on startup-actionability and now lives in
`taxonomy-archive.yaml` at the same Pillar > Category > Subcategory path. Scores are in parentheses;
the rubric is in `scripts/prune.py`. Restore a leaf by moving it back into `taxonomy.yaml` and rescoring it.

Subcategories that moved whole (every leaf scored ≤ 2): `Immunization`, `Strength training`, `Whole systems`, `Herbal medicine`, `Active trading`, `Life insurance`, `Nature practices`, `Philosophy & Stoicism`, `Outdoor recreation`.



#### Health & Wellness

- Prevention & Diagnostics › Immunization: `Adult immunization` (2), `Travel vaccines` (2), `Workplace flu clinics` (2)
- Nutrition & Metabolic Health › Weight management: `Fat loss` (2), `Healthy weight gain` (2), `Body recomposition` (2)
- Nutrition & Metabolic Health › GLP-1 economy: `Compounded GLP-1s` (2)
- Nutrition & Metabolic Health › Personalized nutrition: `Nutrigenomics` (2)
- Nutrition & Metabolic Health › Sports nutrition: `Competition prep` (2)
- Nutrition & Metabolic Health › Special diets: `Low-carb & keto` (2), `Elimination diets` (2)
- Nutrition & Metabolic Health › Supplements: `Omega-3` (2), `Herbal supplements` (2)
- Nutrition & Metabolic Health › Clinical nutrition: `Intuitive eating` (2)
- Fitness & Recovery › Strength training: `Weightlifting` (2), `Bodybuilding` (2), `Powerlifting` (2), `Functional strength` (2)
- Fitness & Recovery › Cardio & endurance: `Swimming` (2), `Walking` (2)
- Fitness & Recovery › Mobility & flexibility: `Joint mobility` (2)
- Fitness & Recovery › Athletic recovery: `Float therapy` (2)
- Sleep › Sleep optimization: `Bedroom environment` (2)
- Sleep › Sleep disorders: `Restless legs` (2), `Circadian rhythm disorders` (2)
- Sleep › Sleep products: `Sleep aids` (2)
- Mental Health › Anxiety & mood: `Panic disorder` (2), `Seasonal depression` (2)
- Mental Health › Stress & burnout: `Chronic stress` (2), `Relaxation techniques` (2)
- Mental Health › Therapy access: `Sliding-scale clinics` (2)
- Sexual & Reproductive Health › Contraception: `Emergency contraception` (2)
- Sexual & Reproductive Health › Sexual health services: `STI prevention` (2)
- Aging & Longevity › Healthy aging: `Senior nutrition` (2)
- Aging & Longevity › Longevity medicine: `Off-label longevity drugs` (2), `Regenerative medicine` (2)
- Aging & Longevity › Biohacking: `HRV tracking` (2), `Wearable stacks` (2), `Self-experiment platforms` (2), `Biohacker communities` (2)
- Aging & Longevity › Senior living: `Active-adult communities` (2)

#### Care & Conditions

- Chronic Conditions › Autoimmune disease: `Lupus` (2), `Multiple sclerosis` (2)
- Chronic Conditions › Digestive health: `GERD` (2)
- Chronic Conditions › Respiratory & allergy: `Seasonal allergies` (2)
- Pain & Musculoskeletal › Back & neck: `Sciatica` (2), `Posture` (2), `Tech neck` (2), `Cervical pain` (2)
- Pain & Musculoskeletal › Joint & bone health: `Knee pain` (2), `Hip pain` (2), `Shoulder pain` (2)
- Pain & Musculoskeletal › Foot & ankle care: `Plantar fasciitis` (2)
- Pain & Musculoskeletal › Chronic pain: `Pain-tracking apps` (2)
- Brain & Neurological Health › Brain health & prevention: `Brain-health coaching` (2), `Nootropics` (2)
- Brain & Neurological Health › Consumer neurotech: `Brain-training apps` (2)
- Specialty Care › Dental & oral health: `Oral microbiome` (2)
- Specialty Care › Vision: `Contact lenses` (2)
- Specialty Care › Medical aesthetics: `IV hydration` (2)
- Population-Specific Care › LGBTQ+ health: `Trans-inclusive provider directories` (2)
- Population-Specific Care › Rural & underserved care: `Refugee health navigation` (2)
- Care Delivery › Primary & urgent care: `Retail clinics` (2)
- Care Delivery › Pharmacy: `Compounding pharmacies` (2)
- Care Delivery › Patient navigation: `Medical tourism` (2)
- Care Delivery › Emergency care: `ER triage & wait-time apps` (2), `Air ambulance memberships` (2)
- Health Technology › Health data infrastructure: `EHR` (2)
- Health Technology › Healthcare workforce: `Clinician burnout tools` (2)
- Integrative Medicine › Whole systems: `Ayurveda` (2), `Traditional Chinese Medicine` (2), `Unani` (1), `Indigenous medicine` (1), `Naturopathy` (2), `Homeopathy` (1)
- Integrative Medicine › Herbal medicine: `Clinical herbalism` (2), `Herbal apothecaries` (2), `Herbalism education` (2)
- Integrative Medicine › Manual therapies: `Reflexology` (1), `Cupping & gua sha` (2)
- Integrative Medicine › Energy & movement practices: `Reiki` (1), `Qigong` (2), `Tai chi` (2)

#### Wealth

- Money Management › Budgeting: `Zero-based budgeting` (2), `Household cash flow` (2)
- Money Management › Saving: `Emergency funds` (2), `Goal-based saving` (2)
- Money Management › Debt management: `Debt settlement` (2)
- Money Management › Credit: `Credit repair` (2), `Credit monitoring` (2)
- Banking & Payments › Consumer payments: `P2P payments` (2), `Digital wallets` (2)
- Banking & Payments › Consumer lending: `Auto loans` (2), `Loan marketplaces` (2)
- Banking & Payments › Financial inclusion: `Microloans` (2)
- Investing & Trading › Public markets: `Stock investing` (2), `Bonds` (2), `Index funds & ETFs` (2), `Active & sector funds` (1)
- Investing & Trading › Automated investing: `Robo-advisors` (2), `Micro-investing` (2)
- Investing & Trading › Alternative investments: `Private equity & VC` (2), `Commodities & precious metals` (2), `Farmland` (2)
- Investing & Trading › Active trading: `Day & swing trading` (1), `Options trading` (2), `Futures` (1), `Retail forex` (1)
- Investing & Trading › Trading platforms: `Prop firms` (2), `Copy trading` (2), `Trading simulators` (2)
- Housing & Real Estate › Homebuying: `Home search` (2)
- Housing & Real Estate › Renting: `Rental search` (2)
- Housing & Real Estate › Real estate investing: `Commercial property` (2), `REITs` (1), `House flipping` (2), `Real estate crowdfunding` (2)
- Housing & Real Estate › Home equity: `HELOCs` (2)
- Retirement & Wealth Planning › Retirement planning: `Pension planning` (2), `Early retirement & FIRE` (2)
- Retirement & Wealth Planning › Retirement accounts: `Annuities` (2), `Income portfolios` (2)
- Retirement & Wealth Planning › Wealth management: `Financial advisors` (2), `Asset protection` (2)
- Retirement & Wealth Planning › Estate planning: `Beneficiary planning` (2)
- Insurance › Life insurance: `Term life` (2), `Whole life` (1), `Universal life` (1)
- Insurance › Health & benefits: `Family plans` (2)
- Insurance › Property & casualty: `Renters insurance` (2), `Umbrella policies` (2)
- Insurance › Specialty lines: `Travel insurance` (2)
- Tax & Legal › Tax planning: `Capital gains` (2)
- Tax & Legal › Tax preparation: `DIY filing software` (2)
- Tax & Legal › Consumer legal services: `Prepaid legal plans` (2)
- Tax & Legal › Immigration services: `Asylum legal aid` (2)
- Entrepreneurship › Starting a business: `Business planning` (2)
- Entrepreneurship › Small business: `Retail shops` (2)
- Entrepreneurship › Online business: `Affiliate marketing` (2)
- Entrepreneurship › Creator economy: `YouTube` (2)
- Entrepreneurship › Freelancing & fractional: `Copywriting` (2)
- Entrepreneurship › Agencies: `SEO` (2), `Advertising` (2)

#### Relationships

- Dating › Dating platforms: `Swipe apps` (2), `Profile photography` (2)
- Dating › Dating coaching: `Dating courses` (2), `Image consulting` (2)
- Dating › Matchmaking & events: `International matchmaking` (2)
- Dating › Niche dating: `Intercultural dating` (2)
- Couples & Marriage › Premarital: `Compatibility assessments` (2)
- Couples & Marriage › Marriage enrichment: `Anniversary experiences` (2), `Vow renewals` (1)
- Couples & Marriage › Long-distance relationships: `LDR care packages` (2), `Visit planning` (2)
- Couples & Marriage › Relationship repair: `Trust rebuilding` (2)
- Couples & Marriage › Couples communities: `Intercultural couples` (2), `LGBTQ+ couples` (2), `Caregiver couples` (2)
- Intimacy & Sexuality › Therapy & coaching: `Sex-therapist certification` (2)
- Intimacy & Sexuality › Couples intimacy: `Intimacy challenges` (2), `Intimacy retreats` (2)
- Intimacy & Sexuality › Life-stage intimacy: `Later-life intimacy` (2)
- Intimacy & Sexuality › Desire & communication: `Sexual-communication courses` (2)
- Breakups & Divorce › Breakup support: `Heartbreak programs` (2), `No-contact apps` (2), `Breakup support communities` (2)
- Breakups & Divorce › Divorce finance: `Support calculators` (2)
- Breakups & Divorce › Co-parenting: `Parallel parenting support` (2)
- Breakups & Divorce › Life after divorce: `Dating after divorce` (2), `Divorce support groups` (2), `Social rebuilding` (2), `Personal reinvention` (2)
- Parenting & Family › Parenting stages: `Toddlers` (2), `School-age kids` (2), `Adult children` (2)
- Parenting & Family › Family structures: `Blended families` (2), `Multigenerational households` (2)
- Parenting & Family › Extended family: `In-law relationships` (1), `Grandparenting` (2), `Adult siblings` (1)
- Friendship & Community › Making friends: `Online friendship communities` (2)
- Friendship & Community › Loneliness & connection: `Warmlines` (2)
- Friendship & Community › Clubs & groups: `Hobby clubs` (2), `Fandom communities` (2), `Local community groups` (2)
- Friendship & Community › Community platforms: `Group chat communities` (2), `Neighborhood networks` (2), `Mutual-aid platforms` (2)
- Social Skills › Communication training: `Body-language coaching` (2)
- Social Skills › Public speaking & presence: `Speaking clubs` (2), `Shyness programs` (2)
- Death, Grief & Legacy › Memorialization: `Livestreamed services` (2)
- Death, Grief & Legacy › Grief support: `Grief support groups` (2)

#### Mind, Meaning & Growth

- Contemplative Practice › Meditation: `Meditation apps` (2), `Meditation teacher training` (2)
- Contemplative Practice › Breathwork: `Breathwork facilitators` (2), `Breathwork certification` (2), `Breath coaching for athletes` (2)
- Contemplative Practice › Journaling & reflection: `Gratitude apps` (2), `Printed guided journals` (2), `Guided reflection programs` (2)
- Contemplative Practice › Somatics & embodiment: `Somatic practices` (2), `Embodiment coaching` (2), `Ecstatic dance` (2)
- Contemplative Practice › Nature practices: `Forest bathing` (2), `Nature-therapy programs` (2), `Mindful hiking groups` (2)
- Contemplative Practice › Digital wellness: `Digital detox retreats` (2)
- Spirituality & Faith › Prayer & scripture: `Sermons & religious audio` (2)
- Spirituality & Faith › Spiritual guidance: `Spiritual direction` (2), `Pilgrimages & retreats` (2), `Interfaith communities` (1)
- Spirituality & Faith › Modern spirituality: `Tarot & divination` (2), `Manifestation apps` (2), `Sound baths & ceremonies` (2), `Spiritual retail` (2)
- Spirituality & Faith › Philosophy & Stoicism: `Stoicism apps` (2), `Philosophy courses` (2), `Philosophy media` (2), `Secular communities` (1)
- Purpose & Life Transitions › Self-discovery: `Attachment-style assessments` (2), `Purpose programs` (2)
- Purpose & Life Transitions › Life-stage transitions: `Quarter-life coaching` (2), `Empty-nest programs` (2)
- Purpose & Life Transitions › Sabbaticals & career breaks: `Adult gap-year programs` (2), `Career-break communities` (2)
- Personal Development › Self-help content: `Self-help courses` (2), `Self-help media` (2)
- Personal Development › Inner-work programs: `Self-esteem programs` (2), `Self-compassion training` (2), `Attachment-healing courses` (2), `Boundaries coaching` (2)
- Personal Development › Performance & mindset: `Mindset coaching` (2)
- Personal Development › Transformational experiences: `Transformational workshops` (2), `Growth retreats` (2), `Personal-growth festivals` (2)
- Personal Development › Growth communities: `Online growth communities` (2)
- Productivity › Tasks & habits: `Habit trackers` (2), `To-do apps` (2), `Routine builders` (2)
- Productivity › Time management: `Scheduling links` (2), `Time-blocking tools` (2), `Focus apps` (2)
- Productivity › Knowledge management: `Personal wikis` (2), `Whiteboards & mind mapping` (2), `Read-later & highlights` (2)
- Productivity › ADHD-friendly productivity: `Visual timers` (2)
- Productivity › AI personal assistants: `Voice assistants` (2)
- Learning & Education › Online learning: `MOOCs` (2), `Course marketplaces` (2)
- Learning & Education › Language learning: `Language apps` (2), `Immersion programs` (2)
- Learning & Education › Higher education: `Bootcamps` (2)
- Creativity & Craft › Writing: `Writing communities` (2), `Storytelling courses` (2)
- Creativity & Craft › Music creation: `Home recording gear` (2)
- Creativity & Craft › Visual arts & craft: `Paint-and-sip` (2), `Online art classes` (2), `Art supplies` (2)
- Creativity & Craft › Fiber arts: `Knitting & crochet` (2), `Sewing & quilting` (2)
- Creativity & Craft › Photo & video: `Photography` (2), `Filmmaking` (2)
- Creativity & Craft › Maker culture: `Woodworking` (2), `Makerspaces` (2)
- Creativity & Craft › Performing arts: `Improv classes` (2), `Acting & theater` (2), `Community choirs` (1)
- Career Development › Job search: `Career planning` (2), `Job boards` (2)
- Career Development › Work arrangements: `Remote job boards` (2), `Contract work` (2), `Executive search` (2)
- Career Development › Professional networking: `Networking events` (2)
- Career Development › Workplace navigation: `Employer reviews` (2)

#### Lifestyle, Home & Experiences

- Travel & Adventure › Trip planning: `Booking & deals` (2)
- Travel & Adventure › Experiential travel: `Expedition travel` (2), `Cultural & heritage tours` (2)
- Travel & Adventure › Digital nomadism: `Nomad visas` (2)
- Travel & Adventure › Wellness travel: `Sleep tourism` (2), `Spa & thermal travel` (2)
- Travel & Adventure › Traveler segments: `Group travel` (2), `LGBTQ+ travel` (2)
- Travel & Adventure › Sustainable tourism: `Eco-lodges` (2), `Low-carbon travel` (2), `Community-based tourism` (2), `Voluntourism` (1)
- Travel & Adventure › Road & outdoor travel: `RV & vanlife` (2), `Overlanding` (2), `Road-trip planning` (2)
- Food & Beverage › Meal solutions: `Meal kits` (2)
- Food & Beverage › Better-for-you foods: `Diet-specific foods` (2)
- Food & Beverage › Beverages: `Specialty coffee` (2), `Energy drinks` (2), `Wine & spirits` (2)
- Food & Beverage › Delivery & quick commerce: `Food delivery` (1), `Quick commerce` (2), `Grocery delivery` (2)
- Food & Beverage › Artisanal & local food: `Farmers-market platforms` (2), `Farm subscriptions` (2)
- Food & Beverage › Cooking & groceries: `Recipe apps` (2), `Cooking classes` (2), `Kitchen gadgets` (2)
- Home & Living › Smart home: `Smart home devices` (2)
- Home & Living › Design & decor: `Furniture DTC` (2), `Decor marketplaces` (2), `Home-office setups` (2)
- Home & Living › Organizing & moving: `Storage solutions` (2)
- Home & Living › Home improvement: `DIY projects` (2)
- Home & Living › Home services: `Home warranties` (2)
- Home & Living › Gardening & plants: `Houseplants` (2), `Plant-care apps` (2), `Home gardening` (2)
- Home & Living › Living arrangements: `Cohousing` (2)
- Fashion & Beauty › Apparel & accessories: `DTC basics` (2), `Athleisure` (2), `Sneakers & streetwear` (2), `Handbags & leather goods` (2), `Jewelry` (2), `Watches` (2)
- Fashion & Beauty › Resale & circular fashion: `Clothing rental` (2)
- Fashion & Beauty › Inclusive fashion: `Gender-neutral fashion` (2)
- Fashion & Beauty › Beauty & skincare: `Skincare DTC` (2), `Makeup` (2), `Clean beauty` (2)
- Fashion & Beauty › Men's grooming: `Grooming products` (2), `Shaving subscriptions` (2), `Beard care` (2)
- Pets & Animal Care › Pet food: `Raw & specialty diets` (2)
- Pets & Animal Care › Pet tech: `Pet cameras` (2), `Smart feeders` (2)
- Pets & Animal Care › Pet services: `Dog walking` (2)
- Pets & Animal Care › Pet lifestyle: `Pet apparel & accessories` (2)
- Pets & Animal Care › Other animals: `Backyard poultry` (2), `Aquarium & reptile care` (2)
- Sports & Hobbies › Racquet sports: `Tennis` (2)
- Sports & Hobbies › Outdoor recreation: `Hiking & camping` (2), `Climbing` (2), `Skiing & snowboarding` (2), `Fishing` (2), `Hunting` (2), `Boating` (2)
- Sports & Hobbies › Games & puzzles: `Board games` (2), `Puzzles` (2), `Board-game cafes` (2)
- Sports & Hobbies › Collecting: `Sneaker collecting` (2), `Comics & memorabilia` (2), `Coins & stamps` (1)
- Sports & Hobbies › Reading: `Book clubs` (2), `Indie bookstores` (2)
- Entertainment & Events › Streaming & video: `Streaming services` (1)
- Entertainment & Events › Podcasts & audio: `Podcast apps` (2), `Audiobooks` (2)
- Entertainment & Events › Gaming: `PC & console games` (2), `Cloud gaming` (2), `Esports` (2), `Game streaming` (2)
- Entertainment & Events › Live events: `Concerts` (2), `Festivals` (2), `Comedy shows` (2), `Theater` (1)
- Entertainment & Events › Nightlife & venues: `Bars & clubs` (2), `Karaoke venues` (2)
- Entertainment & Events › Immersive experiences: `Escape rooms` (2), `VR arcades` (2)
- Entertainment & Events › Weddings: `Venues` (2), `Honeymoons` (2)
- Cars & Transportation › Car buying: `Car subscriptions` (2)
- Cars & Transportation › Car enthusiasts: `Car clubs & events` (2), `Motorsports & track days` (2)
- Cars & Transportation › EV ownership: `EV trip planning` (2)
- Cars & Transportation › Micromobility: `E-scooters` (2), `Bike & scooter sharing` (2)
- Cars & Transportation › Autonomous & shared rides: `Robotaxis` (2), `Ride-hailing` (1), `Carpooling` (2)

#### Enterprise & AI

- AI Infrastructure › Foundation models: `Model APIs` (2)
- AI Infrastructure › Compute & data centers: `AI data centers` (2)
- Software & Developer Tools › Developer platforms: `Code hosting` (2), `Package registries` (2)
- Software & Developer Tools › API economy: `API marketplaces` (2)
- Cybersecurity & Trust › Consumer security: `Password managers` (2)
- Work & HR Tech › Collaboration: `Virtual offices` (2)
- Work & HR Tech › Employee wellbeing: `Wellness programs` (2)
- Marketing & Sales Tech › Retail media & ads: `Programmatic ad tech` (2)
- Marketing & Sales Tech › Analytics & attribution: `Multi-touch attribution` (2)
- Marketing & Sales Tech › Event marketing: `Webinar platforms` (2)
- Commerce & Retail Tech › E-commerce enablement: `Storefront platforms` (2)
- Commerce & Retail Tech › Point of sale: `Retail POS` (2), `Mobile POS` (2)
- Commerce & Retail Tech › SMB operations: `Website builders` (2)
- Business Finance Tech › Business lending: `Term loans` (2)

#### Planet & Frontier

- Climate & Energy › Clean power: `Wind power` (2), `Fusion` (2)
- Climate & Energy › Clean fuels & industry: `Green hydrogen` (2)
- Climate & Energy › Carbon: `Carbon markets` (2)
- Agriculture & Food Systems › Controlled-environment agriculture: `Vertical farms` (1), `Container farms` (2), `Indoor grow lighting` (2)
- Agriculture & Food Systems › Livestock & aquaculture: `Insect farming` (2)
- Agriculture & Food Systems › Alternative proteins: `Plant-based meat` (2), `Cultivated meat` (2)
- Industry & Supply Chain › Additive manufacturing: `Printing materials` (2)
- Industry & Supply Chain › Warehousing: `Micro-fulfillment` (2)
- Industry & Supply Chain › Last-mile delivery: `Crowdsourced couriers` (2), `Sidewalk robots` (2)
- Built Environment › Property management: `Tenant experience` (2)
- Built Environment › Commercial real estate tech: `Flexible workspace` (2)
- Built Environment › Smart buildings: `Occupancy analytics` (2)
- Aerospace & Defense › Launch & in-space: `Launch services` (2), `Lunar missions` (2), `Space tourism` (1)
- Aerospace & Defense › Satellites & space data: `Satellite connectivity` (2)
- Aerospace & Defense › Next-gen aviation: `eVTOL air taxis` (2), `Supersonic flight` (1)
- Deep Tech › Semiconductors & AI chips: `Neuromorphic chips` (2)
- Deep Tech › Quantum computing: `Quantum cloud access` (2)
- Public Interest & Impact › Smart cities & transit: `Civic data platforms` (2)
- Public Interest & Impact › Accessibility tech: `Screen readers` (2)
- Public Interest & Impact › Global development: `Digital public infrastructure` (2)
- Public Interest & Impact › Civic participation & justice: `Civic engagement platforms` (2), `Participatory budgeting` (1), `Election administration` (2)

## v11

- `Ghost kitchens` (Food & Beverage › Restaurant tech): dated. The delivery-only model collapsed; funding fell ~95% year on year by Q4 2025 and operators pivoted to hybrid food halls ([QSR Pro](https://qsr.pro/articles/ghost-kitchens-2026-what-survived)).
- `iBuying` (Built Environment › Real estate transactions): dated. Zillow and Redfin exited, and the remaining operators are shrinking (Opendoor −42% YTD 2026) ([24/7 Wall St.](https://247wallst.com/investing/2026/08/18/opendoor-is-down-42-in-2026-how-does-it-compare-to-housing-competitors-like-offerpad-and-compass/)).

## v10

No nodes cut.

## v9

No nodes cut.

## v8

No nodes cut.

## v7

No nodes cut.

## v6

No nodes cut.

## v5

No nodes cut.

## v4

No nodes cut.

## v3

No nodes cut.

## v2

- `Active listening` · `Assertiveness` · `Conversation skills` (Social Skills › Communication skills): skills, not markets. Folded into the note on Communication training › Communication coaching.
- `Communication styles` (Social Skills › Communication skills): content topic, covered by Communication coaching.
- `Empathy` · `Emotional regulation` (Social Skills › Emotional intelligence): skills. Covered by EQ training and Empathy programs for kids (SEL).
- `Relationship patterns` (Social Skills › Relationship psychology): content topic. Folded into the note on Couples & Marriage › Relationship coaching.

## v1

### Health

- `Athlete nutrition` (Health › Nutrition › Sports nutrition): repeated its parent; every sports-nutrition leaf is athlete nutrition.
- `Men's fitness` (Health › Men's Health): duplicated Fitness & Recovery and Weight management.
- `Muscle building` (Men's Health › Men's fitness): duplicate of Strength training › Bodybuilding.
- `Fat loss` (Men's Health › Men's fitness): duplicate of Weight management › Fat loss, which is kept.
- `Performance` (Men's Health › Men's fitness): ambiguous (athletic or sexual?), and both meanings are covered elsewhere.
- `Preventive medicine` (Aging & Longevity › Longevity science): duplicated the Prevention & Diagnostics category.
- `Lifestyle optimization` (Aging & Longevity › Longevity science): too vague to be a market.
- `Telehealth` (Healthcare Services › Access & delivery): a delivery channel, not a market. The specific telehealth markets (men's, pediatric, dermatology, vet, GLP-1, therapy) are kept.
- `Digital health` (Healthcare Technology › Consumer health tech): tautology; the whole branch is digital health.
- `Health apps` (Healthcare Technology › Consumer health tech): too broad. App markets live in their own domains.

### Wealth

- `Long-term investing` (Investing › Stocks): an investing approach, not a market.
- `Dividend investing` · `Growth investing` · `Value investing` · `Small-cap investing` (Investing › Stocks): styles, folded into the note on Public markets › Stock investing.
- `Government bonds` · `Corporate bonds` · `Municipal bonds` · `Bond funds` (Investing › Bonds): instrument variants, folded into the note on Public markets › Bonds.
- `Balanced funds` (Investing › Mutual funds): fund variant with no distinct startup market.
- `Dividend ETFs` (Investing › ETFs): fund variant with no distinct startup market.
- `Currency trading` (Trading › Forex): tautology; forex is currency trading.
- `Algorithmic forex` (Trading › Forex): niche; covered by Retail forex plus AI trading tools.
- `Commodity futures` · `Index futures` · `Currency futures` (Trading › Futures): folded into the note on Active trading › Futures.
- `Covered calls` · `Options income` · `Volatility trading` · `Hedging` (Trading › Options): strategies, folded into the note on Active trading › Options trading.
- `AI-native products` (Entrepreneurship): a product modality, not a business model. Now expressed with the `ai-native` tag.
- `Communication` · `Project management` · `Data analysis` (Career & Income › Professional skills): skill topics, folded into the note on Career Development › Upskilling.
- `Software development` · `Performance marketing` · `Cybersecurity` · `Data & AI engineering` (Career & Income › High-income skills): skill topics, folded into the Upskilling note and covered by Technical upskilling.
- `Consulting` · `Copywriting` (Career & Income › High-income skills): duplicates of Entrepreneurship › Freelancing & fractional, which is kept.
- `Insurance` (Tax & Legal Finance › Asset protection): duplicated the Insurance category.

### Relationships

- `Online messaging` (Dating › Online dating): an in-app feature, not a standalone market. AI message coaching covers the tooling.
- `First dates` · `Flirting` · `Confidence` · `Attraction` (Dating › Dating skills): content topics, folded into the note on Dating coaching.
- `Dating strategies` · `Casual dating` · `Serious dating` · `Long-term partner search` (Dating): user intents, not markets; the dating platforms serve all of them.
- `Relationship building` · `Emotional intimacy` · `Quality time` · `Shared goals` (Romantic Relationships): content topics, folded into the note on Couples & Marriage › Relationship coaching.
- `Communication` · `Trust` (Romantic Relationships › Relationship building): content topics, folded into the Relationship coaching note. Trust rebuilding survives as a repair market.
- `Relationship maintenance` · `Conflict resolution` · `Boundaries` · `Appreciation` · `Relationship rituals` (Romantic Relationships): content topics, folded into the Relationship coaching note.
- `Physical intimacy` · `Sexual intimacy` · `Affection` (Romantic Relationships › Intimacy): folded into the Intimacy & Sexuality category.
- `Jealousy` · `Insecurity` · `Communication breakdown` · `Resentment` (Romantic Relationships › Relationship challenges): folded into the note on Relationship repair.
- `Family expectations` (Marriage › Premarital): folded into Premarital counseling.
- `Communication` (Marriage › Married life): content topic, folded into the Relationship coaching note.
- `Parenting partnership` (Marriage › Married life): covered by Parenting & Family › Parenting support.
- `Communication conflicts` · `Financial conflicts` · `Extended-family conflicts` (Marriage › Marital conflict): folded into the note on Relationship repair.
- `Emotional recovery` · `Rebuilding confidence` · `Moving forward` (Breakups & Divorce › Breakup recovery): folded into the note on Breakup support.
- `Communication` · `Discipline` · `Emotional connection` (Family Relationships › Parent-child relationships): folded into the note on Parenting support.
- `Sibling conflict` · `Family boundaries` (Family Relationships › Sibling relationships): folded into the note on Extended family.
- `Adult friendships` · `Workplace friendships` · `Community friendships` · `Online friendships` (Friendships › Making friends): friendship contexts, folded into the note on Making friends.
- `Friendship maintenance` · `Communication` · `Shared activities` · `Long-distance friendships` (Friendships): content topics, folded into the Making friends note.
- `Friendship problems` · `Toxic dynamics` · `Betrayal` · `Boundaries` · `Friendship breakups` (Friendships): content topics, folded into the Making friends note.
- `Public interaction` (Social Skills › Confidence): too vague; replaced by Public speaking.
- `Sexual communication` · `Sexual confidence` (Sexual Relationships › Sexual wellness): content topics, covered by Intimacy coaching.
- `Arousal` · `Connection` (Sexual Relationships › Intimacy): content topics, covered by Intimacy coaching and Relational challenges.
- `Relationship introductions` (Community & Social Life › Matchmaking): duplicate of matchmaking.
