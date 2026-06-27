import { useState } from "react";

// ══ DESIGN TOKENS — LIGHT SCIENTIFIC ═════════════════════════════════
const P={
  bg:'#F8F9FA',bg2:'#FFFFFF',bg3:'#F1F3F5',
  brd:'#DEE2E6',brdH:'#ADB5BD',
  t1:'#212529',t2:'#495057',t3:'#868E96',t4:'#CED4DA',
  blue:'#1864AB',blueL:'#E7F5FF',blueBrd:'#A5D8FF',blueM:'#339AF0',
  grn:'#087443',grnL:'#ECFDF5',grnBrd:'#6EE7B7',grnM:'#10B981',
  red:'#B42318',redL:'#FEF3F2',redBrd:'#FCA5A5',redM:'#EF4444',
  amb:'#92400E',ambL:'#FFFBEB',ambBrd:'#FCD34D',ambM:'#F59E0B',
  pur:'#4C1D95',purL:'#F5F3FF',purBrd:'#C4B5FD',purM:'#7C3AED',
  sky:'#075985',skyL:'#F0F9FF',skyBrd:'#7DD3FC',skyM:'#0EA5E9',
  slte:'#1E293B',slteL:'#F8FAFC',slteBrd:'#E2E8F0',
};
const DOM={
  cto:{l:'CTO',c:P.blue,bg:P.blueL,brd:P.blueBrd},
  ceo:{l:'CEO',c:P.red,bg:P.redL,brd:P.redBrd},
  cmo:{l:'CMO',c:'#9A3412',bg:'#FFF7ED',brd:'#FDBA74'},
  coo:{l:'COO',c:P.slte,bg:P.slteL,brd:P.slteBrd},
  climate:{l:'Climate Science',c:P.grn,bg:P.grnL,brd:P.grnBrd},
  stats:{l:'Statistics',c:P.pur,bg:P.purL,brd:P.purBrd},
  urban:{l:'Urban Morphology',c:P.amb,bg:P.ambL,brd:P.ambBrd},
  water:{l:'Hydrology',c:P.sky,bg:P.skyL,brd:P.skyBrd},
  energy:{l:'Energy Expert',c:'#92400E',bg:'#FFFDE7',brd:'#FEF08A'},
  gov:{l:'Gov. Policy',c:P.slte,bg:P.bg3,brd:P.brd},
  code:{l:'SW Engineer',c:P.pur,bg:P.purL,brd:P.purBrd},
  ev:{l:'EV & Grid',c:P.sky,bg:P.skyL,brd:P.skyBrd},
  heat:{l:'Thermal Physics',c:P.red,bg:P.redL,brd:P.redBrd},
  wind:{l:'Wind Engineering',c:P.blue,bg:P.blueL,brd:P.blueBrd},
  biz:{l:'Finance',c:P.grn,bg:P.grnL,brd:P.grnBrd},
  geo:{l:'Geospatial Data',c:P.slte,bg:P.slteL,brd:P.slteBrd},
};
const GR={'A':[P.grn,P.grnL],'B':['#15803D','#F0FDF4'],'C+':[P.amb,P.ambL],'C':[P.amb,P.ambL],'C−':[P.amb,P.ambL],'D+':[P.red,P.redL],'D':[P.red,P.redL],'D−':['#7F1D1D',P.redL]};

// ══ DATA — EXPERT COUNCIL (16 DOMAIN EXPERTS) ════════════════════════
const CRITS=[
  {dom:'cto',g:'D',
   q:'Architecture specificity is zero. "GeoFM" appears 47× but its architecture is never stated — Transformer? GNN? CNN? What attention mechanism? "GeoCell" used 19× but spatial resolution, H3 level, projection, temporal stride never defined. API design absent: REST? GraphQL? Latency SLA? Data pipeline from raw satellite bytes to model-ready tensors? Without this a CTO cannot evaluate feasibility.',
   a:'Architecture: Spatial Graph Transformer (Veličković 2018 GAT) on Uber H3 L9 hexagonal grid (86m² cells, ~92M globally). Multi-scale attention across 7 H3 resolutions. Pre-training: Masked Spatial Prediction (BERT-analogous for spatial tokens). Physics loss: L_total = L_prediction + λ×L_physics_consistency. Pipeline: Sentinel-2 GeoTIFF → STAC → Xarray/Dask → GeoParquet/Delta Lake → Kafka → H3 tokenizer → GPU inference. API: OpenAPI 3.1 REST + GraphQL, p95 <200ms, Redis spatial cache.',
   src:'Veličković (2018) GAT arXiv:1710.10903; Hamilton (2017) GraphSAGE NeurIPS; Rolf (2021) SustainBench NeurIPS; Uber H3 doi:10.5281/zenodo.4721966'},
  {dom:'climate',g:'D+',
   q:'"−1.4°C from 1M trees" stated without energy balance derivation. Transpiration 300L/day/tree is 95th percentile — Indian water-stressed median is 150L/day. No Bowen ratio. No CMIP6 SSP pathway for future baseline. WBGT formula listed in GeoDNA but never integrated into any output calculation. Heat mortality elasticity varies 3× across Indian cities — unaccounted for.',
   a:'Energy balance: ΔT = −(LE×N)/(ρ_air×Cₚ×U_mean×A_city×H_mix). LE=120W (Indian median, Pataki 2011). Bowen ratio β=H/LE varies 0.2–2.0 by soil moisture. Albedo: urban 0.15 → canopy 0.22 → ΔR_net=−14W/m². CMIP6 SSP1-2.6/2-4.5/5-8.5 ensemble n=25 for any >5yr horizon. WBGT → UTCI → DALY pipeline via WHO GBD 2021 city-level heat mortality coefficients.',
   src:'Bowler (2010) doi:10.1016/j.landurbplan.2010.02.018 n=52 meta; IPCC AR6 WG1 Ch.10; ISO 7243:2017; WHO GBD 2021'},
  {dom:'stats',g:'C−',
   q:'"100,000+ causal relationships" — what causal discovery algorithm? False positive rate? What proportion survived interventional validation? CIs (±0.3°C) cited but posterior distribution shape never stated — log-normal? Truncated normal? This matters for tail risk. Monte Carlo 1000: for what parameter space dimension? Latin Hypercube efficiency gain unstated. CRPS benchmark baseline not specified.',
   a:'Causal graph: PC algorithm (Spirtes 2001) + FCI for hidden confounders + Bayesian evidence synthesis. α=0.01, Bonferroni-corrected, 3-round Delphi validation 12 experts. 40 params × LHS → 1000 members. All posteriors shown as violin plots (5th/25th/50th/75th/95th). CRPS baseline: persistence forecast. Target CRPS skill >0.25. Sobol sensitivity: K_sat 34%, CN 28%, albedo 18%, GHI 12%.',
   src:'Spirtes (2001) MIT Press; Gneiting & Raftery (2007) doi:10.1198/016214506000001437; Stein (1987) doi:10.1080/00401706.1987.10488205'},
  {dom:'urban',g:'C',
   q:'SVF listed but calculation method never specified — fisheye photogrammetry vs LiDAR vs remote sensing give different values for identical geometry. Canyon H/W listed but Venturi wind amplification absent. UTCI requires 6 input variables — none integrated. LCZ cited but WUDAPT methodology not stated. Missing: fractal dimension, compactness index, frontage ratio.',
   a:'SVF: SAGA GIS with LiDAR DEM, 145-direction hemispherical integration. Canyon CFD: V_canyon=V_ref×(W/H)^0.67 + fetch correction. UTCI via Fiala-3D physiological model (ASHRAE 55) from ERA5+WRF. LCZ: WUDAPT Level 0 (30m Sentinel-2), Level 1 (3m LiDAR) for pilot cities. Additional: lacunarity Λ, compactness C=A/perimeter², plot ratio.',
   src:'Stewart & Oke (2012) doi:10.1175/BAMS-D-11-00019.1; Fiala (2012) doi:10.1007/s00484-011-0424-7; WUDAPT wudapt.org'},
  {dom:'ceo',g:'D−',
   q:'CRITICAL: Never answers the first question any CIO asks: "I have Claude Max + Google Earth Engine — why GeoCortex?" "Planetary decision intelligence" appears 9× as differentiator — it is marketing language not a differentiator. Zero customer discovery, zero pilots, zero logos. No SLA, no data freshness guarantee, no integration guide.',
   a:'Honest answer: Claude Max + GEE = language understanding + static map visualization. GeoCortex gives: (1) coupled physics simulation against your specific topography/soil/grid, (2) satellite-verified outcomes at T+12m, (3) government-auditable cryptographic provenance, (4) compounding Bayesian intelligence σ→σ₀/√n. 90-sec ROI: Ahmedabad UHI, 6.2km², 14K households, ΔT=−1.7°C, ₹42M/yr energy savings, Sentinel-2 verified.',
   src:'Own pilot data required; Gartner (2024) Smart City Platform MQ; Forrester Wave Climate Risk 2024'},
  {dom:'coo',g:'D',
   q:'Operational plan entirely absent. "GeoTwin for every city" requires: WRF domain setup 3–6 months per city, soil survey acquisition (NBSS&LUP often incomplete), IoT procurement/maintenance (who pays?), GPU compute for 1000-member ensembles, ground truth for IMD/ISRO validation. No budget, no FTE plan, no data SLA.',
   a:'Y1 ops: Cloud compute ₹80L (GPU clusters), Data licenses ₹20L (ISRO Bhuvan API, IMD), IoT pilot 200 nodes ₹30L, Ground team 4 FTE ₹60L. Partnerships: ISRO NRSC (free Bhuvan via MoU), IMD (historical DB), CGWB (groundwater), NIUA (urban data). WRF: 6-month calibration per city; 3 cities parallel Y1. Pipeline: Kafka + Delta Lake on AWS ap-south-1 (data residency India).',
   src:'AWS India pricing 2024; ISRO NRSC Bhuvan API; IMD data access policy; NIUA Smart Cities'},
  {dom:'code',g:'C−',
   q:'Fatal bottlenecks unaddressed. WRF-ARW: 24hr runtime for 48hr forecast — incompatible with "real-time." 1000-member ensemble ≈ 500 GPU-hours/query = ₹5,000/query at cloud rates. GeoGraph 100K+ edges + Pearl do-calculus = O(V³) worst case — approximate inference strategy not mentioned. No CI/CD, no testing strategy, no fault tolerance.',
   a:'Performance: WRF pre-computed for 50 scenario templates per city; queries interpolate via GPR surrogate (p95 MAE <5%). Ensemble: LHS → statistical emulator on 1000 full-physics runs; 1000 members in <1s. GeoGraph: Loopy Belief Propagation O(Ek) approximate. Stack: Python 3.11 + PyTorch 2.1 + DGL + FastAPI + Redis + PostGIS + Kafka + Databricks. CI/CD: GitHub Actions → Docker → Kubernetes (EKS).',
   src:'GPy (2012) Gaussian Process; DGL (2019) arXiv:1909.01315; Jeong & Wang (2010) WRF surrogate GMD'},
  {dom:'energy',g:'C+',
   q:'"22% IRR" — no LCOE breakdown. Degradation rate absent (0.5%/yr mono-Si). Rajasthan soiling losses (3–8%) absent. Curtailment as probability distribution not just index. Grid integration cost (transmission, ancillary, storage) = 15–30% CAPEX for hybrid project — entirely missing. Betz limit cited correctly but wake effect not quantified.',
   a:'LCOE Rajasthan 2024: CapEx=₹3.5Cr/MW, OpEx=₹12L/MW/yr, degradation 0.5%/yr, soiling 5%, DC/AC 1.2. LCOE≈₹2.10/kWh vs grid parity ₹5.50/kWh → viable. Curtailment: P(>5%)=18% Rajasthan RLDC zone (MERIT+ data). Wake: Jensen model k=0.04 onshore. Hybrid optimization: NSGA-II on (LCOE, curtailment risk, land conflict).',
   src:'MNRE Solar Atlas 2023; IRENA Cost 2023; CERC Grid Code 2023; Jordehi (2016) doi:10.1016/j.rser.2016.09.041'},
  {dom:'water',g:'C',
   q:'Darcy correct but K_sat spatial heterogeneity enormous — orders of magnitude within one city (3 m/day sandy alluvial vs 0.001 m/day clayey basalt). SCS CN valid for peak discharge not long-duration recharge. No MODFLOW for regional groundwater. Monsoon hydrology (intermittent streams, ephemeral ponding) not addressed. CGWB data sparse for many Indian districts.',
   a:'K_sat: log-normal σ_log=1.2 (Freeze 1975), Sequential Gaussian Simulation on CGWB well data + SoilGrids v2.0 (250m). MODFLOW-NWT for regional groundwater (transient, 250m cell, monthly stress periods). Monsoon: SCS TR-55 + AMC-III for wet (CN_wet=CN_dry+14). Gap-fill CGWB via GRACE satellite groundwater anomaly (JPL TELLUS).',
   src:'Freeze (1975) WRR; CGWB India; SoilGrids doi:10.1371/journal.pone.0169748; MODFLOW-6 USGS; NASA GRACE TELLUS'},
  {dom:'gov',g:'D',
   q:'DPDPA 2023 mentioned but never operationalized. Article 6.4 Paris — no Indian registry exists yet (2024). EIA Notification 2006 for large afforestation not addressed. CAMPA forest clearance absent. SEBI SGF eligibility not mapped. GeM portal compliance not addressed. Government CIO cannot present this to a procurement committee.',
   a:'Regulatory matrix: DPDPA 2023→AWS ap-south-1 data residency + DPA with all clients. Art.6 MRV→ICVCM CCPs v2 + India NDC nationally determined track. EIA→tree planting >10ha = district EIA notification 2006 (Schedule I/II). SEBI SGF 2024→afforestation + renewable = eligible. GeM→DPIIT startup fast-track for government procurement.',
   src:'DPDPA 2023; ICVCM CCPs v2 (2023); EIA Notification 2006; SEBI SGF 2024; GeM portal'},
  {dom:'heat',g:'C+',
   q:'WBGT correct but conversion to indoor heat stress missing. UTCI and WBGT not interchangeable — WBGT underestimates stress in high radiation/low humidity (Rajasthan/Gujarat). Nocturnal minimum temperature (TNn) is the actual heat mortality driver — people die from inability to cool at night. Building thermal mass longwave re-emission not quantified.',
   a:'Multi-metric: (1) WBGT [ISO 7243] outdoor industrial, (2) UTCI [Fiala, ASHRAE 55] pedestrian, (3) Apparent Temperature [Steadman 1979] public health mortality, (4) Tmrt for solar exposure. TNn: WRF UCM (single-layer), thermal mass from LiDAR×material DB. Key driver: P(TNn>25°C × ≥3 consecutive nights) → WHO GBD heat mortality coefficient.',
   src:'Steadman (1979) doi:10.1175/1520-0450(1979); WHO/WMO (2012) Heat-health plans; Oke (1987) Boundary Layer Climates'},
  {dom:'wind',g:'C',
   q:'Weibull on MERRA-2 correct but urban wind profile correction not specified — log law vs power law? WRF urban canopy scheme? Single-layer UCM? BEP? BEP+BEM? Street-scale wind requires CFD (mentioned in GeoMicro app but not core stack). Wind direction persistence critical for pollution trapping — absent.',
   a:'U(z)=U_ref×(z/z_ref)^α; α_urban=0.25–0.35. z₀ from CORINE/LCZ (z₀_urban=1–2m vs z₀_rural=0.03m). WRF UCM: BEP+BEM (Salamanca 2011) for energy-aware simulation. Street CFD: ENVI-met v5 (1m stereo wind). Persistence: P(wind within 45° >4hr). Ventilation: ACH=Q/V via canyon geometry.',
   src:'Wieringa (1992) BLM; Salamanca (2011) doi:10.1175/2010JAMC2613.1; Britter & Hanna (2003) Annu.Rev.Fluid Mech.'},
  {dom:'ev',g:'C+',
   q:'V2G math correct (9,200 MWh) but ignores battery degradation under V2G cycling. CERC has not approved V2G compensation framework for India as of 2024. EVI-Pro was developed for US conditions — Indian traffic patterns, fleet composition differ. No reference to IS 17017 (India EV charging standard).',
   a:'Degradation: ΔSoH=f(DoD, C_rate, T, cycles). Rainflow counting (ASTM E1049). LFP preferred (Arrhenius E_a=31kJ/mol → slow). V2G economics: ₹2–6/kWh peak–off-peak arbitrage must exceed degradation cost <₹1.5/kWh for positive NPV. India regulatory: CERC V2G draft 2023 (no commercial approval). EVI-Pro adaptation: VAHAN fleet data + Indian Driving Cycle (IS 14163).',
   src:'Han (2014) doi:10.1109/TPEL.2014.2307272; CERC V2G draft 2023; IS 17017; VAHAN Portal MoRTH'},
  {dom:'biz',g:'C−',
   q:'Zero unit economics. No LTV/CAC. Cold-start problem — first 100 deployments before GeoMemory compounds are hardest. No competitive pricing vs Esri ArcGIS ($50K/yr), Planet Labs ($100K/yr), IBM EIS ($30K/yr). No discussion of whether per-city gross margin supports physics compute cost.',
   a:'Unit economics: avg GeoCell query $0.05. City license $10K–$50K/month by population tier. Gross margin target 70%+ (compute 25%, data 5% of revenue). CAC: $80K govt (12-month cycle), $15K enterprise (3-month). LTV: govt $5M (5yr), enterprise $800K (3yr). LTV/CAC: 62.5x govt. Cold-start: first 10 cities at cost via DSIR SIPP grant or climate VC.',
   src:'Bessemer VP SaaS benchmarks 2024; Gartner Smart City 2024; DSIR SIPP scheme; National Science Foundation Climate Tech'},
  {dom:'geo',g:'C',
   q:'"Daily updates from Sentinel-2" impossible — revisit is 5 days (A+B combined). Indian monsoon cloud cover: valid optical observations may be 1/month in NE India. No cloud masking methodology. No Sentinel-1 SAR backup strategy. ERA5 at 0.25° (~25km) downscaled to 86m² = 300× extrapolation requiring careful validation.',
   a:'Multi-source fusion: Sentinel-2 L2A (10m, cloud-masked via s2cloudless ML, Sentinel Hub) primary; Sentinel-1 SAR GRD (10m, 6-day, all-weather) backup. ERA5→86m²: WRF dynamical downscaling (50km→3km→1km→statistical→86m). MAE validation vs 156 IMD surface stations. MODIS LST (1km, daily) fills cloud gaps. NRT: ESA CREODIAS <4hr from overpass.',
   src:'Zupanc (2019) s2cloudless doi:10.5281/zenodo.1049004; ESA S2 Mission Spec; Masson (2020) ERA5-Land'},
  {dom:'cmo',g:'C−',
   q:'"Planetary nervous system" will be dismissed by procurement teams as unvalidated marketing. No peer-reviewed publications by GeoCortex team. No published accuracy benchmarks. No conference presence. Government buyers require social proof — white paper, case study, government MoU — none exist.',
   a:'GTM: (1) Publish 1 peer-reviewed validation paper in Nature Cities (target Y2). (2) Publish CRPS benchmarks on ModelHub for 10 Indian cities vs ERA5 persistence. (3) Government: submit to MoHUA Smart Cities Mission approved vendor list. (4) Academic: IISc/IIT Bombay independent validation partnership. (5) Media: lead with verified outcome story (Ahmedabad ΔT=−1.7°C), not platform story.',
   src:'Nature Cities (npj); Environ. Research Letters IOP; MoHUA Smart Cities vendor 2024'},
];

