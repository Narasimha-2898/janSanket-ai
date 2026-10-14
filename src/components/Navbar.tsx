import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { Globe, Menu, X, PlusCircle, MapPin, BarChart3, Info, Home } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { RoleSwitcher } from './RoleSwitcher';
import { NotificationDrawer } from './NotificationDrawer';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { language, setLanguage, t, languages } = useI18n();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLangMeta = languages.find((l) => l.code === language) || languages[0];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: t.nav.home, icon: Home },
    { path: '/map', label: t.nav.exploreMap, icon: MapPin },
    { path: '/dashboard', label: t.nav.impactDashboard, icon: BarChart3 },
    { path: '/about', label: t.nav.about, icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-2 focus-visible:outline-emerald-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-900 text-emerald-100 flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-800 transition-colors">
              <span className="tracking-tighter">JS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight font-serif">
                  {t.brand.name}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                  MY Bharat
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block leading-none truncate max-w-xs">
                {t.brand.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? 'text-emerald-950 font-semibold bg-stone-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100/80'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Role Switcher, Smart Notifications, Language Switcher & Primary CTA */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Role Switcher (Step 8: RBAC) */}
            <RoleSwitcher />

            {/* Smart Notifications Drawer (Step 9) */}
            <NotificationDrawer navigate={navigate} />

            {/* Functional Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 rounded-md transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-emerald-600"
                aria-expanded={langMenuOpen}
                aria-haspopup="listbox"
                title="Select regional language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-medium text-slate-900">{currentLangMeta.nativeName}</span>
                <span className="text-[10px] text-slate-400">({currentLangMeta.code.toUpperCase()})</span>
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-52 max-h-80 overflow-y-auto bg-white border border-stone-200 rounded-lg shadow-lg py-1 z-50 divide-y divide-stone-100 focus:outline-none"
                  role="listbox"
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Regional Languages (12)
                  </div>
                  <div className="py-1">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLanguage(l.code as SupportedLanguage);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          language === l.code
                            ? 'bg-emerald-50 text-emerald-900 font-bold'
                            : 'text-slate-700 hover:bg-stone-50'
                        }`}
                        role="option"
                        aria-selected={language === l.code}
                      >
                        <span className="font-medium">{l.nativeName}</span>
                        <span className="text-[11px] text-slate-400">{l.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <button
              onClick={() => handleNav('/report')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 rounded-md shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.nav.ctaReport}</span>
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex sm:hidden items-center gap-1.5">
            <RoleSwitcher />
            <NotificationDrawer navigate={navigate} />
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md border border-stone-200 bg-stone-50"
              aria-label="Language"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Language Picker Drawer if open */}
        {langMenuOpen && (
          <div className="sm:hidden border-t border-stone-200 py-2 grid grid-cols-3 gap-1 bg-white p-2 rounded-b-lg shadow-md">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code as SupportedLanguage);
                  setLangMenuOpen(false);
                }}
                className={`py-1.5 px-2 text-xs rounded text-center truncate ${
                  language === l.code
                    ? 'bg-emerald-900 text-white font-bold'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                {l.nativeName}
              </button>
            ))}
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = currentPath === link.path;
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-md text-left ${
                    active
                      ? 'bg-emerald-50 text-emerald-950 font-bold'
                      : 'text-slate-700 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{link.label}</span>
                </button>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => handleNav('/report')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-md shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.nav.ctaReport}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
