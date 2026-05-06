const YM_ID = 106875173;

export function ymGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).ym !== 'function') return;
  (window as any).ym(YM_ID, 'reachGoal', goal, params);
}
