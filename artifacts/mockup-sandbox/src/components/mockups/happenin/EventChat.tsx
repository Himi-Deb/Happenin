import { useState, useRef, useEffect } from 'react';

const F = 'Urbanist, sans-serif';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/* ── Illustrated SVG face avatars (Heyo-style bold line art) ── */
function AvatarFace({ id, size = 80 }: { id: string; size?: number }) {
  const sk = '#F5E6D3'; // skin
  const dk = '#1a1a1a'; // dark
  const W = size, H = size;

  // Common face + ears
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

  /* 1 — Casey: round glasses + short neat hair */
  if (id === 'casey') return (
    <svg width={W} height={H} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#7FE0D5"/>
      <ellipse cx="50" cy="38" rx="24" ry="20" fill={dk}/>
      <Face/>
      <Eyes/>
      <Smile/>
      <circle cx="41" cy="59" r="8" fill="none" stroke={dk} strokeWidth="2.5"/>
      <circle cx="59" cy="59" r="8" fill="none" stroke={dk} strokeWidth="2.5"/>
      <line x1="49" y1="59" x2="51" y2="59" stroke={dk} strokeWidth="2.2"/>
      <line x1="22" y1="59" x2="33" y2="59" stroke={dk} strokeWidth="1.8"/>
      <line x1="67" y1="59" x2="78" y2="59" stroke={dk} strokeWidth="1.8"/>
    </svg>
  );

  /* 2 — Jordan: backwards cap */
  if (id === 'jordan') return (
    <svg width={W} height={H} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#B1D8D4"/>
      {/* Cap dome */}
      <path d="M27 52 Q27 26 50 24 Q73 26 73 52 Q65 44 50 43 Q35 44 27 52Z" fill={dk}/>
      {/* Brim sticking left (backwards) */}
      <rect x="12" y="44" width="22" height="8" rx="4" fill={dk}/>
      {/* Cap button */}
      <circle cx="50" cy="25" r="3.5" fill="#EBE88A"/>
      <Face/>
      <Eyes/>
      <Smile/>
    </svg>
  );

  /* 3 — River: long straight hair */
  if (id === 'river') return (
    <svg width={W} height={H} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#EBE88A"/>
      {/* Long hair behind face */}
      <path d="M27 46 Q27 24 50 22 Q73 24 73 46 L78 100 Q64 100 50 100 Q36 100 22 100Z" fill={dk}/>
      <Face/>
      <Eyes/>
      <Smile/>
    </svg>
  );

  /* 4 — Sage: big natural afro */
  if (id === 'sage') return (
    <svg width={W} height={H} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#7FE0D5"/>
      {/* Afro */}
      <circle cx="50" cy="34" r="31" fill={dk}/>
      <Face/>
      <Eyes cy={61}/>
      {/* Big wide smile */}
      <path d="M40 75 Q50 84 60 75" fill="none" stroke={dk} strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  );

  /* 5 — Blake: slicked hair + filled sunglasses */
  if (id === 'blake') return (
    <svg width={W} height={H} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#EBE88A"/>
      {/* Slicked back hair */}
      <path d="M27 50 Q28 27 50 25 Q72 27 73 50 Q67 40 50 39 Q33 40 27 50Z" fill={dk}/>
      <Face/>
      <Eyes/>
      {/* Filled sunglasses */}
      <rect x="29" y="53" width="17" height="11" rx="4" fill={dk}/>
      <rect x="54" y="53" width="17" height="11" rx="4" fill={dk}/>
      <line x1="46" y1="58" x2="54" y2="58" stroke={dk} strokeWidth="2.2"/>
      <line x1="22" y1="58" x2="29" y2="58" stroke={dk} strokeWidth="1.8"/>
      <line x1="71" y1="58" x2="78" y2="58" stroke={dk} strokeWidth="1.8"/>
      {/* Stubble dots */}
      {[42,47,53,58].map(x => [70,74].map(y =>
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.4" fill={dk} opacity="0.35"/>
      ))}
      <Smile y1={76} y2={80}/>
    </svg>
  );

  /* 6 — Quinn: knit beanie + beard */
  if (id === 'quinn') return (
    <svg width={W} height={H} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#ff8a6a"/>
      <Face/>
      <Eyes/>
      {/* Beard */}
      <path d="M28 68 Q30 88 50 90 Q70 88 72 68 Q62 72 50 72 Q38 72 28 68Z" fill={dk}/>
      {/* Beanie */}
      <rect x="27" y="36" width="46" height="26" rx="8" fill={dk}/>
      {/* Pom-pom */}
      <circle cx="50" cy="30" r="9" fill="#EBE88A"/>
      <circle cx="50" cy="30" r="5" fill="#d4d000"/>
      {/* Rib lines on beanie */}
      <line x1="36" y1="38" x2="36" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      <line x1="43" y1="38" x2="43" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      <line x1="50" y1="38" x2="50" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      <line x1="57" y1="38" x2="57" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      <line x1="64" y1="38" x2="64" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      {/* Eyes above beard */}
      <Eyes cy={56}/>
      <path d="M43 63 Q50 68 57 63" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );

  /* 7 — Drew: neat bob cut + small hoop earring */
  if (id === 'drew') return (
    <svg width={W} height={H} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#B1D8D4"/>
      {/* Bob hair — straight sides dropping to jaw */}
      <path d="M27 50 Q27 26 50 24 Q73 26 73 50 L74 72 Q65 78 50 79 Q35 78 26 72Z" fill={dk}/>
      {/* Hair parting highlight */}
      <path d="M50 24 Q52 32 50 38" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
      <Face/>
      <Eyes/>
      <Smile/>
      {/* Hoop earring on right */}
      <circle cx="74" cy="65" r="5" fill="none" stroke="#EBE88A" strokeWidth="2.5"/>
    </svg>
  );

  /* 8 — Reese: messy spiky hair */
  if (id === 'reese') return (
    <svg width={W} height={H} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#EBE88A"/>
      {/* Messy hair base */}
      <ellipse cx="50" cy="34" rx="24" ry="20" fill={dk}/>
      {/* Spiky bits */}
      <polygon points="30,32 26,14 35,26" fill={dk}/>
      <polygon points="40,26 38,8 46,22" fill={dk}/>
      <polygon points="50,24 50,6 56,20" fill={dk}/>
      <polygon points="60,26 62,8 68,22" fill={dk}/>
      <polygon points="70,32 74,14 65,26" fill={dk}/>
      <Face/>
      <Eyes/>
      {/* Cheeky asymmetric smile */}
      <path d="M43 74 Q52 82 59 75" fill="none" stroke={dk} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );

  return null;
}

