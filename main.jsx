import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Github, Link2, Search, Sparkles, Star, Gamepad2, TerminalSquare, Send, ShieldCheck, Rocket, Download, Info, X } from "lucide-react";

// ——————————————————————————————————————————————
// ✨ Editable data — drop in your hubs and links here
// ——————————————————————————————————————————————
const SOCIALS = [
  { name: "GitHub", icon: Github, url: "https://github.com/Hexinova" },
  { name: "Discord", icon: Send, url: "https://discord.gg/xEYt9gv6Kg" },
  { name: "Website", icon: Link2, url: "https://hexinova.github.io" },
];

const HUBS = [
  {
    id: "nebula",
    name: "Nebula Hub",
    tagline: "Lightweight, fast, and game‑aware script hub.",
    description:
      "Nebula auto-detects supported games, exposes a clean UI, and ships with safe toggles & anti‑ban optimizations.",
    script: `loadstring(game:HttpGet("https://hexinova.github.io"))()`, // change this later
    features: ["Game auto-detect", "ESP + Aimbot (legit)", "Auto‑farm presets", "FPS friendly"],
    games: ["Blox Fruits", "Arsenal", "MM2", "BedWars"],
    stars: 4.8,
    installs: 18200,
    updated: "2025‑08‑10",
    repo: "https://hexinova.github.io", // change this later
    docs: ""https://hexinova.github.io", // change this later
  },
  {
    id: "aurora",
    name: "Aurora Suite",
    tagline: "Polished UI with per‑game modules and cloud configs.",
    description:
      "Aurora focuses on reliability: version‑locked modules, rate‑limited requests, and profile‑based presets you can share.",
    script: `loadstring(game:HttpGet("https://hexinova.github.io"))()`, // change this later
    features: ["Cloud configs", "Rate limiting", "Keybind manager", "Theming"],
    games: ["Doors", "Bee Swarm", "Blade Ball"],
    stars: 4.6,
    installs: 13650,
    updated: "2025‑07‑29",
    repo: "https://hexinova.github.io", // change this later
    docs: "https://hexinova.github.io", // change this later
  },
  {
    id: "quantum",
    name: "Quantum X",
    tagline: "Performance‑first utilities with a developer console.",
    description:
      "Quantum X includes a tiny event bus, debug overlay, and a safe executor shim for vendors with weird APIs.",
    script: `loadstring(game:HttpGet("https://hexinova.github.io"))()`, // change this later
    features: ["Debug overlay", "Event bus", "Teleport chain", "Safe waits"],
    games: ["Phantom Forces", "Piggy"],
    stars: 4.4,
    installs: 9200,
    updated: "2025‑08‑03",
    repo: "https://hexinova.github.io", // change this later
    docs: "https://hexinova.github.io", // change this later
  },
];

// ——————————————————————————————————————————————
// Utility helpers
// ——————————————————————————————————————————————
function formatNumber(n) {
  return n.toLocaleString();
}

function copy(text) {
  navigator.clipboard.writeText(text);
}

