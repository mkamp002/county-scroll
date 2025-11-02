import { useState } from "react";
import { X, ExternalLink, Copy, Phone, MessageSquare, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./Badge";
import { mockCaseDetail } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface CaseSheetProps {
  caseId: string;
  onClose: () => void;
}

export function CaseSheet({ caseId, onClose }: CaseSheetProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const caseData = mockCaseDetail; // In real app: fetch by caseId

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const verificationVariant = (status: string) => {
    if (status === "verified") return "verified";
    if (status === "invalid") return "invalid";
    return "unknown";
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-sheet-title"
    >
      <div
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l border-border overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 id="case-sheet-title" className="font-heading text-2xl font-bold">
                  {caseData.case_number}
                </h2>
                <Badge variant="clerk">Broward</Badge>
                <Badge variant="verified">{caseData.status}</Badge>
              </div>
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary font-medium"
                )}
              >
                <span className="text-sm">Lead Score</span>
                <span className="text-lg font-bold">{caseData.lead_score}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close case sheet"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Property Card */}
          <div className="glass-card p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Property</h3>
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="text-foreground">{caseData.property.address}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(caseData.property.address, "address")}
                  aria-label="Copy address"
                >
                  {copied === "address" ? (
                    <Check className="h-4 w-4 text-verified" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">APN</p>
                  <p className="text-foreground">{caseData.property.apn}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(caseData.property.apn, "apn")}
                  aria-label="Copy APN"
                >
                  {copied === "apn" ? (
                    <Check className="h-4 w-4 text-verified" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div>
                <a
                  href={caseData.property.portal_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  View in Clerk Portal
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contacts Card */}
          <div className="glass-card p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Contacts</h3>
            <div className="space-y-4">
              {caseData.contacts.map((contact, idx) => (
                <div key={idx} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                    </div>
                  </div>

                  {contact.phones.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {contact.phones.map((phone, pIdx) => (
                        <div key={pIdx} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            <span className="text-sm">{phone.number}</span>
                            <Badge variant={verificationVariant(phone.verified)}>
                              {phone.verified}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopy(phone.number, `phone-${idx}-${pIdx}`)}
                              aria-label={`Copy ${phone.number}`}
                            >
                              {copied === `phone-${idx}-${pIdx}` ? (
                                <Check className="h-3 w-3 text-verified" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {contact.emails.length > 0 && (
                    <div className="space-y-2">
                      {contact.emails.map((email, eIdx) => (
                        <div key={eIdx} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{email.email}</span>
                            <Badge variant={verificationVariant(email.status)}>
                              {email.status}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(email.email, `email-${idx}-${eIdx}`)}
                            aria-label={`Copy ${email.email}`}
                          >
                            {copied === `email-${idx}-${eIdx}` ? (
                              <Check className="h-3 w-3 text-verified" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Parties Card */}
          <div className="glass-card p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Parties</h3>
            <div className="space-y-2">
              {caseData.parties.map((party, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <span className="text-foreground">{party.name}</span>
                  <span className="text-sm text-muted-foreground">{party.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Docket Timeline */}
          <div className="glass-card p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Docket Timeline</h3>
            <div className="space-y-4">
              {caseData.events.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {idx < caseData.events.length - 1 && (
                      <div className="w-px h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="font-medium text-foreground">{event.type}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(event.desc, `event-${idx}`)}
                        aria-label="Copy event description"
                      >
                        {copied === `event-${idx}` ? (
                          <Check className="h-3 w-3 text-verified" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{event.desc}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(event.at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1 gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <MessageSquare className="h-4 w-4" />
              Send SMS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
