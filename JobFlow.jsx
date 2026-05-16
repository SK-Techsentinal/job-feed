import { useState, useEffect, useRef } from "react";

const JOBS = [
  { id: 1, title: "Senior Full Stack Developer", company: "Capitec Bank", location: "Stellenbosch, WC", type: "Full Time", level: "Senior", category: "Technology", salary: "R65,000 – R90,000", featured: true, views: 342, days: 1, logo: "CB", color: "#007AFF", desc: "Build next-generation banking platforms using React, Node.js and cloud infrastructure. Work with a world-class engineering team." },
  { id: 2, title: "Branch Operations Manager", company: "FNB South Africa", location: "Sandton, GP", type: "Full Time", level: "Mid Level", category: "Banking", salary: "R45,000 – R60,000", featured: true, views: 218, days: 2, logo: "FNB", color: "#E8A020", desc: "Oversee daily branch operations, manage a team of 15+ staff and drive exceptional client service standards." },
  { id: 3, title: "AI Product Designer", company: "Takealot", location: "Cape Town, WC", type: "Remote", level: "Mid Level", category: "Design", salary: "R55,000 – R75,000", featured: false, views: 156, days: 3, logo: "TK", color: "#E53E3E", desc: "Design intuitive AI-powered product experiences for millions of South African shoppers." },
  { id: 4, title: "Cybersecurity Analyst", company: "Standard Bank", location: "Johannesburg, GP", type: "Full Time", level: "Mid Level", category: "Technology", salary: "R50,000 – R70,000", featured: true, views: 289, days: 4, logo: "SB", color: "#1A56DB", desc: "Protect critical banking infrastructure. Monitor threats, conduct audits and implement security protocols." },
  { id: 5, title: "Digital Marketing Lead", company: "Discovery Health", location: "Sandton, GP", type: "Full Time", level: "Senior", category: "Marketing", salary: "R40,000 – R55,000", featured: false, views: 94, days: 5, logo: "DH", color: "#805AD5", desc: "Lead digital campaigns across social, email and performance channels. Drive growth for Discovery's insurance products." },
  { id: 6, title: "React Native Developer", company: "Mukuru", location: "Remote, SA", type: "Remote", level: "Mid Level", category: "Technology", salary: "R45,000 – R65,000", featured: false, views: 173, days: 2, logo: "MK", color: "#38A169", desc: "Build cross-platform mobile apps for Africa's leading money transfer platform." },
  { id: 7, title: "Risk & Compliance Officer", company: "ABSA Group", location: "Johannesburg, GP", type: "Full Time", level: "Senior", category: "Finance", salary: "R70,000 – R95,000", featured: true, views: 201, days: 1, logo: "AB", color: "#C53030", desc: "Ensure regulatory compliance across ABSA's financial products. Work with senior leadership on risk frameworks." },
  { id: 8, title: "Data Scientist", company: "Vodacom", location: "Midrand, GP", type: "Full Time", level: "Mid Level", category: "Technology", salary: "R60,000 – R85,000", featured: false, views: 267, days: 6, logo: "VC", color: "#E53E3E", desc: "Analyse telecom data to drive business intelligence. Build ML models that impact 40M+ subscribers." },
];

const CATEGORIES = ["All", "Technology", "Banking", "Finance", "Marketing", "Design", "Operations"];
const TYPES = ["All Types", "Full Time", "Part Time", "Remote", "Contract", "Internship"];
const LEVELS = ["All Levels", "Entry Level", "Mid Level", "Senior", "Executive"];

