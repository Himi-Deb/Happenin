import { useState } from 'react';

const F = 'Urbanist, sans-serif';
const G = 'Space Grotesk, sans-serif';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = `${BASE}/happenin-logo-new.png`;

const BG      = '#0e0c09';
const CARD_BG = '#13110d';
const INPUT_BG = '#0a0804';
const TEAL    = '#7FE0D5';
const GOLD    = '#EBE88A';

type Section = 'basics' | 'datetime' | 'location' | 'description' | 'lineup' | 'tickets' | 'settings';

const SECTIONS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'basics',      label: 'Basic Info',   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg> },
  { id: 'datetime',    label: 'Date & Time',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id: 'location',    label: 'Location',     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { id: 'description', label: 'Description',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { id: 'lineup',      label: 'Lineup',       icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
  { id: 'tickets',     label: 'Tickets',      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/></svg> },
  { id: 'settings',    label: 'Settings',     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

const CATEGORIES = ['Music', 'Arts & Culture', 'Food & Drink', 'Sports', 'Comedy', 'Film', 'Tech', 'Community', 'Wellness', 'Other'];

function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: F, fontSize: 15, cursor: 'pointer' }}>My Events</span>
          <span style={{ color: 'rgba(255,255,255,0.18)', fontFamily: F, fontSize: 15, margin: '0 4px' }}>/</span>
          <span style={{ color: '#fff', fontFamily: F, fontSize: 15, fontWeight: 600 }}>Edit Event</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <div style={{ background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.25)', borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: TEAL }} />
          <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TEAL }}>Live</span>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.15)', borderRadius: 12, padding: '12px 18px', color: 'rgba(255,120,120,0.65)', fontFamily: F, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
          Cancel Event
        </button>
        <div style={{ background: GOLD, borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', cursor: 'pointer' }}>
          <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c', whiteSpace: 'nowrap' }}>Maya Chen</span>
        </div>
      </div>
    </div>
  );
}

const inp: React.CSSProperties = {
  width: '100%', background: INPUT_BG, border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 14, padding: '14px 18px', color: '#fff', fontFamily: F, fontSize: 15,
  outline: 'none', transition: 'border-color 0.18s', boxSizing: 'border-box',
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{children}</div>;
}

