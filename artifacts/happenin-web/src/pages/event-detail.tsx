import { useState } from 'react';
import { useLocation } from 'wouter';

const F = 'Urbanist, sans-serif';
const BG = '#0e0c09';
const CARD_BG = '#13110d';
const TEAL = '#7FE0D5';
const GOLD = '#EBE88A';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = `${BASE}/happenin-logo-new.png`;

const PERFORMERS = [
  { name: 'DJ Mara', role: 'Headliner', time: '10:00 PM', img: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Hybrid Minds', role: 'Support', time: '8:00 PM', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80' },
  { name: 'Warm Up DJ', role: 'Support', time: '6:30 PM', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=400&q=80' },
];

const TICKET_TYPES = [
  { name: 'General Admission', desc: 'Access to all stages, bars and the rooftop terrace', capacity: 1200, claimed: 842, available: 358 },
  { name: 'Early Access', desc: 'Doors open 30 minutes early with priority entry queue', capacity: 100, claimed: 100, available: 0 },
];

const GALLERY_IMGS = [
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
];

const AGENDA = [
  { time: '5:30 PM', label: 'Doors Open', type: 'info' },
  { time: '6:30 PM', label: 'Warm Up DJ', type: 'set' },
  { time: '8:00 PM', label: 'Hybrid Minds', type: 'set' },
  { time: '9:30 PM', label: 'Short Break', type: 'info' },
  { time: '10:00 PM', label: 'DJ Mara (Headline Set)', type: 'headline' },
  { time: '11:30 PM', label: 'Event Ends', type: 'info' },
];

function Navbar() {
  const [, navigate] = useLocation();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28, cursor: 'pointer' }} onClick={() => navigate('/discover')}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400 }}>Discover</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 4 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        <div onClick={() => navigate('/login')} style={{ background: GOLD, borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 32px', cursor: 'pointer' }}>
          <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c', textTransform: 'uppercase', letterSpacing: '1px' }}>LOGIN</span>
        </div>
      </div>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: typeof TICKET_TYPES[0] }) {
  const [, navigate] = useLocation();
  const pct = Math.round((ticket.claimed / ticket.capacity) * 100);
  const soldOut = ticket.available === 0;
  return (
    <div style={{ background: CARD_BG, border: `1px solid ${soldOut ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.09)'}`, borderRadius: 20, padding: '22px 24px', opacity: soldOut ? 0.55 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: soldOut ? 'rgba(255,255,255,0.4)' : '#fff', marginBottom: 5 }}>{ticket.name}</div>
          <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{ticket.desc}</div>
        </div>
        <div style={{ background: soldOut ? 'rgba(255,255,255,0.04)' : 'rgba(127,224,213,0.1)', border: `1px solid ${soldOut ? 'rgba(255,255,255,0.06)' : 'rgba(127,224,213,0.2)'}`, borderRadius: 10, padding: '6px 12px', flexShrink: 0, marginLeft: 16, textAlign: 'center' }}>
          <div style={{ fontFamily: F, fontSize: 16, fontWeight: 900, color: soldOut ? 'rgba(255,255,255,0.25)' : TEAL }}>£0</div>
          <div style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: soldOut ? 'rgba(255,255,255,0.2)' : 'rgba(127,224,213,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Free</div>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{ticket.claimed} claimed</span>
          <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{soldOut ? 'Sold out' : `${ticket.available} left`}</span>
        </div>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 4 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: soldOut ? 'rgba(255,255,255,0.1)' : TEAL, borderRadius: 4, opacity: 0.75 }} />
        </div>
      </div>
      <button
        onClick={() => !soldOut && navigate('/checkout')}
        style={{ width: '100%', background: soldOut ? 'rgba(255,255,255,0.04)' : GOLD, border: `1px solid ${soldOut ? 'rgba(255,255,255,0.07)' : 'transparent'}`, borderRadius: 14, padding: '14px 0', fontFamily: F, fontSize: 15, fontWeight: 800, color: soldOut ? 'rgba(255,255,255,0.2)' : '#0e2a2c', cursor: soldOut ? 'default' : 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}
      >
        {soldOut ? 'Sold Out' : 'Get Tickets →'}
      </button>
    </div>
  );
}

