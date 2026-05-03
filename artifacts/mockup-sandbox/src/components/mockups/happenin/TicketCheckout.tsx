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
};

const FAQS = [
  {
    q: 'Do I need to print my ticket?',
    a: 'No printing needed. Simply show your QR code on your phone at the entrance — our staff will scan it to let you in.',
  },
  {
    q: 'Can I transfer my free ticket to someone else?',
    a: 'Free tickets are non-transferable. The name on the ticket must match the attendee at the door. You can cancel and re-register under a different name if needed.',
  },
  {
    q: "What's included with a free Early Bird ticket?",
    a: 'Your Early Bird ticket gives you full access to all stages, the outdoor area, and the rooftop viewing deck throughout the event.',
  },
  {
    q: "What if I lose my ticket or can't find the email?",
    a: 'Log in to your Happenin* account and visit My Tickets — your ticket will always be there. You can also download it as a PDF at any time.',
  },
  {
    q: 'Is there an age restriction for this event?',
    a: 'This event is open to all ages. Attendees under 16 must be accompanied by an adult. Valid ID may be required at the door.',
  },
  {
    q: "Can I get a refund if I can't attend?",
    a: "Free tickets have no monetary value, so there's nothing to refund. Simply cancel your registration in advance so your spot can go to someone on the waitlist.",
  },
];

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
    <div style={{ display: 'flex', alignItems: 'stretch', height: 56, gap: 0, width: '100%' }}>
      {pattern.map((w, i) => (
        <div key={i} style={{ flex: w, background: i % 2 === 0 ? '#0e2a2c' : 'transparent', height: '100%', borderRadius: 1 }} />
      ))}
    </div>
  );
}

function LiveTicket({ attendee }: { attendee: string }) {
  const safeAttendee = attendee ?? '';
  const displayName = safeAttendee.trim() || 'XXXX XXXX';
  const isPlaceholder = !safeAttendee.trim();

  return (
    <div style={{
      width: '100%',
      background: '#F4F1EA',
      borderRadius: 24,
      overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.25)',
      fontFamily: F,
      transition: 'box-shadow 0.3s',
    }}>
      {/* Top accent bar */}
      <div style={{ background: '#0e2a2c', padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.7)', fontWeight: 600 }}>{EVENT.title}</span>
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(177,216,212,0.3)' }} />
          <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.7)', fontWeight: 600 }}>ADMITS ONE</span>
        </div>
        <div style={{ background: '#EBE88A', borderRadius: 9999, padding: '4px 14px', fontFamily: F, fontSize: 11, fontWeight: 800, color: '#0e2a2c', letterSpacing: '1.5px', textTransform: 'uppercase' }}>FREE</div>
      </div>

      {/* Attendee */}
      <div style={{ padding: '24px 28px 18px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600, marginBottom: 6 }}>Attendee</div>
        <div style={{
          fontSize: 34,
          fontWeight: 800,
          color: isPlaceholder ? 'rgba(14,26,27,0.18)' : '#0e1a1b',
          letterSpacing: '-1px',
          lineHeight: 1,
          transition: 'color 0.2s',
          fontFamily: F,
        }}>{displayName}</div>
      </div>

      <div style={{ margin: '0 28px', height: 1, background: 'rgba(14,26,27,0.08)' }} />

      {/* Time row */}
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

      {/* Booking ref */}
      <div style={{ padding: '16px 28px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9080', fontWeight: 600, marginBottom: 6, fontFamily: F }}>Booking Reference</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0e1a1b', letterSpacing: '2px', fontFamily: 'monospace, monospace' }}>{EVENT.ticketRef}</div>
      </div>

      {/* Details grid */}
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

      {/* Tear line */}
      <div style={{ position: 'relative', height: 0, margin: '0 -1px' }}>
        <div style={{ position: 'absolute', top: '50%', left: -12, transform: 'translateY(-50%)', width: 24, height: 24, borderRadius: '50%', background: '#000', zIndex: 10 }} />
        <div style={{ position: 'absolute', top: '50%', right: -12, transform: 'translateY(-50%)', width: 24, height: 24, borderRadius: '50%', background: '#000', zIndex: 10 }} />
        <div style={{ margin: '0 12px', borderTop: '2px dashed rgba(14,26,27,0.15)' }} />
      </div>

      {/* Barcode */}
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, textAlign: 'left' }}
      >
        <span style={{ fontFamily: F, fontSize: 17, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{q}</span>
        <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none', background: open ? 'rgba(177,216,212,0.1)' : 'transparent' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#B1D8D4' : 'rgba(255,255,255,0.5)'} strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 0 24px', fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 720 }}>
          {a}
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ padding: '96px 72px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1360, display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 560px)', gap: 90, alignItems: 'start' }}>
          <div style={{ fontFamily: F, color: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 36, paddingRight: 24 }}>
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
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, width: 'fit-content' }}>
            <h2 style={{ margin: 0, fontFamily: F, fontSize: 44, lineHeight: 0.94, fontWeight: 500, letterSpacing: '-1.8px', color: '#F2E9D8', maxWidth: 560 }}>Have a question?</h2>
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

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 14,
  padding: '16px 20px',
  color: '#fff',
  fontFamily: F,
  fontSize: 16,
  outline: 'none',
  transition: 'border-color 0.2s',
};

