const { useState, useMemo } = React;
const { motion } = window.FramerMotion;

// ——— Simple replacements for your UI components ———
function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>;
}
function Card({ children }) {
  return <div className="card">{children}</div>;
}
function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

// ——— Sample data ———
const HUBS = [
  {
    id: "nebula",
    name: "Nebula Hub",
    tagline: "Lightweight, fast, and game‑aware script hub.",
    description: "Nebula auto-detects games, clean UI, safe toggles.",
    features: ["Auto-detect", "ESP", "Auto-farm"],
    games: ["Blox Fruits", "Arsenal"],
    stars: 4.8,
  },
  {
    id: "aurora",
    name: "Aurora Suite",
    tagline: "Polished UI with per-game modules.",
    description: "Cloud configs, keybinds, rate-limited requests.",
    features: ["Cloud configs", "Rate limiting", "Theming"],
    games: ["Doors", "Bee Swarm"],
    stars: 4.6,
  },
];

// ——— Utility ———
function formatNumber(n) { return n.toLocaleString(); }

// ——— Preview component ———
function Preview({ hub }) {
  return (
    <div className="preview">
      <h3>{hub.name}</h3>
      <p>{hub.tagline}</p>
      <div>
        {hub.features.map(f => <Badge key={f}>{f}</Badge>)}
      </div>
    </div>
  );
}

// ——— Main Portfolio ———
function Portfolio() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const allTags = useMemo(() => {
    const s = new Set(["all"]);
    HUBS.forEach(h => h.games.forEach(g => s.add(g)));
    return Array.from(s);
  }, []);

  const filtered = useMemo(() => {
    return HUBS.filter(h => {
      const text = (h.name + h.tagline + h.description + h.games.join(" ")).toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const matchesTag = activeTag === "all" || h.games.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div style={{ padding: "16px" }}>
      <h1>Hexinova’s Script Hubs</h1>

      {/* Search */}
      <input 
        type="text" 
        placeholder="Search hubs…" 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        style={{ padding: "8px", marginBottom: "12px", width: "100%" }}
      />

      {/* Tags */}
      <div style={{ marginBottom: "12px" }}>
        {allTags.map(t => (
          <Button key={t} onClick={() => setActiveTag(t)}>{t}</Button>
        ))}
      </div>

      {/* Preview of first hub */}
      {filtered[0] && <Preview hub={filtered[0]} />}

      {/* Hub list */}
      {filtered.map(hub => (
        <Card key={hub.id}>
          <h3>{hub.name}</h3>
          <p>{hub.tagline}</p>
          <div>
            {hub.features.map(f => <Badge key={f}>{f}</Badge>)}
          </div>
          <p>Games: {hub.games.join(", ")}</p>
          <p>Stars: {hub.stars}</p>
        </Card>
      ))}
    </div>
  );
}

// ——— Render ———
ReactDOM.createRoot(document.getElementById("root")).render(<Portfolio />);
