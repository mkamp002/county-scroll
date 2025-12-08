import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, TrendingUp, Shield, Zap, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold text-foreground">VONKAM</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <Button asChild size="sm">
                <Link to="/app">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Gradient */}
      <section className="relative overflow-hidden gradient-dark text-dark-foreground py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
              <span className="text-sm font-medium">Foreclosure Intelligence Platform</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Turn foreclosure leads into closed deals
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Access verified contact data, track cases in real-time, and close 3x more deals with AI-powered intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 bg-white text-dark-bg hover:bg-white/90">
                <Link to="/app">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white/30 text-white hover:bg-white/10">
                <a href="#features">Learn more</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">Real-time Data</h3>
              <p className="text-muted-foreground">
                Access enriched foreclosure data in real-time so you can focus exclusively on supporting motivated homeowners.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">Verified Contacts</h3>
              <p className="text-muted-foreground">
                Every phone number and email verified before you call. Stop wasting time on disconnected numbers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Smart lead scoring, instant summaries, and recommended next steps help you close more deals with less guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Details - Dark */}
      <section className="py-20 gradient-dark text-dark-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Engage on their terms
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Book more appointments with personalized calls, texts, and emails. Turn ignored messages into real conversations.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-dark-bg hover:bg-white/90">Get started</Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">Learn more</Button>
              </div>
            </div>
            <div className="glass-card p-8 bg-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span className="text-white/90">Built-in calling & texting</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span className="text-white/90">Direct calendar integration</span>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-white/90">Automated follow-ups</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="glass-card p-8 bg-white/5">
                <h3 className="font-heading text-2xl font-bold mb-4 text-white">Pipeline Management</h3>
                <p className="text-white/70 mb-4">Track every deal from first contact to closing in one unified dashboard.</p>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-md bg-white/10 text-sm text-white/90">Assigned</div>
                  <div className="px-3 py-1 rounded-md bg-primary/20 text-sm text-white">Appointment</div>
                  <div className="px-3 py-1 rounded-md bg-white/10 text-sm text-white/90">Offer</div>
                  <div className="px-3 py-1 rounded-md bg-white/10 text-sm text-white/90">Closed</div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                One live dashboard, tracking every deal
              </h2>
              <p className="text-lg text-white/80">
                Manage your pipeline in one place: monitor deal progress, get instant updates, review every note, and define the next steps without missing a beat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Stories from the field
            </h2>
            <p className="text-xl text-muted-foreground">
              Agents and investors who use VONKAM close 3x more deals in half the time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <p className="text-foreground mb-6 italic">
                "Amazing leads to solid prospects. The hit rate has blown away my traditional cold calling! Thank you VONKAM!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  AF
                </div>
                <div>
                  <p className="font-semibold text-foreground">Amber Fletcher</p>
                  <p className="text-sm text-muted-foreground">New Orleans, LA, Investor</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <p className="text-foreground mb-6 italic">
                "I went from chasing dead-end leads to having vetted listing appointments on my calendar every week."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  AC
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ashley Carter</p>
                  <p className="text-sm text-muted-foreground">Atlanta, GA, Real Estate Agent</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <p className="text-foreground mb-6 italic">
                "I've tried other lead providers before, but VONKAM is different. The homeowners actually expect my call, and they're ready to have a real conversation about selling."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  BS
                </div>
                <div>
                  <p className="font-semibold text-foreground">Bethany Shaw</p>
                  <p className="text-sm text-muted-foreground">Jacksonville, FL, Real Estate Agent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 gradient-dark text-dark-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">Pricing</h2>
            <p className="text-xl text-white/80 mb-8">
              Straightforward pricing, 24/7 support, cancel anytime
            </p>
            <p className="text-lg text-white/70">
              Join 11,000+ investors and agents who rely on VONKAM to connect with homeowners who are ready to sell.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="dark-glass-card p-8">
              <h3 className="font-heading text-3xl font-bold mb-2 text-white">Ramp</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$83.25</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-white/70 mb-8">For new agents and investors building their sphere of influence</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Access to the prospecting database</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Basic filtering: property details, mortgage info & more</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Built-in calling & texting</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-dark-bg hover:bg-white/90">Get started</Button>
            </div>

            <div className="dark-glass-card p-8 border-primary/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-3xl font-bold text-white">Growth</h3>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">Most popular</span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$249.16</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-white/70 mb-8">For experienced agents and investors scaling their efforts</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Everything in Ramp, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Hourly refreshed prospecting data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Advanced filtering via embedded seller intent scores</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Automated drip campaigns</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">Get started</Button>
            </div>

            <div className="dark-glass-card p-8">
              <h3 className="font-heading text-3xl font-bold mb-2 text-white">Scale</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$1,375.10</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-white/70 mb-8">For teams scaling their prospecting via outbound</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Everything in Growth, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Real-time refreshed prospecting data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">Expert filtering: motivation, distress, life events & more</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-white/90">A dedicated caller working your lead list for you 24/7</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-dark-bg hover:bg-white/90">Get started</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-section border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                V
              </div>
              <span className="font-heading text-xl font-bold text-foreground">PROJECT VON</span>
            </div>
            <p className="text-muted-foreground">© 2025 PROJECT VON. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