const Tag = ({ children, color = "#1a1a2e" }) => (
  <span style={{ background: `${color}18`, color, border: `1px solid ${color}30`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const typeColor = t => ({ "Full Time": "#16a34a", "Remote": "#2563eb", "Contract": "#d97706", "Internship": "#7c3aed", "Part Time": "#db2777" }[t] || "#555");

const ApplyModal = ({ job, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", cover: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(6px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0d0d18", width: "100%", maxWidth: 620, borderRadius: "24px 24px 0 0", padding: 28, border: "1px solid rgba(255,255,255,0.08)", maxHeight: "90vh", overflowY: "auto" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif" }}>Application Sent!</div>
            <div style={{ color: "#666", marginTop: 8, fontSize: 14 }}>Good luck with {job.title} at {job.company}</div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, fontFamily: "Georgia, serif" }}>Apply Now</div>
                <div style={{ color: "#666", fontSize: 13, marginTop: 2 }}>{job.title} · {job.company}</div>
              </div>
              <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "none", color: "#888", fontSize: 18, cursor: "pointer", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            {[
              { label: "Full Name", key: "name", placeholder: "Suleiman Kaldine", type: "text" },
              { label: "Email Address", key: "email", placeholder: "you@email.com", type: "email" },
              { label: "Phone Number", key: "phone", placeholder: "+27 71 234 5678", type: "tel" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <div style={{ color: "#555", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>{f.label}</div>
                <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: "#555", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>Cover Letter</div>
              <textarea value={form.cover} onChange={e => set("cover", e.target.value)} placeholder="Tell them why you're perfect for this role..."
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, resize: "none", height: 110, outline: "none", boxSizing: "border-box" }} />
            </div>
            <button onClick={() => setSent(true)} style={{ width: "100%", background: "linear-gradient(135deg, #2563eb, #7c3aed)", border: "none", borderRadius: 12, padding: 15, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", letterSpacing: 0.3 }}>
              Submit Application →
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const JobDetail = ({ job, onBack, onApply }) => (
  <div style={{ position: "fixed", inset: 0, background: "#080810", zIndex: 500, overflowY: "auto", display: "flex", flexDirection: "column" }}>
    <div style={{ background: "linear-gradient(180deg, rgba(37,99,235,0.12), transparent)", padding: "20px 20px 0" }}>
      <button onClick={onBack} style={{ background: "rgba(255,255,255,0.07)", border: "none", color: "#aaa", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Back</button>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: `linear-gradient(135deg, ${job.color}, ${job.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff", flexShrink: 0 }}>{job.logo}</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 20, fontFamily: "Georgia, serif", lineHeight: 1.2 }}>{job.title}</div>
          <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>{job.company} · {job.location}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        <Tag color={typeColor(job.type)}>{job.type}</Tag>
        <Tag color="#888">{job.level}</Tag>
        <Tag color="#888">{job.category}</Tag>
      </div>
    </div>
    <div style={{ padding: "0 20px 120px" }}>
      <div style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 14, padding: 16, marginBottom: 24 }}>
        <div style={{ color: "#4ade80", fontWeight: 800, fontSize: 18 }}>{job.salary}</div>
        <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>per month · {job.views} views · {job.days}d ago</div>
      </div>
      <div style={{ color: "#888", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>About the Role</div>
      <div style={{ color: "#ccc", fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>{job.desc} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>
      <div style={{ color: "#888", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Requirements</div>
      {["5+ years of relevant experience", "Strong communication skills", "Degree or equivalent qualification", "Proficiency in relevant tools and technologies"].map((r, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
          <span style={{ color: "#2563eb", marginTop: 2 }}>✓</span>
          <span style={{ color: "#aaa", fontSize: 14 }}>{r}</span>
        </div>
      ))}
    </div>
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "rgba(8,8,16,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={onApply} style={{ width: "100%", background: "linear-gradient(135deg, #2563eb, #7c3aed)", border: "none", borderRadius: 14, padding: 16, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
        Apply for this Position →
      </button>
    </div>
  </div>
);

const JobCard = ({ job, onClick }) => (
  <div onClick={onClick} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${job.featured ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.06)"}`, borderRadius: 18, padding: 18, cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
    {job.featured && (
      <div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg, #2563eb, #7c3aed)", padding: "4px 12px", borderRadius: "0 18px 0 12px", fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "0.08em" }}>FEATURED</div>
    )}
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: `linear-gradient(135deg, ${job.color}, ${job.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff", flexShrink: 0 }}>{job.logo}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "Georgia, serif", lineHeight: 1.3, marginBottom: 2 }}>{job.title}</div>
        <div style={{ color: "#666", fontSize: 12 }}>{job.company}</div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
      <Tag color={typeColor(job.type)}>{job.type}</Tag>
      <Tag color="#555">{job.level}</Tag>
      <Tag color="#555">📍 {job.location.split(",")[0]}</Tag>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{job.salary}</div>
      <div style={{ color: "#444", fontSize: 11 }}>{job.days}d ago · {job.views} views</div>
    </div>
  </div>
);

export default function JobFlow() {
  const [jobs, setJobs] = useState(JOBS);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All Types");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [applying, setApplying] = useState(false);
  const [tab, setTab] = useState("jobs");
  const [saved, setSaved] = useState([]);

  const filtered = jobs.filter(j => {
    const matchCat  = category === "All" || j.category === category;
    const matchType = type === "All Types" || j.type === type;
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  const featured = jobs.filter(j => j.featured);
  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ fontFamily: "'Segoe UI', Georgia, sans-serif", background: "#080810", minHeight: "100vh", color: "#fff", maxWidth: 480, margin: "0 auto", position: "relative", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, rgba(13,13,30,1), rgba(8,8,16,0.95))", padding: "20px 20px 0", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 900, fontSize: 22, letterSpacing: "-0.5px" }}>
              Job<span style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Flow</span>
            </div>
            <div style={{ color: "#444", fontSize: 11, marginTop: 1 }}>South Africa's Job Platform</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ color: "#666", fontSize: 12 }}>{filtered.length} jobs</div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>S</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: 15 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs, companies..."
            style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 14px 12px 40px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 99, border: `1.5px solid ${category === c ? "#2563eb" : "rgba(255,255,255,0.08)"}`, background: category === c ? "rgba(37,99,235,0.15)" : "transparent", color: category === c ? "#60a5fa" : "#666", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {tab === "jobs" && (
        <div style={{ padding: "16px 16px 0" }}>

          {/* Featured Section */}
          {!search && category === "All" && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>⭐ Featured Jobs</div>
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
                {featured.map(job => (
                  <div key={job.id} onClick={() => setSelected(job)}
                    style={{ flexShrink: 0, width: 240, background: `linear-gradient(135deg, ${job.color}18, rgba(255,255,255,0.03))`, border: `1px solid ${job.color}30`, borderRadius: 16, padding: 16, cursor: "pointer" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${job.color}, ${job.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff", marginBottom: 10 }}>{job.logo}</div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Georgia, serif", marginBottom: 4, lineHeight: 1.3 }}>{job.title}</div>
                    <div style={{ color: "#666", fontSize: 11, marginBottom: 8 }}>{job.company}</div>
                    <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 12 }}>{job.salary}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Type Filter */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", scrollbarWidth: "none" }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                style={{ flexShrink: 0, padding: "6px 12px", borderRadius: 8, border: `1px solid ${type === t ? typeColor(t) : "rgba(255,255,255,0.08)"}`, background: type === t ? `${typeColor(t)}18` : "transparent", color: type === t ? typeColor(t) : "#555", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                {t}
              </button>
            ))}
          </div>

          {/* Job List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 48, color: "#444" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>No jobs found</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>Try different filters</div>
              </div>
            )}
            {filtered.map(job => (
              <div key={job.id} style={{ position: "relative" }}>
                <JobCard job={job} onClick={() => setSelected(job)} />
                <button onClick={() => toggleSave(job.id)}
                  style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: saved.includes(job.id) ? "#f59e0b" : "#333" }}>
                  {saved.includes(job.id) ? "★" : "☆"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "saved" && (
        <div style={{ padding: 16 }}>
          <div style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>Saved Jobs ({saved.length})</div>
          {saved.length === 0 ? (
            <div style={{ textAlign: "center", padding: 48, color: "#444" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>☆</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>No saved jobs yet</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>Tap ☆ on any job to save it</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {jobs.filter(j => saved.includes(j.id)).map(job => (
                <JobCard key={job.id} job={job} onClick={() => setSelected(job)} />
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "profile" && (
        <div style={{ padding: 20 }}>
          <div style={{ textAlign: "center", padding: "32px 0 24px" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 28, margin: "0 auto 12px" }}>S</div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 20, fontFamily: "Georgia, serif" }}>Suleiman Kaldine</div>
            <div style={{ color: "#555", fontSize: 13, marginTop: 4 }}>SK-TECHSENTINAL · Johannesburg, SA</div>
          </div>
          {[
            { icon: "💼", label: "Applied Jobs", value: "0" },
            { icon: "★", label: "Saved Jobs", value: saved.length.toString() },
            { icon: "👁️", label: "Profile Views", value: "12" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{ color: "#aaa", fontSize: 14 }}>{s.label}</span>
              </div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{s.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(8,8,16,0.97)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", zIndex: 200 }}>
        {[
          { id: "jobs", icon: "briefcase", label: "Jobs", emoji: "💼" },
          { id: "saved", icon: "saved", label: "Saved", emoji: "★" },
          { id: "profile", icon: "profile", label: "Profile", emoji: "👤" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 0 14px", background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ fontSize: 20 }}>{t.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: tab === t.id ? "#60a5fa" : "#444", textTransform: "uppercase" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb" }} />}
          </button>
        ))}
      </div>

      {selected && (
        <JobDetail job={selected} onBack={() => setSelected(null)} onApply={() => setApplying(true)} />
      )}
      {applying && selected && (
        <ApplyModal job={selected} onClose={() => setApplying(false)} />
      )}
    </div>
  );
}
