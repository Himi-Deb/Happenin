import './_group.css';
import { useState } from 'react';

const F = 'var(--font)';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;

const EVENT = {
  title: 'Neon Pulse',
  subtitle: 'Music Festival',
  date: 'SAT 14 JUN 2025',
  time: '6:00 PM',
  venue: 'Rooftop Arena',
  city: 'London, UK',
  tier: 'Early Bird',
  tierLabel: 'FREE ADMISSION',
  ticketNumber: 'HP-2025-004821',
  gate: 'A',
  seat: 'General',
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
  const bars = Array.from({ length: 52 }, (_, i) => ({
    w: [1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1][i % 12],
    gap: [1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1][i % 12],
  }));
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', height: 52, gap: 0 }}>
      {bars.map((b, i) => (
        <div key={i} style={{ display: 'flex', gap: b.gap }}>
          <div style={{ width: b.w, background: '#0e2a2c', borderRadius: 1, height: '100%' }} />
        </div>
      ))}
    </div>
  );
}

function PhysicalTicket() {
  const stubW = 200;
  return (
    <div style={{ position: 'relative', display: 'flex', width: 960, height: 380, filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7)) drop-shadow(0 8px 24px rgba(127,224,213,0.15))' }}>

      {/* ── STUB (left) ── */}
      <div style={{
        width: stubW,
        flexShrink: 0,
        background: 'linear-gradient(160deg, #0e2a2c 0%, #061819 100%)',
        borderRadius: '24px 0 0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '28px 20px',
        position: 'relative',
        overflow: 'visible',
      }}>
        {/* top semicircle cutout */}
        <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0 }} />
        {/* Ticket label rotated */}
        <div style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.5)', fontWeight: 600, marginTop: 40 }}>
          HAPPENIN* EVENT
        </div>
        {/* Gate + Seat */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>GATE</div>
          <div style={{ fontFamily: F, fontSize: 52, fontWeight: 800, color: '#B1D8D4', lineHeight: 1, letterSpacing: '-2px' }}>{EVENT.gate}</div>
          <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>SECTION</div>
          <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{EVENT.seat}</div>
        </div>
        {/* Ticket number vertical */}
        <div style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', fontFamily: F, fontSize: 10, letterSpacing: '2px', color: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>
          {EVENT.ticketNumber}
        </div>
      </div>

      {/* ── PERFORATED TEAR LINE ── */}
      <div style={{ position: 'relative', width: 0, flexShrink: 0, zIndex: 10 }}>
        {/* Left semicircle notch */}
        <div style={{
          position: 'absolute', top: '50%', left: -18, transform: 'translateY(-50%)',
          width: 36, height: 36, borderRadius: '50%',
          background: '#000',
          zIndex: 20,
        }} />
        {/* Right semicircle notch */}
        <div style={{
          position: 'absolute', top: '50%', right: -18, transform: 'translateY(-50%)',
          width: 36, height: 36, borderRadius: '50%',
          background: '#000',
          zIndex: 20,
        }} />
        {/* Dashed line */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          borderLeft: '2px dashed rgba(177,216,212,0.25)',
        }} />
      </div>

      {/* ── MAIN BODY ── */}
      <div style={{
        flex: 1,
        borderRadius: '0 24px 24px 0',
        background: 'linear-gradient(140deg, #0a1f20 0%, #061214 60%, #050d0e 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Faint concert photo overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=60)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          opacity: 0.07,
        }} />
        {/* Teal radial glow */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,224,213,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: 40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,42,44,0.6) 0%, transparent 70%)' }} />

        {/* Top stripe */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 32px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.55)', fontWeight: 600 }}>TICKET</div>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(177,216,212,0.3)' }} />
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.55)', fontWeight: 600 }}>ADMITS ONE</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'rgba(235,232,138,0.15)', border: '1px solid rgba(235,232,138,0.35)', borderRadius: 9999, padding: '4px 14px', fontFamily: F, fontSize: 11, fontWeight: 700, color: '#EBE88A', letterSpacing: '1.5px', textTransform: 'uppercase' }}>FREE</div>
            <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>{EVENT.tier.toUpperCase()}</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', padding: '24px 32px 0' }}>
          {/* Left: event identity */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 24 }}>
            <div>
              <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.55)', fontWeight: 600, marginBottom: 8 }}>HAPPENIN* PRESENTS</div>
              <div style={{ fontFamily: F, fontSize: 72, fontWeight: 900, lineHeight: 0.88, letterSpacing: '-3px', color: '#fff', textTransform: 'uppercase', marginBottom: 6 }}>
                {EVENT.title}
              </div>
              <div style={{ fontFamily: F, fontSize: 22, fontWeight: 400, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.6)' }}>
                {EVENT.subtitle}
              </div>
            </div>

            {/* Date / Time / Venue row */}
            <div style={{ display: 'flex', gap: 0 }}>
              {[
                { label: 'DATE', value: EVENT.date },
                { label: 'DOORS', value: EVENT.time },
                { label: 'VENUE', value: EVENT.venue },
                { label: 'CITY', value: EVENT.city },
              ].map((item, i) => (
                <div key={i} style={{ paddingRight: 28, borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', marginRight: i < 3 ? 28 : 0 }}>
                  <div style={{ fontFamily: F, fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.45)', marginBottom: 5, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.3px' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: barcode + QR area */}
          <div style={{ width: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 24, gap: 10 }}>
            {/* QR code placeholder */}
            <div style={{ width: 80, height: 80, background: '#fff', borderRadius: 8, padding: 6, flexShrink: 0 }}>
              <svg viewBox="0 0 21 21" width="100%" height="100%" fill="none">
                {/* QR pattern */}
                <rect x="0" y="0" width="9" height="9" fill="none" stroke="#000" strokeWidth="1" />
                <rect x="1" y="1" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
                <rect x="3" y="3" width="3" height="3" fill="#000" />
                <rect x="12" y="0" width="9" height="9" fill="none" stroke="#000" strokeWidth="1" />
                <rect x="13" y="1" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
                <rect x="15" y="3" width="3" height="3" fill="#000" />
                <rect x="0" y="12" width="9" height="9" fill="none" stroke="#000" strokeWidth="1" />
                <rect x="1" y="13" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
                <rect x="3" y="15" width="3" height="3" fill="#000" />
                <rect x="11" y="11" width="2" height="2" fill="#000" />
                <rect x="14" y="11" width="2" height="2" fill="#000" />
                <rect x="11" y="14" width="2" height="2" fill="#000" />
                <rect x="14" y="14" width="3" height="3" fill="#000" />
                <rect x="18" y="11" width="3" height="3" fill="#000" />
                <rect x="11" y="18" width="3" height="3" fill="#000" />
                <rect x="18" y="18" width="3" height="3" fill="#000" />
              </svg>
            </div>
            {/* Barcode */}
            <div style={{ background: '#fff', borderRadius: 6, padding: '6px 8px 4px' }}>
              <Barcode />
              <div style={{ fontFamily: 'monospace', fontSize: 7, color: '#0e2a2c', textAlign: 'center', marginTop: 3, letterSpacing: '1.5px' }}>{EVENT.ticketNumber}</div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ position: 'relative', background: 'rgba(127,224,213,0.06)', borderTop: '1px solid rgba(177,216,212,0.1)', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>ATTENDEE NAME ·  <span style={{ color: 'rgba(177,216,212,0.5)' }}>ALEX MORGAN</span></div>
          <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>VALID FOR ONE-TIME ENTRY ONLY</div>
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

      {/* Page background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(14,42,44,0.55) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, paddingTop: 140, paddingBottom: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── Confirmation header ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, marginBottom: 64, textAlign: 'center' }}>
          {/* Success ring */}
          <div style={{ position: 'relative', width: 72, height: 72 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(127,224,213,0.12)', border: '2px solid rgba(127,224,213,0.35)', animation: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#7FE0D5', fontWeight: 600, marginBottom: 12 }}>BOOKING CONFIRMED</div>
            <h1 style={{ fontFamily: F, fontSize: 64, fontWeight: 800, letterSpacing: '-2.5px', color: '#fff', lineHeight: 0.95, margin: '0 0 16px' }}>You're in!</h1>
            <p style={{ fontFamily: F, fontSize: 18, color: 'rgba(255,255,255,0.45)', fontWeight: 400, maxWidth: 480 }}>
              Your free ticket for <span style={{ color: '#fff', fontWeight: 600 }}>Neon Pulse Music Festival</span> is confirmed. See you on the rooftop.
            </p>
          </div>
        </div>

        {/* ── Physical Ticket ── */}
        <div style={{ marginBottom: 48 }}>
          <PhysicalTicket />
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 96 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px', color: '#000', fontFamily: F, fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.2px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" /></svg>
            Add to Wallet
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 28px', color: '#fff', fontFamily: F, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download PDF
          </button>
          <button
            onClick={handleCopy}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 28px', color: copied ? '#7FE0D5' : '#fff', fontFamily: F, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s' }}>
            {copied
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            }
            {copied ? 'Link Copied!' : 'Share Event'}
          </button>
        </div>

        {/* ── What's next ── */}
        <div style={{ width: 960, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.55)', fontWeight: 600 }}>WHAT'S NEXT</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
                title: 'Save the date',
                desc: 'Saturday, 14 June 2025 · Doors open at 6:00 PM. Arrive early to secure your spot.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                title: 'Get directions',
                desc: '32 Upper Ground, South Bank, London SE1 9PX — 5 min walk from Waterloo Station.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                title: 'Invite friends',
                desc: 'Free tickets are limited. Share the event page with friends before they sell out.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to explore */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'rgba(177,216,212,0.6)', fontFamily: F, fontSize: 14, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
              ← Back to Discover
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
