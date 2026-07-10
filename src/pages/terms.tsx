
import { Nav, Footer, Reveal } from "./index";
import { AuthModals } from "../components/landing/AuthModals";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-32">
      <AuthModals />
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Reveal>
          <h1 className="text-display text-5xl md:text-7xl font-black uppercase text-ink mb-12">
            Terms of Service
          </h1>
        </Reveal>
        <Reveal delay={1}>
          <div className="space-y-8 text-ink text-lg font-medium leading-relaxed">
            <p><strong>Last Updated: July 2026</strong></p>
            <p>
              Welcome to The Ledger Capital. These Terms of Service govern your access to and use of our platform, services, and associated software.
            </p>
            <h2 className="text-2xl font-bold uppercase mt-12 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using The Ledger Capital, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our platform.
            </p>
            <h2 className="text-2xl font-bold uppercase mt-12 mb-4">2. Eligibility</h2>
            <p>
              You must be at least 18 years old and capable of forming a binding contract to use our services. By using The Ledger Capital, you represent and warrant that you meet these requirements.
            </p>
            <h2 className="text-2xl font-bold uppercase mt-12 mb-4">3. Investment Risks</h2>
            <p>
              Trading and investing in digital assets involves significant risk. You acknowledge that the value of digital assets can fluctuate wildly and you may lose some or all of your investment. The Ledger Capital does not guarantee any specific returns.
            </p>
            <h2 className="text-2xl font-bold uppercase mt-12 mb-4">4. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which The Ledger Capital operates, without regard to its conflict of law provisions.
            </p>
          </div>
        </Reveal>
      </div>
      <Footer />
    </div>
  );
}