// ——————————————————————————————————————————————
// Main page
// ——————————————————————————————————————————————
export default function Portfolio() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [openHub, setOpenHub] = useState(null);
  const allTags = useMemo(() => {
    const s = new Set(["all"]);
    HUBS.forEach(h => h.games.forEach(g => s.add(g)));
    return Array.from(s);
  }, []);

  const filtered = useMemo(() => {
    return HUBS.filter(hub => {
      const text = (hub.name + hub.tagline + hub.description + hub.games.join(" ")).toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const matchesTag = activeTag === "all" || hub.games.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Hero />
          <Controls
            query={query}
            setQuery={setQuery}
            tags={allTags}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
          <HubGrid hubs={filtered} setOpenHub={setOpenHub} />
          <CTA />
        </main>
        <Footer />
        <HubDialog hub={openHub} onClose={() => setOpenHub(null)} />
      </div>
    </TooltipProvider>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 grid place-items-center rounded-xl bg-white/10">
            <Sparkles className="size-4" />
          </div>
          <span className="font-semibold tracking-wide">hexinova’s Script Hubs</span>
        </div>
        <nav className="hidden sm:flex items-center gap-2">
          {SOCIALS.map((s) => (
            <Button key={s.name} asChild variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <a href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <s.icon className="size-4" /> {s.name}
              </a>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="py-14">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Roblox Script Hubs
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400">
              Built for speed, stability, and style.
            </span>
          </h1>
          <p className="mt-4 text-slate-300 leading-relaxed">
            A curated set of hubs and utilities I maintain. Clean code, safe waits, and smooth UI.
            Explore modules, copy the loader, and plug into your workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-2xl">
              <Rocket className="mr-2 size-4" /> Get Started
            </Button>
            <Button variant="secondary" className="rounded-2xl" asChild>
              <a href="#hubs">Browse Hubs</a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <Badge variant="secondary" className="gap-1"><ShieldCheck className="size-3"/> Safe waits & rate limits</Badge>
            <Badge variant="secondary" className="gap-1"><Gamepad2 className="size-3"/> {HUBS.reduce((a,h)=>a+h.games.length,0)} game targets</Badge>
            <Badge variant="secondary" className="gap-1"><Star className="size-3"/> {HUBS.reduce((a,h)=>a+h.stars,0).toFixed(1)} avg rating sum</Badge>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <ShowcasePanel />
        </motion.div>
      </div>
    </section>
  );
}

function ShowcasePanel() {
  return (
    <div className="relative rounded-3xl p-1 bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/40 to-pink-500/40">
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6">
        <Tabs defaultValue="loader">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="loader" className="text-sm">Loader</TabsTrigger>
            <TabsTrigger value="features" className="text-sm">Features</TabsTrigger>
            <TabsTrigger value="notes" className="text-sm">Release Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="loader" className="mt-4">
            <CodeBlock label="One‑line loader" code={`loadstring(game:HttpGet("https://cdn.yourdomain.dev/loader.lua"))()`} />
            <div className="mt-3 flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="rounded-2xl" onClick={() => copy(`loadstring(game:HttpGet("https://cdn.yourdomain.dev/loader.lua"))()`)}>
                    <Copy className="mr-2 size-4"/> Copy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy loader to clipboard</TooltipContent>
              </Tooltip>
              <Button variant="ghost" className="rounded-2xl" asChild>
                <a href="#hubs"><Info className="mr-2 size-4"/> How it works</a>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <li className="rounded-xl border border-white/10 p-3 bg-white/5">Smart game detection & module routing</li>
              <li className="rounded-xl border border-white/10 p-3 bg-white/5">Optimized loops with safe yields</li>
              <li className="rounded-xl border border-white/10 p-3 bg-white/5">Rate‑limited network helpers</li>
              <li className="rounded-xl border border-white/10 p-3 bg-white/5">Themeable UI + keybind manager</li>
            </ul>
          </TabsContent>
          <TabsContent value="notes" className="mt-4 text-sm text-slate-300">
            <p>v2.4 • Added cloud configs, fixed latency spikes, improved BedWars pathing.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Controls({ query, setQuery, tags, activeTag, setActiveTag }) {
  return (
    <section className="py-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex-1 flex items-center gap-2">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hubs, games, features…"
              className="pl-9 bg-white/5 border-white/10"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={activeTag === t ? "default" : "secondary"}
              className="rounded-2xl"
              onClick={() => setActiveTag(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HubGrid({ hubs, setOpenHub }) {
  return (
    <section id="hubs" className="py-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hubs.map((hub, i) => (
          <motion.div key={hub.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TerminalSquare className="size-5" /> {hub.name}
                    </CardTitle>
                    <p className="text-sm text-slate-300 mt-1">{hub.tagline}</p>
                  </div>
                  <Badge className="rounded-xl" variant="secondary">{hub.updated}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300 leading-relaxed">{hub.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {hub.features.slice(0, 3).map((f) => (
                    <Badge key={f} variant="secondary">{f}</Badge>
                  ))}
                  {hub.features.length > 3 && (
                    <Badge variant="outline">+{hub.features.length - 3} more</Badge>
                  )}
                </div>
                <div className="mt-4">
                  <CodeInline code={hub.script} />
                </div>
                <div className="mt-4 text-xs text-slate-400 flex items-center gap-4">
                  <span className="flex items-center gap-1"><Star className="size-4"/> {hub.stars}</span>
                  <span>Installs: {formatNumber(hub.installs)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {hub.games.map((g) => (
                    <Badge key={g} variant="outline" className="border-white/15">{g}</Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline" className="rounded-xl" onClick={() => copy(hub.script)}>
                        <Copy className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy loader</TooltipContent>
                  </Tooltip>
                  <Button size="sm" className="rounded-xl" onClick={() => setOpenHub(hub)}>
                    Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HubDialog({ hub, onClose }) {
  return (
    <Dialog open={!!hub} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        {hub && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><TerminalSquare className="size-5"/> {hub.name}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 py-2">
              <div>
                <h4 className="text-sm text-slate-400">Script</h4>
                <CodeBlock code={hub.script} />
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => copy(hub.script)} className="rounded-xl"><Copy className="mr-2 size-4"/>Copy</Button>
                  <Button size="sm" variant="secondary" asChild className="rounded-xl"><a href={hub.repo} target="_blank" rel="noreferrer"><Github className="mr-2 size-4"/>Repo</a></Button>
                  <Button size="sm" asChild className="rounded-xl"><a href={hub.docs} target="_blank" rel="noreferrer"><Info className="mr-2 size-4"/>Docs</a></Button>
                </div>
              </div>
              <div>
                <h4 className="text-sm text-slate-400">Features</h4>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {hub.features.map((f) => (
                    <li key={f} className="rounded-lg border border-white/10 p-2 bg-white/5">{f}</li>
                  ))}
                </ul>
                <h4 className="text-sm text-slate-400 mt-4">Supported Games</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {hub.games.map((g) => (
                    <Badge key={g} variant="secondary">{g}</Badge>
                  ))}
                </div>
                <div className="mt-4 text-xs text-slate-400">
                  <span>Last updated: {hub.updated}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" className="rounded-xl" onClick={onClose}><X className="mr-2 size-4"/> Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CodeInline({ code }) {
  return (
    <div className="group relative rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 font-mono text-xs overflow-auto">
      <code>{code}</code>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-1.5 top-1.5 rounded-lg hover:bg-white/10"
        onClick={() => copy(code)}
        aria-label="Copy code"
      >
        <Copy className="size-4" />
      </Button>
    </div>
  );
}

function CodeBlock({ code, label }) {
  return (
    <div className="rounded-xl bg-slate-950/60 border border-white/10">
      {label && (
        <div className="px-3 py-2 text-xs text-slate-400 border-b border-white/10">{label}</div>
      )}
      <ScrollArea className="max-h-56">
        <pre className="p-3 text-xs md:text-sm text-slate-200 overflow-auto"><code>{code}</code></pre>
      </ScrollArea>
      <div className="p-2 border-t border-white/10 flex items-center justify-end gap-2">
        <Button size="sm" variant="outline" className="rounded-xl" onClick={() => copy(code)}>
          <Copy className="mr-2 size-4"/> Copy
        </Button>
        <Button size="sm" className="rounded-xl"><Download className="mr-2 size-4"/> Download</Button>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section className="py-16">
      <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/40 to-pink-500/40">
        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold">
                Need a custom module or private hub?
              </h3>
              <p className="mt-2 text-slate-300">
                I build game‑specific scripts with safe timing, UI polish, and version‑locked modules. Commission slots are limited.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button className="rounded-2xl" asChild>
                <a href="https://discord.gg/xEYt9gv6Kg" target="_blank" rel="noreferrer"><Send className="mr-2 size-4"/> Contact on Discord</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} hexinova • Built with ♥</p>
        <div className="flex gap-2">
          {SOCIALS.map((s) => (
            <Button key={s.name} asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white">
              <a href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <s.icon className="size-4" /> {s.name}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
