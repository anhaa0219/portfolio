"use client";

import { useState } from "react";

export type Day = [date: string, count: number, level: number];

const HEAT = ["rgb(244 230 220 / 0.06)", "#5c0905", "#a3120a", "#ff3a1c", "#ff9a4a"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const parse = (d: string) => new Date(`${d}T00:00:00Z`);
const longDate = (d: string) =>
  parse(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function ContributionGraph({ days, summary }: { days: Day[]; summary: string }) {
  const [active, setActive] = useState<Day | null>(null);

  // Pad to start on Sunday so columns are weeks.
  const firstDow = parse(days[0][0]).getUTCDay();
  const cells: (Day | null)[] = [...Array(firstDow).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Label a column when its week starts a new month (GitHub's convention).
  const monthLabels = weeks.map((w, i) => {
    const first = w.find(Boolean);
    if (!first) return null;
    const m = parse(first[0]).getUTCMonth();
    const prevFirst = i > 0 ? weeks[i - 1].find(Boolean) : null;
    if (prevFirst && parse(prevFirst[0]).getUTCMonth() === m) return null;
    if (i === 0 && parse(first[0]).getUTCDate() > 21) return null; // too little of the month to label
    return MONTHS[m];
  });

  return (
    <div>
      {/* dir=rtl makes narrow screens open on the newest weeks, where the activity is */}
      <div dir="rtl" className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-3">
        <div dir="ltr" role="img" aria-label={summary} className="inline-grid min-w-full gap-[3px]" style={{ gridTemplateColumns: `2.25rem repeat(${weeks.length}, minmax(0.6rem, 1fr))` }}>
          <span />
          {monthLabels.map((m, i) => (
            <span key={i} className="font-data h-5 overflow-visible whitespace-nowrap text-[0.7rem] text-ash">
              {m}
            </span>
          ))}
          {DOW.map((dow, r) => (
            <Row key={dow} label={r % 2 === 1 ? dow : ""} weeks={weeks} r={r} setActive={setActive} />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-ash">
        <p aria-live="polite" className="min-h-[1.6em] text-bone">
          {active
            ? `${active[1] === 0 ? "No" : active[1]} contribution${active[1] === 1 ? "" : "s"} · ${longDate(active[0])}`
            : "Hover or tap a day to read it."}
        </p>
        <div className="flex items-center gap-2">
          <span>Cool</span>
          {HEAT.map((c) => (
            <i key={c} className="block size-3 rounded-[2px]" style={{ background: c }} />
          ))}
          <span>Molten</span>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  weeks,
  r,
  setActive,
}: {
  label: string;
  weeks: (Day | null)[][];
  r: number;
  setActive: (d: Day | null) => void;
}) {
  return (
    <>
      <span className="font-data pr-2 text-[0.68rem] leading-none text-ash">{label}</span>
      {weeks.map((w, i) => {
        const d = w[r];
        if (!d) return <span key={i} />;
        return (
          <span
            key={i}
            title={`${d[1]} contributions · ${longDate(d[0])}`}
            onMouseEnter={() => setActive(d)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(d)}
            className="aspect-square w-full rounded-[2px] outline-offset-1 transition-transform duration-200 hover:scale-125"
            style={{
              background: HEAT[d[2]],
              boxShadow: d[2] >= 3 ? `0 0 10px -1px ${HEAT[d[2]]}` : undefined,
            }}
          />
        );
      })}
    </>
  );
}
