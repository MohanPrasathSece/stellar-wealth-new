import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Github,
  Twitter,
  Wallet,
  Shield,
  Repeat,
  Image as ImageIcon,
  Sparkles,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ctrl — The Secure Way to Web3" },
      {
        name: "description",
        content:
          "One wallet for 1,800+ chains. Capture every opportunity on every chain with Ctrl — the secure way to Web3.",
      },
      { property: "og:title", content: "Ctrl — The Secure Way to Web3" },
      {
        property: "og:description",
        content: "One wallet for 1,800+ chains. Capture every opportunity on every chain.",
      },
    ],
  }),
  component: Index,
});

/* ---------------- Reusable motion ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.08 },
  }),
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Page ---------------- */
function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
      />

      <Nav />
      <Hero />
      <FeatureCards />
      <ChainShowcase />
      <Opportunity />
      <Trust />
      <Security />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 inset-x-0 z-40 px-4"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between rounded-full border border-border bg-background/70 backdrop-blur-xl px-4 py-2">
        <a href="#" className="flex items-center gap-2 font-bold text-lg">
          <LogoMark />
          <span>Ctrl</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#chains" className="hover:text-foreground transition">Chains</a>
          <a href="#security" className="hover:text-foreground transition">Security</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <a href="#cta" className="btn-ghost text-sm py-2 px-4">Download</a>
      </div>
    </motion.header>
  );
}

function LogoMark() {
  return (
    <span className="grid place-items-center w-7 h-7 rounded-md bg-ink text-white text-xs font-black">
      ✕
    </span>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} className="relative pt-40 pb-24 px-4 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* grid bg */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,oklch(0.92_0_0/0.5)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0_0/0.5)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="chip mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        Now supporting 1,800+ chains
      </motion.div>

      <h1 className="text-display text-[14vw] md:text-[8.5rem] leading-[0.9] max-w-5xl">
        {["Take", "Ctrl."].map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-4 last:mr-0 align-bottom">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {word === "Ctrl." ? (
                <>
                  <span className="inline-grid place-items-center w-[0.9em] h-[0.9em] rounded-2xl bg-ink text-primary align-middle mr-2 text-[0.7em] font-black">
                    ✕
                  </span>
                  Ctrl.
                </>
              ) : (
                word
              )}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-8 max-w-xl text-lg text-muted-foreground"
      >
        One wallet for everything Web3. Capture every opportunity across 1,800+ chains —
        securely, instantly, beautifully.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
        className="mt-8 flex flex-wrap gap-3 justify-center"
      >
        <a href="#cta" className="btn-primary">Get Ctrl <ArrowRight className="w-4 h-4" /></a>
        <a href="#features" className="btn-ghost">Explore features</a>
      </motion.div>

      {/* floating tokens row */}
      <motion.div style={{ y }} className="mt-20 relative w-full max-w-3xl h-44">
        <FloatingTokens />
      </motion.div>
    </section>
  );
}

function FloatingTokens() {
  const tokens = [
    { c: "var(--color-lemon)", e: "◎", x: "10%", d: 0 },
    { c: "var(--color-blush)", e: "◆", x: "28%", d: 0.4 },
    { c: "var(--color-mint)", e: "●", x: "46%", d: 0.8 },
    { c: "var(--color-sky)", e: "▲", x: "62%", d: 1.2 },
    { c: "var(--color-primary)", e: "✕", x: "78%", d: 1.6 },
  ];
  return (
    <>
      {tokens.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -14, 0],
            rotate: [0, 6, -3, 0],
          }}
          transition={{
            opacity: { delay: 1.3 + i * 0.1, duration: 0.6 },
            scale: { delay: 1.3 + i * 0.1, duration: 0.6 },
            y: { repeat: Infinity, duration: 6 + i, delay: t.d, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 8 + i, delay: t.d, ease: "easeInOut" },
          }}
          style={{ left: t.x, background: t.c }}
          className="absolute top-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl grid place-items-center text-3xl font-black text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] border border-white/60"
        >
          {t.e}
        </motion.div>
      ))}
    </>
  );
}

