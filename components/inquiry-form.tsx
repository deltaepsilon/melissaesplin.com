"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  BUDGETS,
  LEADS_API_URL,
  SERVICE_TYPES,
  TIMELINES,
  US_STATES,
  tomorrowIsoDate,
} from "@/lib/leads";
import { TurnstileWidget } from "./turnstile-widget";

interface FormState {
  serviceRequested: string;
  eventDate: string;
  timeline: string;
  budget: string;
  projectDescription: string;
  city: string;
  state: string;
  zipCode: string;
  willingToShip: boolean;
  customerName: string;
  email: string;
  phone: string;
  preferredContact: "email" | "phone" | "text";
  website: string; // honeypot
}

const INITIAL_STATE: FormState = {
  serviceRequested: "engraving",
  eventDate: "",
  timeline: "",
  budget: "",
  projectDescription: "",
  city: "",
  state: "UT",
  zipCode: "",
  willingToShip: true,
  customerName: "",
  email: "",
  phone: "",
  preferredContact: "email",
  website: "",
};

const fieldClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground";
const labelClass =
  "block text-xs font-semibold uppercase tracking-[0.22em] text-foreground/75 mb-2";

export function InquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const minDate = tomorrowIsoDate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.customerName.trim() || !form.email.trim()) {
      setError("Please enter your name and email address.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(LEADS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          utmSource: "melissaesplin.com",
          utmMedium: "website",
          utmCampaign: "booking-inquiry",
          turnstileToken,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(data.error || "Could not submit your inquiry. Please check the fields and try again.");
        setTurnstileToken("");
        setTurnstileKey((k) => k + 1);
      }
    } catch {
      setError("Network error while sending your inquiry. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-foreground">
          Thank you — your inquiry is in!
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/75">
          Melissa&apos;s studio has received your details and sent a confirmation to{" "}
          <strong className="text-foreground">{form.email}</strong>. You can expect a reply
          within 1–2 business days.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-md bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Home
          </Link>
          <Link
            href="/portfolio/"
            className="rounded-md border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-foreground/5"
          >
            Browse Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-border/80 bg-white p-8 shadow-sm sm:p-10"
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">1. Event or Commission Details</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="serviceRequested" className={labelClass}>
              Service Requested *
            </label>
            <select
              id="serviceRequested"
              required
              className={fieldClass}
              value={form.serviceRequested}
              onChange={(e) => setForm({ ...form, serviceRequested: e.target.value })}
            >
              {SERVICE_TYPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="eventDate" className={labelClass}>
              Event or Target Date
            </label>
            <input
              id="eventDate"
              type="date"
              min={minDate}
              className={fieldClass}
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="timeline" className={labelClass}>
              Timeline
            </label>
            <select
              id="timeline"
              className={fieldClass}
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
            >
              <option value="">Select timeline...</option>
              {TIMELINES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="budget" className={labelClass}>
              Estimated Budget
            </label>
            <select
              id="budget"
              className={fieldClass}
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            >
              <option value="">Select budget range...</option>
              {BUDGETS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="projectDescription" className={labelClass}>
              Tell Us About Your Event or Project
            </label>
            <textarea
              id="projectDescription"
              rows={4}
              placeholder="Share the venue, estimated guest count or number of pieces, surfaces (glass, fragrance bottles, bags, envelopes, signage), and any brand or theme details..."
              className={fieldClass}
              value={form.projectDescription}
              onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-border/60 pt-8">
        <h2 className="text-2xl font-semibold text-foreground">2. Location</h2>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Salt Lake City"
              className={fieldClass}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="state" className={labelClass}>
              State
            </label>
            <select
              id="state"
              className={fieldClass}
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            >
              <option value="">Select state...</option>
              {US_STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="zipCode" className={labelClass}>
              ZIP Code
            </label>
            <input
              id="zipCode"
              type="text"
              placeholder="84020"
              className={fieldClass}
              value={form.zipCode}
              onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
            />
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-foreground/80">
          <input
            type="checkbox"
            checked={form.willingToShip}
            onChange={(e) => setForm({ ...form, willingToShip: e.target.checked })}
            className="h-4 w-4 rounded border-border accent-foreground"
          />
          Open to shipping studio commissions (if not an onsite event)
        </label>
      </div>

      <div className="space-y-6 border-t border-border/60 pt-8">
        <h2 className="text-2xl font-semibold text-foreground">3. Your Contact Info</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="customerName" className={labelClass}>
              Your Name *
            </label>
            <input
              id="customerName"
              type="text"
              required
              placeholder="Jane Doe"
              className={fieldClass}
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="jane@company.com"
              className={fieldClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone (Optional)
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(801) 555-0199"
              className={fieldClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="preferredContact" className={labelClass}>
              Preferred Contact
            </label>
            <select
              id="preferredContact"
              className={fieldClass}
              value={form.preferredContact}
              onChange={(e) =>
                setForm({
                  ...form,
                  preferredContact: e.target.value as FormState["preferredContact"],
                })
              }
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="text">Text Message</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-border/60 pt-6">
        <TurnstileWidget key={turnstileKey} onToken={setTurnstileToken} />

        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Sending Inquiry..." : "Send Booking Inquiry"}
        </button>
      </div>
    </form>
  );
}
