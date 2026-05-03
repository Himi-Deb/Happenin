import { useState } from 'react';
import logoPng from '@assets/Happenin-Logo_1777806807849.png';

const F = 'Urbanist, sans-serif';
const G = 'Space Grotesk, sans-serif';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = logoPng;

const BG       = '#0e0c09';
const CARD_BG  = '#13110d';
const INPUT_BG = '#0a0804';
const TEAL     = '#7FE0D5';
const GOLD     = '#EBE88A';

type Section = 'basics' | 'datetime' | 'location' | 'description' | 'lineup' | 'tickets' | 'settings';

const SECTIONS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'basics',      label: 'Basic Info',   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg> },
  { id: 'datetime',    label: 'Date & Time',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id: 'location',    label: 'Location',     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { id: 'description', label: 'Description',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { id: 'lineup',      label: 'Lineup',       icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
  { id: 'tickets',     label: 'Tickets',      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/></svg> },
  { id: 'settings',    label: 'Settings',     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

const CATEGORIES = ['Music', 'Arts & Culture', 'Food & Drink', 'Sports', 'Comedy', 'Film', 'Tech', 'Community', 'Wellness', 'Other'];

function Navbar() {
  const savedUser = 'Maya Chen';
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Create Event</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 22px', color: 'rgba(255,255,255,0.55)', fontFamily: F, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Save Draft</button>
        <div style={{ background: GOLD, borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', cursor: 'pointer' }}>
          <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c', whiteSpace: 'nowrap' }}>{savedUser}</span>
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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '28px 32px 32px', marginBottom: 20 }}>
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

export default function CreateEvent() {
  const [active, setActive]         = useState<Section>('basics');
  const [name, setName]             = useState('');
  const [tagline, setTagline]       = useState('');
  const [category, setCategory]     = useState('Music');
  const [date, setDate]             = useState('');
  const [startTime, setStartTime]   = useState('');
  const [endTime, setEndTime]       = useState('');
  const [venue, setVenue]           = useState('');
  const [address, setAddress]       = useState('');
  const [city, setCity]             = useState('');
  const [desc, setDesc]             = useState('');
  const [capacity, setCapacity]     = useState('500');
  const [announcements, setAnnouncements] = useState(true);
  const [generalChat, setGeneralChat]     = useState(true);
  const [privateEvent, setPrivateEvent]   = useState(false);
  const [lineup, setLineup] = useState([{ act: '', time: '', type: 'support' as 'support' | 'headline' | 'info' }]);
  const [published, setPublished]   = useState(false);

  const completedSections = [!!name, !!date && !!startTime, !!venue, !!desc, lineup.some(l => !!l.act), !!capacity, true];

  function addLineupRow() { setLineup(l => [...l, { act: '', time: '', type: 'support' }]); }
  function updateLineup(i: number, field: 'act' | 'time' | 'type', val: string) {
    setLineup(l => l.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  }
  function removeLineupRow(i: number) { setLineup(l => l.filter((_, idx) => idx !== i)); }

  const scrollToSection = (id: Section) => {
    setActive(id);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
      <div style={{ marginTop: 125, flex: 1, display: 'flex', overflow: 'hidden', padding: '16px 20px 20px', gap: 16 }}>
        <div style={{ width: 240, minWidth: 240, background: CARD_BG, borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Sections</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 10px' }}>
            {SECTIONS.map((s, i) => {
              const isActive = s.id === active;
              const isDone = completedSections[i];
              return (
                <div key={s.id} className="ce-nav-row" onClick={() => scrollToSection(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 13, background: isActive ? `${TEAL}10` : 'transparent', border: `1px solid ${isActive ? `${TEAL}28` : 'transparent'}`, cursor: 'pointer', transition: 'all 0.15s', marginBottom: 3, position: 'relative' }}>
                  {isActive && <div style={{ position: 'absolute', left: 0, top: '22%', bottom: '22%', width: 3, borderRadius: '0 3px 3px 0', background: TEAL }} />}
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: isActive ? `${TEAL}14` : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? `${TEAL}24` : 'rgba(255,255,255,0.07)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: isActive ? TEAL : 'rgba(255,255,255,0.3)' }}>
                    {isDone ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={isActive ? TEAL : 'rgba(127,224,213,0.5)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : s.icon}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>{s.label}</span>
                  {!isDone && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', flexShrink: 0, marginLeft: 'auto' }} />}
                </div>
              );
            })}
          </div>
          <div style={{ padding: '14px 14px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
            {published ? (
              <div style={{ background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.3)', borderRadius: 13, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: TEAL, marginBottom: 4 }}>✓ Published!</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Your event is now live</div>
              </div>
            ) : (
              <button onClick={() => setPublished(true)} style={{ width: '100%', background: TEAL, border: 'none', borderRadius: 13, padding: '15px 0', fontFamily: F, fontSize: 15, fontWeight: 700, color: '#0e2a2c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0e2a2c" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>
                Publish Event
              </button>
            )}
          </div>
        </div>

        <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div id="section-basics" style={{ marginBottom: 20, borderRadius: 20, overflow: 'hidden', position: 'relative', height: 220, background: 'linear-gradient(135deg, #0f1e20, #1a1208)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(127,224,213,0.025) 0, rgba(127,224,213,0.025) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, rgba(235,232,138,0.02) 0, rgba(235,232,138,0.02) 1px, transparent 1px, transparent 20px)' }} />
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>Upload Cover Image</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>Recommended: 1920 × 1080 · JPG, PNG, WebP</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 20px', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Browse Files</div>
          </div>

          <SectionCard title="Basic Info">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <FieldLabel>Event Name *</FieldLabel>
                <input className="ce-inp" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Neon Pulse Music Festival" style={{ ...inp, fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px' }} />
              </div>
              <div>
                <FieldLabel>Tagline</FieldLabel>
                <input className="ce-inp" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="A short, catchy subtitle for your event" style={inp} />
              </div>
              <div>
                <FieldLabel>Category</FieldLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {CATEGORIES.map(c => (
                    <div key={c} className="ce-cat" onClick={() => setCategory(c)} style={{ padding: '8px 16px', borderRadius: 10, background: category === c ? `${TEAL}14` : 'rgba(255,255,255,0.04)', border: `1px solid ${category === c ? `${TEAL}40` : 'rgba(255,255,255,0.08)'}`, fontSize: 13, fontWeight: 600, color: category === c ? TEAL : 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.15s' }}>{c}</div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <div id="section-datetime">
            <SectionCard title="Date & Time">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div><FieldLabel>Date *</FieldLabel><input className="ce-inp" type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...inp, colorScheme: 'dark' }} /></div>
                <div><FieldLabel>Start Time *</FieldLabel><input className="ce-inp" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={{ ...inp, colorScheme: 'dark' }} /></div>
                <div><FieldLabel>End Time</FieldLabel><input className="ce-inp" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={{ ...inp, colorScheme: 'dark' }} /></div>
              </div>
              <div style={{ marginTop: 18 }}>
                <FieldLabel>Timezone</FieldLabel>
                <select className="ce-inp" style={{ ...inp, cursor: 'pointer' }}>
                  <option value="Europe/London">Europe/London (GMT+1)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                  <option value="Europe/Paris">Europe/Paris (CET)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>
            </SectionCard>
          </div>

          <div id="section-location">
            <SectionCard title="Location">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div><FieldLabel>Venue Name *</FieldLabel><input className="ce-inp" value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. Rooftop Arena" style={inp} /></div>
                <div><FieldLabel>Street Address</FieldLabel><input className="ce-inp" value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. 32 Upper Ground" style={inp} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div><FieldLabel>City *</FieldLabel><input className="ce-inp" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. London" style={inp} /></div>
                  <div><FieldLabel>Postcode</FieldLabel><input className="ce-inp" placeholder="e.g. SE1 9PP" style={inp} /></div>
                </div>
                <div style={{ height: 120, borderRadius: 14, background: '#0d1415', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'rgba(255,255,255,0.2)', fontSize: 13, cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
                  <svg viewBox="0 0 800 120" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                    <rect width="800" height="120" fill="#0d1415"/>
                    {[0,80,160,240,320,400,480,560,640,720].map(x => <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="rgba(127,224,213,0.04)" strokeWidth="1"/>)}
                    {[0,30,60,90,120].map(y => <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(127,224,213,0.04)" strokeWidth="1"/>)}
                    <rect x="180" y="20" width="440" height="80" rx="8" fill="rgba(14,42,44,0.5)" stroke="rgba(127,224,213,0.08)" strokeWidth="1"/>
                    <circle cx="400" cy="60" r="8" fill={TEAL} fillOpacity="0.7"/>
                    <circle cx="400" cy="60" r="4" fill={TEAL}/>
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" style={{ position: 'relative', zIndex: 1 }}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span style={{ position: 'relative', zIndex: 1 }}>Map preview — enter address to preview location</span>
                </div>
              </div>
            </SectionCard>
          </div>

          <div id="section-description">
            <SectionCard title="Description">
              <div><FieldLabel>About this Event *</FieldLabel><textarea className="ce-inp" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Tell people what to expect — the vibe, who's performing, what makes it special..." rows={7} style={{ ...inp, lineHeight: 1.7 }} /></div>
              <div style={{ marginTop: 14 }}><FieldLabel>Accessibility Info</FieldLabel><textarea className="ce-inp" placeholder="e.g. Wheelchair accessible, step-free entry via Waterloo Road entrance" rows={3} style={{ ...inp, lineHeight: 1.7 }} /></div>
            </SectionCard>
          </div>

          <div id="section-lineup">
            <SectionCard title="Lineup & Schedule">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {lineup.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 120px auto', gap: 10, alignItems: 'center' }}>
                    <input className="ce-inp" value={row.act} onChange={e => updateLineup(i, 'act', e.target.value)} placeholder="Artist / act name" style={inp} />
                    <input className="ce-inp" value={row.time} onChange={e => updateLineup(i, 'time', e.target.value)} placeholder="e.g. 8:00 PM" style={inp} />
                    <select className="ce-inp" value={row.type} onChange={e => updateLineup(i, 'type', e.target.value)} style={{ ...inp, cursor: 'pointer', padding: '14px 12px' }}>
                      <option value="support">Support</option>
                      <option value="headline">Headliner</option>
                      <option value="info">Info</option>
                    </select>
                    {lineup.length > 1
                      ? <button onClick={() => removeLineupRow(i)} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,100,100,0.07)', border: '1px solid rgba(255,100,100,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,120,120,0.7)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                      : <div style={{ width: 36 }} />}
                  </div>
                ))}
                <button onClick={addLineupRow} style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderRadius: 12, background: 'transparent', border: '1px dashed rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontFamily: F, fontSize: 13, fontWeight: 600, cursor: 'pointer', width: 'fit-content' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add performer
                </button>
              </div>
            </SectionCard>
          </div>

          <div id="section-tickets">
            <SectionCard title="Tickets">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(127,224,213,0.06)', border: '1px solid rgba(127,224,213,0.15)', borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEAL }}>Free tickets only</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>happenin* is built for free events — no payment processing needed</div>
                </div>
              </div>
              <div><FieldLabel>Ticket Name</FieldLabel><input className="ce-inp" defaultValue="General Admission" style={inp} /></div>
              <div style={{ marginTop: 14 }}>
                <FieldLabel>Capacity *</FieldLabel>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input className="ce-inp" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} placeholder="e.g. 500" style={{ ...inp, width: 180 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>maximum attendees</span>
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <FieldLabel>Ticket Release</FieldLabel>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {['Immediately on publish', 'On a scheduled date'].map((opt, i) => (
                    <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, background: i === 0 ? 'rgba(127,224,213,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 0 ? 'rgba(127,224,213,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 12, padding: '12px 16px', cursor: 'pointer' }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: i === 0 ? TEAL : 'transparent', border: `2px solid ${i === 0 ? TEAL : 'rgba(255,255,255,0.2)'}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {i === 0 && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0e2a2c' }} />}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)' }}>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          </div>

          <div id="section-settings" style={{ marginBottom: 32 }}>
            <SectionCard title="Settings">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Toggle value={announcements} onChange={setAnnouncements} label="Announcements channel" sub="Organiser-only broadcast channel for all ticket holders" />
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
                <Toggle value={generalChat} onChange={setGeneralChat} label="General chat" sub="Open discussion channel for attendees and organiser" />
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
                <Toggle value={privateEvent} onChange={setPrivateEvent} label="Private event" sub="Only people with the direct link can find this event" />
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
                <div>
                  <FieldLabel>Co-organisers</FieldLabel>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input className="ce-inp" placeholder="Invite by email or username" style={{ ...inp, flex: 1 }} />
                    <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '0 20px', fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', whiteSpace: 'nowrap', height: 50 }}>Invite</button>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
