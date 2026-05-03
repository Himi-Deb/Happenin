import { useState, useRef, useEffect } from 'react';
import logoPng from '@assets/Happenin-Logo_1777806807849.png';

const F = 'Urbanist, sans-serif';
const BG = '#0e0c09';
const CARD_BG = '#13110d';
const INPUT_BG = '#0a0804';
const TEAL = '#7FE0D5';
const GOLD = '#EBE88A';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = logoPng;

type AvatarId = 'alex' | 'casey' | 'jordan' | 'morgan' | 'river' | 'sky';

const AVATAR_PALETTES: Record<AvatarId, { bg: string; skin: string; hair: string; cardBg: string }> = {
  alex:   { bg: '#7FE0D5', skin: '#F5CBA7', hair: '#2C1810', cardBg: 'linear-gradient(135deg,#0d1f1f,#0e2a2c)' },
  casey:  { bg: '#EBE88A', skin: '#F4A574', hair: '#1a1a1a', cardBg: 'linear-gradient(135deg,#1f1e0d,#2a2c0e)' },
  jordan: { bg: '#B0A4E8', skin: '#FDDBC4', hair: '#1C0A00', cardBg: 'linear-gradient(135deg,#130d1f,#1a0e2a)' },
  morgan: { bg: '#F4A0B0', skin: '#E8B89A', hair: '#4a2c1a', cardBg: 'linear-gradient(135deg,#1f0d12,#2a0e15)' },
  river:  { bg: '#94C8FF', skin: '#C68642', hair: '#111', cardBg: 'linear-gradient(135deg,#0d121f,#0e152a)' },
  sky:    { bg: '#A8E6A3', skin: '#FFD5B2', hair: '#3d2314', cardBg: 'linear-gradient(135deg,#0d1f0e,#0e2a10)' },
};

function AvatarFace({ id, size = 40 }: { id: AvatarId; size?: number }) {
  const p = AVATAR_PALETTES[id] || AVATAR_PALETTES.alex;
  const s = size;
  const cx = s / 2, cy = s / 2;
  const headR = s * 0.32;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={cx} fill={p.bg} opacity="0.25" />
      <ellipse cx={cx} cy={cy + s * 0.07} rx={headR} ry={headR * 1.05} fill={p.skin} />
      <ellipse cx={cx} cy={cy - s * 0.12} rx={headR * 1.05} ry={headR * 0.6} fill={p.hair} />
      <circle cx={cx - s * 0.09} cy={cy + s * 0.02} r={s * 0.04} fill={p.hair} opacity="0.9" />
      <circle cx={cx + s * 0.09} cy={cy + s * 0.02} r={s * 0.04} fill={p.hair} opacity="0.9" />
      <path d={`M ${cx - s * 0.07} ${cy + s * 0.11} Q ${cx} ${cy + s * 0.16} ${cx + s * 0.07} ${cy + s * 0.11}`} fill="none" stroke={p.hair} strokeWidth={s * 0.025} strokeLinecap="round" />
    </svg>
  );
}

const AVATARS = (Object.keys(AVATAR_PALETTES) as AvatarId[]).map(id => ({ id, ...AVATAR_PALETTES[id] }));

type Msg = { id: number; kind: 'other' | 'me' | 'organiser'; avatar: typeof AVATARS[0]; username: string; text: string; time: string; hasImg?: boolean; imgCaption?: string };

