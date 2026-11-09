import Image from "next/image";
import { Archive } from "@/components/Archive";
import { ContributionGraph, type Day } from "@/components/ContributionGraph";
import { HazeImage } from "@/components/HazeImage";
import { ArrowDown, ArrowUpRight, GitHubMark, MailIcon } from "@/components/Icons";
import { LavaField } from "@/components/LavaField";
import { SlotDemo } from "@/components/SlotDemo";
import contributions from "@/data/contributions.json";
import { archive, aroma, profile, skills } from "@/data/site";

const days = contributions as Day[];

function stats(list: Day[]) {
  let longest = 0;
  let run = 0;
  let active = 0;
  let best = list[0];
  for (const d of list) {
    if (d[1] > 0) {
      active++;
      run++;
      longest = Math.max(longest, run);
    } else run = 0;
    if (d[1] > best[1]) best = d;
  }
  const bestDate = new Date(`${best[0]}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  return { longest, active, best: best[1], bestDate };
}

const nav = [
  { href: "#work", label: "Work" },
  { href: "#archive", label: "Archive" },
  { href: "#activity", label: "Activity" },
  { href: "#about", label: "About" },
];

export default function Home() {
  const s = stats(days);
  const contact = profile.email ? `mailto:${profile.email}` : profile.github;

  return (
    <>
      <LavaField />
      <div aria-hidden className="grain" />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-bone focus:px-4 focus:py-2 focus:text-ground"
      >
        Skip to work
      </a>

      {/* ---------- Navigation ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[linear-gradient(rgb(12_5_4/0.92),rgb(12_5_4/0.6))] backdrop-blur-md">
        <nav aria-label="Main" className="wrap flex h-18 items-center justify-between gap-6 py-5">
          <a href="#top" className="font-display text-lg font-extrabold tracking-[-0.04em] no-underline" aria-label="Ankhbayar Munkhbaatar, back to top">
            A<span className="text-lava">.</span>M
          </a>
          <ul className="hidden items-center gap-8 text-sm md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-ash no-underline transition-colors duration-300 hover:text-bone">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="link-arrow rounded-[2px] border border-[var(--rule)] px-4 py-2 text-sm hover:border-amber">
            Contact <ArrowUpRight />
          </a>
        </nav>
      </header>

      <main>
        {/* ---------- First viewport ---------- */}
        <section id="top" className="relative flex min-h-[min(100svh,64rem)] flex-col overflow-hidden pt-24 md:pt-28">
          <div className="wrap relative z-10 w-full md:pt-[8vh]">
            <p className="max-w-[26ch] text-[1.4rem] leading-[1.45] text-bone md:max-w-[22ch]">
              I build booking flows, payments and the admin screens behind them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="#work" className="btn-molten">
                See the Aroma case study <ArrowDown />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link-arrow text-bone">
                <GitHubMark /> {profile.githubHandle}
              </a>
            </div>
          </div>

          {/* The featured work rises out of the heat, right-lower, dissolving into the lava under the name */}
          <figure className="relative mx-[var(--gutter)] mt-12 md:absolute md:right-[var(--gutter)] md:top-[20%] md:mx-0 md:mt-0 md:w-[min(56vw,62rem)]">
            <figcaption className="mb-3 flex items-baseline justify-between gap-4 text-sm text-bone">
              <span>Now showing: {aroma.name}</span>
              <span className="font-data">{aroma.year}</span>
            </figcaption>
            <a
              href="#work"
              aria-label="Featured work: Aroma Beauty Clinic & Spa"
              className="block"
              style={{
                maskImage:
                  "linear-gradient(to bottom, #000 34%, transparent 78%), linear-gradient(to left, transparent 0, #000 10%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 34%, transparent 78%), linear-gradient(to left, transparent 0, #000 10%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <HazeImage
                src={aroma.shots[0].src}
                alt={aroma.shots[0].alt}
                width={1440}
                height={900}
                sizes="(min-width: 768px) 56vw, 92vw"
                preload
                glide={30}
                heat={22}
                className="overflow-hidden"
              />
            </a>
          </figure>

          <h1 className="wrap relative z-10 mt-auto w-full pb-6 pt-0 max-md:-mt-[18vw] md:pb-8">
            <span className="font-display block text-[clamp(3rem,12.6vw,14rem)] font-extrabold leading-[0.86] tracking-[-0.045em] [text-shadow:0_4px_40px_rgb(12_5_4/0.45)]">
              {profile.firstName}
            </span>
            <span className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 md:mt-5">
              <span className="block">
                <span className="font-display block text-[clamp(1.25rem,3.2vw,3rem)] font-normal tracking-[-0.03em] text-bone">
                  {profile.lastName}
                </span>
                <span className="mt-2 block text-base text-bone md:text-lg">
                  {profile.role} · {profile.location}
                </span>
              </span>
              <span lang="mn" className="font-display text-[clamp(1rem,1.8vw,1.6rem)] font-normal tracking-[-0.02em] text-bone">
                {profile.cyrillic}
              </span>
            </span>
          </h1>
        </section>

        {/* ---------- Case study ---------- */}
        <section id="work" aria-labelledby="work-title" className="veil scroll-mt-10 pt-[var(--section)]">
          <div className="wrap">
            <div className="grid gap-10 md:grid-cols-12 md:gap-6">
              <h2 id="work-title" className="font-display text-[clamp(2.4rem,6.4vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.04em] md:col-span-8">
                Aroma Beauty Clinic <span className="text-lava">&amp;</span> Spa
              </h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 self-end text-sm md:col-span-4">
                <dt className="text-soot">Year</dt>
                <dd className="font-data">{aroma.year}</dd>
                <dt className="text-soot">Stack</dt>
                <dd className="text-ash">{aroma.stack.join(", ")}</dd>
                <dt className="text-soot">Links</dt>
                <dd className="flex gap-5">
                  <a href={aroma.live} target="_blank" rel="noreferrer" className="link-arrow">
                    Visit site <ArrowUpRight />
                  </a>
                  <a href={aroma.code} target="_blank" rel="noreferrer" className="link-arrow text-ash">
                    Code <ArrowUpRight />
                  </a>
                </dd>
              </dl>
            </div>

            <p className="mt-12 max-w-[52ch] text-[1.4rem] leading-[1.55] md:mt-16">{aroma.summary}</p>

            {/* Screens glide past in the heat */}
            <div className="mt-[var(--section)] space-y-[clamp(5rem,12vw,10rem)]">
              {aroma.shots.map((shot, i) => {
                const flip = i % 2 === 1;
                return (
                  <figure key={shot.src} className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
                    <HazeImage
                      src={shot.src}
                      alt={shot.alt}
                      width={1440}
                      height={900}
                      sizes="(min-width: 768px) 66vw, 92vw"
                      glide={i === 0 ? 50 : 80}
                      className={`overflow-hidden ring-1 ring-[var(--rule)] md:col-span-8 ${flip ? "md:col-start-5 md:row-start-1" : ""}`}
                    />
                    <figcaption className={`md:col-span-4 md:row-start-1 ${flip ? "md:col-start-1 md:pr-6" : "md:col-start-9 md:pl-6"}`}>
                      <h3 className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{shot.title}</h3>
                      <p className="mt-3 max-w-[38ch] text-ash">{shot.caption}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            {/* Engineering underneath */}
            <div className="mt-[var(--section)] grid gap-10 md:grid-cols-12 md:gap-6">
              <h3 className="font-display text-[clamp(1.8rem,3.6vw,3.25rem)] font-extrabold leading-[1] tracking-[-0.035em] md:col-span-4">
                What runs underneath
              </h3>
              <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-8">
                {aroma.engineering.map((e) => (
                  <div key={e.title} className="rule border-t pt-5">
                    <dt className="font-display text-base font-semibold text-bone">{e.title}</dt>
                    <dd className="mt-2 text-ash">{e.body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Demonstration */}
            <div className="mt-[var(--section)]">
              <div className="grid gap-6 md:grid-cols-12">
                <h3 className="font-display text-[clamp(1.8rem,3.6vw,3.25rem)] font-extrabold leading-[1] tracking-[-0.035em] md:col-span-5">
                  Try the scheduler
                </h3>
                <p className="max-w-[56ch] text-ash md:col-span-6 md:col-start-7">
                  This grid follows Aroma&apos;s booking rules: half-hour slots, five therapists, last order at 19:00,
                  everyone in a group starting together. The bookings already on it are a sample day, not real
                  salon data.
                </p>
              </div>
              <div className="mt-10">
                <SlotDemo />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Archive ---------- */}
        <section id="archive" aria-labelledby="archive-title" className="veil scroll-mt-10 pt-[var(--section)]">
          <div className="wrap">
            <div className="mb-12 grid gap-6 md:grid-cols-12">
              <h2 id="archive-title" className="font-display text-[clamp(2.4rem,6.4vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.04em] md:col-span-7">
                Everything else
              </h2>
              <p className="max-w-[40ch] self-end text-ash md:col-span-4 md:col-start-9">
                Nineteen public repositories since June 2026, from JavaScript drills to full-stack apps. These are the
                ones worth opening.
              </p>
            </div>
            <Archive items={archive} />
          </div>
        </section>

        {/* ---------- Activity ---------- */}
        <section id="activity" aria-labelledby="activity-title" className="veil scroll-mt-10 pt-[var(--section)]">
          <div className="wrap">
            <div className="mb-12 grid gap-6 md:grid-cols-12">
              <h2 id="activity-title" className="font-display text-[clamp(2.4rem,6.4vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.04em] md:col-span-8">
                <span className="text-lava">{profile.contributionsLastYear}</span> contributions in the last year
              </h2>
              <p className="max-w-[40ch] self-end text-ash md:col-span-4">
                Active on {s.active} days. The longest run was {s.longest} days in a row, and the busiest day,{" "}
                {s.bestDate}, saw {s.best}.{" "}
                <a href={profile.github} target="_blank" rel="noreferrer" className="link-arrow text-bone">
                  Full graph on GitHub <ArrowUpRight />
                </a>
              </p>
            </div>
            <ContributionGraph
              days={days}
              summary={`GitHub contribution calendar for the last year: active on ${s.active} days, longest streak ${s.longest} days, busiest day ${s.best} contributions on ${s.bestDate}.`}
            />
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" aria-labelledby="about-title" className="veil scroll-mt-10 pt-[var(--section)]">
          <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4">
              <div className="relative aspect-[4/5] w-full max-w-[14rem] overflow-hidden ring-1 ring-[var(--rule)] md:max-w-sm bg-[radial-gradient(80%_60%_at_50%_100%,var(--ember),var(--deep)_55%,var(--ground))]">
                {profile.photo ? (
                  <Image
                    src={profile.photo}
                    alt={`Portrait of ${profile.firstName} ${profile.lastName}`}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-cover"
                  />
                ) : (
                  <span aria-hidden className="font-display absolute inset-0 grid place-items-center text-[clamp(5rem,12vw,9rem)] font-extrabold tracking-[-0.06em] text-[rgb(244_230_220/0.14)]">
                    AM
                  </span>
                )}
              </div>
              {!profile.photo && <p className="mt-3 text-sm text-ash">Portrait coming soon.</p>}
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <h2 id="about-title" className="font-display text-[clamp(2.4rem,6.4vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
                Loves to learn
              </h2>
              <div className="mt-10 max-w-[60ch] space-y-5 text-ash">
                <p>
                  I&apos;m {profile.firstName}, a full-stack developer from Mongolia. I wrote my first JavaScript exercise in
                  June 2026. Five months later I had built a booking platform with group scheduling, QPay payments and
                  tax receipts for a spa in Ulaanbaatar.
                </p>
                <p>
                  I like the parts of a product that have to be right: a time slot that can really be staffed, a payment
                  that settles, a form that tells you what went wrong. I&apos;m looking for a team to learn from, and for
                  businesses that need something built.
                </p>
              </div>

              <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {skills.map((g) => (
                  <div key={g.group} className="rule border-t pt-4">
                    <dt className="text-sm text-soot">{g.group}</dt>
                    <dd className="mt-2 text-bone">{g.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------- Close ---------- */}
        <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-10 bg-[linear-gradient(var(--veil),rgb(12_5_4/0.5)_75%,rgb(12_5_4/0.78))] pb-10 pt-[var(--section)]">
          <div className="wrap">
            <h2 id="contact-title" className="font-display max-w-[14ch] text-[clamp(2.8rem,9vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
              Have something to build<span className="text-lava">?</span>
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-6">
              <p className="max-w-[44ch] text-[1.4rem] leading-[1.45] md:col-span-5">
                I&apos;m open to a developer role and to freelance work: booking systems, online shops, internal tools.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:col-start-7 md:justify-end">
                <a href={contact} target={profile.email ? undefined : "_blank"} rel="noreferrer" className="btn-molten text-lg">
                  {profile.email ? (
                    <>
                      <MailIcon size={18} /> {profile.email}
                    </>
                  ) : (
                    <>
                      GitHub profile <ArrowUpRight size={16} />
                    </>
                  )}
                </a>
                {profile.email && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="link-arrow">
                    <GitHubMark /> GitHub
                  </a>
                )}
              </div>
            </div>

            <footer className="rule mt-[var(--section)] flex flex-wrap items-baseline justify-between gap-4 border-t pt-6 text-sm text-bone">
              <span>
                © 2026 {profile.firstName} {profile.lastName}
              </span>
              <span lang="mn">{profile.cyrillic}</span>
              <a href="#top" className="link-arrow">
                Back to top
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
