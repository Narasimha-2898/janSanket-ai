import { Report, HotspotCluster, AnalyticsSummary, AIAnalysis, IssueCategory, IssueStatus, PriorityBand } from '../types';

export interface ReportsFilterParams {
  category?: string;
  status?: string;
  priorityBand?: string;
  search?: string;
  sort?: 'priority' | 'newest' | 'oldest';
  limit?: number;
  offset?: number;
}

export const api = {
  // Check health
  async checkHealth(): Promise<{ status: string; reportsCount: number; aiProvider: string }> {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },

  // Fetch reports list
  async getReports(params: ReportsFilterParams = {}): Promise<{ total: number; reports: Report[] }> {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.status) query.set('status', params.status);
    if (params.priorityBand) query.set('priorityBand', params.priorityBand);
    if (params.search) query.set('search', params.search);
    if (params.sort) query.set('sort', params.sort);
    if (params.limit) query.set('limit', String(params.limit));
    if (params.offset) query.set('offset', String(params.offset));

    const res = await fetch(`/api/reports?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch reports');
    return res.json();
  },

  // Fetch single report
  async getReport(id: string): Promise<{ report: Report; duplicateCandidates: Report[] }> {
    const res = await fetch(`/api/reports/${id}`);
    if (!res.ok) throw new Error(`Report ${id} not found`);
    return res.json();
  },

  // Create report
  async createReport(data: {
    title: string;
    description: string;
    category: IssueCategory;
    latitude: number;
    longitude: number;
    areaName?: string;
    landmark?: string;
    imageUrl?: string;
    severity?: number;
  }): Promise<{ success: boolean; report: Report }> {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit report');
    }
    return res.json();
  },

  // Update status with Role-Based Access Control and Accountability Evidence
  async updateStatus(
    id: string,
    status: IssueStatus,
    note?: string,
    updatedBy?: string,
    options?: {
      role?: string;
      assignedDepartment?: string;
      assignedOfficer?: string;
      repairEvidenceUrl?: string;
      repairNotes?: string;
      approvalNotes?: string;
      approvedBy?: string;
    }
  ): Promise<{ success: boolean; report: Report }> {
    const role = options?.role || localStorage.getItem('js_user_role') || 'reviewer';
    const res = await fetch(`/api/reports/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Role': role,
      },
      body: JSON.stringify({
        status,
        note,
        updatedBy,
        role,
        ...options,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update status');
    }
    return res.json();
  },

  // Security & Health validation
  async getSecurityStatus(): Promise<{
    status: string;
    geminiApiKeyProtected: boolean;
    geminiKeyClientExposed: boolean;
    rateLimitingActive: boolean;
    uploadValidationEnforced: boolean;
    duplicatePreventionActive: boolean;
    rbacEnforced: boolean;
  }> {
    const res = await fetch('/api/security/status');
    if (!res.ok) throw new Error('Failed to fetch security status');
    return res.json();
  },

  // AI draft analysis preview
  async analyzeDraft(title: string, description: string): Promise<AIAnalysis> {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error('AI analysis preview failed');
    return res.json();
  },

  // Inspect duplicate candidates
  async getDuplicates(id: string): Promise<{ reportId: string; candidates: any[] }> {
    const res = await fetch(`/api/duplicates/${id}`);
    if (!res.ok) throw new Error('Failed to fetch duplicates');
    return res.json();
  },

  // Get GIS Hotspots
  async getHotspots(): Promise<{ totalHotspots: number; hotspots: HotspotCluster[] }> {
    const res = await fetch('/api/hotspots');
    if (!res.ok) throw new Error('Failed to fetch hotspots');
    return res.json();
  },

  // Get Analytics Summary
  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    const res = await fetch('/api/analytics/summary');
    if (!res.ok) throw new Error('Failed to fetch analytics summary');
    return res.json();
  },

  // Get Analytics Trends
  async getAnalyticsTrends(): Promise<{
    categoryDistribution: { category: IssueCategory; count: number; unresolved: number; resolved: number }[];
    statusDistribution: { status: IssueStatus; count: number }[];
    priorityDistribution: { band: string; count: number }[];
  }> {
    const res = await fetch('/api/analytics/trends');
    if (!res.ok) throw new Error('Failed to fetch analytics trends');
    return res.json();
  },

  // Reset demo data
  async resetDemoData(): Promise<void> {
    await fetch('/api/reports/reset', { method: 'POST' });
  },
};
