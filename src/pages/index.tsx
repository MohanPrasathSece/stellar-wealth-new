
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

import { AuthModals } from "../components/landing/AuthModals";
import { ContactSection } from "../components/landing/ContactSection";
import { useAuth } from "../context/AuthContext";



/* ---------------- Reusable motion ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.08 },
  }),
};

export function Reveal({
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

export default function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
      />

      <AuthModals />
      <Nav />
      <Hero />
      <AboutCompany />
      <OurValues />
      <PerformanceStats />
      <ContactSection />
      <Footer />
    </div>
  );
}

/* ---------------- Nav ---------------- */
export function Nav({ isLoggedInPage = false }: { isLoggedInPage?: boolean }) {
  const { setLoginOpen, setSignupOpen, isAuthenticated, user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 inset-x-0 z-40 px-4"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between rounded-full border border-border bg-background/70 backdrop-blur-xl px-4 py-2">
        <a href="/" className="flex items-center gap-2 font-bold text-lg">
          <LogoMark />
          <span>Stellar Wealth</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground font-semibold uppercase tracking-wider">
          {isLoggedInPage ? (
            <>
              <a href="/loggedin" className="hover:text-foreground transition">Dashboard</a>
              <a href="#strategies" className="hover:text-foreground transition">Strategies</a>
              <a href="#insights" className="hover:text-foreground transition">Insights</a>
              <a href="#contact" className="hover:text-foreground transition">Contact</a>
            </>
          ) : (
            <>
              <a href="#about" className="hover:text-foreground transition">About</a>
              <a href="#values" className="hover:text-foreground transition">Values</a>
              <a href="#performance" className="hover:text-foreground transition">Performance</a>
              <a href="#contact" className="hover:text-foreground transition">Contact</a>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
             <div className="flex items-center gap-4">
                <a href="/loggedin" className="text-sm font-semibold hover:text-primary transition">{user?.name || user?.email}</a>
                <button onClick={logout} className="btn-ghost text-sm py-2 px-4 rounded-full">Log out</button>
             </div>
          ) : (
            <>
              <button onClick={() => setLoginOpen(true)} className="text-sm py-2 px-4 hover:text-foreground font-semibold">Login</button>
              <button onClick={() => setSignupOpen(true)} className="bg-primary text-primary-foreground text-sm py-2 px-4 rounded-full font-semibold hover:bg-primary/90 transition">Sign up</button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export function LogoMark() {
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
        Institutional-grade digital asset management
      </motion.div>

      <h1 className="text-display text-[14vw] md:text-[8.5rem] leading-[0.9] max-w-5xl">
        {["Build", "Wealth."].map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-4 last:mr-0 align-bottom">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {word === "Wealth." ? (
                <>
                  <span className="inline-grid place-items-center w-[0.9em] h-[0.9em] rounded-2xl bg-ink text-primary align-middle mr-2 text-[0.7em] font-black">
                    ✕
                  </span>
                  Wealth.
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
        The premier investment partner for digital assets. Capture every market opportunity —
        securely, seamlessly, profitably.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
        className="mt-8 flex flex-wrap gap-3 justify-center"
      >
        <a href="#contact" className="btn-primary">Start Investing <ArrowRight className="w-4 h-4" /></a>
        <a href="#performance" className="btn-ghost">View Performance</a>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0">
        <TickerTape />
      </div>
    </section>
  );
}

/* ---------------- Ticker Tape ---------------- */
export function TickerTape() {
  const coins = [
    { s: "BTC", p: "$85,240.50", c: "+2.4%" },
    { s: "ETH", p: "$4,250.00", c: "+1.8%" },
    { s: "SOL", p: "$145.20", c: "+5.2%" },
    { s: "LINK", p: "$18.40", c: "+0.5%" },
    { s: "AVAX", p: "$35.10", c: "-1.2%" },
    { s: "BTC", p: "$85,240.50", c: "+2.4%" },
    { s: "ETH", p: "$4,250.00", c: "+1.8%" },
    { s: "SOL", p: "$145.20", c: "+5.2%" },
  ];

  return (
    <div className="w-full overflow-hidden bg-ink py-3 border-t-4 border-primary border-b-4">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex whitespace-nowrap"
      >
        <div className="flex gap-16 px-8">
          {coins.map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-background font-bold font-mono">
              <span className="text-primary">{c.s}</span>
              <span>{c.p}</span>
              <span className={c.c.startsWith("+") ? "text-primary" : "text-destructive"}>{c.c}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-16 px-8">
          {coins.map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-background font-bold font-mono">
              <span className="text-primary">{c.s}</span>
              <span>{c.p}</span>
              <span className={c.c.startsWith("+") ? "text-primary" : "text-destructive"}>{c.c}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}


/* ---------------- About Company ---------------- */
export function AboutCompany() {
  return (
    <section id="about" className="px-4 py-32 border-y-[6px] border-ink bg-background">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-start">
        <Reveal>
          <h2 className="text-display text-5xl md:text-7xl font-black uppercase text-ink leading-[0.9]">
            We build <br /> the future <br /> of wealth.
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="space-y-8">
            <p className="text-xl md:text-2xl font-bold text-ink leading-snug">
              Stellar Wealth is a vanguard institutional crypto asset manager, bridging traditional finance rigor with decentralized opportunities.
            </p>
            <p className="text-lg text-ink font-medium">
              Founded on the belief that digital assets represent the most significant paradigm shift in modern finance, we provide sophisticated investors with secure, data-driven exposure to the crypto ecosystem. Our proprietary quantitative models and deep liquidity access ensure unparalleled execution and growth.
            </p>
            <div className="pt-8 border-t-4 border-ink grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-black text-primary drop-shadow-[2px_2px_0_var(--color-ink)]">$2B+</div>
                <div className="font-bold text-ink mt-2 uppercase text-sm">Assets Managed</div>
              </div>
              <div>
                <div className="text-4xl font-black text-primary drop-shadow-[2px_2px_0_var(--color-ink)]">38</div>
                <div className="font-bold text-ink mt-2 uppercase text-sm">Jurisdictions</div>
              </div>
            </div>
          </div>
        </Reveal>
        
        {/* Animated Chart Decoration */}
        <Reveal delay={1.5} className="hidden md:block">
          <div className="w-full aspect-square border-4 border-ink bg-background shadow-[12px_12px_0px_0px_var(--color-ink)] p-8 relative overflow-hidden flex flex-col justify-between group">
            <div className="flex justify-between items-center text-ink font-bold uppercase border-b-2 border-ink pb-4">
              <span>Quantitative Alpha</span>
              <span className="bg-primary px-2 py-1 border-2 border-ink text-sm">Live</span>
            </div>
            
            <svg viewBox="0 0 200 100" className="w-full h-full mt-8 overflow-visible">
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 0 80 Q 20 60, 40 70 T 80 50 T 120 30 T 160 40 T 200 10 L 200 100 L 0 100 Z"
                fill="url(#chart-grad)"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M 0 80 Q 20 60, 40 70 T 80 50 T 120 30 T 160 40 T 200 10"
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              />
              
              {/* Pulsing Dot */}
              <motion.circle
                cx="200" cy="10" r="4"
                fill="var(--color-primary)"
                stroke="var(--color-ink)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2 }}
              />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Performance Stats ---------------- */
export function PerformanceStats() {
  const stats = [
    { label: "YTD Returns", value: "+24.8%", desc: "Outperforming standard benchmarks." },
    { label: "Active Investors", value: "12,000+", desc: "Institutional and high-net-worth." },
    { label: "Trading Volume", value: "$5B+", desc: "Monthly execution volume." },
    { label: "Uptime", value: "99.99%", desc: "Enterprise-grade infrastructure." },
  ];
  return (
    <section id="performance" className="px-4 py-32 bg-background border-t-[6px] border-ink">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-display text-5xl md:text-7xl font-black text-ink mb-16 uppercase">
            By The Numbers
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i}>
              <div className="border-4 border-ink p-6 h-full shadow-[6px_6px_0px_0px_var(--color-ink)] transition-transform hover:-translate-y-2">
                <div className="text-4xl md:text-5xl font-black text-primary drop-shadow-[2px_2px_0_var(--color-ink)] mb-4">{s.value}</div>
                <h3 className="font-bold text-ink uppercase text-sm tracking-wider mb-2">{s.label}</h3>
                <p className="text-sm font-medium text-ink/70">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Our Values ---------------- */
export function OurValues() {
  const values = [
    { title: "Absolute Transparency", body: "No hidden fees, no opaque strategies. We provide real-time reporting and verifiable proof of reserves." },
    { title: "Fort Knox Security", body: "Our institutional-grade custody solutions combine MPC technology with offline air-gapped cold storage." },
    { title: "Alpha Generation", body: "We don't just hold. We deploy advanced yield-generation strategies to outpace market benchmarks consistently." },
  ];
  return (
    <section id="values" className="px-4 py-32 bg-primary">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-display text-5xl md:text-7xl font-black text-ink mb-16 uppercase text-center md:text-left">
            Core Principles
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <Reveal key={i} delay={i}>
              <div className="border-4 border-ink bg-background p-8 h-full shadow-[8px_8px_0px_0px_var(--color-ink)] flex flex-col justify-between transition-transform hover:-translate-y-2">
                <div>
                  <div className="text-6xl font-black text-primary mb-6 drop-shadow-[3px_3px_0_var(--color-ink)]">
                    0{i + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-ink mb-4 uppercase">{v.title}</h3>
                  <p className="text-ink font-medium leading-relaxed">{v.body}</p>
                </div>
              </div>
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
export function Security() {
  const words = "The Secure way to Invest".split(" ");
  return (
    <section id="security" className="px-4 py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center text-sm text-muted-foreground mb-4">Invest with absolute confidence</div>
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
          {["Multi-sig institutional custody", "Cold storage infrastructure", "SOC 2 Type II Audited", "Comprehensive insurance"].map(
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
export function Footer() {
  return (
    <footer className="bg-ink text-background mt-16 border-t-8 border-primary">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 text-primary font-black text-2xl uppercase tracking-tighter">
              <span className="grid place-items-center w-8 h-8 bg-primary text-ink text-sm">✕</span>
              Stellar Wealth
            </div>
            <p className="mt-4 text-sm font-medium text-background/70 leading-relaxed">
              Institutional-grade crypto investment and wealth management. Secure your financial future with precision.
            </p>
          </div>
          <div className="flex gap-16 text-sm font-semibold uppercase tracking-wider">
            <div>
              <div className="text-primary mb-4">Company</div>
              <ul className="space-y-3 text-background/70">
                <li><a href="#about" className="hover:text-primary transition">About Us</a></li>
                <li><a href="#performance" className="hover:text-primary transition">Performance</a></li>
                <li><a href="#contact" className="hover:text-primary transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="text-primary mb-4">Legal</div>
              <ul className="space-y-3 text-background/70">
                <li><a href="/terms" className="hover:text-primary transition">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-primary transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t-4 border-primary/20 flex flex-col md:flex-row justify-between text-xs font-bold text-background/50 uppercase tracking-widest gap-4">
          <span>© {new Date().getFullYear()} Stellar Wealth.</span>
          <span>Built for the future.</span>
        </div>
      </div>
    </footer>
  );
}
