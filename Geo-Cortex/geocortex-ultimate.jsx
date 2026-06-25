import { useState, useEffect } from "react";

const E = {
  water: { name:"Water", sym:"◈", p:"#0891B2", lt:"#E0F2FE", tint:"#F0FBFF", b:"#7DD3FC", dk:"#075985", lbl:"Flow · Depth · Life" },
  fire:  { name:"Fire",  sym:"◆", p:"#C2500A", lt:"#FFF7ED", tint:"#FFFAF5", b:"#FDBA74", dk:"#7C2D12", lbl:"Transform · Ignite · Act" },
  earth: { name:"Earth", sym:"◉", p:"#15803D", lt:"#F0FDF4", tint:"#F7FDF9", b:"#86EFAC", dk:"#14532D", lbl:"Root · Grow · Endure" },
  space: { name:"Space", sym:"◎", p:"#7C3AED", lt:"#F5F3FF", tint:"#FAF9FF", b:"#C4B5FD", dk:"#4C1D95", lbl:"Infinite · Dimensional · Vast" },
};

const STACK = [
  { id:"GeoFM",     sym:"◎", el:"space", sub:"Geographic Foundation Model",
    desc:"The core intelligence. Trained on the world's largest spatial dataset: satellite imagery, terrain models, atmospheric data, hydrological records, energy grids, ecological observations, and continuous human activity at planetary scale. GeoFM learns the spatial grammar of Earth — the invisible relationships connecting every variable in every place across every timescale. Input: Location. Output: Understanding." },
  { id:"GeoGraph",  sym:"⟁", el:"earth", sub:"Planetary Knowledge Graph",
    desc:"The company's most irreplaceable asset. A living causal map encoding 100,000+ scientifically verified relationships between environmental systems, infrastructure dependencies, economic dynamics, policy levers, and intervention outcomes. Built from decades of peer-reviewed research distilled into machine-executable causal intelligence. GeoGraph is how GeoCortex understands why, not just what." },
  { id:"GeoDNA",    sym:"⬡", el:"water", sub:"Location Identity System",
    desc:"Every location on Earth receives a living fingerprint across 9 dimensions: Climate, Water, Ecology, Urban, Energy, Human, Economic, Risk, and Opportunity. Hyper-local. Continuously updated from satellite, sensor, and environmental streams. Not a static snapshot — a living identity that evolves with the place itself, permanently accumulated." },
  { id:"GeoTwin",   sym:"⊕", el:"space", sub:"Planetary Digital Twin Engine",
    desc:"Every location exists in 5 simultaneous states: Historical (what was?), Current (what is?), Future (what will be?), Simulated (what if?), and Optimal (what should be?). The world's first true counterfactual engine for physical space — not just what is, but what would have happened under different decisions. Scale: GeoCell to Nation." },
  { id:"GeoBrain",  sym:"◈", el:"fire",  sub:"Understanding Engine",
    desc:"Causal reasoning across 12 intelligence modules. Answers: What exists? What is happening? Why is it happening? What will happen? Not pattern detection — mechanism. Every answer grounded in GeoGraph's verified causal science, with full scientific traceability. Modules: Climate, Water, Air, Biodiversity, Carbon, Energy, Infrastructure, Population, Economic, Sustainability, Risk, Opportunity." },
  { id:"GeoHeart",  sym:"◇", el:"fire",  sub:"Decision Intelligence Engine",
    desc:"The planetary executive function. GeoHeart translates understanding into optimized action — ranked recommendations, ROI-modeled financial scenarios, tradeoff analyses, policy analysis, and implementation roadmaps for any location. GeoBrain tells you what is. GeoHeart tells you what to do. Outputs: Recommendations, Roadmaps, Financial Models, Impact Assessments." },
  { id:"GeoSim",    sym:"⌀", el:"earth", sub:"Simulation Engine",
    desc:"The world's only consequence engine for physical decisions. Before a government plants a million trees, before a developer builds a solar farm, before a city expands its boundary — GeoSim models every downstream effect across environmental, economic, energy, and social dimensions at any scale. Physics-grounded, not statistical. Answers: What happens if?" },
  { id:"GeoTrust",  sym:"⟐", el:"water", sub:"Scientific Trust Layer",
    desc:"Explainable by design. Every output carries a full scientific provenance chain: evidence sources, explicit assumptions, confidence scores, uncertainty ranges, alternative strategies, and verification methodology. Auditable by governments. Defensible in policy. Fundable by institutions. Not a black box — a glass box with a full reasoning trail." },
  { id:"GeoMemory", sym:"∞",  el:"earth", sub:"Compounding Intelligence",
    desc:"GeoCortex never forgets. Every intervention and its measured outcome becomes permanent institutional knowledge — making each future recommendation smarter. At scale: the world's only verified database of what environmental interventions actually achieve, city by city. Intelligence compounds with every decision on the platform, widening the advantage continuously." },
  { id:"GeoAgent",  sym:"⊗", el:"space", sub:"Multi-Agent Expert Council",
    desc:"Not one AI — a council of 10 domain experts who deliberate before any recommendation is generated: Climate Scientist, Hydrologist, Energy Engineer, Urban Planner, Environmental Economist, Policy Advisor, Public Health Expert, Biodiversity Specialist, Infrastructure Planner, Disaster Management Expert. Adversarial validation is architecturally built in. Dissent is preserved in outputs." },
  { id:"GeoApps",   sym:"▦", el:"fire",  sub:"Vertical Intelligence Ecosystem",
    desc:"12 purpose-built intelligence applications on the full GeoCortex platform: GeoHeat, GeoSolar, GeoWind, GeoWater, GeoEV, GeoCarbon, GeoFarm, GeoCity, GeoRisk, GeoDisaster, GeoInfra, and GeoAPI — each delivering domain-specific decision intelligence for every physical challenge at scale." },
];

const DNA = [
  { name:"Climate DNA",    el:"fire",  f:["Temperature","Humidity","Rainfall","Solar Radiation","Wind Patterns","Heat Stress Index"] },
  { name:"Water DNA",      el:"water", f:["Surface Water","Groundwater Depth","Hydrology","Water Availability","Water Stress Index"] },
  { name:"Ecological DNA", el:"earth", f:["Vegetation Index","Forest Cover","Biodiversity Score","Soil Health","Carbon Storage"] },
  { name:"Urban DNA",      el:"earth", f:["Building Stock","Road Networks","Land Use Density","Public Infrastructure"] },
  { name:"Energy DNA",     el:"fire",  f:["Solar Potential","Wind Capacity","Grid Resilience","Storage Potential"] },
  { name:"Human DNA",      el:"water", f:["Population Density","Health Index","Vulnerability Score","Mobility Patterns"] },
  { name:"Economic DNA",   el:"space", f:["Productivity Index","Investment Potential","Economic Opportunity"] },
  { name:"Risk DNA",       el:"space", f:["Heat Risk","Flood Probability","Drought Index","Fire Risk","Pollution Level"] },
  { name:"Opportunity DNA",el:"earth", f:["Renewable Energy","Carbon Projects","Urban Cooling","Agriculture","Infrastructure"] },
];

