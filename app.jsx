// app.jsx — self-contained browser-friendly rewrite of your file
const { useState, useMemo } = React;
const { motion } = window.FramerMotion || { motion: null };

// ————————————————————————
// Editable data (fixed a typo in docs)
const SOCIALS = [
  { name: "GitHub", url: "https://github.com/Hexinova", icon: "🐙" },
  { name: "Discord", url: "https://discord.gg/xEYt9gv6Kg", icon: "✉️" },
  { name: "Website", url: "https://hexinova.github.io", icon: "🔗" },
];

const HUBS = [
  {
    id: "nebula",
    name: "Nebula Hub",
    tagline: "Lightweight, fast, and game-aware script hub.",
    description:
      "Nebula auto-detects supported games, exposes a clean UI, and ships with safe toggles & anti-ban optimizations.",
    script: `loadstring(game:HttpGet("https://hexinova.github.io"))()`,
    features: ["Game auto-detect", "ESP + Aimbot (legit)", "Auto-farm presets", "FPS friendly"],
    games: ["Blox Fruits", "Arsenal", "MM2", "BedWars"],
    stars: 4.8,
    installs: 18200,
    updated: "2025-08-10",
    repo: "https://hexinova.github.io",
    docs: "https://hexinova.github.io",
  },
  {
    id: "aurora",
    name: "Aurora Suite",
    tagline: "Polished UI with per-game modules and cloud configs.",
    description:
      "Aurora focuses on reliability: version-locked modules, rate-limited requests, and profile-based presets you can share.",
    script: `loadstring(game:HttpGet("https://hexinova.github.io"))()`,
    features: ["Cloud configs", "Rate limiting", "Keybind manager", "Theming"],
    games: ["Doors", "Bee Swarm", "Blade Ball"],
    stars: 4.6,
    installs: 13650,
    updated: "2025-07-29",
    repo: "https://hexinova.github.io",
    docs: "https://hexinova.github.io",
  },
  {
    id: "quantum",
    name: "Quantum X",
    tagline: "Performance-first utilities with a developer console.",
    description:
      "Quantum X includes a tiny event bus, debug overlay, and a safe executor shim for vendors with weird APIs.",
    script: `loadstring(game:HttpGet("https://hexinova.github.io"))()`,
    features: ["Debug overlay", "Event bus", "Teleport chain", "Safe waits"],
    games: ["Phantom Forces", "Piggy"],
    stars: 4.4,
    installs: 9200,
    updated: "2025-08-03",
    repo: "https://hexinova.github.io",
    docs: "https://hexinova.github.io",
  },
];

// ————————————————————————
// Small UI primitives (replace shadcn/ui)
function Button({ children, onClick, className = "", as = "button", href, target }) {
  if (as === "a") {
    return <a className={"btn " + className} href={href} target={target} rel="noreferrer">{children}</a>;
  }
  return <button className={"btn " + className} onClick={onClick}>{children}</button>;
}
function Card({ children }) { return <div className="card">{children}</div>; }
function Badge({ children }) { return <span className="badge">{children}</span>; }
function CodeBlock({ code }) {
  return (
    <pre style={{whiteSpace:"pre-wrap",fontSize:13,marginTop:8,background:"rgba(0,0,0,0.15)",padding:8,borderRadius:8}}><code>{code}</code></pre>
  );
}

// ————————————————————————
// Utilities
function formatNumber(n){ return n.toLocaleString(); }
function copy(text){ navigator.clipboard?.writeText(text).catch(()=>{}); }

// ————————————————————————
// Small visual icon substitute (simple inline svgs or emoji)
function Icon({ name }) {
  const map = {
    sparkles: "✨", rocket: "🚀", info: "ℹ️", copy: "📋", star: "⭐", terminal: "🖥️", download: "⬇️"
  };
  return <span style={{marginRight:8}}>{map[name] ?? "•"}</span>;
}

// ————————————————————————
// Preview panel (animated if framer-motion is available)
function ShowcasePanel({ hub }) {
  const inner = (
    <div className="preview">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h3 style={{margin:0}}>{hub.name}</h3>
          <div style={{color:"#9aa6c2",fontSize:13}}>{hub.tagline}</div>
        </div>
        <div style={{textAlign:"right"}}><Badge>{hub.updated}</Badge></div>
      </div>
      <div style={{marginTop:10}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {hub.features.slice(0,3).map(f => <Badge key={f}>{f}</Badge>)}
          {hub.features.length>3 && <Badge>+{hub.features.length-3} more</Badge>}
        </div>
        <div style={{marginTop:8}}><CodeBlock code={hub.script} /></div>
        <div style={{marginTop:8,display:"flex",gap:8}}>
          <Button className="ghost" onClick={() => copy(hub.script)}><Icon name="copy"/>Copy</Button>
          <Button as="a" href={hub.repo} target="_blank" className="ghost"><Icon name="info" />Repo</Button>
        </div>
      </div>
    </div>
  );

  if (motion && motion.div) {
    return (
      <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.45}}>
        {inner}
      </motion.div>
    );
  }
  return inner;
}

