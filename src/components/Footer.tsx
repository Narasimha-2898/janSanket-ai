import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { ShieldCheck, MapPin, Sparkles, Heart } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { language, setLanguage, t, languages } = useI18n();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                JS
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight font-serif">
                {t.brand.name}
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              {t.brand.tagline} — {t.brand.subTagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Classification &amp; GIS Hotspot Clustering Architecture</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/map')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.exploreMap}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/report')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.reportIssue}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.impactDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Languages Quick Switcher */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Regional Language
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {languages.slice(0, 8).map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code as SupportedLanguage)}
                  className={`text-left px-2 py-1 rounded transition-colors text-xs truncate ${
                    language === l.code
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legal, Privacy & Demo Disclosure */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-stone-500">
          <div className="space-y-1 max-w-2xl">
            <p className="flex items-center gap-1.5 text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.footer.privacyNotice}</span>
            </p>
            <p className="text-[11px] text-stone-500">
              {t.footer.demoNotice}
            </p>
          </div>

          <div className="text-right text-[11px] text-stone-400 flex items-center gap-1">
            <span>{t.footer.developedFor}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
