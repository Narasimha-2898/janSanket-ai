import { calculatePriorityScore, computeDurationScore } from '../src/utils/priority';
import { getHaversineDistanceMeters, calculateTextSimilarity } from '../src/utils/geo';
import { SEED_REPORTS } from '../src/data/seedReports';

console.log('=== RUNNING JANSANKET AI ALGORITHM VERIFICATION TESTS ===\n');

let failed = 0;
let passed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failed++;
  }
}

// -----------------------------------------------------------------
// 1. Priority Scoring Formula Unit Tests
// Formula: 0.40S + 0.25R + 0.20D + 0.15U
// -----------------------------------------------------------------
console.log('--- TEST GROUP 1: PRIORITY SCORING ENGINE ---');

// Test 1: Critical hazard
const criticalResult = calculatePriorityScore({
  severity: 90,
  recurrence: 80,
  durationDays: 15,
  durationScore: 50,
  communityImpact: 80,
});
// (0.40*90 = 36) + (0.25*80 = 20) + (0.20*50 = 10) + (0.15*80 = 12) = 78
assert(criticalResult.score === 78, `Critical test score: expected 78, got ${criticalResult.score}`);
assert(criticalResult.band === 'high', `Critical band: expected 'high', got ${criticalResult.band}`);

// Test 2: Maximum boundary (100 on all factors)
const maxResult = calculatePriorityScore({
  severity: 100,
  recurrence: 100,
  durationDays: 30,
  durationScore: 100,
  communityImpact: 100,
});
assert(maxResult.score === 100, `Max score: expected 100, got ${maxResult.score}`);
assert(maxResult.band === 'critical', `Max band: expected 'critical', got ${maxResult.band}`);

// Test 3: Minimum boundary (0 on all factors)
const minResult = calculatePriorityScore({
  severity: 0,
  recurrence: 0,
  durationDays: 0,
  durationScore: 0,
  communityImpact: 0,
});
assert(minResult.score === 0, `Min score: expected 0, got ${minResult.score}`);
assert(minResult.band === 'low', `Min band: expected 'low', got ${minResult.band}`);

// Test 4: Duration score scaling
const duration30 = computeDurationScore(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
assert(duration30.score === 100, `Duration score capped at 100 after 30 days: got ${duration30.score}`);

// -----------------------------------------------------------------
// 2. Geospatial Haversine Distance Tests
// -----------------------------------------------------------------
console.log('\n--- TEST GROUP 2: HAVERSINE GEOSPATIAL DISTANCE ---');

// Coordinates of Jubilee Hills duplicate pair (JS-HYD-2026-1001 & 1002)
const distJubilee = getHaversineDistanceMeters(17.432541, 78.407255, 17.432820, 78.407480);
assert(distJubilee > 20 && distJubilee < 60, `Jubilee Hills duplicate pair distance: ~40m (got ${distJubilee}m)`);

// Distant locations (Jubilee Hills vs Charminar: ~10-12 km)
const distCrossCity = getHaversineDistanceMeters(17.432541, 78.407255, 17.361564, 78.474665);
assert(distCrossCity > 8000 && distCrossCity < 14000, `Cross-city distance: expected ~10km (got ${distCrossCity}m)`);

// -----------------------------------------------------------------
// 3. Text Similarity & Duplicate Identification
// -----------------------------------------------------------------
console.log('\n--- TEST GROUP 3: TEXT TOKEN SIMILARITY ---');

const text1 = 'Severe crater-like pothole on Road No. 36 near Peddamma Temple Metro';
const text2 = 'Hazardous deep road hole causing traffic jams near Peddamma Gudi';
const sim1 = calculateTextSimilarity(text1, text2);
assert(sim1 >= 20, `Similar pothole descriptions have significant overlap: got ${sim1}%`);

const textUnrelated = 'Broken streetlight in Hitec city flyover dark stretch';
const simUnrelated = calculateTextSimilarity(text1, textUnrelated);
assert(simUnrelated < 15, `Unrelated text similarity should be low: got ${simUnrelated}%`);

// -----------------------------------------------------------------
// 4. Seed Data Integrity
// -----------------------------------------------------------------
console.log('\n--- TEST GROUP 4: SEED DATABASE INTEGRITY ---');

assert(SEED_REPORTS.length >= 20, `Seed database has sufficient records: got ${SEED_REPORTS.length}`);
assert(SEED_REPORTS.every((r) => r.isDemo === true), `All seed records are flagged with isDemo=true`);
assert(SEED_REPORTS.every((r) => r.priorityScore >= 0 && r.priorityScore <= 100), `All seed priority scores are valid 0-100`);

console.log(`\n=== TEST SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED ===\n`);

if (failed > 0) {
  process.exit(1);
}
