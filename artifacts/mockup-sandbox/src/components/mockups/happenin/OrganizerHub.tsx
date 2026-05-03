import { useState } from 'react';

const F = 'Urbanist, sans-serif';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;

type ChannelId = 'announcements' | 'general';

const CHANNELS = [
  {
    id: 'announcements' as ChannelId,
    name: 'Announcements',
    desc: 'Official updates from the organiser. Attendees can read but not post.',
    badge: 2,
    readOnly: true,
    color: '#7FE0D5',
  },
  {
    id: 'general' as ChannelId,
    name: 'General Chat',
    desc: 'Open to all ticket holders and the organiser team.',
    badge: 0,
    readOnly: false,
    color: '#B1D8D4',
  },
];

const MSGS: Record<ChannelId, any[]> = {
  announcements: [
    { id: 1, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '3h ago', readers: 842, text: 'Welcome to the official Neon Pulse channel! All updates — set times, stage changes, venue info — will be posted here. See you tonight 🎶' },
    { id: 2, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '2h ago', readers: 791, text: '📍 Venue reminder — 32 Upper Ground, South Bank. Nearest tube: Waterloo (5 min walk) or Blackfriars (7 min). Rideshare drop-off on Upper Ground.' },
    { id: 3, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '1h ago', readers: 634, hasImg: true, imgCaption: 'Stage map & set times — save this!', text: '🗺️ Official stage map and full set times for tonight.' },
    { id: 4, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '45m ago', readers: 510, text: '🎵 Set times confirmed:\n\nWarm Up DJ  ·  6:30 PM\nHybrid Minds  ·  8:00 PM\nHeadliner  ·  10:00 PM\n\nDoors open at 5:30 PM.' },
    { id: 5, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '20m ago', readers: 312, text: '📸 Camera policy — phone cameras welcome! No professional cameras with detachable lenses. Bag check ground floor, £2/item.' },
  ],
  general: [
    { id: 1, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '2h ago', text: 'Welcome everyone! 🎶 Doors open at 5:30 PM — see you on the South Bank tonight!' },
    { id: 2, role: 'attendee', name: '@wave_rider', ini: 'WR', time: '1h 50m ago', text: 'Is there parking nearby or best to tube it?', ac: '#0d2e32' },
    { id: 3, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '1h 45m ago', text: 'Tube is best — Waterloo is a 5 min walk. Very limited parking available nearby.' },
    { id: 4, role: 'attendee', name: '@deep_groove', ini: 'DG', time: '1h 30m ago', text: 'First time at this venue — is there a cloakroom? 🎒', ac: '#1e1040' },
    { id: 5, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '1h 25m ago', text: 'Yes! Ground floor, £2 per item. Opens from 5:00 PM 🙌' },
    { id: 6, role: 'attendee', name: '@neon_soul', ini: 'NS', time: '1h 10m ago', text: 'Anyone else on early bird? Would love to meet before it gets packed 👋', ac: '#2a2208' },
    { id: 7, role: 'attendee', name: '@bass_echo', ini: 'BE', time: '45m ago', text: "DJ Mara's set at Fabric last month was 🔥 tonight will be next level", ac: '#0a2a18' },
    { id: 8, role: 'attendee', name: '@city_lights', ini: 'CL', time: '20m ago', text: 'Just checked in — vibes outside already 🙌', ac: '#2e1508' },
  ],
};

const RC: Record<string, { bg: string; text: string; label: string }> = {
  organiser: { bg: '#0e2a2c', text: '#7FE0D5', label: 'Organiser' },
  attendee: { bg: '#1a1a1a', text: 'rgba(255,255,255,0.5)', label: '' },
};

