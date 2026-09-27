# Prune preview (nothing has been changed yet)

Leaves scoring **≤ 2** move to `taxonomy-archive.yaml`. Scores are in `data/actionability.csv`; the rubric is in `scripts/prune.py`. The structural plan is in `data/prune-resolution.yaml`.

## Scores

| Score | Meaning | Leaves | Share |
|---|---|---|---|
| 5 | venture-scale, clear buyer, active formation | 104 | 5% |
| 4 | clear product and buyer | 543 | 27% |
| 3 | niche / services / slow or regulated | 946 | 47% |
| 2 | label, not a product; incumbent- or content-dominated | 395 | 20% |
| 1 | not realistically startup-actionable | 28 | 1% |

## Before → after

| | Now | After prune |
|---|---|---|
| Total nodes | 2,490 | 2,038 |
| Leaves | 2,016 | 1,593 |
| Subcategories | 403 | 374 |
| Categories | 63 | 63 |
| Pillars | 8 | 8 |
| Leaves moved to archive | — | 423 |

| Pillar | Leaves now | Moving | Remaining |
|---|---|---|---|
| Health & Wellness | 203 | 41 | 162 |
| Care & Conditions | 236 | 42 | 194 |
| Wealth | 220 | 60 | 160 |
| Relationships | 215 | 49 | 166 |
| Mind, Meaning & Growth | 241 | 82 | 159 |
| Lifestyle, Home & Experiences | 327 | 102 | 225 |
| Enterprise & AI | 274 | 16 | 258 |
| Planet & Frontier | 300 | 31 | 269 |

**Simulated result passes validation** (with subcategories allowed 2–8 leaves).

## Structural changes this requires

### Subcategories that move entirely (9)

Every leaf scored ≤ 2, so the subcategory itself goes to the archive.

- Health & Wellness > Prevention & Diagnostics > Immunization
- Health & Wellness > Fitness & Recovery > Strength training
- Care & Conditions > Integrative Medicine > Whole systems
- Care & Conditions > Integrative Medicine > Herbal medicine
- Wealth > Investing & Trading > Active trading
- Wealth > Insurance > Life insurance
- Mind, Meaning & Growth > Contemplative Practice > Nature practices
- Mind, Meaning & Growth > Spirituality & Faith > Philosophy & Stoicism
- Lifestyle, Home & Experiences > Sports & Hobbies > Outdoor recreation

### Merged (1)

- **Investing tools** ← Public markets + Automated investing + Trading platforms: Direct indexing, AI investing copilots, AI trading tools

### Folded into a sibling (18)

These subcategories would keep only one leaf, so the survivor moves and the subcategory dissolves.

| Dissolved subcategory | Survivor | Moves to |
|---|---|---|
| Weight management | Metabolic health | Nutrition & Metabolic Health > Personalized nutrition |
| Back & neck | Lower back pain | Pain & Musculoskeletal > Chronic pain |
| Brain health & prevention | Brain-health clinics | Brain & Neurological Health > Dementia & cognitive decline |
| Emergency care | EMS tech | Health Technology > Care operations |
| Energy & movement practices | Yoga therapy | Integrative Medicine > Integrative clinics |
| Dating coaching | Dating coaches | Dating > Matchmaking, coaching & events |
| Couples communities | Military couples | Couples & Marriage > Long-distance relationships |
| Breakup support | Breakup coaching | Breakups & Divorce > Rebuilding after separation |
| Extended family | Genealogy & family history | Parenting & Family > Family structures |
| Modern spirituality | Astrology apps | Spirituality & Faith > Spiritual guidance |
| Sabbaticals & career breaks | Sabbatical planning | Purpose & Life Transitions > Life-stage transitions |
| Transformational experiences | Wilderness programs | Personal Development > Inner-work programs |
| Sustainable tourism | Overtourism management | Travel & Adventure > Hospitality tech |
| Delivery & quick commerce | Senior meal delivery | Food & Beverage > Meal solutions |
| Apparel & accessories | Kids' clothing | Parenting & Family > Baby & kids products |
| Other animals | Equine care | Pets & Animal Care > Pet health |
| Point of sale | Loyalty & gift cards | Commerce & Retail Tech > E-commerce enablement |
| Controlled-environment agriculture | Greenhouse tech | Agriculture & Food Systems > Precision agriculture |