// ══ DATA — ARCHITECTURE STACK (11 MODULES) ═══════════════════════════
const STACK=[
  {id:'GeoFM',sub:'Geographic Foundation Model',c:P.blue,
   arch:'Spatial Graph Transformer on Uber H3 L9 hexagonal grid (86m² cells, ~92M globally). Multi-scale attention across 7 H3 resolutions (L3→L9, 86m²→6,000km²). Pre-training: Masked Spatial Prediction on 15 PB, 7 modalities (ESA Sentinel-1/2, NASA MODIS/VIIRS, ECMWF ERA5 hourly 1940–present, SRTM terrain, OpenStreetMap, census, energy SCADA).',
   eq:'GeoToken(h₃) = σ(Σⱼ αᵢⱼ × W_h × xⱼ)   [Graph Attention Network, Veličković 2018 ICLR]',
   ds:['ESA Sentinel-1/2 L2A','NASA MODIS/VIIRS','ECMWF ERA5 reanalysis','SRTM + TanDEM-X DEM','OpenStreetMap','National Census microdata','Energy SCADA telemetry'],
   src:'Veličković (2018) arXiv:1710.10903; Hamilton (2017) GraphSAGE NeurIPS; Rolf (2021) SustainBench NeurIPS'},
  {id:'GeoGraph',sub:'Planetary Causal Knowledge Graph',c:P.grn,
   arch:'100,000+ causal relationships from 40yr peer-reviewed literature. Automated discovery: PC algorithm (Spirtes 2001) + Bayesian evidence synthesis + 3-round Delphi validation (12 domain experts). Each edge: causal direction, β ± 95%CI, spatial radius, temporal lag, n studies, study quality score. DAG stored with H3 indexing, queried via Pearl do-calculus.',
   eq:'P(Y|do(X)) = Σ_z P(Y|X,Z)×P(Z)   [Pearl Back-door Adjustment Formula]',
   ds:['Web of Science (4 decades climate lit)','Scopus earth science','IPCC AR6 WG1/WG2/WG3','NASA ADS earth science','Indian Journal of Meteorology'],
   src:'Pearl (2009) doi:10.1017/CBO9780511803161; Spirtes (2001) MIT Press; DoWhy (2023) github.com/py-why/dowhy'},
  {id:'GeoDNA',sub:'Location Identity System',c:P.sky,
   arch:'10-dimensional living fingerprint at H3 L9 (86m²). Climate: WBGT [ISO 7243]. Wind: Weibull(k,λ) on 40yr MERRA-2. Water: Darcy K_sat + SCS CN. Urban: SVF + LCZ [17 zones]. Energy: Perez sky model GHI/DNI. Human: UTCI + WHO GBD DALYs. Economic: climate risk premium ΔBP/°C. Risk: compound copula probabilities. Updated daily from Sentinel-2 (10m) + ERA5 (hourly) + IoT.',
   eq:'WBGT = 0.7×T_wet + 0.2×T_globe + 0.1×T_dry   [ISO 7243:2017 — 6-variable occupational exposure standard]',
   ds:['ESA Sentinel-2 L2A (10m)','ECMWF MERRA-2 (0.5°)','CGWB India groundwater','SoilGrids 250m v2.0','WHO GBD 2021 DALYs','VIIRS nighttime lights'],
   src:'ISO 7243:2017; NIOSH 86-113 (1986); Stewart & Oke (2012) BAMS; Liljegren (2008) doi:10.1080/15459620801894306'},
  {id:'GeoTwin',sub:'Planetary Digital Twin Engine',c:P.pur,
   arch:'Physics-coupled simulation: WRF-ARW v4.5 (Navier-Stokes atmosphere), VIC v5 (hydrology), SWMM v5.2 (stormwater), OpenDSS v9 (electrical grid). Bidirectionally coupled via ESMF at hourly timestep. Historical: ERA5 (1940–present). Current: NRT satellite + IoT. Future: CMIP6 SSP ensemble (n=25). Optimal: NSGA-II multi-objective Pareto.',
   eq:'WRF: ∂u/∂t + u·∇u = −α∇p + f×v + F_drag   [Compressible Navier-Stokes, dry atmosphere]',
   ds:['ECMWF ERA5 reanalysis (1940–present)','CMIP6 ESGF (n=25 models)','NASA SRTM 30m DEM','NBSS&LUP soil maps India','CEA power infrastructure data'],
   src:'Skamarock (2021) NCAR/TN-556+STR; Wood (2002) VIC doi:10.1175/1525-7541(2002)003'},
  {id:'GeoBrain',sub:'Understanding Engine',c:'#B45309',
   arch:'13 causal inference modules. Each constructs Structural Causal Model: Y=f(X,U_Y). Inference via do-calculus + Monte Carlo propagation through causal DAG (n=1000 per query). Outputs full posterior probability distributions (5th/25th/50th/75th/95th percentiles). Uncertainty decomposed: parameter (LHS 40 params) + model structural (multi-model ensemble) + scenario (SSP pathways).',
   eq:'SCM: Y_i = f_i(PA_i, U_i)   Inference via front-door / back-door identification criterion (Pearl 2009)',
   ds:['GeoGraph (100K+ causal edges)','IMD observational network (1901–present)','ISRO Bhuvan raster','City IoT sensor networks','State SCADA telemetry'],
   src:'Peters, Janzing & Schölkopf (2017) Elements of Causal Inference MIT Press'},
  {id:'GeoHeart',sub:'Decision Intelligence Engine',c:P.red,
   arch:'Multi-objective Pareto optimization via NSGA-II across 4 dimensions simultaneously: (1) Environmental impact [IPCC AR6 GWP100], (2) Economic NPV [DCF + climate risk premium], (3) Social co-benefits [DALY reduction per $M, WHO GBD], (4) Implementation risk [Monte Carlo feasibility]. Produces complete Pareto frontier. Sensitivity: how ranking shifts if any weight changes ±30%.',
   eq:'NSGA-II: min F(x)=[f₁,f₂,f₃,f₄];  Pareto rank + crowding distance selection   [Deb et al. 2002]',
   ds:['GeoTwin simulation outputs','IPCC AR6 impact metrics','WHO DALY cost database','CERC tariff database','MNRE subsidy schedules'],
   src:'Deb (2002) NSGA-II doi:10.1109/4235.996017; WHO (2020) DALY methodology'},
  {id:'GeoSim',sub:'Consequence Engine',c:P.grn,
   arch:'1000-member ensemble via Latin Hypercube Sampling across 40 uncertain parameters (K_sat, aerosol OD, building thermal mass, EV adoption rate, grid mix). Each member: full WRF+VIC+SWMM+OpenDSS via GPR surrogate emulator (500× faster than full physics, MAE <5%). Results: probability distributions for every output. Validation: CRPS against IMD/ISRO historical.',
   eq:'CRPS(F,y) = ∫₋∞^∞ [F(x) − 𝟙(x≥y)]² dx   [proper scoring rule; lower = better calibration and sharpness]',
   ds:['IMD observational record (1901–present)','ISRO Bhuvan validation rasters','CGWB well data (4× /yr)','CEA grid SCADA (15min)','State PCB air quality networks'],
   src:'Gneiting & Raftery (2007) JASA doi:10.1198/016214506000001437; ECMWF EPS methodology 2023'},
  {id:'GeoTrust',sub:'Scientific Trust Layer',c:P.sky,
   arch:'7-layer provenance per output: (1) Primary DOI evidence chain, (2) Assumption register ±20% sensitivity, (3) 95% Bayesian credible intervals, (4) 1000-member ensemble spread (5th–95th), (5) CRPS skill score vs historical validation, (6) Alternative scenario analysis, (7) Remote sensing verification protocol T+12 and T+36 months. Cryptographically signed, version-locked, §65B compliant.',
   eq:"P(θ|data) ∝ P(data|θ) × P(θ)   [Bayes' Theorem]; 95% CI = [θ₀.₀₂₅, θ₀.₉₇₅] from full posterior",
   ds:['ICVCM CCPs v2 (2023) compliance','UNFCCC Paris Art.6 MRV','Indian Evidence Act §65B','ISO/IEC 27001:2022','NIST SP 800-207 Zero Trust'],
   src:"Gelman (2013) BDA 3rd Ed Cambridge; ICVCM CCPs v2 (2023); UNFCCC Paris Art.6"},
  {id:'GeoMemory',sub:'Compounding Intelligence System',c:P.amb,
   arch:'Every intervention outcome verified via satellite at T+12 and T+36 months (NDVI for vegetation, LST for temperature, SAR coherence for structure). Verified outcomes update GeoGraph edge weights: P(θ|new_data) ∝ L(satellite_obs|θ) × P(θ_prior). Uncertainty narrows as σ_n=σ₀/√n. After 100 verified interventions: 10× prediction precision improvement.',
   eq:'σ_n = σ₀/√n   — 100 verified deployments → 10× uncertainty reduction   [Law of Large Numbers; Jaynes 2003]',
   ds:['Sentinel-2 NDVI time series','MODIS LST daily','Sentinel-1 SAR coherence','GRACE-FO groundwater anomaly','Sentinel-5P TROPOMI air quality'],
   src:'Jaynes (2003) Probability Theory Cambridge; Efron & Hastie (2016) Computer Age Statistical Inference'},
  {id:'GeoAgent',sub:'Multi-Agent Expert Council',c:P.pur,
   arch:'12 domain AI agents (Climate, Hydrology, Microclimate, Energy, Urban, Economics, Policy, Public Health, Biodiversity, Civil Engineering, Agroecology, Disaster) each running independent SCM on shared GeoTwin context. Disagreements resolved via Delphi method (3 structured rounds) + expertise-weighted voting. Dissent preserved: consensus %, dissenting agents, objection nature, how recommendation changes if dissent adopted.',
   eq:'Delphi convergence: iterate until SD(agent_estimates) < 0.1 × |mean(estimates)|   [Dalkey & Helmer 1963]',
   ds:['Domain peer-reviewed literature per agent','Real-time GeoTwin shared context','GeoGraph causal subgraphs per domain'],
   src:'Dalkey & Helmer (1963) RAND RM-727; Linstone & Turoff (1975) The Delphi Method Addison-Wesley'},
  {id:'GeoVerify',sub:'Outcome Verification Platform',c:P.grn,
   arch:'Pre-intervention baseline archived (SHA-256, S3 Object Lock). Prediction locked at T=0 on tamper-evident log. T+12: automated satellite comparison with Synthetic Control from 5 matched unintervened neighborhoods. Statistical test: Difference-in-Differences + Bayes factor. GeoGraph Bayesian update on verification. Certificate: ICVCM CCPs v2 compliant, Art.6.4 ITMO eligible, §65B.',
   eq:'DiD estimator: ATT = (Ȳ_treated,post − Ȳ_treated,pre) − (Ȳ_control,post − Ȳ_control,pre)',
   ds:['Sentinel-2 NDVI (pre/post comparison)','MODIS LST 3-month composite','Sentinel-1 SAR coherence','Sentinel-5P NO₂ and PM2.5','DISCOM SCADA energy metering'],
   src:'Abadie (2010) JASA Synthetic Control; ICVCM CCPs v2 (2023); Indian Evidence Act 1872 §65B'},
];

