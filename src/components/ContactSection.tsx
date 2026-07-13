"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { SOCIALS } from "@/components/SocialIcons";
import { AnimatedHeading } from "./Reveal";

type Detail = {
  Icon: typeof Mail;
  label: string;
  lines: string[];
  href?: string;
};

const DETAILS: Detail[] = [
  {
    Icon: MapPin,
    label: "Visit Us",
    lines: ["Aura Water"],
  },
  {
    Icon: Phone,
    label: "Call Us",
    lines: ["0306-6600133"],
    href: "tel:+923066600133",
  },
  {
    Icon: Mail,
    label: "Email Us",
    lines: ["aurawater.pk@gmail.com"],
    href: "mailto:aurawater.pk@gmail.com",
  },
  {
    Icon: Clock,
    label: "Opening Hours",
    lines: ["Mon – Fri: 9:00 – 18:00", "Sat: 10:00 – 15:00"],
  },
];

const SUBJECTS = [
  "General enquiry",
  "Custom AURA X",
  "Bulk / wholesale order",
  "Press & partnerships",
] as const;

function ContactDetails() {
  return (
    <div className="flex flex-col">
      <motion.span
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-[#1b4ef5]"
      >
        Contact Details
      </motion.span>
      <AnimatedHeading
        text="Let's Talk"
        className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-slate-900 sm:text-5xl"
      />
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600"
      >
        Whether it&apos;s a quick question or a big idea, our team is always
        happy to help. Pick whichever way suits you best.
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid gap-5 sm:grid-cols-2"
      >
        {DETAILS.map(({ Icon, label, lines, href }) => {
          const content = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1b4ef5]/10 text-[#1b4ef5] transition-colors group-hover:bg-[#1b4ef5] group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-sm font-bold uppercase tracking-[0.06em] text-slate-900">
                  {label}
                </span>
                {lines.map((line) => (
                  <span key={line} className="block text-sm text-slate-600">
                    {line}
                  </span>
                ))}
              </span>
            </>
          );

          return (
            <motion.div key={label} variants={scaleIn}>
              {href ? (
                <a
                  href={href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.35)] transition-colors hover:border-[#1b4ef5]/40"
                >
                  {content}
                </a>
              ) : (
                <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.35)]">
                  {content}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10"
      >
        <span className="font-display text-sm font-bold uppercase tracking-[0.06em] text-slate-900">
          Follow Us
        </span>
        <div className="mt-4 flex items-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1b4ef5]/30 text-[#1b4ef5] transition-colors hover:bg-[#1b4ef5] hover:text-white"
            >
              <Icon className="h-[18px] w-[18px]" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const FORM_SUBMIT_URL = "https://formsubmit.co/ajax/aurawater.pk@gmail.com";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("_subject", "New Aura Water contact form message");
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    try {
      const response = await fetch(FORM_SUBMIT_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Failed to send message");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(
        "Something went wrong. Please try again or email us at aurawater.pk@gmail.com.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/60 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#1b4ef5] focus:ring-2 focus:ring-[#1b4ef5]/30";

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative overflow-hidden rounded-3xl bg-[#B4E1EB] p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)] sm:p-10"
    >
      <motion.span
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-[#1b4ef5]"
      >
        Send A Message
      </motion.span>
      <AnimatedHeading
        as="h3"
        text="Drop Us A Line"
        className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-slate-900 sm:text-4xl"
      />

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center rounded-2xl bg-white/80 px-6 py-12 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1b4ef5] text-white"
          >
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </motion.span>
          <h4 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight text-slate-900">
            Message Sent
          </h4>
          <p className="mt-2 max-w-xs text-sm text-slate-600">
            Thanks for reaching out. We&apos;ll be in touch with you very soon.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 inline-flex items-center justify-center rounded-full border-2 border-[#1b4ef5] px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-[#1b4ef5] transition-colors hover:bg-[#1b4ef5] hover:text-white"
          >
            Send Another
          </button>
        </motion.div>
      ) : (
        <motion.form
          action="https://formsubmit.co/aurawater.pk@gmail.com"
          method="POST"
          onSubmit={handleSubmit}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 space-y-5"
        >
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {error && (
            <motion.p
              variants={fadeInUp}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </motion.p>
          )}

          <motion.div variants={fadeInUp} className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
              >
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className={inputClass}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
              >
                Phone{" "}
                <span className="font-normal normal-case text-slate-400">
                  (optional)
                </span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="0306-6600133"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
              >
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                defaultValue={SUBJECTS[0]}
                className={inputClass}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Tell us how we can help..."
              className={`${inputClass} resize-none`}
            />
          </motion.div>

          <motion.button
            type="submit"
            variants={fadeInUp}
            disabled={submitting}
            whileHover={submitting ? undefined : { scale: 1.03 }}
            whileTap={submitting ? undefined : { scale: 0.97 }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1b4ef5] px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-[#1740c9] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {submitting ? "Sending..." : "Send Message"}
            <Send className="h-4 w-4" strokeWidth={2.2} />
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
}

export function ContactSection() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <ContactDetails />
        <ContactForm />
      </div>
    </section>
  );
}
