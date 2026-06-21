# TAPAS SURYA DRISHTI - Engineering Specification

## Technology Stack

### Frontend Architecture
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **ShadCN** - Component library
- **Framer Motion** - Animations
- **Mapbox GL / MapLibre GL** - Map rendering
- **Deck.GL** - Large-scale geospatial visualization
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **Zod** - Schema validation
- **React Hook Form** - Form handling

### Backend Architecture
- **FastAPI** - Python web framework
- **Python** - Primary language
- **GeoPandas** - Geospatial data
- **Rasterio** - Raster processing
- **GDAL** - Geospatial data abstraction
- **Shapely** - Geometric operations
- **Scikit-Learn** - Machine learning
- **NumPy & Pandas** - Data processing
- **PyTorch** - Deep learning

### Database & Storage
- **PostgreSQL** - Relational database
- **PostGIS** - Spatial extensions
- **Redis** - Caching and queuing
- **S3 Compatible Storage** - Satellite imagery and rasters

### Infrastructure
- **Docker** - Containerization
- **Kubernetes** - Orchestration
- **Terraform** - Infrastructure as Code
- **GitHub Actions** - CI/CD

---

## Repository Structure

```
tapas-surya-drishti/
├── apps/
│   ├── web/              # Next.js frontend application
│   ├── admin/            # Admin dashboard
│   └── docs/             # Documentation site
├── services/
│   ├── city-discovery/   # City resolution and boundary acquisition
│   ├── digital-twin/     # City 3D model generation
│   ├── hotspot-engine/   # Heat island detection
│   ├── dna-engine/       # Root cause analysis
│   ├── recommendation-engine/  # Solution generation
│   ├── finance-engine/   # Financial modeling
│   └── roadmap-engine/   # Implementation planning
├── geospatial/
│   ├── satellite-ingestion/    # Satellite data acquisition
│   ├── vector-processing/      # Vector data processing
│   ├── raster-processing/      # Raster analysis
│   └── spatial-analysis/       # Geospatial analysis
├── database/
│   ├── migrations/       # Database schema migrations
│   ├── schemas/          # SQL schemas
│   └── seeds/            # Seed data
├── packages/
│   ├── ui/               # Shared UI components
│   ├── maps/             # Map utilities and components
│   ├── gis/              # GIS utilities
│   ├── climate/          # Climate modeling utilities
│   ├── analytics/        # Analytics utilities
│   └── shared/           # Shared utilities
├── infrastructure/
│   ├── terraform/        # Terraform configurations
│   ├── docker/           # Docker configurations
│   ├── kubernetes/       # K8s manifests
│   ├── monitoring/       # Monitoring and logging
│   └── security/         # Security policies
└── knowledge/
    ├── constitution/     # Product specifications
    ├── architecture/     # Technical architecture
    ├── methodology/      # Algorithms and methods
    └── prompts/          # AI system prompts
```

---

## Database Schema

### Core Tables

**cities**
- id (UUID)
- name (TEXT)
- display_name (TEXT)
- state (TEXT)
- country (TEXT)
- geometry (GEOMETRY)
- baseline_lst (FLOAT)
- climate_note (TEXT)
- confidence_level (ENUM)
- created_at (TIMESTAMP)

**hotspots**
- id (UUID)
- city_id (FK)
- name (TEXT)
- geometry (GEOMETRY)
- typology (ENUM: IHI, SCHI, DRHI, TCHI, LDHI, PSHI)
- lst_peak (FLOAT)
- uhsi_score (INTEGER, 0-100)
- severity (ENUM: EMERGING, MODERATE, HIGH, SEVERE, CRITICAL)
- confidence (FLOAT)
- priority_rank (INTEGER)
- area_km2 (FLOAT)
- population_exposed (INTEGER)
- created_at (TIMESTAMP)

**recommendations**
- id (UUID)
- hotspot_id (FK)
- name (TEXT)
- mechanism (TEXT)
- expected_cooling (FLOAT)
- cost_estimate (FLOAT)
- roi_percent (FLOAT)
- implementation_timeline (TEXT)
- confidence (FLOAT)
- evidence_score (FLOAT)
- created_at (TIMESTAMP)

**financial_models**
- id (UUID)
- recommendation_id (FK)
- capex (FLOAT)
- opex_annual (FLOAT)
- energy_savings_annual (FLOAT)
- health_savings_annual (FLOAT)
- npv (FLOAT)
- irr_percent (FLOAT)
- payback_years (FLOAT)
- assumptions (JSONB)
- created_at (TIMESTAMP)

---

## MVP Build Order

**PHASE 1 - Foundation**
1. Monorepo setup
2. Next.js frontend skeleton
3. FastAPI backend skeleton
4. PostgreSQL + PostGIS setup
5. Mapbox GL integration

**PHASE 2 - City Discovery**
6. City search and resolution
7. Boundary acquisition
8. City metadata storage

**PHASE 3 - Digital Twin**
9. Building footprint loading
10. Road network loading
11. Vegetation layer loading
12. Interactive map rendering

**PHASE 4 - Heat Intelligence**
13. Hotspot generation
14. Hotspot classification
15. UHSI calculation

**PHASE 5 - Intelligence Panel**
16. Hotspot detail panel
17. DNA breakdown visualization

**PHASE 6 - Recommendations**
18. Recommendation engine
19. Solution card display

**PHASE 7 - Financial & Roadmap**
20. Financial engine
21. Roadmap generation

**PHASE 8 - Deployment**
22. MVP deployment
23. Performance optimization

---

## Key APIs

### City Discovery Service
```
POST /api/cities/analyze
GET /api/cities
GET /api/cities/{id}
```

### Hotspot Engine
```
GET /api/cities/{id}/hotspots
GET /api/hotspots/{id}
GET /api/hotspots/{id}/dna
GET /api/hotspots/{id}/recommendations
GET /api/hotspots/{id}/financials
GET /api/hotspots/{id}/roadmap
```

---

## Code Quality Standards

- All code: TypeScript frontend, type-hinted Python backend
- No hardcoded values - all constants in configuration files
- Reusable components - feature-based architecture
- API documentation - OpenAPI/Swagger specs
- Tests - unit and integration coverage
- Geospatial optimization - spatial indexing and query optimization
- Scalability - designed for any Indian city without predefined lists
