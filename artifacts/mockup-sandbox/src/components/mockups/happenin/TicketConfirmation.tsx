import './_group.css';
import { useState } from 'react';

const F = 'var(--font)';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;

const EVENT = {
  title: 'Neon Pulse',
  subtitle: 'Music Festival',
  date: 'SAT 14 JUN 2025',
  time: '6:00 PM',
  endTime: '11:00 PM',
  duration: '5 hrs',
  venue: 'Rooftop Arena',
  city: 'South Bank, London',
  tier: 'Early Bird',
  ticketRef: 'HP-2025-004821',
  gate: 'A',
  section: 'General',
  attendee: 'Alex Morgan',
};

function Barcode() {
  const pattern = [3,1,2,1,1,3,2,1,1,2,1,3,1,1,2,3,1,2,1,1,3,1,1,2,1,2,3,1,2,1,1,3,2,1,2,1,1,2,3,1,1,2,1,3,1,2,1,1,2,3,1,1,2,1,2,1,3,2,1,1,3,1,2,1,1,2,3,1,1,2,1,3,2,1,1,2,1,1,3,2];
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', height: 56, gap: 0, width: '100%' }}>
      {pattern.map((w, i) => (
        <div key={i} style={{ flex: w, background: i % 2 === 0 ? '#0e2a2c' : 'transparent', height: '100%', borderRadius: 1 }} />
      ))}
    </div>
  );
}

function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="Happenin" style={{ height: 32, width: 'auto', display: 'block', objectFit: 'contain' }} />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Discover</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <div style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 32px', cursor: 'pointer' }}>
          <span style={{ color: '#0e2a2c', fontFamily: F, fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>MY TICKETS</span>
        </div>
      </div>
    </div>
  );
}