const SEED: Msg[] = [
  { id: 1, kind: 'organiser', avatar: AVATARS[1], username: 'NeonWave', text: '🎶 Welcome to the Neon Pulse community chat! Doors open at 5:30 PM — see you all tonight. Feel free to connect and get hyped!', time: '2:14 PM' },
  { id: 2, kind: 'other', avatar: AVATARS[2], username: 'stellar_j', text: "Can't wait! First time at Rooftop Arena — is there a cloakroom?", time: '2:16 PM' },
  { id: 3, kind: 'other', avatar: AVATARS[0], username: 'wavepulse', text: 'Yes! Cloakroom is on the left as you enter. Free to use.', time: '2:17 PM' },
  { id: 4, kind: 'other', avatar: AVATARS[4], username: 'r_coast88', text: 'Does anyone know the setlist order tonight?', time: '2:21 PM' },
  { id: 5, kind: 'organiser', avatar: AVATARS[1], username: 'NeonWave', text: 'Warm-up DJ kicks off at 6:30, then Hybrid Minds at 8, DJ Mara headlining at 10. Full schedule posted on the event page! 🔥', time: '2:23 PM' },
  { id: 6, kind: 'other', avatar: AVATARS[3], username: 'morganm', text: 'DJ Mara is going to be incredible. Saw her in Berlin last year.', time: '2:25 PM' },
  { id: 7, kind: 'other', avatar: AVATARS[5], username: 'skyline_x', text: 'Coming from Manchester — is the nearest tube Waterloo?', time: '2:31 PM' },
  { id: 8, kind: 'other', avatar: AVATARS[0], username: 'wavepulse', text: "Yes, Waterloo is 5 min walk. Blackfriars also works if you're on the District line.", time: '2:32 PM' },
  { id: 9, kind: 'other', avatar: AVATARS[4], username: 'r_coast88', text: "Brilliant, cheers! See you all there 👋", time: '2:35 PM' },
];

function Bubble({ msg, myUsername }: { msg: Msg; myUsername: string }) {
  const isMe = msg.username === myUsername;
  const isOrg = msg.kind === 'organiser';
  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
      {!isMe && (
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: isOrg ? 'linear-gradient(135deg,#0e2a2c,#1a4a4e)' : msg.avatar.cardBg, border: `1.5px solid ${isOrg ? 'rgba(127,224,213,0.35)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
          {isOrg ? <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TEAL }}>N</span> : <AvatarFace id={msg.avatar.id} size={36} />}
        </div>
      )}
      <div style={{ maxWidth: '72%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', gap: 3 }}>
        {!isMe && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: isOrg ? TEAL : 'rgba(255,255,255,0.65)', fontFamily: F }}>@{msg.username}</span>
            {isOrg && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.7px', color: TEAL, background: `${TEAL}16`, border: `1px solid ${TEAL}25`, borderRadius: 5, padding: '2px 7px', textTransform: 'uppercase' }}>Organiser</span>}
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: F }}>{msg.time}</span>
          </div>
        )}
        <div style={{ padding: '10px 14px', borderRadius: isMe ? '16px 16px 4px 16px' : isOrg ? '4px 16px 16px 16px' : '4px 16px 16px 16px', background: isMe ? GOLD : isOrg ? 'rgba(127,224,213,0.1)' : CARD_BG, border: `1px solid ${isMe ? 'transparent' : isOrg ? 'rgba(127,224,213,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
          <span style={{ fontSize: 14, color: isMe ? '#0e2a2c' : 'rgba(255,255,255,0.7)', fontFamily: F, lineHeight: 1.55 }}>{msg.text}</span>
        </div>
        {isMe && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: F, marginRight: 2 }}>{msg.time}</span>}
      </div>
    </div>
  );
}