function SectionCard({ title, id, changed, children }: { title: string; id?: string; changed?: boolean; children: React.ReactNode }) {
  return (
    <div id={id} style={{ background: CARD_BG, border: `1px solid ${changed ? 'rgba(235,232,138,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 20, padding: '28px 32px 32px', marginBottom: 20, position: 'relative', transition: 'border-color 0.2s' }}>
      {changed && <div style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(235,232,138,0.1)', border: '1px solid rgba(235,232,138,0.3)', borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: GOLD }}>Unsaved</div>}
      <div style={{ fontFamily: G, fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 16 }}>{title}</div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange, label, sub }: { value: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{sub}</div>}
      </div>
      <div onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, background: value ? TEAL : 'rgba(255,255,255,0.1)', border: `1px solid ${value ? TEAL : 'rgba(255,255,255,0.12)'}`, cursor: 'pointer', transition: 'all 0.2s', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: value ? 23 : 3, width: 16, height: 16, borderRadius: '50%', background: value ? '#0e2a2c' : 'rgba(255,255,255,0.4)', transition: 'left 0.2s' }} />
      </div>
    </div>
  );
}

export default function EditEvent() {
  const [active, setActive]         = useState<Section>('basics');
  const [name, setName]             = useState('Neon Pulse Music Festival');
  const [tagline, setTagline]       = useState("South Bank's biggest free music night");
  const [category, setCategory]     = useState('Music');
  const [desc, setDesc]             = useState("Join us for a night of pulsing electronic music under the open sky at South Bank. From ambient warm-ups to peak-hour sets, Neon Pulse brings together the city's finest DJs for a free, all-welcome festival.\n\nDoors open at 5:30 PM. Free to attend — grab your ticket to secure your spot.");
  const [announcements, setAnnouncements] = useState(true);
  const [generalChat, setGeneralChat]     = useState(true);
  const [privateEvent, setPrivateEvent]   = useState(false);
  const [saved, setSaved]           = useState(false);
  const [changedBasics, setChangedBasics] = useState(false);
  const [changedDateTime, setChangedDateTime] = useState(false);
  const [changedDesc, setChangedDesc] = useState(false);

  const [lineup] = useState([
    { act: 'Warm Up DJ', time: '6:30 PM', type: 'support' as const },
    { act: 'Hybrid Minds', time: '8:00 PM', type: 'support' as const },
    { act: 'DJ Mara', time: '10:00 PM', type: 'headline' as const },
  ]);

  const anyUnsaved = changedBasics || changedDateTime || changedDesc;

  const scrollToSection = (id: Section) => {
    setActive(id);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  function saveChanges() {
    setChangedBasics(false); setChangedDateTime(false); setChangedDesc(false);
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ height: '100vh', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: F }}>
      <style>{`
        .ce-inp:focus { border-color: rgba(127,224,213,0.4) !important; }
        .ce-inp::placeholder { color: rgba(255,255,255,0.18); }
        .ce-nav-row:hover { background: rgba(127,224,213,0.05) !important; }
        .ce-cat:hover { background: rgba(127,224,213,0.1) !important; }
        .scroll-y::-webkit-scrollbar { width: 4px; }
        .scroll-y::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        textarea { resize: none; }
        select { -webkit-appearance: none; }
      `}</style>
      <Navbar />

      {anyUnsaved && !saved && (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 300, background: '#13110d', border: '1px solid rgba(235,232,138,0.3)', borderRadius: 16, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
            <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>You have unsaved changes</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { setChangedBasics(false); setChangedDateTime(false); setChangedDesc(false); }} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 16px', fontFamily: F, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>Discard</button>
            <button onClick={saveChanges} style={{ background: TEAL, border: 'none', borderRadius: 10, padding: '8px 20px', fontFamily: F, fontSize: 13, fontWeight: 700, color: '#0e2a2c', cursor: 'pointer' }}>Save Changes</button>
          </div>
        </div>
      )}

      {saved && (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 300, background: 'rgba(14,42,44,0.95)', border: '1px solid rgba(127,224,213,0.3)', borderRadius: 16, padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: TEAL }}>Changes saved — event updated live</span>
        </div>
      )}

      <div style={{ marginTop: 125, flex: 1, display: 'flex', overflow: 'hidden', padding: '16px 20px 20px', gap: 16 }}>
        <div style={{ width: 240, minWidth: 240, background: CARD_BG, borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Sections</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 10px' }}>
            {SECTIONS.map(s => {
              const isActive = s.id === active;
              const hasChange = (s.id === 'basics' && changedBasics) || (s.id === 'datetime' && changedDateTime) || (s.id === 'description' && changedDesc);
              return (
                <div key={s.id} className="ce-nav-row" onClick={() => scrollToSection(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 13, background: isActive ? `${TEAL}10` : 'transparent', border: `1px solid ${isActive ? `${TEAL}28` : 'transparent'}`, cursor: 'pointer', transition: 'all 0.15s', marginBottom: 3, position: 'relative' }}>
                  {isActive && <div style={{ position: 'absolute', left: 0, top: '22%', bottom: '22%', width: 3, borderRadius: '0 3px 3px 0', background: TEAL }} />}
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: isActive ? `${TEAL}14` : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? `${TEAL}24` : 'rgba(255,255,255,0.07)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: isActive ? TEAL : 'rgba(255,255,255,0.3)' }}>{s.icon}</div>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>{s.label}</span>
                  {hasChange && <div style={{ width: 7, height: 7, borderRadius: '50%', background: GOLD, flexShrink: 0, marginLeft: 'auto' }} />}
                </div>
              );
            })}
          </div>
          <div style={{ padding: '14px 14px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={saveChanges} style={{ width: '100%', background: anyUnsaved ? TEAL : 'rgba(127,224,213,0.1)', border: `1px solid ${anyUnsaved ? 'transparent' : 'rgba(127,224,213,0.15)'}`, borderRadius: 13, padding: '15px 0', fontFamily: F, fontSize: 15, fontWeight: 700, color: anyUnsaved ? '#0e2a2c' : 'rgba(127,224,213,0.5)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Save Changes
            </button>
            <button style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 13, padding: '12px 0', fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>Preview Event Page</button>
          </div>
        </div>

        <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div id="section-basics" style={{ marginBottom: 20, borderRadius: 20, overflow: 'hidden', position: 'relative', height: 220, cursor: 'pointer' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0b1e26 0%, #1a1208 50%, #0e2218 100%)' }} />
            <div style={{ position: 'absolute', inset: 0 }}>
              <svg width="100%" height="100%" viewBox="0 0 1200 220" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="eg1" cx="50%" cy="50%" r="50%"><stop stopColor="#7FE0D5" stopOpacity="0.08"/><stop offset="1" stopColor="#7FE0D5" stopOpacity="0"/></radialGradient>
                  <radialGradient id="eg2" cx="50%" cy="50%" r="50%"><stop stopColor="#EBE88A" stopOpacity="0.06"/><stop offset="1" stopColor="#EBE88A" stopOpacity="0"/></radialGradient>
                </defs>
                <rect width="1200" height="220" fill="url(#eg1)"/>
                <rect x="700" width="500" height="220" fill="url(#eg2)"/>
                {[30,60,90,110,130,160,190].map((y, i) => (
                  <path key={i} d={`M0 ${y} Q300 ${y - 20 + i * 8} 600 ${y} Q900 ${y + 20 - i * 8} 1200 ${y}`} stroke="rgba(127,224,213,0.05)" strokeWidth="1.5" fill="none"/>
                ))}
              </svg>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.5)', marginBottom: 4 }}>Cover Image</div>
                <div style={{ fontFamily: G, fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Neon Pulse Music Festival</div>
              </div>
              <button style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '9px 18px', fontFamily: F, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>Change Image</button>
            </div>
          </div>

          <SectionCard title="Basic Info" id="section-basics" changed={changedBasics}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div><FieldLabel>Event Name *</FieldLabel><input className="ce-inp" value={name} onChange={e => { setName(e.target.value); setChangedBasics(true); }} style={{ ...inp, fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px' }} /></div>
              <div><FieldLabel>Tagline</FieldLabel><input className="ce-inp" value={tagline} onChange={e => { setTagline(e.target.value); setChangedBasics(true); }} style={inp} /></div>
              <div>
                <FieldLabel>Category</FieldLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {CATEGORIES.map(c => (
                    <div key={c} className="ce-cat" onClick={() => { setCategory(c); setChangedBasics(true); }} style={{ padding: '8px 16px', borderRadius: 10, background: category === c ? `${TEAL}14` : 'rgba(255,255,255,0.04)', border: `1px solid ${category === c ? `${TEAL}40` : 'rgba(255,255,255,0.08)'}`, fontSize: 13, fontWeight: 600, color: category === c ? TEAL : 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.15s' }}>{c}</div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Date & Time" id="section-datetime" changed={changedDateTime}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <div><FieldLabel>Date *</FieldLabel><input className="ce-inp" type="date" defaultValue="2025-06-14" onChange={() => setChangedDateTime(true)} style={{ ...inp, colorScheme: 'dark' }} /></div>
              <div><FieldLabel>Start Time *</FieldLabel><input className="ce-inp" type="time" defaultValue="17:30" onChange={() => setChangedDateTime(true)} style={{ ...inp, colorScheme: 'dark' }} /></div>
              <div><FieldLabel>End Time</FieldLabel><input className="ce-inp" type="time" defaultValue="23:00" onChange={() => setChangedDateTime(true)} style={{ ...inp, colorScheme: 'dark' }} /></div>
            </div>
            <div style={{ marginTop: 18 }}>
              <FieldLabel>Timezone</FieldLabel>
              <select className="ce-inp" style={{ ...inp, cursor: 'pointer' }}>
                <option>Europe/London (GMT+1)</option>
                <option>America/New_York (EST)</option>
                <option>America/Los_Angeles (PST)</option>
              </select>
            </div>
          </SectionCard>

          <SectionCard title="Location" id="section-location">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><FieldLabel>Venue Name *</FieldLabel><input className="ce-inp" defaultValue="Rooftop Arena" style={inp} /></div>
              <div><FieldLabel>Street Address</FieldLabel><input className="ce-inp" defaultValue="32 Upper Ground" style={inp} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><FieldLabel>City *</FieldLabel><input className="ce-inp" defaultValue="London" style={inp} /></div>
                <div><FieldLabel>Postcode</FieldLabel><input className="ce-inp" defaultValue="SE1 9PP" style={inp} /></div>
              </div>
              <div style={{ height: 120, borderRadius: 14, background: '#0d1415', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
                <svg viewBox="0 0 800 120" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                  <rect width="800" height="120" fill="#0d1415"/>
                  {[0,80,160,240,320,400,480,560,640,720].map(x => <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="rgba(127,224,213,0.05)" strokeWidth="1"/>)}
                  {[0,30,60,90,120].map(y => <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(127,224,213,0.05)" strokeWidth="1"/>)}
                  <rect x="180" y="20" width="440" height="80" rx="8" fill="rgba(14,42,44,0.6)" stroke="rgba(127,224,213,0.1)" strokeWidth="1"/>
                  <circle cx="400" cy="60" r="12" fill="rgba(127,224,213,0.15)"/>
                  <circle cx="400" cy="60" r="6" fill={TEAL}/>
                  <circle cx="400" cy="60" r="3" fill="#0e2a2c"/>
                  <text x="400" y="98" textAnchor="middle" fill="rgba(127,224,213,0.5)" fontSize="10" fontFamily="Urbanist, sans-serif">32 Upper Ground, South Bank · SE1 9PP</text>
                </svg>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Description" id="section-description" changed={changedDesc}>
            <div><FieldLabel>About this Event *</FieldLabel><textarea className="ce-inp" value={desc} onChange={e => { setDesc(e.target.value); setChangedDesc(true); }} rows={7} style={{ ...inp, lineHeight: 1.7 }} /></div>
            <div style={{ marginTop: 14 }}><FieldLabel>Accessibility Info</FieldLabel><textarea className="ce-inp" defaultValue="Wheelchair accessible via Waterloo Road entrance. Step-free throughout. BSL interpretation available on request." rows={3} style={{ ...inp, lineHeight: 1.7 }} /></div>
          </SectionCard>

          <SectionCard title="Lineup & Schedule" id="section-lineup">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {lineup.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 120px auto', gap: 10, alignItems: 'center' }}>
                  <input className="ce-inp" defaultValue={row.act} style={inp} />
                  <input className="ce-inp" defaultValue={row.time} style={inp} />
                  <select className="ce-inp" defaultValue={row.type} style={{ ...inp, cursor: 'pointer', padding: '14px 12px' }}>
                    <option value="support">Support</option>
                    <option value="headline">Headliner</option>
                    <option value="info">Info</option>
                  </select>
                  <div style={{ width: 36 }} />
                </div>
              ))}
              <button style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderRadius: 12, background: 'transparent', border: '1px dashed rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontFamily: F, fontSize: 13, fontWeight: 600, cursor: 'pointer', width: 'fit-content' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add performer
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Tickets" id="section-tickets">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(127,224,213,0.06)', border: '1px solid rgba(127,224,213,0.15)', borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEAL }}>Free tickets only</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>happenin* is built for free events — no payment processing needed</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div><FieldLabel>Ticket Name</FieldLabel><input className="ce-inp" defaultValue="General Admission" style={inp} /></div>
              <div><FieldLabel>Capacity</FieldLabel><input className="ce-inp" type="number" defaultValue="1200" style={inp} /></div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              {[{ label: 'Claimed', val: '842', color: TEAL }, { label: 'Remaining', val: '358', color: 'rgba(255,255,255,0.4)' }, { label: 'Checked In', val: '312', color: '#B1D8D4' }].map(s => (
                <div key={s.label} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: '-1px' }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.5px', marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Settings" id="section-settings">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 16 }}>
              <Toggle value={announcements} onChange={setAnnouncements} label="Announcements channel" sub="Organiser-only broadcast channel for all ticket holders" />
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
              <Toggle value={generalChat} onChange={setGeneralChat} label="General chat" sub="Open discussion channel for attendees and organiser" />
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
              <Toggle value={privateEvent} onChange={setPrivateEvent} label="Private event" sub="Only people with the direct link can find this event" />
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
              <div>
                <FieldLabel>Co-organisers</FieldLabel>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  {[{ ini: 'SJ', name: 'Sarah J.', role: 'Staff', bg: '#0e2a2c' }, { ini: 'MT', name: 'Marcus T.', role: 'Staff', bg: '#1a1208' }].map((co, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '10px 14px', flex: 1 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: co.bg, border: '1.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontFamily: F, fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.6)' }}>{co.ini}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{co.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{co.role}</div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', padding: 4 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input className="ce-inp" placeholder="Invite by email or username" style={{ ...inp, flex: 1 }} />
                  <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '0 20px', fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', whiteSpace: 'nowrap', height: 50 }}>Invite</button>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8, background: 'rgba(255,60,60,0.04)', border: '1px solid rgba(255,60,60,0.1)', borderRadius: 14, padding: '20px 22px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,80,80,0.4)', marginBottom: 14 }}>Danger Zone</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ flex: 1, background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.15)', borderRadius: 12, padding: '11px 0', fontFamily: F, fontSize: 13, fontWeight: 600, color: 'rgba(255,100,100,0.6)', cursor: 'pointer' }}>Cancel Event</button>
                <button style={{ flex: 1, background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.15)', borderRadius: 12, padding: '11px 0', fontFamily: F, fontSize: 13, fontWeight: 600, color: 'rgba(255,100,100,0.6)', cursor: 'pointer' }}>Delete Event</button>
              </div>
            </div>
          </SectionCard>
          <div style={{ height: 80 }} />
        </div>
      </div>
    </div>
  );
}
