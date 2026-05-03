import { useState } from 'react';

const F = 'Urbanist, sans-serif';
const BG = '#0e0c09';
const SIDEBAR_BG = '#13110d';
const CHAT_BG = '#0a0804';
const TEAL = '#7FE0D5';
const GOLD = '#EBE88A';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = `${BASE}/happenin-logo-new.png`;

type AvatarId = 'casey' | 'jordan';
function AvatarFace({ id, size = 40 }: { id: AvatarId; size?: number }) {
  const palettes: Record<AvatarId, { bg: string; skin: string; hair: string }> = {
    casey:  { bg: '#EBE88A', skin: '#F4A574', hair: '#1a1a1a' },
    jordan: { bg: '#B0A4E8', skin: '#FDDBC4', hair: '#1C0A00' },
  };
  const p = palettes[id] || palettes.casey;
  const cx = size / 2, cy = size / 2;
  const headR = size * 0.32;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={cx} fill={p.bg} opacity="0.25" />
      <ellipse cx={cx} cy={cy + size * 0.07} rx={headR} ry={headR * 1.05} fill={p.skin} />
      <ellipse cx={cx} cy={cy - size * 0.12} rx={headR * 1.05} ry={headR * 0.6} fill={p.hair} />
      <circle cx={cx - size * 0.09} cy={cy + size * 0.02} r={size * 0.04} fill={p.hair} opacity="0.9" />
      <circle cx={cx + size * 0.09} cy={cy + size * 0.02} r={size * 0.04} fill={p.hair} opacity="0.9" />
      <path d={`M ${cx - size * 0.07} ${cy + size * 0.11} Q ${cx} ${cy + size * 0.16} ${cx + size * 0.07} ${cy + size * 0.11}`} fill="none" stroke={p.hair} strokeWidth={size * 0.025} strokeLinecap="round" />
    </svg>
  );
}

