/**
 * content.ts — ALL copy, the voice-over script, and the product data pulled
 * from the AsapNumbers screenshots. Edit here to re-script the film.
 *
 * `built: true` marks scenes implemented and sequenced. The film order is the
 * order of BUILT_SCRIPT (narrative order below).
 */

export const brand = {
  name: 'AsapNumbers',
  wordmark: {first: 'ASAP', second: 'NUMBERS'},
  url: 'numberasap.com',
  urlFull: 'www.numberasap.com',
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

/** Homepage / hero. No marketing-page screenshot existed, so this copy is
 *  placeholder in the product's direction — TODO(brand): confirm against site. */
export const homepage = {
  headline: ['Every number.', 'Every service.', 'One platform.'],
  sub: 'Virtual numbers, OTP verification, airtime, data, eSIMs and bill payments — all in one secure wallet.',
  ctaPrimary: 'Get Started',
  ctaSecondary: 'Sign In',
  features: [
    {id: 'numbers', title: 'Virtual Numbers', sub: 'SMS & OTP verification', icon: 'phone'},
    {id: 'airtime', title: 'Airtime & Data', sub: 'Top up any network', icon: 'bolt'},
    {id: 'utilities', title: 'Utility Payments', sub: 'Electricity, cable & more', icon: 'card'},
    {id: 'esim', title: 'eSIM', sub: 'Global connectivity', icon: 'sim'},
  ],
} as const;

/** Create Account — the 3-step wizard from the screenshot. */
export const createAccount = {
  steps: [
    {id: 'personal', label: 'Personal', icon: 'user'},
    {id: 'contact', label: 'Contact', icon: 'mail'},
    {id: 'security', label: 'Security', icon: 'lock'},
  ],
  heading: 'Personal Information',
  subheading: 'Tell us about yourself',
  fields: [
    {label: 'First Name', value: 'John', icon: 'user'},
    {label: 'Last Name', value: 'Smith', icon: 'user'},
    {label: 'Username', value: 'johnsmith123', icon: 'user', prefix: '@'},
  ],
  cta: 'Next ›',
} as const;

/** Login. No screenshot — consistent with the auth style (cyan). */
export const login = {
  heading: 'Welcome back',
  subheading: 'Sign in to your dashboard',
  email: account.email,
  password: '••••••••••',
  cta: 'Sign In',
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
  otp: {sender: 'AsapNumbers', code: '4471', message: 'is your verification code'},
} as const;

/** Closing outro / CTA. */
export const outro = {
  words: ['Fast.', 'Secure.', 'Reliable.'],
  cta: 'Visit us at',
  url: brand.urlFull,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// VOICE-OVER SCRIPT + CAPTIONS  (narrative order = film order)
// ─────────────────────────────────────────────────────────────────────────────
type Token = {t: string; hl?: boolean};
export type SceneScript = {
  id: string;
  built: boolean;
  seconds: number;
  vo: string;
  caption: Token[];
};

export const SCRIPT: SceneScript[] = [
  {
    id: 'logo',
    built: true,
    seconds: 4,
    vo: 'Welcome to AsapNumbers — your all-in-one platform for virtual numbers, digital services, and seamless online payments.',
    caption: [
      {t: 'Welcome to'}, {t: 'AsapNumbers', hl: true}, {t: '—'},
      {t: 'virtual numbers,', hl: true}, {t: 'digital services'}, {t: '&'}, {t: 'payments', hl: true},
    ],
  },
  {
    id: 'homepage',
    built: true,
    seconds: 6,
    vo: 'Whether you need virtual numbers, airtime, data, or utility payments, AsapNumbers brings everything together in one secure platform.',
    caption: [
      {t: 'Numbers,'}, {t: 'airtime,', hl: true}, {t: 'data'}, {t: '&'}, {t: 'bills —'},
      {t: 'one'}, {t: 'secure platform', hl: true},
    ],
  },
  {
    id: 'createAccount',
    built: true,
    seconds: 8,
    vo: "Getting started is simple. Fill in your details, create your account, and you're ready to go in just a few moments.",
    caption: [
      {t: 'Getting started'}, {t: 'is'}, {t: 'simple —', hl: true},
      {t: 'fill in your details'}, {t: '&'}, {t: 'create your'}, {t: 'account', hl: true},
    ],
  },
  {
    id: 'login',
    built: true,
    seconds: 5,
    vo: 'Once registered, simply sign in to access your personalized dashboard.',
    caption: [{t: 'Sign in'}, {t: 'to access'}, {t: 'your'}, {t: 'dashboard', hl: true}],
  },
  {
    id: 'dashboard',
    built: true,
    seconds: 7,
    vo: 'Your dashboard gives you instant access to every feature from one central location — your wallet, virtual numbers, utilities, and quick actions.',
    caption: [
      {t: 'One'}, {t: 'dashboard', hl: true}, {t: 'for'}, {t: 'everything —'},
      {t: 'your'}, {t: 'wallet,', hl: true}, {t: 'numbers'}, {t: '&'}, {t: 'quick actions', hl: true},
    ],
  },
  {
    id: 'fund',
    built: true,
    seconds: 7,
    vo: 'Funding your wallet is effortless. A unique virtual account is generated instantly, so you can transfer directly from your bank and get credited within seconds.',
    caption: [
      {t: 'Funding is'}, {t: 'effortless.', hl: true}, {t: 'A unique'}, {t: 'virtual account', hl: true},
      {t: 'is generated'}, {t: 'instantly —'}, {t: 'credited in'}, {t: 'seconds', hl: true},
    ],
  },
  {
    id: 'numbers',
    built: true,
    seconds: 8,
    vo: 'Choose your server, country, and service, then generate a virtual number within seconds — and receive your verification codes instantly.',
    caption: [
      {t: 'Pick a'}, {t: 'server,', hl: true}, {t: 'country'}, {t: '&'}, {t: 'service,'},
      {t: 'generate a'}, {t: 'virtual number', hl: true}, {t: '&'}, {t: 'receive'}, {t: 'your OTP', hl: true},
    ],
  },

  // ── Not yet built (VO ready): Utilities & Purchase flow ──
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

  // ── Closing outro (built) ──
  {
    id: 'outro',
    built: true,
    seconds: 6,
    vo: 'From account verification to everyday digital services, AsapNumbers makes every transaction simple, secure, and reliable. Get started today at www dot number asap dot com.',
    caption: [
      {t: 'Fast.', hl: true}, {t: 'Secure.', hl: true}, {t: 'Reliable.', hl: true},
      {t: 'Visit'}, {t: 'www.numberasap.com', hl: true},
    ],
  },
];

/** Scenes built, in film order. */
export const BUILT_SCRIPT = SCRIPT.filter((s) => s.built);
