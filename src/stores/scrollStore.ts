import * as THREE from 'three';

export interface ChamberMilestone {
  chamber: number;
  t: number;
  label: string;
  title: string;
}

export const CHAMBER_MILESTONES: ChamberMilestone[] = [
  { chamber: 0, t: 0.00, label: '00 // AWAKENING', title: 'THE GAZE' },
  { chamber: 1, t: 0.08, label: '01 // ORIGIN', title: 'THE STOIC VOID' },
  { chamber: 2, t: 0.22, label: '02 // SPARK', title: 'THE SCHOOLING GATES' },
  { chamber: 3, t: 0.38, label: '03 // FRACTURE', title: 'THE 2020 BLACKOUT' },
  { chamber: 4, t: 0.55, label: '04 // ABYSS', title: 'DEFENCE & DEBARRED' },
  { chamber: 5, t: 0.72, label: '05 // THE FIVE', title: 'THE REMAINING FIVE' },
  { chamber: 6, t: 0.86, label: '06 // EMPIRE', title: 'THE CITADEL AT 21' },
  { chamber: 7, t: 0.98, label: '07 // SIGNAL', title: 'THE MANIFESTO' },
];

export function getChamberFromProgress(t: number): number {
  if (t < 0.05) return 0;
  if (t < 0.17) return 1;
  if (t < 0.31) return 2;
  if (t < 0.46) return 3;
  if (t < 0.66) return 4;
  if (t < 0.79) return 5;
  if (t < 0.93) return 6;
  return 7;
}

export class ScrollStore {
  public target: number = 0;
  public current: number = 0;
  public chamber: number = 0;
  private listeners: Set<(chamber: number) => void> = new Set();

  public subscribeChamber(fn: (chamber: number) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  public setTarget(val: number) {
    this.target = THREE.MathUtils.clamp(val, 0, 1);
  }

  public addTargetDelta(delta: number) {
    this.target = THREE.MathUtils.clamp(this.target + delta, 0, 1);
  }

  public updateDamped(deltaSec: number): number {
    this.current = THREE.MathUtils.damp(this.current, this.target, 6.0, deltaSec);
    const newChamber = getChamberFromProgress(this.current);
    if (newChamber !== this.chamber) {
      this.chamber = newChamber;
      this.listeners.forEach((fn) => fn(newChamber));
    }
    return this.current;
  }
}

export const globalScroll = new ScrollStore();