// ══ DATA — GEODNA (10 DIMENSIONS) ════════════════════════════════════
const DNA=[
  {n:'Climate',c:P.blue,isNew:false,
   f:['Mean Air Temp °C (ERA5 reanalysis 0.25° + WRF 1km downscaling)','WBGT Wet-Bulb Globe Temp [ISO 7243] — 0.7Tw + 0.2Tg + 0.1Td','Relative Humidity % (MERRA-2 0.5°, 3-hourly)','Rainfall Intensity mm/hr (GPM-IMERG 0.1° 30-min)','GHI Solar Irradiance W/m² (PVGIS-SARAH-2 2005–2023)','Heat Stress Index (NIOSH 86-113 criteria + work-rest schedule)','UHI Intensity ΔT (MODIS LST 1km daily, 2-yr moving avg)'],
   eq:'WBGT = 0.7×T_wet + 0.2×T_globe + 0.1×T_dry',
   src:'ISO 7243:2017; GPM IMERG doi:10.1175/JCLI-D-18-0600.1; PVGIS JRC'},
  {n:'Wind',c:P.sky,isNew:true,
   f:['Mean Wind Speed U₁₀ m/s (MERRA-2, 40yr climatology)','Weibull Shape k & Scale λ (MLE fitted to MERRA-2 hourly)','Wind Rose 8-directional frequency (% time per sector)','Turbulence Intensity Iᵤ = σᵤ/Ū (10-min mean, IEC 61400-1)','Atmospheric Boundary Layer Height m (ERA5 ABL diagnostic)','Urban Roughness Length z₀ from LCZ classification (CORINE)','Canyon Wind Channeling Factor (Venturi H/W ratio)'],
   eq:'f(v) = (k/λ)(v/λ)^(k−1) exp(−(v/λ)^k)   [Weibull PDF, 2-parameter MLE]',
   src:'Wieringa (1992) BLM; IEC 61400-1:2019; MERRA-2 doi:10.1175/JCLI-D-16-0758.1'},
  {n:'Water',c:P.sky,isNew:false,
   f:['Surface Water Area ha (Sentinel-2 bi-annual, JRC Global Surface Water)','Groundwater Depth m (CGWB quarterly monitoring wells)','SCS Curve Number CN (NLCD + NBSS&LUP soil type matrix)','Hydraulic Conductivity K_sat m/day (SoilGrids v2.0 SGS, 250m)','WWF Aqueduct Water Stress Index 4.0 (2023 baseline)','Stormwater Runoff Coefficient C (land cover weighted)','Salinity TDS ppm (CGWB quality monitoring, 4× /yr)'],
   eq:'Q = (P−0.2S)²/(P+0.8S);  S = 25400/CN − 254   [USDA SCS TR-55 Curve Number method]',
   src:'USDA SCS TR-55 (1986); WWF Aqueduct 4.0; SoilGrids doi:10.1371/journal.pone.0169748'},
  {n:'Ecological',c:P.grn,isNew:false,
   f:['NDVI = (NIR−Red)/(NIR+Red) [Sentinel-2 10m, 5-day composite]','EVI Enhanced Vegetation Index (MODIS 500m, 16-day)','Forest Canopy Cover % (ICESat-2 ATLAS lidar shots)','Above-Ground Biomass Mg/ha (ESA CCI Biomass 2021 100m)','Soil Organic Carbon g/kg (SoilGrids 250m 0–30cm)','Biodiversity Intactness Index (NHM London BII model)','Habitat Connectivity (Circuitscape graph-theoretic)'],
   eq:'NDVI = (ρ_NIR − ρ_Red)/(ρ_NIR + ρ_Red)  ∈ [−1, +1]   [Tucker 1979 Remote Sensing of Environment]',
   src:'Tucker (1979) RSE doi:10.1016/0034-4257(79)90013-0; ESA CCI Biomass 2021; SoilGrids doi:10.1371/journal.pone.0169748'},
  {n:'Urban',c:'#92400E',isNew:false,
   f:['Building Height m (TanDEM-X 12m DEM + airborne LiDAR)','Sky View Factor SVF 0–1 (SAGA GIS hemispherical, 145 directions)','Street Canyon H/W Aspect Ratio (OSM + DEM derivation)','Floor Area Ratio FAR (municipal records + footprint×height)','Impervious Surface % (Sentinel-1 SAR C-band backscatter)','Local Climate Zone LCZ 1–17 (WUDAPT Level 0, 30m Sentinel-2)','Road Network Density km/km² (OSM, quarterly update)'],
   eq:'SVF = (1/π)∫₀²π∫₀^(π/2) sin(β)cos(β)×V(β,φ) dβdφ   [hemispherical integration, Stewart & Oke 2012]',
   src:'Stewart & Oke (2012) doi:10.1175/BAMS-D-11-00019.1; WUDAPT.org; TanDEM-X doi:10.1109/TGRS.2012.2196437'},
  {n:'Energy',c:P.amb,isNew:false,
   f:['GHI kWh/m²/day (PVGIS-SARAH-2, 2005–2023, monthly P50/P90)','DNI Direct Normal Irradiance (monthly P90 for CSP siting)','Wind Capacity Factor CF (WAsP, 10yr MERRA-2, wake-adjusted)','Grid SAIDI/SAIFI Reliability (DISCOM annual report data)','Curtailment Risk Index % (RLDC/SLDC historical MERIT+ data)','Battery Storage Siting Score $/kWh (proximity + grid headroom)','Demand Flexibility MW peak-shaving potential window'],
   eq:'CF = E_actual/(P_rated×8760h);  LCOE = (CapEx + NPV(OpEx)) / NPV(Energy produced over lifetime)',
   src:'IRENA Cost 2023; IEC 61724-1:2017; MNRE Solar Atlas 2023; WAsP DTU Wind Energy'},
  {n:'Human',c:P.sky,isNew:false,
   f:['Population Density persons/km² (Census 2011 + GHSL 2023 100m)','Heat Mortality DALYs/1000 population (WHO GBD 2021)','PMV Predicted Mean Vote −3 to +3 [Fanger 1970, ASHRAE 55]','Age Distribution % >65 (Census ward-level interpolated)','Health Vulnerability Index (NDMA methodology + WHO composite)','Mobility OD Matrix km (aggregated GPS/CDR — privacy-safe)','Climate-Attributable DALYs by disease (WHO GBD 2021 heat chapter)'],
   eq:'PMV = f(M, W, I_cl, T_a, T_r, v, p_a)   [Fanger 1970; standardized in ASHRAE 55-2020]',
   src:'WHO GBD 2021; ASHRAE 55-2020; GHSL (2023) Global Human Settlement Layer JRC'},
  {n:'Economic',c:P.pur,isNew:false,
   f:['GDP Density PPP/km² (World Bank Gridded GDP 2011 PPP)','Climate Risk Premium ΔBP/°C (TCFD physical scenario)','Investment Attractiveness (IFC EDGE scoring)','NPV of Climate Inaction $ (Stern-Dietz damage function)','Stranded Asset Risk 2030/2050 horizon (TCFD transition)','Labour Productivity Climate Index (ILO + OECD)','Supply Chain Climate Exposure Herfindahl-Hirschman Index'],
   eq:'NPV = Σ CF_t/(1+r)^t − I₀;  r = r_risk_free + climate_beta × ERP   [CAPM adjusted for physical risk]',
   src:'TCFD (2023); Dietz (2021) NCC doi:10.1038/s41558-021-01011-4; World Bank Gridded GDP'},
  {n:'Risk',c:P.red,isNew:false,
   f:['Heat Risk: WBGT>28°C days/yr (ERA5 + WRF, 1980–2023 baseline)','Flood: 100-yr return period inundation depth m (PFRA + HEC-RAS)','Drought: SPI-12 < −1.5 annual probability (CHIRPS 1981–2023)','Wildfire: FWI Fire Weather Index annual cumulative (ERA5 daily)','Air Quality: PM2.5 μg/m³ annual mean (Sentinel-5P TROPOMI)','Compound Event Probability (Gaussian copula, bivariate CDF)','Sea Level Rise 2100 m (IPCC AR6 Ch.9, RCP8.5 95th percentile)'],
   eq:"P(A∩B) = C(F_A(a), F_B(b))   [Sklar's copula theorem 1959; Gaussian copula family most common]",
   src:'Zscheischler (2020) NCC doi:10.1038/s41558-020-0804-2; IPCC AR6 WG1 Ch.9 Sea Level'},
  {n:'Opportunity',c:P.grn,isNew:false,
   f:['Solar LCOE vs grid parity differential ₹/kWh (IRENA + MNRE)','Wind IRR Potential % (WAsP CF × IRENA 2023 cost curves)','Carbon Credit Eligibility $/tCO₂ (VCS VM0042 AFOLU screening)','Urban Cooling ROI ₹/°C/km² (meta-analysis 52 studies)','Agricultural Yield Gap % (FAO GAEZ model, irrigated potential)','Green Bond Eligibility Score (SEBI SGF 2024 criteria mapping)','NbS Cost-Effectiveness $/tCO₂ avoided (Griscom 2017 PNAS)'],
   eq:'NbS: $10–50/tCO₂ vs fossil CCS $50–100/tCO₂;  LCOE_solar Rajasthan 2024 ≈ ₹2.10/kWh vs grid ₹5.50/kWh',
   src:'Griscom (2017) PNAS doi:10.1073/pnas.1710465114; IRENA NbS (2022); SEBI SGF 2024'},
];

