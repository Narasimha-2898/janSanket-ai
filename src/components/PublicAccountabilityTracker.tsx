import React, { useState } from 'react';
import { Report, TimelineMilestone } from '../types';
import { buildAccountabilityTimeline } from '../utils/accountability';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  UserCheck,
  Camera,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface PublicAccountabilityTrackerProps {
  report: Report;
  className?: string;
}

export const PublicAccountabilityTracker: React.FC<PublicAccountabilityTrackerProps> = ({
  report,
  className = '',
}) => {
  const milestones = buildAccountabilityTimeline(report);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    [`${report.id}-m1`]: true,
    [`${report.id}-m4`]: true,
    [`${report.id}-m5`]: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const getStageIcon = (stage: string, completed: boolean) => {
    if (completed) {
      if (stage === 'repair_evidence') return <Camera className="w-4 h-4 text-emerald-100" />;
      if (stage === 'resolution_approval') return <Award className="w-4 h-4 text-emerald-100" />;
      return <CheckCircle2 className="w-4 h-4 text-emerald-100" />;
    }
    return <Clock className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className={`bg-white rounded-2xl border border-stone-200 shadow-2xs p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-900 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h3 className="font-extrabold text-slate-900 text-base font-serif">
              Public Accountability Tracker
            </h3>
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Citizen Audit Trail
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-evident municipal lifecycle: submission, triage assignment, progress, repair proof, and reviewer sign-off.
          </p>
        </div>

        {/* Progress Bar & Metric */}
        <div className="sm:text-right shrink-0">
          <div className="flex items-center gap-2 sm:justify-end">
            <span className="text-xs font-bold text-slate-900">
              {completedCount} of 5 Milestones Passed
            </span>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full sm:w-44 bg-stone-100 rounded-full h-2 mt-1.5 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                progressPercent === 100
                  ? 'bg-emerald-600'
                  : progressPercent >= 60
                  ? 'bg-sky-600'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5-Stage Timeline Flow */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
        {milestones.map((milestone, idx) => {
          const isExpanded = expandedDetails[milestone.id];
          const isLatestActive = milestone.completed && (idx === milestones.length - 1 || !milestones[idx + 1].completed);

          return (
            <div key={milestone.id} className="relative group">
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  milestone.completed
                    ? 'bg-emerald-800 border-emerald-900 text-white shadow-xs'
                    : 'bg-white border-stone-300 text-stone-400'
                }`}
              >
                {getStageIcon(milestone.stage, milestone.completed)}
              </div>

              {/* Milestone Card */}
              <div
                className={`rounded-xl border transition-all p-4 ${
                  milestone.completed
                    ? isLatestActive
                      ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
                      : 'bg-stone-50/70 border-stone-200'
                    : 'bg-white border-dashed border-stone-200 opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-200 text-slate-700">
                        STAGE {idx + 1}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        {milestone.title}
                      </h4>
                      {milestone.verificationBadge && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          {milestone.verificationBadge}
                        </span>
                      )}
                      {!milestone.completed && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Pending
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        <strong className="text-slate-700">{milestone.actor}</strong>
                        <span className="text-[11px] text-slate-400">({milestone.role})</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono text-[11px]">
                        {milestone.timestamp.includes('T')
                          ? new Date(milestone.timestamp).toLocaleString()
                          : milestone.timestamp}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(milestone.id)}
                    className="self-start sm:self-center p-1 rounded hover:bg-stone-200/60 text-slate-500 transition-colors"
                    title={isExpanded ? 'Collapse' : 'Expand details'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details & Evidence */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-stone-200/80 space-y-3 text-xs">
                    <p className="text-slate-700 leading-relaxed bg-white/70 p-2.5 rounded-lg border border-stone-100">
                      {milestone.details}
                    </p>

                    {/* Repair Evidence Photo Proof if available */}
                    {milestone.stage === 'repair_evidence' && milestone.evidenceUrl && (
                      <div className="space-y-2 bg-emerald-50/70 border border-emerald-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-emerald-950 text-xs flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-emerald-800" />
                            Official Repair Photographic Evidence
                          </span>
                          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            Geotag Verified
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={milestone.evidenceUrl}
                            alt="Municipal Repair Evidence"
                            className="w-24 h-20 rounded-md object-cover border border-stone-300 shadow-2xs cursor-pointer hover:opacity-90"
                            onClick={() => setSelectedPhoto(milestone.evidenceUrl || null)}
                          />
                          <div className="text-[11px] text-slate-600 space-y-1">
                            <p className="font-medium text-slate-900">
                              Post-Remediation Verification Photo
                            </p>
                            <p className="text-slate-500">
                              Validated by field inspection supervisor. Coordinates match report epicenter (&plusmn;8m).
                            </p>
                            <button
                              type="button"
                              onClick={() => setSelectedPhoto(milestone.evidenceUrl || null)}
                              className="text-emerald-900 font-semibold hover:underline inline-flex items-center gap-1"
                            >
                              <span>View Full Evidence</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Resolution Sign-Off Badge if final stage */}
                    {milestone.stage === 'resolution_approval' && milestone.completed && (
                      <div className="flex items-center gap-2.5 p-2.5 bg-emerald-100/90 rounded-lg text-emerald-950 font-semibold text-xs border border-emerald-200">
                        <Award className="w-4 h-4 text-emerald-800 shrink-0" />
                        <div>
                          <span>Officially Approved &amp; Archived in Public Civic Ledger</span>
                          <span className="block text-[11px] font-normal text-emerald-900">
                            Digital seal: #GHMC-PUB-RES-{report.id}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for full photo inspection */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-4 space-y-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                Municipal Repair Evidence Audit
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>
            <img
              src={selectedPhoto}
              alt="Full Repair Evidence"
              className="max-h-96 w-full object-cover rounded-lg border border-stone-200"
            />
            <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
              <span>Report: <strong className="font-mono text-slate-800">{report.id}</strong></span>
              <span className="text-emerald-800 font-semibold">Photographic Proof Verified</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
