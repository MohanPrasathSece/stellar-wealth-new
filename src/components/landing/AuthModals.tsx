import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Mail, User, Phone, Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { CountrySelect } from "./CountrySelect";
import { validatePhoneNumber, formatFullPhoneNumber, getCountry } from "../../lib/phoneValidation";
import { toast } from "sonner";
import { Magnetic } from "./MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;

type AuthMode = "signin" | "signup";

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export function AuthModals() {
  const { isLoginOpen, setLoginOpen, isSignupOpen, setSignupOpen, login } = useAuth();
  
  // Determine starting tab mode
  const [mode, setMode] = useState<AuthMode>("signin");

  useEffect(() => {
    if (isLoginOpen) setMode("signin");
    else if (isSignupOpen) setMode("signup");
  }, [isLoginOpen, isSignupOpen]);

  const isOpen = isLoginOpen || isSignupOpen;

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("CH");
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FieldErrors>({});

  const resetForm = () => {
    setEmail(""); setName(""); setPhone(""); setCountry("CH");
    setErrors({}); setFeedback(null); setTouched({});
  };

  const handleClose = () => {
    setLoginOpen(false);
    setSignupOpen(false);
    resetForm();
  };

  const switchMode = (m: AuthMode) => {
    setMode(m);
    if (m === "signin") {
      setLoginOpen(true);
      setSignupOpen(false);
    } else {
      setLoginOpen(false);
      setSignupOpen(true);
    }
    resetForm();
  };

  // Field validation
  const validateField = (field: keyof FieldErrors, value: string, c?: string) => {
    let err: string | undefined;
    if (field === "name") {
      err = !value.trim() ? "Full name is required." : value.trim().length < 2 ? "Name must be at least 2 characters." : undefined;
    }
    if (field === "email") {
      err = !value.trim() ? "Email is required." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "Enter a valid email address." : undefined;
    }
    if (field === "phone") {
      err = validatePhoneNumber(value, c ?? country) ?? undefined;
    }
    setErrors(prev => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleChange = (field: "name" | "email" | "phone", val: string) => {
    if (field === "name") setName(val);
    if (field === "email") setEmail(val);
    if (field === "phone") setPhone(val);

    if (touched[field]) {
      validateField(field, val);
    }
  };

  const handleBlur = (field: "name" | "email" | "phone") => {
    if (!touched[field]) {
      setTouched(prev => ({ ...prev, [field]: true }));
      const val = field === "name" ? name : field === "email" ? email : phone;
      validateField(field, val);
    }
  };

  const handleCountryChange = (c: string) => {
    setCountry(c);
    if (touched.phone) {
      validateField("phone", phone, c);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setFeedback(null);

    if (mode === "signin") {
      setTouched({ email: true });
      const emailOk = validateField("email", email);
      if (!emailOk) return;

      setLoading(true);
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          login(data.user);
          toast.success("Successfully logged in!");
          handleClose();
          window.location.href = "/loggedin";
        } else {
          setFeedback({ type: "error", message: data.error || "Login failed." });
        }
      } catch (err: any) {
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
        setLoading(false);
        return { success: false, error: "Account already exists" };
      }

        setFeedback({ type: "error", message: "Network error during login." });
      } finally {
        setLoading(false);
      }
    } else {
      setTouched({ name: true, email: true, phone: true });
      const nameOk = validateField("name", name);
      const emailOk = validateField("email", email);
      const phoneOk = validateField("phone", phone);

      if (!nameOk || !emailOk || !phoneOk) return;

      setLoading(true);
      const fullPhone = formatFullPhoneNumber(phone, country);
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone: fullPhone, countryCode: country }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          login(data.user);
          toast.success("Thank you for contacting us. Your message has been received, and our team will get back to you shortly.");
          handleClose();
          window.location.href = "/loggedin";
        } else {
          setFeedback({ type: "error", message: data.error || "Signup failed." });
        }
      } catch (err: any) {
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
        setLoading(false);
        return { success: false, error: "Account already exists" };
      }

        setFeedback({ type: "error", message: "Network error during signup." });
      } finally {
        setLoading(false);
      }
    }
  };

  function FieldIcon({ field }: { field: keyof FieldErrors }) {
    const val = field === "name" ? name : field === "email" ? email : phone;
    if (!touched[field] || !val.trim()) return null;
    const err = errors[field];
    return err ? (
      <AnimatePresence>
        <motion.span key="err" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <AlertCircle className="size-4 text-destructive" />
        </motion.span>
      </AnimatePresence>
    ) : (
      <AnimatePresence>
        <motion.span key="ok" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <CheckCircle2 className="size-4 text-primary" />
        </motion.span>
      </AnimatePresence>
    );
  }

  function FieldMsg({ field, okMsg }: { field: keyof FieldErrors; okMsg: string }) {
    const val = field === "name" ? name : field === "email" ? email : phone;
    const err = errors[field];
    return (
      <AnimatePresence>
        {touched[field] && err && (
          <motion.p key="err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="size-3 shrink-0" />{err}
          </motion.p>
        )}
        {touched[field] && !err && val.trim() && (
          <motion.p key="ok" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-primary">
            <CheckCircle2 className="size-3 shrink-0" />{okMsg}
          </motion.p>
        )}
      </AnimatePresence>
    );
  }

  /* Shared field styling matching the vision style system */
  const fieldCls = (field: keyof FieldErrors) => {
    const val = field === "name" ? name : field === "email" ? email : phone;
    const isTouched = touched[field];
    const error = errors[field];
    const base = "w-full rounded-none border-2 px-5 py-4 pr-12 text-[15px] transition-all duration-300 focus:outline-none bg-background placeholder:text-muted-foreground/60 text-foreground font-medium";
    if (!isTouched || !val.trim()) return `${base} border-ink focus:border-primary focus:shadow-[4px_4px_0px_0px_var(--color-primary)]`;
    if (error) return `${base} border-destructive focus:border-destructive focus:shadow-[4px_4px_0px_0px_var(--color-destructive)] bg-destructive/5`;
    return `${base} border-primary focus:border-primary focus:shadow-[4px_4px_0px_0px_var(--color-primary)] bg-primary/5`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease }}
            className="relative w-full max-w-[440px] rounded-none border-4 border-ink bg-card p-6 md:p-8 shadow-[12px_12px_0px_0px_var(--color-ink)] z-[110]"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-6 top-6 text-muted-foreground transition-colors hover:text-foreground z-10"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            {/* Logo Header */}
            <div className="flex items-center gap-2.5 mb-4 font-bold text-lg uppercase tracking-tight">
              <span className="grid place-items-center w-8 h-8 rounded-md bg-ink text-primary shadow-sm border border-border/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" x2="21" y1="22" y2="22" />
                  <line x1="6" x2="6" y1="18" y2="11" />
                  <line x1="10" x2="10" y1="18" y2="11" />
                  <line x1="14" x2="14" y1="18" y2="11" />
                  <line x1="18" x2="18" y1="18" y2="11" />
                  <polygon points="12 2 20 7 4 7" />
                </svg>
              </span>
              <span className="text-foreground">The Ledger Capital</span>
            </div>

            {/* Mode Specific Title & Subtitle */}
            <h3 className="text-display text-[32px] leading-[1.1] font-black uppercase text-foreground">
              {mode === "signin" ? (
                <>Welcome back</>
              ) : (
                <>Start your <br/><span className="text-primary">wealth journey</span></>
              )}
            </h3>
            <p className="mt-3 text-[14px] font-medium text-ink/70">
              {mode === "signin" ? "Sign in to access your institutional portfolio." : "Create an account in seconds. No credit card required."}
            </p>

            {/* Tabs matching Revelle Partners */}
            <div className="mt-6 relative flex p-1 border-2 border-ink bg-background">
              {(["signin", "signup"] as AuthMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={`relative flex-1 h-10 text-[13px] font-bold uppercase tracking-wide transition-colors ${mode === m ? "text-primary-foreground" : "text-ink/60 hover:text-ink"}`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="auth-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-primary border-2 border-ink"
                    />
                  )}
                  <span className="relative z-10">{m === "signin" ? "Sign In" : "Sign Up"}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {feedback && (
                <div className={`rounded-xl px-4 py-3 text-[13px] leading-relaxed ${feedback.type === "success" ? "bg-primary/10 border border-primary/20 text-primary" : "bg-destructive/10 border border-destructive/20 text-destructive"}`}>
                  {feedback.message}
                </div>
              )}

              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="signup-fields"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={e => handleChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          className={fieldCls("name")}
                          disabled={loading}
                          autoComplete="name"
                        />
                        <FieldIcon field="name" />
                      </div>
                      <FieldMsg field="name" okMsg="Looks good!" />
                    </div>

                    {/* Phone + Country select */}
                    <div>
                      <div className="flex gap-2">
                        <CountrySelect
                          value={country}
                          onChange={handleCountryChange}
                          className="w-[110px] flex-shrink-0"
                          theme="dark"
                        />
                        <div className="relative flex-1">
                          <input
                            type="tel"
                            placeholder={getCountry(country).placeholder}
                            value={phone}
                            onChange={e => handleChange("phone", e.target.value)}
                            onBlur={() => handleBlur("phone")}
                            className={fieldCls("phone")}
                            disabled={loading}
                            autoComplete="tel"
                          />
                          <FieldIcon field="phone" />
                        </div>
                      </div>
                      <FieldMsg field="phone" okMsg="Valid number" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email (Always shown) */}
              <div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={fieldCls("email")}
                    disabled={loading}
                    autoComplete="email"
                  />
                  <FieldIcon field="email" />
                </div>
                <FieldMsg field="email" okMsg="Valid email" />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Magnetic strength={0.15}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 border-2 border-ink bg-primary px-6 py-4 text-[15px] font-bold uppercase tracking-wide text-primary-foreground transition-all duration-300 hover:-translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:shadow-[6px_6px_0px_0px_var(--color-ink)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_var(--color-ink)]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      <>
                        {mode === "signin" ? "Sign In" : "Create Account"}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>

              {/* Footer Switch Link */}
              <p className="mt-5 text-center text-[12px] font-bold text-ink/70 uppercase">
                {mode === "signin" ? "New to The Ledger Capital?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                  className="text-primary hover:text-primary-foreground transition-colors underline decoration-2 underline-offset-4"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