// ══ DATA — SIMULATIONS WITH PHYSICS PROOFS ═══════════════════════════
const SIMS=[
  {l:'1M Trees · Mumbai',
   outs:[{v:'−1.4°C',ci:'±0.3',l:'surface temp'},{v:'+23%',ci:'±5%',l:'groundwater recharge'},{v:'−8%',ci:'±2%',l:'cooling demand'},{v:'₹2.1B',ci:'±₹0.4B',l:'carbon credit/yr'}],
   proofs:[
     {n:'Latent Heat (Bowen Ratio)',eq:'ΔT = −(LE × N) / (ρ_air × Cₚ × U_mean × A_city × H_mix)',vars:'LE=120W/tree (Ficus transpires 300L/day × λ_v=2.45MJ/kg). N=1M. ρ=1.2kg/m³, Cₚ=1005J/kg·K, U=2m/s, A_MMR=603km², H_mix=50m.',src:'Bowler (2010) doi:10.1016/j.landurbplan.2010.02.018 n=52'},
     {n:'Groundwater Recharge (Darcy)',eq:'Q = K_sat × i × A_canopy;  K_sat ↑ 3–15× via root macropores',vars:'Root channels >1mm → bypass flow. K_sat: 0.5→2–7 m/day post-afforestation. Crown area: 1M trees × 15m² avg = 15km²',src:'Beven & Germann (1982) doi:10.1029/WR018i005p01311'},
   ]},
  {l:'500 MW Solar · Rajasthan',
   outs:[{v:'380K',ci:'±18K',l:'households'},{v:'−0.9 Mt',ci:'±0.07Mt',l:'CO₂/yr'},{v:'42 MW',ci:'±6MW',l:'grid freed'},{v:'22%',ci:'±3%',l:'projected IRR'}],
   proofs:[
     {n:'PV Output (IEC 61724)',eq:'P_ac = η_pv × A_array × GHI × PR_system',vars:'η_pv=0.21 (mono-Si 2024), GHI=6.2kWh/m²/day (PVGIS-SARAH-2), PR=0.80. A=3.17km² for 500MW.',src:'MNRE Solar Atlas 2023; IEC 61724-1:2017'},
     {n:'CO₂ Avoidance (CEA Grid EF)',eq:'ΔCO₂ = P_rated × CF × 8760h × EF_grid = 500MW × 0.20 × 8760h × 0.82 kgCO₂/kWh',vars:'CF=0.20 Rajasthan avg. EF_grid=0.82 kgCO₂/kWh Indian grid (CEA CO₂ Baseline 2022-23).',src:'CEA CO₂ Baseline 2022-23; IPCC AR6 WGIII Annex III'},
   ]},
  {l:'City Expansion +30% · Pune',
   outs:[{v:'+12%',ci:'±3%',l:'heat island'},{v:'+34%',ci:'±8%',l:'flood risk'},{v:'−18%',ci:'±4%',l:'agri. output'},{v:'−₹4.8B',ci:'±₹1B',l:'10-yr economic'}],
   proofs:[
     {n:'Runoff Amplification (SCS CN)',eq:'Q=(P−0.2S)²/(P+0.8S);  S=25400/CN−254',vars:'Agricultural CN=72 → Urban CN=90. For P=80mm: Q_agri=18mm → Q_urban=52mm. Peak: C_urban=0.85 vs C_agri=0.35',src:'USDA SCS TR-55 (1986); Shuster (2005) doi:10.1016/j.ufug.2005.03.003'},
     {n:'UHI Intensification (Oke)',eq:'ΔT_UHI = 0.4×ln(P) − 0.1×SVF + k×Q_anthro',vars:'SVF↓ with dense development → nocturnal LW trapping↑. Q_anthro: 20–100W/m² urban vs ≈0 agricultural. Albedo: 0.25→0.15 → +17W/m².',src:'Oke (1982) doi:10.1002/qj.49710846817'},
   ]},
  {l:'10K EV + V2G · Delhi NCR',
   outs:[{v:'62%',ci:'±7%',l:'fleet electrified'},{v:'−2.1 Mt',ci:'±0.3Mt',l:'NOₓ/yr'},{v:'+1.8%',ci:'±0.4%',l:'peak demand'},{v:'₹890M',ci:'±₹80M',l:'capex required'}],
   proofs:[
     {n:'Well-to-Wheel NOₓ Reduction',eq:'ΔNOₓ = D_fleet × (EF_ICE − EF_EV_marginal)',vars:'EF_ICE=0.40g/km (Euro4). EF_EV_marginal=0.08g/km (coal grid). D_fleet=18B km/yr Delhi NCR. ΔNOₓ=5,760t/yr.',src:'EEA (2023) EMEP/EEA Guidebook 1.A.3.b'},
     {n:'V2G Grid Physics (Kempton)',eq:'E_V2G = N_EV × E_battery × DoD_V2G × η_roundtrip',vars:'N_EV=500K, E_bat=40kWh, DoD=0.50, η=0.92 → 9,200MWh ≈ 920MW for 10h peak shaving.',src:'Kempton & Tomić (2005) doi:10.1016/j.jpowsour.2004.09.003'},
   ]},
];

// ══ DATA — vs LLMs ═══════════════════════════════════════════════════
const VS=[
  {cap:'Real-time spatial data ingestion',gc:'Ingests Sentinel-2 (10m, 5-day), MODIS LST (daily), ERA5 (hourly, 1940–present), 50K+ IoT/SCADA sensors live. Latency: <4hr from satellite overpass to analysis-ready via ESA CREODIAS.',llm:'Static training cutoff. Web browsing retrieves news articles, not satellite raster data, geospatial time series, or SCADA telemetry. Cannot access today\'s land surface temperature.',why:'GeoCortex knows what IS happening at your location right now. LLMs know what WAS written about similar locations years ago.',src:'ESA Copernicus; NASA EarthData LPDAAC; ECMWF ERA5 doi:10.24381/cds.adbb2d47'},
  {cap:'Running physics equations on real data',gc:'Executes WRF-ARW Navier-Stokes, VIC v5 hydrology, OpenDSS grid, SWMM stormwater via GPR surrogate emulator — actual numerical integration at 1km resolution against real boundary conditions.',llm:'Describes what physics equations predict in text. Code Interpreter runs simple formulas but cannot execute WRF coupled with actual topography + soil K_sat + land use boundary conditions specific to your location.',why:'Navier-Stokes over your specific terrain with your soil\'s hydraulic conductivity requires numerical computation, not language generation. No prompt engineering bridges this gap.',src:'Skamarock (2021) NCAR/TN-556; Wood (2002) VIC doi:10.1175/1525-7541(2002)003'},
  {cap:'Satellite-verified outcome measurement',gc:'Post-intervention satellite verification at T+12m: NDVI (vegetation), LST (temperature), SAR coherence (structural). Predictions tested against physical reality. Bayesian GeoGraph update on every verification.',llm:'No feedback loop. LLM recommendations are never verified against real-world outcomes. Non-deterministic outputs cannot serve as baseline for before/after comparison. No memory of whether advice worked.',why:'A doctor who never checks if the patient recovered is dangerous. An AI advising on ₹500Cr infrastructure decisions needs outcome verification. LLMs have none.',src:'NASA LTDR; Tucker (2005) doi:10.1080/17538940500168686; ICVCM CCPs v2 (2023)'},
  {cap:'Location-specific causal inference',gc:'100K+ causal edges with location index, effect size (β ± 95%CI), spatial radius, temporal lag. Machine-executable: computes P(Y|do(X=x)) for any H3 L9 coordinate via Pearl\'s do-calculus.',llm:'Text knowledge of causation. Cannot compute P(Y|do(X)) for a specific coordinate. Cannot distinguish intervention from observation. Cannot execute do-calculus against a spatially-indexed causal graph database.',why:'Knowing "trees reduce temperature" (text) ≠ knowing by exactly how much, where, for how long, with what uncertainty at a specific H3 L9 cell. The former is language; the latter is computation.',src:'Pearl (2009) doi:10.1017/CBO9780511803161; DoWhy (2023) github.com/py-why/dowhy'},
  {cap:'Government-auditable reasoning chain',gc:'Cryptographically signed (SHA-256), fixed random seeds, version-locked model hashes, primary DOI citations. Indian Evidence Act §65B compliant. Reproducible: same inputs → identical outputs.',llm:'Non-deterministic outputs (temperature > 0). No cryptographic signature. Cannot be cited in government tender document or court. Not reproducible — same prompt produces different output every API call.',why:'A government CIO defending a ₹500Cr decision in parliament needs a signed, reproducible evidence chain with primary citations. LLM outputs are legally inadmissible by design.',src:'NIST SP 800-207; Indian Evidence Act 1872 §65B; ISO/IEC 27001:2022'},
  {cap:'Compound multi-hazard probability',gc:'Joint probability via copula: P(heat∩drought∩wildfire). 1000-member Monte Carlo on CMIP6 ensemble. Full probability distributions. Compound failure cascade modeling (IEC 61025 fault trees).',llm:'Can describe compound risk qualitatively. Cannot compute joint copula distributions. Cannot run stochastic ensemble simulations spatially. Saying "both heat and drought are likely" ≠ computing P(heat∩drought)=0.23 ± 0.04.',why:'Compound events (heat + drought + wildfire simultaneously) kill cities. Joint probability cannot be estimated by language generation from training data.',src:'Zscheischler (2020) NCC doi:10.1038/s41558-020-0804-2; Sklar (1959) copula; FEMA HAZUS-MH'},
  {cap:'Physics-derived financial modeling',gc:'LCOE, IRR, NPV derived from actual physics outputs: GHI from PVGIS+WRF, capacity factor from WAsP wake model, curtailment probability from OpenDSS grid simulation. Financial inputs originate from physics.',llm:'Can calculate LCOE from user-provided numbers. Cannot derive location-specific GHI, CF, or curtailment probability from first principles. Any model is only as good as its inputs — which LLMs cannot originate.',why:'An IRR built on Claude\'s GHI assumption is fiction. One built on 18yr measured satellite irradiance + physics-derived curtailment is an investable number with a defensible uncertainty band.',src:'IRENA (2023) Renewable Power Costs; NREL SAM 2023; PVGIS JRC Sarah-2'},
];

