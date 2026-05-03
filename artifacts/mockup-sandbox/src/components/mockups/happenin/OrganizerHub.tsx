import { useState } from 'react';

const F = 'Urbanist, sans-serif';
const G = 'Grotesk, sans-serif';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;

/* ── palette ─────────────────────────────────────────────────────
   Warm brown-dark base to match happenin's earthy undertones.
   Sidebar: slightly lighter warm layer.
   Chat card: sunken inset feel.
──────────────────────────────────────────────────────────────── */
const BG        = '#0e0c09';   // warm brownish page background
const SIDEBAR_BG = '#13110d';  // slightly warmer sidebar surface
const CHAT_BG   = '#0a0804';   // deeper sunken chat well

type ChannelId = 'announcements' | 'general';

const CHANNELS = [
  {
    id: 'announcements' as ChannelId,
    name: 'Announcements',
    desc: 'Organiser posts only — all ticket holders can read.',
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
    { id: 1, role: 'creator', name: 'Event Creator', ini: 'EC', time: '3h ago', readers: 842, text: 'Welcome to the official Neon Pulse channel! All updates — set times, stage changes, venue info — will be posted here. See you tonight 🎶' },
    { id: 2, role: 'staff', name: 'Staff', ini: 'ST', time: '2h ago', readers: 791, text: '📍 Venue reminder — 32 Upper Ground, South Bank. Nearest tube: Waterloo (5 min walk) or Blackfriars (7 min). Rideshare drop-off on Upper Ground.' },
    { id: 3, role: 'creator', name: 'Event Creator', ini: 'EC', time: '1h ago', readers: 634, hasImg: true, imgCaption: 'Stage map & set times — save this!', text: '🗺️ Official stage map and full set times for tonight.' },
    { id: 4, role: 'staff', name: 'Staff', ini: 'ST', time: '45m ago', readers: 510, text: '🎵 Set times confirmed:\n\nWarm Up DJ  ·  6:30 PM\nHybrid Minds  ·  8:00 PM\nHeadliner  ·  10:00 PM\n\nDoors open at 5:30 PM.' },
    { id: 5, role: 'creator', name: 'Event Creator', ini: 'EC', time: '20m ago', readers: 312, text: '📸 Camera policy — phone cameras welcome! No professional cameras with detachable lenses. Bag check ground floor, £2/item.' },
  ],
  general: [
    { id: 1, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '2h ago', text: 'Welcome everyone! 🎶 Doors open at 5:30 PM — see you on the South Bank tonight!' },
    { id: 2, role: 'attendee', name: '@wave_rider', ini: 'WR', time: '1h 50m ago', text: 'Is there parking nearby or best to tube it?', ac: '#1a1209' },
    { id: 3, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '1h 45m ago', text: 'Tube is best — Waterloo is a 5 min walk. Very limited parking available nearby.' },
    { id: 4, role: 'attendee', name: '@deep_groove', ini: 'DG', time: '1h 30m ago', text: 'First time at this venue — is there a cloakroom? 🎒', ac: '#120e1a' },
    { id: 5, role: 'organiser', name: 'NeonWave Events', ini: 'NW', time: '1h 25m ago', text: 'Yes! Ground floor, £2 per item. Opens from 5:00 PM 🙌' },
    { id: 6, role: 'attendee', name: '@neon_soul', ini: 'NS', time: '1h 10m ago', text: 'Anyone else on early bird? Would love to meet before it gets packed 👋', ac: '#1a1408' },
    { id: 7, role: 'attendee', name: '@bass_echo', ini: 'BE', time: '45m ago', text: "DJ Mara's set at Fabric last month was 🔥 tonight will be next level", ac: '#0a1509' },
    { id: 8, role: 'attendee', name: '@city_lights', ini: 'CL', time: '20m ago', text: 'Just checked in — vibes outside already 🙌', ac: '#180f06' },
  ],
};

