import { useState } from 'react';

const F = 'Urbanist, sans-serif';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;

type ChannelId = 'announcements' | 'crew' | 'general';

const CHANNELS = [
  { id: 'announcements' as ChannelId, name: 'Announcements', desc: 'Official updates from the organiser team', badge: 2, readOnly: true, internal: false, color: '#7FE0D5' },
  { id: 'crew'         as ChannelId, name: 'Organiser Crew', desc: 'Internal coordination — not visible to attendees', badge: 4, readOnly: false, internal: true, color: '#EBE88A' },
  { id: 'general'      as ChannelId, name: 'General Chat',   desc: 'Open to all ticket holders', badge: 0, readOnly: false, internal: false, color: '#B1D8D4' },
];

const MSGS: Record<ChannelId, any[]> = {
  announcements: [
    { id: 1, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '3h ago', readers: 842, text: 'Welcome to the official Neon Pulse channel! All updates — set times, stage changes, venue info — will be posted here. See you tonight 🎶' },
    { id: 2, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '2h ago', readers: 791, text: '📍 Venue reminder — 32 Upper Ground, South Bank. Nearest tube: Waterloo (5 min walk) or Blackfriars (7 min). Rideshare drop-off on Upper Ground.' },
    { id: 3, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '1h ago', readers: 634, hasImg: true, imgCaption: 'Stage map & set times — save this!', text: '🗺️ Official stage map and set times for tonight. Tap to expand.' },
    { id: 4, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '45m ago', readers: 510, text: '🎵 Set times confirmed:\n\nWarm Up DJ  —  6:30 PM\nHybrid Minds  —  8:00 PM\nHeadliner  —  10:00 PM\n\nDoors open at 5:30 PM.' },
    { id: 5, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '20m ago', readers: 312, text: '📸 Camera policy — phone cameras welcome! No professional cameras with detachable lenses. Bag check ground floor, £2/item.' },
  ],
  crew: [
    { id: 1, role: 'organiser', name: 'Maya Chen',   ini: 'MC', time: '4h ago',     text: 'Full attendance at 1,200 tonight. Extra bar staff briefed. Let\'s make this seamless 💪' },
    { id: 2, role: 'staff',     name: 'Jake Wilson', ini: 'JW', time: '3h ago',     text: 'Security briefing at 4 PM sharp in the green room — all front of house and gate 2 staff, lanyards required.' },
    { id: 3, role: 'admin',     name: 'Alex Park',   ini: 'AP', time: '2h 30m ago', text: 'Stage manager confirmed all equipment on site and tested ✅  Sound check 3:30 PM.' },
    { id: 4, role: 'staff',     name: 'Sara Liu',    ini: 'SL', time: '2h ago',     text: 'Cloakroom team — check in by 4:30 PM. Peak demand expected first hour.' },
    { id: 5, role: 'organiser', name: 'Maya Chen',   ini: 'MC', time: '1h 20m ago', text: 'Artist rider fulfilled, green room stocked. VIP wristbands at main entrance box office.' },
    { id: 6, role: 'admin',     name: 'Alex Park',   ini: 'AP', time: '30m ago',    text: 'Live stream setup confirmed. Streaming to overflow screen from 8 PM ✅' },
  ],
  general: [
    { id: 1, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '2h ago',     text: 'Welcome everyone! 🎶 Doors open at 5:30 PM — see you on the South Bank tonight!' },
    { id: 2, role: 'attendee',  name: '@wave_rider',     ini: 'WR', time: '1h 50m ago', text: 'Is there parking nearby or best to tube it?', aColor: '#0d2e32' },
    { id: 3, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '1h 45m ago', text: 'Tube is best — Waterloo is a 5 min walk. Very limited parking available nearby.' },
    { id: 4, role: 'attendee',  name: '@deep_groove',    ini: 'DG', time: '1h 30m ago', text: 'First time at this venue — is there a cloakroom? 🎒', aColor: '#1e1040' },
    { id: 5, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '1h 25m ago', text: 'Yes! Ground floor, £2 per item. Opens from 5:00 PM 🙌' },
    { id: 6, role: 'attendee',  name: '@neon_soul',      ini: 'NS', time: '1h 10m ago', text: 'Anyone else on early bird? Would love to meet before it gets packed 👋', aColor: '#2a2208' },
    { id: 7, role: 'attendee',  name: '@bass_echo',      ini: 'BE', time: '45m ago',    text: 'DJ Mara\'s set at Fabric last month was 🔥 tonight will be next level', aColor: '#0a2a18' },
    { id: 8, role: 'attendee',  name: '@city_lights',    ini: 'CL', time: '20m ago',    text: 'Just checked in — vibes outside already 🙌', aColor: '#2e1508' },
  ],
};