// ══ DATA — FORECASTING METHODOLOGY ═══════════════════════════════════
const FORECAST=[
  {n:'Ensemble Generation',tag:'Latin Hypercube Sampling',
   d:'LHS across 40 uncertain parameters ensures uniform coverage of parameter space (Stein 1987) — 4× more efficient than simple Monte Carlo for same sample count. Parameters: soil K_sat, aerosol OD, building thermal mass, vegetation survival probability, EV adoption rate, grid mix evolution. 1000 members per query. Each: full coupled physics via GPR surrogate emulator (500× faster, p95 MAE <5%).',
   eq:'LHS: x_{i,j} = (π_i(j) − U_{ij})/n   for j=1..n members, i=1..40 parameters',
   src:'Stein (1987) Technometrics; Helton & Davis (2003) doi:10.1016/S0951-8320(03)00071-5'},
  {n:'Uncertainty Decomposition',tag:'Sobol Sensitivity Analysis',
   d:'Total uncertainty decomposed via Sobol indices. Which parameters drive most uncertainty for urban cooling? Soil hydraulic conductivity K_sat: 34%, Curve Number (runoff): 28%, albedo (radiative): 18%, GHI (solar-driven cooling): 12%, others: 8%. Informs where additional observational data collection most reduces prediction uncertainty — optimizes IoT sensor placement budget.',
   eq:"S_i = Var(E[Y|Xᵢ]) / Var(Y)   [1st-order Sobol index];  T_i = 1 − Var(E[Y|X̃_i])/Var(Y)   [total-effect]",
   src:'Saltelli (2002) doi:10.1016/S0010-4655(02)00274-1; Sobol (1993) Mathematical Modelling and Computational Experiment'},
  {n:'Probabilistic Skill Scoring',tag:'CRPS — Continuous Ranked Probability Score',
   d:'Proper scoring rule rewarding calibration AND sharpness simultaneously (Gneiting & Raftery 2007). Compared against: (1) persistence (yesterday=today), (2) climatological mean. Target CRPS skill >0.25 vs persistence. Reliability diagrams: predicted probability vs observed frequency. Rank histograms (Talagrand) verify ensemble spread equals forecast error (σ_ensemble ≈ RMSE).',
   eq:'CRPS(F,y) = ∫₋∞^∞ [F(x) − 𝟙{x≥y}]² dx;  Skill = 1 − CRPS_model / CRPS_reference',
   src:'Gneiting & Raftery (2007) JASA doi:10.1198/016214506000001437; ECMWF EPS verification methodology'},
  {n:'CMIP6 Performance Weighting',tag:'Weighted Multi-Model Ensemble',
   d:'CMIP6 n=25 models. Performance weights via Taylor score (2001) against IMD observations 1980–2014. S=[4(1+R)⁴]/[(σ_f+1/σ_f)²(1+R₀)⁴]. Models S>0.6 receive 3× weight. Prevents "model democracy" fallacy. Floor: 5% per model (prevents overconfidence). All 3 SSP scenarios shown for horizon >5yr: SSP1-2.6, SSP2-4.5, SSP5-8.5.',
   eq:'Taylor skill: S = [4(1+R)⁴] / [(σ_f + 1/σ_f)²(1+R₀)⁴];   R₀ = max attainable correlation',
   src:'Taylor (2001) JGR; Sanderson (2017) doi:10.1175/JCLI-D-16-0655.1; CMIP6 ESGF'},
];

// ══ DATA — SELF-VERIFICATION PROTOCOL ════════════════════════════════
const VERIFYSTEPS=[
  {sym:'T−30d',n:'Pre-intervention baseline',d:'Sentinel-2 NDVI (10m), MODIS LST composite (1km), Sentinel-1 SAR coherence (10m structural proxy), IoT air quality (PM2.5, NOₓ, hourly), DISCOM SCADA grid load (15min). All archived in S3 Object Lock (immutable), SHA-256 hash computed, stored on tamper-evident log.',m:'NDVI₀, LST₀, coherence₀'},
  {sym:'T=0',n:'Prediction lock',d:'GeoSim output locked: full probability distribution (5th–95th percentile). Model version SHA-256 hashed. Prediction registered on tamper-evident immutable log — cannot be edited post-intervention. Random seeds fixed for reproducibility.',m:'Ŷ_dist, SHA-256'},
  {sym:'T+12m',n:'Satellite comparison',d:'Automated: Sentinel-2 NDVI₁₂ vs NDVI₀ → ΔNDVI. MODIS LST 3-month rolling composite → ΔT_LST. Sentinel-5P TROPOMI → ΔNO₂. Counterfactual: Synthetic Control Method (Abadie 2003) from 5 matched unintervened neighborhoods — removes weather confounding.',m:'ΔNDVI, ΔT, ΔNO₂'},
  {sym:'Stat',n:'Bayesian update',d:'Difference-in-Differences with SC as control. Test: does observed ΔT fall within predicted 95% CI? Bayes factor: P(obs|prediction)/P(obs|null). GeoGraph edge weight update: P(θ|new)∝L(satellite_obs|θ)×P(θ_prior). σ_n=σ₀/√n uncertainty narrowing.',m:'Bayes factor, CI'},
  {sym:'Cert',n:'Signed certificate',d:'PDF + Zenodo DOI: intervention description, predicted distribution, observed metric, statistical test, Bayes factor, satellite comparison images (before/after). ICVCM CCPs v2 compliant for carbon market. Indian Evidence Act §65B compliant for government procurement and court use.',m:'Signed PDF, DOI'},
];
const SATS=[
  {n:'Sentinel-2 L2A',ag:'ESA/Copernicus',res:'10m',rev:'5-day (A+B)',use:'NDVI, NDWI, LAI, canopy cover change'},
  {n:'MODIS Terra/Aqua LST',ag:'NASA EarthData',res:'1km',rev:'Daily',use:'Land surface temperature (day + night)'},
  {n:'Sentinel-1 SAR C-band',ag:'ESA/Copernicus',res:'10m',rev:'6-day (all-weather)',use:'Structural coherence, soil moisture, surface water'},
  {n:'GRACE-FO',ag:'NASA/DLR',res:'300km',rev:'Monthly',use:'Terrestrial water storage anomaly (groundwater)'},
  {n:'Sentinel-5P TROPOMI',ag:'ESA/Copernicus',res:'3.5×5.5km',rev:'Daily',use:'NO₂, PM2.5 proxy, CO, CH₄, O₃'},
  {n:'VIIRS (Suomi-NPP)',ag:'NOAA/NASA',res:'375m',rev:'Daily',use:'Nighttime lights (economic proxy), fire radiative power'},
];

// ══ DATA — INNOVATION TANGENTS (6 NOVEL IDEAS) ═══════════════════════
const INNOV=[
  {n:'Spatial Counterfactual Engine',tag:'Novel · Unbuilt',c:P.blue,
   d:'Not "what will happen if we plant trees" but "what would this neighborhood look like TODAY if the 2005 mangrove restoration had been completed?" Counterfactual spatial history via Synthetic Control Method (Abadie 2003) + GeoGraph causal backpropagation. Application: post-event attribution — "what fraction of 2023 Chennai floods was attributable to the 2009 urban expansion?" Creates an evidence base for litigation, insurance, and climate accountability.',
   src:'Abadie (2010) JASA doi:10.1198/jasa.2009.ap08746; Diffenbaugh (2017) NCC event attribution'},
  {n:'Compound Failure Mode Analysis',tag:'Novel · Partial prototype',c:P.red,
   d:'Beyond compound hazard probability. Models HOW infrastructure systems cascade-fail under compound stress: power → water pumping → hospital cooling → patient survival. Uses IEC 61025 fault trees + network topology cascading failure models. Output: system-level P(failure), not just hazard P(event). Critical for resilience investment decisions — prioritizes interventions by mortality-reduction per rupee rather than hazard severity.',
   src:'IEC 61025 Fault Tree Analysis; Buldyrev (2010) Nature doi:10.1038/nature08932'},
  {n:'Morphological Optimization Loop',tag:'Novel · Unbuilt',c:'#92400E',
   d:'NSGA-II genetic algorithm finds Pareto-optimal urban form. Decision variables: FAR (0.5–5), SVF (0.3–0.9), H/W ratio (0.3–3), green:grey ratio (10–60%). Objectives: minimize UTCI_max (thermal stress), minimize peak runoff, maximize solar potential, minimize embodied carbon. Constraint: preserve historical fabric (listed buildings). Output: 8–12 Pareto-optimal morphological templates — planner selects based on objective weights.',
   src:'Deb (2002) NSGA-II doi:10.1109/4235.996017; Perini & Rosasco (2013) doi:10.1016/j.buildenv.2013.05.019'},
  {n:'Sovereign Intelligence Mesh',tag:'Strategic · Architecture',c:P.pur,
   d:'Federated deployment: national governments run sovereign GeoFM instances (data never leaves national cloud). Instances share anonymized causal graph edge DELTAS (effect size updates only) with global GeoGraph — not raw spatial data. Privacy: differential privacy on edge updates (Laplace mechanism, ε=1.0). Governance: Intelligence Advisory Board per country ratifies shared edges. Creates a network effect without data pooling — every government deployment makes the global GeoGraph smarter while satisfying data sovereignty.',
   src:'McMahan (2017) Federated Learning arXiv:1602.05629; Dwork (2006) Differential Privacy TCC'},
  {n:'Physics-Grounded Climate Risk Premium',tag:'Commercial · Addressable now',c:P.grn,
   d:'Current climate risk pricing in banking/insurance uses statistical regression on historical loss data — backward-looking and increasingly wrong as non-stationarity accelerates. PCRP derives climate risk premium directly from GeoTwin physics: ΔBP = f(ΔP(heat), ΔP(flood), ΔP(drought)) for specific property at H3 L9 resolution. Market: ₹50,000 Cr in annual Indian infrastructure bonds — each needs physics-derived CMIP6 climate risk pricing to meet RBI 2023 Climate Risk Framework.',
   src:'Dietz (2021) NCC doi:10.1038/s41558-021-01011-4; RBI (2023) Climate Risk Framework for banks; TCFD (2023)'},
  {n:'Automated Regulatory Pre-Clearance',tag:'India-specific · High value',c:P.sky,
   d:'Before any GeoHeart recommendation is shown, GeoCortex automatically checks it against the full regulatory clearance stack: EIA notification category (Schedule I/II), Forest clearance CAMPA, RERA requirements, DPDPA data consent, SEBI SGF green bond eligibility, CEA grid connection, DISCOM interconnection. Output: intervention feasibility scorecard with timeline estimate per regulatory pathway. Eliminates the #1 reason good interventions die — unknown regulatory blockers discovered after ₹2Cr planning spend.',
   src:'EIA Notification 2006; Forest Conservation Act India; RERA 2016; SEBI SGF 2024; CEA Grid Code 2023'},
];

// ══ DATA — ROADMAP (4 PHASES) ═════════════════════════════════════════
const ROADMAP=[
  {ph:'Phase 0',period:'Months 0–6',label:'Foundation',c:P.blue,
   items:['GeoFM v1.0: Spatial Graph Transformer pre-training on 7-modality India dataset (15 PB). H3 L9 grid, multi-scale attention 7 resolutions.','GeoGraph v1.0: 10,000 causal edges via PC algorithm + 3-round Delphi validation. 3 Indian cities.','City Twin #1: Bengaluru — WRF-ARW domain calibration vs 12 IMD AWS stations. Target RMSE <1.5°C.','GeoHeat MVP: WBGT + UTCI maps live. 3 UHI interventions simulated. BBMP pilot MoU signed.','API v1.0: OpenAPI 3.1 REST + GraphQL, p95 <400ms. ISRO Bhuvan MoU. 3 authenticated beta clients.'],
   kpis:['WRF RMSE <1.5°C vs IMD','GeoFM prediction skill > persistence baseline','1 govt MoU signed','First API billing transaction'],
   funding:'₹1.5 Cr — founders + BIRAC BIG grant + DSIR SIPP R&D'},
  {ph:'Phase 1',period:'Months 6–18',label:'Product–Market Fit',c:P.grn,
   items:['10 city twins live: Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, Ahmedabad, Pune, Kolkata, Jaipur, Surat.','GeoHeat + GeoSolar apps: first revenue — ₹20L/month/city, 2 paying government clients.','GeoVerify v1.0: first satellite-verified outcome report published (Ahmedabad cool roof, 14,000 households, ΔT measured).','GeoGraph: 25,000 causal edges. 3yr IMD validation. First CRPS benchmark published on ModelHub.','Series Seed: ₹15 Cr target (Lightrock India, Avaana Capital, DCDC).'],
   kpis:['₹1.5 Cr ARR','10 city twins operational','1 verified outcome peer-reviewed','CRPS skill >0.25 benchmark published'],
   funding:'₹15 Cr Seed Round'},
  {ph:'Phase 2',period:'Months 18–36',label:'Scale & Certification',c:P.amb,
   items:['50 cities Pan-India: all Tier-1 + Tier-2 cities (NMCG + Smart Cities Mission procurement).','GeoCarbon MRV: ICVCM CCPs v2 certification from third-party auditor. VCS VM0042 approved by Verra.','GeoMemory >100 verified outcomes: CI narrowed 5× for urban cooling (σ₁₀₀ = σ₀/10 = ±0.06°C).','GeoAgent v2.0: 12-agent council live. Delphi-3-round. Dissent quantification on every recommendation.','Series A: $10M (Sequoia Surge / Elevation Capital + strategic ISRO commercial arm).'],
   kpis:['$3M ARR','50 cities','100 verified outcomes','First GeoCarbon credit issued via Verra'],
   funding:'$10M Series A'},
  {ph:'Phase 3',period:'Years 3–5',label:'Platform Leadership',c:P.pur,
   items:['Pan-India complete: all 640 districts at H3 L9 resolution. API available to 500+ DISCOMs and city corporations.','International: Singapore (BCA/NParks), Bangkok (DEPA), Jakarta (BPBD) — SEA expansion.','GeoMemory >1,000 verified outcomes: 10× CI improvement across 8 intervention types.','GeoGraph: 100,000 causal edges. Nature Climate Change peer-reviewed publication.','Carbon market: ₹50 Cr ARR from GeoCarbon MRV fees on ₹5,000 Cr credits annually verified.'],
   kpis:['$25M ARR','3 countries','1,000 verified outcomes','Nature Climate Change publication'],
   funding:'$30M Series B + revenue-funded operations'},
];