function TicketCard() {
  return (
    <div style={{ width: '100%', background: '#F4F1EA', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.25)', fontFamily: F, transition: 'box-shadow 0.3s' }}>
      <div style={{ background: '#0e2a2c', padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.7)', fontWeight: 600 }}>{EVENT.title}</span>
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(177,216,212,0.3)' }} />
          <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.7)', fontWeight: 600 }}>ADMITS ONE</span>
        </div>
        <div style={{ background: '#EBE88A', borderRadius: 9999, padding: '4px 14px', fontFamily: F, fontSize: 11, fontWeight: 800, color: '#0e2a2c', letterSpacing: '1.5px', textTransform: 'uppercase' }}>FREE</div>
      </div>
      <div style={{ padding: '24px 28px 18px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600, marginBottom: 6 }}>Attendee</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: '#0e1a1b', letterSpacing: '-1px', lineHeight: 1 }}>{EVENT.attendee}</div>
      </div>
      <div style={{ margin: '0 28px', height: 1, background: 'rgba(14,26,27,0.08)' }} />
      <div style={{ padding: '20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0e1a1b', letterSpacing: '-1px', lineHeight: 1, fontFamily: F }}>{EVENT.time}</div>
            <div style={{ fontSize: 10, color: '#9a9080', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, fontFamily: F }}>Doors Open</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '0 20px' }}>
            <div style={{ fontSize: 10, color: '#9a9080', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, fontFamily: F }}>{EVENT.duration}</div>
            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0e2a2c', flexShrink: 0 }} />
              <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #0e2a2c, rgba(14,42,44,0.3))' }} />
              <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: '#0e2a2c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B1D8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, rgba(14,42,44,0.3), #0e2a2c)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0e2a2c', flexShrink: 0 }} />
            </div>
            <div style={{ fontSize: 10, color: 'rgba(14,26,27,0.3)', textTransform: 'uppercase', fontWeight: 500, textAlign: 'center', fontFamily: F }}>{EVENT.date}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0e1a1b', letterSpacing: '-1px', lineHeight: 1, fontFamily: F }}>{EVENT.endTime}</div>
            <div style={{ fontSize: 10, color: '#9a9080', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, fontFamily: F }}>Close</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0e1a1b', fontFamily: F }}>{EVENT.venue}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0e1a1b', fontFamily: F }}>{EVENT.city}</div>
        </div>
      </div>
      <div style={{ margin: '0 28px', height: 1, background: 'rgba(14,26,27,0.08)' }} />
      <div style={{ padding: '16px 28px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600, marginBottom: 6, fontFamily: F }}>Booking Reference</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0e1a1b', letterSpacing: '2px', fontFamily: 'monospace, monospace' }}>{EVENT.ticketRef}</div>
      </div>
      <div style={{ margin: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', borderTop: '1px solid rgba(14,26,27,0.08)', borderBottom: '1px solid rgba(14,26,27,0.08)' }}>
        {[
          { label: 'Gate', value: EVENT.gate },
          { label: 'Section', value: EVENT.section },
          { label: 'Tier', value: EVENT.tier },
          { label: 'Ticket', value: '× 1' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '14px 0', paddingLeft: i > 0 ? 16 : 0, borderLeft: i > 0 ? '1px solid rgba(14,26,27,0.08)' : 'none' }}>
            <div style={{ fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600, marginBottom: 4, fontFamily: F }}>{item.label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0e1a1b', fontFamily: F }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'relative', height: 0, margin: '0 -1px' }}>
        <div style={{ position: 'absolute', top: '50%', left: -12, transform: 'translateY(-50%)', width: 24, height: 24, borderRadius: '50%', background: '#000', zIndex: 10 }} />
        <div style={{ position: 'absolute', top: '50%', right: -12, transform: 'translateY(-50%)', width: 24, height: 24, borderRadius: '50%', background: '#000', zIndex: 10 }} />
        <div style={{ margin: '0 12px', borderTop: '2px dashed rgba(14,26,27,0.15)' }} />
      </div>
      <div style={{ padding: '22px 28px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Barcode />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#9a9080', letterSpacing: '1.5px' }}>{EVENT.ticketRef}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#B1D8D4' }} />
            <div style={{ fontFamily: F, fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600 }}>VALID FOR ONE-TIME ENTRY</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TicketConfirmation() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="happenin-root" style={{ minHeight: '100vh', background: '#000' }}>
      <style>{`
        @keyframes tcSlideInLeft {
          from { opacity: 0; transform: translateX(-48px) rotate(-1.5deg); }
          to   { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        @keyframes tcFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tcPop {
          0%   { opacity: 0; transform: scale(0.6); }
          60%  { transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes tcFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .tc-ticket  { animation: tcSlideInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .tc-actions { animation: tcFadeIn 0.5s ease both; animation-delay: 0.55s; }
        .tc-check   { animation: tcPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both; animation-delay: 0.15s; }
        .tc-heading { animation: tcFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.3s; }
        .tc-card-1  { animation: tcFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.45s; }
        .tc-card-2  { animation: tcFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.58s; }
      `}</style>
      <Navbar />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-8%', left: '-10%', width: 820, height: 760, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(72,46,25,0.55) 0%, rgba(72,46,25,0.22) 34%, transparent 72%)' }} />
        <div style={{ position: 'absolute', top: '8%', left: '26%', width: 700, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(14,42,44,0.35) 0%, transparent 70%)' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, paddingTop: 180, padding: '180px 80px 0' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="tc-ticket"><TicketCard /></div>
            <div className="tc-actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#F4F1EA', border: 'none', borderRadius: 14, padding: '14px 28px', color: '#0e1a1b', fontFamily: F, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 28px', color: '#fff', fontFamily: F, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
                </svg>
                Add to Wallet
              </button>
              <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 28px', color: copied ? '#7FE0D5' : '#fff', fontFamily: F, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s' }}>
                {copied ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>}
                {copied ? 'Link Copied!' : 'Share Event'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 8 }}>
              <div className="tc-check" style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(127,224,213,0.1)', border: '1.5px solid rgba(127,224,213,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="tc-heading">
                <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#7FE0D5', fontWeight: 600, marginBottom: 10 }}>Booking Confirmed</div>
                <h1 style={{ fontFamily: F, fontSize: 60, fontWeight: 800, letterSpacing: '-2.5px', color: '#fff', lineHeight: 0.95, margin: '0 0 14px' }}>You're in!</h1>
                <p style={{ fontFamily: F, fontSize: 17, color: 'rgba(255,255,255,0.4)', fontWeight: 400, maxWidth: 440, lineHeight: 1.6 }}>Your free ticket for <span style={{ color: '#fff', fontWeight: 600 }}>Neon Pulse Music Festival</span> is confirmed. See you on the rooftop.</p>
              </div>
            </div>

            <div className="tc-card-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.45)', fontWeight: 600 }}>GET THERE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 16, alignItems: 'start' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Rooftop Arena</div>
                  <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>South Bank, London</div>
                </div>
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, alignSelf: 'flex-start', background: '#EBE88A', border: 'none', borderRadius: 14, padding: '14px 22px', color: '#0e2a2c', fontFamily: F, fontSize: 14, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Open in Maps
              </button>
            </div>

            <div className="tc-card-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.45)', fontWeight: 600 }}>CHAT</div>
              <div>
                <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Meet other attendees</div>
                <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Join the event chat to plan meetups, coordinate arrival, and share the vibe before doors open.</div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button style={{ background: '#F4F1EA', border: 'none', borderRadius: 14, padding: '14px 22px', color: '#0e1a1b', fontFamily: F, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>Chat Now</button>
                <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '14px 22px', color: '#fff', fontFamily: F, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>View Attendees</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ padding: '96px 72px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1360, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 1fr)', gap: 72, alignItems: 'start' }}>
          <div style={{ fontFamily: F, color: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 36, paddingRight: 24, minWidth: 0 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7FE0D5', marginBottom: 18 }}>ABOUT HAPPENIN</div>
              <div style={{ display: 'grid', gap: 12, fontSize: 20, lineHeight: 1, fontWeight: 400 }}>
                {['Home', 'Discover', 'Events', 'Saved', 'Profile'].map(l => <a key={l} href="#" style={{ color: '#fff', textDecoration: 'none' }}>{l}</a>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7FE0D5', marginBottom: 18 }}>LEGAL</div>
              <div style={{ display: 'grid', gap: 12, fontSize: 20, lineHeight: 1, fontWeight: 400 }}>
                {['Terms of Service', 'Privacy Policy'].map(l => <a key={l} href="#" style={{ color: '#fff', textDecoration: 'none' }}>{l}</a>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7FE0D5', marginBottom: 18 }}>SOCIAL</div>
              <div style={{ display: 'grid', gap: 12, fontSize: 20, lineHeight: 1, fontWeight: 400 }}>
                {['Instagram', 'X', 'Email', 'LinkedIn'].map(l => <a key={l} href="#" style={{ color: '#fff', textDecoration: 'none' }}>{l}</a>)}
              </div>
            </div>
          </div>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, width: 'fit-content', minWidth: 0 }}>
            <h2 style={{ margin: 0, fontFamily: F, fontSize: 44, lineHeight: 0.94, fontWeight: 500, letterSpacing: '-1.8px', color: '#F2E9D8', maxWidth: 560, width: 'fit-content' }}>Have a question?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10, width: 360 }}>
              <input placeholder="Email address" style={{ width: '100%', background: '#070707', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, outline: 'none', padding: '14px 16px', color: '#fff', fontFamily: F, fontSize: 14 }} />
              <textarea placeholder="Comment" rows={4} style={{ width: '100%', background: '#070707', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, outline: 'none', padding: '14px 16px', color: '#fff', fontFamily: F, fontSize: 14, resize: 'none' }} />
              <button style={{ width: '100%', background: '#191919', border: 'none', borderRadius: 12, padding: '14px 16px', color: '#E7DCC8', fontFamily: F, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Ask</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#000', width: '100%', overflow: 'hidden', paddingTop: 48, paddingBottom: 48 }}>
        <img
          src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-wordmark-trimmed.png`}
          alt="happenin*"
          style={{ width: '100%', display: 'block', objectFit: 'contain' }}
        />
      </div>
    </footer>
  );
}