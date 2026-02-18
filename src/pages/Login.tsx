import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "login" | "signup";

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setError(null);
    setSuccess(null);
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    resetForm();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      navigate("/dashboard");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();
    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      setSuccess("Check your email to confirm your account.");
    }
  };

  const formVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 grid-bg relative overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      <div className="system-card w-full max-w-md relative z-10">
        {/* Tabs */}
        <div className="flex mb-10 border-b border-border/40">
          {(["login", "signup"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 pb-3 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors relative ${
                tab === t ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
            >
              {t === "login" ? "Log In" : "Sign Up"}
              {tab === t && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Subtext */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground">
            {tab === "login"
              ? "Access VONKAM infrastructure systems."
              : "Create your VONKAM account."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {tab === "login" ? (
            <motion.form
              key="login"
              onSubmit={handleLogin}
              className="space-y-5"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Field label="Email">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/40 h-11"
                />
              </Field>
              <Field label="Password">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/40 h-11"
                />
              </Field>
              {error && <p className="text-xs text-primary/80">{error}</p>}
              <Button type="submit" size="lg" disabled={loading} className="w-full text-sm font-medium h-12 glow-button mt-2">
                {loading ? "Authenticating..." : "Access Dashboard"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              onSubmit={handleSignup}
              className="space-y-5"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Field label="Full Name">
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Jane Doe"
                  className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/40 h-11"
                />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/40 h-11"
                />
              </Field>
              <Field label="Password">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/40 h-11"
                />
              </Field>
              {error && <p className="text-xs text-primary/80">{error}</p>}
              {success && <p className="text-xs text-primary/70">{success}</p>}
              <Button type="submit" size="lg" disabled={loading} className="w-full text-sm font-medium h-12 glow-button mt-2">
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-muted-foreground/50 mt-8">
          {tab === "login" ? "New here? " : "Have an account? "}
          <button
            onClick={() => switchTab(tab === "login" ? "signup" : "login")}
            className="text-primary/70 hover:text-primary transition-colors"
          >
            {tab === "login" ? "Request Access" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-medium text-muted-foreground tracking-[0.15em] uppercase mb-2 block">
        {label}
      </label>
      {children}
    </div>
  );
}
