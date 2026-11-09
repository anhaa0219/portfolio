"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

// Metaball lava lamp: slow blobs rise and sink, pooled heat along the bottom.
const FRAG = `
precision mediump float;
uniform vec2 r;
uniform float t;
uniform float k;

float blob(vec2 p, vec2 c, float rad) {
  vec2 d = p - c;
  return rad * rad / max(dot(d, d), 1e-4);
}

void main() {
  vec2 uv = gl_FragCoord.xy / r;
  float a = r.x / r.y;
  vec2 p = vec2(uv.x * a, uv.y);

  float f = 0.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    float sx = 0.05 + 0.017 * fi;
    float sy = 0.04 + 0.013 * mod(fi * 7.0, 5.0);
    vec2 c = vec2(
      a * (0.5 + 0.46 * sin(t * sx + fi * 1.9)),
      0.5 + 0.62 * sin(t * sy + fi * 2.7)
    );
    float rad = 0.13 + 0.06 * sin(fi * 3.1 + 1.0) + 0.025 * sin(t * 0.3 + fi);
    f += blob(p, c, rad);
  }
  // pooled heat at the floor, rippling slowly
  f += 0.7 * smoothstep(0.42, 0.0, uv.y + 0.05 * sin(uv.x * 5.0 + t * 0.25));

  vec3 ground = vec3(0.047, 0.020, 0.016);
  vec3 deep   = vec3(0.30, 0.025, 0.015);
  vec3 ember  = vec3(0.70, 0.07, 0.035);
  vec3 lava   = vec3(1.0, 0.24, 0.10);
  vec3 amber  = vec3(1.0, 0.60, 0.30);

  vec3 col = ground;
  col = mix(col, deep,  smoothstep(0.35, 0.95, f));
  col = mix(col, ember, smoothstep(0.95, 1.35, f));
  col = mix(col, lava,  smoothstep(1.35, 2.6, f));
  col = mix(col, amber, smoothstep(4.5, 9.0, f) * 0.4);

  // keep the upper-left reading area cooler
  float cool = smoothstep(0.95, 0.15, distance(uv, vec2(0.08, 0.72)));
  col = mix(col, ground, cool * 0.45);

  // vignette
  float v = smoothstep(1.25, 0.35, distance(uv, vec2(0.5, 0.45)));
  col *= mix(0.55, 1.0, v);

  col = mix(ground, col, k);
  gl_FragColor = vec4(col, 1.0);
}
`;

export function LavaField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return; // CSS fallback gradient stays visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uK = gl.getUniformLocation(prog, "k");

    // Render at reduced resolution; the blur of the lamp hides it and it keeps phones cool.
    const SCALE = 0.45;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uR, w, h);
      // Small screens put text over more of the field: run it cooler there.
      gl.uniform1f(uK, canvas.clientWidth < 768 ? 0.62 : 0.85);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = performance.now() - 40_000; // start mid-drift so blobs are already spread
    let raf = 0;
    let running = true;

    const draw = (now: number) => {
      resize();
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.ready = "1";
    };
    const loop = (now: number) => {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const play = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches || document.hidden) {
        running = false;
        draw(performance.now());
      } else {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    play();
    reduce.addEventListener("change", play);
    document.addEventListener("visibilitychange", play);
    window.addEventListener("resize", play);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      reduce.removeEventListener("change", play);
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("resize", play);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Fallback before WebGL paints (or without it) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 85%, #8a0f07 0%, transparent 70%), radial-gradient(40% 35% at 20% 100%, #5c0905 0%, transparent 70%), #0c0504",
        }}
      />
      <canvas
        ref={ref}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[2000ms] data-[ready]:opacity-100"
        style={{ filter: "blur(6px) saturate(115%)", transform: "scale(1.04)" }}
      />
    </div>
  );
}