Renamed to fit their new contents: `Matchmaking & events` → `Matchmaking, coaching & events`; `Life after divorce` → `Rebuilding after separation`.

### Left with 2 leaves (27)

Allowed under the relaxed rule. The alternative is keeping some 2-scored leaves to pad them back to 3.

- Sleep > Sleep disorders: Insomnia & CBT-I, Sleep apnea
- Mental Health > Stress & burnout: Burnout, Workplace stress
- Aging & Longevity > Biohacking: Longevity data dashboards, Smart rings
- Chronic Conditions > Autoimmune disease: Rheumatoid arthritis, Hashimoto's
- Pain & Musculoskeletal > Foot & ankle care: Custom orthotics, Podiatry telehealth
- Housing & Real Estate > Home equity: Equity release, Home-equity investments
- Retirement & Wealth Planning > Retirement planning: Retirement income, Social Security planning
- Retirement & Wealth Planning > Retirement accounts: IRAs & 401(k)s, Small-business retirement plans
- Dating > Dating platforms: Curated apps, Profile optimization
- Parenting & Family > Parenting stages: Newborns, Teens
- Contemplative Practice > Breathwork: Breathwork apps, Breath-training devices
- Contemplative Practice > Journaling & reflection: Journaling apps, AI journaling
- Contemplative Practice > Somatics & embodiment: Somatic practitioner training, Nervous-system regulation apps
- Purpose & Life Transitions > Self-discovery: Strengths & values assessments, Personality assessments
- Productivity > Tasks & habits: Gamified productivity, Goal-setting & accountability
- Productivity > Time management: AI calendars, Time tracking
- Productivity > Knowledge management: Note-taking apps, AI knowledge assistants
- Creativity & Craft > Fiber arts: Pattern marketplaces, Yarn & fabric DTC
- Creativity & Craft > Performing arts: Dance classes, Voice & singing lessons
- Career Development > Work arrangements: Flexible & part-time jobs, Interim management
- Food & Beverage > Beverages: Tea & matcha, Non-alcoholic drinks
- Home & Living > Design & decor: E-design, AI interior design
- Fashion & Beauty > Men's grooming: Men's skincare, Barbershop booking
- Sports & Hobbies > Reading: Book discovery, Reading trackers
- Cars & Transportation > Car enthusiasts: Collector cars, Parts & modification
- Cars & Transportation > Autonomous & shared rides: Peer-to-peer car sharing, Medical & senior rides
- Aerospace & Defense > Launch & in-space: In-space servicing, In-space manufacturing

### Tags dropped because the new parent already carries them (2)

- Care & Conditions > Health Technology > Care operations > EMS tech: b2b
- Lifestyle, Home & Experiences > Travel & Adventure > Hospitality tech > Overtourism management: b2b

### Cross-references updated (6)

- at Health & Wellness > Prevention & Diagnostics: `Enterprise & AI > Work & HR Tech > Employee wellbeing > Wellness programs` → removed (target archived)
- at Health & Wellness > Sleep: `Lifestyle, Home & Experiences > Travel & Adventure > Wellness travel > Sleep tourism` → removed (target archived)
- at Health & Wellness > Aging & Longevity: `Lifestyle, Home & Experiences > Fashion & Beauty > Beauty & skincare > Skincare DTC` → removed (target archived)
- at Lifestyle, Home & Experiences > Travel & Adventure > Wellness travel: `Care & Conditions > Care Delivery > Patient navigation > Medical tourism` → removed (target archived)
- at Planet & Frontier > Agriculture & Food Systems > Ag biologicals & genetics > Regenerative ag programs: `Planet & Frontier > Climate & Energy > Carbon > Carbon markets` → removed (target archived)
- at Planet & Frontier > Industry & Supply Chain > Last-mile delivery: `Lifestyle, Home & Experiences > Food & Beverage > Delivery & quick commerce` → removed (target archived)

## Every leaf that would move (423)


### Health & Wellness

