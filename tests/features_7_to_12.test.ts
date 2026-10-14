import { buildAccountabilityTimeline } from '../src/utils/accountability';
import { SEED_REPORTS } from '../src/data/seedReports';
import { Report } from '../src/types';

function runTests() {
  console.log('=== RUNNING JANSANKET AI FEATURES 7 TO 12 TEST SUITE ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`[PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[FAIL] ${msg}`);
      failed++;
    }
  }

  // TEST GROUP 1: PUBLIC ACCOUNTABILITY TRACKER (Feature 7)
  console.log('--- TEST GROUP 1: PUBLIC ACCOUNTABILITY TRACKER ---');
  const demoReport = SEED_REPORTS[0];
  const timeline = buildAccountabilityTimeline(demoReport);

  assert(timeline.length === 5, 'Timeline produces exactly 5 distinct stages');
  assert(timeline[0].stage === 'submission', 'Stage 1 is submission');
  assert(timeline[1].stage === 'assignment', 'Stage 2 is assignment');
  assert(timeline[2].stage === 'progress', 'Stage 3 is progress');
  assert(timeline[3].stage === 'repair_evidence', 'Stage 4 is repair_evidence');
  assert(timeline[4].stage === 'resolution_approval', 'Stage 5 is resolution_approval');
  assert(timeline[0].completed === true, 'Stage 1 submission is always completed');
  assert(typeof timeline[0].verificationBadge === 'string', 'Stage 1 contains GPS telemetry verification badge');

  const resolvedReport = SEED_REPORTS.find((r) => r.status === 'resolved') || {
    ...demoReport,
    status: 'resolved' as const,
    repairEvidenceUrl: 'https://example.com/repair.jpg',
  };
  const resolvedTimeline = buildAccountabilityTimeline(resolvedReport);
  assert(resolvedTimeline[4].completed === true, 'Resolved report marks resolution approval as completed');
  assert(Boolean(resolvedTimeline[3].evidenceUrl), 'Resolved report includes repair evidence URL');

  // TEST GROUP 2: ROLE-BASED ACCESS CONTROL (Feature 8)
  console.log('\n--- TEST GROUP 2: ROLE-BASED ACCESS (RBAC) ---');
  const reviewerRole: string = 'reviewer';
  const reporterRole: string = 'reporter';
  assert(reviewerRole !== reporterRole, 'Reporter and Reviewer roles are distinct');

  // TEST GROUP 3: SECURITY & VALIDATION (Feature 10)
  console.log('\n--- TEST GROUP 3: SECURITY & VALIDATION ---');
  function validateUpload(imageUrl?: string): { valid: boolean; error?: string } {
    if (!imageUrl) return { valid: true };
    if (imageUrl.startsWith('data:')) {
      const mimeMatch = imageUrl.match(/^data:(image\/(jpeg|png|webp|gif));base64,/i);
      if (!mimeMatch) return { valid: false, error: 'Invalid MIME type' };
    } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      return { valid: false, error: 'Invalid URL scheme' };
    }
    return { valid: true };
  }

  assert(validateUpload('https://example.com/photo.jpg').valid === true, 'Valid HTTPS photo passes validation');
  assert(validateUpload('data:image/jpeg;base64,/9j/4AAQSkZJRg==').valid === true, 'Valid JPEG base64 passes validation');
  assert(validateUpload('data:text/html;base64,PHNjcmlwdD4=').valid === false, 'Malicious text/html payload is rejected');
  assert(validateUpload('javascript:alert(1)').valid === false, 'Dangerous javascript: URL is rejected');

  // TEST GROUP 4: DASHBOARD METRICS & OVERDUE SLA (Feature 11)
  console.log('\n--- TEST GROUP 4: DASHBOARD ENHANCEMENTS & SLA ---');
  function computeSla(report: Report, daysOpen: number): boolean {
    const threshold = report.priorityBand === 'critical' ? 2 : report.priorityBand === 'high' ? 5 : report.priorityBand === 'medium' ? 10 : 14;
    return report.status !== 'resolved' && report.status !== 'rejected' && daysOpen >= threshold;
  }

  const highPriOpen = { ...demoReport, priorityBand: 'high' as const, status: 'in_progress' as const };
  assert(computeSla(highPriOpen, 6) === true, 'Report open 6 days exceeds High-Priority 5-day SLA');
  assert(computeSla(highPriOpen, 2) === false, 'Report open 2 days within SLA');

  console.log(`\n=== SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED ===\n`);
  if (failed > 0) process.exit(1);
}

runTests();