const RC: Record<string, { bg: string; text: string }> = {
  organiser: { bg: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', text: TEAL },
  attendee:  { bg: 'linear-gradient(135deg,#1a1208,#2a200e)', text: GOLD },
};

type Channel = {
  id: string; name: string; label: string; icon: string;
  color: string; readOnly: boolean; badge?: number;
};

const CHANNELS: Channel[] = [
  { id: 'announcements', name: 'announcements', label: 'Announcements', icon: '📢', color: TEAL, readOnly: true, badge: 0 },
  { id: 'general',       name: 'general',       label: 'General Chat',   icon: '💬', color: GOLD, readOnly: false, badge: 12 },
  { id: 'logistics',     name: 'logistics',     label: 'Logistics',      icon: '🗺️', color: '#B0A4E8', readOnly: false, badge: 3 },
  { id: 'stage',         name: 'stage',         label: 'Stage Updates',  icon: '🎤', color: '#F4A574', readOnly: true, badge: 0 },
  { id: 'lost-found',    name: 'lost-found',    label: 'Lost & Found',   icon: '🔍', color: '#A8E6A3', readOnly: false, badge: 1 },
];

type Msg = {
  id: number; channelId: string; role: 'organiser' | 'attendee';
  name: string; text: string; time: string;
  hasImg?: boolean; imgCaption?: string; url?: string;
};

const MESSAGES: Msg[] = [
  { id: 1,  channelId: 'announcements', role: 'organiser', name: 'NeonWave Events', text: '🎶 Welcome to Neon Pulse — doors open at 5:30 PM tonight! Tickets will be scanned at the main entrance on Upper Ground. Cloakroom is on your left as you enter.', time: '12:00 PM' },
  { id: 2,  channelId: 'announcements', role: 'organiser', name: 'NeonWave Events', text: '🔴 LIVE: Warm-up DJ is now on stage. Hybrid Minds up next at 8 PM. Head to the main stage for the best views!', time: '6:30 PM' },
  { id: 3,  channelId: 'general',       role: 'attendee',  name: '@stellar_j',       text: "So hyped for tonight — first time at Rooftop Arena!", time: '5:45 PM' },
  { id: 4,  channelId: 'general',       role: 'attendee',  name: '@wavepulse',       text: "Same! Just arrived, queue is moving fast. See you inside 🙌", time: '5:52 PM' },
  { id: 5,  channelId: 'general',       role: 'organiser', name: 'NeonWave Events',  text: "Welcome everyone! If you haven't checked in yet, fast-track lane is on the right for the happenin* app.", time: '5:58 PM' },
  { id: 6,  channelId: 'general',       role: 'attendee',  name: '@r_coast88',       text: "The warm up set is unreal already 🔥", time: '6:42 PM' },
  { id: 7,  channelId: 'general',       role: 'attendee',  name: '@morganm',         text: "Does anyone know if there's merch tonight?", time: '6:50 PM' },
  { id: 8,  channelId: 'general',       role: 'organiser', name: 'NeonWave Events',  text: 'Yes! Merch stand is on the east side near bar 2. Limited stock — grab it early!', time: '6:52 PM' },
  { id: 9,  channelId: 'logistics',     role: 'organiser', name: 'NeonWave Events',  text: 'Staff briefing update: all positions confirmed. East gate team — your lead is Priya. Check in via the staff app now.', time: '4:00 PM', hasImg: false },
  { id: 10, channelId: 'logistics',     role: 'attendee',  name: '@skyline_x',       text: "Getting off at Waterloo — is it left out of exit 2?", time: '5:40 PM' },
  { id: 11, channelId: 'stage',         role: 'organiser', name: 'NeonWave Events',  text: '🎤 Hybrid Minds soundcheck complete. Stage crew — house mics live at 7:50. All clear.', time: '7:10 PM' },
  { id: 12, channelId: 'stage',         role: 'organiser', name: 'NeonWave Events',  text: 'DJ Mara on deck at 9:45. Lighting crew — cue sequence B from 9:50. Confirmed with AV.', time: '8:30 PM' },
  { id: 13, channelId: 'lost-found',    role: 'attendee',  name: '@anon_4422',       text: 'Found: black North Face jacket near stage left. Dropped at cloakroom desk.', time: '7:20 PM' },
  { id: 14, channelId: 'lost-found',    role: 'attendee',  name: '@anon_8817',       text: 'Missing: navy tote bag with keys inside. Dropped near bar 1 around 6:15. Please help!', time: '6:40 PM' },
  { id: 15, channelId: 'lost-found',    role: 'organiser', name: 'NeonWave Events',  text: 'We have the tote bag at the info desk near the main entrance. Come by anytime tonight to collect.', time: '6:48 PM' },
];

const STATS = [
  { label: 'Tickets Claimed',  val: '842',  unit: '/ 1,200', color: TEAL,  pct: 70 },
  { label: 'Checked In',       val: '312',  unit: 'so far',  color: GOLD,  pct: 37 },
  { label: 'Active in Chat',   val: '247',  unit: 'chatting',color: '#B0A4E8', pct: 29 },
  { label: 'Revenue',          val: '£0',   unit: 'free event', color: 'rgba(255,255,255,0.3)', pct: 100 },
];

const TASKS = [
  { label: 'Staff briefed & deployed',     done: true },
  { label: 'AV & sound check complete',    done: true },
  { label: 'Cloakroom open',               done: true },
  { label: 'Merch stand stocked',          done: false },
  { label: 'Post-event survey sent',       done: false },
];

export default function OrganizerHub() {
  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS[0]);
  const [input, setInput] = useState('');
  const [hovered, setHovered] = useState<number | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const ch = activeChannel;
  const filteredMsgs = MESSAGES.filter(m => m.channelId === ch.id);

  function sendMsg() {
    if (!input.trim()) return;
    setInput('');
  }

  return (
    <div style={{ height: '100vh', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: F }}>
      <style>{`
        .hub-scroll::-webkit-scrollbar { width: 4px; }
        .hub-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        .ch-row:hover { background: rgba(255,255,255,0.035) !important; }
        .task-row:hover { background: rgba(255,255,255,0.02) !important; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
      `}</style>

      {/* Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
          <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
            <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
          </div>
          <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Organiser Hub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
          <div style={{ background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.25)', borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: TEAL, animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TEAL }}>Event Live</span>
          </div>
          <div style={{ background: GOLD, borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', cursor: 'pointer' }}>
            <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c' }}>Maya Chen</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 125, flex: 1, display: 'flex', overflow: 'hidden', padding: '12px 20px 20px', gap: 12 }}>
        {/* Left sidebar — stats & tasks */}
        {!sidebarCollapsed && (
          <div style={{ width: 280, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: SIDEBAR_BG, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '20px 20px', flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 14 }}>Live Stats</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {STATS.map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.val} <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>{s.unit}</span></span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
                      <div style={{ height: '100%', background: s.color, borderRadius: 4, width: `${s.pct}%`, opacity: 0.7 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: SIDEBAR_BG, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '20px 20px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 14 }}>Checklist</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TASKS.map((t, i) => (
                  <div key={i} className="task-row" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, cursor: 'pointer', transition: 'background 0.1s' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: t.done ? `${TEAL}18` : 'rgba(255,255,255,0.04)', border: `1.5px solid ${t.done ? TEAL : 'rgba(255,255,255,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {t.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: t.done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.65)', textDecoration: t.done ? 'line-through' : 'none' }}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main hub area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, background: SIDEBAR_BG, borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          {/* Channel nav */}
          <div style={{ padding: '0 0', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, overflow: 'hidden' }}>
            <button onClick={() => setSidebarCollapsed(c => !c)} style={{ padding: '16px 18px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', overflowX: 'auto' }}>
              {CHANNELS.map(c => {
                const isAct = c.id === ch.id;
                return (
                  <div key={c.id} className="ch-row" onClick={() => setActiveChannel(c)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '16px 18px', cursor: 'pointer', borderBottom: `2px solid ${isAct ? c.color : 'transparent'}`, whiteSpace: 'nowrap', transition: 'all 0.15s', position: 'relative', background: isAct ? 'rgba(255,255,255,0.025)' : 'transparent' }}>
                    <span style={{ fontSize: 14 }}>{c.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: isAct ? 700 : 500, color: isAct ? '#fff' : 'rgba(255,255,255,0.38)' }}>#{c.name}</span>
                    {c.badge && c.badge > 0 ? (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: '#0e2a2c' }}>{c.badge}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Channel header */}
          <div style={{ padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{ fontSize: 18 }}>{ch.icon}</span>
            <span style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#fff' }}>{ch.label}</span>
            {ch.readOnly && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '4px 10px' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.5px' }}>Read-only for attendees</span>
              </div>
            )}
            <div style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>{filteredMsgs.length} messages</div>
          </div>

          {/* Messages */}
          <div className="hub-scroll" style={{ flex: 1, overflowY: 'auto', background: CHAT_BG }}>
            {filteredMsgs.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, opacity: 0.4 }}>
                <span style={{ fontSize: 32 }}>{ch.icon}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: F }}>No messages in #{ch.name} yet</span>
              </div>
            ) : (
              <div style={{ paddingTop: 16, paddingBottom: 8 }}>
                {filteredMsgs.map(m => (
                  <div key={m.id} onMouseEnter={() => setHovered(m.id)} onMouseLeave={() => setHovered(null)} style={{ display: 'flex', gap: 14, padding: '10px 32px', background: hovered === m.id ? 'rgba(255,255,255,0.018)' : 'transparent', transition: 'background 0.12s' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.role === 'organiser' ? 'linear-gradient(135deg,#0e2a2c,#1a4a4e)' : RC.attendee.bg, border: `1.5px solid ${m.role === 'organiser' ? 'rgba(127,224,213,0.3)' : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      <AvatarFace id={m.role === 'organiser' ? 'casey' : 'jordan'} size={40} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>{m.name}</span>
                        {m.role !== 'attendee' && (
                          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.7px', color: RC.organiser.text, background: `${RC.organiser.text}16`, border: `1px solid ${RC.organiser.text}25`, borderRadius: 5, padding: '2px 7px', textTransform: 'uppercase' }}>Organiser</span>
                        )}
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>{m.time}</span>
                      </div>
                      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, letterSpacing: '-0.1px' }}>{m.text}</div>
                      {m.hasImg && (
                        <div style={{ marginTop: 12, background: `linear-gradient(135deg,#0d1a14,#0a1a1e,#080e14)`, border: `1px solid ${ch.color}15`, borderRadius: 14, width: 340, height: 178, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,rgba(127,224,213,0.03) 0,rgba(127,224,213,0.03) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(127,224,213,0.03) 0,rgba(127,224,213,0.03) 1px,transparent 1px,transparent 40px)' }} />
                          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 13, background: `${ch.color}14`, border: `1px solid ${ch.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: `${ch.color}85` }}>{m.imgCaption}</span>
                          </div>
                        </div>
                      )}
                      {m.url && (
                        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <a href={m.url} target="_blank" rel="noreferrer" style={{ fontSize: 12.5, color: TEAL, textDecoration: 'none', borderBottom: '1px solid rgba(127,224,213,0.35)' }}>{m.url}</a>
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>link attached</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input bar */}
          <div style={{ position: 'relative', zIndex: 1, padding: '12px 24px 18px', flexShrink: 0 }}>
            {ch.readOnly && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(235,232,138,0.45)" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(235,232,138,0.4)' }}>Posting as Organiser — attendees cannot reply in this channel</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(255,255,255,0.06)', border: `1.5px solid ${input.trim() ? `${ch.color}35` : 'rgba(255,255,255,0.09)'}`, borderRadius: 16, padding: '10px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.3)', transition: 'border-color 0.2s' }}>
              <button style={{ background: 'none', border: 'none', padding: 3, color: 'rgba(255,255,255,0.2)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </button>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder={`Post to #${ch.name}…`} style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontFamily: F, fontSize: 14 }} />
              <input readOnly placeholder="Add URL" style={{ width: 130, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, outline: 'none', color: 'rgba(255,255,255,0.7)', fontFamily: F, fontSize: 13, padding: '8px 10px' }} />
              <button onClick={sendMsg} style={{ background: input.trim() ? ch.color : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 11, padding: '9px 22px', color: input.trim() ? '#0e2a2c' : 'rgba(255,255,255,0.18)', fontFamily: F, fontSize: 13.5, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.18s' }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