- Prevention & Diagnostics > Immunization: Adult immunization (2), Travel vaccines (2), Workplace flu clinics (2)
- Nutrition & Metabolic Health > Weight management: Fat loss (2), Healthy weight gain (2), Body recomposition (2)
- Nutrition & Metabolic Health > GLP-1 economy: Compounded GLP-1s (2)
- Nutrition & Metabolic Health > Personalized nutrition: Nutrigenomics (2)
- Nutrition & Metabolic Health > Sports nutrition: Competition prep (2)
- Nutrition & Metabolic Health > Special diets: Low-carb & keto (2), Elimination diets (2)
- Nutrition & Metabolic Health > Supplements: Omega-3 (2), Herbal supplements (2)
- Nutrition & Metabolic Health > Clinical nutrition: Intuitive eating (2)
- Fitness & Recovery > Strength training: Weightlifting (2), Bodybuilding (2), Powerlifting (2), Functional strength (2)
- Fitness & Recovery > Cardio & endurance: Swimming (2), Walking (2)
- Fitness & Recovery > Mobility & flexibility: Joint mobility (2)
- Fitness & Recovery > Athletic recovery: Float therapy (2)
- Sleep > Sleep optimization: Bedroom environment (2)
- Sleep > Sleep disorders: Restless legs (2), Circadian rhythm disorders (2)
- Sleep > Sleep products: Sleep aids (2)
- Mental Health > Anxiety & mood: Panic disorder (2), Seasonal depression (2)
- Mental Health > Stress & burnout: Chronic stress (2), Relaxation techniques (2)
- Mental Health > Therapy access: Sliding-scale clinics (2)
- Sexual & Reproductive Health > Contraception: Emergency contraception (2)
- Sexual & Reproductive Health > Sexual health services: STI prevention (2)
- Aging & Longevity > Healthy aging: Senior nutrition (2)
- Aging & Longevity > Longevity medicine: Off-label longevity drugs (2), Regenerative medicine (2)
- Aging & Longevity > Biohacking: HRV tracking (2), Wearable stacks (2), Self-experiment platforms (2), Biohacker communities (2)
- Aging & Longevity > Senior living: Active-adult communities (2)

### Care & Conditions

- Chronic Conditions > Autoimmune disease: Lupus (2), Multiple sclerosis (2)
- Chronic Conditions > Digestive health: GERD (2)
- Chronic Conditions > Respiratory & allergy: Seasonal allergies (2)
- Pain & Musculoskeletal > Back & neck: Sciatica (2), Posture (2), Tech neck (2), Cervical pain (2)
- Pain & Musculoskeletal > Joint & bone health: Knee pain (2), Hip pain (2), Shoulder pain (2)
- Pain & Musculoskeletal > Foot & ankle care: Plantar fasciitis (2)
- Pain & Musculoskeletal > Chronic pain: Pain-tracking apps (2)
- Brain & Neurological Health > Brain health & prevention: Brain-health coaching (2), Nootropics (2)
- Brain & Neurological Health > Consumer neurotech: Brain-training apps (2)
- Specialty Care > Dental & oral health: Oral microbiome (2)
- Specialty Care > Vision: Contact lenses (2)
- Specialty Care > Medical aesthetics: IV hydration (2)
- Population-Specific Care > LGBTQ+ health: Trans-inclusive provider directories (2)
- Population-Specific Care > Rural & underserved care: Refugee health navigation (2)
- Care Delivery > Primary & urgent care: Retail clinics (2)
- Care Delivery > Pharmacy: Compounding pharmacies (2)
- Care Delivery > Patient navigation: Medical tourism (2)
- Care Delivery > Emergency care: ER triage & wait-time apps (2), Air ambulance memberships (2)
- Health Technology > Health data infrastructure: EHR (2)
- Health Technology > Healthcare workforce: Clinician burnout tools (2)
- Integrative Medicine > Whole systems: Ayurveda (2), Traditional Chinese Medicine (2), Unani (1), Indigenous medicine (1), Naturopathy (2), Homeopathy (1)
- Integrative Medicine > Herbal medicine: Clinical herbalism (2), Herbal apothecaries (2), Herbalism education (2)
- Integrative Medicine > Manual therapies: Reflexology (1), Cupping & gua sha (2)
- Integrative Medicine > Energy & movement practices: Reiki (1), Qigong (2), Tai chi (2)

