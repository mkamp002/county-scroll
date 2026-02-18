import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/login");
        } else {
          setUserEmail(session.user.email ?? null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
      } else {
        setUserEmail(session.user.email ?? null);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg relative overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 py-20 relative z-10">
        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-2">
              Dashboard
            </p>
            <p className="text-sm text-muted-foreground">
              {userEmail}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-border/60 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="mr-2 h-3.5 w-3.5" />
            Sign Out
          </Button>
        </div>

        <div className="system-card text-center py-20">
          <p className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-4">
            Infrastructure Systems
          </p>
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Welcome to VONKAM
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Your dashboard is being configured. Systems will appear here once deployed.
          </p>
        </div>
      </div>
    </div>
  );
}