const MEMBERS: Record<ChannelId, any[]> = {
  announcements: [
    { name: 'Maya Chen',   role: 'organiser', ini: 'MC', online: true },
    { name: 'Jake Wilson', role: 'staff',     ini: 'JW', online: true },
    { name: 'Alex Park',   role: 'admin',     ini: 'AP', online: true },
    { name: 'Sara Liu',    role: 'staff',     ini: 'SL', online: false },
    { name: '842 readers', role: 'count',     ini: '…',  online: false },
  ],
  crew: [
    { name: 'Maya Chen',   role: 'organiser', ini: 'MC', online: true },
    { name: 'Jake Wilson', role: 'staff',     ini: 'JW', online: true },
    { name: 'Alex Park',   role: 'admin',     ini: 'AP', online: true },
    { name: 'Sara Liu',    role: 'staff',     ini: 'SL', online: false },
    { name: 'Tom Reid',    role: 'staff',     ini: 'TR', online: true },
    { name: 'Priya Nair',  role: 'staff',     ini: 'PN', online: false },
  ],
  general: [
    { name: 'Maya Chen',    role: 'organiser', ini: 'MC', online: true },
    { name: 'Jake Wilson',  role: 'staff',     ini: 'JW', online: true },
    { name: '@wave_rider',  role: 'attendee',  ini: 'WR', online: true,  aColor: '#0d2e32' },
    { name: '@deep_groove', role: 'attendee',  ini: 'DG', online: true,  aColor: '#1e1040' },
    { name: '@neon_soul',   role: 'attendee',  ini: 'NS', online: true,  aColor: '#2a2208' },
    { name: '@bass_echo',   role: 'attendee',  ini: 'BE', online: false, aColor: '#0a2a18' },
    { name: '@city_lights', role: 'attendee',  ini: 'CL', online: true,  aColor: '#2e1508' },
    { name: '+ 240 more',   role: 'count',     ini: '…',  online: false },
  ],
};

/* Role colour map */
const RC: Record<string, { avatar: string; badge: string; label: string }> = {
  organiser: { avatar: '#0e2a2c', badge: '#7FE0D5', label: 'Organiser' },
  staff:     { avatar: '#1e1a08', badge: '#EBE88A', label: 'Staff' },
  admin:     { avatar: '#0a1828', badge: '#B1D8D4', label: 'Admin' },
  attendee:  { avatar: '#1a1a1a', badge: 'rgba(255,255,255,0.25)', label: '' },
  count:     { avatar: '#111', badge: '', label: '' },
};