/* ---------------- Feature Cards (colored chat-style cards from ref) ---------------- */
function FeatureCards() {
  const rows = [
    [
      { c: "var(--color-sky)", title: "Is the price of $BTC up today?", kind: "chat" },
      { c: "var(--color-card)", title: "Portfolio +12.4%", kind: "chart" },
      { c: "var(--color-mint)", title: "Yes — your model says strong buy.", kind: "chat" },
    ],
    [
      { c: "var(--color-lemon)", title: "Focus on opportunities, not noise.", kind: "chat" },
      { c: "var(--color-card)", title: "Sent 1.42 ETH", kind: "chart" },
      { c: "var(--color-blush)", title: "Designed for the bold modern trader.", kind: "chat" },
    ],
    [
      { c: "var(--color-lemon)", title: "Growing.", kind: "chat" },
      { c: "var(--color-card)", title: "Watchlist", kind: "list" },
      { c: "var(--color-blush)", title: "I'll keep an eye on your top picks.", kind: "chat" },
    ],
  ];

  return (
    <section id="features" className="px-4 py-24">
      <div className="mx-auto max-w-6xl space-y-4">
        {rows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {row.map((card, ci) => (
              <Reveal key={ci} delay={ci}>
                <motion.div
                  whileHover={{ y: -8, rotateX: 3 }}
                  style={{ background: card.c, perspective: 1200 }}
                  className="rounded-3xl p-6 h-44 md:h-48 flex flex-col justify-between border border-border/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]"
                >
                  {card.kind === "chart" ? (
                    <MiniChart label={card.title} />
                  ) : card.kind === "list" ? (
                    <MiniList />
                  ) : (
                    <div>
                      <div className="text-xs text-ink/60 mb-2 font-semibold">Ctrl ✕</div>
                      <p className="text-lg font-bold text-ink leading-tight">{card.title}</p>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <ArrowUpRight className="w-4 h-4 text-ink/60" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniChart({ label }: { label: string }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-ink/60">
        <span className="font-semibold">{label}</span>
        <span className="text-primary font-bold">+12.4%</span>
      </div>
      <svg viewBox="0 0 200 70" className="w-full mt-3">
        <motion.path
          d="M0,50 C30,45 50,55 70,40 C100,25 120,35 150,20 C170,10 185,15 200,5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-ink"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function MiniList() {
  const items = ["BTC", "ETH", "SOL", "ARB"];
  return (
    <div className="space-y-1.5">
      <div className="text-xs text-ink/60 font-semibold">Watchlist</div>
      {items.map((i) => (
        <div key={i} className="flex items-center justify-between text-sm font-semibold text-ink">
          <span>{i}</span>
          <span className="text-primary text-xs">▲</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Chain Showcase ---------------- */
function ChainShowcase() {
  const chains = ["Origin", "Solana", "Arbitrum", "Base", "Optimism", "Avalanche", "Bitcoin", "THORChain", "Polygon"];
  return (
    <section id="chains" className="px-4 py-24">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Counter />
          <p className="mt-4 text-muted-foreground max-w-sm">
            All your assets, every network, in a single self-custody wallet.
          </p>
        </Reveal>
        <div className="space-y-2">
          {chains.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border w-fit ml-auto"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-semibold">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter() {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  return (
    <motion.div
      onViewportEnter={() => {
        const start = performance.now();
        const dur = 1800;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * 1800));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: true }}
    >
      <h2 className="text-display text-6xl md:text-7xl">
        <span ref={ref}>{val.toLocaleString()}+</span> chains.
        <br />
        <span className="text-muted-foreground">One wallet.</span>
      </h2>
    </motion.div>
  );
}

/* ---------------- Opportunity ---------------- */
function Opportunity() {
  const cards = [
    { icon: Wallet, title: "10M+ assets at your fingertips", body: "Trade, stake and swap any token across any chain — instantly." },
    { icon: Repeat, title: "Connect to every application", body: "Native dApp browser with WalletConnect on every chain." },
    { icon: ImageIcon, title: "One home for all your NFTs", body: "View, send and showcase collections across networks." },
  ];
  return (
    <section className="px-4 py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center mb-16">
            <div className="chip mb-6"><Sparkles className="w-3 h-3" /> Take Ctrl</div>
            <h2 className="text-display text-5xl md:text-7xl">
              Capture every opportunity{" "}
              <span className="inline-grid place-items-center w-[0.8em] h-[0.5em] rounded-full bg-primary align-middle mx-2" />
              <br className="hidden md:block" />
              on every chain.
            </h2>
          </div>
        </Reveal>
        <div className="space-y-6">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-card border border-border p-8 md:p-10 flex items-center gap-8"
              >
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">{c.title}</h3>
                  <p className="mt-3 text-muted-foreground max-w-md">{c.body}</p>
                </div>
                <div className="hidden md:grid place-items-center w-24 h-24 rounded-2xl bg-surface border border-border shrink-0">
                  <c.icon className="w-10 h-10 text-ink" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust / stats ---------------- */
function Trust() {
  const items = [
    { c: "var(--color-blush)", k: "Trusted by 100k+ Devs", v: "Building on Ctrl daily." },
    { c: "var(--color-sky)", k: "4.9-star rated", v: "Across iOS and Android." },
    { c: "var(--color-lemon)", k: "24/7 in-app support", v: "Real humans, real fast." },
  ];
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="chip mb-6"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Take ✕</div>
          <h2 className="text-display text-4xl md:text-6xl mb-12">
            Join the 230,000 people who trust Ctrl.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i}>
              <div style={{ background: it.c }} className="rounded-3xl p-8 text-left border border-border/60 h-56 flex flex-col justify-between">
                <p className="text-lg font-bold text-ink leading-tight">{it.k}</p>
                <p className="text-sm text-ink/70">{it.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Security ---------------- */
function Security() {
  const words = "The Secure way to Web3".split(" ");
  return (
    <section id="security" className="px-4 py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center text-sm text-muted-foreground mb-4">Connect with confidence</div>
        </Reveal>
        <h2 className="text-display text-5xl md:text-7xl text-center mb-16 flex flex-wrap justify-center gap-x-4">
          {words.map((w, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {w === "Web3" ? (
                  <>
                    <span className="inline-grid place-items-center w-[0.7em] h-[0.7em] rounded-full bg-ink text-primary align-middle mr-2 text-[0.5em]">
                      <Shield className="w-[0.4em] h-[0.4em]" />
                    </span>
                    {w}
                  </>
                ) : (
                  w
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Multi-sig protection", "Hardware wallet support", "Open source audits", "End-to-end encryption"].map(
            (t, i) => (
              <Reveal key={t} delay={i}>
                <div className="rounded-2xl bg-card border border-border p-5 h-36 flex flex-col justify-between">
                  <Shield className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold leading-tight">{t}</p>
                </div>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    { q: "What is Ctrl Wallet?", a: "Ctrl is a self-custody Web3 wallet that lets you manage assets across 1,800+ chains in a single beautifully designed app." },
    { q: "Is Ctrl free to use?", a: "Yes, Ctrl is completely free to download and use. Standard network fees apply for on-chain transactions." },
    { q: "Which chains are supported?", a: "EVM chains, Solana, Bitcoin, Cosmos, THORChain and more than 1,800 networks in total." },
    { q: "Is my wallet secure?", a: "Keys never leave your device. We support hardware wallets, biometrics, and open-source audited code." },
    { q: "Can I import an existing wallet?", a: "Yes — import via seed phrase, private key, or hardware wallet in seconds." },
    { q: "Does Ctrl support NFTs?", a: "Of course. View, send and showcase NFTs across every supported network." },
    { q: "Where can I download Ctrl?", a: "Ctrl is available on iOS, Android, and as a browser extension." },
  ];
  return (
    <section id="faq" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center text-sm text-muted-foreground mb-3">Answers on Ctrl</div>
          <h2 className="text-display text-5xl md:text-6xl text-center mb-12">FAQ</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="rounded-2xl bg-card border border-border overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-semibold">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
          <Plus className="w-5 h-5 text-muted-foreground" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-muted-foreground">{a}</p>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section id="cta" className="px-4 py-32 text-center relative overflow-hidden">
      <div className="absolute inset-x-0 -top-20 mx-auto h-80 w-80 rounded-full bg-primary/40 blur-[120px] -z-10" />
      <Reveal>
        <div className="chip mb-6"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Get Ctrl free</div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="text-display text-7xl md:text-[10rem]">Level up.</h2>
      </Reveal>
      <Reveal delay={2}>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <a href="#" className="btn-primary">Download Ctrl <ArrowRight className="w-4 h-4" /></a>
          <a href="#" className="btn-ghost">Browser extension</a>
        </div>
      </Reveal>
      <Reveal delay={3}>
        <div className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="w-4 h-4 text-primary" /> Self-custody · No email required
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 text-white font-bold text-2xl">
              <span className="grid place-items-center w-8 h-8 rounded-md bg-primary text-ink text-sm font-black">✕</span>
              Ctrl
            </div>
            <p className="mt-4 text-sm text-white/60">
              The secure way to Web3. One wallet for 1,800+ chains.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="grid place-items-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="grid place-items-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            {[
              { t: "Product", i: ["Wallet", "Extension", "Mobile", "Swap"] },
              { t: "Company", i: ["About", "Blog", "Careers", "Press"] },
              { t: "Legal", i: ["Terms", "Privacy", "Security", "Contact"] },
            ].map((col) => (
              <div key={col.t}>
                <div className="text-white font-semibold mb-3">{col.t}</div>
                <ul className="space-y-2 text-white/60">
                  {col.i.map((l) => (
                    <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-white/50 gap-2">
          <span>© {new Date().getFullYear()} Ctrl. All rights reserved.</span>
          <span>Built for Web3 natives.</span>
        </div>
      </div>
    </footer>
  );
}
