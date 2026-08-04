import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Download, ExternalLink, ImageIcon, X } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Reveal } from "@/components/site/Reveal";
import { getProject, profile, projects, type Project } from "@/lib/portfolio";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — ${p.subtitle} | Muhammad Waris` : "Case study | Muhammad Waris";
    const description = p?.overview ?? "UI/UX case study by Muhammad Waris.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
});

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}

function Gallery({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (project.gallery.length === 0) {
    return (
      <Reveal className="glass rounded-3xl border-dashed p-12 text-center">
        <ImageIcon className="mx-auto size-8 text-muted-foreground" />
        <p className="mt-4 font-display text-lg font-semibold text-foreground">
          Gallery ready for your real screens
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Add any number of images, Figma embeds or videos to this project's <code>gallery</code> array
          in <code>src/lib/portfolio.ts</code> — five or fifty, the layout adapts with lightbox zoom,
          full-screen preview and smooth transitions. Nothing here overwrites your original work.
        </p>
      </Reveal>
    );
  }

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 [&>*]:mb-5">
        {project.gallery.map((item, i) => (
          <Reveal key={`${item.src}-${i}`} delay={i * 50} className="break-inside-avoid">
            {item.type === "figma" || item.type === "video" ? (
              <iframe
                title={item.caption ?? `${project.title} embed ${i + 1}`}
                src={item.src}
                loading="lazy"
                allowFullScreen
                className="aspect-video w-full rounded-2xl border border-border"
              />
            ) : (
              <button
                onClick={() => setLightbox(item.src ?? null)}
                className="group block w-full overflow-hidden rounded-2xl border border-border"
              >
                <img
                  src={item.src}
                  alt={item.caption ?? `${project.title} screen ${i + 1}`}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            )}
            {item.caption ? (
              <p className="mt-2 text-xs text-muted-foreground">{item.caption}</p>
            ) : null}
          </Reveal>
        ))}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-background/90 p-6 backdrop-blur"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close preview"
            className="absolute right-6 top-6 grid size-10 place-items-center rounded-full border border-border text-foreground"
          >
            <X className="size-5" />
          </button>
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
        </div>
      ) : null}
    </>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData() as { project: Project };
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="relative overflow-hidden pt-36 pb-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-32 h-[420px]"
            style={{ background: `radial-gradient(60% 60% at 50% 0%, ${project.accent}55, transparent 70%)` }}
          />
          <div className="relative mx-auto w-[min(1100px,92vw)]">
            <Link
              to="/"
              hash="work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> All work
            </Link>
            <Reveal>
              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {project.category} · {project.year}
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-foreground sm:text-6xl">{project.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{project.subtitle}</p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-10">
              {project.cover ? (
                <img
                  src={project.cover}
                  alt={`${project.title} — ${project.subtitle}`}
                  className="max-h-[520px] w-full rounded-3xl border border-border object-cover"
                />
              ) : (
                <div
                  className="h-64 rounded-3xl sm:h-80"
                  style={{ background: `linear-gradient(140deg, ${project.accent}, transparent 75%)` }}
                />
              )}
            </Reveal>

            <Reveal delay={140} className="glass mt-8 grid gap-6 rounded-3xl p-6 sm:grid-cols-3 lg:grid-cols-6">
              <Meta label="Client" value={project.client} />
              <Meta label="Industry" value={project.industry} />
              <Meta label="Role" value={project.role} />
              <Meta label="Team" value={project.team} />
              <Meta label="Duration" value={project.duration} />
              <Meta label="Year" value={project.year} />
            </Reveal>
          </div>
        </section>

        <section className="mx-auto w-[min(1100px,92vw)] py-12">
          <div className="grid gap-6 md:grid-cols-2">
            {project.sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} className="glass rounded-3xl p-6">
                <h2 className="font-display text-xl font-semibold text-foreground">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto grid w-[min(1100px,92vw)] gap-6 py-12 lg:grid-cols-3">
          <Reveal className="glass rounded-3xl p-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Deliverables</h2>
            <ul className="mt-4 space-y-2">
              {project.deliverables.map((d) => (
                <li key={d} className="text-sm text-muted-foreground">
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={60} className="glass rounded-3xl p-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Colour palette</h2>
            <div className="mt-4 flex gap-3">
              {project.palette.map((c) => (
                <div key={c} className="flex-1">
                  <div className="h-16 rounded-xl border border-border" style={{ background: c }} />
                  <p className="mt-2 text-[11px] text-muted-foreground">{c}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="glass rounded-3xl p-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Typography</h2>
            <p className="mt-4 text-2xl text-foreground">{project.typography.display}</p>
            <p className="text-xs text-muted-foreground">Display</p>
            <p className="mt-4 text-lg text-foreground">{project.typography.body}</p>
            <p className="text-xs text-muted-foreground">Body</p>
          </Reveal>
        </section>

        <section className="mx-auto w-[min(1100px,92vw)] py-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">Screens & prototype</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            High-fidelity UI, mockups and the interactive prototype for {project.title}.
          </p>
          <div className="mt-8">
            {project.figmaEmbed ? (
              <iframe
                title={`${project.title} Figma prototype`}
                src={project.figmaEmbed}
                allowFullScreen
                className="mb-6 aspect-video w-full rounded-2xl border border-border"
              />
            ) : null}
            <Gallery project={project} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm text-foreground hover:bg-secondary"
              >
                <ExternalLink className="size-4" /> Live project
              </a>
            ) : null}
            {project.pdfUrl ? (
              <a
                href={project.pdfUrl}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm text-foreground hover:bg-secondary"
              >
                <Download className="size-4" /> PDF case study
              </a>
            ) : null}
            <a
              href={profile.behance}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm text-foreground hover:bg-secondary"
            >
              <ExternalLink className="size-4" /> See more on Behance
            </a>
          </div>
        </section>

        <section className="mx-auto w-[min(1100px,92vw)] py-16">
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="glass flex flex-col gap-4 rounded-3xl p-8 transition-transform hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Next project</p>
              <p className="mt-2 font-display text-2xl font-semibold text-foreground">{next.title}</p>
              <p className="text-sm text-muted-foreground">{next.subtitle}</p>
            </div>
            <span className="grid size-12 place-items-center rounded-full bg-brand text-primary-foreground">
              <ArrowRight className="size-5" />
            </span>
          </Link>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}