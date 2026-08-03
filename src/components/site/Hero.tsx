import { ArrowDownRight, Download } from "lucide-react";
import { profile, stats } from "@/lib/portfolio";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px]"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative mx-auto grid w-[min(1180px,92vw)] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left Side - Text */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-[oklch(0.72_0.19_145)]" />
              Available for new projects · {profile.timezone}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl lg:text-[4.25rem]">
              Designing digital
              <br />
              products people
              <br />
              <span className="text-gradient">actually enjoy.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm <span className="text-foreground">{profile.name}</span> — {profile.shortTitle} based in{" "}
              {profile.location}. {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-medium text-primary-foreground shadow-luxe transition-transform hover:scale-[1.03]"
              >
                View my work <ArrowDownRight className="size-4" />
              </a>
              <a
                href={profile.cv}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Download className="size-4" /> Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Right Side - Box with Image and Name */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] blur-3xl"
            style={{ background: "var(--gradient-brand)", opacity: 0.28 }}
          />
          <div className="glass animate-float relative overflow-hidden rounded-[2rem] p-3 shadow-luxe">
            {/* Image */}
            <img
              src="/1000033091.webp"
              alt={`${profile.name}, ${profile.shortTitle}`}
              width={720}
              height={720}
              className="aspect-square w-full rounded-[1.5rem] object-cover"
            />
            {/* Name Below Image */}
            <div className="flex items-center justify-between px-3 py-4">
              <div>
                <p className="font-display text-base font-semibold text-foreground">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.shortTitle}</p>
              </div>
              <span className="grid size-9 place-items-center rounded-xl bg-brand text-primary-foreground">
                <Download className="size-4" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