### Wealth

- Money Management > Budgeting: Zero-based budgeting (2), Household cash flow (2)
- Money Management > Saving: Emergency funds (2), Goal-based saving (2)
- Money Management > Debt management: Debt settlement (2)
- Money Management > Credit: Credit repair (2), Credit monitoring (2)
- Banking & Payments > Consumer payments: P2P payments (2), Digital wallets (2)
- Banking & Payments > Consumer lending: Auto loans (2), Loan marketplaces (2)
- Banking & Payments > Financial inclusion: Microloans (2)
- Investing & Trading > Public markets: Stock investing (2), Bonds (2), Index funds & ETFs (2), Active & sector funds (1)
- Investing & Trading > Automated investing: Robo-advisors (2), Micro-investing (2)
- Investing & Trading > Alternative investments: Private equity & VC (2), Commodities & precious metals (2), Farmland (2)
- Investing & Trading > Active trading: Day & swing trading (1), Options trading (2), Futures (1), Retail forex (1)
- Investing & Trading > Trading platforms: Prop firms (2), Copy trading (2), Trading simulators (2)
- Housing & Real Estate > Homebuying: Home search (2)
- Housing & Real Estate > Renting: Rental search (2)
- Housing & Real Estate > Real estate investing: Commercial property (2), REITs (1), House flipping (2), Real estate crowdfunding (2)
- Housing & Real Estate > Home equity: HELOCs (2)
- Retirement & Wealth Planning > Retirement planning: Pension planning (2), Early retirement & FIRE (2)
- Retirement & Wealth Planning > Retirement accounts: Annuities (2), Income portfolios (2)
- Retirement & Wealth Planning > Wealth management: Financial advisors (2), Asset protection (2)
- Retirement & Wealth Planning > Estate planning: Beneficiary planning (2)
- Insurance > Life insurance: Term life (2), Whole life (1), Universal life (1)
- Insurance > Health & benefits: Family plans (2)
- Insurance > Property & casualty: Renters insurance (2), Umbrella policies (2)
- Insurance > Specialty lines: Travel insurance (2)
- Tax & Legal > Tax planning: Capital gains (2)
- Tax & Legal > Tax preparation: DIY filing software (2)
- Tax & Legal > Consumer legal services: Prepaid legal plans (2)
- Tax & Legal > Immigration services: Asylum legal aid (2)
- Entrepreneurship > Starting a business: Business planning (2)
- Entrepreneurship > Small business: Retail shops (2)
- Entrepreneurship > Online business: Affiliate marketing (2)
- Entrepreneurship > Creator economy: YouTube (2)
- Entrepreneurship > Freelancing & fractional: Copywriting (2)
- Entrepreneurship > Agencies: SEO (2), Advertising (2)

### Relationships

