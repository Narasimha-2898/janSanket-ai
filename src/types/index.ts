export type IssueCategory =
  | 'pothole'
  | 'garbage'
  | 'drainage'
  | 'streetlight'
  | 'infrastructure'
  | 'sanitation_other';

export type IssueStatus =
  | 'submitted'
  | 'under_review'
  | 'in_progress'
  | 'resolved'
  | 'rejected';

export type PriorityBand = 'low' | 'medium' | 'high' | 'critical';

export interface PriorityFactors {
  severity: number;         // 0-100 (weight 0.40)
  recurrence: number;       // 0-100 (weight 0.25)
  durationDays: number;     // Days open
  durationScore: number;    // 0-100 (weight 0.20)
  communityImpact: number;  // 0-100 (weight 0.15)
  formulaExplanation?: string;
}

export interface AIAnalysis {
  category: IssueCategory;
  severity: number;
  confidence: number;
  summary: string;
  keywords: string[];
  recommendedAction: string;
  isFallback: boolean;
  modelUsed: string;
  reasoningFactors: string[];
}

export type UserRole = 'reporter' | 'reviewer';

export type MilestoneStage =
  | 'submission'
  | 'assignment'
  | 'progress'
  | 'repair_evidence'
  | 'resolution_approval';

export interface TimelineMilestone {
  id: string;
  stage: MilestoneStage;
  title: string;
  timestamp: string;
  completed: boolean;
  actor: string;
  role: string;
  details: string;
  evidenceUrl?: string;
  verificationBadge?: string;
}

export interface NotificationItem {
  id: string;
  reportId: string;
  type: 'submission' | 'assignment' | 'status_change' | 'evidence_uploaded' | 'resolved' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  roleRecipient?: 'all' | 'reporter' | 'reviewer';
}

export interface StatusHistoryItem {
  status: IssueStatus;
  timestamp: string;
  updatedBy: string;
  note?: string;
  role?: UserRole | 'system';
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  latitude: number;
  longitude: number;
  areaName: string;
  landmark?: string;
  imageUrl?: string;
  status: IssueStatus;
  severity: number;
  priorityScore: number;
  priorityBand: PriorityBand;
  priorityFactors: PriorityFactors;
  aiAnalysis: AIAnalysis;
  statusHistory: StatusHistoryItem[];
  duplicateCandidateIds?: string[];
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  // Step 7: Public Accountability Tracker fields
  accountabilityTimeline?: TimelineMilestone[];
  assignedDepartment?: string;
  assignedOfficer?: string;
  repairEvidenceUrl?: string;
  repairNotes?: string;
  approvalNotes?: string;
  approvedBy?: string;
  // Step 10 & 11: Security & Dashboard Metrics
  isVerified?: boolean;
  slaDays?: number;
  isOverdue?: boolean;
  reporterName?: string;
  reporterRole?: UserRole;
  // Features 1 to 6 Additions
  communityConfirmationsCount?: number;
  confirmedByCurrentUser?: boolean;
  photoVerification?: PhotoVerificationResult;
  proofOfResolution?: ProofOfResolutionResult;
  rippleEffect?: CivicRippleEffect;
}

export interface PhotoVerificationResult {
  isValid: boolean;
  confidence: number; // 0-100
  hazardTypeDetected: string;
  clarityScore: number; // 0-100
  feedback: string;
  isIrrelevantOrUnclear: boolean;
}

export interface ProofOfResolutionResult {
  isResolved: boolean;
  confidence: number; // 0-100
  qualityScore: number; // 0-100
  assessment: string;
  visualNotes: string[];
  remediationRating: 'excellent' | 'adequate' | 'substandard' | 'pending';
}

export interface CivicRippleNode {
  reportId: string;
  title: string;
  category: IssueCategory;
  distanceMeters: number;
  relationship: 'root_cause' | 'cascading_effect' | 'correlated_cluster';
  explanation: string;
}

export interface CivicRippleEffect {
  primaryReportId: string;
  chainNodes: CivicRippleNode[];
  overallImpactScore: number;
  systemicRiskSummary: string;
}

export interface DuplicateMatch {
  candidateReport: Report;
  distanceMeters: number;
  similarityScore: number; // 0 - 100
  reason: string;
}

export interface HotspotCluster {
  id: string;
  centerLat: number;
  centerLng: number;
  radiusMeters: number;
  reportCount: number;
  dominantCategory: IssueCategory;
  unresolvedCount: number;
  averagePriority: number;
  locality: string;
  reportIds: string[];
}

export interface AnalyticsSummary {
  totalReports: number;
  unresolvedReports: number;
  inProgressReports: number;
  resolvedReports: number;
  criticalReports: number;
  highPriorityReports: number;
  hotspotsCount: number;
  averageResolutionDays: number;
  verifiedReports: number;
  overdueReports: number;
  resolutionRate: number;
  evidenceVerifiedRate: number;
}

export interface CategoryDistribution {
  category: IssueCategory;
  label: string;
  count: number;
  unresolved: number;
  resolved: number;
}

export interface StatusDistribution {
  status: IssueStatus;
  label: string;
  count: number;
}

export interface TrendDataPoint {
  date: string;
  newReports: number;
  resolved: number;
}

export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'te'
  | 'bn'
  | 'mr'
  | 'ta'
  | 'kn'
  | 'ml'
  | 'gu'
  | 'pa'
  | 'or'
  | 'ur';
