import { useState } from 'react';

const F = 'Urbanist, sans-serif';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/* ── Channel definitions ── */
type ChannelId = 'announcements' | 'crew' | 'general';
interface Channel { id: ChannelId; name: string; desc: string; badge: number; locked: boolean; internal: boolean; }

const CHANNELS: Channel[] = [
  { id: 'announcements', name: 'Announcements', desc: 'Official updates — attendees can read but not post', badge: 2, locked: true, internal: false },
  { id: 'crew',         name: 'Organiser Crew', desc: 'Internal team only — not visible to attendees',   badge: 4, locked: true, internal: true },
  { id: 'general',      name: 'General Chat',   desc: 'Open to all ticket holders and the organiser team', badge: 0, locked: false, internal: false },
];

/* ── Sample messages per channel ── */
const MSGS: Record<ChannelId, any[]> = {
  announcements: [
    { id: 1, role: 'organiser', name: 'NeonWave Events', initials: 'NW', time: '3h ago',    text: 'Welcome to the official Neon Pulse Music Festival channel! We\'ll post all updates here — set times, stage changes, venue info. See you tonight 🎶' },
    { id: 2, role: 'organiser', name: 'NeonWave Events', initials: 'NW', time: '2h ago',    text: '📍 Venue reminder — 32 Upper Ground, South Bank. Nearest tube: Waterloo (5 min walk) or Blackfriars (7 min). Rideshare drop-off is on Upper Ground.' },
    { id: 3, role: 'organiser', name: 'NeonWave Events', initials: 'NW', time: '1h ago',    hasImg: true, imgCaption: 'Stage map & set times', text: '🗺️ Here\'s the official stage map and set times for tonight. Save this for reference!' },
    { id: 4, role: 'organiser', name: 'NeonWave Events', initials: 'NW', time: '45m ago',   text: '🎵 Set times confirmed:\n\n  · Warm Up DJ — 6:30 PM\n  · Hybrid Minds — 8:00 PM\n  · Headliner — 10:00 PM\n\nDoors open at 5:30 PM. Main stage from 6:30.' },
    { id: 5, role: 'organiser', name: 'NeonWave Events', initials: 'NW', time: '20m ago',   text: '📸 Camera policy — phone cameras welcome! No professional cameras with detachable lenses. Bag check available on the ground floor, £2/item.' },
  ],
  crew: [
    { id: 1, role: 'organiser', name: 'Maya Chen',    initials: 'MC', time: '4h ago',  text: 'Evening everyone! Full attendance confirmed at 1,200. Extra bar staff are briefed and ready. Let\'s make tonight seamless 💪' },
    { id: 2, role: 'staff',     name: 'Jake Wilson',  initials: 'JW', time: '3h ago',  text: 'Security briefing is at 4 PM sharp in the green room — all front of house and gate 2 staff please attend. Lanyards required.' },
    { id: 3, role: 'admin',     name: 'Alex Park',    initials: 'AP', time: '2h 30m ago', text: 'Stage manager confirmed all equipment is on site and tested ✅  Sound check at 3:30 PM.' },
    { id: 4, role: 'staff',     name: 'Sara Liu',     initials: 'SL', time: '2h ago',  text: 'Cloakroom team — please check in by 4:30 PM. We\'re expecting peak demand in the first hour.' },
    { id: 5, role: 'organiser', name: 'Maya Chen',    initials: 'MC', time: '1h 20m ago', text: 'Quick reminder — artist rider requests have been fulfilled. Green room is stocked. VIP wristbands are at the main entrance box office.' },
    { id: 6, role: 'admin',     name: 'Alex Park',    initials: 'AP', time: '30m ago', text: 'Live stream setup is confirmed and tested. Streaming to the big screen in overflow area from 8 PM.' },
  ],
  general: [
    { id: 1, role: 'organiser', name: 'NeonWave Events', initials: 'NW', time: '2h ago',  text: 'Welcome everyone! 🎶 Doors open at 5:30 PM — this one is going to be special. See you on the South Bank tonight!' },
    { id: 2, role: 'attendee',  name: '@wave_rider',  initials: 'WR', color: '#0d2e32', time: '1h 50m ago', text: 'So hyped for Hybrid Minds!! Is there any parking nearby or best to tube it?' },
    { id: 3, role: 'organiser', name: 'NeonWave Events', initials: 'NW', time: '1h 45m ago', text: 'Best to take the tube — Waterloo is just a 5 min walk. Very limited parking available nearby.' },
    { id: 4, role: 'attendee',  name: '@deep_groove', initials: 'DG', color: '#1e1040', time: '1h 30m ago', text: 'First time at this venue — is there a cloakroom? Bringing a bag 🎒' },
    { id: 5, role: 'organiser', name: 'NeonWave Events', initials: 'NW', time: '1h 25m ago', text: 'Yes! Cloakroom on the ground floor, £2 per item. Opens from 5:00 PM. 🙌' },
    { id: 6, role: 'attendee',  name: '@neon_soul',   initials: 'NS', color: '#2a2208', time: '1h 10m ago', text: 'Anyone else on early bird tickets? Would love to meet up before it gets packed 👋' },
    { id: 7, role: 'attendee',  name: '@bass_echo',   initials: 'BE', color: '#0a2a18', time: '45m ago',    text: "DJ Mara's set at Fabric last month was 🔥 tonight is going to be next level" },
    { id: 8, role: 'attendee',  name: '@city_lights', initials: 'CL', color: '#2e1508', time: '20m ago',    text: 'Just checked in — the vibes outside already 🙌 See you all in there!' },
  ],
};