- Dating > Dating platforms: Swipe apps (2), Profile photography (2)
- Dating > Dating coaching: Dating courses (2), Image consulting (2)
- Dating > Matchmaking & events: International matchmaking (2)
- Dating > Niche dating: Intercultural dating (2)
- Couples & Marriage > Premarital: Compatibility assessments (2)
- Couples & Marriage > Marriage enrichment: Anniversary experiences (2), Vow renewals (1)
- Couples & Marriage > Long-distance relationships: LDR care packages (2), Visit planning (2)
- Couples & Marriage > Relationship repair: Trust rebuilding (2)
- Couples & Marriage > Couples communities: Intercultural couples (2), LGBTQ+ couples (2), Caregiver couples (2)
- Intimacy & Sexuality > Therapy & coaching: Sex-therapist certification (2)
- Intimacy & Sexuality > Couples intimacy: Intimacy challenges (2), Intimacy retreats (2)
- Intimacy & Sexuality > Life-stage intimacy: Later-life intimacy (2)
- Intimacy & Sexuality > Desire & communication: Sexual-communication courses (2)
- Breakups & Divorce > Breakup support: Heartbreak programs (2), No-contact apps (2), Breakup support communities (2)
- Breakups & Divorce > Divorce finance: Support calculators (2)
- Breakups & Divorce > Co-parenting: Parallel parenting support (2)
- Breakups & Divorce > Life after divorce: Dating after divorce (2), Divorce support groups (2), Social rebuilding (2), Personal reinvention (2)
- Parenting & Family > Parenting stages: Toddlers (2), School-age kids (2), Adult children (2)
- Parenting & Family > Family structures: Blended families (2), Multigenerational households (2)
- Parenting & Family > Extended family: In-law relationships (1), Grandparenting (2), Adult siblings (1)
- Friendship & Community > Making friends: Online friendship communities (2)
- Friendship & Community > Loneliness & connection: Warmlines (2)
- Friendship & Community > Clubs & groups: Hobby clubs (2), Fandom communities (2), Local community groups (2)
- Friendship & Community > Community platforms: Group chat communities (2), Neighborhood networks (2), Mutual-aid platforms (2)
- Social Skills > Communication training: Body-language coaching (2)
- Social Skills > Public speaking & presence: Speaking clubs (2), Shyness programs (2)
- Death, Grief & Legacy > Memorialization: Livestreamed services (2)
- Death, Grief & Legacy > Grief support: Grief support groups (2)

### Mind, Meaning & Growth

- Contemplative Practice > Meditation: Meditation apps (2), Meditation teacher training (2)
- Contemplative Practice > Breathwork: Breathwork facilitators (2), Breathwork certification (2), Breath coaching for athletes (2)
- Contemplative Practice > Journaling & reflection: Gratitude apps (2), Printed guided journals (2), Guided reflection programs (2)
- Contemplative Practice > Somatics & embodiment: Somatic practices (2), Embodiment coaching (2), Ecstatic dance (2)
- Contemplative Practice > Nature practices: Forest bathing (2), Nature-therapy programs (2), Mindful hiking groups (2)
- Contemplative Practice > Digital wellness: Digital detox retreats (2)
- Spirituality & Faith > Prayer & scripture: Sermons & religious audio (2)
- Spirituality & Faith > Spiritual guidance: Spiritual direction (2), Pilgrimages & retreats (2), Interfaith communities (1)
- Spirituality & Faith > Modern spirituality: Tarot & divination (2), Manifestation apps (2), Sound baths & ceremonies (2), Spiritual retail (2)
- Spirituality & Faith > Philosophy & Stoicism: Stoicism apps (2), Philosophy courses (2), Philosophy media (2), Secular communities (1)
- Purpose & Life Transitions > Self-discovery: Attachment-style assessments (2), Purpose programs (2)
- Purpose & Life Transitions > Life-stage transitions: Quarter-life coaching (2), Empty-nest programs (2)
- Purpose & Life Transitions > Sabbaticals & career breaks: Adult gap-year programs (2), Career-break communities (2)
- Personal Development > Self-help content: Self-help courses (2), Self-help media (2)
- Personal Development > Inner-work programs: Self-esteem programs (2), Self-compassion training (2), Attachment-healing courses (2), Boundaries coaching (2)
- Personal Development > Performance & mindset: Mindset coaching (2)
- Personal Development > Transformational experiences: Transformational workshops (2), Growth retreats (2), Personal-growth festivals (2)
- Personal Development > Growth communities: Online growth communities (2)
- Productivity > Tasks & habits: Habit trackers (2), To-do apps (2), Routine builders (2)
- Productivity > Time management: Scheduling links (2), Time-blocking tools (2), Focus apps (2)
- Productivity > Knowledge management: Personal wikis (2), Whiteboards & mind mapping (2), Read-later & highlights (2)
- Productivity > ADHD-friendly productivity: Visual timers (2)
- Productivity > AI personal assistants: Voice assistants (2)
- Learning & Education > Online learning: MOOCs (2), Course marketplaces (2)
- Learning & Education > Language learning: Language apps (2), Immersion programs (2)
- Learning & Education > Higher education: Bootcamps (2)
- Creativity & Craft > Writing: Writing communities (2), Storytelling courses (2)
- Creativity & Craft > Music creation: Home recording gear (2)
- Creativity & Craft > Visual arts & craft: Paint-and-sip (2), Online art classes (2), Art supplies (2)
- Creativity & Craft > Fiber arts: Knitting & crochet (2), Sewing & quilting (2)
- Creativity & Craft > Photo & video: Photography (2), Filmmaking (2)
- Creativity & Craft > Maker culture: Woodworking (2), Makerspaces (2)
- Creativity & Craft > Performing arts: Improv classes (2), Acting & theater (2), Community choirs (1)
- Career Development > Job search: Career planning (2), Job boards (2)
- Career Development > Work arrangements: Remote job boards (2), Contract work (2), Executive search (2)
- Career Development > Professional networking: Networking events (2)
- Career Development > Workplace navigation: Employer reviews (2)