const AVATARS = [
  { id: 'casey',  label: 'Casey',  cardBg: '#0d2e32' },
  { id: 'jordan', label: 'Jordan', cardBg: '#132030' },
  { id: 'river',  label: 'River',  cardBg: '#2e2008' },
  { id: 'sage',   label: 'Sage',   cardBg: '#0a2a18' },
  { id: 'blake',  label: 'Blake',  cardBg: '#2a2208' },
  { id: 'quinn',  label: 'Quinn',  cardBg: '#2e1008' },
  { id: 'drew',   label: 'Drew',   cardBg: '#081430' },
  { id: 'reese',  label: 'Reese',  cardBg: '#28200a' },
];

const SEED: any[] = [
  { id: 1,  kind: 'organiser', name: 'NeonWave Events', text: 'Welcome everyone! 🎶 Doors open at 6 PM sharp — gates are on the riverside side. See you tonight!', time: '2h ago' },
  { id: 2,  kind: 'attendee',  avatar: AVATARS[0], username: 'wave_rider',   text: 'So hyped for Hybrid Minds! Anyone coming in from North London?', time: '1h 50m ago' },
  { id: 3,  kind: 'attendee',  avatar: AVATARS[2], username: 'deep_groove',  text: 'First time at this venue — is there a cloakroom?', time: '1h 35m ago' },
  { id: 4,  kind: 'organiser', name: 'NeonWave Events', text: 'Yes! Cloakroom on the ground floor, £2 per item. 🙌', time: '1h 25m ago' },
  { id: 5,  kind: 'attendee',  avatar: AVATARS[4], username: 'neon_soul',    text: 'Perfect, thanks! Taking Jubilee line to Waterloo and walking over.', time: '1h 10m ago' },
  { id: 6,  kind: 'attendee',  avatar: AVATARS[6], username: 'bass_echo',    text: "DJ Mara's warm-up set at Fabric last month was 🔥 tonight is going to be something else", time: '50m ago' },
  { id: 7,  kind: 'attendee',  avatar: AVATARS[1], username: 'city_lights',  text: 'Anyone else on early bird? Would love to meet before it gets packed 👋', time: '35m ago' },
  { id: 8,  kind: 'attendee',  avatar: AVATARS[3], username: 'stardust_77',  text: 'See you all there! 🌟', time: '12m ago' },
];