// ————————————————————————
// Main app
function Portfolio(){
  const [query,setQuery] = useState("");
  const [activeTag,setActiveTag] = useState("all");
  const [openHub,setOpenHub] = useState(null);

  const allTags = useMemo(()=>{
    const s = new Set(["all"]);
    HUBS.forEach(h => h.games.forEach(g => s.add(g)));
    return Array.from(s);
  },[]);

  const filtered = useMemo(()=>{
    return HUBS.filter(hub => {
      const text = (hub.name + hub.tagline + hub.description + hub.games.join(" ")).toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const matchesTag = activeTag === "all" || hub.games.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  },[query,activeTag]);

  return (
    <div className="container">
      <header>
        <div className="brand">
          <div className="logo">hx</div>
          <div>
            <h1>hexinova’s Script Hubs</h1>
            <div style={{color:"#9aa6c2",fontSize:13}}>Built for speed, stability, and style.</div>
          </div>
        </div>
        <nav style={{display:"flex",gap:8}}>
          {SOCIALS.map(s=>(
            <Button key={s.name} as="a" href={s.url} target="_blank" className="ghost">{s.icon} {s.name}</Button>
          ))}
        </nav>
      </header>

      <main>
        <section className="controls">
          <input type="text" placeholder="Search hubs, games, features…" value={query} onChange={(e)=>setQuery(e.target.value)} />
          <div style={{flex:1}} />
          <div className="tags" aria-hidden>
            {allTags.slice(0,6).map(t => (
              <Button key={t} className={activeTag===t?"":"ghost"} onClick={()=>setActiveTag(t)}>{t}</Button>
            ))}
          </div>
        </section>

        {/* Preview */}
        {filtered[0] ? <ShowcasePanel hub={filtered[0]} /> : <div style={{color:"#9aa6c2"}}>No hubs match your search</div>}

        {/* Grid */}
        <section id="hubs" className="grid" style={{marginTop:16}}>
          {filtered.map((hub,i)=>(
            <div key={hub.id}>
              <Card>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"start"}}>
                  <div>
                    <h3>{hub.name}</h3>
                    <div style={{color:"#9aa6c2",fontSize:13}}>{hub.tagline}</div>
                  </div>
                  <div><Badge>{hub.updated}</Badge></div>
                </div>

                <p style={{color:"#9aa6c2",fontSize:13,marginTop:8}}>{hub.description}</p>

                <div style={{marginTop:10,display:"flex",flexWrap:"wrap",gap:6}}>
                  {hub.features.slice(0,3).map(f => <Badge key={f}>{f}</Badge>)}
                  {hub.features.length>3 && <Badge>+{hub.features.length-3} more</Badge>}
                </div>

                <div style={{marginTop:10}}>
                  <div style={{fontFamily:"monospace",fontSize:13,background:"rgba(0,0,0,0.12)",padding:8,borderRadius:8}}>{hub.script}</div>
                </div>

                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {hub.games.map(g=> <Badge key={g}>{g}</Badge>)}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <Button className="ghost" onClick={()=>copy(hub.script)}><Icon name="copy"/></Button>
                    <Button onClick={()=>setOpenHub(hub)}>Details</Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        <footer>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div>© {new Date().getFullYear()} hexinova • Built with ♥</div>
            <div style={{display:"flex",gap:8}}>{SOCIALS.map(s=><a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{color:"#9aa6c2",textDecoration:"none"}}>{s.icon} {s.name}</a>)}</div>
          </div>
          <div className="meta">This demo runs entirely in the browser (no build step). For production, use a bundler like Vite.</div>
        </footer>
      </main>

      {/* Simple details dialog */}
      {openHub && (
        <div style={{
          position:"fixed",inset:0,display:"grid",placeItems:"center",background:"rgba(0,0,0,0.5)"
        }} onClick={()=>setOpenHub(null)}>
          <div style={{width:"min(900px,95%)"}} onClick={(e)=>e.stopPropagation()}>
            <div className="card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h3 style={{margin:0}}>{openHub.name}</h3>
                <div style={{display:"flex",gap:8}}>
                  <Button className="ghost" onClick={()=>copy(openHub.script)}>Copy</Button>
                  <Button className="ghost" as="a" href={openHub.repo} target="_blank">Repo</Button>
                  <Button onClick={()=>setOpenHub(null)}>Close</Button>
                </div>
              </div>
              <p style={{color:"#9aa6c2",marginTop:10}}>{openHub.description}</p>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
                <div>
                  <h4 style={{margin:"0 0 8px 0"}}>Features</h4>
                  <div style={{display:"grid",gap:8}}>
                    {openHub.features.map(f => <div key={f} style={{background:"rgba(255,255,255,0.03)",padding:8,borderRadius:8}}>{f}</div>)}
                  </div>
                </div>

                <div>
                  <h4 style={{margin:"0 0 8px 0"}}>Supported</h4>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {openHub.games.map(g=> <Badge key={g}>{g}</Badge>)}
                  </div>

                  <h4 style={{margin:"10px 0 8px 0"}}>Script</h4>
                  <CodeBlock code={openHub.script} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Render
ReactDOM.createRoot(document.getElementById("root")).render(<Portfolio />);
