import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { Nav, FeatureCards, Opportunity, Footer, Reveal } from "./index";
import { ContactSection } from "../components/landing/ContactSection";
import { motion } from "framer-motion";
import { ArrowRight, LogOut } from "lucide-react";

export const Route = createFileRoute("/loggedin")({
  beforeLoad: ({ context }) => {
    // Only check localStorage on the client side to prevent SSR crash
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("revelle_user");
      if (!storedUser) {
        throw redirect({ to: "/" });
      }
    }
  },
  component: LoggedIn,
});

function LoggedIn() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <DashboardHero user={user} />
      <FeatureCards />
      <Opportunity />
      <ContactSection />
      <Footer />
    </div>
  );
}

function DashboardHero({ user }: { user: any }) {
  const { logout } = useAuth();
  
  return (
    <section className="relative pt-40 pb-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* grid bg */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,oklch(0.92_0_0/0.5)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0_0/0.5)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <Reveal>
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8 shadow-inner border border-primary/30">
          <span className="text-3xl font-bold text-primary">
            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
          </span>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <h1 className="text-display text-5xl md:text-7xl max-w-4xl mx-auto leading-tight mb-4">
          Welcome back, <br className="md:hidden" />
          <span className="text-primary">{user?.name || user?.email?.split('@')[0]}</span>.
        </h1>
      </Reveal>
      
      <Reveal delay={2}>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground mx-auto">
          Your portfolio is ready. Capture the next big opportunity with our institutional-grade strategies.
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a href="#features" className="btn-primary">
            View Performance <ArrowRight className="w-4 h-4" />
          </a>
          <button onClick={logout} className="btn-ghost text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </button>
        </div>
      </Reveal>
    </section>
  );
}
