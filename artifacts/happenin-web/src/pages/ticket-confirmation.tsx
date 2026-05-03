import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

const F = 'Urbanist, sans-serif';
const BG = '#0e0c09';
const CARD_BG = '#13110d';
const TEAL = '#7FE0D5';
const GOLD = '#EBE88A';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = `${BASE}/happenin-logo-new.png`;

function AnimatedCheck() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t); }, []);
  return (
    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(127,224,213,0.1)', border: `2px solid ${TEAL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.5s ease', transform: visible ? 'scale(1)' : 'scale(0)', opacity: visible ? 1 : 0 }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  );
}

function QRCode() {
  const cells = Array.from({ length: 21 }, (_, row) =>
    Array.from({ length: 21 }, (_, col) => {
      const edgeBlock =
        (row < 7 && col < 7) || (row < 7 && col > 13) || (row > 13 && col < 7);
      if (edgeBlock) return row === 0 || row === 6 || col === 0 || col === 6 || row === 1 || col === 1 || (row >= 2 && row <= 4 && col >= 2 && col <= 4) ? 1 : 0;
      return Math.random() > 0.55 ? 1 : 0;
    })
  );
  return (
    <div style={{ display: 'inline-block', background: '#fff', padding: 12, borderRadius: 12 }}>
      <svg width={21 * 7} height={21 * 7} viewBox={`0 0 ${21 * 7} ${21 * 7}`}>
        {cells.map((row, r) => row.map((cell, c) => cell ? (
          <rect key={`${r}-${c}`} x={c * 7} y={r * 7} width={7} height={7} fill="#0e0c09" rx={1} />
        ) : null))}
      </svg>
    </div>
  );
}