const RC: Record<string, { bg: string; text: string; label: string }> = {
  organiser: { bg: '#0e2a2c', text: '#7FE0D5', label: 'Organiser' },
  attendee:  { bg: '#1c150a', text: 'rgba(255,255,255,0.5)', label: '' },
};

function ChIcon({ id, size = 16, color = 'currentColor' }: { id: ChannelId; size?: number; color?: string }) {
  if (id === 'announcements') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}

/* ── Collapse icon ── */
function CollapseIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.25s' }}>
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  );
}

function ChatWallpaper() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1200 900" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="w1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 180) rotate(45) scale(320 240)">
          <stop stopColor="#133034" stopOpacity="0.95"/>
          <stop offset="1" stopColor="#0a0804" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="w2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1030 180) rotate(145) scale(340 260)">
          <stop stopColor="#2a1c0f" stopOpacity="0.8"/>
          <stop offset="1" stopColor="#0a0804" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="w3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(760 720) rotate(120) scale(420 260)">
          <stop stopColor="#0f2326" stopOpacity="0.8"/>
          <stop offset="1" stopColor="#0a0804" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="g1" x1="90" y1="180" x2="470" y2="680" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1c1110" stopOpacity="0.55"/>
          <stop offset="1" stopColor="#070605" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="g2" x1="820" y1="120" x2="1120" y2="520" gradientUnits="userSpaceOnUse">
          <stop stopColor="#11191b" stopOpacity="0.62"/>
          <stop offset="1" stopColor="#070605" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="#0a0804"/>
      <rect width="1200" height="900" fill="url(#w1)"/>
      <rect width="1200" height="900" fill="url(#w2)"/>
      <rect width="1200" height="900" fill="url(#w3)"/>
      <path d="M0 250C150 200 220 260 330 214C440 168 500 94 620 110C734 126 770 234 892 248C1014 262 1108 212 1200 168V900H0V250Z" fill="url(#g1)"/>
      <path d="M0 610C128 554 236 560 330 608C424 656 506 752 634 748C760 744 832 636 932 586C1032 536 1120 554 1200 580V900H0V610Z" fill="url(#g2)"/>
      <path d="M196 190C306 150 388 176 452 236C516 296 556 384 648 416C738 448 826 414 928 372C1030 330 1114 314 1200 322" stroke="#7FE0D5" strokeOpacity="0.12" strokeWidth="2"/>
      <path d="M80 680C178 620 262 612 340 646C418 680 474 750 562 766C650 782 748 744 818 690C888 636 956 606 1048 612C1120 616 1166 634 1200 650" stroke="#EBE88A" strokeOpacity="0.08" strokeWidth="2"/>
      <circle cx="248" cy="206" r="42" fill="#7FE0D5" fillOpacity="0.06"/>
      <circle cx="980" cy="218" r="54" fill="#EBE88A" fillOpacity="0.05"/>
      <circle cx="706" cy="708" r="72" fill="#7FE0D5" fillOpacity="0.05"/>
      <path d="M300 126C378 170 410 244 390 320C370 396 296 448 214 440C132 432 70 366 74 284C78 202 144 146 222 122C248 114 276 114 300 126Z" fill="#0f1415" fillOpacity="0.42"/>
      <path d="M904 114C1000 148 1056 228 1046 308C1036 388 962 448 878 446C794 444 726 386 720 304C714 222 772 154 860 118C878 110 888 110 904 114Z" fill="#25170e" fillOpacity="0.38"/>
    </svg>
  );
}

