import { useState, useRef, useEffect } from 'react';

const F = 'Urbanist, sans-serif';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const AVATARS = [
  { id: 'wave',  emoji: '🌊', bg: '#0e2e3a' },
  { id: 'fire',  emoji: '🔥', bg: '#3a1a0a' },
  { id: 'music', emoji: '🎵', bg: '#1a0e3a' },
  { id: 'star',  emoji: '⭐', bg: '#2a2a0a' },
  { id: 'moon',  emoji: '🌙', bg: '#141428' },
  { id: 'bolt',  emoji: '⚡', bg: '#2e1e06' },
  { id: 'gem',   emoji: '💎', bg: '#0a2030' },
  { id: 'crown', emoji: '👑', bg: '#2a1408' },
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

function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 40px 0', pointerEvents: 'none', height: 72 }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.12)', backdropFilter: 'blur(12px)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 16, padding: '10px 20px 10px 14px' }}>
        <div style={{ background: '#0e2a2c', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 130, height: 46, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin*" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ fontFamily: F, fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }} onClick={() => window.location.href = `${BASE}/preview/happenin/EventDetail`}>← Back to Event</span>
      </div>
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
          <div style={{ background: 'rgba(235,232,138,0.1)', border: '1px solid rgba(235,232,138,0.22)', borderRadius: '14px 4px 14px 14px', padding: '11px 15px', fontFamily: F, fontSize: 14, color: '#EBE88A', lineHeight: 1.55 }}>{msg.text}</div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: msg.avatar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{msg.avatar.emoji}</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      {isOrg
        ? <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', border: '1.5px solid rgba(127,224,213,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#7FE0D5' }}>N</span></div>
        : <div style={{ width: 34, height: 34, borderRadius: '50%', background: msg.avatar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{msg.avatar.emoji}</div>
      }
      <div style={{ maxWidth: '60%' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          {isOrg
            ? <><span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#7FE0D5' }}>{msg.name}</span><span style={{ fontFamily: F, fontSize: 10, color: 'rgba(127,224,213,0.5)', background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.15)', borderRadius: 4, padding: '1px 6px', letterSpacing: '0.5px' }}>ORGANISER</span></>
            : <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>@{msg.username}</span>
          }
          <span style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{msg.time}</span>
        </div>
        <div style={{ background: isOrg ? 'rgba(127,224,213,0.05)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isOrg ? 'rgba(127,224,213,0.12)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '4px 14px 14px 14px', padding: '11px 15px', fontFamily: F, fontSize: 14, color: isOrg ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.58)', lineHeight: 1.55 }}>
          {msg.text}
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 'chat') bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step, messages.length]);

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

  return (
    <div className="happenin-root" style={{ height: '100vh', background: '#060808', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        @keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>

      {/* ── Profile setup modal ── */}
      {step === 'setup' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, padding: '44px 48px', width: 500, display: 'flex', flexDirection: 'column', gap: 28, animation: 'modalIn 0.4s cubic-bezier(0.22,1,0.36,1) both' }}>

            {/* Title */}
            <div>
              <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.5)', fontWeight: 600, marginBottom: 10 }}>EVENT CHAT · NEON PULSE</div>
              <h2 style={{ fontFamily: F, fontSize: 30, fontWeight: 800, letterSpacing: '-1.2px', color: '#fff', margin: 0, lineHeight: 1.1 }}>Set up your<br />chat profile</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.38)', margin: '10px 0 0', lineHeight: 1.6 }}>Pick an avatar and username. Your full name and booking details stay completely private.</p>
            </div>

            {/* Avatar grid */}
            <div>
              <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 }}>Pick an avatar</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {AVATARS.map(av => (
                  <button key={av.id} onClick={() => setAvatar(av)} style={{ width: 50, height: 50, borderRadius: '50%', background: av.bg, border: avatar.id === av.id ? '2.5px solid #7FE0D5' : '2px solid rgba(255,255,255,0.07)', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', transform: avatar.id === av.id ? 'scale(1.12)' : 'scale(1)', boxShadow: avatar.id === av.id ? '0 0 0 4px rgba(127,224,213,0.15)' : 'none', flexShrink: 0 }}>
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Username input */}
            <div>
              <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10 }}>Choose a username</div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.22)', pointerEvents: 'none' }}>@</span>
                <input value={username} onChange={e => { setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')); setErr(''); }} onKeyDown={e => e.key === 'Enter' && handleJoin()} placeholder="your_handle" maxLength={20} style={{ width: '100%', boxSizing: 'border-box', background: '#0a0a0a', border: `1.5px solid ${err ? 'rgba(255,90,90,0.45)' : username.length >= 3 ? 'rgba(127,224,213,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 14, outline: 'none', padding: '14px 16px 14px 32px', color: '#fff', fontFamily: F, fontSize: 15, transition: 'border-color 0.15s' }} />
              </div>
              {err && <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,90,90,0.8)', marginTop: 6 }}>{err}</div>}
              <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 6 }}>Letters, numbers and underscores only</div>
            </div>

            {/* Privacy callout */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11, background: 'rgba(127,224,213,0.05)', border: '1px solid rgba(127,224,213,0.1)', borderRadius: 14, padding: '13px 16px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(177,216,212,0.65)', lineHeight: 1.55 }}>Only your username and avatar are visible to others. Your real name and booking info are never shared.</span>
            </div>

            {/* CTA */}
            <button onClick={handleJoin} style={{ width: '100%', background: username.trim().length >= 3 ? '#EBE88A' : 'rgba(235,232,138,0.15)', border: 'none', borderRadius: 16, padding: '16px 0', color: username.trim().length >= 3 ? '#0e2a2c' : 'rgba(235,232,138,0.3)', fontFamily: F, fontSize: 16, fontWeight: 800, cursor: username.trim().length >= 3 ? 'pointer' : 'default', letterSpacing: '0.2px', transition: 'all 0.2s' }}>
              Enter Chat →
            </button>
          </div>
        </div>
      )}

      {/* ── App shell ── */}
      <Navbar />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', marginTop: 72, overflow: 'hidden' }}>

        {/* Sidebar */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.4)', fontWeight: 600, marginBottom: 10 }}>Event</div>
            <div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 5 }}>Neon Pulse Music Festival</div>
            <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>Sat 14 Jun · Rooftop Arena, London</div>
          </div>

          <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7FE0D5', boxShadow: '0 0 7px #7FE0D5' }} />
              <span style={{ fontFamily: F, fontSize: 14, color: '#fff', fontWeight: 600 }}>247 people chatting</span>
            </div>
            <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.28)', lineHeight: 1.5, paddingLeft: 16 }}>Attendee identities are kept private. Only usernames are shown.</div>
          </div>

          <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.4)', fontWeight: 600, marginBottom: 12 }}>Organiser</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', border: '1.5px solid rgba(127,224,213,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#7FE0D5' }}>N</span></div>
              <div>
                <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#fff' }}>NeonWave Events</div>
                <div style={{ fontFamily: F, fontSize: 12, color: '#7FE0D5', fontWeight: 500 }}>Event organiser</div>
              </div>
            </div>
          </div>

          {step === 'chat' && (
            <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.4)', fontWeight: 600, marginBottom: 12 }}>You</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: avatar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{avatar.emoji}</div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#fff' }}>@{username}</div>
                  <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Your full name is private</div>
                </div>
              </div>
            </div>
          )}

          <div style={{ padding: '16px 22px', flex: 1, overflowY: 'auto' }}>
            <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.4)', fontWeight: 600, marginBottom: 12 }}>Community Rules</div>
            {['Be kind and respectful to everyone', 'No sharing personal information', 'Keep conversation relevant to the event', 'Report issues to the organiser', 'Have fun — see you there! 🎶'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, marginBottom: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(127,224,213,0.4)', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.55 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main chat */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat header bar */}
          <div style={{ padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#fff' }}>Neon Pulse Community Chat</span>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)' }} />
            {step === 'chat'
              ? <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ fontSize: 16 }}>{avatar.emoji}</span><span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Chatting as @{username}</span></div>
              : <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>Complete your profile to join the conversation</span>
            }
          </div>

          {/* Messages */}
          <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>Today · Chat opened for attendees</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>
            {messages.map(m => <Bubble key={m.id} msg={m} myUsername={username} />)}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
            {step === 'chat' ? (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: avatar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{avatar.emoji}</div>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder={`Message as @${username}…`} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, outline: 'none', padding: '12px 16px', color: '#fff', fontFamily: F, fontSize: 14 }} />
                <button onClick={handleSend} disabled={!input.trim()} style={{ background: input.trim() ? '#EBE88A' : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 12, padding: '12px 20px', color: input.trim() ? '#0e2a2c' : 'rgba(255,255,255,0.2)', fontFamily: F, fontSize: 13, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.15s' }}>Send</button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>Set up your profile above to start chatting</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
