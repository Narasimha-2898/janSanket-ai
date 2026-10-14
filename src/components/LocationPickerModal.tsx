import React, { useState } from 'react';
import { LeafletMap } from './LeafletMap';
import { HYDERABAD_DEFAULT_CENTER, HYDERABAD_LANDMARKS } from '../utils/geo';
import { MapPin, Navigation, Check, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface LocationPickerModalProps {
  initialLat: number;
  initialLng: number;
  initialLandmark?: string;
  onConfirm: (lat: number, lng: number, landmark?: string) => void;
  onClose: () => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  initialLat,
  initialLng,
  initialLandmark = '',
  onConfirm,
  onClose,
}) => {
  const { t } = useI18n();
  const [lat, setLat] = useState(initialLat || HYDERABAD_DEFAULT_CENTER.lat);
  const [lng, setLng] = useState(initialLng || HYDERABAD_DEFAULT_CENTER.lng);
  const [landmark, setLandmark] = useState(initialLandmark);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => {
        setGeoLoading(false);
        setGeoError('Location permission was denied or signal unavailable. You can click on the map directly.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSelectLandmarkPreset = (lm: typeof HYDERABAD_LANDMARKS[0]) => {
    setLat(lm.lat);
    setLng(lm.lng);
    setLandmark(`${lm.name}, ${lm.area}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-stone-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-800" />
            <h3 className="font-bold text-slate-900 text-sm">{t.reportForm.locationHeading}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {/* Quick Preset Buttons */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Quick Landmark Presets (Hyderabad Locality)
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-stone-50 border border-stone-200 rounded-md">
              {HYDERABAD_LANDMARKS.slice(0, 7).map((lm) => (
                <button
                  key={lm.name}
                  type="button"
                  onClick={() => handleSelectLandmarkPreset(lm)}
                  className="px-2 py-1 text-xs bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 rounded text-slate-700 transition-colors text-left"
                >
                  {lm.name}
                </button>
              ))}
            </div>
          </div>

          {/* GPS Button & Feedback */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUseGPS}
              disabled={geoLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-md transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{geoLoading ? t.reportForm.gettingLocation : t.reportForm.useMyLocation}</span>
            </button>
            <span className="text-xs text-slate-500">or click anywhere on the map below</span>
          </div>

          {geoError && (
            <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
              {geoError}
            </p>
          )}

          {/* Interactive Map */}
          <div className="border border-stone-200 rounded-lg overflow-hidden">
            <LeafletMap
              reports={[]}
              interactivePicker={true}
              pickerLat={lat}
              pickerLng={lng}
              onPickLocation={(newLat, newLng) => {
                setLat(newLat);
                setLng(newLng);
              }}
              height="280px"
              zoom={13}
              center={[lat, lng]}
            />
          </div>

          {/* Coordinate Display & Landmark Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block">
                {t.reportForm.landmarkLabel}
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder={t.reportForm.landmarkPlaceholder}
                className="w-full text-xs px-3 py-1.5 rounded-md border border-stone-300 focus:outline-emerald-600 focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block">
                GPS Coordinates
              </label>
              <div className="text-xs font-mono bg-stone-100 px-3 py-1.5 rounded-md border border-stone-200 text-slate-700">
                {lat.toFixed(6)}, {lng.toFixed(6)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-200/60 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(lat, lng, landmark);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-md shadow-xs transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};
