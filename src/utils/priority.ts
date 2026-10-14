import { PriorityBand, PriorityFactors } from '../types';

/**
 * Priority Score Formula (as specified in Master Prompt):
 * Priority Score = 0.40*S + 0.25*R + 0.20*D + 0.15*U
 * All sub-factors are normalized to [0, 100].
 */
export function calculatePriorityScore(factors: Omit<PriorityFactors, 'formulaExplanation'>): {
  score: number;
  band: PriorityBand;
  factors: PriorityFactors;
} {
  const S = Math.max(0, Math.min(100, factors.severity));
  const R = Math.max(0, Math.min(100, factors.recurrence));
  const D = Math.max(0, Math.min(100, factors.durationScore));
  const U = Math.max(0, Math.min(100, factors.communityImpact));

  const weightedScore = (0.40 * S) + (0.25 * R) + (0.20 * D) + (0.15 * U);
  const roundedScore = Math.round(weightedScore);

  let band: PriorityBand = 'low';
  if (roundedScore >= 85) band = 'critical';
  else if (roundedScore >= 65) band = 'high';
  else if (roundedScore >= 35) band = 'medium';
  else band = 'low';

  const explanation = `Score calculated as (40% × Severity ${S}) + (25% × Recurrence ${R}) + (20% × Duration ${D}) + (15% × Community Impact ${U}) = ${roundedScore}/100.`;

  return {
    score: roundedScore,
    band,
    factors: {
      ...factors,
      severity: S,
      recurrence: R,
      durationScore: D,
      communityImpact: U,
      formulaExplanation: explanation,
    },
  };
}

export function computeDurationScore(createdAtDate: string | Date): { days: number; score: number } {
  const created = new Date(createdAtDate);
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - created.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // 1 day ~ 5 pts, 14 days ~ 60 pts, 30+ days = 100 pts max
  const score = Math.min(100, Math.round(days * 3.33));
  return { days, score };
}
