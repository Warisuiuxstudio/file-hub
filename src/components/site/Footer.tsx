import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { profile, projects } from "@/lib/portfolio";

const socials = [
  { label: "Behance", href: profile.behance },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Upwork", href: profile.upwork },
  { label: "WhatsApp", href: profile.whatsapp },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-brand text-sm font-semibold text-primary-foreground">
              MW
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-foreground">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{profile.shortTitle}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-foreground">
              <Mail className="size-4" /> {profile.email}
            </a>
            <a href={profile.whatsapp} className="flex items-center gap-2 hover:text-foreground">
              <Phone className="size-4" /> {profile.phone}
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="size-4" /> {profile.location}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Selected work</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {projects.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link to="/work/$slug" params={{ slug: p.slug }} className="hover:text-foreground">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer noopener" className="hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.cv} download className="hover:text-foreground">
                Download CV
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. Designed and built with care in Karachi.
      </div>
    </footer>
  );
}