function TicketCard() {
  return (
    <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, overflow: 'hidden', width: '100%', maxWidth: 400 }}>
      {/* Event banner */}
      <div style={{ position: 'relative', height: 140, background: 'linear-gradient(135deg,#0d1e20,#1a1208)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(14,12,9,0.65) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
          <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(127,224,213,0.8)', marginBottom: 4 }}>Free Event · Music</div>
          <div style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>Neon Pulse Music Festival</div>
        </div>
        {/* Free badge */}
        <div style={{ position: 'absolute', top: 14, right: 14, background: TEAL, borderRadius: 8, padding: '4px 10px' }}>
          <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: '#0e2a2c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>FREE</span>
        </div>
      </div>

      {/* Perforated divider */}
      <div style={{ height: 1, borderTop: '1.5px dashed rgba(255,255,255,0.1)', margin: '0 -1px' }} />

      {/* Details */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
          {[
            { label: 'Date', val: 'Sat, 14 Jun 2025' },
            { label: 'Doors', val: '5:30 PM' },
            { label: 'Venue', val: 'Rooftop Arena' },
            { label: 'City', val: 'London, UK' },
          ].map(d => (
            <div key={d.label}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>{d.label}</div>
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{d.val}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 0 20px', borderBottom: '1.5px dashed rgba(255,255,255,0.08)' }}>
          <div>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>Holder</div>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>Maya Chen</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>Ticket</div>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>General Admission</div>
          </div>
        </div>
      </div>

      {/* QR */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <QRCode />
        <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>NP-2025-MC-0842</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,0.07)', padding: '64px 80px 40px', marginTop: 80 }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
          {[
            { heading: 'ABOUT HAPPENIN', links: ['Home','Discover','Events','Saved','Profile'] },
            { heading: 'LEGAL', links: ['Terms of Service','Privacy Policy'] },
            { heading: 'SOCIAL', links: ['Instagram','X','Email','LinkedIn'] },
          ].map(col => (
            <div key={col.heading}>
              <div style={{ fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: TEAL, marginBottom: 16, fontFamily: F, fontWeight: 700 }}>{col.heading}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => <a key={l} href="#" style={{ fontSize: 16, color: '#fff', textDecoration: 'none', fontFamily: F }}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: F }}>© 2025 happenin*</div>
      </div>
    </footer>
  );
}

export default function TicketConfirmation() {
  const [, navigate] = useLocation();

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#fff', overflow: 'hidden' }}>
      <style>{`@keyframes confetti-fall { from{transform:translateY(-20px) rotate(0deg);opacity:1} to{transform:translateY(100vh) rotate(720deg);opacity:0} }`}</style>

      {/* BG blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '60%', height: '80%', background: 'radial-gradient(ellipse at 25% 25%, rgba(127,224,213,0.05) 0%, transparent 65%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '45%', height: '60%', background: 'radial-gradient(ellipse at 75% 75%, rgba(235,232,138,0.03) 0%, transparent 65%)', borderRadius: '50%' }} />
      </div>

      {/* Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
          <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
            <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
          </div>
          <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400 }}>Ticket Confirmed</span>
        </div>
        <div style={{ pointerEvents: 'all' }}>
          <div style={{ background: GOLD, borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', cursor: 'pointer' }}>
            <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c' }}>Maya Chen</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 80px', paddingTop: 93 }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', paddingTop: 64 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
            {/* Left: ticket + actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <TicketCard />
              {/* Action buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { icon: '⬇️', label: 'Download Ticket', sub: 'Save as PDF' },
                  { icon: '🗓️', label: 'Add to Calendar', sub: 'Google, Apple, ICS' },
                  { icon: '📋', label: 'Copy Ticket Code', sub: 'NP-2025-MC-0842' },
                  { icon: '↗️', label: 'Share Event', sub: 'Send to a friend' },
                ].map(a => (
                  <button key={a.label} style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: 20 }}>{a.icon}</span>
                    <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>{a.label}</span>
                    <span style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{a.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: confirmation + map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Success */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <AnimatedCheck />
                <div>
                  <h1 style={{ fontFamily: F, fontSize: 52, fontWeight: 800, letterSpacing: '-2px', color: '#fff', margin: '0 0 8px', lineHeight: 0.95 }}>You're in! 🎉</h1>
                  <p style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.65 }}>
                    Your free ticket for <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Neon Pulse Music Festival</strong> is confirmed.<br />
                    A copy has been sent to <strong style={{ color: 'rgba(255,255,255,0.75)' }}>maya.chen@email.com</strong>
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <button onClick={() => navigate('/chat')} style={{ flex: 1, background: GOLD, border: 'none', borderRadius: 14, padding: '15px 0', fontFamily: F, fontSize: 15, fontWeight: 800, color: '#0e2a2c', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Join the Chat 💬
                  </button>
                  <button onClick={() => navigate('/event/1')} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '15px 0', fontFamily: F, fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.55)', cursor: 'pointer' }}>
                    View Event
                  </button>
                </div>
              </div>

              {/* Event summary */}
              <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Event Info</div>
                {[
                  { icon: '📅', val: 'Saturday, 14 June 2025 · 6:00 PM' },
                  { icon: '📍', val: 'Rooftop Arena, 32 Upper Ground, London SE1 9PP' },
                  { icon: '🎟️', val: 'General Admission · Free' },
                  { icon: '🚇', val: 'Nearest tube: Waterloo (5 min walk)' },
                ].map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{d.icon}</span>
                    <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{d.val}</span>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ height: 180, position: 'relative', background: '#0d1415' }}>
                  <svg viewBox="0 0 600 180" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                    <rect width="600" height="180" fill="#0d1415"/>
                    {[0,60,120,180,240,300,360,420,480,540,600].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="180" stroke="rgba(127,224,213,0.04)" strokeWidth="1"/>)}
                    {[0,45,90,135,180].map(y => <line key={`h${y}`} x1="0" y1={y} x2="600" y2={y} stroke="rgba(127,224,213,0.04)" strokeWidth="1"/>)}
                    <rect x="120" y="20" width="360" height="140" rx="10" fill="rgba(14,42,44,0.4)" stroke="rgba(127,224,213,0.07)" strokeWidth="1"/>
                    <rect x="180" y="55" width="80" height="45" rx="4" fill="rgba(127,224,213,0.06)" stroke="rgba(127,224,213,0.08)" strokeWidth="1"/>
                    <rect x="280" y="45" width="60" height="55" rx="4" fill="rgba(127,224,213,0.06)" stroke="rgba(127,224,213,0.08)" strokeWidth="1"/>
                    <rect x="360" y="60" width="90" height="40" rx="4" fill="rgba(127,224,213,0.06)" stroke="rgba(127,224,213,0.08)" strokeWidth="1"/>
                    <circle cx="300" cy="90" r="14" fill="rgba(127,224,213,0.2)"/>
                    <circle cx="300" cy="90" r="8" fill={TEAL}/>
                    <circle cx="300" cy="90" r="4" fill="#0e2a2c"/>
                  </svg>
                </div>
                <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#fff' }}>Rooftop Arena</div>
                    <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>32 Upper Ground, South Bank, London SE1 9PP</div>
                  </div>
                  <button style={{ background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 10, padding: '8px 14px', fontFamily: F, fontSize: 12, fontWeight: 700, color: TEAL, cursor: 'pointer' }}>Directions →</button>
                </div>
              </div>

              {/* Lineup preview */}
              <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '20px 24px' }}>
                <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>Tonight's Lineup</div>
                {[
                  { act: 'Warm Up DJ', time: '6:30 PM', type: 'support' },
                  { act: 'Hybrid Minds', time: '8:00 PM', type: 'support' },
                  { act: 'DJ Mara', time: '10:00 PM', type: 'headline' },
                ].map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.type === 'headline' ? TEAL : 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                      <span style={{ fontFamily: F, fontSize: 14, fontWeight: l.type === 'headline' ? 700 : 500, color: l.type === 'headline' ? '#fff' : 'rgba(255,255,255,0.5)' }}>{l.act}</span>
                      {l.type === 'headline' && <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TEAL, background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 6, padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Headliner</span>}
                    </div>
                    <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{l.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
