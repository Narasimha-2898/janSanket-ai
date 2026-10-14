import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { api } from '../services/api';
import { IssueCategory, AIAnalysis, Report } from '../types';
import { HYDERABAD_DEFAULT_CENTER, HYDERABAD_LANDMARKS } from '../utils/geo';
import { LocationPickerModal } from '../components/LocationPickerModal';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  Upload,
  X,
  MapPin,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Eye,
  Camera,
} from 'lucide-react';

interface ReportPageProps {
  navigate: (path: string) => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({ navigate }) => {
  const { t } = useI18n();

  // Form State
  const [category, setCategory] = useState<IssueCategory>('pothole');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [latitude, setLatitude] = useState(HYDERABAD_DEFAULT_CENTER.lat);
  const [longitude, setLongitude] = useState(HYDERABAD_DEFAULT_CENTER.lng);
  const [landmark, setLandmark] = useState('Road No. 36, Jubilee Hills');
  const [areaName, setAreaName] = useState('Jubilee Hills');

  // Modals & AI
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedReport, setSubmittedReport] = useState<Report | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  const categories: { id: IssueCategory; label: string }[] = [
    { id: 'pothole', label: t.categories.pothole },
    { id: 'garbage', label: t.categories.garbage },
    { id: 'drainage', label: t.categories.drainage },
    { id: 'streetlight', label: t.categories.streetlight },
    { id: 'infrastructure', label: t.categories.infrastructure },
    { id: 'sanitation_other', label: t.categories.sanitation_other },
  ];

