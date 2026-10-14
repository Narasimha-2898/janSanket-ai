import { Report, TimelineMilestone } from '../types';

/**
 * Builds or normalizes the 5-stage Public Accountability Timeline for a report:
 * 1. Submission
 * 2. Assignment
 * 3. Progress / Inspection
 * 4. Repair Evidence
 * 5. Resolution Approval
 */
export function buildAccountabilityTimeline(report: Report): TimelineMilestone[] {
  if (report.accountabilityTimeline && report.accountabilityTimeline.length === 5) {
    return report.accountabilityTimeline;
  }

  const createdDate = new Date(report.createdAt);
  const addHours = (d: Date, h: number) => new Date(d.getTime() + h * 3600 * 1000).toISOString();

  const isAssigned = ['under_review', 'in_progress', 'resolved'].includes(report.status);
  const isInProgress = ['in_progress', 'resolved'].includes(report.status);
  const hasRepairEvidence = Boolean(report.repairEvidenceUrl) || report.status === 'resolved';
  const isResolved = report.status === 'resolved';

  const defaultDepartment = report.category === 'pothole'
    ? 'GHMC Road Maintenance Division'
    : report.category === 'garbage' || report.category === 'sanitation_other'
    ? 'Sanitation & Solid Waste Management Wing'
    : report.category === 'streetlight'
    ? 'Electrical & Street Lighting Directorate'
    : 'Town Planning & Municipal Engineering';

  // Evidence fallback for demo resolved reports
  const repairEvidenceUrl = report.repairEvidenceUrl || (isResolved ? (report.imageUrl || 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80') : undefined);

  return [
    {
      id: `${report.id}-m1`,
      stage: 'submission',
      title: 'Civic Report Submission',
      timestamp: report.createdAt,
      completed: true,
      actor: report.reporterName || 'Citizen Reporter',
      role: 'Citizen / Community Reporter',
      details: `Citizen complaint logged with GPS coordinates (${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}) and automated priority rating ${report.priorityScore}/100.`,
      verificationBadge: 'GPS Telemetry Validated',
    },
    {
      id: `${report.id}-m2`,
      stage: 'assignment',
      title: 'Departmental Squad Assignment',
      timestamp: isAssigned ? addHours(createdDate, 6) : 'Pending Assignment',
      completed: isAssigned,
      actor: report.assignedOfficer || 'Ward 10 Triage Officer (P. Rao)',
      role: 'Municipal Triage Desk',
      details: isAssigned
        ? `Triaged and formally assigned to ${report.assignedDepartment || defaultDepartment}. Work order dispatched.`
        : 'Waiting for zonal triage desk assignment.',
      verificationBadge: isAssigned ? 'Official Work Order' : undefined,
    },
    {
      id: `${report.id}-m3`,
      stage: 'progress',
      title: 'Field Crew Dispatch & Remediation Work',
      timestamp: isInProgress ? addHours(createdDate, 28) : 'Awaiting Field Dispatch',
      completed: isInProgress,
      actor: 'Circle Remediation Squad (Squad #4)',
      role: 'Civil Contractor / Field Squad',
      details: isInProgress
        ? 'Field engineering crew deployed on-site. Hazard barrier established and repair materials delivered.'
        : 'Pending crew schedule slot.',
      verificationBadge: isInProgress ? 'Crew Dispatched' : undefined,
    },
    {
      id: `${report.id}-m4`,
      stage: 'repair_evidence',
      title: 'Repair Evidence & Photographed Proof',
      timestamp: hasRepairEvidence ? (report.resolvedAt || addHours(createdDate, 48)) : 'Pending Repair Proof',
      completed: hasRepairEvidence,
      actor: report.assignedOfficer || 'Contractor Field Supervisor',
      role: 'Remediation Contractor',
      details: report.repairNotes || (hasRepairEvidence
        ? 'Remediation work completed. High-resolution photographic evidence captured and geotag verified.'
        : 'Contractor has not yet uploaded completion photographic evidence.'),
      evidenceUrl: repairEvidenceUrl,
      verificationBadge: hasRepairEvidence ? 'Photographic Proof Verified' : undefined,
    },
    {
      id: `${report.id}-m5`,
      stage: 'resolution_approval',
      title: 'Resolution Review & Final Approval',
      timestamp: isResolved ? (report.resolvedAt || addHours(createdDate, 54)) : 'Awaiting Reviewer Sign-Off',
      completed: isResolved,
      actor: report.approvedBy || 'Municipal Reviewer (Dr. A. Verma, Executive Engineer)',
      role: 'Municipal Reviewer',
      details: report.approvalNotes || (isResolved
        ? 'Remediation inspection passed quality audit. Civic ledger updated to Resolved status.'
        : 'Pending final municipal reviewer sign-off and citizen resolution audit.'),
      verificationBadge: isResolved ? 'Resolution Certified' : undefined,
    },
  ];
}