function AvatarCircle({ ini, role, size = 38, aColor }: { ini: string; role: string; size?: number; aColor?: string }) {
  const rc = RC[role] || RC.attendee;
  const bg = aColor || rc.avatar;
  const textColor = role === 'organiser' ? '#7FE0D5' : role === 'staff' ? '#EBE88A' : role === 'admin' ? '#B1D8D4' : 'rgba(255,255,255,0.6)';
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg, border: `1.5px solid ${rc.badge}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: F, fontSize: size * 0.34, fontWeight: 800, color: textColor, letterSpacing: '-0.3px' }}>{ini}</span>
    </div>
  );
}

/* Channel icons */
function ChIcon({ id, size = 15, color = 'currentColor' }: { id: ChannelId; size?: number; color?: string }) {
  if (id === 'announcements') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>;
  if (id === 'crew') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}

function RolePill({ role }: { role: string }) {
  if (!role || role === 'attendee' || role === 'count') return null;
  const rc = RC[role];
  return <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.7px', color: rc.badge, background: `${rc.badge}18`, border: `1px solid ${rc.badge}30`, borderRadius: 5, padding: '2px 7px', textTransform: 'uppercase', flexShrink: 0 }}>{rc.label}</span>;
}

export function OrganizerHub() {
  const [active, setActive] = useState<ChannelId>('announcements');
  const [input, setInput] = useState('');
  const [hovered, setHovered] = useState<number | null>(null);
  const [slowMode, setSlowMode] = useState(false);
  const [muteChat, setMuteChat] = useState(false);

  const ch = CHANNELS.find(c => c.id === active)!;
  const msgs = MSGS[active];
  const members = MEMBERS[active];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#07090a', display: 'grid', gridTemplateColumns: '72px 268px 1fr 268px', overflow: 'hidden', fontFamily: F }}>
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.75)} }
        .ch-row:hover { background: rgba(127,224,213,0.05) !important; }
        .mod-btn:hover { background: rgba(255,255,255,0.06) !important; color: rgba(255,255,255,0.7) !important; }
        .msg-row:hover .mod-toolbar { opacity: 1 !important; }
        .feed::-webkit-scrollbar { width: 3px; }
        .feed::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 3px; }
        .members-scroll::-webkit-scrollbar { width: 3px; }
        .members-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 3px; }
      `}</style>

      {/* ── Col 1: Icon strip ── */}
      <div style={{ background: '#050607', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, paddingBottom: 20, gap: 6 }}>
        {/* Logo */}
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, flexShrink: 0 }}>
          <img src={LOGO_URL} alt="h" style={{ width: 28, height: 28, objectFit: 'contain' }} />
        </div>

        {/* Divider */}
        <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.07)', margin: '4px 0 8px' }} />

        {/* Channel icon buttons */}
        {CHANNELS.map(c => {
          const isActive = c.id === active;
          return (
            <div key={c.id} onClick={() => setActive(c.id)} title={c.name}
              style={{ position: 'relative', width: 46, height: 46, borderRadius: 14, background: isActive ? `${c.color}18` : 'transparent', border: `1px solid ${isActive ? `${c.color}40` : 'transparent'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s', flexShrink: 0 }}>
              <ChIcon id={c.id} size={18} color={isActive ? c.color : 'rgba(255,255,255,0.3)'}/>
              {c.badge > 0 && (
                <div style={{ position: 'absolute', top: 6, right: 6, width: 14, height: 14, borderRadius: '50%', background: '#7FE0D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 8, fontWeight: 800, color: '#0e2a2c' }}>{c.badge}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Spacer */}
        <div style={{ flex: 1 }} />
        <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 8 }} />

        {/* Settings + avatar */}
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.25)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </div>
        <AvatarCircle ini="MC" role="organiser" size={38}/>
      </div>

      {/* ── Col 2: Channel sidebar ── */}
      <div style={{ background: '#090b0c', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Event header */}
        <div style={{ padding: '22px 18px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.45)', marginBottom: 8 }}>Event Hub</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.25, letterSpacing: '-0.4px', marginBottom: 4 }}>Neon Pulse<br/>Music Festival</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Sat 14 Jun · South Bank, London</div>
          {/* Live pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(127,224,213,0.07)', border: '1px solid rgba(127,224,213,0.15)', borderRadius: 8, padding: '5px 12px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7FE0D5', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#7FE0D5' }}>247 online now</span>
          </div>
        </div>

        {/* Channel list */}
        <div style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }} className="members-scroll">
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', padding: '0 8px', marginBottom: 8 }}>Channels</div>
          {CHANNELS.map(c => {
            const isActive = c.id === active;
            return (
              <div key={c.id} className="ch-row" onClick={() => setActive(c.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 10, cursor: 'pointer', background: isActive ? `${c.color}0e` : 'transparent', borderLeft: `2.5px solid ${isActive ? c.color : 'transparent'}`, marginBottom: 3, transition: 'all 0.15s' }}>
                <ChIcon id={c.id} size={14} color={isActive ? c.color : 'rgba(255,255,255,0.3)'}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', letterSpacing: '-0.2px' }}>{c.name}</div>
                  {c.internal && <div style={{ fontSize: 9.5, fontWeight: 700, color: '#EBE88A80', letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: 1 }}>Internal</div>}
                </div>
                {c.badge > 0 && (
                  <div style={{ background: c.color, borderRadius: 9999, minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
                    <span style={{ fontSize: 9.5, fontWeight: 800, color: '#0e2a2c' }}>{c.badge}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add channel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', marginTop: 8, borderRadius: 10, cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.08)', opacity: 0.5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Add Channel</span>
          </div>
        </div>

        {/* User card */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '14px 14px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvatarCircle ini="MC" role="organiser" size={34}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>Maya Chen</div>
            <div style={{ fontSize: 11, color: '#7FE0D5', fontWeight: 600 }}>Organiser</div>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {[
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            ].map((icon, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.25)', cursor: 'pointer' }}>{icon}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Col 3: Main chat ── */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#07090a' }}>

        {/* Channel header — bold, teal-accented */}
        <div style={{ padding: '0 0 0 0', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          {/* Teal gradient bar at top */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${ch.color} 0%, ${ch.color}00 60%)` }} />
          <div style={{ padding: '18px 32px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `${ch.color}14`, border: `1px solid ${ch.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ChIcon id={ch.id} size={18} color={ch.color}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{ch.name}</span>
                {ch.internal && <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '1px', color: '#EBE88A', background: 'rgba(235,232,138,0.1)', border: '1px solid rgba(235,232,138,0.2)', borderRadius: 5, padding: '2px 8px', textTransform: 'uppercase' }}>Internal</span>}
                {ch.readOnly && <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '1px', color: '#7FE0D5', background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.18)', borderRadius: 5, padding: '2px 8px', textTransform: 'uppercase' }}>Read-only for attendees</span>}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.1px' }}>{ch.desc}</div>
            </div>
            {/* Header actions */}
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
              ].map((ico, i) => (
                <div key={i} style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.35)' }}>{ico}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Message feed */}
        <div className="feed" style={{ flex: 1, overflowY: 'auto', padding: '16px 0 8px' }}>

          {/* Channel rules banner */}
          <div style={{ margin: '0 28px 20px', background: `${ch.color}08`, border: `1px solid ${ch.color}18`, borderRadius: 12, padding: '12px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span style={{ fontSize: 13, color: `${ch.color}99`, lineHeight: 1.6 }}>
              {ch.id === 'announcements' && 'Announcements channel — organiser posts only. All 842 ticket holders can read.'}
              {ch.id === 'crew' && 'Internal crew channel. Attendees cannot see or join this channel.'}
              {ch.id === 'general' && 'General Chat — open to all ticket holders and the organiser team.'}
            </span>
          </div>

          {msgs.map(m => (
            <div key={m.id} className="msg-row" onMouseEnter={() => setHovered(m.id)} onMouseLeave={() => setHovered(null)}
              style={{ position: 'relative', display: 'flex', gap: 14, padding: '10px 28px', background: hovered === m.id ? 'rgba(255,255,255,0.017)' : 'transparent', transition: 'background 0.12s' }}>
              <AvatarCircle ini={m.ini} role={m.role} aColor={m.aColor} size={40}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: m.role === 'organiser' ? '#7FE0D5' : m.role === 'staff' ? '#EBE88A' : m.role === 'admin' ? '#B1D8D4' : 'rgba(255,255,255,0.8)', letterSpacing: '-0.2px' }}>{m.name}</span>
                  <RolePill role={m.role}/>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{m.time}</span>
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, whiteSpace: 'pre-line', letterSpacing: '-0.1px' }}>{m.text}</div>

                {/* Image attachment */}
                {m.hasImg && (
                  <div style={{ marginTop: 10, background: 'linear-gradient(135deg, #0d2830 0%, #0e3a3e 50%, #091e22 100%)', border: `1px solid ${ch.color}18`, borderRadius: 14, width: 340, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
                    {/* Decorative grid */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,rgba(127,224,213,0.04) 0px,rgba(127,224,213,0.04) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(127,224,213,0.04) 0px,rgba(127,224,213,0.04) 1px,transparent 1px,transparent 40px)' }} />
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ch.color}18`, border: `1px solid ${ch.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: `${ch.color}99` }}>{m.imgCaption}</span>
                    </div>
                  </div>
                )}

                {/* Readers count for announcements */}
                {m.readers && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.18)', fontWeight: 500 }}>{m.readers.toLocaleString()} read</span>
                  </div>
                )}
              </div>

              {/* Hover moderation toolbar */}
              <div className="mod-toolbar" style={{ opacity: 0, transition: 'opacity 0.12s', position: 'absolute', top: 8, right: 24, display: 'flex', gap: 3, background: '#111416', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '4px 5px', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
                {[
                  { title: 'Pin', path: 'M12 2v20M5 9l7-7 7 7' },
                  { title: 'Reply', path: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
                ].map(a => (
                  <button key={a.title} title={a.title} style={{ background: 'none', border: 'none', padding: '5px 7px', borderRadius: 7, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={a.path}/></svg>
                  </button>
                ))}
                <div style={{ width: 1, background: 'rgba(255,255,255,0.07)', margin: '3px 1px' }} />
                <button title="Delete" style={{ background: 'none', border: 'none', padding: '5px 7px', borderRadius: 7, color: 'rgba(255,80,80,0.55)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div style={{ padding: '12px 24px 20px', flexShrink: 0 }}>
          {ch.readOnly && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(235,232,138,0.5)" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(235,232,138,0.4)' }}>Posting as Organiser — attendees cannot reply in this channel</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', background: 'rgba(255,255,255,0.035)', border: `1px solid ${input.trim() ? `${ch.color}30` : 'rgba(255,255,255,0.08)'}`, borderRadius: 16, padding: '10px 12px 10px 16px', transition: 'border-color 0.2s' }}>
            {/* Attach */}
            <button style={{ background: 'none', border: 'none', padding: '6px', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            </button>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.07)', flexShrink: 0, alignSelf: 'center' }} />
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Post to #${ch.name}…`} style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontFamily: F, fontSize: 14, padding: '4px 0', lineHeight: 1.5 }} />
            {/* Send */}
            <button style={{ background: input.trim() ? ch.color : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 11, padding: '9px 20px', color: input.trim() ? '#0e2a2c' : 'rgba(255,255,255,0.18)', fontFamily: F, fontSize: 13, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.18s', letterSpacing: '0.2px' }}>Send</button>
          </div>
        </div>
      </div>

      {/* ── Col 4: Members + Moderation ── */}
      <div style={{ background: '#090b0c', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Members */}
        <div style={{ flex: 1, padding: '20px 14px', overflowY: 'auto' }} className="members-scroll">
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 14, paddingLeft: 4 }}>
            {ch.id === 'crew' ? 'Crew' : ch.id === 'announcements' ? 'Team' : 'Online'}
          </div>
          {members.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 4px', opacity: m.role === 'count' ? 0.4 : 1 }}>
              {m.role !== 'count'
                ? <div style={{ position: 'relative', flexShrink: 0 }}>
                    <AvatarCircle ini={m.ini} role={m.role} aColor={m.aColor} size={30}/>
                    <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: m.online ? '#4ade80' : 'rgba(255,255,255,0.15)', border: '2px solid #09090b' }} />
                  </div>
                : <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>…</span>
                  </div>
              }
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: m.role === 'count' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                {m.role !== 'count' && <div style={{ fontSize: 10.5, color: RC[m.role]?.badge || 'rgba(255,255,255,0.2)', fontWeight: 600, marginTop: 1 }}>{RC[m.role]?.label}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Moderation panel */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '16px 14px 20px', flexShrink: 0 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 14, paddingLeft: 4 }}>Moderation</div>

          {[
            { label: 'Slow mode (30s)', val: slowMode, set: setSlowMode, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, onColor: '#7FE0D5' },
            { label: 'Mute channel',    val: muteChat, set: setMuteChat, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>, onColor: '#EBE88A' },
          ].map(t => (
            <div key={t.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 10, marginBottom: 6, background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                {t.icon}
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{t.label}</span>
              </div>
              <div onClick={() => t.set(!t.val)} style={{ width: 34, height: 19, borderRadius: 10, background: t.val ? t.onColor : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 2.5, left: t.val ? 17 : 2.5, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
              </div>
            </div>
          ))}

          {/* Action buttons */}
          {[
            { label: 'Export chat log', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>, danger: false },
            { label: 'Clear all messages', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>, danger: true },
          ].map(a => (
            <button key={a.label} className="mod-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.02)', border: 'none', borderRadius: 10, padding: '9px 10px', color: a.danger ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.38)', fontFamily: F, fontSize: 12, fontWeight: 500, cursor: 'pointer', marginBottom: 5, textAlign: 'left', transition: 'all 0.15s' }}>
              {a.icon}{a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