### Lifestyle, Home & Experiences

- Travel & Adventure > Trip planning: Booking & deals (2)
- Travel & Adventure > Experiential travel: Expedition travel (2), Cultural & heritage tours (2)
- Travel & Adventure > Digital nomadism: Nomad visas (2)
- Travel & Adventure > Wellness travel: Sleep tourism (2), Spa & thermal travel (2)
- Travel & Adventure > Traveler segments: Group travel (2), LGBTQ+ travel (2)
- Travel & Adventure > Sustainable tourism: Eco-lodges (2), Low-carbon travel (2), Community-based tourism (2), Voluntourism (1)
- Travel & Adventure > Road & outdoor travel: RV & vanlife (2), Overlanding (2), Road-trip planning (2)
- Food & Beverage > Meal solutions: Meal kits (2)
- Food & Beverage > Better-for-you foods: Diet-specific foods (2)
- Food & Beverage > Beverages: Specialty coffee (2), Energy drinks (2), Wine & spirits (2)
- Food & Beverage > Delivery & quick commerce: Food delivery (1), Quick commerce (2), Grocery delivery (2)
- Food & Beverage > Artisanal & local food: Farmers-market platforms (2), Farm subscriptions (2)
- Food & Beverage > Cooking & groceries: Recipe apps (2), Cooking classes (2), Kitchen gadgets (2)
- Home & Living > Smart home: Smart home devices (2)
- Home & Living > Design & decor: Furniture DTC (2), Decor marketplaces (2), Home-office setups (2)
- Home & Living > Organizing & moving: Storage solutions (2)
- Home & Living > Home improvement: DIY projects (2)
- Home & Living > Home services: Home warranties (2)
- Home & Living > Gardening & plants: Houseplants (2), Plant-care apps (2), Home gardening (2)
- Home & Living > Living arrangements: Cohousing (2)
- Fashion & Beauty > Apparel & accessories: DTC basics (2), Athleisure (2), Sneakers & streetwear (2), Handbags & leather goods (2), Jewelry (2), Watches (2)
- Fashion & Beauty > Resale & circular fashion: Clothing rental (2)
- Fashion & Beauty > Inclusive fashion: Gender-neutral fashion (2)
- Fashion & Beauty > Beauty & skincare: Skincare DTC (2), Makeup (2), Clean beauty (2)
- Fashion & Beauty > Men's grooming: Grooming products (2), Shaving subscriptions (2), Beard care (2)
- Pets & Animal Care > Pet food: Raw & specialty diets (2)
- Pets & Animal Care > Pet tech: Pet cameras (2), Smart feeders (2)
- Pets & Animal Care > Pet services: Dog walking (2)
- Pets & Animal Care > Pet lifestyle: Pet apparel & accessories (2)
- Pets & Animal Care > Other animals: Backyard poultry (2), Aquarium & reptile care (2)
- Sports & Hobbies > Racquet sports: Tennis (2)
- Sports & Hobbies > Outdoor recreation: Hiking & camping (2), Climbing (2), Skiing & snowboarding (2), Fishing (2), Hunting (2), Boating (2)
- Sports & Hobbies > Games & puzzles: Board games (2), Puzzles (2), Board-game cafes (2)
- Sports & Hobbies > Collecting: Sneaker collecting (2), Comics & memorabilia (2), Coins & stamps (1)
- Sports & Hobbies > Reading: Book clubs (2), Indie bookstores (2)
- Entertainment & Events > Streaming & video: Streaming services (1)
- Entertainment & Events > Podcasts & audio: Podcast apps (2), Audiobooks (2)
- Entertainment & Events > Gaming: PC & console games (2), Cloud gaming (2), Esports (2), Game streaming (2)
- Entertainment & Events > Live events: Concerts (2), Festivals (2), Comedy shows (2), Theater (1)
- Entertainment & Events > Nightlife & venues: Bars & clubs (2), Karaoke venues (2)
- Entertainment & Events > Immersive experiences: Escape rooms (2), VR arcades (2)
- Entertainment & Events > Weddings: Venues (2), Honeymoons (2)
- Cars & Transportation > Car buying: Car subscriptions (2)
- Cars & Transportation > Car enthusiasts: Car clubs & events (2), Motorsports & track days (2)
- Cars & Transportation > EV ownership: EV trip planning (2)
- Cars & Transportation > Micromobility: E-scooters (2), Bike & scooter sharing (2)
- Cars & Transportation > Autonomous & shared rides: Robotaxis (2), Ride-hailing (1), Carpooling (2)

