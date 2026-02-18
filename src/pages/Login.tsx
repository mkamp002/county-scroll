import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 grid-bg relative overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      <div className="system-card w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <p className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-4">
            Private Access Portal
          </p>
          <p className="text-sm text-muted-foreground">
            Access VONKAM infrastructure systems.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-[11px] font-medium text-muted-foreground tracking-[0.15em] uppercase mb-2 block">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/40 h-11"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-muted-foreground tracking-[0.15em] uppercase mb-2 block">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/40 h-11"
            />
          </div>

          {error && (
            <p className="text-xs text-primary/80">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full text-sm font-medium h-12 glow-button mt-2"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground/50 mt-8">
          New here?{" "}
          <a
            href="https://calendly.com/michelkampreisser1/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-colors"
          >
            Request Access
          </a>
        </p>
      </div>
    </div>
  );
}
