import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { categories, projects } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./Reveal";

type Sort = "recent" | "az" | "category";

export function Work() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      const matchesCat = active === "All" || p.category === active;
      const matchesQuery =
        !q ||
        [p.title, p.subtitle, p.industry, ...p.tags].join(" ").toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
    return [...list].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "category") return a.category.localeCompare(b.category);
      return Number(b.year) - Number(a.year);
    });
  }, [active, query, sort]);

  return (
    <section id="work" className="scroll-mt-28 py-24">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <SectionHeading
          eyebrow="Selected work"
          title="Case studies, presented properly"
          description="Nine real product design projects — banking, healthcare, commerce, travel, hospitality and e-learning. Every card opens a full case study with the original screens, flows and design system."
        />

        <Reveal className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  active === c
                    ? "border-transparent bg-brand text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="glass flex items-center gap-2 rounded-xl px-3 py-2">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                aria-label="Search projects"
                className="w-40 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort projects"
              className="glass rounded-xl px-3 py-2.5 text-sm text-foreground outline-none"
            >
              <option value="recent">Most recent</option>
              <option value="az">A – Z</option>
              <option value="category">By category</option>
            </select>
          </div>
        </Reveal>

        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className="break-inside-avoid">
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group glass block overflow-hidden rounded-3xl p-1.5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe"
              >
                <div
                  className="relative flex flex-col justify-between overflow-hidden rounded-[1.35rem] p-6"
                  style={{
                    background: `linear-gradient(150deg, ${p.accent}, transparent 70%)`,
                    minHeight: i % 3 === 1 ? 320 : 250,
                  }}
                >
                  {p.cover ? (
                    <>
                      <img
                        src={p.cover}
                        alt={`${p.title} — ${p.subtitle}`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-background/10"
                      />
                    </>
                  ) : null}
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="rounded-full bg-background/70 px-3 py-1 text-xs text-foreground">
                      {p.category}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full bg-background/70 text-foreground transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <div className="relative mt-16">
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/70">{p.year}</p>
                    <h3 className="mt-1 text-2xl font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1 text-sm text-foreground/80">{p.subtitle}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 px-4 py-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No projects match that search yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}