### Enterprise & AI

- AI Infrastructure > Foundation models: Model APIs (2)
- AI Infrastructure > Compute & data centers: AI data centers (2)
- Software & Developer Tools > Developer platforms: Code hosting (2), Package registries (2)
- Software & Developer Tools > API economy: API marketplaces (2)
- Cybersecurity & Trust > Consumer security: Password managers (2)
- Work & HR Tech > Collaboration: Virtual offices (2)
- Work & HR Tech > Employee wellbeing: Wellness programs (2)
- Marketing & Sales Tech > Retail media & ads: Programmatic ad tech (2)
- Marketing & Sales Tech > Analytics & attribution: Multi-touch attribution (2)
- Marketing & Sales Tech > Event marketing: Webinar platforms (2)
- Commerce & Retail Tech > E-commerce enablement: Storefront platforms (2)
- Commerce & Retail Tech > Point of sale: Retail POS (2), Mobile POS (2)
- Commerce & Retail Tech > SMB operations: Website builders (2)
- Business Finance Tech > Business lending: Term loans (2)

### Planet & Frontier

- Climate & Energy > Clean power: Wind power (2), Fusion (2)
- Climate & Energy > Clean fuels & industry: Green hydrogen (2)
- Climate & Energy > Carbon: Carbon markets (2)
- Agriculture & Food Systems > Controlled-environment agriculture: Vertical farms (1), Container farms (2), Indoor grow lighting (2)
- Agriculture & Food Systems > Livestock & aquaculture: Insect farming (2)
- Agriculture & Food Systems > Alternative proteins: Plant-based meat (2), Cultivated meat (2)
- Industry & Supply Chain > Additive manufacturing: Printing materials (2)
- Industry & Supply Chain > Warehousing: Micro-fulfillment (2)
- Industry & Supply Chain > Last-mile delivery: Crowdsourced couriers (2), Sidewalk robots (2)
- Built Environment > Property management: Tenant experience (2)
- Built Environment > Commercial real estate tech: Flexible workspace (2)
- Built Environment > Smart buildings: Occupancy analytics (2)
- Aerospace & Defense > Launch & in-space: Launch services (2), Lunar missions (2), Space tourism (1)
- Aerospace & Defense > Satellites & space data: Satellite connectivity (2)
- Aerospace & Defense > Next-gen aviation: eVTOL air taxis (2), Supersonic flight (1)
- Deep Tech > Semiconductors & AI chips: Neuromorphic chips (2)
- Deep Tech > Quantum computing: Quantum cloud access (2)
- Public Interest & Impact > Smart cities & transit: Civic data platforms (2)
- Public Interest & Impact > Accessibility tech: Screen readers (2)
- Public Interest & Impact > Global development: Digital public infrastructure (2)
- Public Interest & Impact > Civic participation & justice: Civic engagement platforms (2), Participatory budgeting (1), Election administration (2)
