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

function Barcode() {
  const pattern = [3,1,2,1,1,3,2,1,1,2,1,3,1,1,2,3,1,2,1,1,3,1,1,2,1,2,3,1,2,1,1,3,2,1,2,1,1,2,3,1,1,2,1,3,1,2,1,1,2,3,1,1,2,1,2,1,3,2,1,1,3,1,2,1,1,2,3,1,1,2,1,3,2,1,1,2,1,1,3,2];
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', height: 64, gap: 0, width: '100%' }}>
      {pattern.map((w, i) => (
        <div key={i} style={{ flex: w, background: i % 2 === 0 ? '#0e2a2c' : 'transparent', height: '100%', borderRadius: 1 }} />
      ))}
    </div>
  );
}

function TicketCard() {
  return (
    <div style={{
      width: 680,
      background: '#F4F1EA',
      borderRadius: 28,
      overflow: 'hidden',
      boxShadow: '0 48px 96px rgba(0,0,0,0.55), 0 12px 32px rgba(0,0,0,0.3)',
      fontFamily: F,
    }}>

      {/* ── Top accent bar ── */}
      <div style={{ background: '#0e2a2c', padding: '20px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontFamily: F, fontSize: 12, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.7)', fontWeight: 600 }}>HAPPENIN*</div>
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(177,216,212,0.3)' }} />
          <div style={{ fontFamily: F, fontSize: 12, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.7)', fontWeight: 600 }}>ADMITS ONE</div>
        </div>
        <div style={{ background: '#EBE88A', borderRadius: 9999, padding: '5px 18px', fontFamily: F, fontSize: 12, fontWeight: 800, color: '#0e2a2c', letterSpacing: '1.5px', textTransform: 'uppercase' }}>FREE</div>
      </div>

      {/* ── Attendee ── */}
      <div style={{ padding: '32px 36px 24px' }}>
        <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600, marginBottom: 8 }}>Attendee</div>
        <div style={{ fontSize: 42, fontWeight: 800, color: '#0e1a1b', letterSpacing: '-1.5px', lineHeight: 1 }}>{EVENT.attendee}</div>
      </div>

      {/* ── Divider ── */}
      <div style={{ margin: '0 36px', height: 1, background: 'rgba(14,26,27,0.08)' }} />

      {/* ── Time journey row ── */}
      <div style={{ padding: '28px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {/* Doors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#0e1a1b', letterSpacing: '-1.5px', lineHeight: 1 }}>{EVENT.time}</div>
            <div style={{ fontSize: 12, color: '#9a9080', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Doors Open</div>
          </div>

          {/* Line + duration */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '0 28px' }}>
            <div style={{ fontSize: 12, color: '#9a9080', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{EVENT.duration}</div>
            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0e2a2c', flexShrink: 0 }} />
              <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #0e2a2c, rgba(14,42,44,0.3))' }} />
              {/* Music note icon */}
              <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: '#0e2a2c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B1D8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, rgba(14,42,44,0.3), #0e2a2c)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0e2a2c', flexShrink: 0 }} />
            </div>
            <div style={{ fontSize: 11, color: 'rgba(14,26,27,0.3)', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 500, textAlign: 'center' }}>{EVENT.date}</div>
          </div>

          {/* End time */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#0e1a1b', letterSpacing: '-1.5px', lineHeight: 1 }}>{EVENT.endTime}</div>
            <div style={{ fontSize: 12, color: '#9a9080', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Close</div>
          </div>
        </div>

        {/* Venue row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0e1a1b' }}>{EVENT.venue}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0e1a1b' }}>{EVENT.city}</div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ margin: '0 36px', height: 1, background: 'rgba(14,26,27,0.08)' }} />

      {/* ── Booking reference + details ── */}
      <div style={{ padding: '24px 36px' }}>
        <div style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600, marginBottom: 8 }}>Booking Reference</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#0e1a1b', letterSpacing: '2px', fontFamily: 'monospace, monospace' }}>{EVENT.ticketRef}</div>
      </div>

      {/* ── Details grid ── */}
      <div style={{ margin: '0 36px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0, borderTop: '1px solid rgba(14,26,27,0.08)', borderBottom: '1px solid rgba(14,26,27,0.08)' }}>
        {[
          { label: 'Gate', value: EVENT.gate },
          { label: 'Section', value: EVENT.section },
          { label: 'Tier', value: EVENT.tier },
          { label: 'Ticket', value: '× 1' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '18px 0', paddingLeft: i > 0 ? 20 : 0, borderLeft: i > 0 ? '1px solid rgba(14,26,27,0.08)' : 'none' }}>
            <div style={{ fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600, marginBottom: 5 }}>{item.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0e1a1b' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* ── Perforated tear separator ── */}
      <div style={{ position: 'relative', height: 0, margin: '0 -1px' }}>
        {/* Left notch */}
        <div style={{ position: 'absolute', top: '50%', left: -14, transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', background: '#000', zIndex: 10 }} />
        {/* Right notch */}
        <div style={{ position: 'absolute', top: '50%', right: -14, transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', background: '#000', zIndex: 10 }} />
        {/* Dashed line */}
        <div style={{ margin: '0 14px', borderTop: '2px dashed rgba(14,26,27,0.15)' }} />
      </div>

      {/* ── Barcode section ── */}
      <div style={{ padding: '28px 36px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Barcode />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'monospace, monospace', fontSize: 12, color: '#9a9080', letterSpacing: '2px' }}>{EVENT.ticketRef}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#B1D8D4' }} />
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600 }}>VALID FOR ONE-TIME ENTRY</div>
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
      <Navbar />

      {/* Subtle background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(14,42,44,0.45) 0%, transparent 68%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, paddingTop: 140, paddingBottom: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── Confirmation header ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 56, textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(127,224,213,0.1)', border: '1.5px solid rgba(127,224,213,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#7FE0D5', fontWeight: 600, marginBottom: 10 }}>Booking Confirmed</div>
            <h1 style={{ fontFamily: F, fontSize: 60, fontWeight: 800, letterSpacing: '-2.5px', color: '#fff', lineHeight: 0.95, margin: '0 0 14px' }}>You're in!</h1>
            <p style={{ fontFamily: F, fontSize: 17, color: 'rgba(255,255,255,0.4)', fontWeight: 400, maxWidth: 440, lineHeight: 1.6 }}>
              Your free ticket for <span style={{ color: '#fff', fontWeight: 600 }}>Neon Pulse Music Festival</span> is confirmed. See you on the rooftop.
            </p>
          </div>
        </div>

        {/* ── Ticket ── */}
        <div style={{ marginBottom: 40 }}>
          <TicketCard />
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 96 }}>
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
          <button
            onClick={handleCopy}
            style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 28px', color: copied ? '#7FE0D5' : '#fff', fontFamily: F, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s' }}>
            {copied
              ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            }
            {copied ? 'Link Copied!' : 'Share Event'}
          </button>
        </div>

        {/* ── What's next ── */}
        <div style={{ width: 680, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.45)', fontWeight: 600 }}>WHAT'S NEXT</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
                title: 'Save the date',
                desc: 'Sat 14 Jun · Doors 6 PM. Arrive early.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                title: 'Get directions',
                desc: 'Rooftop Arena, South Bank, London SE1.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                title: 'Invite friends',
                desc: 'Grab your crew before tickets run out.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(127,224,213,0.07)', border: '1px solid rgba(127,224,213,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 5 }}>{item.title}</div>
                  <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <button style={{ background: 'none', border: 'none', color: 'rgba(177,216,212,0.5)', fontFamily: F, fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              ← Back to Discover
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
