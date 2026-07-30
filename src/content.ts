/**
 * content.ts — ALL copy, the voice-over script, and the product data pulled
 * from the AsapNumbers screenshots. Edit here to re-script the film.
 *
 * `built: true` marks the scenes fully implemented in this pass
 * (Logo Reveal, Dashboard, Fund Wallet, Virtual Numbers). The remaining
 * storyboard scenes' VO is included below for the next passes.
 */

export const brand = {
  name: 'AsapNumbers',
  wordmark: {first: 'ASAP', second: 'NUMBERS'},
  url: 'numberasap.com',
  tagline: 'Virtual Numbers • Airtime • Utilities',
} as const;

/** The demo account shown in the screenshots. */
export const account = {
  name: 'Justice Plain',
  email: 'justiceplain@gmail.com',
  initials: 'JP',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DATA (mirrors the real UI)
// ─────────────────────────────────────────────────────────────────────────────
export const nav = {
  main: [
    {id: 'dashboard', label: 'Dashboard', icon: 'home'},
    {id: 'numbers', label: 'Virtual Numbers', icon: 'phone', badge: 'NEW'},
    {id: 'utilities', label: 'Utilities', icon: 'bolt'},
  ],
  account: [
    {id: 'transactions', label: 'Transactions', icon: 'list'},
    {id: 'logs', label: 'Account Logs', icon: 'doc'},
    {id: 'esim', label: 'eSIM', icon: 'sim', badge: 'SOON'},
  ],
  more: [
    {id: 'website', label: 'Need a Website?', icon: 'globe', external: true},
    {id: 'profile', label: 'My Profile', icon: 'user'},
    {id: 'fund', label: 'Fund Wallet', icon: 'card'},
  ],
} as const;

export const dashboard = {
  walletLabel: 'Main wallet',
  balance: 0,
  tiles: [
    {id: 'data', label: 'Buy Data', icon: 'bolt'},
    {id: 'airtime', label: 'Buy Airtime', icon: 'phone'},
    {id: 'logs', label: 'Logs', icon: 'doc'},
    {id: 'esim', label: 'eSIM', icon: 'sim'},
  ],
  quickActions: [
    {id: 'number', label: 'Virtual Number', sub: 'SMS / OTP numbers', icon: 'phone'},
    {id: 'utilities', label: 'Utilities', sub: 'Bills & services', icon: 'bolt'},
    {id: 'refer', label: 'Refer & Earn', sub: 'Invite friends', icon: 'users'},
    {id: 'proxies', label: 'Proxies', sub: 'Coming soon', icon: 'shield', soon: true},
  ],
} as const;

export const fundWallet = {
  title: 'Add Funds',
  subtitle: 'Fund your wallet instantly via bank transfer',
  methods: ['Virtual Account', 'Korapay', 'Crypto', 'Manual'],
  min: 100,
  accountNumber: '2159327326',
  bankName: 'Paga',
  accountName: 'Asapnumbers – JusticePlain (OasisPay)',
  steps: [
    'Open your bank app or USSD',
    'Transfer to the account number above',
    'Your wallet credits automatically — usually within seconds',
  ],
} as const;

export const virtualNumbers = {
  servers: [
    {id: 1, label: 'Server 1', region: 'USA Only', flag: '🇺🇸'},
    {id: 2, label: 'Server 2', region: 'All Countries', flag: '🌍'},
    {id: 3, label: 'Server 3', region: 'All Countries', flag: '🌍'},
    {id: 4, label: 'Server 4', region: 'All Countries', flag: '🌍'},
  ],
  country: {flag: '🇺🇸', label: 'United States'},
  service: '009ibbq',
  cost: 1185,
  // The OTP that "arrives" after purchase (demo).
  otp: {sender: 'AsapNumbers', code: '4471', message: 'is your verification code'},
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// VOICE-OVER SCRIPT + CAPTIONS
// tokens: {t: word/phrase, hl?: highlight} — the subtitle bar reveals them
// progressively and pops the highlighted ones in the brand accent.
// ─────────────────────────────────────────────────────────────────────────────
type Token = {t: string; hl?: boolean};
export type SceneScript = {
  id: string;
  built: boolean;
  seconds: number;
  vo: string; // full narration for ElevenLabs
  caption: Token[]; // word-synced on-screen subtitle
};

export const SCRIPT: SceneScript[] = [
  {
    id: 'logo',
    built: true,
    seconds: 4,
    vo: 'Welcome to AsapNumbers — your all-in-one platform for virtual numbers, digital services, and seamless online payments.',
    caption: [
      {t: 'Welcome to'},
      {t: 'AsapNumbers', hl: true},
      {t: '—'},
      {t: 'virtual numbers,', hl: true},
      {t: 'digital services'},
      {t: '&'},
      {t: 'payments', hl: true},
    ],
  },
  {
    id: 'dashboard',
    built: true,
    seconds: 7,
    vo: 'Your dashboard gives you instant access to every feature from one central location — your wallet, virtual numbers, utilities, and quick actions.',
    caption: [
      {t: 'One'},
      {t: 'dashboard', hl: true},
      {t: 'for'},
      {t: 'everything —'},
      {t: 'your'},
      {t: 'wallet,', hl: true},
      {t: 'numbers'},
      {t: '&'},
      {t: 'quick actions', hl: true},
    ],
  },
  {
    id: 'fund',
    built: true,
    seconds: 7,
    vo: 'Funding your wallet is effortless. A unique virtual account is generated instantly, so you can transfer directly from your bank and get credited within seconds.',
    caption: [
      {t: 'Funding is'},
      {t: 'effortless.', hl: true},
      {t: 'A unique'},
      {t: 'virtual account', hl: true},
      {t: 'is generated'},
      {t: 'instantly —'},
      {t: 'credited in'},
      {t: 'seconds', hl: true},
    ],
  },
  {
    id: 'numbers',
    built: true,
    seconds: 8,
    vo: 'Choose your server, country, and service, then generate a virtual number within seconds — and receive your verification codes instantly.',
    caption: [
      {t: 'Pick a'},
      {t: 'server,', hl: true},
      {t: 'country'},
      {t: '&'},
      {t: 'service,'},
      {t: 'generate a'},
      {t: 'virtual number', hl: true},
      {t: '&'},
      {t: 'receive'},
      {t: 'your OTP', hl: true},
    ],
  },

  // ── Remaining storyboard scenes — VO ready, UI built in the next pass. ──
  {
    id: 'homepage',
    built: false,
    seconds: 6,
    vo: 'Whether you need virtual numbers, airtime, data, or utility payments, AsapNumbers brings everything together in one secure platform.',
    caption: [{t: 'Everything'}, {t: 'in one'}, {t: 'secure platform', hl: true}],
  },
  {
    id: 'createAccount',
    built: false,
    seconds: 6,
    vo: "Getting started is simple. Fill in your details, create your account, and you're ready to go in just a few moments.",
    caption: [{t: 'Create your'}, {t: 'account', hl: true}, {t: 'in moments'}],
  },
  {
    id: 'login',
    built: false,
    seconds: 5,
    vo: 'Once registered, simply sign in to access your personalized dashboard.',
    caption: [{t: 'Sign in'}, {t: 'to your'}, {t: 'dashboard', hl: true}],
  },
  {
    id: 'utilities',
    built: false,
    seconds: 7,
    vo: 'Need everyday digital services? Buy airtime, mobile data, electricity tokens, cable subscriptions, and more — all from the same platform.',
    caption: [{t: 'Airtime,'}, {t: 'data,', hl: true}, {t: 'electricity'}, {t: '&'}, {t: 'more', hl: true}],
  },
  {
    id: 'purchase',
    built: false,
    seconds: 6,
    vo: 'Complete your purchase in just a few taps, with fast, secure, and reliable processing.',
    caption: [{t: 'A few taps —'}, {t: 'fast', hl: true}, {t: '&'}, {t: 'secure', hl: true}],
  },
  {
    id: 'outro',
    built: false,
    seconds: 6,
    vo: 'From account verification to everyday digital services, AsapNumbers makes every transaction simple, secure, and reliable.',
    caption: [{t: 'Fast.', hl: true}, {t: 'Secure.', hl: true}, {t: 'Reliable.', hl: true}],
  },
];

/** Just the scenes built in this pass, in order. */
export const BUILT_SCRIPT = SCRIPT.filter((s) => s.built);
