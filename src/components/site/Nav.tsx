import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, Download } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import warisAvatar from "@/assets/waris-avatar.webp.asset.json";

const links = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Journey", href: "/#journey" },
  { label: "Contact", href: "/#contact" },
];

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("mw-theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("mw-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto w-[min(1180px,94vw)]">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300",
            scrolled ? "glass shadow-luxe" : "border border-transparent",
          )}
        >
          <Link to="/" className="flex items-center gap-3">
            <img
              src={warisAvatar.url}
              alt={profile.name}
              width={36}
              height={36}
              loading="eager"
              className="size-9 rounded-xl object-cover ring-1 ring-border"
            />
            <span className="hidden text-sm font-medium text-foreground sm:block">
              {profile.name}
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground md:inline-flex">
              <span className="size-2 rounded-full bg-[oklch(0.72_0.19_145)] animate-pulse-ring" />
              Available for new projects
            </span>
            <button
              onClick={toggle}
              aria-label="Toggle colour theme"
              className="grid size-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <a
              href={profile.cv}
              download
              className="hidden items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-medium text-primary-foreground shadow-luxe transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <Download className="size-4" /> CV
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="grid size-9 place-items-center rounded-xl border border-border text-foreground lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {open ? (
          <div className="glass mt-2 rounded-2xl p-3 lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}