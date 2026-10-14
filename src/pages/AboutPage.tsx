import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import {
  ShieldCheck,
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
  Compass,
  Cpu,
  Award,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded text-[11px] font-semibold">
          MY Bharat Hack for Social Issues · Civic Infrastructure Track
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          {t.about.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t.about.subtitle}
        </p>
      </div>

      {/* Mission Section */}
      <section className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-800" />
          <span>{t.about.missionTitle}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {t.about.missionText}
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          In typical municipal portals, the loud citizen or repetitive duplicate complaint gets serviced, while quiet hazards near schools or low-income neighborhoods fester for months. JanSanket AI replaces arbitrary triage with a mathematical, location-aware prioritization engine.
        </p>
      </section>

      {/* Transparent Formula */}
      <section className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-800" />
            <span>{t.about.formulaTitle}</span>
          </h2>
          <span className="font-mono text-xs bg-emerald-50 text-emerald-900 font-bold px-2 py-1 rounded">
            Scale: 0 to 100
          </span>
        </div>

        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs sm:text-sm text-center font-bold text-slate-900">
          Priority Score = 0.40S + 0.25R + 0.20D + 0.15U
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-3 bg-stone-50 rounded-lg space-y-1">
            <span className="font-bold text-rose-800">S — Severity (Weight: 40%)</span>
            <p className="text-[11px] text-slate-600">
              Evaluated via AI semantic analysis or rule-based hazard classification based on structural risk to pedestrians, cyclists, and vehicles.
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg space-y-1">
            <span className="font-bold text-amber-800">R — Recurrence / Density (Weight: 25%)</span>
            <p className="text-[11px] text-slate-600">
              Computed from verified independent nearby complaints within 300m using Haversine distance and text token similarity.
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg space-y-1">
            <span className="font-bold text-sky-800">D — Duration Unresolved (Weight: 20%)</span>
            <p className="text-[11px] text-slate-600">
              Scaled based on days elapsed since initial report submission, escalating long-ignored civic defects before they cause critical accidents.
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg space-y-1">
            <span className="font-bold text-emerald-800">U — Community Impact (Weight: 15%)</span>
            <p className="text-[11px] text-slate-600">
              Reflects proximity to major arterial transit corridors, public bus terminals, schools, hospitals, and heavy pedestrian density.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 italic pt-2">
          *Note: These demonstration weights are configurable by municipal zone and require ongoing civic calibration.
        </p>
      </section>

      {/* Responsible AI & Honest Fallback */}
      <section className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
          <span>{t.about.aiDisclaimerTitle}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {t.about.aiDisclaimerText}
        </p>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-1">
          <span className="font-bold block">Zero-Downtime Deterministic Fallback Mode:</span>
          <span>
            If the Google Gemini API key is absent or unreachable, JanSanket AI transitions smoothly to a rule-based deterministic civic parser, ensuring complete functional availability for hackathon judges and citizens without degraded UI.
          </span>
        </div>
      </section>

      {/* Judging Presentation Guide */}
      <section className="bg-stone-900 text-stone-200 rounded-xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white font-serif">
            Hackathon Judging Differentiators Quick-Walkthrough
          </h2>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-stone-300">
          <div className="p-3 bg-stone-800 rounded-lg space-y-1">
            <span className="font-bold text-emerald-400">1. Nearby Duplicate Intelligence:</span>
            <p>
              Open reports <code>JS-HYD-2026-1001</code> and <code>JS-HYD-2026-1002</code>. The system detects they are both regarding a deep pothole on Road 36 Jubilee Hills within 45m and cross-references them instead of blindly treating them as separate road failures.
            </p>
          </div>

          <div className="p-3 bg-stone-800 rounded-lg space-y-1">
            <span className="font-bold text-emerald-400">2. Explainable Civic Priority:</span>
            <p>
              Inspect any report detail page. View the exact contribution of Severity (40%), Recurrence (25%), Duration (20%), and Community Impact (15%).
            </p>
          </div>

          <div className="p-3 bg-stone-800 rounded-lg space-y-1">
            <span className="font-bold text-emerald-400">3. GIS Hotspot Clustering:</span>
            <p>
              Open the Civic Map and toggle &quot;Show GIS Hotspot Clusters&quot;. Real spatial clusters group complaints within a 600m radius in Hyderabad (Jubilee Hills, Charminar, Ameerpet, Tolichowki).
            </p>
          </div>

          <div className="p-3 bg-stone-800 rounded-lg space-y-1">
            <span className="font-bold text-emerald-400">4. 12-Language Regional Inclusion:</span>
            <p>
              Switch to हिन्दी (Hindi), తెలుగు (Telugu), or اردو (Urdu with RTL). Notice the entire site translates instantly with persistence in localStorage across routes and reloads.
            </p>
          </div>

          <div className="p-3 bg-stone-800 rounded-lg space-y-1">
            <span className="font-bold text-emerald-400">5. End-to-End Live Update:</span>
            <p>
              Submit a new report on <code>/report</code>. Watch it appear immediately on the Map, the Dashboard KPIs, and the Prioritized Action Queue with a calculated score!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
