import { useState } from "react";
import {
  Award,
  Check,
  Clock,
  Figma,
  Globe,
  Layers,
  Mail,
  Send,
  Sparkles,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import {
  awards,
  education,
  experience,
  faqs,
  faqs as faqList,
  process,
  profile,
  services,
  skills,
  timeline,
  tools,
} from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./Reveal";

const awardIcons: Record<string, typeof Trophy> = {
  trophy: Trophy,
  clock: Clock,
  layers: Layers,
  figma: Figma,
  sparkles: Sparkles,
};

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-24">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading align="left" eyebrow="About" title="Design that earns its place" />
          <Reveal delay={80}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{profile.summary}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              I care about the boring details — spacing rhythm, empty states, error copy, tap targets —
              because that's what separates a pretty mockup from a product that works.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-8 grid gap-4 sm:grid-cols-2">
            {experience.map((e) => (
              <div key={e.role} className="glass rounded-2xl p-5 sm:col-span-2">
                <p className="font-display text-lg font-semibold text-foreground">{e.role}</p>
                <p className="text-sm text-muted-foreground">
                  {e.org} · {e.period}
                </p>
                <ul className="mt-4 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={100} className="glass rounded-3xl p-6">
            <p className="text-sm font-semibold text-foreground">Skills</p>
            <div className="mt-5 space-y-4">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.note}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160} className="glass rounded-3xl p-6">
            <p className="text-sm font-semibold text-foreground">Education</p>
            <ul className="mt-4 space-y-3">
              {education.map((e) => (
                <li key={e.school} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className="text-foreground">{e.school}</p>
                    <p className="text-muted-foreground">{e.field}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{e.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Toolbox() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <Reveal className="glass overflow-hidden rounded-3xl px-6 py-8">
          <p className="text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Daily toolbox
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {tools.map((t) => (
              <span
                key={t}
                title={t}
                className="rounded-2xl border border-border px-5 py-3 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-foreground hover:shadow-luxe"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 py-24">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeading
          eyebrow="Services"
          title="What I can take off your plate"
          description="From a single landing page to a full product system — scoped clearly, delivered on time."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70} className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand text-primary-foreground">
                <Layers className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="scroll-mt-28 py-24">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeading eyebrow="Process" title="A repeatable path from brief to build" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 60} className="glass rounded-3xl p-6">
              <span className="font-display text-3xl font-semibold text-gradient">{p.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Awards() {
  return (
    <section className="py-24">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeading eyebrow="Recognition" title="Signals clients keep coming back for" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((a, i) => {
            const Icon = awardIcons[a.icon] ?? Award;
            return (
              <Reveal key={a.title} delay={i * 60} className="glass rounded-3xl p-6">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.note}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-28 py-24">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeading eyebrow="Journey" title="How I got here" />
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
          {timeline.map((t, i) => (
            <Reveal
              key={t.title}
              delay={i * 60}
              className={cn(
                "relative mb-8 pl-12 md:w-1/2 md:pl-0",
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12",
              )}
            >
              <span
                className={cn(
                  "absolute left-2.5 top-2 size-3 rounded-full bg-brand ring-4 ring-background",
                  i % 2 === 0 ? "md:-right-1.5 md:left-auto" : "md:-left-1.5",
                )}
              />
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{t.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Availability() {
  const items = [
    { label: "Availability", value: "Available worldwide · Remote" },
    { label: "Timezone", value: profile.timezone },
    { label: "Response time", value: profile.responseTime },
    { label: "Languages", value: profile.languages.join(" · ") },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <Reveal className="glass relative overflow-hidden rounded-3xl p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full blur-3xl"
            style={{ background: "var(--gradient-brand)", opacity: 0.25 }}
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-brand text-primary-foreground">
                <Globe className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  Working with clients globally
                </h3>
                <p className="text-sm text-muted-foreground">
                  Based in {profile.location} — collaborating across EU, US and GCC hours.
                </p>
              </div>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {items.map((i) => (
                <div key={i.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{i.label}</dt>
                  <dd className="mt-1 text-sm text-foreground">{i.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24">
      <div className="mx-auto w-[min(880px,92vw)]">
        <SectionHeading eyebrow="FAQ" title="Good questions, answered" />
        <div className="mt-10 space-y-3">
          {faqList.map((f, i) => (
            <Reveal key={f.q} delay={i * 50} className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-foreground">{f.q}</span>
                <span className="text-muted-foreground">{open === i ? "–" : "+"}</span>
              </button>
              {open === i ? (
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="scroll-mt-28 py-24">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Let's build something worth showing off"
            description="Tell me about your product, timeline and goals. I'll come back with a clear plan and an honest estimate."
          />
          <Reveal delay={100} className="mt-8 space-y-3">
            {[
              { label: "WhatsApp", value: profile.phone, href: profile.whatsapp },
              { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { label: "Behance", value: "behance.net/sameerkhooharo", href: profile.behance },
              { label: "LinkedIn", value: "Muhammad Waris", href: profile.linkedin },
              { label: "Upwork", value: "Hire me on Upwork", href: profile.upwork },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer noopener"
                className="glass flex items-center justify-between rounded-2xl px-5 py-4 transition-transform hover:-translate-y-0.5"
              >
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.label}</span>
                <span className="text-sm text-foreground">{c.value}</span>
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal delay={140} className="glass rounded-3xl p-7">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const body = `Hi Waris, I'm ${data.get("name")} (${data.get("email")}).%0A%0A${data.get("message")}`;
              window.open(`${profile.whatsapp}?text=${body}`, "_blank", "noopener");
              setSent(true);
              toast.success("Opening WhatsApp with your message");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-muted-foreground">Your name</span>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="text-muted-foreground">Project details</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-medium text-primary-foreground shadow-luxe transition-transform hover:scale-[1.02]"
            >
              <Send className="size-4" /> Send message
            </button>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="size-3.5" />
              {sent ? "Message ready in WhatsApp — hit send there." : `Prefer email? ${profile.email}`}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export const faqCount = faqs.length;