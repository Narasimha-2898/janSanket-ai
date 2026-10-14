# JanSanket AI — Turning Civic Problems into Community Action
**MY Bharat Hack for Social Issues | AI + GIS Citizen Intelligence Platform**

JanSanket AI is a full-stack, AI-assisted geospatial civic reporting and transparent prioritization web application designed to help citizens and urban local bodies turn complaints into an objective, location-aware community action queue.

---

## 🌟 Key Differentiators for Hackathon Judges

1. **Nearby Duplicate Intelligence**:
   - Uses real **Haversine geospatial distance** (&le;350m) and **text token similarity** to flag potential duplicate reports instead of fragmenting municipal attention.
   - Example demo pair: `JS-HYD-2026-1001` and `JS-HYD-2026-1002` (Road No. 36 Jubilee Hills crater pothole separated by 39 meters).
2. **Explainable Priority Scoring Formula**:
   - Strict mathematical, bias-free formulation:
     $$\text{Priority Score} = 0.40S + 0.25R + 0.20D + 0.15U$$
     - **S** = Hazard Severity (40%)
     - **R** = Spatial Recurrence & Duplicate Density (25%)
     - **D** = Duration Unresolved (20%)
     - **U** = Community Impact & Transit Proximity (15%)
   - Full factor breakdown viewable on every report detail page.
3. **GIS Hotspot Discovery**:
   - Spatial density clustering algorithms compute actual geographic clusters across Hyderabad localities (Jubilee Hills, Charminar Old City, Tolichowki, Hitec City).
   - Radius circles show report density, dominant hazard type, and average priority.
4. **12-Language Regional Inclusion**:
   - Full-website internationalization supporting **English, हिन्दी (Hindi), తెలుగు (Telugu), বাংলা (Bengali), मराठी (Marathi), தமிழ் (Tamil), ಕನ್ನಡ (Kannada), മലയാളം (Malayalam), ગુજરાતી (Gujarati), ਪੰਜਾਬੀ (Punjabi), ଓଡ଼ିଆ (Odia), and اردو (Urdu with native RTL support)**.
   - Instant translation with persistence in `localStorage` across all routes without page reload.
5. **Real-Time Full-Stack Architecture**:
   - Express server with real REST APIs (`/api/reports`, `/api/analyze`, `/api/duplicates/:id`, `/api/hotspots`, `/api/analytics/summary`).
   - Real server-side **Google Gemini 3.8 Flash** integration (`@google/genai`) with a zero-downtime deterministic fallback engine.

---

## 🚀 Quick Start & Run Instructions

```bash
# 1. Install dependencies
npm install

# 2. Run the full-stack application (Express + Vite)
npm run dev

# 3. Build for production
npm run build
```

The application runs on `http://localhost:3000`.

---

## 🧪 Running Algorithm Verification Tests

Run our deterministic algorithm test suite covering Priority Scoring calculations, boundary conditions, Haversine spatial calculations, and text token matching:

```bash
npx tsx tests/algorithms.test.ts
```

All 14 unit tests verify the exact scoring formulas, duplicate distances, and seed data integrity.

---

## 🗺️ Demonstration Locality & Demo Data

- **Locality**: Hyderabad, Telangana (covering Jubilee Hills, Banjara Hills, Charminar, Hitec City, Gachibowli, Ameerpet, Secunderabad, Tolichowki, Mehdipatnam, Dilsukhnagar).
- **Demo Data Notice**: All records are synthetic demo records marked with `isDemo: true` to prevent misrepresentation of municipal civic records.
- **Reset Demo Records**: Click "Reset Demo Records" in the Impact Dashboard (`/dashboard`) anytime to reload clean synthetic data.

---

## 🏛️ Technical Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Leaflet, Lucide Icons, Recharts.
- **Backend**: Express.js, TypeScript (`tsx`), `@google/genai` (Gemini 3.8 Flash SDK).
- **GIS Engine**: Leaflet with OpenStreetMap tiles, Haversine formula calculation, spatial density clustering.
- **Internationalization**: Centralized 12-language dictionary architecture with dynamic LTR/RTL switching.

---

## ⚖️ Responsible AI & Privacy Notice

- AI classification assists human decision-makers rather than replacing municipal authority.
- No unnecessary personal information (PII) is collected or stored.
- Not officially affiliated with Greater Hyderabad Municipal Corporation (GHMC) or government bodies.