function Av({ ini, role, size = 38, bg }: { ini: string; role: string; size?: number; bg?: string }) {
  const rc = RC[role] || RC.attendee;
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg || rc.bg, border: `1.5px solid ${rc.text}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: F, fontSize: size * 0.33, fontWeight: 800, color: rc.text, letterSpacing: '-0.3px' }}>{ini}</span>
    </div>
  );
}

function ChIcon({ id, size = 16, color = 'currentColor' }: { id: ChannelId; size?: number; color?: string }) {
  if (id === 'announcements') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}

function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Event Hub</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 4 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        <div style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', cursor: 'pointer', boxShadow: '0 0 0 1px rgba(235,232,138,0.18) inset' }}>
          <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c', whiteSpace: 'nowrap' }}>Maya Chen</span>
        </div>
      </div>
    </div>
  );
}

export function OrganizerHub() {
  const [active, setActive] = useState<ChannelId>('announcements');
  const [input, setInput] = useState('');
  const [hovered, setHovered] = useState<number | null>(null);
  const ch = CHANNELS.find(c => c.id === active)!;
  const msgs = MSGS[active];

  return (
    <div style={{ height: '100vh', background: '#080a0b', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: F }}>
      <style>{`
        .ch-card:hover { background: rgba(127,224,213,0.05) !important; border-color: rgba(127,224,213,0.18) !important; }
        .feed::-webkit-scrollbar { width: 4px; }
        .feed::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius:4px; }
      `}</style>

      <Navbar />

      <div style={{ marginTop: 125, borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 56px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 80, flexShrink: 0 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.5)', marginBottom: 4 }}>Event</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.6px', lineHeight: 1 }}>Neon Pulse Music Festival</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginTop: 6 }}>Sat 14 Jun 2025 · 5:30 PM</div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '380px 1fr', overflow: 'hidden' }}>
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.15)', overflow: 'hidden' }}>
          <div style={{ padding: '24px 28px 16px', flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>Channels</div>
          </div>
          <div style={{ flex: 1, padding: '0 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHANNELS.map(c => {
              const isActive = c.id === active;
              return (
                <div key={c.id} className="ch-card" onClick={() => setActive(c.id)} style={{ position: 'relative', padding: '18px 20px', borderRadius: 16, border: `1.5px solid ${isActive ? `${c.color}45` : 'rgba(255,255,255,0.07)'}`, background: isActive ? `${c.color}0a` : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.18s', boxShadow: isActive ? `0 0 24px ${c.color}10` : 'none' }}>
                  {isActive && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3, borderRadius: '0 3px 3px 0', background: c.color }} />}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `${c.color}12`, border: `1px solid ${c.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <ChIcon id={c.id} size={17} color={isActive ? c.color : `${c.color}70`}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: isActive ? '#fff' : 'rgba(255,255,255,0.55)', letterSpacing: '-0.3px' }}>{c.name}</span>
                        {c.readOnly && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1px', color: '#7FE0D5', background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.18)', borderRadius: 5, padding: '2px 7px', textTransform: 'uppercase' }}>Read-only</span>}
                        {c.badge > 0 && <div style={{ marginLeft: 'auto', background: c.color, borderRadius: 9999, minWidth: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}><span style={{ fontSize: 10, fontWeight: 800, color: '#0e2a2c' }}>{c.badge}</span></div>}
                      </div>
                      <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{c.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 16, border: '1.5px dashed rgba(255,255,255,0.08)', cursor: 'pointer', opacity: 0.45, marginTop: 4 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Add Channel</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ height: 2, background: `linear-gradient(90deg, ${ch.color} 0%, ${ch.color}00 55%)` }} />
            <div style={{ padding: '16px 40px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: `${ch.color}12`, border: `1px solid ${ch.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ChIcon id={ch.id} size={16} color={ch.color}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>{ch.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{ch.desc}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>].map((ico, i) => <div key={i} style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>{ico}</div>)}
              </div>
            </div>
          </div>

          <div className="feed" style={{ flex: 1, overflowY: 'auto', padding: '20px 0 8px' }}>
            <div style={{ margin: '0 40px 20px', background: `${ch.color}07`, border: `1px solid ${ch.color}16`, borderRadius: 12, padding: '11px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontSize: 13, color: `${ch.color}80`, lineHeight: 1.6 }}>{ch.id === 'announcements' ? 'Announcements channel — organiser posts only. All 842 ticket holders can read.' : 'General Chat — open to all ticket holders and the organiser team.'}</span>
            </div>

            {msgs.map(m => (
              <div key={m.id} className="msg-row" onMouseEnter={() => setHovered(m.id)} onMouseLeave={() => setHovered(null)} style={{ position: 'relative', display: 'flex', gap: 16, padding: '11px 40px', background: hovered === m.id ? 'rgba(255,255,255,0.016)' : 'transparent', transition: 'background 0.12s' }}>
                <Av ini={m.ini} role={m.role} bg={m.ac} size={42}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: m.role === 'organiser' ? '#7FE0D5' : 'rgba(255,255,255,0.8)', letterSpacing: '-0.2px' }}>{m.name}</span>
                    {m.role !== 'attendee' && <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.7px', color: RC.organiser.text, background: `${RC.organiser.text}18`, border: `1px solid ${RC.organiser.text}28`, borderRadius: 5, padding: '2px 7px', textTransform: 'uppercase' }}>{RC.organiser.label}</span>}
                    <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.2)' }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, whiteSpace: 'pre-line', letterSpacing: '-0.1px' }}>{m.text}</div>
                  {m.hasImg && <div style={{ marginTop: 12, background: 'linear-gradient(135deg,#0d2830,#0e3a3e,#091e22)', border: `1px solid ${ch.color}18`, borderRadius: 14, width: 360, height: 190, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}><div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,rgba(127,224,213,0.035) 0,rgba(127,224,213,0.035) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(127,224,213,0.035) 0,rgba(127,224,213,0.035) 1px,transparent 1px,transparent 40px)' }} /><div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}><div style={{ width: 48, height: 48, borderRadius: 14, background: `${ch.color}15`, border: `1px solid ${ch.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div><span style={{ fontSize: 13.5, fontWeight: 600, color: `${ch.color}90` }}>{m.imgCaption}</span></div></div>}
                  {m.readers && <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontWeight: 500 }}>{m.readers.toLocaleString()} read</span></div>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '14px 36px 22px', flexShrink: 0 }}>
            {ch.readOnly && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(235,232,138,0.5)" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(235,232,138,0.45)' }}>Posting as Organiser — attendees cannot reply in this channel</span></div>}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,0.035)', border: `1.5px solid ${input.trim() ? `${ch.color}35` : 'rgba(255,255,255,0.08)'}`, borderRadius: 18, padding: '12px 14px', transition: 'border-color 0.2s' }}>
              <Av ini="MC" role="organiser" size={36}/>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.07)', flexShrink: 0 }} />
              <button style={{ background: 'none', border: 'none', padding: 4, color: 'rgba(255,255,255,0.22)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </button>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Post to #${ch.name}…`} style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontFamily: F, fontSize: 14.5 }} />
              <button style={{ background: input.trim() ? ch.color : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 12, padding: '10px 24px', color: input.trim() ? '#0e2a2c' : 'rgba(255,255,255,0.2)', fontFamily: F, fontSize: 14, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.18s' }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
