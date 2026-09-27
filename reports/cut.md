# Cut nodes

Every node removed from the tree is listed here with a one-line reason; nothing is deleted
silently. `scripts/reconcile.py` checks this file together with `changelog.md` and fails if any
original node is missing from both.

"Folded into note" means the topic is still described in the named node's `note:`, but it's no
longer a node of its own. That was the result of decision B: self-help content topics are not
startup markets.

Format: `node name` (old location): reason.

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