const AGENTS = [
  { t:"Climate Scientist",       sym:"🌡", el:"water", f:"Temperature anomalies, atmospheric dynamics, precipitation" },
  { t:"Hydrologist",             sym:"💧", el:"water", f:"Water systems, flood modeling, aquifer health & stress" },
  { t:"Energy Engineer",         sym:"⚡", el:"fire",  f:"Renewables, grid resilience, storage optimization" },
  { t:"Urban Planner",           sym:"🏙", el:"earth", f:"Land use, density optimization, infrastructure design" },
  { t:"Environmental Economist", sym:"📊", el:"earth", f:"Cost-benefit, externalities, environmental ROI" },
  { t:"Policy Advisor",          sym:"⚖", el:"space", f:"Regulatory frameworks, compliance, incentive design" },
  { t:"Public Health Expert",    sym:"🏥", el:"fire",  f:"Air quality, heat mortality, population vulnerability" },
  { t:"Biodiversity Specialist", sym:"🌿", el:"earth", f:"Ecosystem health, species corridors, habitat" },
  { t:"Infrastructure Planner",  sym:"🔧", el:"earth", f:"Grid, transport, resilience engineering" },
  { t:"Disaster Management",     sym:"🛡", el:"space", f:"Risk assessment, early warning, emergency response" },
];

const MOAT = [
  { n:"GeoDNA Database",            el:"water", d:"A living fingerprint for every location across 9 dimensions. Irreplaceable, self-reinforcing, impossible to recreate without years of real-world signal." },
  { n:"GeoGraph",                   el:"earth", d:"10,000+ variables, 100,000+ causal relationships. Peer-reviewed scientific causation distilled into machine-executable intelligence." },
  { n:"GeoTwin Network",            el:"space", d:"Self-updating digital twins that improve daily. A simulation infrastructure no external dataset can replicate." },
  { n:"GeoMemory",                  el:"earth", d:"Every intervention and outcome compounds into institutional knowledge — a widening intelligence advantage accelerating with every decision." },
  { n:"Scientific Factor Registry", el:"water", d:"1,000+ peer-validated factors with uncertainty bounds. Scientific credibility no competitor can manufacture on a compressed timeline." },
  { n:"Simulation Fidelity",        el:"space", d:"Physics-based consequence modeling at any scale. A depth of simulation that cannot be vibe-coded into existence." },
  { n:"Decision Intelligence",      el:"fire",  d:"Multi-objective optimization trained on real-world outcomes — surfacing tradeoffs no single-domain model could detect." },
  { n:"Verification Database",      el:"fire",  d:"The only third-party-verifiable outcome database at planetary scale — infrastructure for carbon markets, ESG, and climate treaty compliance." },
];

const APPS = [
  { n:"GeoHeat",    sym:"🌡", el:"fire",  d:"Urban Heat Island Intelligence" },
  { n:"GeoSolar",   sym:"☀",  el:"fire",  d:"Solar Opportunity & Yield" },
  { n:"GeoWind",    sym:"💨", el:"space", d:"Wind Resource Intelligence" },
  { n:"GeoWater",   sym:"💧", el:"water", d:"Water Security Intelligence" },
  { n:"GeoEV",      sym:"⚡", el:"earth", d:"EV Infrastructure Siting" },
  { n:"GeoCarbon",  sym:"🌿", el:"earth", d:"Carbon Project & Credit" },
  { n:"GeoFarm",    sym:"🌾", el:"earth", d:"Agricultural Optimization" },
  { n:"GeoCity",    sym:"🏙", el:"fire",  d:"Urban Planning Intelligence" },
  { n:"GeoRisk",    sym:"⚠",  el:"space", d:"Climate Risk & Resilience" },
  { n:"GeoDisaster",sym:"🛡", el:"water", d:"Flood · Drought · Wildfire" },
  { n:"GeoInfra",   sym:"🔧", el:"earth", d:"Infrastructure Planning" },
  { n:"GeoAPI",     sym:"⚙",  el:"space", d:"AI-to-AI Decision Layer" },
];

const USERS = [
  { r:"Citizen",    el:"water", d:"Simple, actionable local intelligence",             eg:"Is my neighbourhood at flood risk this monsoon?" },
  { r:"Researcher", el:"space", d:"Scientific depth, full factor access",              eg:"Calibrate carbon sequestration for semi-arid transition zones" },
  { r:"Business",   el:"fire",  d:"ROI, forecasts, opportunity identification",        eg:"Where is the highest-IRR solar opportunity in Maharashtra?" },
  { r:"Government", el:"earth", d:"Funding prioritisation, policy optimisation",       eg:"Rank climate adaptation spend across 400 districts by impact" },
  { r:"Strategic",  el:"space", d:"National-scale decision intelligence",              eg:"Model economic cost of 2°C warming on Indian GDP to 2050" },
  { r:"AI Systems", el:"space", d:"Machine-consumable intelligence via GeoAPI",        eg:"GeoAPI endpoint for autonomous infrastructure planning agents" },
];

