import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Report, HotspotCluster, IssueCategory } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { HYDERABAD_DEFAULT_CENTER } from '../utils/geo';

interface LeafletMapProps {
  reports: Report[];
  hotspots?: HotspotCluster[];
  showHotspots?: boolean;
  selectedReportId?: string | null;
  onSelectReport?: (reportId: string) => void;
  interactivePicker?: boolean;
  pickerLat?: number;
  pickerLng?: number;
  onPickLocation?: (lat: number, lng: number) => void;
  height?: string;
  zoom?: number;
  center?: [number, number];
}

// Category color palettes for custom SVG markers
const CATEGORY_COLORS: Record<IssueCategory, { bg: string; fill: string }> = {
  pothole: { bg: '#c2410c', fill: '#ea580c' },
  garbage: { bg: '#854d0e', fill: '#ca8a04' },
  drainage: { bg: '#0369a1', fill: '#0284c7' },
  streetlight: { bg: '#7c2d12', fill: '#eab308' },
  infrastructure: { bg: '#334155', fill: '#64748b' },
  sanitation_other: { bg: '#065f46', fill: '#059669' },
};

function createCustomPin(category: IssueCategory, score: number, isSelected: boolean) {
  const theme = CATEGORY_COLORS[category] || { bg: '#0f172a', fill: '#334155' };
  const size = isSelected ? 38 : 30;
  const strokeWidth = isSelected ? 3 : 1.5;
  const strokeColor = isSelected ? '#ffffff' : '#f8fafc';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 32 40">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.35"/>
        </filter>
      </defs>
      <path d="M16 0C7.16 0 0 7.16 0 16c0 10.8 14.2 22.8 14.8 23.3.7.6 1.7.6 2.4 0C17.8 38.8 32 26.8 32 16 32 7.16 24.84 0 16 0z" 
            fill="${theme.bg}" 
            stroke="${strokeColor}" 
            stroke-width="${strokeWidth}" 
            filter="url(#shadow)"/>
      <circle cx="16" cy="15" r="9" fill="${theme.fill}"/>
      <text x="16" y="18" font-size="9" font-family="monospace" font-weight="bold" fill="#ffffff" text-anchor="middle">${score}</text>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-leaflet-pin',
    iconSize: [size, size + 8],
    iconAnchor: [size / 2, size + 8],
    popupAnchor: [0, -(size + 4)],
  });
}

