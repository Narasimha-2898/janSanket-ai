import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { api } from '../services/api';
import { Report, HotspotCluster, IssueCategory, IssueStatus, PriorityBand } from '../types';
import { LeafletMap } from '../components/LeafletMap';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import { Search, Filter, Layers, MapPin, Eye, ChevronRight } from 'lucide-react';

interface MapPageProps {
  navigate: (path: string) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ navigate }) => {
  const { t } = useI18n();
  const [reports, setReports] = useState<Report[]>([]);
  const [hotspots, setHotspots] = useState<HotspotCluster[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  useEffect(() => {
    async function loadMapData() {
      try {
        const [repRes, hotRes] = await Promise.all([
          api.getReports({ limit: 100 }),
          api.getHotspots(),
        ]);
        setReports(repRes.reports);
        setHotspots(hotRes.hotspots);
      } catch (err) {
        console.error('Failed to load map data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMapData();
  }, []);

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && r.priorityBand !== priorityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.areaName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            {t.map.pageTitle}
          </h1>
          <p className="text-xs text-slate-600">
            {t.map.pageSubtitle}
          </p>
        </div>

        {/* Hotspot Toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-stone-200 px-3 py-2 rounded-lg cursor-pointer shadow-2xs">
            <input
              type="checkbox"
              checked={showHotspots}
              onChange={(e) => setShowHotspots(e.target.checked)}
              className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4"
            />
            <span>{t.map.showHotspots}</span>
          </label>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search issue, locality, or ID..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-emerald-600 text-xs"
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-emerald-600 text-xs"
          >
            <option value="all">{t.categories.all}</option>
            <option value="pothole">{t.categories.pothole}</option>
            <option value="garbage">{t.categories.garbage}</option>
            <option value="drainage">{t.categories.drainage}</option>
            <option value="streetlight">{t.categories.streetlight}</option>
            <option value="infrastructure">{t.categories.infrastructure}</option>
            <option value="sanitation_other">{t.categories.sanitation_other}</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-emerald-600 text-xs"
          >
            <option value="all">{t.statuses.all}</option>
            <option value="submitted">{t.statuses.submitted}</option>
            <option value="under_review">{t.statuses.under_review}</option>
            <option value="in_progress">{t.statuses.in_progress}</option>
            <option value="resolved">{t.statuses.resolved}</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-emerald-600 text-xs"
          >
            <option value="all">All Priority Levels</option>
            <option value="critical">{t.priority.critical} (&ge;85)</option>
            <option value="high">{t.priority.high} (65-84)</option>
            <option value="medium">{t.priority.medium} (35-64)</option>
            <option value="low">{t.priority.low} (&lt;35)</option>
          </select>
        </div>
      </div>

      {/* Main Map + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Container */}
        <div className="lg:col-span-8">
          <LeafletMap
            reports={filteredReports}
            hotspots={hotspots}
            showHotspots={showHotspots}
            selectedReportId={selectedReportId}
            onSelectReport={(id) => navigate(`/issues/${id}`)}
            height="580px"
          />
        </div>

        {/* Side Action List */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-2xs flex flex-col h-[580px] overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {filteredReports.length} Civic Reports
            </span>
            <span className="text-[11px] text-slate-500">Sorted by Priority</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 p-2 space-y-1">
            {filteredReports.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                {t.map.noResults}
              </div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedReportId === report.id
                      ? 'bg-emerald-50 border border-emerald-300'
                      : 'hover:bg-stone-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <div className="flex items-center gap-1.5 font-medium text-slate-500">
                      <CategoryIcon category={report.category} className="w-3.5 h-3.5 text-emerald-800" />
                      <span className="font-mono">{report.id}</span>
                    </div>
                    <PriorityBadge score={report.priorityScore} band={report.priorityBand} />
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-tight mb-1">
                    {report.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[150px]">{report.areaName}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/issues/${report.id}`);
                      }}
                      className="text-emerald-950 font-semibold hover:underline flex items-center gap-0.5"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