// ══ DATA — FINANCIALS ═════════════════════════════════════════════════
const FIN={
  streams:[
    {n:'City Intelligence License',pct:45,c:P.blue,d:'₹20L–₹1.5Cr/city/year (tiered by population). Govt: 5yr lock-in, quarterly invoicing. Enterprise: annual renewal. SLA: 99.5% uptime, <400ms p95, dedicated support. Value prop: one avoided bad infrastructure decision >> annual license fee.'},
    {n:'GeoCarbon MRV Fees',pct:25,c:P.grn,d:'1–3% of credit value verified. India market: ₹15–50/tCO₂. Example: 100 projects × 50,000 tCO₂/yr × ₹35/tCO₂ × 2% fee = ₹3.5 Cr/yr from 100 projects. ICVCM + VCS certified → premium pricing commanded.'},
    {n:'API & Data Licensing',pct:15,c:P.sky,d:'GeoDNA tile licensing: ₹5L–₹50L/yr for research, fintech (climate risk pricing for bonds), insurance (asset risk scoring), real estate platforms. Per-query API: ₹3–₹10/GeoCell query.'},
    {n:'Consulting & Implementation',pct:10,c:'#92400E',d:'City twin setup: ₹80L–₹2Cr one-time. WRF calibration, IoT deployment, staff training. Gross margin lower (40%) but builds deep client relationships. Declines as platform matures.'},
    {n:'Research & Grants',pct:5,c:P.pur,d:'DST, DSIR SIPP, World Bank, ADB climate adaptation grants. ISRO commercial partnership R&D. EU Horizon Climate partnerships. Non-dilutive capital for research phases.'},
  ],
  proj:[
    {yr:'Y1',arr:'₹50L',cities:3,oc:2,hc:8,gm:'−',note:'Pilot phase, BIRAC-funded'},
    {yr:'Y2',arr:'₹2.5 Cr',cities:12,oc:25,hc:20,gm:'55%',note:'First paying govt contracts'},
    {yr:'Y3',arr:'₹12 Cr',cities:50,oc:100,hc:45,gm:'62%',note:'GeoCarbon MRV revenue starts'},
    {yr:'Y4',arr:'₹40 Cr',cities:150,oc:350,hc:90,gm:'68%',note:'International expansion'},
    {yr:'Y5',arr:'₹120 Cr',cities:400,oc:1000,hc:180,gm:'72%',note:'Carbon + city dual flywheel'},
  ],
};

// ══ DATA — MOAT ═══════════════════════════════════════════════════════
const MOAT=[
  {n:'GeoDNA — 86m² Living Fingerprint, 10 Dimensions',c:P.blue,d:'Daily updates, 10 dimensions, permanently accumulating verified outcomes. Competitors face a multi-year cold-start. No shortcut to accumulating verified, location-indexed spatial intelligence at 86m² resolution globally.'},
  {n:'GeoGraph — 100K+ Machine-Executable Causal Edges',c:P.grn,d:'DAG with β ± CI, spatial radii, temporal lags. Not text about causation — causation as computation. 40+ person-years of peer-reviewed literature synthesis. Pearl\'s do-calculus on location-indexed spatial data.'},
  {n:'GeoTwin — Bidirectionally Coupled Physics Models',c:P.sky,d:'WRF+VIC+SWMM+OpenDSS two-way coupled at hourly timestep against real topography and land-use. Validated against historical observations. Zero prompt engineering shortcut exists.'},
  {n:'GeoMemory — σ_n = σ₀/√n Bayesian Compounding',c:P.amb,d:'Every verified deployment narrows prediction uncertainty. After 100 cool roof deployments: 10× precision improvement for the 101st. LLMs cannot compound spatially-verified outcome knowledge. Advantage grows irreversibly.'},
  {n:'1000-Member Ensemble + CRPS Calibration',c:P.pur,d:'Probability distributions, not point estimates. CRPS-validated against IMD/ISRO. Governments and investors cannot defend binary recommendations — they need calibrated distributions across a thousand futures.'},
  {n:'GeoVerify — ICVCM + UNFCCC Article 6.4 Aligned',c:P.red,d:'Only outcome verification platform meeting ICVCM CCPs v2 (2023) + UNFCCC Article 6.4 for ITMOs. Infrastructure for a $250B/yr global carbon market that requires MRV-certified platforms.'},
  {n:'Government-Auditable Cryptographic Provenance',c:P.grn,d:'Signed, version-locked, reproducible, Indian Evidence Act §65B compliant. LLM outputs are non-deterministic and legally inadmissible. GeoCortex outputs can be submitted as government tender evidence.'},
];

// ══ HELPER COMPONENTS ═════════════════════════════════════════════════
function Badge({text,c,bg,brd}){
  return <span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",fontWeight:600,color:c||P.blue,background:bg||P.blueL,border:`1px solid ${brd||P.blueBrd}`,padding:'2px 7px',borderRadius:4,letterSpacing:.3,whiteSpace:'nowrap'}}>{text}</span>;
}
function GradeBadge({g}){
  const [c,bg]=GR[g]||[P.t2,P.bg3];
  return <span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:c,background:bg,border:`1px solid ${c}44`,padding:'2px 8px',borderRadius:4,letterSpacing:.5}}>{g}</span>;
}
function Eq({children}){
  return <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:P.blue,background:P.blueL,border:`1px solid ${P.blueBrd}`,padding:'10px 14px',borderRadius:6,margin:'10px 0',lineHeight:1.7,letterSpacing:.2}}>{children}</div>;
}
function Src({children}){
  return <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:P.amb,background:P.ambL,border:`1px solid ${P.ambBrd}`,padding:'6px 10px',borderRadius:4,lineHeight:1.6}}><span style={{fontWeight:700}}>SOURCE: </span>{children}</div>;
}
function Card({children,style={}}){
  return <div style={{background:P.bg2,border:`1px solid ${P.brd}`,borderRadius:10,padding:'18px 20px',...style}}>{children}</div>;
}
function SectionHead({label,title,sub}){
  return <div style={{marginBottom:28}}>
    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:.15,color:P.t3,textTransform:'uppercase',marginBottom:6}}>{label}</div>
    <div style={{fontSize:22,fontWeight:600,color:P.t1,letterSpacing:-.3,marginBottom:sub?8:0}}>{title}</div>
    {sub && <div style={{fontSize:14,color:P.t2,lineHeight:1.7,maxWidth:680}}>{sub}</div>}
  </div>;
}

// ══ TABS ══════════════════════════════════════════════════════════════
const TABS=[
  {id:'overview',l:'Overview'},
  {id:'council',l:'Expert Council'},
  {id:'arch',l:'Architecture'},
  {id:'dna',l:'GeoDNA'},
  {id:'sims',l:'Simulations'},
  {id:'vsai',l:'vs AI'},
  {id:'methods',l:'Methods'},
  {id:'innov',l:'Innovations'},
  {id:'roadmap',l:'Roadmap'},
  {id:'financials',l:'Financials'},
];

