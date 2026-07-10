import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Nav, Footer, Reveal, TickerTape } from "./index";
import { motion } from "framer-motion";
import { ArrowRight, Activity, TrendingUp, Shield, Sparkles } from "lucide-react";
import { ContactSection } from "../components/landing/ContactSection";



export default function LoggedIn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("revelle_user");
    if (!storedUser) {
      navigate("/");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav isLoggedInPage={true} />
      <LoggedInHero user={user} />
      <ActiveStrategies />
      <MarketInsights />
      <ContactSection />
      <Footer />
    </div>
  );
}

/* ---------------- Sections ---------------- */

function LoggedInHero({ user }: { user: any }) {
  return (
    <section className="relative pt-40 pb-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,oklch(0_0_0/0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0_0_0/0.1)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <Reveal>
        <div className="w-24 h-24 rounded-none bg-primary/20 flex items-center justify-center mx-auto mb-8 border-4 border-ink shadow-[8px_8px_0px_0px_var(--color-ink)]">
          <span className="text-4xl font-black text-primary drop-shadow-[2px_2px_0_var(--color-ink)]">
            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
          </span>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <h1 className="text-display text-5xl md:text-8xl max-w-5xl mx-auto leading-tight mb-4 uppercase font-black">
          Welcome back, <br className="md:hidden" />
          <span className="text-primary drop-shadow-[4px_4px_0_var(--color-ink)]">{user?.name || user?.email?.split('@')[0]}</span>.
        </h1>
      </Reveal>
      
      <Reveal delay={2}>
        <p className="mt-8 max-w-2xl text-xl font-bold text-ink/70 mx-auto">
          Your portfolio is primed. Capture the next big opportunity with our institutional-grade strategies.
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <a href="#strategies" className="btn-primary">
            Explore Strategies <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Reveal>

      <div className="absolute bottom-0 inset-x-0">
        <TickerTape />
      </div>
    </section>
  );
}

function ActiveStrategies() {
  const strategies = [
    { icon: Activity, title: "Algorithmic Trading", body: "High-frequency models capturing micro-trends across deep liquidity pools." },
    { icon: TrendingUp, title: "Yield Farming", body: "Automated LP positions providing consistent risk-adjusted returns." },
    { icon: Shield, title: "Delta Neutral", body: "Market-agnostic strategies designed to preserve capital in high volatility." },
  ];

  return (
    <section id="strategies" className="px-4 py-32 bg-primary border-y-8 border-ink">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-display text-5xl md:text-7xl font-black text-ink uppercase">
              Active Strategies
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {strategies.map((s, i) => (
            <Reveal key={i} delay={i}>
              <div className="bg-background border-4 border-ink p-8 h-full shadow-[8px_8px_0px_0px_var(--color-ink)] transition-transform hover:-translate-y-2 group flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 border-4 border-ink bg-primary flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_var(--color-ink)] group-hover:scale-110 transition-transform">
                    <s.icon className="w-8 h-8 text-ink" />
                  </div>
                  <h3 className="text-2xl font-black text-ink mb-4 uppercase">{s.title}</h3>
                  <p className="text-ink font-bold leading-relaxed">{s.body}</p>
                </div>
                <div className="mt-8 pt-6 border-t-4 border-ink flex justify-between items-center text-sm font-black uppercase">
                  <span>Status</span>
                  <span className="text-primary bg-ink px-3 py-1">Active</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketInsights() {
  return (
    <section id="insights" className="px-4 py-32 bg-background">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <h2 className="text-display text-5xl md:text-7xl font-black uppercase text-ink leading-[0.9] mb-8">
            Market <br /> Insights.
          </h2>
          <p className="text-xl font-bold text-ink/70 leading-relaxed mb-8">
            Our models process billions of data points daily. Stay ahead of the curve with real-time analytics and predictive charting.
          </p>
          <button onClick={() => { import("sonner").then(m => m.toast.success("Report generation started. We'll notify you when it's ready.")); }} className="btn-primary">View Full Report</button>
        </Reveal>

        <Reveal delay={1}>
          <div className="w-full aspect-video border-4 border-ink bg-ink shadow-[12px_12px_0px_0px_var(--color-primary)] p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-center text-primary font-black uppercase border-b-2 border-primary/20 pb-4">
              <span>BTC/USD Variance</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Analyzed</span>
            </div>
            
            <svg viewBox="0 0 200 100" className="w-full h-full mt-8 overflow-visible">
              <motion.path
                d="M 0 50 L 20 40 L 40 60 L 60 30 L 80 45 L 100 20 L 120 35 L 140 10 L 160 25 L 180 5 L 200 15"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M 0 60 L 20 50 L 40 70 L 60 40 L 80 55 L 100 30 L 120 45 L 140 20 L 160 35 L 180 15 L 200 25"
                fill="none"
                stroke="var(--color-background)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