/* ── Member list per channel ── */
const MEMBERS: Record<ChannelId, any[]> = {
  announcements: [
    { name: 'Maya Chen',    role: 'organiser', initials: 'MC', online: true },
    { name: 'Jake Wilson',  role: 'staff',     initials: 'JW', online: true },
    { name: 'Alex Park',    role: 'admin',     initials: 'AP', online: true },
    { name: 'Sara Liu',     role: 'staff',     initials: 'SL', online: false },
    { name: '842 attendees', role: 'attendee', initials: '—',  online: false, isCount: true },
  ],
  crew: [
    { name: 'Maya Chen',    role: 'organiser', initials: 'MC', online: true },
    { name: 'Jake Wilson',  role: 'staff',     initials: 'JW', online: true },
    { name: 'Alex Park',    role: 'admin',     initials: 'AP', online: true },
    { name: 'Sara Liu',     role: 'staff',     initials: 'SL', online: false },
    { name: 'Tom Reid',     role: 'staff',     initials: 'TR', online: true },
    { name: 'Priya Nair',   role: 'staff',     initials: 'PN', online: false },
  ],
  general: [
    { name: 'Maya Chen',    role: 'organiser', initials: 'MC', online: true },
    { name: 'Jake Wilson',  role: 'staff',     initials: 'JW', online: true },
    { name: '@wave_rider',  role: 'attendee',  initials: 'WR', online: true,  color: '#0d2e32' },
    { name: '@deep_groove', role: 'attendee',  initials: 'DG', online: true,  color: '#1e1040' },
    { name: '@neon_soul',   role: 'attendee',  initials: 'NS', online: true,  color: '#2a2208' },
    { name: '@bass_echo',   role: 'attendee',  initials: 'BE', online: false, color: '#0a2a18' },
    { name: '@city_lights', role: 'attendee',  initials: 'CL', online: true,  color: '#2e1508' },
    { name: '+ 240 more',   role: 'attendee',  initials: '…',  online: false, isCount: true },
  ],
};

const ROLE_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  organiser: { bg: 'rgba(127,224,213,0.12)', text: '#7FE0D5', label: 'Organiser' },
  staff:     { bg: 'rgba(235,232,138,0.12)', text: '#EBE88A', label: 'Staff' },
  admin:     { bg: 'rgba(177,216,212,0.12)', text: '#B1D8D4', label: 'Admin' },
  attendee:  { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.4)', label: 'Attendee' },
};

