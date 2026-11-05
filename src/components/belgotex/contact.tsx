"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  interest: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    // Simulated lead capture — in production this posts to Hustle Portal CRM
    await new Promise((r) => setTimeout(r, 900));

    setStatus("done");
    toast({
      title: "Lead captured",
      description: `Thanks ${form.name.split(" ")[0] || "there"} — our team will reach out within 1 business day.`,
    });
    setForm(initial);
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 lg:py-32 bg-secondary/30 border-t border-border/60 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: copy */}
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
              Talk to us
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary text-balance">
              Request a quote, request a sample, or book the B2B strategy call.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              One form. Three outcomes. We route every submission to the right
              Belgotex team — and to Hustle Portal for B2B qualification if you
              tick the box.
            </p>

            <ul className="mt-8 space-y-3 list-none p-0">
              {[
                "Sample dispatched within 48 hours nationwide",
                "Quote turnaround: 1 business day",
                "B2B strategy call: 30 minutes, no slide deck, just pipeline math",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-5 w-5 text-accent shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-base text-foreground/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-sm">
            {status === "done" ? (
              <div className="text-center py-12">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-primary">
                  We&apos;ve got it.
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Your request is in. Expect a reply within 1 business day.
                </p>
                <Button
                  className="mt-6"
                  variant="outline"
                  onClick={() => setStatus("idle")}
                >
                  Submit another
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full name <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Thandi Mokoena"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Work email <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="thandi@firm.co.za"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Mokoena Architects"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-sm font-medium">
                      Role
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      autoComplete="organization-title"
                      value={form.role}
                      onChange={(e) => update("role", e.target.value)}
                      placeholder="Senior specifier"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="interest" className="text-sm font-medium">
                    I&apos;m interested in <span className="text-accent">*</span>
                  </Label>
                  <Select
                    value={form.interest}
                    onValueChange={(v) => update("interest", v)}
                    required
                  >
                    <SelectTrigger id="interest" className="bg-background w-full">
                      <SelectValue placeholder="Choose one…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quote">Getting a quote</SelectItem>
                      <SelectItem value="sample">Ordering samples</SelectItem>
                      <SelectItem value="b2b">
                        B2B lead generation (Hustle Portal)
                      </SelectItem>
                      <SelectItem value="partnership">
                        Partnership / trade account
                      </SelectItem>
                      <SelectItem value="other">Something else</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Tell us more
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Project type, square meterage, timeline, anything that helps us route your request fast."
                    className="bg-background resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 group"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2
                          className="mr-2 h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send
                          className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                        Send request
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    We never share your data. POPIA compliant.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