function SetupView({ avatar, setAvatar, username, setUsername, err, setErr, onJoin }: {
  avatar: typeof AVATARS[0]; setAvatar: (a: typeof AVATARS[0]) => void;
  username: string; setUsername: (s: string) => void;
  err: string; setErr: (s: string) => void; onJoin: () => void;
}) {
  return (
    <div style={{ height: '100vh', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: F }}>
      <style>{`.pulse-dot { animation: pulse-dot 2s ease-in-out infinite; } @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }`}</style>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
          <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
            <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
          </div>
          <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Event Chat</span>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 93 }}>
        <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg,#0d1e20 0%,#101510 50%,#1a1208 100%)', padding: '28px 28px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(127,224,213,0.03) 0,rgba(127,224,213,0.03) 1px,transparent 1px,transparent 20px)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: TEAL, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.65)' }}>Live Chat</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: '#fff', marginBottom: 4 }}>Neon Pulse Music Festival</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Sat 14 Jun · Rooftop Arena, London</div>
              </div>
            </div>
            <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>Choose your avatar</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {AVATARS.map(av => (
                    <div key={av.id} onClick={() => setAvatar(av)} style={{ width: 50, height: 50, borderRadius: '50%', background: av.cardBg, border: `2px solid ${av.id === avatar.id ? TEAL : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', overflow: 'hidden', boxShadow: av.id === avatar.id ? `0 0 0 3px ${TEAL}20` : 'none', flexShrink: 0 }}>
                      <AvatarFace id={av.id} size={50} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10 }}>Username</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: INPUT_BG, border: `1px solid ${err ? 'rgba(255,100,100,0.5)' : 'rgba(255,255,255,0.09)'}`, borderRadius: 14, padding: '4px 4px 4px 16px' }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.22)' }}>@</span>
                  <input value={username} onChange={e => { setUsername(e.target.value.replace(/[^a-z0-9_]/gi, '').toLowerCase()); setErr(''); }} placeholder="choose_username" maxLength={24} style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontFamily: F, fontSize: 16, fontWeight: 600 }} />
                </div>
                {err && <div style={{ fontSize: 12, color: 'rgba(255,100,100,0.7)', marginTop: 6 }}>{err}</div>}
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>Your real name is never shown in chat</div>
              </div>
              <button onClick={onJoin} style={{ width: '100%', background: GOLD, border: 'none', borderRadius: 14, padding: '16px 0', fontFamily: F, fontSize: 16, fontWeight: 800, color: '#0e2a2c', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Join Chat →
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: F }}>Anonymous chat — your identity is private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatView({ avatar, username, messages, input, setInput, onSend }: {
  avatar: typeof AVATARS[0]; username: string;
  messages: Msg[]; input: string;
  setInput: (s: string) => void; onSend: () => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div style={{ height: '100vh', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: F }}>
      <style>{`
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 4px; }
      `}</style>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
          <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
            <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
          </div>
          <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400 }}>Event Chat</span>
        </div>
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, margin: '125px 20px 20px', background: CARD_BG }}>
        {/* Sidebar */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.012)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.4)', fontWeight: 700, marginBottom: 10 }}>Event</div>
            <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 6 }}>Neon Pulse Music Festival</div>
            <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>Sat 14 Jun · Rooftop Arena, London</div>
          </div>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: TEAL, boxShadow: `0 0 8px ${TEAL}`, flexShrink: 0 }} />
              <span style={{ fontFamily: F, fontSize: 14, color: '#fff', fontWeight: 700 }}>247 people chatting</span>
            </div>
            <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.28)', lineHeight: 1.55, paddingLeft: 18 }}>Attendee identities are kept private.</div>
          </div>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.4)', fontWeight: 700, marginBottom: 12 }}>You</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: avatar.cardBg, overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                <AvatarFace id={avatar.id} size={44} />
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
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', border: '1.5px solid rgba(127,224,213,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: TEAL }}>N</span>
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#fff' }}>NeonWave Events</div>
                <div style={{ fontFamily: F, fontSize: 12, color: TEAL, fontWeight: 500, marginTop: 2 }}>Event organiser</div>
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
              <AvatarFace id={avatar.id} size={26} />
            </div>
            <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>Chatting as @{username}</span>
          </div>
          <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>Today · Chat opened for ticket holders</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>
            {messages.map(m => <Bubble key={m.id} msg={m} myUsername={username} />)}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: avatar.cardBg, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
                <AvatarFace id={avatar.id} size={38} />
              </div>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && onSend()} placeholder={`Message as @${username}…`} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, outline: 'none', padding: '13px 18px', color: '#fff', fontFamily: F, fontSize: 14 }} />
              <button onClick={onSend} disabled={!input.trim()} style={{ background: input.trim() ? GOLD : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 13, padding: '13px 24px', color: input.trim() ? '#0e2a2c' : 'rgba(255,255,255,0.2)', fontFamily: F, fontSize: 14, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.15s' }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventChatPage() {
  const [step, setStep] = useState<'setup' | 'chat'>('setup');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [messages, setMessages] = useState<Msg[]>(SEED);
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
    setMessages(prev => [...prev, { id: Date.now(), kind: 'me' as const, avatar, username, text: input.trim(), time: 'just now' }]);
    setInput('');
  }

  if (step === 'setup') {
    return <SetupView avatar={avatar} setAvatar={setAvatar} username={username} setUsername={setUsername} err={err} setErr={setErr} onJoin={handleJoin} />;
  }
  return <ChatView avatar={avatar} username={username} messages={messages} input={input} setInput={setInput} onSend={handleSend} />;
}