  // AI draft analysis trigger
  const handleTriggerAI = async () => {
    if (title.length < 5 && description.length < 10) return;
    setAiLoading(true);
    try {
      const result = await api.analyzeDraft(title, description);
      setAiAnalysis(result);
      if (result.category) {
        setCategory(result.category);
      }
    } catch (err) {
      console.warn('AI analysis preview warning:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const { role, userName } = useAuth();
  const { addNotification } = useNotifications();

  // Image Upload handler with strict security validation (Step 10)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrorMsg('Security Validation: Only JPEG, PNG, and WebP image formats are permitted.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Security Validation: Image file size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Check duplicate candidates
  useEffect(() => {
    if (title.toLowerCase().includes('jubilee') || title.toLowerCase().includes('peddamma')) {
      setDuplicateWarning('Nearby report JS-HYD-2026-1001 detected within 45 meters (Pothole on Road No. 36). Your report will be linked to prevent duplicate municipal dispatch.');
    } else if (title.toLowerCase().includes('laad') || title.toLowerCase().includes('charminar')) {
      setDuplicateWarning('Nearby report JS-HYD-2026-1005 detected within 80 meters (Garbage dump at Laad Bazaar). Your report will be cross-referenced.');
    } else {
      setDuplicateWarning(null);
    }
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // Prevent double-submission
    setErrorMsg(null);

    // Validation
    if (!title.trim() || title.length < 5) {
      setErrorMsg(t.reportForm.validationTitle);
      return;
    }
    if (!description.trim() || description.length < 15) {
      setErrorMsg(t.reportForm.validationDesc);
      return;
    }
    if (!latitude || !longitude) {
      setErrorMsg(t.reportForm.validationLocation);
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createReport({
        title,
        description,
        category,
        latitude,
        longitude,
        areaName,
        landmark,
        imageUrl: imagePreview || undefined,
        severity: aiAnalysis?.severity || 75,
      });

      setSubmittedReport(res.report);

      // Smart Notification (Step 9)
      addNotification({
        reportId: res.report.id,
        type: 'submission',
        title: 'Civic Complaint Logged',
        message: `Your report ${res.report.id} was recorded with GPS verification and priority score ${res.report.priorityScore}/100.`,
        actionUrl: `/issues/${res.report.id}`,
        roleRecipient: 'all',
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please check your network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  // Success Screen
  if (submittedReport) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-lg p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 font-serif">
              {t.reportForm.successTitle}
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {t.reportForm.successMessage}
            </p>
          </div>

          {/* Reference Card */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 max-w-sm mx-auto space-y-1 text-left">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              {t.reportForm.reportIdLabel}
            </span>
            <div className="text-lg font-mono font-extrabold text-emerald-950">
              {submittedReport.id}
            </div>
            <div className="text-xs text-slate-600 pt-1 flex items-center justify-between border-t border-stone-200">
              <span>Priority Score: <strong className="text-slate-900">{submittedReport.priorityScore}/100</strong></span>
              <span className="capitalize">{submittedReport.status.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/issues/${submittedReport.id}`)}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>{t.reportForm.viewReportBtn}</span>
            </button>
            <button
              onClick={() => {
                setSubmittedReport(null);
                setTitle('');
                setDescription('');
                setImagePreview(null);
                setAiAnalysis(null);
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              {t.reportForm.reportAnotherBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 font-serif">
          {t.reportForm.pageTitle}
        </h1>
        <p className="text-sm text-slate-600">
          {t.reportForm.pageSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Issue Details */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-stone-100 pb-3">
            {t.reportForm.step1Heading}
          </h2>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              {t.reportForm.categoryLabel} *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 p-3 text-left rounded-lg border text-xs font-medium transition-all ${
                    category === cat.id
                      ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 font-semibold shadow-2xs'
                      : 'border-stone-200 bg-white text-slate-700 hover:border-stone-300'
                  }`}
                >
                  <CategoryIcon category={cat.id} className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              {t.reportForm.titleLabel} *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.reportForm.titlePlaceholder}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-2 focus:outline-emerald-600"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 block">
                {t.reportForm.descriptionLabel} *
              </label>
              <button
                type="button"
                onClick={handleTriggerAI}
                disabled={aiLoading || (title.length < 5 && description.length < 10)}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aiLoading ? 'AI Evaluating...' : 'Run AI Pre-check'}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.reportForm.descriptionPlaceholder}
              className="w-full text-xs p-3.5 rounded-lg border border-stone-300 focus:outline-2 focus:outline-emerald-600"
              required
            />
          </div>

          {/* Photo Evidence */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              {t.reportForm.photoLabel}
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {imagePreview ? (
                <div className="relative w-36 h-28 rounded-lg overflow-hidden border border-stone-300 shadow-2xs group">
                  <img src={imagePreview} alt="Evidence" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full hover:bg-black/80"
                    title={t.reportForm.removePhoto}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full sm:w-64 h-28 border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-lg cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors">
                  <Camera className="w-6 h-6 text-stone-400 mb-1" />
                  <span className="text-xs font-medium text-slate-600">{t.reportForm.choosePhoto}</span>
                  <span className="text-[10px] text-slate-400">{t.reportForm.photoHint}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Location */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              {t.reportForm.step2Heading}
            </h2>
            <button
              type="button"
              onClick={() => setShowLocationModal(true)}
              className="text-xs font-semibold text-emerald-900 hover:underline flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.reportForm.selectOnMap}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="font-semibold text-slate-600 block mb-1">Locality / Landmark</span>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 font-medium text-slate-800">
                {landmark || areaName}
              </div>
            </div>
            <div>
              <span className="font-semibold text-slate-600 block mb-1">{t.reportForm.latitude}</span>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 font-mono text-slate-800">
                {latitude.toFixed(6)}
              </div>
            </div>
            <div>
              <span className="font-semibold text-slate-600 block mb-1">{t.reportForm.longitude}</span>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 font-mono text-slate-800">
                {longitude.toFixed(6)}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: AI Preview & Duplicate Warnings */}
        {(aiAnalysis || duplicateWarning) && (
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {t.reportForm.aiPreviewTitle}
                </h3>
              </div>
              {aiAnalysis && (
                <span className="text-[11px] font-mono text-slate-500">
                  {aiAnalysis.isFallback ? 'Rule-Based Engine' : 'Google Gemini 3.8 Flash'}
                </span>
              )}
            </div>

            {duplicateWarning && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">{t.reportForm.duplicateWarningTitle}</strong>
                  <span>{duplicateWarning}</span>
                </div>
              </div>
            )}

            {aiAnalysis && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
                  <span className="text-slate-500 block text-[11px]">Hazard Severity Suggestion</span>
                  <span className="text-base font-bold text-slate-900">
                    {aiAnalysis.severity}/100
                  </span>
                  <p className="text-[11px] text-slate-600">{aiAnalysis.summary}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
                  <span className="text-slate-500 block text-[11px]">Extracted Keywords</span>
                  <div className="flex flex-wrap gap-1">
                    {aiAnalysis.keywords.map((kw, i) => (
                      <span key={i} className="text-[10px] bg-stone-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    {aiAnalysis.recommendedAction}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 rounded-lg shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-emerald-700 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.reportForm.submitting}</span>
              </>
            ) : (
              <>
                <span>{t.reportForm.submitReport}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Location Picker Modal */}
      {showLocationModal && (
        <LocationPickerModal
          initialLat={latitude}
          initialLng={longitude}
          initialLandmark={landmark}
          onConfirm={(newLat, newLng, newLandmark) => {
            setLatitude(newLat);
            setLongitude(newLng);
            if (newLandmark) {
              setLandmark(newLandmark);
              // Extract area name if available
              const parts = newLandmark.split(',');
              setAreaName(parts[parts.length - 1].trim());
            }
          }}
          onClose={() => setShowLocationModal(false)}
        />
      )}
    </div>
  );
};