const SIMS = [
  { lbl:"1M Trees · Mumbai",      prompt:"Plant 1 million trees across the Mumbai Metropolitan Region",
    outs:[{v:"−1.4°C",l:"surface temperature"},{v:"+23%",l:"groundwater recharge"},{v:"−8%",l:"cooling energy load"},{v:"₹2.1B",l:"carbon credit value/yr"}] },
  { lbl:"500MW Solar · Rajasthan", prompt:"Deploy 500 MW utility-scale solar across Rajasthan",
    outs:[{v:"380K",l:"households electrified"},{v:"−0.9 Mt",l:"CO₂ avoided/year"},{v:"42 MW",l:"grid capacity freed"},{v:"22%",l:"projected IRR"}] },
  { lbl:"City Expansion +30%",    prompt:"Expand city boundary by 30% into urban periphery",
    outs:[{v:"+12%",l:"heat-island expansion"},{v:"+34%",l:"flood risk increase"},{v:"−18%",l:"agricultural output"},{v:"−₹4.8B",l:"10-yr economic impact"}] },
  { lbl:"10K EV Chargers · Delhi", prompt:"Install 10,000 EV charging stations across Delhi NCR",
    outs:[{v:"62%",l:"fleet electrification"},{v:"−2.1 Mt",l:"NOx/year"},{v:"+1.8%",l:"grid peak demand"},{v:"₹890M",l:"capex required"}] },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  ::selection{background:rgba(124,58,237,0.12);}
  .gc-sec{padding:88px 0;}
  .gc-con{max-width:1080px;margin:0 auto;padding:0 40px;}
  .gc-mod{
    width:100%;text-align:left;padding:11px 13px;
    background:white;border:1px solid #E5E7EB;border-radius:7px;
    cursor:pointer;display:flex;align-items:center;gap:11px;
    transition:all .16s;
  }
  .gc-mod:hover{transform:translateX(2px);box-shadow:0 2px 8px rgba(0,0,0,0.05);}
  .gc-dna{padding:13px 11px;border-radius:7px;border:1px solid #E5E7EB;background:white;cursor:pointer;transition:all .2s;}
  .gc-dna:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(0,0,0,0.07);}
  .gc-agent{padding:15px;border-radius:7px;border:1px solid #E5E7EB;background:white;transition:all .2s;}
  .gc-agent:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(0,0,0,0.07);}
  .gc-app{padding:18px 10px;border-radius:7px;border:1px solid #E5E7EB;background:white;text-align:center;transition:all .2s;}
  .gc-app:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(0,0,0,0.07);}
  .gc-sim-tab{padding:7px 12px;border-radius:5px;border:1px solid #E5E7EB;background:white;color:#6B7280;font-size:10px;font-family:'JetBrains Mono',monospace;cursor:pointer;transition:all .14s;white-space:nowrap;}
  @keyframes gc-fade{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
`;

function Spectrum() {
  return <div style={{height:2,background:"linear-gradient(90deg,#0891B2 0%,#C2500A 33%,#15803D 66%,#7C3AED 100%)",opacity:0.5}}/>;
}

function Dots({ active }) {
  return (
    <span style={{display:"inline-flex",gap:4,alignItems:"center"}}>
      {Object.entries(E).map(([k,el])=>(
        <span key={k} style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:k===active?el.p:"#D1D5DB",boxShadow:k===active?`0 0 5px ${el.p}88`:"none",transition:"all .2s"}}/>
      ))}
    </span>
  );
}

function Eye({ text, element }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:3.5,textTransform:"uppercase",color:E[element].p,fontWeight:500}}>{text}</span>
      <Dots active={element}/>
    </div>
  );
}

function H2({ children, style={} }) {
  return <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3vw,44px)",fontWeight:800,lineHeight:1.1,color:"#1C1917",marginBottom:14,...style}}>{children}</h2>;
}

function Lead({ children }) {
  return <p style={{fontSize:15,color:"#6B7280",lineHeight:1.85,maxWidth:640,marginBottom:48}}>{children}</p>;
}

function Chip({ text, element }) {
  const el = E[element];
  return <span style={{padding:"3px 10px",borderRadius:4,background:el.lt,border:`1px solid ${el.b}`,color:el.dk,fontSize:10,fontFamily:"'JetBrains Mono',monospace",display:"inline-block"}}>{text}</span>;
}

function Compass({ size=248 }) {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle(a => (a + 0.18) % 360), 50);
    return () => clearInterval(id);
  }, []);

  const cx = size/2, cy = size/2;
  const ro = size*0.455, ri = size*0.375;
  const toRad = deg => (deg - 90) * Math.PI / 180;

  const arc = (s, e) => {
    const si = toRad(s), ei = toRad(e - 0.8);
    const x1=cx+ro*Math.cos(si), y1=cy+ro*Math.sin(si);
    const x2=cx+ro*Math.cos(ei), y2=cy+ro*Math.sin(ei);
    const x3=cx+ri*Math.cos(ei), y3=cy+ri*Math.sin(ei);
    const x4=cx+ri*Math.cos(si), y4=cy+ri*Math.sin(si);
    return `M${x1},${y1} A${ro},${ro},0,0,1,${x2},${y2} L${x3},${y3} A${ri},${ri},0,0,0,${x4},${y4} Z`;
  };

  const quads = [{el:"water",s:0,e:90},{el:"fire",s:90,e:180},{el:"earth",s:180,e:270},{el:"space",s:270,e:360}];

  const ticks = Array.from({length:72}, (_,i) => {
    const a = i * 5 * Math.PI / 180;
    const major = i%18===0, minor = i%6===0;
    const r2 = size * (major ? .47 : minor ? .476 : .481);
    return { x1:cx+size*0.495*Math.cos(a), y1:cy+size*0.495*Math.sin(a), x2:cx+r2*Math.cos(a), y2:cy+r2*Math.sin(a), major, minor };
  });

  const lPos = (s, e) => {
    const m = toRad((s+e)/2);
    return { x: cx+size*0.315*Math.cos(m), y: cy+size*0.315*Math.sin(m) };
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={size*0.498} fill="#FAFAF9" stroke="#E5E7EB" strokeWidth={0.75}/>
      <g transform={`rotate(${angle} ${cx} ${cy})`}>
        {ticks.map((t,i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.major?"#6B7280":t.minor?"#9CA3AF":"#D1D5DB"}
            strokeWidth={t.major?1.5:t.minor?0.8:0.4}/>
        ))}
      </g>
      {quads.map(q => (
        <g key={q.el}>
          <path d={arc(q.s,q.e)} fill={E[q.el].p} opacity={0.12}/>
          <path d={arc(q.s,q.e)} fill="none" stroke={E[q.el].p} strokeWidth={2.5} opacity={0.65}/>
        </g>
      ))}
      <circle cx={cx} cy={cy} r={size*0.36} fill="none" stroke="#F3F4F6" strokeWidth={0.75}/>
      <circle cx={cx} cy={cy} r={size*0.25} fill="none" stroke="#E5E7EB" strokeWidth={0.5}/>
      <circle cx={cx} cy={cy} r={size*0.15} fill="none" stroke="#F3F4F6" strokeWidth={0.5}/>
      <line x1={cx} y1={cy-size*0.35} x2={cx} y2={cy+size*0.35} stroke="#EBEBEB" strokeWidth={0.5}/>
      <line x1={cx-size*0.35} y1={cy} x2={cx+size*0.35} y2={cy} stroke="#EBEBEB" strokeWidth={0.5}/>
      {quads.map(q => { const lp = lPos(q.s,q.e); return (
        <text key={q.el} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
          fontFamily="JetBrains Mono,monospace" fontSize={size*0.043} fill={E[q.el].p} opacity={0.88} fontWeight={500} letterSpacing={0.5}>
          {q.el.toUpperCase()}
        </text>
      );})}
      <circle cx={cx} cy={cy} r={size*0.085} fill="white" stroke="#E5E7EB" strokeWidth={1}/>
      <circle cx={cx} cy={cy} r={3} fill="#1C1917"/>
      <text x={cx} y={cy-size*0.022} textAnchor="middle" dominantBaseline="middle" fontFamily="Playfair Display,serif" fontSize={size*0.05} fill="#374151" fontWeight={700}>GC</text>
      <text x={cx} y={cy+size*0.042} textAnchor="middle" dominantBaseline="middle" fontFamily="JetBrains Mono,monospace" fontSize={size*0.028} fill="#9CA3AF" letterSpacing={1}>v2.0</text>
    </svg>
  );
}

function MoatRow({ item, index }) {
  const [hov, setHov] = useState(false);
  const el = E[item.el];
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{padding:"17px 20px 17px 22px",background:"white",borderRadius:5,borderLeft:`3px solid ${hov?el.p:el.b}`,transition:"border-left-color .2s"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:5}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#9CA3AF"}}>0{index+1}</span>
        <span style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:14,color:"#1C1917"}}>{item.n}</span>
        <Chip text={el.name} element={item.el}/>
      </div>
      <div style={{paddingLeft:34,color:"#6B7280",fontSize:13,lineHeight:1.65}}>{item.d}</div>
    </div>
  );
}

export default function GeoCortex() {
  const [activeMod, setActiveMod] = useState(STACK[0]);
  const [activeDNA, setActiveDNA] = useState(null);
  const [simIdx, setSimIdx] = useState(0);

  return (
    <div style={{background:"#FAFAF9",color:"#1C1917",fontFamily:"Inter,sans-serif",overflowX:"hidden"}}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,padding:"15px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(250,250,249,0.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid #E5E7EB"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:17,letterSpacing:"-0.3px"}}>
          <span style={{color:E.space.p}}>Geo</span><span style={{color:"#1C1917"}}>Cortex</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <Dots active={null}/>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",letterSpacing:3}}>PLANETARY DECISION INTELLIGENCE</span>
        </div>
      </nav>

      {/* ══ HERO ═══════════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",paddingTop:96,paddingBottom:60,background:"linear-gradient(180deg,#FFFFFF 0%,#FAFAF9 100%)",position:"relative",overflow:"hidden"}}>
        {Object.entries(E).map(([k,el],i) => (
          <div key={k} style={{position:"absolute",width:340,height:340,borderRadius:"50%",background:`radial-gradient(circle,${el.p}07 0%,transparent 70%)`,top:`${[18,62,18,62][i]}%`,left:`${[12,12,82,82][i]}%`,transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        ))}
        <div className="gc-con" style={{position:"relative"}}>
          <Compass size={240}/>
          <div style={{height:26}}/>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,textTransform:"uppercase",color:E.space.p,display:"block",marginBottom:18}}>
            Geographic Foundation Model · v2.0
          </span>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(40px,6vw,84px)",fontWeight:900,lineHeight:1.04,letterSpacing:"-1.5px",marginBottom:20,color:"#1C1917"}}>
            The Cognitive Layer<br/><span style={{fontStyle:"italic",color:E.space.p}}>for the Physical World</span>
          </h1>
          <p style={{fontSize:"clamp(14px,1.6vw,17px)",color:"#6B7280",maxWidth:500,margin:"0 auto 28px",lineHeight:1.85}}>
            GeoCortex does not understand documents.<br/>GeoCortex does not understand images.<br/>
            <strong style={{color:"#1C1917",fontWeight:600}}>GeoCortex understands places.</strong>
          </p>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:28}}>
            {Object.entries(E).map(([k,el]) => (
              <span key={k} style={{padding:"6px 14px",borderRadius:5,background:el.lt,border:`1px solid ${el.b}`,color:el.dk,fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:1,display:"inline-flex",alignItems:"center",gap:6}}>
                <span>{el.sym}</span><strong>{el.name}</strong><span style={{opacity:0.55}}>— {el.lbl}</span>
              </span>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,opacity:0.3,marginTop:10}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:3,color:"#6B7280"}}>SCROLL</span>
            <div style={{width:1,height:26,background:"linear-gradient(to bottom,#7C3AED,transparent)"}}/>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ PROBLEM ════════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:"white"}}>
        <div className="gc-con">
          <Eye text="The Problem" element="earth"/>
          <H2>The Decision Gap</H2>
          <Lead>Every day, cities, governments, and corporations make billions of decisions affecting the physical world — with almost no real understanding of it. The result: climate damage that was avoidable, infrastructure built in the wrong place, and capital deployed where it will not survive.</Lead>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:34}}>
            {[
              {v:"5%",   l:"of Earth actively monitored in real time",         el:"water"},
              {v:"100%", l:"of decisions affect the physical world",            el:"fire"},
              {v:"$10T+",l:"in suboptimal environmental decisions annually",    el:"earth"},
              {v:"0",    l:"platforms that reason across all physical systems",  el:"space"},
            ].map(s => (
              <div key={s.v} style={{padding:"24px 20px",background:E[s.el].tint,border:`1px solid ${E[s.el].b}`,borderTop:`3px solid ${E[s.el].p}`,borderRadius:8}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:46,fontWeight:900,color:E[s.el].p,lineHeight:1,marginBottom:8}}>{s.v}</div>
                <div style={{fontSize:13,color:"#6B7280",lineHeight:1.55}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"22px 26px",background:E.earth.lt,border:`1px solid ${E.earth.b}`,borderLeft:`4px solid ${E.earth.p}`,borderRadius:8}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,marginBottom:10}}>The problem is not data. It is intelligence.</div>
            <p style={{color:"#6B7280",fontSize:13.5,lineHeight:1.85}}>Earth is already saturated with sensors, satellites, and datasets. What is missing is a cognitive layer that reasons across all of them simultaneously — understanding causation, simulating consequences, and recommending optimal decisions at any location, at any scale, for any stakeholder.</p>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ MANDATE ════════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:E.fire.tint}}>
        <div className="gc-con">
          <Eye text="Core Mandate" element="fire"/>
          <H2>Every location on Earth should become:</H2>
          <Lead>The ultimate question GeoCortex answers: <em style={{color:"#1C1917",fontStyle:"normal",fontWeight:600}}>"Given this location, what is the best decision?"</em></Lead>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {[
              {w:"Understandable",el:"water",sym:"◎",d:"Complete spatial intelligence from a single coordinate. What exists here. What defines this place across every physical, environmental, and economic dimension."},
              {w:"Explainable",   el:"earth",sym:"⟁",d:"Causal reasoning, not correlation. Why this place is the way it is — grounded in GeoGraph's 100,000+ verified scientific relationships."},
              {w:"Simulatable",   el:"space",sym:"⌀",d:"Test interventions before committing resources. Every decision pre-lived across environmental, economic, and social dimensions at any scale."},
              {w:"Optimizable",   el:"fire", sym:"◇",d:"Not just the good decision — the best decision. Ranked, justified, and financially modeled with scientific precision and full traceability."},
              {w:"Verifiable",    el:"water",sym:"⟐",d:"Did it work? Evidence-based verification of every outcome. Accountable intelligence that closes the loop between prediction and reality."},
            ].map((p,i) => (
              <div key={p.w} style={{display:"flex",alignItems:"center",gap:16,padding:"16px 20px",background:"white",border:`1px solid ${E[p.el].b}`,borderLeft:`4px solid ${E[p.el].p}`,borderRadius:8,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{width:40,height:40,flexShrink:0,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",background:E[p.el].lt,border:`1px solid ${E[p.el].b}`,fontSize:16,color:E[p.el].p}}>{p.sym}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:17,color:E[p.el].p,marginBottom:3}}>{p.w}</div>
                  <div style={{color:"#6B7280",fontSize:13,lineHeight:1.65}}>{p.d}</div>
                </div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",color:"#E5E7EB",fontSize:20,fontWeight:700,flexShrink:0}}>0{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ STACK ══════════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:"white"}}>
        <div className="gc-con">
          <Eye text="The Architecture" element="space"/>
          <H2>The GeoCortex Stack</H2>
          <Lead>Eleven interlocking intelligence systems — each element-tagged, each building on the last. Click any module to explore its full description and elemental principle.</Lead>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:22,alignItems:"start"}}>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {STACK.map(m => {
                const isA = activeMod.id===m.id, el = E[m.el];
                return (
                  <button key={m.id} className="gc-mod" onClick={()=>setActiveMod(m)}
                    style={{borderColor:isA?el.b:"#E5E7EB",background:isA?el.lt:"white",borderLeft:`${isA?4:1}px solid ${isA?el.p:"#E5E7EB"}`}}>
                    <span style={{color:el.p,fontSize:14,width:20,textAlign:"center",flexShrink:0}}>{m.sym}</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:isA?el.p:"#1C1917"}}>{m.id}</div>
                      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",letterSpacing:0.5}}>{m.sub}</div>
                    </div>
                    {isA && <div style={{width:5,height:5,borderRadius:"50%",background:el.p,flexShrink:0,boxShadow:`0 0 5px ${el.p}88`}}/>}
                  </button>
                );
              })}
            </div>
            <div key={activeMod.id} style={{position:"sticky",top:84,padding:"30px",background:"white",border:`1px solid ${E[activeMod.el].b}`,borderTop:`4px solid ${E[activeMod.el].p}`,borderRadius:10,boxShadow:"0 4px 20px rgba(0,0,0,0.06)",animation:"gc-fade .22s ease-out"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,padding:"10px 13px",background:E[activeMod.el].lt,border:`1px solid ${E[activeMod.el].b}`,borderRadius:6}}>
                <span style={{color:E[activeMod.el].p,fontSize:20}}>{activeMod.sym}</span>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:800,color:E[activeMod.el].p}}>{activeMod.id}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",letterSpacing:1,textTransform:"uppercase"}}>{activeMod.sub}</div>
                </div>
                <Chip text={E[activeMod.el].name} element={activeMod.el}/>
              </div>
              <p style={{color:"#374151",fontSize:13.5,lineHeight:1.9,marginBottom:18}}>{activeMod.desc}</p>
              <div style={{padding:"11px 13px",background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:6}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",letterSpacing:2,marginBottom:5}}>ELEMENT · PRINCIPLE</div>
                <div style={{color:E[activeMod.el].dk,fontSize:12.5}}><strong style={{fontFamily:"'Playfair Display',serif"}}>{E[activeMod.el].name}</strong> — {E[activeMod.el].lbl}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ GEODNA ═════════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:E.water.tint}}>
        <div className="gc-con">
          <Eye text="GeoDNA · Location Identity System" element="water"/>
          <H2>The Living Fingerprint of Every Place</H2>
          <Lead>Every location receives a dynamic, continuously updating profile across 9 scientific dimensions. Not a static snapshot — a living identity drawn from satellite, sensor, and environmental streams. Click any dimension to see its factors.</Lead>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8,marginBottom:18}}>
            {DNA.map(cat => {
              const el = E[cat.el], isA = activeDNA?.name===cat.name;
              return (
                <div key={cat.name} className="gc-dna" onClick={()=>setActiveDNA(isA?null:cat)}
                  style={{borderColor:isA?el.b:"#E5E7EB",background:isA?el.lt:"white"}}>
                  <div style={{width:22,height:3,background:el.p,borderRadius:2,marginBottom:8}}/>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:12,color:el.p,marginBottom:3}}>{cat.name}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF"}}>{cat.f.length} scientific factors</div>
                </div>
              );
            })}
          </div>
          {activeDNA && (
            <div style={{padding:"20px 24px",background:E[activeDNA.el].lt,border:`1px solid ${E[activeDNA.el].b}`,borderLeft:`4px solid ${E[activeDNA.el].p}`,borderRadius:8,marginBottom:28,animation:"gc-fade .2s ease-out"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:E[activeDNA.el].p,marginBottom:10,fontSize:13}}>{activeDNA.name} · Scientific Factor Registry</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {activeDNA.f.map(f => (
                  <span key={f} style={{padding:"4px 11px",borderRadius:4,background:"white",border:`1px solid ${E[activeDNA.el].b}`,color:E[activeDNA.el].dk,fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>{f}</span>
                ))}
              </div>
            </div>
          )}
          <div style={{padding:"28px",background:"white",border:"1px solid #E5E7EB",borderRadius:10,boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:E.earth.p,letterSpacing:3,marginBottom:18}}>GEOGERAPH · VERIFIED CAUSAL CASCADE · MUMBAI METROPOLITAN REGION</div>
            <div style={{display:"flex",flexDirection:"column"}}>
              {[
                {f:"Canopy Loss −23%",        d:"Ecological DNA",         el:"earth", sci:"NDVI satellite decline 2010–2023"},
                {f:"Surface Temp +1.8°C",      d:"Climate DNA",            el:"fire",  sci:"IMD station network, verified"},
                {f:"Cooling Energy Load +12%", d:"Energy DNA",             el:"fire",  sci:"MSEDCL load data, 2022"},
                {f:"Grid Stress Events ×2.4",  d:"Urban DNA → Energy DNA", el:"water", sci:"Transmission outage records"},
                {f:"Economic Loss $340M/yr",   d:"Economic DNA",           el:"space", sci:"Mumbai Economic Survey 2023"},
              ].map((item, i, arr) => (
                <div key={item.f} style={{display:"flex",flexDirection:"column"}}>
                  <div style={{display:"flex",alignItems:"center",gap:13,padding:"11px 15px",background:E[item.el].lt,border:`1px solid ${E[item.el].b}`,borderRadius:6}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:E[item.el].p,flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:E[item.el].p}}>{item.f}</div>
                      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",marginTop:1}}>{item.d}</div>
                    </div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:E[item.el].dk,textAlign:"right",maxWidth:165,lineHeight:1.4}}>{item.sci}</div>
                  </div>
                  {i<arr.length-1 && <div style={{width:1,height:12,background:`linear-gradient(to bottom,${E[item.el].b},${E[arr[i+1].el].b})`,marginLeft:21}}/>}
                </div>
              ))}
            </div>
            <p style={{marginTop:16,fontSize:12,color:"#9CA3AF",lineHeight:1.7}}>GeoGraph encodes 100,000+ relationships like this across every location on Earth. Every GeoCortex inference is grounded in verified scientific causation — not correlation. Science as infrastructure.</p>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ GEOTWIN ════════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:E.space.tint}}>
        <div className="gc-con">
          <Eye text="GeoTwin · Planetary Digital Twin Engine" element="space"/>
          <H2>Every Location. Five States of Existence.</H2>
          <Lead>GeoTwin is not a static map. Every location simultaneously exists in five distinct temporal states — enabling GeoCortex to reason across time and possibility, not just the present moment.</Lead>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
            {[
              {lbl:"Historical State",s:"01",sym:"⟵",el:"earth",d:"What this place was. Decades of baseline data encoded for calibration, trend analysis, and counterfactual learning. The foundation of prediction."},
              {lbl:"Current State",   s:"02",sym:"◎",el:"water",d:"What this place is right now. Real-time synthesis of satellite, sensor, IoT, and environmental streams with sub-24-hour refresh cycles."},
              {lbl:"Future State",    s:"03",sym:"⟶",el:"space",d:"What this place will become. Probabilistic multi-horizon forecasts across climate, energy, ecology, water, and infrastructure dimensions."},
              {lbl:"Simulated State", s:"04",sym:"⌀",el:"fire", d:"What would happen if. Counterfactual modeling of any proposed intervention before a single decision is committed. Physics-grounded consequences."},
              {lbl:"Optimal State",   s:"05",sym:"◇",el:"fire", d:"What this place should become. The highest-value achievable outcome, with the complete scientific roadmap and financial model to reach it."},
            ].map(s => (
              <div key={s.lbl} style={{display:"flex",gap:16,padding:"17px 20px",background:"white",border:`1px solid ${E[s.el].b}`,borderLeft:`4px solid ${E[s.el].p}`,borderRadius:8,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:17,color:E[s.el].p,flexShrink:0,width:26,textAlign:"center",paddingTop:2}}>{s.sym}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:E[s.el].p,marginBottom:4}}>{s.lbl}</div>
                  <div style={{color:"#6B7280",fontSize:13,lineHeight:1.65}}>{s.d}</div>
                </div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",color:"#E5E7EB",fontSize:18,fontWeight:700,flexShrink:0,alignSelf:"center"}}>{s.s}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"18px 24px",background:E.space.lt,border:`1px solid ${E.space.b}`,borderRadius:8}}>
            <p style={{color:"#374151",fontSize:14,lineHeight:1.85}}>
              <strong style={{fontFamily:"'Playfair Display',serif",color:E.space.dk}}>Counterfactual intelligence</strong> is the critical differentiator. GeoTwin shows not just what happened — but what would have happened under a different decision, letting every stakeholder learn from history they never lived.{" "}
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#9CA3AF"}}>Scale: GeoCell → Neighbourhood → District → City → River Basin → State → Nation</span>
            </p>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ BRAIN + HEART ══════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:E.fire.tint}}>
        <div className="gc-con">
          <Eye text="GeoBrain · GeoHeart" element="fire"/>
          <H2>From Understanding to Action</H2>
          <Lead>Two engines. One flow. GeoBrain makes causal sense of the world. GeoHeart decides what to do about it. Together they close the gap between knowledge and consequence.</Lead>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{padding:"28px",background:"white",border:"1px solid #BFDBFE",borderTop:"4px solid #2563EB",borderRadius:10,boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:800,color:"#2563EB",marginBottom:3}}>GeoBrain</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",letterSpacing:2,marginBottom:22}}>UNDERSTANDING ENGINE</div>
              {[
                ["What exists?",        "Complete spatial inventory at any location"],
                ["What is happening?",  "Real-time state synthesis from all streams"],
                ["Why is it happening?","Causal reasoning — mechanism, not correlation"],
                ["What will happen?",   "Multi-scenario probabilistic forecasting"],
              ].map(([q,a],i) => (
                <div key={q} style={{padding:"10px 0",borderBottom:i<3?"1px solid #F3F4F6":"none",display:"flex",justifyContent:"space-between",gap:10,alignItems:"flex-start"}}>
                  <span style={{color:"#6B7280",fontSize:12.5,fontStyle:"italic",flexShrink:0}}>{q}</span>
                  <span style={{color:"#1C1917",fontSize:11.5,textAlign:"right",lineHeight:1.4}}>{a}</span>
                </div>
              ))}
              <div style={{marginTop:18}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#2563EB",letterSpacing:2,marginBottom:8}}>12 INTELLIGENCE MODULES</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {["Climate","Water","Air","Biodiversity","Carbon","Energy","Infrastructure","Population","Economic","Sustainability","Risk","Opportunity"].map(m => (
                    <span key={m} style={{padding:"2px 8px",borderRadius:3,background:"#EFF6FF",border:"1px solid #BFDBFE",color:"#1D4ED8",fontSize:9,fontFamily:"'JetBrains Mono',monospace"}}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{padding:"28px",background:"white",border:`1px solid ${E.fire.b}`,borderTop:`4px solid ${E.fire.p}`,borderRadius:10,boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:800,color:E.fire.p,marginBottom:3}}>GeoHeart</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",letterSpacing:2,marginBottom:18}}>DECISION INTELLIGENCE ENGINE</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:E.fire.p,marginBottom:14,fontStyle:"italic"}}>The planetary executive function.</div>
              <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:18}}>
                {["Solution Design","Scenario Generation","Intervention Optimisation","Cost-Benefit Analysis","Tradeoff Analysis","Priority Ranking","Policy Analysis","Roadmap Creation"].map(c => (
                  <div key={c} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#374151"}}>
                    <div style={{width:4,height:4,borderRadius:"50%",background:E.fire.p,flexShrink:0}}/>{c}
                  </div>
                ))}
              </div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:E.fire.p,letterSpacing:2,marginBottom:8}}>OUTPUTS</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {["Recommendations","Roadmaps","Financial Models","Impact Assessments"].map(o => (
                  <span key={o} style={{padding:"4px 10px",borderRadius:4,background:E.fire.lt,border:`1px solid ${E.fire.b}`,color:E.fire.dk,fontSize:10,fontFamily:"'JetBrains Mono',monospace"}}>{o}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ GEOSIM ═════════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:"white"}}>
        <div className="gc-con">
          <Eye text="GeoSim · Simulation Engine" element="earth"/>
          <H2><em style={{fontStyle:"italic"}}>What happens if?</em></H2>
          <Lead>The world's only consequence engine for physical decisions. Before a single resource is committed, GeoSim models every downstream effect — environmental, economic, energy, and social — at any scale. Physics-grounded, not statistical.</Lead>
          <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>
            {SIMS.map((s,i) => (
              <button key={i} className="gc-sim-tab" onClick={()=>setSimIdx(i)}
                style={{borderColor:simIdx===i?E.earth.b:"#E5E7EB",background:simIdx===i?E.earth.lt:"white",color:simIdx===i?E.earth.dk:"#6B7280"}}>{s.lbl}</button>
            ))}
          </div>
          <div style={{padding:"26px",background:"white",border:"1px solid #E5E7EB",borderRadius:10,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:E.earth.p,letterSpacing:3,marginBottom:12}}>SCENARIO INPUT · PHYSICS-GROUNDED</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,marginBottom:22,color:"#1C1917",fontStyle:"italic"}}>"{SIMS[simIdx].prompt}"</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:E.water.p,letterSpacing:3,marginBottom:11}}>COMPUTED OUTPUTS · CONFIDENCE-WEIGHTED</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(168px,1fr))",gap:10,marginBottom:16}}>
              {SIMS[simIdx].outs.map((o,i) => (
                <div key={i} style={{padding:"13px 15px",background:E.earth.lt,border:`1px solid ${E.earth.b}`,borderRadius:7}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:800,color:E.earth.p,lineHeight:1,marginBottom:4}}>{o.v}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6B7280",lineHeight:1.4}}>{o.l}</div>
                </div>
              ))}
            </div>
            <div style={{padding:"9px 12px",background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:5,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",letterSpacing:2,flexShrink:0}}>MODELS ACTIVATED</span>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {["Climate","Hydrology","Energy","Economic","Social"].map(m => (
                  <span key={m} style={{padding:"2px 8px",borderRadius:3,background:"white",border:"1px solid #E5E7EB",color:"#6B7280",fontSize:9,fontFamily:"'JetBrains Mono',monospace"}}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ TRUST + MEMORY ═════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:E.water.tint}}>
        <div className="gc-con">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
            <div>
              <Eye text="GeoTrust · Scientific Trust" element="water"/>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,2.4vw,32px)",fontWeight:800,marginBottom:12,lineHeight:1.15}}>Explainable by Design</h2>
              <p style={{color:"#6B7280",fontSize:13,lineHeight:1.8,marginBottom:22}}>Every output carries a full scientific provenance chain — not just a number, but the evidence, reasoning, and uncertainty that produced it. Auditable by governments. Defensible in policy.</p>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {[
                  ["Evidence",               "Primary sources & peer-reviewed references"],
                  ["Scientific Basis",       "Validated methodology for every claim"],
                  ["Assumptions",            "Explicit, documented, auditable"],
                  ["Confidence Score",       "Calibrated certainty on every output"],
                  ["Uncertainty Range",      "Probabilistic bounds, not hidden assumptions"],
                  ["Alternative Strategies", "Competing approaches, ranked objectively"],
                  ["Verification Method",    "How to confirm outcomes post-intervention"],
                ].map(([l,d]) => (
                  <div key={l} style={{display:"flex",justifyContent:"space-between",gap:10,padding:"9px 12px",background:"white",border:`1px solid ${E.water.b}`,borderRadius:5}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:E.water.p,fontSize:12,flexShrink:0}}>{l}</span>
                    <span style={{color:"#6B7280",fontSize:11,textAlign:"right"}}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eye text="GeoMemory · Compounding Intelligence" element="earth"/>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,2.4vw,32px)",fontWeight:800,marginBottom:12,lineHeight:1.15}}>Intelligence That Compounds</h2>
              <p style={{color:"#6B7280",fontSize:13,lineHeight:1.8,marginBottom:22}}>GeoCortex never forgets. Every intervention and its measured outcome becomes permanent knowledge — improving every future recommendation globally. The only self-reinforcing intelligence advantage at planetary scale.</p>
              <div style={{padding:"18px",background:"white",border:`1px solid ${E.earth.b}`,borderRadius:8,marginBottom:12}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:E.earth.p,letterSpacing:2,marginBottom:12}}>COOL ROOF PROGRAMME · VERIFIED OUTCOMES</div>
                {[
                  {city:"Ahmedabad",delta:"−1.9°C",n:14200,yr:"2022"},
                  {city:"Pune",     delta:"−1.7°C",n:9800, yr:"2022"},
                  {city:"Surat",    delta:"−1.5°C",n:6400, yr:"2023"},
                ].map(item => (
                  <div key={item.city} style={{display:"flex",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #F3F4F6",gap:8}}>
                    <span style={{color:"#374151",flex:1,fontSize:13,fontWeight:500}}>{item.city}</span>
                    <span style={{fontFamily:"'Playfair Display',serif",color:E.earth.p,fontWeight:800,fontSize:16}}>{item.delta}</span>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF"}}>{item.n.toLocaleString()} roofs</span>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#15803D"}}>✓ {item.yr}</span>
                  </div>
                ))}
              </div>
              <div style={{padding:"12px 14px",background:E.earth.lt,border:`1px solid ${E.earth.b}`,borderRadius:7}}>
                <p style={{fontSize:12,color:"#6B7280",lineHeight:1.75,fontStyle:"italic"}}>GeoMemory turns every city into a controlled experiment. The aggregate becomes the world's only verified database of what environmental interventions actually achieve — at planetary scale, permanently.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ GEOAGENT ═══════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:E.space.tint}}>
        <div className="gc-con">
          <Eye text="GeoAgent · Multi-Agent Expert Council" element="space"/>
          <H2>Not One AI. A Council of Ten.</H2>
          <Lead>Before GeoCortex makes a recommendation, ten independent domain expert agents deliberate — challenging assumptions, stress-testing proposals, and surfacing tradeoffs that no single model could detect.</Lead>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(186px,1fr))",gap:8,marginBottom:20}}>
            {AGENTS.map(a => (
              <div key={a.t} className="gc-agent">
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
                  <span style={{fontSize:17}}>{a.sym}</span>
                  <div style={{width:5,height:5,borderRadius:"50%",background:E[a.el].p}}/>
                </div>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:12,marginBottom:4,color:"#1C1917"}}>{a.t}</div>
                <div style={{fontSize:10.5,color:"#9CA3AF",lineHeight:1.5}}>{a.f}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"20px 24px",background:E.space.lt,border:`1px solid ${E.space.b}`,borderRadius:8}}>
            <p style={{color:"#374151",fontSize:14,lineHeight:1.85}}>
              <strong style={{fontFamily:"'Playfair Display',serif",color:E.space.dk}}>Adversarial validation</strong> is architecturally built in. Agents debate before they recommend. Contradictions surface tradeoffs. Dissent is preserved in outputs — decision-makers understand not just what GeoCortex recommends, but what it chose not to recommend, and exactly why.
            </p>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ THE MOAT ═══════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:"white"}}>
        <div className="gc-con">
          <Eye text="Competitive Position" element="earth"/>
          <H2>The Ultimate Moat</H2>
          <Lead>Not AI. Not maps. Not dashboards. The moat is a compounding, self-reinforcing intelligence infrastructure that deepens with every decision made on the platform.</Lead>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:28}}>
            {MOAT.map((m,i) => <MoatRow key={m.n} item={m} index={i}/>)}
          </div>
          <div style={{padding:"22px 26px",background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:8}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:E.earth.p,letterSpacing:3,marginBottom:12}}>THE COMPOUNDING FLYWHEEL</div>
            <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:12}}>
              {["More Decisions","→","GeoMemory Grows","→","GeoGraph Deepens","→","GeoFM Sharpens","→","Better Recommendations","→","More Decisions"].map((item,i) => (
                item==="→"
                  ? <span key={i} style={{color:"#D1D5DB",fontSize:16}}>→</span>
                  : <span key={i} style={{padding:"5px 12px",borderRadius:5,background:"white",border:"1px solid #E5E7EB",color:"#374151",fontSize:12,fontWeight:500}}>{item}</span>
              ))}
            </div>
            <p style={{fontSize:12,color:"#9CA3AF",textAlign:"center",lineHeight:1.6}}>This feedback loop continuously accelerates the intelligence gap between GeoCortex and any potential competitor.</p>
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ USER LAYERS ════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:E.fire.tint}}>
        <div className="gc-con">
          <Eye text="User Ecosystem" element="fire"/>
          <H2>One Platform. Every Stakeholder.</H2>
          <Lead>Six user layers receive the same underlying intelligence, rendered at the appropriate depth and format for each role — from citizen to sovereign AI system.</Lead>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(272px,1fr))",gap:12}}>
            {USERS.map(l => (
              <div key={l.r} style={{padding:"20px",background:"white",borderRadius:8,border:`1px solid ${E[l.el].b}`,borderTop:`4px solid ${E[l.el].p}`,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:15,color:E[l.el].p}}>{l.r} Layer</div>
                  <Dots active={l.el}/>
                </div>
                <div style={{fontSize:12,color:"#6B7280",marginBottom:13,lineHeight:1.6}}>{l.d}</div>
                <div style={{padding:"9px 12px",background:E[l.el].lt,border:`1px solid ${E[l.el].b}`,borderRadius:5}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:E[l.el].p,letterSpacing:2,marginBottom:4}}>EXAMPLE QUERY</div>
                  <div style={{fontSize:11.5,color:"#6B7280",fontStyle:"italic",lineHeight:1.55}}>"{l.eg}"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ GEOAPPS ════════════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:"white"}}>
        <div className="gc-con">
          <Eye text="GeoApps Ecosystem" element="fire"/>
          <H2>Twelve Vertical Intelligence Applications</H2>
          <Lead>Purpose-built intelligence for every domain where physical decisions are made — each application built on the full GeoCortex platform.</Lead>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8}}>
            {APPS.map(a => (
              <div key={a.n} className="gc-app">
                <div style={{fontSize:20,marginBottom:7}}>{a.sym}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:E[a.el].p,marginBottom:3}}>{a.n}</div>
                <div style={{fontSize:10.5,color:"#9CA3AF",lineHeight:1.4}}>{a.d}</div>
                <div style={{marginTop:8,display:"flex",justifyContent:"center"}}><div style={{width:4,height:4,borderRadius:"50%",background:E[a.el].p}}/></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ BUSINESS MODEL ═════════════════════════════════════════════════════════ */}
      <section className="gc-sec" style={{background:E.space.tint}}>
        <div className="gc-con">
          <Eye text="Business Model" element="space"/>
          <H2>Four Revenue Streams</H2>
          <Lead>Each monetisation layer reinforces the others — and every transaction deepens the data flywheel. Every sale is a data event. Every data event deepens the moat.</Lead>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(224px,1fr))",gap:12}}>
            {[
              {n:"GeoAPI",        t:"Platform Revenue",    el:"space",d:"Usage-based API access for developers, businesses, and AI systems requiring location intelligence at scale. Machine-consumable decision intelligence."},
              {n:"GeoEnterprise", t:"SaaS Subscriptions",  el:"water",d:"Full-platform access for corporations, cities, and agencies requiring operational decision intelligence with custom integrations."},
              {n:"GeoSovereign",  t:"National Contracts",   el:"earth",d:"Strategic intelligence infrastructure contracts with national governments and sovereign planning agencies."},
              {n:"GeoVerify",     t:"Verification Services",el:"fire", d:"Third-party outcome verification for carbon credits, ESG commitments, and climate treaty compliance — the planetary accountability layer."},
            ].map(s => (
              <div key={s.n} style={{padding:"24px 20px",background:"white",border:`1px solid ${E[s.el].b}`,borderTop:`4px solid ${E[s.el].p}`,borderRadius:9,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:E[s.el].p,letterSpacing:3,marginBottom:8,textTransform:"uppercase"}}>{s.t}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:800,color:E[s.el].p,marginBottom:9}}>{s.n}</div>
                <div style={{fontSize:12,color:"#6B7280",lineHeight:1.7}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* ══ CLOSING ════════════════════════════════════════════════════════════════ */}
      <section style={{minHeight:"82vh",display:"flex",alignItems:"center",paddingTop:96,paddingBottom:96,background:"linear-gradient(180deg,#FAFAF9 0%,#FFFFFF 100%)",position:"relative",overflow:"hidden"}}>
        {Object.entries(E).map(([k,el],i) => (
          <div key={k} style={{position:"absolute",width:420,height:420,borderRadius:"50%",background:`radial-gradient(circle,${el.p}05 0%,transparent 70%)`,top:`${[15,65,65,15][i]}%`,left:`${[10,10,84,84][i]}%`,transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        ))}
        <div className="gc-con" style={{textAlign:"center",position:"relative"}}>
          <Eye text="The Mission" element="space"/>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3.8vw,52px)",fontWeight:900,lineHeight:1.15,maxWidth:900,margin:"0 auto 22px",color:"#1C1917"}}>
            The question is no longer what is happening to Earth.<br/>
            <span style={{color:"#9CA3AF"}}>The question is </span>
            <span style={{fontStyle:"italic",color:E.space.p}}>what we choose to do about it.</span>
          </h2>
          <p style={{fontSize:15,color:"#6B7280",maxWidth:620,margin:"0 auto 40px",lineHeight:1.85}}>
            GeoCortex is the decision intelligence infrastructure for a world that can no longer afford to act without understanding consequences. Not a product — a planetary nervous system. Understandable. Explainable. Simulatable. Optimisable. Verifiable.
          </p>
          <div style={{display:"flex",gap:11,justifyContent:"center",flexWrap:"wrap",marginBottom:40}}>
            {[
              {el:"space",v:"1B+",   l:"GeoCells Monitored"},
              {el:"earth",v:"100K+", l:"Causal Relationships"},
              {el:"water",v:"9",     l:"DNA Dimensions"},
              {el:"fire", v:"12",    l:"GeoApps Deployed"},
            ].map(s => (
              <div key={s.v} style={{padding:"16px 20px",minWidth:128,background:"white",border:`1px solid ${E[s.el].b}`,borderTop:`3px solid ${E[s.el].p}`,borderRadius:8,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:26,color:E[s.el].p,marginBottom:4}}>{s.v}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#9CA3AF",letterSpacing:1.5,lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:7,justifyContent:"center",flexWrap:"wrap"}}>
            {Object.entries(E).map(([k,el]) => (
              <div key={k} style={{padding:"8px 16px",borderRadius:6,background:el.lt,border:`1px solid ${el.b}`,display:"inline-flex",alignItems:"center",gap:7}}>
                <span style={{color:el.p,fontSize:11}}>{el.sym}</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:el.dk,fontSize:12}}>{el.name}</span>
                <span style={{color:el.dk,fontSize:10,opacity:0.45}}>·</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:el.dk,opacity:0.72,letterSpacing:0.5}}>{el.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Spectrum/>

      {/* FOOTER */}
      <footer style={{padding:"26px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,background:"#FAFAF9"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:16}}>
          <span style={{color:E.space.p}}>Geo</span><span style={{color:"#1C1917"}}>Cortex</span>
        </div>
        <Dots active={null}/>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#D1D5DB",letterSpacing:2}}>
          PLANETARY DECISION INTELLIGENCE · EVERY LOCATION · EVERYWHERE · ALWAYS
        </div>
      </footer>
    </div>
  );
}
