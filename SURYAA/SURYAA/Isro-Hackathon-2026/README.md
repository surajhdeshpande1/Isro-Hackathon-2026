# TAPAS SURYA DRISHTI
## Climate Solution Intelligence & Verification Engine

**TAPAS SURYA DRISHTI** is a next-generation city-scale Climate Digital Twin and Adaptive Climate Decision Operating System. Designed for municipal planners, climate investors, and urban scientists, it moves beyond simple hotspot recommendations to discover, stress-test, simulate, and defend climate cooling interventions.

---

## 🚀 How to Run the Platform

The platform is designed with zero build-step overhead. All layouts, CSS stylesheets, charting libraries, spatial calculation engines, and interactive scripts are packaged into single self-contained HTML files using standard public CDNs.

1. **Locate either of the following files**:
   - [tapas-surya-drishti.html](file:///c:/Users/Hp/OneDrive/Desktop/SURYAA/Isro-Hackathon-2026/tapas-surya-drishti.html) (Main Platform Build)
   - [basic html code.html](file:///c:/Users/Hp/OneDrive/Desktop/SURYAA/Isro-Hackathon-2026/basic%20html%20code.html) (Synchronized Reference Build)
2. **Double-click the file** to launch it immediately in any modern web browser (Chrome, Edge, Firefox, Safari).
3. **No server setup or internet connection is strictly required**; the platform operates a calibrated synthetic digital twin generator offline, but will dynamically enrich the map with live OpenStreetMap infrastructure if connected to the web.

---

## ☄️ Key Platform Features

### 1. Cinematic Orbital Scan
- Enters the city through an orbital dial scanner, executing sequential diagnostic routines across the 16 reasoning engines (Observation, Perception, Understanding, Causal discovery, etc.) with real-time scrolling console telemetry logs.
- Interactive drifts, drifting light halos, and live platform scale statistics enhance the luxury "Apple/Stripe" landing page aesthetic.

### 2. Dual-Layer Digital Twin
- **Offline Synthetic Core**: Automatically computes and buffers administrative bounds, rivers, parks, roads, and buildings (color-coded by typology) using **Turf.js** spatial buffers and deterministic seeded random generators. The map *never feels empty*.
- **OSM Overpass API Integration**: If online, fetches live building footprints, street canyons, and water bodies in a 1.5km box around the geocoded coordinates, blending them on top of the synthetic twin in real-time.

### 3. Dynamic Heat Hotspots & Real-Time Cooling
- Hotspots are rendered as pulsing spatial polygons with styled borders corresponding to their UHI typology (Industrial, Street Canyon, Dense Residential, Transit Congestion, Lake Degradation, Peripheral Sprawl).
- **Interactive Scrubber**: Dragging the Y0–Y20 time scrubber or toggling between the **10 Scenario Portfolios (Scenario A to J)** triggers dynamic cooling updates. The map hotspots visually cool down (changing color from red/orange to green/teal) and update their tooltips in real-time.

### 4. Interactive Deep-Dive Dossier Drawer
- **SURYA DNA Profile**: A Chart.js radar chart mapping 6-factor morphological heat contributors (vegetation deficit, industrial flux, traffic, albedo, water stress, sprawl speed).
- **Causal Decomposition & Evidence Chain**: Ingests satellite readings, Regression P-values, and validation outcomes.
- **SURYA DEFENSE Challenger Panel**: Presents audit questions and responses proving recommendations under scientific, political, and financial scrutiny.
- **Financial Analyzer**: Dynamic discounted cashflow models (CAPEX, OPEX, Payback, NPV, IRR) charted on Chart.js timelines.
- **Phased Master Roadmap**: Interactive Gantt-style timeline demonstrating rollout phases.
- **20-Year Temperature Forecast**: BAU vs. Mitigated scenario temperature forecast curve charting.

### 5. SURYA VISION Hover HUD
- A floating readout panel at the bottom center of the viewport. Hovering over any map element displays coordinates, local LST, local UHSI, building typology, canopy coverage (NDVI), and impervious index (NDBI).

---

## 🛠️ Technology Stack
- **Map Viewport**: Leaflet.js (CartoDB Voyager base maps & ESRI Satellite imagery)
- **Spatial Calculations**: Turf.js (Polygon buffering, boundary clipping, Bbox computation)
- **Data Visualizations**: Chart.js (Radar, Line, Area charts)
- **Core logic**: Vanilla Javascript (Seeded random engines, geocoding fetch handlers)
- **Styling**: Responsive Vanilla CSS (Glassmorphism, custom light theme scrollbars, print layout stylesheets)