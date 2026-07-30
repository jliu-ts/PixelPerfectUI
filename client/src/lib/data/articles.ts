// Real published Trending Society articles: titles, categories, canonical URLs and
// featured images all come from the production CMS. Images are served from Trending
// Society's own Cloudinary account with f_auto,q_auto,w_800 applied, which roughly halves
// the transfer of the 1200x630 originals.
//
// Summaries are rewritten rather than copied from the CMS excerpt field: those excerpts are
// SEO meta-descriptions ("Discover how...", "Learn why...") and reintroduce the copy tells
// this app was cleaned of.
//
// `time` is a static label computed from published_at at pull time (2026-07-29). It ages.

const CDN = "https://res.cloudinary.com/deilllfm5/image/upload/f_auto,q_auto,w_800";

export interface Article {
  id: number;
  title: string;
  source: string;
  category: string;
  time: string;
  image: string;
  summary: string;
  url: string;
}

export const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "OpenAI Breach Fuels AI Alignment, Control Debate",
    source: "Trending Society",
    category: "AI",
    time: "2h ago",
    image: `${CDN}/v1785356104/trendingsociety/og-images/2026-07/openai-breach-fuels-ai-alignment-control-debate.jpg`,
    summary: "A breach at OpenAI reopened the containment question: whether the control strategies used on frontier models actually hold.",
    url: "https://trendingsociety.com/articles/openai-breach-fuels-ai-alignment-control-debate"
  },
  {
    id: 2,
    title: "deepeval brings unit testing to LLMs",
    source: "Trending Society",
    category: "AI Evaluation",
    time: "1d ago",
    image: `${CDN}/v1785096197/trendingsociety/og-images/2026-07/confident-ai-s-deepeval-brings-unit-testing-to-llm.png`,
    summary: "DeepEval puts RAG pipelines and agents under unit tests before they reach production instead of after.",
    url: "https://trendingsociety.com/articles/confident-ai-s-deepeval-brings-unit-testing-to-llms"
  },
  {
    id: 3,
    title: "Circle Secures 1,000 IBM Blockchain Patents",
    source: "Trending Society",
    category: "Blockchain",
    time: "2d ago",
    image: `${CDN}/v1785177408/media/a57496cf-7f1f-407b-b898-2db8c6c32256/rvtgrvitldztwakq9bzl.webp`,
    summary: "IBM filed these for grocery chains and drugmakers. Circle bought nearly 1,000 of them to settle payments between AI agents.",
    url: "https://trendingsociety.com/articles/circle-secures-1-000-ibm-blockchain-patents"
  },
  {
    id: 4,
    title: "SBET, BMNR Follow MSTR's Playbook to Russell 3000",
    source: "Trending Society",
    category: "Crypto",
    time: "3d ago",
    image: `${CDN}/v1785026148/trendingsociety/og-images/2026-07/sbet-bmnr-follow-mstr-s-playbook-to-russell-3000.webp`,
    summary: "Both joined the Russell 3000 on the strength of large crypto holdings, despite posting losses.",
    url: "https://trendingsociety.com/articles/sbet-bmnr-follow-mstrs-playbook-to-russell-3000"
  },
  {
    id: 5,
    title: "Robinhood's Tokenized Stocks Fuel 5x Asset Surge",
    source: "Trending Society",
    category: "Crypto",
    time: "3d ago",
    image: `${CDN}/v1785025353/trendingsociety/og-images/2026-07/robinhood-s-tokenized-stocks-fuel-5x-asset-surge.jpg`,
    summary: "Tokenized equity volume is up 5x with GameStop leading, though memecoins still account for most on-chain activity.",
    url: "https://trendingsociety.com/articles/robinhoods-tokenized-stocks-fuel-5x-asset-surge"
  },
  {
    id: 6,
    title: "Devin Outposts Launches on Modal",
    source: "Trending Society",
    category: "AI Agents",
    time: "3d ago",
    image: `${CDN}/v1785014466/trendingsociety/og-images/2026-07/devin-outposts-launches-on-modal.png`,
    summary: "Cognition's agent picks up custom tooling, GPU access, and cheaper sandboxes by running on Modal.",
    url: "https://trendingsociety.com/articles/devin-outposts-launches-on-modal"
  },
  {
    id: 7,
    title: "B. Riley Backs BitMine's $200M MrBeast Deal",
    source: "Trending Society",
    category: "Finance",
    time: "3d ago",
    image: `${CDN}/v1785024945/trendingsociety/og-images/2026-07/b-riley-backs-bitmine-s-200m-mrbeast-diversificati.jpg`,
    summary: "B. Riley rates the $200M MrBeast partnership a buy while flagging how much of it rests on execution.",
    url: "https://trendingsociety.com/articles/b-riley-backs-bitmines-200m-mrbeast-diversification-bmnr"
  },
  {
    id: 8,
    title: "Anthropic Scales Claude Science via Modal",
    source: "Trending Society",
    category: "AI",
    time: "3d ago",
    image: `${CDN}/v1785024785/trendingsociety/og-images/2026-07/anthropic-unlocks-claude-science-scalability-via-m.png`,
    summary: "Claude Science runs on Modal to absorb the computational load of biological research workloads.",
    url: "https://trendingsociety.com/articles/anthropic-unlocks-claude-science-scalability-via-modal"
  },
  {
    id: 9,
    title: "Robinhood Turns AI Loose on Stock Trading",
    source: "Trending Society",
    category: "AI Agents",
    time: "4d ago",
    image: `${CDN}/v1785014783/trendingsociety/og-images/2026-07/robinhood-unleashes-ai-for-stock-trading.jpg`,
    summary: "Robinhood's agents now reach into trading and payments, which puts the question of unsupervised execution on the table.",
    url: "https://trendingsociety.com/articles/robinhood-unleashes-ai-for-stock-trading"
  },
  {
    id: 10,
    title: "Littlebird AI Remembers Your Work",
    source: "Trending Society",
    category: "Agentic AI",
    time: "6d ago",
    image: `${CDN}/v1784844946/trendingsociety/og-images/2026-07/littlebird-ai-remembers-your-work-delivers-smarter.webp`,
    summary: "An assistant that carries context between sessions rather than starting cold every time you open it.",
    url: "https://trendingsociety.com/articles/littlebird-ai-remembers-your-work-delivers-smarter-help"
  },
  {
    id: 11,
    title: "LingBot-Map Builds 3D Scenes From Streaming Data",
    source: "Trending Society",
    category: "3D Reconstruction",
    time: "6d ago",
    image: `${CDN}/v1784312195/trendingsociety/og-images/2026-07/can-lingbot-map-build-3d-scenes-from-streaming-dat.png`,
    summary: "Reconstructs a scene from a live stream at 20 FPS using a geometric context transformer.",
    url: "https://trendingsociety.com/articles/can-lingbot-map-build-3d-scenes-from-streaming-data"
  },
  {
    id: 12,
    title: "Microsoft SkillOpt Adds Skills to Frozen LLMs",
    source: "Trending Society",
    category: "Open Source",
    time: "6d ago",
    image: `${CDN}/v1784833825/trendingsociety/og-images/2026-07/microsoft-skillopt-unlocks-new-skills-in-frozen-ll.png`,
    summary: "24 points of agent accuracy without touching a single model weight.",
    url: "https://trendingsociety.com/articles/microsoft-skillopt-unlocks-new-skills-in-frozen-llms"
  },
  {
    id: 13,
    title: "Worldmonitor Fuses 500+ Live Feeds Into One OSINT Map",
    source: "Trending Society",
    category: "Artificial Intelligence",
    time: "1w ago",
    image: `${CDN}/v1784659147/trendingsociety/og-images/2026-07/what-can-worldmonitor-s-ai-intelligence-reveal.png`,
    summary: "Five hundred feeds and 56 map layers collapsed into a single OSINT surface, at 64k GitHub stars.",
    url: "https://trendingsociety.com/articles/what-can-worldmonitors-ai-intelligence-reveal"
  },
  {
    id: 14,
    title: "Baidu's 3B OCR Model Hits 86.8% on Complex Docs",
    source: "Trending Society",
    category: "Open Source",
    time: "1w ago",
    image: `${CDN}/v1784572551/trendingsociety/og-images/2026-07/how-baidu-s-unlimited-ocr-changes-ai-on-hugging-fa.png`,
    summary: "A 3B-parameter model parsing dense documents at 86.8% accuracy, published on Hugging Face.",
    url: "https://trendingsociety.com/articles/how-baidus-unlimited-ocr-changes-ai-on-hugging-face"
  }
];
