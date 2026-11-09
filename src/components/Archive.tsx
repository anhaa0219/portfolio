"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ArchiveItem } from "@/data/site";
import { ArrowUpRight } from "./Icons";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const label = (ym: string) => {
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
};

export function Archive({ items }: { items: ArchiveItem[] }) {
  const [shown, setShown] = useState<ArchiveItem | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // The preview trails the cursor with a little lag, like something carried on hot air.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const move = (e: PointerEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    const tick = () => {
      const p = pos.current;
      const k = reduce ? 1 : 0.14;
      p.x += (p.tx - p.x) * k;
      p.y += (p.ty - p.y) * k;
      if (preview.current) {
        const tilt = reduce ? 0 : Math.max(-6, Math.min(6, (p.tx - p.x) * 0.05));
        preview.current.style.transform = `translate3d(${p.x + 28}px, ${p.y - 110}px, 0) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div onMouseLeave={() => setShown(null)}>
      <ul className="rule border-t">
        {items.map((item) => (
          <li
            key={item.name}
            onMouseEnter={() => setShown(item.image ? item : null)}
            className="group rule relative grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 border-b py-6 transition-colors duration-500 hover:bg-[rgb(255_58_28/0.05)] md:grid-cols-[7rem_minmax(0,1.1fr)_minmax(0,1.4fr)_8.5rem] md:items-baseline md:gap-x-8 md:py-7"
          >
            <span className="font-data col-span-2 text-sm text-ash md:col-span-1">{label(item.date)}</span>
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-amber md:text-2xl">
              {item.name}
            </h3>
            <div className="col-span-2 max-w-[60ch] md:col-span-1">
              <p className="text-ash">{item.description}</p>
              <p className="font-data mt-1 text-xs text-soot">{item.stack}</p>
            </div>
            <div className="col-span-2 flex gap-5 text-sm md:col-span-1 md:justify-end">
              {item.live && (
                <a href={item.live} target="_blank" rel="noreferrer" className="link-arrow">
                  Live <ArrowUpRight />
                  <span className="sr-only">: {item.name}</span>
                </a>
              )}
              <a href={item.code} target="_blank" rel="noreferrer" className="link-arrow text-ash">
                Code <ArrowUpRight />
                <span className="sr-only">: {item.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[22rem] [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div
          className="overflow-hidden ring-1 ring-[var(--rule)] transition-[opacity,scale,filter] duration-500"
          style={{
            opacity: shown ? 1 : 0,
            scale: shown ? "1" : "0.92",
            filter: shown ? "blur(0)" : "blur(8px)",
            transitionTimingFunction: "var(--ease-out)",
          }}
        >
          {items
            .filter((i) => i.image)
            .map((i) => (
              <Image
                key={i.name}
                src={i.image!}
                alt=""
                width={1440}
                height={900}
                sizes="22rem"
                className={i.name === shown?.name ? "block h-auto w-full" : "hidden"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