function AvatarFace({ id, size = 40 }: { id: string; size?: number }) {
  const sk = '#F5E6D3';
  const dk = '#1a1a1a';
  const W = size, H = size;
  const Face = () => (
    <>
      <ellipse cx="50" cy="62" rx="23" ry="27" fill={sk} stroke={dk} strokeWidth="2.2"/>
      <ellipse cx="27" cy="62" rx="4.5" ry="6.5" fill={sk} stroke={dk} strokeWidth="1.8"/>
      <ellipse cx="73" cy="62" rx="4.5" ry="6.5" fill={sk} stroke={dk} strokeWidth="1.8"/>
    </>
  );
  const Eyes = ({ cx1 = 41, cx2 = 59, cy = 59 }) => (
    <><circle cx={cx1} cy={cy} r="2.8" fill={dk}/><circle cx={cx2} cy={cy} r="2.8" fill={dk}/></>
  );
  const Smile = ({ y1 = 74, y2 = 81 }) => (
    <path d={`M43 ${y1} Q50 ${y2} 57 ${y1}`} fill="none" stroke={dk} strokeWidth="2.5" strokeLinecap="round"/>
  );
  if (id === 'casey') return <svg width={W} height={H} viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#7FE0D5"/><ellipse cx="50" cy="38" rx="24" ry="20" fill={dk}/><Face/><Eyes/><Smile/><circle cx="41" cy="59" r="8" fill="none" stroke={dk} strokeWidth="2.5"/><circle cx="59" cy="59" r="8" fill="none" stroke={dk} strokeWidth="2.5"/><line x1="49" y1="59" x2="51" y2="59" stroke={dk} strokeWidth="2.2"/><line x1="22" y1="59" x2="33" y2="59" stroke={dk} strokeWidth="1.8"/><line x1="67" y1="59" x2="78" y2="59" stroke={dk} strokeWidth="1.8"/></svg>;
  return <svg width={W} height={H} viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#B1D8D4"/><path d="M27 52 Q27 26 50 24 Q73 26 73 52 Q65 44 50 43 Q35 44 27 52Z" fill={dk}/><rect x="12" y="44" width="22" height="8" rx="4" fill={dk}/><circle cx="50" cy="25" r="3.5" fill="#EBE88A"/><Face/><Eyes/><Smile/></svg>;
}