export default function EventDetail() {
  const [, navigate] = useLocation();
  const [saved, setSaved] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [activeTab, setActiveTab] = useState<'about' | 'lineup' | 'agenda'>('about');

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ paddingTop: 93, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', height: 480, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center 25%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,12,9,0.2) 0%, rgba(14,12,9,0.6) 55%, #0e0c09 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 80px 48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(127,224,213,0.12)', border: '1px solid rgba(127,224,213,0.22)', borderRadius: 9999, padding: '5px 14px', marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL }} />
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: TEAL }}>Free Event · Music</span>
            </div>
            <h1 style={{ fontFamily: F, fontSize: 64, fontWeight: 800, letterSpacing: '-2.5px', color: '#fff', margin: '0 0 18px', lineHeight: 0.95 }}>Neon Pulse<br/>Music Festival</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 16 }}>📅</span><span style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>Sat, 14 Jun 2025 · 6:00 PM – 11:30 PM</span></div>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 16 }}>📍</span><span style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>Rooftop Arena, London</span></div>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 16 }}>👥</span><span style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>842 attending</span></div>
            </div>
          </div>
          {/* Save button */}
          <button onClick={() => setSaved(s => !s)} style={{ position: 'absolute', top: 28, right: 80, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? GOLD : 'none'} stroke={saved ? GOLD : 'rgba(255,255,255,0.7)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: saved ? GOLD : 'rgba(255,255,255,0.7)' }}>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '56px 80px', maxWidth: 1520, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 56, alignItems: 'start' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Tabs */}
            <div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 4, width: 'fit-content' }}>
                {(['about', 'lineup', 'agenda'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 22px', borderRadius: 11, background: activeTab === tab ? CARD_BG : 'transparent', border: `1px solid ${activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent'}`, fontFamily: F, fontSize: 14, fontWeight: 700, color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s' }}>
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'about' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <p style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>
                    Join us for a night of pulsing electronic music under the open sky at Rooftop Arena, South Bank. From ambient warm-ups to peak-hour sets, Neon Pulse brings together the city's finest DJs for a free, all-welcome festival.<br /><br />
                    Doors open at 5:30 PM. This is a free event — tickets are required to secure your spot and will be scanned at the door. Capacity is limited to 1,200 guests.<br /><br />
                    Age restriction: 18+. Valid photo ID required. The venue is fully accessible — wheelchair access via the Waterloo Road entrance.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                    {[
                      { icon: '🎟️', label: 'Price', val: 'Free' },
                      { icon: '🔞', label: 'Age', val: '18+ · ID required' },
                      { icon: '♿', label: 'Access', val: 'Fully accessible' },
                      { icon: '🎧', label: 'Genre', val: 'Electronic / Drum & Bass' },
                    ].map(d => (
                      <div key={d.label} style={{ display: 'flex', gap: 12, alignItems: 'center', background: CARD_BG, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px' }}>
                        <span style={{ fontSize: 20 }}>{d.icon}</span>
                        <div>
                          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>{d.label}</div>
                          <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{d.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'lineup' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {PERFORMERS.map(p => (
                    <div key={p.name} style={{ display: 'flex', gap: 16, alignItems: 'center', background: CARD_BG, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '16px 20px' }}>
                      <div style={{ width: 64, height: 64, borderRadius: 16, overflow: 'hidden', flexShrink: 0, background: '#111' }}>
                        <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: F, fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>{p.name}</div>
                        <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{p.role} · {p.time}</div>
                      </div>
                      {p.role === 'Headliner' && (
                        <div style={{ background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 9, padding: '5px 12px', flexShrink: 0 }}>
                          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '1px' }}>Headliner</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'agenda' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderLeft: '2px solid rgba(255,255,255,0.07)', marginLeft: 8, paddingLeft: 0 }}>
                  {AGENDA.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, paddingBottom: 20, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -9, top: 7, width: 16, height: 16, borderRadius: '50%', background: a.type === 'headline' ? TEAL : a.type === 'set' ? GOLD : 'rgba(255,255,255,0.15)', border: `2px solid ${BG}` }} />
                      <div style={{ marginLeft: 24 }}>
                        <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginBottom: 3 }}>{a.time}</div>
                        <div style={{ fontFamily: F, fontSize: 16, fontWeight: a.type === 'headline' ? 800 : 600, color: a.type === 'info' ? 'rgba(255,255,255,0.5)' : '#fff' }}>{a.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Gallery */}
            <div>
              <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Gallery</div>
              <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', position: 'relative', cursor: 'pointer' }}>
                <img src={GALLERY_IMGS[activeGallery]} alt="gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
                  {GALLERY_IMGS.map((_, i) => (
                    <button key={i} onClick={() => setActiveGallery(i)} style={{ width: i === activeGallery ? 28 : 8, height: 8, borderRadius: 9999, background: i === activeGallery ? '#fff' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Location</div>
              <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ height: 200, background: '#0d1415', position: 'relative' }}>
                  <svg viewBox="0 0 800 200" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                    <rect width="800" height="200" fill="#0d1415"/>
                    {[0,100,200,300,400,500,600,700,800].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="rgba(127,224,213,0.04)" strokeWidth="1"/>)}
                    {[0,50,100,150,200].map(y => <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="rgba(127,224,213,0.04)" strokeWidth="1"/>)}
                    <rect x="200" y="40" width="400" height="120" rx="12" fill="rgba(14,42,44,0.4)" stroke="rgba(127,224,213,0.07)" strokeWidth="1"/>
                    {[220,280,340,400,460,520].map((x, i) => <rect key={i} x={x} y={55 + (i % 2) * 20} width={40} height={35} rx="4" fill="rgba(127,224,213,0.05)" stroke="rgba(127,224,213,0.07)" strokeWidth="1"/>)}
                    <circle cx="400" cy="100" r="18" fill="rgba(127,224,213,0.2)"/>
                    <circle cx="400" cy="100" r="10" fill={TEAL}/>
                    <circle cx="400" cy="100" r="4" fill="#0e2a2c"/>
                  </svg>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#fff' }}>Rooftop Arena</div>
                    <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>32 Upper Ground, South Bank, SE1 9PP · Nearest tube: Waterloo</div>
                  </div>
                  <button style={{ background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 10, padding: '9px 16px', fontFamily: F, fontSize: 13, fontWeight: 700, color: TEAL, cursor: 'pointer', flexShrink: 0 }}>Directions</button>
                </div>
              </div>
            </div>

            {/* Community chat CTA */}
            <div style={{ background: 'linear-gradient(135deg,#0d1e20 0%,#1a1208 100%)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
              <div>
                <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(127,224,213,0.6)', marginBottom: 8 }}>Ticket Holders Only</div>
                <h3 style={{ fontFamily: F, fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.5px' }}>Join the Community Chat</h3>
                <p style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Connect with 247 people attending this event. Anonymously.</p>
              </div>
              <button onClick={() => navigate('/chat')} style={{ background: GOLD, border: 'none', borderRadius: 14, padding: '14px 28px', fontFamily: F, fontSize: 15, fontWeight: 800, color: '#0e2a2c', cursor: 'pointer', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                Join the Chat →
              </button>
            </div>
          </div>

          {/* Right: sticky ticket panel */}
          <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)' }}>Claim Tickets</div>
            {TICKET_TYPES.map(t => <TicketCard key={t.name} ticket={t} />)}
            {/* Organiser */}
            <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '20px 22px' }}>
              <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>Organised by</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#0e2a2c,#1a4a4e)', border: '2px solid rgba(127,224,213,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: TEAL }}>N</span>
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#fff' }}>NeonWave Events</div>
                  <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>12 events hosted · 4.9 ★</div>
                </div>
              </div>
            </div>
            {/* Share */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ icon: '🔗', label: 'Copy Link' }, { icon: '📤', label: 'Share' }, { icon: '⬇️', label: 'Save' }].map(s => (
                <button key={s.label} style={{ flex: 1, background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '12px 0', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
