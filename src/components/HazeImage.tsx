"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  preload?: boolean;
  /** Pixels of vertical glide across the viewport. */
  glide?: number;
  /** Strongest displacement, at the viewport edges. */
  heat?: number;
};

/**
 * An image seen through rising heat: the displacement is strongest at the
 * viewport edges and cools to sharp as the image reaches the centre, while
 * the frame glides a little slower than the scroll.
 */
export function HazeImage({ src, alt, width, height, className, sizes, preload, glide = 60, heat = 26 }: Props) {
  const id = "haze" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const frame = useRef<HTMLDivElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || !turb.current || !disp.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      disp.current.setAttribute("scale", "0");
      return;
    }

    let raf = 0;
    let visible = false;
    const tick = (now: number) => {
      if (!visible) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const offset = (rect.top + rect.height / 2 - vh / 2) / vh; // -1..1 roughly
      const dist = Math.min(1, Math.abs(offset));
      const narrow = window.innerWidth < 768 ? 0.45 : 1;
      const scale = (1 + heat * Math.pow(dist, 1.6)) * narrow;
      disp.current!.setAttribute("scale", scale.toFixed(2));
      const s = now / 1000;
      turb.current!.setAttribute(
        "baseFrequency",
        `${(0.006 + 0.002 * Math.sin(s * 0.7)).toFixed(4)} ${(0.032 + 0.008 * Math.sin(s * 1.1)).toFixed(4)}`,
      );
      el.style.transform = `translate3d(0, ${(-offset * glide).toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [glide, heat]);

  return (
    <>
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id={id} x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.006 0.032" numOctaves={2} seed={7} />
          <feDisplacementMap ref={disp} in="SourceGraphic" scale={2} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div ref={frame} className={`haze ${className ?? ""}`}>
        {/* Overscan inside a clip so displaced edges never show torn pixels */}
        <div className="scale-[1.06]" style={{ filter: `url(#${id})` }}>
          <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          preload={preload}
          className="block h-auto w-full"
          />
        </div>
      </div>
    </>
  );
}
