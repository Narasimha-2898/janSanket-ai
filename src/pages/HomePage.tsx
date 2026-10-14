import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { api } from '../services/api';
import { Report, AnalyticsSummary } from '../types';
import { LeafletMap } from '../components/LeafletMap';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  ArrowRight,
  PlusCircle,
  MapPin,
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { t } = useI18n();
  const [reports, setReports] = useState<Report[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [repRes, sumRes] = await Promise.all([
          api.getReports({ limit: 25, sort: 'priority' }),
          api.getAnalyticsSummary(),
        ]);
        setReports(repRes.reports);
        setSummary(sumRes);
      } catch (err) {
        console.error('Failed to load home page data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const highPriorityReports = reports.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-8 border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/80 text-emerald-900 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>AI + GIS for Community Impact · MY Bharat Hackathon</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-serif leading-[1.12]">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.hero.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/report')}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 rounded-lg shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-emerald-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/map')}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg shadow-2xs transition-all"
                >
                  <MapPin className="w-4 h-4 text-emerald-800" />
                  <span>{t.hero.secondaryCta}</span>
                </button>
              </div>

              {/* Demo Notice Banner */}
              <div className="p-3 bg-stone-100/90 border border-stone-200 rounded-lg text-xs text-slate-600 flex items-start gap-2 max-w-xl">
                <span className="font-semibold text-slate-900 shrink-0">Demo Environment:</span>
                <span>{t.hero.demoNotice}</span>
              </div>
            </div>

            {/* Right Visual: Stylized Priority Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Explainable Prioritization
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    0.40S + 0.25R + 0.20D + 0.15U
                  </span>
                </div>

                {/* Sample Priority Card Preview */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono font-medium">JS-HYD-2026-1001</span>
                    <PriorityBadge score={88} band="critical" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    Severe crater-like pothole on Road No. 36 near Peddamma Metro
                  </h4>
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>Jubilee Hills · Reported 8 days ago</span>
                  </div>

                  {/* Factor Breakdown Mini-bars */}
                  <div className="pt-2 space-y-1.5 border-t border-stone-200 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Hazard Severity (40%)</span>
                      <span className="font-semibold">88/100</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-1.5">
                      <div className="bg-rose-600 h-1.5 rounded-full" style={{ width: '88%' }} />
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Spatial Recurrence / Duplicate Cluster (25%)</span>
                      <span className="font-semibold">82/100</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-1.5">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Nearby duplicate flagged (45m)</span>
                  </span>
                  <button
                    onClick={() => navigate('/issues/JS-HYD-2026-1001')}
                    className="text-xs font-semibold text-emerald-950 hover:underline"
                  >
                    Inspect Full Audit →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* LIVE IMPACT STRIP */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {t.impactStrip.title}
              </h2>
              <p className="text-xs text-slate-500">
                Live metrics derived from application database ({summary?.totalReports || 22} sample records).
              </p>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-stone-100 px-2 py-1 rounded">
              Hyderabad Zonal Pilot
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-xs text-slate-500 block">{t.impactStrip.totalReports}</span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
                {summary?.totalReports || 22}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-xs text-amber-800 block">{t.impactStrip.openIssues}</span>
              <span className="text-2xl font-extrabold text-amber-900 mt-1 block">
                {summary?.unresolvedReports || 10}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-xs text-indigo-800 block">{t.impactStrip.inProgress}</span>
              <span className="text-2xl font-extrabold text-indigo-900 mt-1 block">
                {summary?.inProgressReports || 7}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-xs text-emerald-800 block">{t.impactStrip.resolvedIssues}</span>
              <span className="text-2xl font-extrabold text-emerald-900 mt-1 block">
                {summary?.resolvedReports || 4}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-xs text-rose-800 block">{t.priority.critical}</span>
              <span className="text-2xl font-extrabold text-rose-900 mt-1 block">
                {summary?.criticalReports || 5}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-xs text-slate-600 block">{t.impactStrip.hotspotsIdentified}</span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
                {summary?.hotspotsCount || 4}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* HOW IT WORKS */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            {t.howItWorks.title}
          </h2>
          <p className="text-sm text-slate-600">{t.howItWorks.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.howItWorks.step1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.howItWorks.step1Desc}</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-900 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.howItWorks.step2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.howItWorks.step2Desc}</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.howItWorks.step3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.howItWorks.step3Desc}</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.howItWorks.step4Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.howItWorks.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE MAP PREVIEW */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              {t.map.pageTitle}
            </h2>
            <p className="text-xs text-slate-600">{t.map.pageSubtitle}</p>
          </div>
          <button
            onClick={() => navigate('/map')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200/80 rounded-md transition-colors self-start sm:self-auto"
          >
            <span>Open Full Interactive GIS Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <LeafletMap
          reports={reports}
          showHotspots={true}
          height="450px"
          onSelectReport={(id) => navigate(`/issues/${id}`)}
        />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURED CIVIC PRIORITIES */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Top Priority Community Action Queue
            </h2>
            <p className="text-xs text-slate-600">
              Ranked dynamically by the transparent multi-factor formula.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs font-semibold text-emerald-900 hover:underline flex items-center gap-1"
          >
            <span>View All Queue Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highPriorityReports.map((report) => (
            <div
              key={report.id}
              onClick={() => navigate(`/issues/${report.id}`)}
              className="p-5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CategoryIcon category={report.category} className="w-4 h-4 text-emerald-800" />
                    <span className="font-mono text-slate-500 font-medium">{report.id}</span>
                  </div>
                  <PriorityBadge score={report.priorityScore} band={report.priorityBand} />
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {report.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {report.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{report.areaName}</span>
                </div>
                <StatusBadge status={report.status} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* WHY JANSANKET AI */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Core Technical Differentiators
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Why JanSanket AI Transforms Municipal Governance
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Bridging citizens and urban local bodies through geospatial intelligence, duplicate pruning, and explainable prioritization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-300 text-xs leading-relaxed">
            <div className="p-5 bg-stone-800/80 rounded-xl border border-stone-700/80 space-y-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm text-white">Spatial Duplicate Intelligence</h4>
              <p>
                Haversine distance and token frequency matching prevent identical complaints from fragmenting attention, uniting community voices into single actionable tickets.
              </p>
            </div>

            <div className="p-5 bg-stone-800/80 rounded-xl border border-stone-700/80 space-y-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm text-white">Radical Priority Transparency</h4>
              <p>
                Zero black-box AI bias. The verified formula (0.40S + 0.25R + 0.20D + 0.15U) enables every citizen to inspect why a specific road or drain is ranked higher.
              </p>
            </div>

            <div className="p-5 bg-stone-800/80 rounded-xl border border-stone-700/80 space-y-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm text-white">12-Language Inclusivity</h4>
              <p>
                Empowering all Indian citizens to file reports and track remediation in their mother tongue with complete full-site internationalization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
