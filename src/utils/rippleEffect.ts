import { Report, CivicRippleEffect, CivicRippleNode } from '../types';
import { getHaversineDistanceMeters } from './geo';

/**
 * Civic Ripple Effect Engine
 * Evaluates systemic causality between co-located civic problems (&le;400m):
 * - Blocked drainage -> waterlogging & road asphalt erosion (potholes)
 * - Garbage dumps -> drain choking & sanitation hazards
 * - Road craters -> traffic bottlenecks & vehicle damage
 */
export function computeCivicRippleEffect(
  primaryReport: Report,
  allReports: Report[]
): CivicRippleEffect {
  const chainNodes: CivicRippleNode[] = [];

  for (const other of allReports) {
    if (other.id === primaryReport.id) continue;
    if (other.status === 'resolved' || other.status === 'rejected') continue;

    const dist = getHaversineDistanceMeters(
      primaryReport.latitude,
      primaryReport.longitude,
      other.latitude,
      other.longitude
    );

    if (dist <= 400) {
      // Determine causality relationship
      let relationship: 'root_cause' | 'cascading_effect' | 'correlated_cluster' = 'correlated_cluster';
      let explanation = `Co-located within ${dist}m in ${primaryReport.areaName}.`;

      if (primaryReport.category === 'pothole' && other.category === 'drainage') {
        relationship = 'root_cause';
        explanation = `Root Cause Detected: Drainage overflow ${dist}m away saturates road sub-base, accelerating bitumen degradation and pothole formation.`;
      } else if (primaryReport.category === 'drainage' && other.category === 'pothole') {
        relationship = 'cascading_effect';
        explanation = `Cascading Impact: Stagnant runoff from this blocked drain flows into nearby road surface, expanding crater depth.`;
      } else if (primaryReport.category === 'garbage' && other.category === 'drainage') {
        relationship = 'root_cause';
        explanation = `Clogging Trigger: Windblown plastic & waste from this dump drifts into storm drain chambers within ${dist}m.`;
      } else if (primaryReport.category === 'drainage' && other.category === 'garbage') {
        relationship = 'cascading_effect';
        explanation = `Accumulation Risk: Standing backwater prevents waste clearance and exacerbates vector health hazards.`;
      } else if (primaryReport.category === other.category) {
        relationship = 'correlated_cluster';
        explanation = `Localized Density: Consecutive ${primaryReport.category} failure within ${dist}m indicates systemic infrastructure wear.`;
      }

      chainNodes.push({
        reportId: other.id,
        title: other.title,
        category: other.category,
        distanceMeters: dist,
        relationship,
        explanation,
      });
    }
  }

  // Sort by root causes first, then distance
  chainNodes.sort((a, b) => {
    if (a.relationship === 'root_cause' && b.relationship !== 'root_cause') return -1;
    if (b.relationship === 'root_cause' && a.relationship !== 'root_cause') return 1;
    return a.distanceMeters - b.distanceMeters;
  });

  const rootCausesCount = chainNodes.filter((n) => n.relationship === 'root_cause').length;
  const cascadingCount = chainNodes.filter((n) => n.relationship === 'cascading_effect').length;

  let systemicRiskSummary = 'Isolated civic issue. No critical multi-hazard cascading chain detected within 400 meters.';
  if (rootCausesCount > 0) {
    systemicRiskSummary = `Systemic Ripple Alert: This issue is directly exacerbated by ${rootCausesCount} upstream root cause(s). Fixing this in isolation without addressing nearby drainage/dumps will lead to recurring failure within 30 days.`;
  } else if (cascadingCount > 0) {
    systemicRiskSummary = `High Ripple Potential: Left unaddressed, this issue triggers ${cascadingCount} cascading hazard(s) across the neighborhood.`;
  } else if (chainNodes.length > 0) {
    systemicRiskSummary = `Cluster Correlation: Part of an active ${chainNodes.length}-issue localized infrastructure cluster. Priority elevated for coordinated circle maintenance.`;
  }

  const overallImpactScore = Math.min(
    100,
    primaryReport.priorityScore + chainNodes.length * 8 + (rootCausesCount > 0 ? 15 : 0)
  );

  return {
    primaryReportId: primaryReport.id,
    chainNodes: chainNodes.slice(0, 4), // Top 4 ripple connections
    overallImpactScore,
    systemicRiskSummary,
  };
}
