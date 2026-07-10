
import { Nav, Footer, Reveal } from "./index";
import { AuthModals } from "../components/landing/AuthModals";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-32">
      <AuthModals />
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Reveal>
          <h1 className="text-display text-5xl md:text-7xl font-black uppercase text-ink mb-12">
            Privacy Policy
          </h1>
        </Reveal>
        <Reveal delay={1}>
          <div className="space-y-8 text-ink text-lg font-medium leading-relaxed">
            <p><strong>Last Updated: July 2026</strong></p>
            <p>
              At The Ledger Capital, we take your privacy and the security of your data seriously. This Privacy Policy describes how we collect, use, and handle your information when you use our institutional-grade crypto investment platform.
            </p>
            <h2 className="text-2xl font-bold uppercase mt-12 mb-4">1. Information We Collect</h2>
            <p>
              We collect information to provide better services to our users. This includes basic information like your email address and name, as well as more complex information like your transaction history and portfolio allocations.
            </p>
            <h2 className="text-2xl font-bold uppercase mt-12 mb-4">2. How We Use Information</h2>
            <p>
              The information we collect is used to operate our platform, process your transactions, and provide personalized investment insights. We use advanced encryption and security measures to ensure your data is protected at all times.
            </p>
            <h2 className="text-2xl font-bold uppercase mt-12 mb-4">3. Data Security</h2>
            <p>
              Our infrastructure relies on institutional-grade custody solutions, including MPC technology and air-gapped cold storage. Your personal information is treated with the same level of rigorous security as your digital assets.
            </p>
            <h2 className="text-2xl font-bold uppercase mt-12 mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our support team at legal@theledgercapital.com.
            </p>
          </div>
        </Reveal>
      </div>
      <Footer />
    </div>
  );
}
