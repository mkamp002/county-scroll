import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Zap, Target, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">Foreclosure Intelligence Platform</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Swipe Through Cases. Find Hot Leads.
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Navigate foreclosure cases faster with verified contacts, real-time docket updates, and AI-powered insights—all in a swipe-first interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 text-lg px-8">
                <Link to="/app">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 bg-section/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to find your next high-value foreclosure lead
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Swipe & Filter</h3>
              <p className="text-muted-foreground">
                Navigate by county and ZIP. Swipe through event cards or filter by status, doc type, and lead score.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Verified Contacts</h3>
              <p className="text-muted-foreground">
                See verified phones and emails for each case. Know which contacts are good before you dial.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">AI-Powered</h3>
              <p className="text-muted-foreground">
                Generate openers, SMS templates, and VA briefs in seconds with context-aware AI presets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Hot Leads?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start navigating foreclosure cases with verified contacts and AI assistance today.
            </p>
            <Button asChild size="lg" className="gap-2 text-lg px-8">
              <Link to="/app">
                Launch App
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