function createPickerPin() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 32 40">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 10.8 14.2 22.8 14.8 23.3.7.6 1.7.6 2.4 0C17.8 38.8 32 26.8 32 16 32 7.16 24.84 0 16 0z" 
            fill="#047857" 
            stroke="#ffffff" 
            stroke-width="2"/>
      <circle cx="16" cy="15" r="6" fill="#ffffff"/>
      <circle cx="16" cy="15" r="3" fill="#047857"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'custom-picker-pin',
    iconSize: [36, 44],
    iconAnchor: [18, 44],
  });
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  reports,
  hotspots = [],
  showHotspots = true,
  selectedReportId = null,
  onSelectReport,
  interactivePicker = false,
  pickerLat,
  pickerLng,
  onPickLocation,
  height = '500px',
  zoom = 12,
  center = [HYDERABAD_DEFAULT_CENTER.lat, HYDERABAD_DEFAULT_CENTER.lng],
}) => {
  const { t } = useI18n();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const hotspotsLayerRef = useRef<L.LayerGroup | null>(null);
  const pickerMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      hotspotsLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Handle map clicks in interactive picker mode
      map.on('click', (e: L.LeafletMouseEvent) => {
        if (interactivePicker && onPickLocation) {
          onPickLocation(e.latlng.lat, e.latlng.lng);
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when reports or selection change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    reports.forEach((report) => {
      const isSelected = report.id === selectedReportId;
      const icon = createCustomPin(report.category, report.priorityScore, isSelected);

      const marker = L.marker([report.latitude, report.longitude], { icon });

      // Clean HTML Popup
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 text-slate-800 font-sans';
      popupContent.innerHTML = `
        <div class="space-y-1">
          <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>${report.id}</span>
            <span class="font-bold text-emerald-800">${report.priorityScore}/100</span>
          </div>
          <h4 class="font-bold text-xs text-slate-900 leading-tight">${report.title}</h4>
          <p class="text-[11px] text-slate-600 line-clamp-2">${report.description}</p>
          <div class="text-[11px] text-slate-500 pt-1 flex items-center justify-between border-t border-stone-200 mt-2">
            <span>${report.areaName}</span>
            <span class="capitalize font-medium">${report.status.replace('_', ' ')}</span>
          </div>
          <button id="view-report-${report.id}" class="mt-2 w-full py-1 text-center text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded transition-colors">
            ${t.map.reportDetailLink}
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 260 });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-report-${report.id}`);
        if (btn && onSelectReport) {
          btn.onclick = () => onSelectReport(report.id);
        }
      });

      marker.addTo(markersLayer);
    });
  }, [reports, selectedReportId, t, onSelectReport]);

  // Update Hotspot Circles
  useEffect(() => {
    const map = mapInstanceRef.current;
    const hotspotsLayer = hotspotsLayerRef.current;
    if (!map || !hotspotsLayer) return;

    hotspotsLayer.clearLayers();

    if (showHotspots && hotspots.length > 0) {
      hotspots.forEach((hs) => {
        const circle = L.circle([hs.centerLat, hs.centerLng], {
          radius: hs.radiusMeters,
          color: '#e11d48',
          weight: 1.5,
          fillColor: '#fb7185',
          fillOpacity: 0.18,
          dashArray: '4, 4',
        });

        circle.bindPopup(`
          <div class="p-1 font-sans text-xs">
            <div class="font-bold text-rose-800 flex items-center justify-between">
              <span>${hs.id}</span>
              <span class="bg-rose-100 text-rose-800 px-1 py-0.5 rounded text-[10px]">${hs.reportCount} Reports</span>
            </div>
            <div class="text-[11px] text-slate-700 mt-1">
              <strong>Locality:</strong> ${hs.locality}<br/>
              <strong>Dominant Defect:</strong> <span class="capitalize">${hs.dominantCategory}</span><br/>
              <strong>Avg Priority:</strong> ${hs.averagePriority}/100
            </div>
            <p class="text-[10px] text-slate-500 mt-1">Spatial aggregation of reports within 600m.</p>
          </div>
        `);

        circle.addTo(hotspotsLayer);
      });
    }
  }, [hotspots, showHotspots]);

  // Update Picker Pin
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (interactivePicker && pickerLat !== undefined && pickerLng !== undefined) {
      if (!pickerMarkerRef.current) {
        pickerMarkerRef.current = L.marker([pickerLat, pickerLng], {
          icon: createPickerPin(),
          draggable: true,
        }).addTo(map);

        pickerMarkerRef.current.on('dragend', (e) => {
          const latlng = e.target.getLatLng();
          if (onPickLocation) onPickLocation(latlng.lat, latlng.lng);
        });
      } else {
        pickerMarkerRef.current.setLatLng([pickerLat, pickerLng]);
      }
    } else if (pickerMarkerRef.current) {
      pickerMarkerRef.current.remove();
      pickerMarkerRef.current = null;
    }
  }, [interactivePicker, pickerLat, pickerLng, onPickLocation]);

  const handleFitAll = () => {
    if (!mapInstanceRef.current || reports.length === 0) return;
    const group = L.featureGroup(
      reports.map((r) => L.marker([r.latitude, r.longitude]))
    );
    mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-stone-200 shadow-xs">
      <div ref={mapContainerRef} style={{ height, width: '100%' }} className="z-10" />

      {/* Floating Map Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleFitAll}
          className="bg-white/95 hover:bg-white text-slate-800 font-medium text-xs px-2.5 py-1.5 rounded-md shadow-md border border-stone-200 transition-all flex items-center gap-1"
          title={t.map.fitBounds}
        >
          <span>{t.map.fitBounds}</span>
        </button>
      </div>

      {/* Legend Ribbon */}
      <div className="absolute bottom-2 left-2 z-20 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200/90 shadow-md text-[11px] text-slate-700 hidden sm:flex items-center gap-3">
        <div className="flex items-center gap-1 font-semibold text-slate-900">
          <span>{t.map.legendTitle}:</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
          <span>{t.categories.pothole}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ca8a04]" />
          <span>{t.categories.garbage}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
          <span>{t.categories.drainage}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
          <span>{t.categories.streetlight}</span>
        </div>
        {showHotspots && (
          <div className="flex items-center gap-1 text-rose-700 font-medium border-l border-stone-200 pl-2">
            <span className="w-2.5 h-2.5 rounded-full border border-rose-600 bg-rose-200" />
            <span>{t.map.hotspotLegend}</span>
          </div>
        )}
      </div>
    </div>
  );
};