/* ── Sub-components ── */
function ChannelIcon({ id, size = 16, color = 'rgba(255,255,255,0.4)' }: { id: ChannelId; size?: number; color?: string }) {
  if (id === 'announcements') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  );
  if (id === 'crew') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function Avatar({ initials, role, size = 36, color }: { initials: string; role: string; size?: number; color?: string }) {
  const rc = ROLE_COLORS[role] || ROLE_COLORS.attendee;
  const bg = color || (role === 'organiser' ? '#0e2a2c' : role === 'staff' ? '#1e1a08' : role === 'admin' ? '#0a1828' : '#1a1a1a');
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg, border: `1.5px solid ${rc.text}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: F, fontSize: size * 0.35, fontWeight: 700, color: rc.text }}>{initials}</span>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const rc = ROLE_COLORS[role];
  if (!rc || role === 'attendee') return null;
  return (
    <span style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: '0.8px', color: rc.text, background: rc.bg, border: `1px solid ${rc.text}25`, borderRadius: 4, padding: '2px 6px', textTransform: 'uppercase' }}>{rc.label}</span>
  );
}

function MessageRow({ msg, canModerate, hoveredId, setHoveredId }: { msg: any; canModerate: boolean; hoveredId: number | null; setHoveredId: (id: number | null) => void }) {
  const isHov = hoveredId === msg.id;
  const rc = ROLE_COLORS[msg.role] || ROLE_COLORS.attendee;
  return (
    <div
      onMouseEnter={() => setHoveredId(msg.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{ display: 'flex', gap: 14, padding: '10px 28px', position: 'relative', background: isHov ? 'rgba(255,255,255,0.018)' : 'transparent', transition: 'background 0.12s' }}
    >
      <Avatar initials={msg.initials} role={msg.role} color={msg.color} size={38}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: msg.role === 'attendee' ? 'rgba(255,255,255,0.75)' : rc.text }}>{msg.name}</span>
          <RoleBadge role={msg.role}/>
          <span style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{msg.time}</span>
        </div>
        <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{msg.text}</div>
        {msg.hasImg && (
          <div style={{ marginTop: 10, borderRadius: 12, overflow: 'hidden', display: 'inline-block', maxWidth: 380 }}>
            <div style={{ background: 'linear-gradient(135deg, #0e2a2c 0%, #1a4a4e 50%, #0a1e20 100%)', width: 380, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, border: '1px solid rgba(127,224,213,0.15)', borderRadius: 12 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.5)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(127,224,213,0.55)', fontWeight: 500 }}>{msg.imgCaption}</span>
            </div>
          </div>
        )}
      </div>
      {/* Moderation toolbar on hover */}
      {canModerate && isHov && (
        <div style={{ position: 'absolute', top: 8, right: 20, display: 'flex', gap: 2, background: '#111416', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '4px 6px' }}>
          {[
            { title: 'Pin',    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
            { title: 'Delete', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>, danger: true },
            { title: 'Warn',   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
          ].map(a => (
            <button key={a.title} title={a.title} style={{ background: 'none', border: 'none', padding: '4px 6px', borderRadius: 6, color: a.danger ? 'rgba(255,90,90,0.7)' : 'rgba(255,255,255,0.45)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {a.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function OrganizerHub() {
  const [activeChannel, setActiveChannel] = useState<ChannelId>('announcements');
  const [input, setInput] = useState('');
  const [hoveredMsg, setHoveredMsg] = useState<number | null>(null);
  const [slowMode, setSlowMode] = useState(false);
  const [muteChat, setMuteChat] = useState(false);
  const ch = CHANNELS.find(c => c.id === activeChannel)!;
  const msgs = MSGS[activeChannel];
  const members = MEMBERS[activeChannel];

  return (
    <div style={{ height: '100vh', background: '#080a0b', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: F }}>
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .ch-item:hover { background: rgba(255,255,255,0.04) !important; }
        .mod-btn:hover { background: rgba(255,255,255,0.07) !important; color: #fff !important; }
        .msg-feed::-webkit-scrollbar { width: 4px; }
        .msg-feed::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 4px; }
        .members-list::-webkit-scrollbar { width: 3px; }
        .members-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 3px; }
      `}</style>

      {/* ── Navbar ── */}
      <div style={{ position: 'relative', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#080a0b', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ background: 'rgba(177,216,212,0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 22px' }}>
            <img src={LOGO_URL} alt="happenin" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
          </div>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Neon Pulse Music Festival</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            <span style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>Event Hub</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Organiser pill */}
          <div style={{ background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 9999, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7FE0D5', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#7FE0D5' }}>Live · 247 online</span>
          </div>
          <Avatar initials="MC" role="organiser" size={40}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Maya Chen</div>
            <div style={{ fontSize: 11, color: '#7FE0D5', fontWeight: 600 }}>Organiser</div>
          </div>
        </div>
      </div>

      {/* ── 3-column layout ── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '272px 1fr 276px', overflow: 'hidden' }}>

        {/* ── Left sidebar ── */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.18)', overflow: 'hidden' }}>
          {/* Event card */}
          <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ background: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', borderRadius: 14, padding: '16px 18px', border: '1px solid rgba(127,224,213,0.12)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.5)', marginBottom: 6 }}>Event</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 4 }}>Neon Pulse<br/>Music Festival</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Sat 14 Jun · South Bank, London</div>
            </div>
          </div>

          {/* Channel list */}
          <div style={{ padding: '18px 14px 10px', flex: 1, overflowY: 'auto' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10, paddingLeft: 6 }}>Channels</div>
            {CHANNELS.map(c => {
              const isActive = c.id === activeChannel;
              return (
                <div key={c.id} className="ch-item" onClick={() => setActiveChannel(c.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 10px', borderRadius: 10, cursor: 'pointer', background: isActive ? 'rgba(127,224,213,0.08)' : 'transparent', borderLeft: `3px solid ${isActive ? '#7FE0D5' : 'transparent'}`, marginBottom: 4, transition: 'all 0.15s' }}>
                  <ChannelIcon id={c.id} color={isActive ? '#7FE0D5' : 'rgba(255,255,255,0.35)'}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                    {c.internal && <div style={{ fontSize: 10, color: 'rgba(235,232,138,0.5)', fontWeight: 600, letterSpacing: '0.5px' }}>INTERNAL</div>}
                  </div>
                  {c.badge > 0 && (
                    <div style={{ background: '#7FE0D5', borderRadius: 9999, minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#0e2a2c' }}>{c.badge}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add Channel */}
            <div style={{ marginTop: 16, padding: '0 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px', borderRadius: 10, border: '1px dashed rgba(255,255,255,0.1)', cursor: 'pointer', opacity: 0.5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Add Channel</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main chat area ── */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Channel header */}
          <div style={{ padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <ChannelIcon id={ch.id} size={18} color="#7FE0D5"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{ch.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{ch.desc}</div>
            </div>
            {/* Channel badges */}
            {ch.locked && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(235,232,138,0.08)', border: '1px solid rgba(235,232,138,0.2)', borderRadius: 8, padding: '5px 12px' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#EBE88A" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#EBE88A' }}>{ch.id === 'crew' ? 'Internal only' : 'Organiser posts only'}</span>
              </div>
            )}
            {ch.id === 'general' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(127,224,213,0.06)', border: '1px solid rgba(127,224,213,0.15)', borderRadius: 8, padding: '5px 12px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7FE0D5' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#7FE0D5' }}>247 active</span>
              </div>
            )}
            {/* Settings icon */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="msg-feed" style={{ flex: 1, overflowY: 'auto', paddingTop: 12, paddingBottom: 8 }}>
            {/* Welcome rule banner */}
            <div style={{ margin: '0 28px 16px', background: 'rgba(127,224,213,0.04)', border: '1px solid rgba(127,224,213,0.1)', borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontSize: 13, color: 'rgba(177,216,212,0.55)', lineHeight: 1.6 }}>
                {ch.id === 'announcements' && 'This is the Announcements channel. Only the organiser team can post here. All ticket holders can read.'}
                {ch.id === 'crew' && 'This is an internal channel for your event team only. Attendees cannot see or join this channel.'}
                {ch.id === 'general' && 'Welcome to General Chat. All ticket holders and the organiser team can read and post here.'}
              </span>
            </div>
            {msgs.map(m => <MessageRow key={m.id} msg={m} canModerate hoveredId={hoveredMsg} setHoveredId={setHoveredMsg}/>)}
          </div>

          {/* Input bar */}
          <div style={{ padding: '14px 24px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
            {ch.id === 'announcements' && (
              <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(235,232,138,0.6)" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(235,232,138,0.5)', letterSpacing: '0.3px' }}>Posting as Organiser — attendees cannot reply in this channel</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: '10px 14px' }}>
              {/* Image attach */}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 4, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </button>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
              <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Post to #${ch.name}…`} style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontFamily: F, fontSize: 14 }} />
              <button style={{ background: input.trim() ? '#EBE88A' : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 10, padding: '8px 20px', color: input.trim() ? '#0e2a2c' : 'rgba(255,255,255,0.2)', fontFamily: F, fontSize: 13, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.15s' }}>Send</button>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.12)', overflow: 'hidden' }}>

          {/* Members */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }} className="members-list">
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 14, paddingLeft: 4 }}>
              {ch.id === 'crew' ? 'Crew Members' : ch.id === 'announcements' ? 'Team' : 'Online Now'}
            </div>
            {members.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 4px', opacity: m.isCount ? 0.45 : 1 }}>
                {!m.isCount
                  ? <div style={{ position: 'relative' }}>
                      <Avatar initials={m.initials} role={m.role} color={m.color} size={32}/>
                      <div style={{ position: 'absolute', bottom: -1, right: -1, width: 9, height: 9, borderRadius: '50%', background: m.online ? '#4ade80' : 'rgba(255,255,255,0.18)', border: '2px solid #080a0b' }} />
                    </div>
                  : <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>…</span>
                    </div>
                }
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: m.isCount ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                  {!m.isCount && <div style={{ fontSize: 10, color: ROLE_COLORS[m.role]?.text || 'rgba(255,255,255,0.3)', fontWeight: 600, marginTop: 1 }}>{ROLE_COLORS[m.role]?.label}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Moderation tools */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 16px 20px', flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 14, paddingLeft: 4 }}>Moderation</div>

            {/* Slow mode toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 10, marginBottom: 6, background: 'rgba(255,255,255,0.025)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Slow mode (30s)</span>
              </div>
              <div onClick={() => setSlowMode(!slowMode)}
                style={{ width: 36, height: 20, borderRadius: 10, background: slowMode ? '#7FE0D5' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: 3, left: slowMode ? 18 : 3, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
              </div>
            </div>

            {/* Mute channel toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 10, marginBottom: 10, background: 'rgba(255,255,255,0.025)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/>{muteChat && <line x1="23" y1="9" x2="17" y2="15"/>}{muteChat && <line x1="17" y1="9" x2="23" y2="15"/>}</svg>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Mute channel</span>
              </div>
              <div onClick={() => setMuteChat(!muteChat)}
                style={{ width: 36, height: 20, borderRadius: 10, background: muteChat ? '#EBE88A' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: 3, left: muteChat ? 18 : 3, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
              </div>
            </div>

            {/* Action buttons */}
            {[
              { label: 'Export chat log',     icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
              { label: 'Clear all messages',  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>, danger: true },
            ].map(a => (
              <button key={a.label} className="mod-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.025)', border: 'none', borderRadius: 10, padding: '9px 10px', color: a.danger ? 'rgba(255,90,90,0.55)' : 'rgba(255,255,255,0.45)', fontFamily: F, fontSize: 12, fontWeight: 500, cursor: 'pointer', marginBottom: 5, textAlign: 'left', transition: 'all 0.15s' }}>
                {a.icon}{a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