/* ── Navbar ── */
function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Event Hub</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 4 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        <div style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', cursor: 'pointer' }}>
          <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c', whiteSpace: 'nowrap' }}>Maya Chen</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export function OrganizerHub() {
  const [active, setActive]   = useState<ChannelId>('announcements');
  const [input, setInput]     = useState('');
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen]       = useState(true);   // sidebar expanded/collapsed

  const ch   = CHANNELS.find(c => c.id === active)!;
  const msgs = MSGS[active];

  const SIDEBAR_W  = open ? 320 : 72;

  return (
    <div style={{ height: '100vh', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: F }}>
      <style>{`
        .ch-row:hover  { background: rgba(127,224,213,0.05) !important; }
        .ch-icon:hover { background: rgba(127,224,213,0.1) !important; }
        .feed::-webkit-scrollbar { width: 4px; }
        .feed::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
      `}</style>
      <Navbar />
      {/* ── event sub-header ── */}
      <div style={{ marginTop: 125, flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 92 }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{ fontFamily: G, fontSize: 11, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.45)', marginBottom: 6 }}
            className="text-[24px]">Event</div>
          <div style={{ fontFamily: G, fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-1px', lineHeight: 1 }}>Neon Pulse Music Festival</div>
          <div style={{ fontFamily: G, fontSize: 14, color: 'rgba(255,255,255,0.28)', fontWeight: 500, marginTop: 8 }}>Sat 14 Jun 2025 · 5:30 PM</div>
        </div>
      </div>
      {/* ── body: collapsible sidebar + sunken chat ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '16px 20px 20px', gap: 16 }}>

        {/* ══ LEFT: collapsible sidebar ══ */}
        <div style={{
          width: SIDEBAR_W,
          minWidth: SIDEBAR_W,
          background: SIDEBAR_BG,
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)',
          flexShrink: 0,
        }}>

          {/* sidebar top bar: label + toggle */}
          <div style={{ padding: open ? '20px 20px 14px' : '20px 0 14px', display: 'flex', alignItems: 'center', justifyContent: open ? 'space-between' : 'center', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {open && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Channels</span>}
            <button
              onClick={() => setOpen(o => !o)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s' }}
              className="ch-icon"
            >
              <CollapseIcon open={open} color="rgba(255,255,255,0.45)" />
            </button>
          </div>

          {/* channel list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: open ? '12px 12px 8px' : '12px 0 8px', display: 'flex', flexDirection: 'column', gap: 4, alignItems: open ? 'stretch' : 'center' }}>
            {CHANNELS.map(c => {
              const isActive = c.id === active;
              return open ? (
                /* EXPANDED row */
                (<div key={c.id} className="ch-row" onClick={() => setActive(c.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 14, background: isActive ? `${c.color}10` : 'transparent', border: `1px solid ${isActive ? `${c.color}30` : 'transparent'}`, cursor: 'pointer', transition: 'all 0.15s', position: 'relative' }}>
                  {/* active indicator bar */}
                  {isActive && <div style={{ position: 'absolute', left: 0, top: '22%', bottom: '22%', width: 3, borderRadius: '0 3px 3px 0', background: c.color }} />}
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: isActive ? `${c.color}15` : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? `${c.color}25` : 'rgba(255,255,255,0.07)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ChIcon id={c.id} size={15} color={isActive ? c.color : 'rgba(255,255,255,0.3)'}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                      {c.readOnly && <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.8px', color: '#7FE0D5', background: 'rgba(127,224,213,0.09)', border: '1px solid rgba(127,224,213,0.18)', borderRadius: 4, padding: '2px 6px', textTransform: 'uppercase', flexShrink: 0 }}>Read-only</span>}
                      {c.badge > 0 && <div style={{ marginLeft: 'auto', background: c.color, borderRadius: 9999, minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', flexShrink: 0 }}><span style={{ fontSize: 9.5, fontWeight: 800, color: '#0e2a2c' }}>{c.badge}</span></div>}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.25)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.desc}</div>
                  </div>
                </div>)
              ) : (
                /* COLLAPSED icon-only */
                (<div key={c.id} className="ch-icon" onClick={() => setActive(c.id)} title={c.name}
                  style={{ width: 44, height: 44, borderRadius: 13, background: isActive ? `${c.color}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? `${c.color}30` : 'rgba(255,255,255,0.07)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', position: 'relative', flexShrink: 0 }}>
                  <ChIcon id={c.id} size={17} color={isActive ? c.color : 'rgba(255,255,255,0.3)'}/>
                  {c.badge > 0 && <div style={{ position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: '50%', background: c.color, border: `2px solid ${SIDEBAR_BG}` }} />}
                </div>)
              );
            })}

            {/* Add Channel ghost */}
            {open ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 14, border: '1px dashed rgba(255,255,255,0.07)', cursor: 'pointer', opacity: 0.4, marginTop: 4 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Add Channel</span>
              </div>
            ) : (
              <div className="ch-icon" title="Add Channel" style={{ width: 44, height: 44, borderRadius: 13, border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.4, flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            )}
          </div>
        </div>

        {/* ══ RIGHT: sunken chat card ══ */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: CHAT_BG,
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.05)',
          /* sunken / inset effect */
          boxShadow: '0 10px 28px rgba(0,0,0,0.28), inset 0 2px 18px rgba(0,0,0,0.55), inset 0 1px 3px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          minWidth: 0,
          position: 'relative',
        }}>

          {/* channel header inside chat card */}
          <div style={{ flexShrink: 0 }}>
            {/* colour accent top stripe */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
              <ChatWallpaper />
            </div>
            <div style={{ height: 2, background: `linear-gradient(90deg, ${ch.color}80 0%, ${ch.color}00 60%)`, borderRadius: '20px 20px 0 0' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: '16px 32px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: `${ch.color}10`, border: `1px solid ${ch.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ChIcon id={ch.id} size={15} color={ch.color}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>{ch.name}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.28)', marginTop: 1 }}>{ch.desc}</div>
              </div>
              {/* header icons */}
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
                ].map((ico, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: 9, background: '#EBE88A', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0e2a2c', boxShadow: '0 1px 0 rgba(255,255,255,0.18) inset' }}>{ico}</div>
                ))}
              </div>
            </div>
          </div>

          {/* messages feed */}
          <div className="feed" style={{ position: 'relative', zIndex: 1, flex: 1, overflowY: 'auto', padding: '18px 0 6px' }}>
            {/* channel info banner */}
            <div style={{ margin: '0 32px 18px', background: `${ch.color}06`, border: `1px solid ${ch.color}14`, borderRadius: 11, padding: '10px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontSize: 12.5, color: `${ch.color}75`, lineHeight: 1.6 }}>{ch.id === 'announcements' ? 'Announcements channel — organiser posts only. All 842 ticket holders can read.' : 'General Chat — open to all ticket holders and the organiser team.'}</span>
            </div>

            {msgs.map(m => (
              <div key={m.id} onMouseEnter={() => setHovered(m.id)} onMouseLeave={() => setHovered(null)}
                style={{ display: 'flex', gap: 14, padding: '10px 32px', background: hovered === m.id ? 'rgba(255,255,255,0.018)' : 'transparent', transition: 'background 0.12s' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.ac || RC[m.role]?.bg || RC.attendee.bg, border: `1.5px solid ${m.role === 'organiser' ? `${RC.organiser.text}28` : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  <AvatarFace id={m.role === 'organiser' ? 'casey' : 'jordan'} size={40}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>{m.name}</span>
                    {m.role !== 'attendee' && (
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.7px', color: RC.organiser.text, background: `${RC.organiser.text}16`, border: `1px solid ${RC.organiser.text}25`, borderRadius: 5, padding: '2px 7px', textTransform: 'uppercase' }}>Organiser</span>
                    )}
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, whiteSpace: 'pre-line', letterSpacing: '-0.1px' }}>{m.text}</div>

                  {m.hasImg && (
                    <div style={{ marginTop: 12, background: 'linear-gradient(135deg,#0d1a14,#0a1a1e,#080e14)', border: `1px solid ${ch.color}15`, borderRadius: 14, width: 340, height: 178, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
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
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <a href={m.url} target="_blank" rel="noreferrer" style={{ fontSize: 12.5, color: '#7FE0D5', textDecoration: 'none', borderBottom: '1px solid rgba(127,224,213,0.35)' }}>{m.url}</a>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>link attached</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* input bar */}
          <div style={{ position: 'relative', zIndex: 1, padding: '12px 24px 18px', flexShrink: 0 }}>
            {ch.readOnly && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(235,232,138,0.45)" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(235,232,138,0.4)' }}>Posting as Organiser — attendees cannot reply in this channel</span>
              </div>
            )}
            {/* input surface — slightly raised above the sunken chat well */}
            <div style={{
              display: 'flex', gap: 10, alignItems: 'center',
              background: 'rgba(255,255,255,0.06)',
              border: `1.5px solid ${input.trim() ? `${ch.color}35` : 'rgba(255,255,255,0.09)'}`,
              borderRadius: 16,
              padding: '10px 12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              transition: 'border-color 0.2s',
            }}>
              <button style={{ background: 'none', border: 'none', padding: 3, color: 'rgba(255,255,255,0.2)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </button>
              <input value={input} onChange={e => setInput(e.target.value)}
                placeholder={`Post to #${ch.name}…`}
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontFamily: F, fontSize: 14 }} />
              <input value={''} readOnly placeholder="Add URL" style={{ width: 130, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, outline: 'none', color: 'rgba(255,255,255,0.7)', fontFamily: F, fontSize: 13, padding: '8px 10px' }} />
              <button style={{
                background: input.trim() ? ch.color : 'rgba(255,255,255,0.05)',
                border: 'none', borderRadius: 11, padding: '9px 22px',
                color: input.trim() ? '#0e2a2c' : 'rgba(255,255,255,0.18)',
                fontFamily: F, fontSize: 13.5, fontWeight: 700,
                cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0,
                transition: 'all 0.18s',
              }}>Send</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
