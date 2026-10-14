import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { api } from '../services/api';
import { Report, AnalyticsSummary, IssueCategory, IssueStatus } from '../types';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  RotateCcw,
  AlertTriangle,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  Search,
  ShieldCheck,
  Award,
  Camera,
  Shield,
} from 'lucide-react';

interface DashboardPageProps {
  navigate: (path: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  pothole: '#ea580c',
  garbage: '#ca8a04',
  drainage: '#0284c7',
  streetlight: '#eab308',
  infrastructure: '#64748b',
  sanitation_other: '#059669',
};

const STATUS_COLORS = ['#d97706', '#0284c7', '#4f46e5', '#16a34a', '#64748b'];

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const { t } = useI18n();
  const [reports, setReports] = useState<Report[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [trends, setTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Sorting for Action Queue
  const [tabFilter, setTabFilter] = useState<'all' | 'overdue' | 'verified' | 'unresolved' | 'resolved'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'newest' | 'oldest'>('priority');

  const loadData = async () => {
    setLoading(true);
    try {
      const [repRes, sumRes, trendRes] = await Promise.all([
        api.getReports({ limit: 100 }),
        api.getAnalyticsSummary(),
        api.getAnalyticsTrends(),
      ]);
      setReports(repRes.reports);
      setSummary(sumRes);
      setTrends(trendRes);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResetData = async () => {
    if (confirm('Reload default synthetic Hyderabad demo records?')) {
      await api.resetDemoData();
      await loadData();
    }
  };

  const overdueCount = reports.filter((r) => r.isOverdue).length;
  const verifiedCount = reports.filter((r) => r.isVerified !== false).length;
  const unresolvedCount = reports.filter((r) => r.status === 'submitted' || r.status === 'under_review').length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved').length;

  // Filtered action queue
  const filteredQueue = reports
    .filter((r) => {
      if (tabFilter === 'overdue' && !r.isOverdue) return false;
      if (tabFilter === 'verified' && r.isVerified === false) return false;
      if (tabFilter === 'unresolved' && r.status !== 'submitted' && r.status !== 'under_review') return false;
      if (tabFilter === 'resolved' && r.status !== 'resolved') return false;

      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
      if (priorityFilter !== 'all' && r.priorityBand !== priorityFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.areaName.toLowerCase().includes(q) &&
          !r.id.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priorityScore - a.priorityScore;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const categoryChartData = (trends?.categoryDistribution || []).map((c: any) => ({
    name: t.categories[c.category as IssueCategory] || c.category,
    count: c.count,
    fill: CATEGORY_COLORS[c.category] || '#64748b',
  }));

  const statusChartData = (trends?.statusDistribution || []).map((s: any) => ({
    name: t.statuses[s.status as IssueStatus] || s.status,
    count: s.count,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            {t.dashboard.pageTitle}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            {t.dashboard.pageSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetData}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg shadow-2xs transition-colors"
            title="Reset to default synthetic demo data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo Records</span>
          </button>
        </div>
      </div>

      {/* Demo Disclosure Banner */}
      <div className="p-3 bg-stone-100 border border-stone-200/90 rounded-lg text-xs text-slate-600 flex items-center justify-between">
        <span>{t.dashboard.demoBanner}</span>
        <span className="font-semibold text-emerald-950">Active Database: {reports.length} Records</span>
      </div>

      {/* Step 11: Enhanced KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Verified Reports */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Verified Reports
            </span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 block">
            {summary?.verifiedReports || verifiedCount}
          </span>
          <span className="text-[10px] text-slate-400 block">GPS validated coordinates</span>
        </div>

        {/* Unresolved Complaints */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Unresolved Issues
            </span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-amber-900 block">
            {summary?.unresolvedReports || unresolvedCount}
          </span>
          <span className="text-[10px] text-slate-400 block">Awaiting triage &amp; dispatch</span>
        </div>

        {/* Civic Hotspots */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Civic Hotspots
            </span>
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 block">
            {summary?.hotspotsCount || 4} Clusters
          </span>
          <span className="text-[10px] text-slate-400 block">Spatial density &ge;3 issues</span>
        </div>

        {/* Overdue Reports (SLA Breaches) */}
        <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs space-y-1 bg-rose-50/20">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Overdue Reports
            </span>
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-rose-900 block">
            {summary?.overdueReports || overdueCount}
          </span>
          <span className="text-[10px] text-rose-700 font-medium block">Exceeded municipal SLA</span>
        </div>

        {/* Resolution Statistics: Velocity & Rate */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-sky-700">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Resolution Stats
            </span>
            <Award className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-sky-900 block">
            {summary?.averageResolutionDays || 4.8}d
          </span>
          <span className="text-[10px] text-slate-500 block">Avg velocity ({summary?.resolutionRate || 24}% closed)</span>
        </div>

        {/* Resolution Evidence Audit */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-indigo-700">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Proof Audit Rate
            </span>
            <Camera className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-indigo-900 block">
            {summary?.evidenceVerifiedRate || 100}%
          </span>
          <span className="text-[10px] text-slate-400 block">Photographic repair evidence</span>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900">
            {t.dashboard.categoryDistributionTitle}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {categoryChartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900">
            {t.dashboard.statusDistributionTitle}
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {statusChartData.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Prioritized Action Queue Section */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden space-y-4 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              {t.dashboard.queueTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.dashboard.queueSubtitle}
            </p>

            {/* Quick Filter Pills (Step 11) */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <button
                type="button"
                onClick={() => setTabFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  tabFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                All Complaints ({reports.length})
              </button>
              <button
                type="button"
                onClick={() => setTabFilter('overdue')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  tabFilter === 'overdue'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Overdue SLA ({overdueCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setTabFilter('verified')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  tabFilter === 'verified'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified ({verifiedCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setTabFilter('unresolved')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  tabFilter === 'unresolved'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Unresolved ({unresolvedCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setTabFilter('resolved')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  tabFilter === 'resolved'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resolved with Evidence ({resolvedCount})</span>
              </button>
            </div>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search queue..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 w-48"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
            >
              <option value="all">All Categories</option>
              <option value="pothole">{t.categories.pothole}</option>
              <option value="garbage">{t.categories.garbage}</option>
              <option value="drainage">{t.categories.drainage}</option>
              <option value="streetlight">{t.categories.streetlight}</option>
              <option value="infrastructure">{t.categories.infrastructure}</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">{t.statuses.submitted}</option>
              <option value="under_review">{t.statuses.under_review}</option>
              <option value="in_progress">{t.statuses.in_progress}</option>
              <option value="resolved">{t.statuses.resolved}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white font-medium"
            >
              <option value="priority">{t.dashboard.sortHighestPriority}</option>
              <option value="newest">{t.dashboard.sortNewest}</option>
              <option value="oldest">{t.dashboard.sortOldest}</option>
            </select>
          </div>
        </div>

        {/* Table of Action Items */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-stone-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-3">{t.dashboard.colPriority}</th>
                <th className="py-2.5 px-3">{t.dashboard.colTitle}</th>
                <th className="py-2.5 px-3">{t.dashboard.colCategory}</th>
                <th className="py-2.5 px-3">{t.dashboard.colArea}</th>
                <th className="py-2.5 px-3">{t.dashboard.colStatus}</th>
                <th className="py-2.5 px-3">{t.dashboard.colAge}</th>
                <th className="py-2.5 px-3 text-right">{t.dashboard.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredQueue.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No matching reports found in action queue.
                  </td>
                </tr>
              ) : (
                filteredQueue.map((report) => {
                  const hasDuplicates = (report.duplicateCandidateIds || []).length > 0;
                  return (
                    <tr
                      key={report.id}
                      onClick={() => navigate(`/issues/${report.id}`)}
                      className="hover:bg-stone-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3">
                        <PriorityBadge score={report.priorityScore} band={report.priorityBand} />
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-900 max-w-xs">
                        <div className="truncate font-semibold flex items-center gap-1.5">
                          <span>{report.title}</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span>{report.id}</span>
                          {report.isOverdue && (
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded font-sans">
                              SLA Breach ({report.slaDays}d)
                            </span>
                          )}
                          {report.isVerified !== false && (
                            <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-1 rounded font-sans">
                              Verified GPS
                            </span>
                          )}
                          {hasDuplicates && (
                            <span className="text-[10px] text-amber-700 font-sans font-medium bg-amber-50 px-1 rounded">
                              Duplicate Flagged
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 capitalize">
                        <div className="flex items-center gap-1.5">
                          <CategoryIcon category={report.category} className="w-3.5 h-3.5 text-emerald-800" />
                          <span>{t.categories[report.category] || report.category}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {report.areaName}
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-mono">
                        {report.priorityFactors.durationDays}d
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/issues/${report.id}`);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-emerald-950 hover:bg-emerald-100 rounded transition-colors inline-flex items-center gap-1"
                        >
                          <span>Inspect Audit</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