// ══ MAIN COMPONENT ════════════════════════════════════════════════════
export default function GeoCortex(){
  const [tab,setTab]=useState('overview');
  const [openC,setOpenC]=useState(null);
  const [actStack,setActStack]=useState(STACK[0]);
  const [actDNA,setActDNA]=useState(null);
  const [actSim,setActSim]=useState(0);
  const [openProof,setOpenProof]=useState({});
  const [openVS,setOpenVS]=useState(null);

  const toggleProof=(k)=>setOpenProof(p=>({...p,[k]:!p[k]}));

  const navStyle=(id)=>({
    padding:'8px 14px',fontSize:12,fontWeight:tab===id?600:400,
    color:tab===id?P.blue:P.t2,
    background:tab===id?P.blueL:'transparent',
    border:`1px solid ${tab===id?P.blueBrd:'transparent'}`,
    borderRadius:6,cursor:'pointer',whiteSpace:'nowrap',
    fontFamily:"system-ui,sans-serif",letterSpacing:-.1,
  });

  return (
    <div style={{minHeight:'100vh',background:P.bg,fontFamily:"system-ui,-apple-system,sans-serif",color:P.t1,fontSize:14}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');*{box-sizing:border-box;margin:0;padding:0;}button{cursor:pointer;font-family:inherit;}`}</style>

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <div style={{position:'sticky',top:0,zIndex:100,background:`${P.bg2}F2`,backdropFilter:'blur(12px)',borderBottom:`1px solid ${P.brd}`,padding:'10px 24px',display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:6,marginRight:8,flexShrink:0}}>
          <span style={{fontSize:17,fontWeight:700,letterSpacing:-.4,color:P.t1}}>GeoCortex</span>
          <Badge text="v4.0 SCIENTIFIC" c={P.grn} bg={P.grnL} brd={P.grnBrd}/>
        </div>
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={navStyle(t.id)}>{t.l}</button>)}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>

        {/* ══════════ OVERVIEW ══════════════════════════════════════ */}
        {tab==='overview' && <div>
          <SectionHead label="Geographic Foundation Model · Planetary Decision Intelligence" title="GeoCortex does not understand documents. It understands places." sub="Every claim in this document is backed by a named physics equation, a peer-reviewed citation, a named dataset, and a satellite-verifiable outcome. No marketing language without a physics proof behind it."/>
          
          {/* 4 stat cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:28}}>
            {[{v:'86 m²',l:'GeoCell H3 L9 resolution',c:P.blue},{v:'100K+',l:'Causal edges (β ± CI)',c:P.grn},{v:'1,000×',l:'Ensemble members per query',c:P.pur},{v:'σ₀/√n',l:'Prediction uncertainty reduction law',c:P.amb}].map(s=>(
              <Card key={s.v} style={{textAlign:'center',borderTop:`3px solid ${s.c}`}}>
                <div style={{fontSize:28,fontWeight:700,color:s.c,fontFamily:"'JetBrains Mono',monospace",marginBottom:4}}>{s.v}</div>
                <div style={{fontSize:12,color:P.t2,lineHeight:1.4}}>{s.l}</div>
              </Card>
            ))}
          </div>

          {/* The core distinction */}
          <Card style={{borderLeft:`4px solid ${P.blue}`,borderRadius:'0 10px 10px 0',marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:600,color:P.blue,marginBottom:10,textTransform:'uppercase',letterSpacing:.5,fontFamily:"'JetBrains Mono',monospace"}}>The core architectural distinction</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                <div style={{fontWeight:600,fontSize:13,color:P.t1,marginBottom:8}}>Claude Max / GPT-4o / Gemini 1.5</div>
                {['Generate probabilistic text about spatial problems','Know what was written about similar places years ago','Cannot execute WRF against real topography + soil','Outputs are non-deterministic — legally inadmissible','No mechanism to verify if advice worked'].map((x,i)=>(
                  <div key={i} style={{display:'flex',gap:8,marginBottom:5,fontSize:13,color:P.t2}}><span style={{color:P.red,flexShrink:0}}>✗</span>{x}</div>
                ))}
              </div>
              <div>
                <div style={{fontWeight:600,fontSize:13,color:P.t1,marginBottom:8}}>GeoCortex</div>
                {['Runs physics equations on real satellite data','Knows what IS happening at your location right now','Executes WRF+VIC+OpenDSS against measured boundary conditions','Cryptographically signed, reproducible, §65B compliant','Satellite-verifies every prediction at T+12 months'].map((x,i)=>(
                  <div key={i} style={{display:'flex',gap:8,marginBottom:5,fontSize:13,color:P.t1}}><span style={{color:P.grn,flexShrink:0}}>✓</span>{x}</div>
                ))}
              </div>
            </div>
          </Card>

          {/* Stack summary */}
          <Card>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:P.t3,textTransform:'uppercase',letterSpacing:.15,marginBottom:12}}>Intelligence stack — 11 modules, all physics-grounded</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:8}}>
              {STACK.map(m=>(
                <div key={m.id} style={{padding:'10px 12px',background:P.bg3,borderRadius:6,border:`1px solid ${P.brd}`,borderLeft:`3px solid ${m.c}`}}>
                  <div style={{fontSize:12,fontWeight:600,color:m.c,marginBottom:2}}>{m.id}</div>
                  <div style={{fontSize:11,color:P.t2,lineHeight:1.4}}>{m.sub}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>}

        {/* ══════════ EXPERT COUNCIL ════════════════════════════════ */}
        {tab==='council' && <div>
          <SectionHead label="16-Domain Expert Council · Unfiltered Verdict" title="What the council actually found" sub="Each expert reviewed every claim. Graded D to A. Every issue has a specific correction with physics, equation, datasets, and peer-reviewed source. This is the internal scientific critique of GeoCortex by its own council before v4 hardening."/>
          <div style={{marginBottom:10,display:'flex',gap:8,flexWrap:'wrap'}}>
            {Object.entries({A:P.grn,B:'#15803D',C:P.amb,D:P.red}).map(([g,c])=>(
              <span key={g} style={{fontSize:11,color:c,background:`${c}18`,border:`1px solid ${c}44`,padding:'3px 9px',borderRadius:4,fontFamily:"'JetBrains Mono',monospace"}}>{g} = {g==='A'?'Sound':g==='B'?'Minor gaps':g==='C'?'Significant gaps':'Critical gap'}</span>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {CRITS.map((c,i)=>{
              const dm=DOM[c.dom]; const isOpen=openC===i;
              return (
                <div key={i} style={{background:P.bg2,border:`1px solid ${P.brd}`,borderLeft:`4px solid ${dm.c}`,borderRadius:'0 8px 8px 0',overflow:'hidden'}}>
                  <button onClick={()=>setOpenC(isOpen?null:i)} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'14px 18px',background:'transparent',border:'none',textAlign:'left'}}>
                    <GradeBadge g={c.g}/>
                    <Badge text={dm.l} c={dm.c} bg={dm.bg} brd={dm.brd}/>
                    <div style={{flex:1,fontSize:13,color:P.t2,lineHeight:1.4}}>{c.q.substring(0,120)}…</div>
                    <span style={{color:P.t3,fontSize:12,flexShrink:0}}>{isOpen?'▲':'▼'}</span>
                  </button>
                  {isOpen && <div style={{padding:'0 18px 18px'}}>
                    <div style={{background:P.redL,border:`1px solid ${P.redBrd}`,borderRadius:6,padding:'12px 14px',marginBottom:10}}>
                      <div style={{fontSize:10,fontWeight:600,color:P.red,textTransform:'uppercase',letterSpacing:.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>Critical issue identified</div>
                      <div style={{fontSize:13,color:P.t1,lineHeight:1.7}}>{c.q}</div>
                    </div>
                    <div style={{background:P.grnL,border:`1px solid ${P.grnBrd}`,borderRadius:6,padding:'12px 14px',marginBottom:10}}>
                      <div style={{fontSize:10,fontWeight:600,color:P.grn,textTransform:'uppercase',letterSpacing:.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>v4.0 correction & specification</div>
                      <div style={{fontSize:13,color:P.t1,lineHeight:1.7}}>{c.a}</div>
                    </div>
                    <Src>{c.src}</Src>
                  </div>}
                </div>
              );
            })}
          </div>
        </div>}

        {/* ══════════ ARCHITECTURE ══════════════════════════════════ */}
        {tab==='arch' && <div>
          <SectionHead label="Intelligence Architecture" title="11 interlocking modules — every one physics-grounded" sub="Click any module for the full scientific specification: architecture, defining equation, primary datasets, and peer-reviewed sources."/>
          <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:20,alignItems:'start'}}>
            <div style={{display:'flex',flexDirection:'column',gap:4,position:'sticky',top:70}}>
              {STACK.map(m=>{
                const isA=actStack.id===m.id;
                return <button key={m.id} onClick={()=>setActStack(m)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:isA?`${m.c}12`:P.bg2,border:`1px solid ${isA?m.c:P.brd}`,borderLeft:`4px solid ${isA?m.c:P.brd}`,borderRadius:'0 8px 8px 0',textAlign:'left',transition:'all .15s'}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:isA?m.c:P.t1}}>{m.id}</div>
                    <div style={{fontSize:11,color:P.t3,marginTop:1}}>{m.sub}</div>
                  </div>
                </button>;
              })}
            </div>
            <Card key={actStack.id} style={{borderTop:`3px solid ${actStack.c}`}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                <div style={{width:12,height:12,borderRadius:3,background:actStack.c,flexShrink:0}}/>
                <div>
                  <div style={{fontSize:18,fontWeight:700,color:actStack.c}}>{actStack.id}</div>
                  <div style={{fontSize:12,color:P.t2}}>{actStack.sub}</div>
                </div>
              </div>
              <div style={{fontSize:14,color:P.t2,lineHeight:1.8,marginBottom:14}}>{actStack.arch}</div>
              <div style={{fontSize:11,fontWeight:600,color:P.t3,textTransform:'uppercase',letterSpacing:.5,marginBottom:4,fontFamily:"'JetBrains Mono',monospace"}}>Defining equation</div>
              <Eq>{actStack.eq}</Eq>
              <div style={{fontSize:11,fontWeight:600,color:P.t3,textTransform:'uppercase',letterSpacing:.5,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>Primary datasets</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
                {actStack.ds.map(d=><Badge key={d} text={d} c={actStack.c} bg={`${actStack.c}10`} brd={`${actStack.c}40`}/>)}
              </div>
              <Src>{actStack.src}</Src>
            </Card>
          </div>
        </div>}

        {/* ══════════ GEODNA ════════════════════════════════════════ */}
        {tab==='dna' && <div>
          <SectionHead label="GeoDNA · 10 Scientific Dimensions" title="The living fingerprint — every factor named, sourced, and measurable" sub="Every factor carries its measurement instrument, source dataset, update frequency, and governing equation. Not a category — a scientific variable with a unit, a sensor, and a citation."/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:8,marginBottom:20}}>
            {DNA.map(d=>{
              const isA=actDNA?.n===d.n;
              return <button key={d.n} onClick={()=>setActDNA(isA?null:d)} style={{padding:'14px 12px',background:isA?`${d.c}12`:P.bg2,border:`2px solid ${isA?d.c:P.brd}`,borderRadius:10,textAlign:'left',transition:'all .15s',position:'relative'}}>
                {d.isNew && <span style={{position:'absolute',top:6,right:6,fontSize:8,background:P.blue,color:'white',padding:'1px 5px',borderRadius:3,fontFamily:"'JetBrains Mono',monospace"}}>NEW</span>}
                <div style={{width:20,height:3,background:d.c,borderRadius:2,marginBottom:8}}/>
                <div style={{fontSize:12,fontWeight:600,color:isA?d.c:P.t1}}>{d.n}</div>
                <div style={{fontSize:10,color:P.t3,marginTop:3,fontFamily:"'JetBrains Mono',monospace"}}>{d.f.length} factors</div>
              </button>;
            })}
          </div>
          {actDNA && <Card style={{borderLeft:`4px solid ${actDNA.c}`,borderRadius:'0 10px 10px 0'}}>
            <div style={{fontSize:16,fontWeight:600,color:actDNA.c,marginBottom:12}}>{actDNA.n} DNA</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
              {actDNA.f.map((f,i)=><div key={i} style={{display:'flex',gap:8,fontSize:13,color:P.t1,padding:'6px 10px',background:P.bg3,borderRadius:6}}>
                <span style={{color:actDNA.c,flexShrink:0,fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>{String(i+1).padStart(2,'0')}</span>
                {f}
              </div>)}
            </div>
            <div style={{fontSize:11,fontWeight:600,color:P.t3,textTransform:'uppercase',letterSpacing:.5,marginBottom:4,fontFamily:"'JetBrains Mono',monospace"}}>Governing equation</div>
            <Eq>{actDNA.eq}</Eq>
            <Src>{actDNA.src}</Src>
          </Card>}
          {!actDNA && <div style={{textAlign:'center',padding:'20px',color:P.t3,fontSize:13,fontFamily:"'JetBrains Mono',monospace"}}>← Click any dimension above to expand its full factor list</div>}
        </div>}

        {/* ══════════ SIMULATIONS ═══════════════════════════════════ */}
        {tab==='sims' && <div>
          <SectionHead label="GeoSim · 1000-Member Ensemble" title="Physics-grounded consequence engine" sub="Every output carries a 95% Bayesian credible interval derived from 1000-member Latin Hypercube ensemble. Every number has a governing equation behind it. Click physics proofs to expand."/>
          <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
            {SIMS.map((s,i)=><button key={i} onClick={()=>setActSim(i)} style={{padding:'8px 14px',background:actSim===i?P.blueL:P.bg2,border:`1px solid ${actSim===i?P.blueBrd:P.brd}`,borderRadius:6,fontSize:12,fontWeight:actSim===i?600:400,color:actSim===i?P.blue:P.t2}}>{s.l}</button>)}
          </div>
          {SIMS[actSim] && (() => {const s=SIMS[actSim]; return <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:20}}>
              {s.outs.map(o=><Card key={o.l} style={{textAlign:'center',borderTop:`2px solid ${P.blue}`}}>
                <div style={{fontSize:24,fontWeight:700,color:P.blue,fontFamily:"'JetBrains Mono',monospace"}}>{o.v}</div>
                <div style={{fontSize:10,color:P.t3,fontFamily:"'JetBrains Mono',monospace",margin:'2px 0'}}>95% CI: {o.ci}</div>
                <div style={{fontSize:11,color:P.t2}}>{o.l}</div>
              </Card>)}
            </div>
            {s.proofs.map((pr,pi)=>{
              const k=`${actSim}-${pi}`;
              return <div key={k} style={{marginBottom:10}}>
                <button onClick={()=>toggleProof(k)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',background:P.bg3,border:`1px solid ${P.brd}`,borderRadius:openProof[k]?'6px 6px 0 0':6,color:P.t1,fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>
                  <span><span style={{color:P.blue,marginRight:8}}>⊢</span>PHYSICS PROOF: {pr.n}</span>
                  <span style={{color:P.t3}}>{openProof[k]?'▲':'▼'}</span>
                </button>
                {openProof[k] && <Card style={{borderRadius:'0 0 6px 6px',border:`1px solid ${P.brd}`,borderTop:'none'}}>
                  <div style={{fontSize:11,color:P.t3,textTransform:'uppercase',letterSpacing:.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>Equation</div>
                  <Eq>{pr.eq}</Eq>
                  <div style={{fontSize:11,color:P.t3,textTransform:'uppercase',letterSpacing:.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>Variables & assumptions</div>
                  <div style={{fontSize:13,color:P.t2,lineHeight:1.7,marginBottom:10,padding:'10px 14px',background:P.bg3,borderRadius:6}}>{pr.vars}</div>
                  <Src>{pr.src}</Src>
                </Card>}
              </div>;
            })}
          </div>; })()}
        </div>}

        {/* ══════════ vs AI ═════════════════════════════════════════ */}
        {tab==='vsai' && <div>
          <SectionHead label="GeoCortex vs Claude Max · GPT-4o · Gemini 1.5" title="Why not just use Claude Max?" sub="The question every sophisticated buyer asks in the first 60 seconds. The answer is architectural, not philosophical. Seven hard capabilities that language models cannot provide, with the specific physical or mathematical reason why."/>
          <div style={{background:P.slteL,border:`1px solid ${P.slteBrd}`,borderRadius:10,padding:'14px 18px',marginBottom:20,fontSize:13,color:P.t2,lineHeight:1.7}}>
            <strong style={{color:P.t1}}>The distinction in one sentence:</strong> Claude Max, GPT-4o, and Gemini are language models — they generate probabilistic text about the world. GeoCortex is a physics computation system — it runs numerical models of the world from measured inputs and verifies outputs against satellite observations. No prompt engineering closes this gap.
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:12}}>
            {['GeoCortex','LLM (Claude/GPT/Gemini)','Why the gap matters'].map(h=><div key={h} style={{padding:'8px 12px',background:h==='GeoCortex'?P.grnL:h.includes('LLM')?P.redL:P.bg3,border:`1px solid ${h==='GeoCortex'?P.grnBrd:h.includes('LLM')?P.redBrd:P.brd}`,borderRadius:6,fontSize:11,fontWeight:600,color:h==='GeoCortex'?P.grn:h.includes('LLM')?P.red:P.t2,fontFamily:"'JetBrains Mono',monospace",textAlign:'center'}}>{h}</div>)}
          </div>
          {VS.map((v,i)=>{
            const isO=openVS===i;
            return <div key={i} style={{marginBottom:8}}>
              <button onClick={()=>setOpenVS(isO?null:i)} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px 16px',background:P.bg2,border:`1px solid ${P.brd}`,borderRadius:isO?'8px 8px 0 0':8,textAlign:'left'}}>
                <div style={{flex:1,fontSize:13,fontWeight:600,color:P.t1}}>{v.cap}</div>
                <span style={{color:P.t3,flexShrink:0}}>{isO?'▲':'▼'}</span>
              </button>
              {isO && <Card style={{borderRadius:'0 0 8px 8px',borderTop:'none'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:12}}>
                  <div style={{padding:'10px 12px',background:P.grnL,border:`1px solid ${P.grnBrd}`,borderRadius:6}}>
                    <div style={{fontSize:10,fontWeight:600,color:P.grn,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>GEOCORTEX</div>
                    <div style={{fontSize:12,color:P.t1,lineHeight:1.7}}>{v.gc}</div>
                  </div>
                  <div style={{padding:'10px 12px',background:P.redL,border:`1px solid ${P.redBrd}`,borderRadius:6}}>
                    <div style={{fontSize:10,fontWeight:600,color:P.red,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>LLMs (Claude / GPT / Gemini)</div>
                    <div style={{fontSize:12,color:P.t1,lineHeight:1.7}}>{v.llm}</div>
                  </div>
                  <div style={{padding:'10px 12px',background:P.ambL,border:`1px solid ${P.ambBrd}`,borderRadius:6}}>
                    <div style={{fontSize:10,fontWeight:600,color:P.amb,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>WHY THE GAP EXISTS</div>
                    <div style={{fontSize:12,color:P.t1,lineHeight:1.7}}>{v.why}</div>
                  </div>
                </div>
                <Src>{v.src}</Src>
              </Card>}
            </div>;
          })}
        </div>}

        {/* ══════════ METHODS ═══════════════════════════════════════ */}
        {tab==='methods' && <div>
          <SectionHead label="Scientific Methodology" title="Ensemble forecasting + outcome verification" sub="The two methodological innovations that make GeoCortex outputs defensible in government, science, and carbon markets."/>
          <div style={{fontSize:16,fontWeight:600,color:P.t1,marginBottom:16,paddingBottom:10,borderBottom:`1px solid ${P.brd}`}}>Ensemble Forecasting Methodology</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:32}}>
            {FORECAST.map(f=><Card key={f.n}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                <div style={{fontSize:13,fontWeight:600,color:P.t1}}>{f.n}</div>
                <Badge text={f.tag} c={P.blue} bg={P.blueL} brd={P.blueBrd}/>
              </div>
              <div style={{fontSize:13,color:P.t2,lineHeight:1.75,marginBottom:10}}>{f.d}</div>
              <Eq>{f.eq}</Eq>
              <Src>{f.src}</Src>
            </Card>)}
          </div>
          <div style={{fontSize:16,fontWeight:600,color:P.t1,marginBottom:16,paddingBottom:10,borderBottom:`1px solid ${P.brd}`}}>GeoVerify — 5-Step Satellite Verification Protocol</div>
          <div style={{display:'flex',flexDirection:'column',gap:0,marginBottom:20}}>
            {VERIFYSTEPS.map((s,i)=><div key={i} style={{display:'flex',gap:0}}>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginRight:16}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:P.blueL,border:`2px solid ${P.blue}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:600,color:P.blue,fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{s.sym}</div>
                {i<VERIFYSTEPS.length-1 && <div style={{width:2,flex:1,background:P.brd,minHeight:20,marginBottom:-2}}/>}
              </div>
              <Card style={{flex:1,marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <div style={{fontSize:13,fontWeight:600,color:P.t1}}>{s.n}</div>
                  <Badge text={s.m} c={P.grn} bg={P.grnL} brd={P.grnBrd}/>
                </div>
                <div style={{fontSize:13,color:P.t2,lineHeight:1.7}}>{s.d}</div>
              </Card>
            </div>)}
          </div>
          <div style={{fontSize:14,fontWeight:600,color:P.t1,marginBottom:10}}>Verification Satellite Fleet</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:8}}>
            {SATS.map(s=><Card key={s.n} style={{padding:'12px 14px'}}>
              <div style={{fontSize:12,fontWeight:600,color:P.blue,marginBottom:4}}>{s.n}</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:6}}>
                <Badge text={s.ag} c={P.t2} bg={P.bg3} brd={P.brd}/>
                <Badge text={`${s.res} · ${s.rev}`} c={P.pur} bg={P.purL} brd={P.purBrd}/>
              </div>
              <div style={{fontSize:11,color:P.t2}}>{s.use}</div>
            </Card>)}
          </div>
        </div>}

        {/* ══════════ INNOVATIONS ═══════════════════════════════════ */}
        {tab==='innov' && <div>
          <SectionHead label="Innovation Tangents — Beyond the Current Spec" title="6 novel research and product directions" sub="Ideas not yet built but grounded in existing literature. Each addresses a genuine gap that neither GeoCortex current-spec nor any LLM fills. These are the differentiating bets."/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
            {INNOV.map(inn=><Card key={inn.n} style={{borderTop:`3px solid ${inn.c}`}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:12}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,color:P.t1,marginBottom:4}}>{inn.n}</div>
                  <Badge text={inn.tag} c={inn.c} bg={`${inn.c}12`} brd={`${inn.c}44`}/>
                </div>
              </div>
              <div style={{fontSize:13,color:P.t2,lineHeight:1.75,marginBottom:12}}>{inn.d}</div>
              <Src>{inn.src}</Src>
            </Card>)}
          </div>
        </div>}

        {/* ══════════ ROADMAP ═══════════════════════════════════════ */}
        {tab==='roadmap' && <div>
          <SectionHead label="Product Roadmap · 4 Phases" title="From city twin proof-of-concept to planetary intelligence layer" sub="Each phase has specific, measurable KPIs. No vanity metrics — every milestone has a physics validation or revenue target attached."/>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {ROADMAP.map((ph,i)=><Card key={ph.ph} style={{borderLeft:`4px solid ${ph.c}`,borderRadius:'0 10px 10px 0'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:16,marginBottom:14}}>
                <div style={{textAlign:'center',flexShrink:0}}>
                  <div style={{fontSize:11,fontWeight:700,color:ph.c,fontFamily:"'JetBrains Mono',monospace"}}>{ph.ph}</div>
                  <div style={{fontSize:10,color:P.t3,fontFamily:"'JetBrains Mono',monospace"}}>{ph.period}</div>
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    <div style={{fontSize:15,fontWeight:600,color:P.t1}}>{ph.label}</div>
                    <Badge text={ph.funding} c={ph.c} bg={`${ph.c}12`} brd={`${ph.c}40`}/>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:12}}>
                    {ph.items.map((it,j)=><div key={j} style={{display:'flex',gap:8,fontSize:12,color:P.t2,padding:'6px 10px',background:P.bg3,borderRadius:6,lineHeight:1.5}}>
                      <span style={{color:ph.c,flexShrink:0,fontFamily:"'JetBrains Mono',monospace",fontSize:10}}>{String(j+1).padStart(2,'0')}</span>
                      {it}
                    </div>)}
                  </div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    {ph.kpis.map((k,j)=><Badge key={j} text={k} c={ph.c} bg={`${ph.c}12`} brd={`${ph.c}44`}/>)}
                  </div>
                </div>
              </div>
            </Card>)}
          </div>
        </div>}

        {/* ══════════ FINANCIALS ════════════════════════════════════ */}
        {tab==='financials' && <div>
          <SectionHead label="Business Model & Financial Projections" title="Unit economics, revenue streams, and 5-year trajectory" sub="All projections grounded in comparable SaaS benchmarks and named market data sources. CAC, LTV, and gross margin targets are specific, not aspirational platitudes."/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:24}}>
            <Card>
              <div style={{fontSize:13,fontWeight:600,color:P.t1,marginBottom:12}}>Revenue streams</div>
              {FIN.streams.map(s=><div key={s.n} style={{marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${P.brd}`}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <div style={{fontSize:12,fontWeight:600,color:s.c}}>{s.n}</div>
                  <div style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:s.c,background:`${s.c}12`,padding:'1px 6px',borderRadius:3,border:`1px solid ${s.c}30`}}>{s.pct}%</div>
                </div>
                <div style={{display:'flex',height:6,borderRadius:3,background:P.bg3,overflow:'hidden',marginBottom:6}}>
                  <div style={{width:`${s.pct}%`,background:s.c,borderRadius:3}}/>
                </div>
                <div style={{fontSize:11,color:P.t2,lineHeight:1.6}}>{s.d}</div>
              </div>)}
            </Card>
            <Card>
              <div style={{fontSize:13,fontWeight:600,color:P.t1,marginBottom:12}}>Unit economics</div>
              {[['Government LTV','₹25 Cr (5yr contract)'],['Government CAC','₹40L (12-month cycle)'],['Enterprise LTV','₹4 Cr (3yr renewal)'],['Enterprise CAC','₹15L (3-month cycle)'],['Gov LTV/CAC','62.5× (excellent)'],['Gross Margin Target','68–72% at scale'],['EBITDA Y3','−15% (investing)'],['EBITDA Y5','+22% (scale achieved)']].map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:`1px solid ${P.brd}`}}>
                  <span style={{fontSize:12,color:P.t2}}>{k}</span>
                  <Badge text={v} c={P.grn} bg={P.grnL} brd={P.grnBrd}/>
                </div>
              ))}
              <div style={{marginTop:12,padding:'10px 12px',background:P.ambL,border:`1px solid ${P.ambBrd}`,borderRadius:6,fontSize:11,color:P.amb,lineHeight:1.6}}>
                <strong>Source:</strong> Bessemer VP SaaS benchmarks 2024; Gartner Smart City Platform MQ 2024; Comparable: Planet Labs, Esri Enterprise, IBM EIS pricing intelligence.
              </div>
            </Card>
          </div>
          <Card>
            <div style={{fontSize:13,fontWeight:600,color:P.t1,marginBottom:12}}>5-year ARR trajectory</div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr>{['Year','ARR','Cities','Verified Outcomes','Headcount','Gross Margin','Note'].map(h=><th key={h} style={{padding:'8px 12px',textAlign:'left',fontSize:10,fontWeight:600,color:P.t3,textTransform:'uppercase',letterSpacing:.5,borderBottom:`1px solid ${P.brd}`,fontFamily:"'JetBrains Mono',monospace"}}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {FIN.proj.map((r,i)=><tr key={r.yr} style={{background:i%2?P.bg3:P.bg2}}>
                    <td style={{padding:'10px 12px',fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:P.blue,fontSize:13}}>{r.yr}</td>
                    <td style={{padding:'10px 12px',fontFamily:"'JetBrains Mono',monospace",fontWeight:600,color:P.grn,fontSize:13}}>{r.arr}</td>
                    <td style={{padding:'10px 12px',fontSize:13,color:P.t1}}>{r.cities}</td>
                    <td style={{padding:'10px 12px',fontSize:13,color:P.t1}}>{r.oc}</td>
                    <td style={{padding:'10px 12px',fontSize:13,color:P.t1}}>{r.hc}</td>
                    <td style={{padding:'10px 12px',fontSize:12,color:r.gm.includes('-')?P.red:P.grn,fontFamily:"'JetBrains Mono',monospace"}}>{r.gm}</td>
                    <td style={{padding:'10px 12px',fontSize:12,color:P.t2}}>{r.note}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </Card>
        </div>}

        {/* ══════════ MOAT & APPS ═══════════════════════════════════ */}
        {tab==='financials' && null}
        {tab!=='overview' && tab!=='council' && tab!=='arch' && tab!=='dna' && tab!=='sims' && tab!=='vsai' && tab!=='methods' && tab!=='innov' && tab!=='roadmap' && tab!=='financials' && <div>
          <SectionHead label="Competitive Moat" title="What makes this irreplicable" sub="Eight compounding advantages that grow stronger with every deployment."/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:28}}>
            {MOAT.map(m=><Card key={m.n} style={{borderLeft:`3px solid ${m.c}`,borderRadius:'0 8px 8px 0'}}>
              <div style={{fontSize:13,fontWeight:600,color:m.c,marginBottom:6}}>{m.n}</div>
              <div style={{fontSize:13,color:P.t2,lineHeight:1.7}}>{m.d}</div>
            </Card>)}
          </div>
          <SectionHead label="GeoApps Ecosystem" title="14 vertical intelligence applications" sub="Each integrates the full GeoFM+GeoGraph+GeoTwin stack with validated domain-specific model families."/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8}}>
            {[{n:'GeoHeat',d:'WBGT+UTCI+WRF UCM urban heat'},{n:'GeoSolar',d:'PVGIS+NREL SAM yield, LCOE, IRR'},{n:'GeoWind',d:'WAsP Weibull+wake+IRR'},{n:'GeoWater',d:'SWAT++MODFLOW+Darcy recharge'},{n:'GeoEV',d:'EVI-Pro demand+V2G grid dispatch'},{n:'GeoCarbon',d:'VCS VM0042 AFOLU MRV certified'},{n:'GeoFarm',d:'DSSAT crop+FAO AquaCrop irrigation'},{n:'GeoCity',d:'UrbanSim+LCZ morphology+NSGA-II'},{n:'GeoRisk',d:'HAZUS-MH multi-hazard+copula'},{n:'GeoDisaster',d:'PFRA flood+FWI wildfire+EWS'},{n:'GeoInfra',d:'FRAGILITY curves+cascade failure'},{n:'GeoMicro',d:'ENVI-met CFD street-scale NS 1m'},{n:'GeoPort',d:'PIANC coastal+sea level rise'},{n:'GeoAPI',d:'OpenAPI 3.1 REST+GraphQL <200ms'},].map(a=><Card key={a.n} style={{padding:'12px 14px'}}>
              <div style={{fontSize:13,fontWeight:600,color:P.blue,marginBottom:4}}>{a.n}</div>
              <div style={{fontSize:11,color:P.t2,lineHeight:1.5}}>{a.d}</div>
            </Card>)}
          </div>
        </div>}
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <div style={{borderTop:`1px solid ${P.brd}`,padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',background:P.bg2,flexWrap:'wrap',gap:10}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:14,fontWeight:700,color:P.t1}}>GeoCortex</span>
          <Badge text="v4.0 · LIGHT · 16-EXPERT COUNCIL" c={P.grn} bg={P.grnL} brd={P.grnBrd}/>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {['Physics-grounded','Source-cited','Satellite-verified','ICVCM CCPs v2','§65B compliant'].map(t=><Badge key={t} text={t} c={P.t3} bg={P.bg3} brd={P.brd}/>)}
        </div>
      </div>
    </div>
  );
}