function Navbar({ label }: { label: string }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 4 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <div onClick={() => window.location.href = `${BASE}/preview/happenin/Login`} style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 32px', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ color: '#0e2a2c', fontFamily: F, fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>LOGIN</span>
        </div>
      </div>
    </div>
  );
}

function BubbleAvatar({ av, size = 36 }: { av: typeof AVATARS[0]; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: av.cardBg, overflow: 'hidden', flexShrink: 0, border: '1.5px solid rgba(255,255,255,0.08)' }}>
      <AvatarFace id={av.id} size={size}/>
    </div>
  );
}

function Bubble({ msg, myUsername }: { msg: any; myUsername: string }) {
  const isMe = msg.kind === 'me';
  const isOrg = msg.kind === 'organiser';

  if (isMe) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, alignItems: 'flex-end' }}>
        <div style={{ maxWidth: '55%' }}>
          <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'right', marginBottom: 4 }}>@{myUsername} · {msg.time}</div>
          <div style={{ background: 'rgba(235,232,138,0.1)', border: '1px solid rgba(235,232,138,0.22)', borderRadius: '14px 4px 14px 14px', padding: '12px 16px', fontFamily: F, fontSize: 14, color: '#EBE88A', lineHeight: 1.6 }}>{msg.text}</div>
        </div>
        <BubbleAvatar av={msg.avatar} size={36}/>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      {isOrg
        ? <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', border: '1.5px solid rgba(127,224,213,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#7FE0D5' }}>N</span></div>
        : <BubbleAvatar av={msg.avatar} size={36}/>
      }
      <div style={{ maxWidth: '62%' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 5 }}>
          {isOrg
            ? <><span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#7FE0D5' }}>{msg.name}</span><span style={{ fontFamily: F, fontSize: 10, color: 'rgba(127,224,213,0.5)', background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.15)', borderRadius: 4, padding: '1px 6px', letterSpacing: '0.5px' }}>ORGANISER</span></>
            : <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>@{msg.username}</span>
          }
          <span style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{msg.time}</span>
        </div>
        <div style={{ background: isOrg ? 'rgba(127,224,213,0.05)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isOrg ? 'rgba(127,224,213,0.12)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '4px 14px 14px 14px', padding: '12px 16px', fontFamily: F, fontSize: 14, color: isOrg ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>
          {msg.text}
        </div>
      </div>
    </div>
  );
}

function SetupView({ avatar, setAvatar, username, setUsername, err, setErr, onJoin }: any) {
  const ready = username.trim().length >= 3;

  return (
    <div style={{ height: '100vh', background: '#080a0b', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .av-card:hover { background: rgba(127,224,213,0.07) !important; border-color: rgba(127,224,213,0.35) !important; transform: translateY(-3px) !important; }
      `}</style>
      <Navbar label="Event Chat" />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 0 }}>

        {/* ── Left: event context panel ── */}
        <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,8,8,0.55) 0%, rgba(6,8,8,0.15) 40%, rgba(6,8,8,0.92) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 60%, rgba(8,10,11,0.6) 100%)' }} />
          <div style={{ position: 'absolute', top: 140, left: 64, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 10, padding: '8px 16px' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7FE0D5', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: '#7FE0D5' }}>247 people chatting now</span>
          </div>
          <div style={{ position: 'relative', zIndex: 1, padding: '0 64px 72px' }}>
            <div style={{ fontFamily: F, fontSize: 12, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.65)', marginBottom: 14 }}>🎵 Music · Tonight</div>
            <h1 style={{ fontFamily: F, fontSize: 58, fontWeight: 800, letterSpacing: '-2.5px', color: '#fff', lineHeight: 0.95, margin: '0 0 20px' }}>Neon Pulse<br />Music Festival</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.6)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Sat 14 Jun 2025
              </div>
              <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                Rooftop Arena, London
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', border: '1.5px solid rgba(127,224,213,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#7FE0D5' }}>N</span>
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#fff' }}>NeonWave Events</div>
                <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Event organiser · Active in chat</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: profile setup form ── */}
        <div style={{ background: '#0a0c0d', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '130px 72px 64px', overflowY: 'auto' }}>

          {/* Heading — no step indicator */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: F, fontSize: 50, fontWeight: 800, letterSpacing: '-2.2px', color: '#fff', lineHeight: 0.96, margin: '0 0 16px' }}>Join the<br />conversation.</h2>
            <p style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.65 }}>Pick an avatar and username. Your real name and booking details stay completely private.</p>
          </div>

          {/* Avatar grid — illustrated face cards */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16 }}>Choose your avatar</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {AVATARS.map(av => {
                const active = avatar.id === av.id;
                return (
                  <button key={av.id} className="av-card" onClick={() => setAvatar(av)}
                    style={{ position: 'relative', background: active ? 'rgba(127,224,213,0.07)' : 'rgba(255,255,255,0.025)', border: `2px solid ${active ? 'rgba(127,224,213,0.55)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 18, padding: '16px 8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.18s', transform: active ? 'translateY(-3px)' : 'none', boxShadow: active ? '0 10px 28px rgba(127,224,213,0.15)' : 'none', outline: 'none' }}>
                    {active && (
                      <div style={{ position: 'absolute', top: 8, left: 8, width: 20, height: 20, borderRadius: '50%', background: '#7FE0D5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5L9 3" stroke="#0e2a2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                    <AvatarFace id={av.id} size={72}/>
                    <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: active ? '#7FE0D5' : 'rgba(255,255,255,0.38)', letterSpacing: '0.3px' }}>{av.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Username input */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>Choose a username</div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.2)', pointerEvents: 'none', fontWeight: 500 }}>@</span>
              <input
                value={username}
                onChange={e => { setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')); setErr(''); }}
                onKeyDown={e => e.key === 'Enter' && onJoin()}
                placeholder="your_handle"
                maxLength={20}
                style={{ width: '100%', boxSizing: 'border-box', background: '#111315', border: `1.5px solid ${err ? 'rgba(255,90,90,0.5)' : username.length >= 3 ? 'rgba(127,224,213,0.35)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 16, outline: 'none', padding: '16px 18px 16px 36px', color: '#fff', fontFamily: F, fontSize: 16, transition: 'border-color 0.15s' }}
              />
            </div>
            {err
              ? <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,90,90,0.8)', marginTop: 7 }}>{err}</div>
              : <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 7 }}>Letters, numbers and underscores only · max 20 chars</div>
            }
          </div>

          {/* Privacy callout */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(127,224,213,0.04)', border: '1px solid rgba(127,224,213,0.1)', borderRadius: 14, padding: '14px 18px', marginBottom: 24 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(177,216,212,0.6)', lineHeight: 1.6 }}>Only your username and avatar are visible to other attendees. Your real name and booking details are never shared.</span>
          </div>

          {/* CTA */}
          <button onClick={onJoin}
            style={{ width: '100%', background: ready ? '#EBE88A' : 'rgba(235,232,138,0.1)', border: 'none', borderRadius: 16, padding: '18px 0', color: ready ? '#0e2a2c' : 'rgba(235,232,138,0.25)', fontFamily: F, fontSize: 17, fontWeight: 800, cursor: ready ? 'pointer' : 'default', letterSpacing: '0.3px', transition: 'all 0.2s' }}>
            Enter Chat →
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatView({ avatar, username, messages, input, setInput, onSend }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length]);

  return (
    <div style={{ height: '100vh', background: '#080a0b', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
      `}</style>
      <Navbar label="Event Chat" />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '340px 1fr', marginTop: 125, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.012)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.4)', fontWeight: 700, marginBottom: 10 }}>Event</div>
            <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 6 }}>Neon Pulse Music Festival</div>
            <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>Sat 14 Jun · Rooftop Arena, London</div>
          </div>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7FE0D5', boxShadow: '0 0 8px #7FE0D5', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontFamily: F, fontSize: 14, color: '#fff', fontWeight: 700 }}>247 people chatting</span>
            </div>
            <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.28)', lineHeight: 1.55, paddingLeft: 18 }}>Attendee identities are kept private.</div>
          </div>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.4)', fontWeight: 700, marginBottom: 12 }}>You</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: avatar.cardBg, overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                <AvatarFace id={avatar.id} size={44}/>
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#fff' }}>@{username}</div>
                <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Your full name is private</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.4)', fontWeight: 700, marginBottom: 12 }}>Organiser</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', border: '1.5px solid rgba(127,224,213,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#7FE0D5' }}>N</span></div>
              <div>
                <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#fff' }}>NeonWave Events</div>
                <div style={{ fontFamily: F, fontSize: 12, color: '#7FE0D5', fontWeight: 500, marginTop: 2 }}>Event organiser</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '18px 24px', flex: 1, overflowY: 'auto' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.4)', fontWeight: 700, marginBottom: 14 }}>Community Rules</div>
            {['Be kind and respectful to everyone', 'No sharing personal information', 'Keep conversation relevant to the event', 'Report issues to the organiser', 'Have fun — see you there! 🎶'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(127,224,213,0.4)', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#fff' }}>Neon Pulse Community Chat</span>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: avatar.cardBg, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <AvatarFace id={avatar.id} size={26}/>
            </div>
            <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>Chatting as @{username}</span>
          </div>
          <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>Today · Chat opened for ticket holders</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>
            {messages.map((m: any) => <Bubble key={m.id} msg={m} myUsername={username} />)}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: avatar.cardBg, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
                <AvatarFace id={avatar.id} size={38}/>
              </div>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && onSend()} placeholder={`Message as @${username}…`} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, outline: 'none', padding: '13px 18px', color: '#fff', fontFamily: F, fontSize: 14 }} />
              <button onClick={onSend} disabled={!input.trim()} style={{ background: input.trim() ? '#EBE88A' : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 13, padding: '13px 24px', color: input.trim() ? '#0e2a2c' : 'rgba(255,255,255,0.2)', fontFamily: F, fontSize: 14, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.15s' }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventChat() {
  const [step, setStep] = useState<'setup' | 'chat'>('setup');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [messages, setMessages] = useState<any[]>(SEED);
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');

  function handleJoin() {
    const u = username.trim();
    if (!u) { setErr('Choose a username to continue'); return; }
    if (u.length < 3) { setErr('Must be at least 3 characters'); return; }
    setStep('chat');
  }

  function handleSend() {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), kind: 'me', avatar, username, text: input.trim(), time: 'just now' }]);
    setInput('');
  }

  if (step === 'setup') {
    return <SetupView avatar={avatar} setAvatar={setAvatar} username={username} setUsername={setUsername} err={err} setErr={setErr} onJoin={handleJoin} />;
  }
  return <ChatView avatar={avatar} username={username} messages={messages} input={input} setInput={setInput} onSend={handleSend} />;
}
