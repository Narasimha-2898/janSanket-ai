import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { api } from '../services/api';
import { Report, IssueStatus } from '../types';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import { PublicAccountabilityTracker } from '../components/PublicAccountabilityTracker';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ChevronRight,
  Send,
  AlertTriangle,
  Shield,
  UserCheck,
  Camera,
  Award,
} from 'lucide-react';

interface IssueDetailPageProps {
  id: string;
  navigate: (path: string) => void;
}

export const IssueDetailPage: React.FC<IssueDetailPageProps> = ({ id, navigate }) => {
  const { t } = useI18n();
  const { role, userName, isReviewer, setRole } = useAuth();
  const { addNotification } = useNotifications();
  const [report, setReport] = useState<Report | null>(null);
  const [duplicateCandidates, setDuplicateCandidates] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Status & Role-Based Reviewer Update state
  const [newStatus, setNewStatus] = useState<IssueStatus>('under_review');
  const [updateNote, setUpdateNote] = useState('');
  const [assignedDepartment, setAssignedDepartment] = useState('GHMC Circle Maintenance Division');
  const [assignedOfficer, setAssignedOfficer] = useState('Squad #4 Lead Engineer');
  const [repairEvidenceUrl, setRepairEvidenceUrl] = useState('');
  const [repairNotes, setRepairNotes] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const loadReport = async () => {
    setLoading(true);
    try {
      const data = await api.getReport(id);
      setReport(data.report);
      setDuplicateCandidates(data.duplicateCandidates || []);
      setNewStatus(data.report.status);
      if (data.report.assignedDepartment) setAssignedDepartment(data.report.assignedDepartment);
      if (data.report.assignedOfficer) setAssignedOfficer(data.report.assignedOfficer);
      if (data.report.repairEvidenceUrl) setRepairEvidenceUrl(data.report.repairEvidenceUrl);
      if (data.report.repairNotes) setRepairNotes(data.report.repairNotes);
      if (data.report.approvalNotes) setApprovalNotes(data.report.approvalNotes);
    } catch (err: any) {
      setError(err.message || 'Report not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [id]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report) return;

    if (!isReviewer) {
      alert('Action Restricted: Only Municipal Reviewers have authorization to update status or approve resolutions. Please switch role to Reviewer.');
      return;
    }

    setUpdating(true);
    try {
      const res = await api.updateStatus(report.id, newStatus, updateNote, userName, {
        role,
        assignedDepartment,
        assignedOfficer,
        repairEvidenceUrl: repairEvidenceUrl.trim() || undefined,
        repairNotes: repairNotes.trim() || undefined,
        approvalNotes: approvalNotes.trim() || undefined,
        approvedBy: newStatus === 'resolved' ? userName : undefined,
      });

      setReport(res.report);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 4000);

      // Trigger Smart Notification (Step 9)
      const notifType = newStatus === 'resolved' ? 'resolved' : newStatus === 'in_progress' ? 'assignment' : 'status_change';
      const notifTitle = newStatus === 'resolved' ? 'Resolution Approved' : `Status Updated: ${newStatus.replace('_', ' ').toUpperCase()}`;
      addNotification({
        reportId: report.id,
        type: notifType,
        title: notifTitle,
        message: `Report ${report.id} was updated to '${newStatus}' by ${userName}. ${updateNote ? '"' + updateNote + '"' : ''}`,
        actionUrl: `/issues/${report.id}`,
        roleRecipient: 'all',
      });

      setUpdateNote('');
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading civic report details...
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Report Not Found</h2>
        <p className="text-xs text-slate-600">{error || 'The requested issue ID does not exist.'}</p>
        <button
          onClick={() => navigate('/map')}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-md"
        >
          Return to Civic Map
        </button>
      </div>
    );
  }

  const { priorityFactors } = report;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.detail.backToDashboard}</span>
        </button>

        <span className="text-xs font-mono font-medium text-slate-400">
          Ref ID: {report.id}
        </span>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <CategoryIcon category={report.category} className="w-5 h-5 text-emerald-800" />
            <span className="font-semibold text-slate-900 capitalize text-sm">
              {t.categories[report.category] || report.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <PriorityBadge score={report.priorityScore} band={report.priorityBand} />
            <StatusBadge status={report.status} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif leading-snug">
          {report.title}
        </h1>

        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {report.description}
        </p>

        {report.imageUrl && (
          <div className="pt-2">
            <img
              src={report.imageUrl}
              alt="Hazard Evidence"
              className="max-h-72 rounded-lg border border-stone-200 object-cover"
            />
          </div>
        )}

        {/* Location & Timestamp strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
            <div>
              <span className="font-medium text-slate-900 block">{report.areaName}</span>
              <span className="text-[11px] text-slate-500">{report.landmark || 'No specific landmark'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-500 bg-stone-100 px-2 py-1 rounded">
              GPS: {report.latitude.toFixed(5)}, {report.longitude.toFixed(5)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 sm:justify-end">
            <Calendar className="w-4 h-4 text-stone-400" />
            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Grid: Priority Breakdown & AI Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transparent Priority Factor Breakdown */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">
              {t.priority.breakdownTitle}
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded">
              Score: {report.priorityScore}/100
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Severity */}
            <div>
              <div className="flex justify-between text-slate-700 mb-1">
                <span className="font-medium">{t.priority.severityLabel}</span>
                <span className="font-bold">{priorityFactors.severity}/100</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-rose-600 h-2 rounded-full"
                  style={{ width: `${priorityFactors.severity}%` }}
                />
              </div>
            </div>

            {/* Recurrence */}
            <div>
              <div className="flex justify-between text-slate-700 mb-1">
                <span className="font-medium">{t.priority.recurrenceLabel}</span>
                <span className="font-bold">{priorityFactors.recurrence}/100</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full"
                  style={{ width: `${priorityFactors.recurrence}%` }}
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <div className="flex justify-between text-slate-700 mb-1">
                <span className="font-medium">{t.priority.durationLabel} ({priorityFactors.durationDays}d open)</span>
                <span className="font-bold">{priorityFactors.durationScore}/100</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-sky-600 h-2 rounded-full"
                  style={{ width: `${priorityFactors.durationScore}%` }}
                />
              </div>
            </div>

            {/* Community Impact */}
            <div>
              <div className="flex justify-between text-slate-700 mb-1">
                <span className="font-medium">{t.priority.communityImpactLabel}</span>
                <span className="font-bold">{priorityFactors.communityImpact}/100</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: `${priorityFactors.communityImpact}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 border-t border-stone-100 pt-3 leading-relaxed">
            {t.priority.disclaimer}
          </p>
        </div>

        {/* AI Diagnostics Card */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-800" />
              <h3 className="font-bold text-sm text-slate-900">
                {t.detail.aiAnalysisHeader}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {report.aiAnalysis.isFallback ? t.detail.fallbackTag : t.detail.modelTag}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-lg space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                Recommended Action
              </span>
              <p className="text-slate-800 font-medium">
                {report.aiAnalysis.recommendedAction}
              </p>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                Extracted Semantic Keywords
              </span>
              <div className="flex flex-wrap gap-1.5">
                {report.aiAnalysis.keywords.map((kw, i) => (
                  <span key={i} className="bg-stone-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {report.aiAnalysis.reasoningFactors && report.aiAnalysis.reasoningFactors.length > 0 && (
              <div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                  Reasoning Factors
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                  {report.aiAnalysis.reasoningFactors.map((rf, idx) => (
                    <li key={idx}>{rf}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step 7: Public Accountability Tracker */}
      <PublicAccountabilityTracker report={report} />

      {/* Nearby Potential Duplicates Section */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-800" />
            <h3 className="font-bold text-sm text-slate-900">
              {t.detail.potentialDuplicatesTitle}
            </h3>
          </div>
          <span className="text-xs text-slate-500">Haversine Spatial &amp; Text Matching</span>
        </div>

        {duplicateCandidates.length === 0 ? (
          <p className="text-xs text-slate-500">
            {t.detail.noDuplicatesFound}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {duplicateCandidates.map((cand) => (
              <div
                key={cand.id}
                onClick={() => navigate(`/issues/${cand.id}`)}
                className="p-3.5 bg-stone-50 hover:bg-emerald-50/50 rounded-lg border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-500 font-semibold">{cand.id}</span>
                  <PriorityBadge score={cand.priorityScore} band={cand.priorityBand} />
                </div>
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                  {cand.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-stone-200">
                  <span>{cand.areaName}</span>
                  <span className="text-emerald-950 font-semibold">Inspect Candidate →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lifecycle Audit Trail & Role-Based Reviewer Control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 shadow-2xs p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b border-stone-100 pb-3">
            {t.detail.statusHistoryHeader}
          </h3>

          <div className="space-y-4">
            {report.statusHistory.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-800 mt-1.5 shrink-0" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold capitalize text-slate-900">
                      {item.status.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Updated by: <strong className="text-slate-700">{item.updatedBy}</strong>
                  </p>
                  {item.note && (
                    <p className="text-slate-600 bg-stone-50 p-2 rounded border border-stone-100 mt-1 text-[11px]">
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 8: Role-Based Reviewer Triage & Approval Control */}
        <div className="lg:col-span-5 bg-stone-50 rounded-xl border border-stone-200 p-6 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-800" />
                Reviewer Triage &amp; Approval
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                isReviewer ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-stone-200 text-slate-600'
              }`}>
                {isReviewer ? 'Reviewer Mode' : 'Reporter Mode'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Role-Based Access Control governs status transitions, repair proof verification, and resolution sign-offs.
            </p>
          </div>

          {!isReviewer ? (
            /* Reporter Mode Notice */
            <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-3 text-xs">
              <div className="flex items-start gap-2 text-amber-900">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Reviewer Authorization Required</strong>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    You are currently using the <strong>Citizen Reporter</strong> persona. Triage actions, squad assignments, and resolution sign-offs are restricted to Municipal Reviewers.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRole('reviewer')}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Switch to Municipal Reviewer Persona</span>
              </button>
            </div>
          ) : (
            /* Reviewer Authorized Form */
            <form onSubmit={handleUpdateStatus} className="space-y-3">
              <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="font-bold block">Authorized Reviewer:</span>
                  <span className="text-[11px] text-amber-900">{userName}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Target Municipal Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as IssueStatus)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white focus:outline-emerald-600"
                >
                  <option value="submitted">{t.statuses.submitted}</option>
                  <option value="under_review">{t.statuses.under_review}</option>
                  <option value="in_progress">{t.statuses.in_progress}</option>
                  <option value="resolved">{t.statuses.resolved} (Resolution Approval)</option>
                  <option value="rejected">{t.statuses.rejected}</option>
                </select>
              </div>

              {/* Assignment details if under review or in progress */}
              {(newStatus === 'under_review' || newStatus === 'in_progress') && (
                <div className="space-y-2 p-3 bg-white rounded-lg border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Department &amp; Squad Assignment
                  </span>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5">Assigned Department</label>
                    <input
                      type="text"
                      value={assignedDepartment}
                      onChange={(e) => setAssignedDepartment(e.target.value)}
                      placeholder="e.g. GHMC Circle Road Maintenance Division"
                      className="w-full text-xs p-2 rounded border border-stone-300 focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5">Assigned Officer / Squad Lead</label>
                    <input
                      type="text"
                      value={assignedOfficer}
                      onChange={(e) => setAssignedOfficer(e.target.value)}
                      placeholder="e.g. Squad #4 Field Engineer"
                      className="w-full text-xs p-2 rounded border border-stone-300 focus:outline-emerald-600"
                    />
                  </div>
                </div>
              )}

              {/* Resolution Approval details if setting to resolved */}
              {newStatus === 'resolved' && (
                <div className="space-y-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-xs">
                    <Camera className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Repair Proof &amp; Resolution Sign-Off</span>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 block mb-0.5">Repair Evidence Photo URL</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={repairEvidenceUrl}
                        onChange={(e) => setRepairEvidenceUrl(e.target.value)}
                        placeholder="https://... or sample proof"
                        className="flex-1 text-xs p-2 rounded border border-stone-300 bg-white focus:outline-emerald-600"
                      />
                      <button
                        type="button"
                        onClick={() => setRepairEvidenceUrl('https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80')}
                        className="px-2 py-1 bg-white border border-stone-300 rounded text-[10px] font-semibold text-slate-700 hover:bg-stone-50"
                      >
                        Sample Proof
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 block mb-0.5">Contractor Repair Notes</label>
                    <input
                      type="text"
                      value={repairNotes}
                      onChange={(e) => setRepairNotes(e.target.value)}
                      placeholder="e.g., Road resurfaced with hot-mix asphalt; level certified."
                      className="w-full text-xs p-2 rounded border border-stone-300 bg-white focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 block mb-0.5">Reviewer Official Approval Notes</label>
                    <input
                      type="text"
                      value={approvalNotes}
                      onChange={(e) => setApprovalNotes(e.target.value)}
                      placeholder="e.g., Remediation inspected and approved. Digital sign-off granted."
                      className="w-full text-xs p-2 rounded border border-stone-300 bg-white focus:outline-emerald-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Public Ledger Action Note
                </label>
                <textarea
                  rows={2}
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  placeholder="e.g., Remediation authorized; work order #GHMC-WO-4921 dispatched."
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-emerald-600"
                />
              </div>

              {updateSuccess && (
                <div className="p-2.5 bg-emerald-100/90 text-emerald-950 rounded-lg text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>{t.detail.statusUpdatedToast}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={updating}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{updating ? 'Authorizing...' : newStatus === 'resolved' ? 'Sign-Off & Approve Resolution' : 'Certify Status Transition'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
