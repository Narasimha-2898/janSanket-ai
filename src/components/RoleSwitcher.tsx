import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Shield, ChevronDown, Check } from 'lucide-react';
import { UserRole } from '../types';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole, isReviewer } = useAuth();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all shadow-2xs ${
          isReviewer
            ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100/80'
            : 'bg-emerald-50 text-emerald-950 border-emerald-200 hover:bg-emerald-100/80'
        }`}
        title="Toggle between Citizen Reporter and Municipal Reviewer roles"
        aria-label="User Role Selection"
      >
        {isReviewer ? (
          <Shield className="w-3.5 h-3.5 text-amber-700" />
        ) : (
          <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
        )}
        <span className="hidden sm:inline">Role:</span>
        <span className="font-bold">
          {isReviewer ? 'Reviewer' : 'Reporter'}
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-stone-200 shadow-xl py-2 z-50 divide-y divide-stone-100">
          <div className="px-3 py-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Role-Based Access Control
            </span>
            <p className="text-[11px] text-slate-500">
              Select your persona to test role permissions.
            </p>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setRole('reporter');
                setOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                !isReviewer ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-semibold">Citizen Reporter</div>
                  <div className="text-[10px] text-slate-500 font-normal">Can file reports &amp; view public audit trackers</div>
                </div>
              </div>
              {!isReviewer && <Check className="w-4 h-4 text-emerald-700" />}
            </button>

            <button
              onClick={() => {
                setRole('reviewer');
                setOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                isReviewer ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <div className="font-semibold">Municipal Reviewer</div>
                  <div className="text-[10px] text-slate-500 font-normal">Authorized to triage, upload repair proof &amp; approve resolutions</div>
                </div>
              </div>
              {isReviewer && <Check className="w-4 h-4 text-amber-700" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
