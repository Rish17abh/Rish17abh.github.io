export type PointerSample = { x: number; y: number; t: number; vx: number; vy: number; acceleration: number };
export function samplePointer(previous: PointerSample | null, x: number, y: number, t: number): PointerSample {
  if (!previous || t - previous.t > 120 || t <= previous.t) return { x, y, t, vx: 0, vy: 0, acceleration: 0 };
  const dt = Math.max(8, t - previous.t) / 1000;
  const vx = (x - previous.x) / dt; const vy = (y - previous.y) / dt;
  const magnitude = Math.hypot(vx - previous.vx, vy - previous.vy) / dt;
  const acceleration = Math.min(1, magnitude / 45000) * .55 + previous.acceleration * .45;
  return { x, y, t, vx, vy, acceleration };
}
