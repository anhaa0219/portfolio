"use client";

import { useMemo, useState } from "react";

// Mirrors Aroma's src/lib/schedule.js: 09:00 open, 19:00 last order, 20:00 close,
// 30-minute grid, five therapists, durations rounded up to the grid.
const OPEN = 9 * 60;
const CLOSE = 20 * 60;
const LAST_ORDER = 19 * 60;
const STEP = 30;
const WORKERS = 5;
const CELLS = (CLOSE - OPEN) / STEP; // 22
const LAST_START_CELL = (LAST_ORDER - OPEN) / STEP; // 20

const TREATMENTS = [
  { id: "massage", label: "Relaxing massage", minutes: 60 },
  { id: "seventy", label: "A 70-min treatment", minutes: 70 },
  { id: "jasmin", label: "Jasmin Spa", minutes: 90 },
  { id: "lavanda", label: "Lavanda Spa", minutes: 120 },
];

type Booking = { start: number; cells: number; people: number; sample?: boolean };

// Sample day, not real salon data.
const SAMPLE: Booking[] = [
  { start: 0, cells: 3, people: 2, sample: true },
  { start: 2, cells: 4, people: 2, sample: true },
  { start: 6, cells: 2, people: 4, sample: true },
  { start: 9, cells: 4, people: 3, sample: true },
  { start: 12, cells: 2, people: 5, sample: true },
  { start: 15, cells: 3, people: 2, sample: true },
  { start: 17, cells: 4, people: 1, sample: true },
];

const time = (cell: number) => {
  const m = OPEN + cell * STEP;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

export function SlotDemo() {
  const [treatment, setTreatment] = useState(TREATMENTS[2]);
  const [people, setPeople] = useState(2);
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE);
  const [hover, setHover] = useState<number | null>(null);
  const [last, setLast] = useState<string | null>(null);

  const blocks = Math.ceil(treatment.minutes / STEP);

  const load = useMemo(() => {
    const l = Array(CELLS).fill(0) as number[];
    for (const b of bookings) for (let c = b.start; c < b.start + b.cells; c++) l[c] += b.people;
    return l;
  }, [bookings]);

  const mine = useMemo(() => {
    const l = Array(CELLS).fill(0) as number[];
    for (const b of bookings) if (!b.sample) for (let c = b.start; c < b.start + b.cells; c++) l[c] += b.people;
    return l;
  }, [bookings]);

  const fits = (start: number) => {
    if (start > LAST_START_CELL || start + blocks > CELLS) return false;
    for (let c = start; c < start + blocks; c++) if (load[c] + people > WORKERS) return false;
    return true;
  };

  const book = (start: number) => {
    if (!fits(start)) return;
    setBookings((b) => [...b, { start, cells: blocks, people }]);
    setLast(
      `Booked ${people} × ${treatment.label} at ${time(start)}. ${treatment.minutes} min blocks ${blocks * STEP} min, until ${time(start + blocks)}.`,
    );
  };

  const preview = hover !== null && fits(hover) ? hover : null;

  return (
    <div className="rule border-t pt-8">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <fieldset>
          <legend className="mb-3 text-sm text-ash">Treatment</legend>
          <div className="flex flex-wrap gap-2">
            {TREATMENTS.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={t.id === treatment.id}
                onClick={() => setTreatment(t)}
                className="rounded-[2px] border border-[var(--rule)] px-4 py-2 text-sm transition-colors duration-300 hover:border-amber aria-pressed:border-lava aria-pressed:bg-lava aria-pressed:text-ground"
              >
                {t.label} <span className="font-data opacity-70">{t.minutes}′</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm text-ash">People in the group</legend>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={n === people}
                onClick={() => setPeople(n)}
                className="font-data size-10 rounded-[2px] border border-[var(--rule)] text-sm transition-colors duration-300 hover:border-amber aria-pressed:border-lava aria-pressed:bg-lava aria-pressed:text-ground"
              >
                {n}
              </button>
            ))}
          </div>
        </fieldset>
        <button
          type="button"
          onClick={() => {
            setBookings(SAMPLE);
            setLast(null);
          }}
          className="link-arrow text-sm text-ash underline decoration-[var(--rule)] underline-offset-4 hover:text-amber"
        >
          Reset the day
        </button>
      </div>

      <div className="mt-10 -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-2">
        <div className="min-w-[44rem]">
          {/* Therapist lanes: filled bottom-up by how many people each half hour holds */}
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${CELLS}, minmax(0, 1fr))` }}
            onMouseLeave={() => setHover(null)}
          >
            {Array.from({ length: WORKERS }).map((_, rowFromTop) => {
              const lane = WORKERS - rowFromTop; // 5..1
              return Array.from({ length: CELLS }).map((__, c) => {
                const taken = load[c] >= lane;
                const ownTaken = taken && lane > load[c] - mine[c];
                const inPreview = preview !== null && c >= preview && c < preview + blocks && lane > load[c] && lane <= load[c] + people;
                return (
                  <div
                    key={`${lane}-${c}`}
                    className="h-7 rounded-[2px] transition-colors duration-300"
                    style={{
                      background: inPreview
                        ? "var(--amber)"
                        : ownTaken
                          ? "var(--lava)"
                          : taken
                            ? "var(--deep)"
                            : "rgb(244 230 220 / 0.05)",
                    }}
                  />
                );
              });
            })}
          </div>

          {/* Start-time buttons */}
          <div
            className="mt-3 grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${CELLS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: CELLS }).map((_, c) => {
              const ok = fits(c);
              const label = time(c);
              return (
                <button
                  key={c}
                  type="button"
                  disabled={!ok}
                  onMouseEnter={() => setHover(c)}
                  onFocus={() => setHover(c)}
                  onBlur={() => setHover(null)}
                  onClick={() => book(c)}
                  aria-label={ok ? `Book at ${label}` : `${label} unavailable`}
                  className="font-data group flex h-14 flex-col items-center justify-start rounded-[2px] pt-1 text-[0.68rem] leading-none text-bone transition-colors duration-200 enabled:hover:bg-[rgb(255_154_74/0.14)] disabled:cursor-not-allowed disabled:text-soot disabled:line-through"
                >
                  {c % 2 === 0 ? label : <span className="opacity-60">:30</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ash">
        <span className="flex items-center gap-2"><i className="block size-3 rounded-[2px] bg-deep" /> Sample bookings</span>
        <span className="flex items-center gap-2"><i className="block size-3 rounded-[2px] bg-lava" /> Yours</span>
        <span className="flex items-center gap-2"><i className="block size-3 rounded-[2px] bg-amber" /> Would block</span>
        <span className="font-data text-soot">5 therapists · 09:00 – 20:00</span>
      </div>
      <p aria-live="polite" className="mt-4 min-h-[1.6em] text-bone">
        {last ?? "Pick a start time. Times that would overrun closing or need more than five therapists are struck out."}
      </p>
    </div>
  );
}