export function TicketCheckout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  return (
    <div className="happenin-root" style={{ minHeight: '100vh', background: '#000' }}>
      <Navbar />

      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-8%', left: '-10%', width: 820, height: 760, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(72,46,25,0.55) 0%, rgba(72,46,25,0.22) 34%, transparent 72%)' }} />
        <div style={{ position: 'absolute', top: '8%', left: '26%', width: 700, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(14,42,44,0.35) 0%, transparent 70%)' }} />
      </div>

      {/* ── Main two-column section ── */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100vh', display: 'flex', alignItems: 'center', padding: '80px 120px 0', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>

          {/* ── LEFT: Live ticket preview ── */}
          <div>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.45)', fontWeight: 600, marginBottom: 20 }}>
              YOUR TICKET PREVIEW
              {fullName && <span style={{ color: '#7FE0D5', marginLeft: 10 }}>· Live</span>}
            </div>
            <LiveTicket attendee={fullName} />
            {!fullName && (
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(177,216,212,0.4)' }} />
                <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Enter your name to see it on the ticket</span>
              </div>
            )}
          </div>

          {/* ── RIGHT: Registration form ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Form heading */}
            <div>
              <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.55)', fontWeight: 600, marginBottom: 10 }}>STEP 1 OF 1</div>
              <h1 style={{ fontFamily: F, fontSize: 48, fontWeight: 800, letterSpacing: '-2px', color: '#fff', lineHeight: 0.95, margin: 0 }}>Register<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>your spot</span></h1>
            </div>

            {/* Form fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>First Name</label>
                  <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Alex"
                    style={{ ...inputStyle, borderColor: firstName ? 'rgba(177,216,212,0.35)' : 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Last Name</label>
                  <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Morgan"
                    style={{ ...inputStyle, borderColor: lastName ? 'rgba(177,216,212,0.35)' : 'rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Email Address</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  style={{ ...inputStyle, borderColor: email ? 'rgba(177,216,212,0.35)' : 'rgba(255,255,255,0.1)' }}
                />
                <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.25)', paddingLeft: 4 }}>Your ticket will be sent to this address</div>
              </div>

              {/* Terms */}
              <div
                onClick={() => setAgreed(!agreed)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer', padding: '4px 0' }}
              >
                <div style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${agreed ? '#B1D8D4' : 'rgba(255,255,255,0.2)'}`, background: agreed ? 'rgba(177,216,212,0.12)' : 'transparent', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                  {agreed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B1D8D4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                  I agree to the <span style={{ color: '#B1D8D4', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: '#B1D8D4', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
                </span>
              </div>

              {/* CTA */}
              <button
                style={{
                  width: '100%',
                  background: agreed && firstName && lastName && email ? '#EBE88A' : 'rgba(235,232,138,0.18)',
                  border: 'none',
                  borderRadius: 16,
                  padding: '18px 0',
                  color: agreed && firstName && lastName && email ? '#0e2a2c' : 'rgba(235,232,138,0.4)',
                  fontFamily: F,
                  fontSize: 17,
                  fontWeight: 800,
                  cursor: agreed && firstName && lastName && email ? 'pointer' : 'default',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s',
                  marginTop: 4,
                }}
              >
                Confirm Free Ticket →
              </button>
            </div>

            {/* Security note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Free ticket — no payment information required</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── FAQ section ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '112px 80px 0' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.55)', fontWeight: 600, marginBottom: 12 }}>QUICK ANSWERS</div>
            <h2 style={{ fontFamily: F, fontSize: 52, fontWeight: 800, letterSpacing: '-2px', color: '#fff', margin: 0, lineHeight: 0.95 }}>Frequently asked<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>questions</span></h2>
          </div>

          {/* Two-column FAQ grid */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 96 }} />
      <Footer />
    </div>
  );
}
