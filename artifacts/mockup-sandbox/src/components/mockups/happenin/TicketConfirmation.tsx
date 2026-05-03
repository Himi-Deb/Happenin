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

const ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//happenin//EN
BEGIN:VEVENT
DTSTART:20250614T170000Z
DTEND:20250614T220000Z
SUMMARY:Neon Pulse Music Festival
LOCATION:Rooftop Arena\\, South Bank\\, London
DESCRIPTION:Your free ticket is confirmed. Booking ref: HP-2025-004821
END:VEVENT
END:VCALENDAR`;

const GCAL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Neon+Pulse+Music+Festival&dates=20250614T180000/20250614T230000&details=Your+free+ticket+is+confirmed.+Booking+ref%3A+HP-2025-004821&location=Rooftop+Arena%2C+South+Bank%2C+London`;
const OUTLOOK = `https://outlook.live.com/calendar/0/action/compose?subject=Neon+Pulse+Music+Festival&startdt=2025-06-14T18%3A00%3A00&enddt=2025-06-14T23%3A00%3A00&body=Your+free+ticket+is+confirmed.+Booking+ref%3A+HP-2025-004821&location=Rooftop+Arena%2C+South+Bank%2C+London`;

function downloadIcs() {
  const blob = new Blob([ICS], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'neon-pulse.ics'; a.click();
  URL.revokeObjectURL(url);
}

export function TicketConfirmation() {
  const [copied, setCopied] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

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
      <div style={{ position: 'relative', zIndex: 1, width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '25vh 120px 100px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', maxWidth: 1360, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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

              {/* Save to Calendar */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setCalOpen(o => !o)}
                  style={{ display: 'flex', alignItems: 'center', gap: 9, background: calOpen ? 'rgba(127,224,213,0.14)' : 'rgba(255,255,255,0.06)', border: `1px solid ${calOpen ? 'rgba(127,224,213,0.35)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 14, padding: '14px 28px', color: calOpen ? '#7FE0D5' : '#fff', fontFamily: F, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    <line x1="8" y1="14" x2="8" y2="14" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="12" y1="14" x2="12" y2="14" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="16" y1="14" x2="16" y2="14" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="8" y1="18" x2="8" y2="18" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Save to Calendar
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: calOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.18s' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {calOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, zIndex: 50, background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 8, minWidth: 260, boxShadow: '0 24px 48px rgba(0,0,0,0.6)', animation: 'tcFadeUp 0.2s cubic-bezier(0.22,1,0.36,1) both' }}>
                    {/* Header */}
                    <div style={{ padding: '8px 12px 10px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 6 }}>
                      <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Add to Calendar</div>
                      <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>Sat 14 Jun · 6:00 PM – 11:00 PM</div>
                    </div>
                    {/* Options */}
                    {[
                      {
                        label: 'Google Calendar',
                        sub: 'Opens in browser',
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" fill="#fff" stroke="none"/>
                            <path d="M15.5 9H12V7.5L9.5 10 12 12.5V11H15.5C15.776 11 16 10.776 16 10.5V9.5C16 9.224 15.776 9 15.5 9Z" fill="#4285F4"/>
                            <path d="M3 10.5V13.5L5.5 16L8 13.5V10.5L5.5 8L3 10.5Z" fill="#34A853"/>
                            <path d="M12 16V12.5H8V16H12Z" fill="#FBBC04"/>
                            <path d="M12 7.5V11H16V7.5H12Z" fill="#4285F4"/>
                            <path d="M3 6.5V10.5L5.5 8L8 10.5V6.5H3Z" fill="#EA4335"/>
                          </svg>
                        ),
                        action: () => { window.open(GCAL, '_blank'); setCalOpen(false); },
                      },
                      {
                        label: 'Apple Calendar',
                        sub: 'Downloads .ics file',
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="5" fill="#fff"/>
                            <rect x="3" y="6" width="18" height="15" rx="2" fill="#fff" stroke="#ddd" strokeWidth="1"/>
                            <rect x="3" y="6" width="18" height="5" rx="2" fill="#FC3D39"/>
                            <rect x="3" y="9" width="18" height="2" fill="#FC3D39"/>
                            <line x1="8" y1="3" x2="8" y2="7" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
                            <line x1="16" y1="3" x2="16" y2="7" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
                            <text x="12" y="18" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#FC3D39">14</text>
                          </svg>
                        ),
                        action: () => { downloadIcs(); setCalOpen(false); },
                      },
                      {
                        label: 'Outlook',
                        sub: 'Opens in browser',
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="4" fill="#0072C6"/>
                            <rect x="3" y="7" width="10" height="10" rx="1.5" fill="#fff" opacity="0.9"/>
                            <circle cx="8" cy="12" r="2.5" fill="#0072C6"/>
                            <rect x="14" y="7" width="7" height="10" rx="1" fill="#fff" opacity="0.4"/>
                            <line x1="14" y1="10" x2="21" y2="10" stroke="#fff" strokeWidth="0.8" opacity="0.6"/>
                            <line x1="14" y1="12" x2="21" y2="12" stroke="#fff" strokeWidth="0.8" opacity="0.6"/>
                            <line x1="14" y1="14" x2="21" y2="14" stroke="#fff" strokeWidth="0.8" opacity="0.6"/>
                          </svg>
                        ),
                        action: () => { window.open(OUTLOOK, '_blank'); setCalOpen(false); },
                      },
                    ].map(opt => (
                      <button
                        key={opt.label}
                        onClick={opt.action}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 13, background: 'transparent', border: 'none', borderRadius: 11, padding: '11px 12px', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ width: 34, height: 34, borderRadius: 9, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(255,255,255,0.06)' }}>
                          {opt.icon}
                        </div>
                        <div>
                          <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{opt.label}</div>
                          <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{opt.sub}</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="tc-card-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <div style={{ padding: '20px 22px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.45)', fontWeight: 600 }}>EVENT CHAT</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7FE0D5', boxShadow: '0 0 6px #7FE0D5' }} />
                  <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(127,224,213,0.8)', fontWeight: 600 }}>247 chatting</span>
                </div>
              </div>
              {/* Mock chat bubbles */}
              <div style={{ padding: '0 22px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #0e2a2c, #1a4a4e)', border: '1.5px solid rgba(127,224,213,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#7FE0D5' }}>N</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#7FE0D5' }}>NeonWave Events</span>
                      <span style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Organiser</span>
                    </div>
                    <div style={{ background: 'rgba(127,224,213,0.08)', border: '1px solid rgba(127,224,213,0.15)', borderRadius: '4px 14px 14px 14px', padding: '9px 13px', fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, maxWidth: 340 }}>
                      Doors open at 6 PM sharp — gates are on the riverside side of the building. See you all tonight! 🎶
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingLeft: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Attendee</span>
                      <span style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>2h ago</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px 14px 14px 14px', padding: '9px 13px', fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, maxWidth: 300 }}>
                      Anyone taking the Jubilee line to Waterloo? Happy to meet by the exit 👋
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingLeft: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Attendee</span>
                      <span style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>45m ago</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px 14px 14px 14px', padding: '9px 13px', fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, maxWidth: 260 }}>
                      Can't wait — first time at this venue. Is there a cloakroom?
                    </div>
                  </div>
                </div>
                <div style={{ height: 32, marginTop: -32, background: 'linear-gradient(to bottom, transparent, rgba(14,16,16,0.92))', pointerEvents: 'none', position: 'relative', zIndex: 1 }} />
              </div>
              {/* CTA + privacy */}
              <div style={{ padding: '0 22px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button
                  onClick={() => window.location.href = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/preview/happenin/EventChat`}
                  style={{ width: '100%', background: '#F4F1EA', border: 'none', borderRadius: 14, padding: '13px 0', color: '#0e1a1b', fontFamily: F, fontSize: 14, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.3px' }}>
                  Join the Chat
                </button>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.28)', lineHeight: 1.5 }}>Your personal details are never shared with other attendees — only the organiser can see your booking info.</span>
                </div>
              </div>
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

            <div
              className="tc-card-1"
              onClick={() => {
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                window.open(isIOS
                  ? 'maps://maps.apple.com/?q=South+Bank,London'
                  : 'https://www.google.com/maps/search/?api=1&query=South+Bank,London',
                  '_blank');
              }}
              style={{ cursor: 'pointer', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(127,224,213,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              {/* ── B&W Map ── */}
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <style>{`
                  @keyframes pinPulse {
                    0%,100% { r: 10; opacity: 0.35; }
                    50%     { r: 18; opacity: 0; }
                  }
                  .map-pulse { animation: pinPulse 2.2s ease-in-out infinite; }
                `}</style>
                <svg viewBox="0 0 600 220" style={{ width: '100%', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="600" height="220" fill="#0e0e0e" />

                  {/* City blocks */}
                  <rect x="0"   y="0"   width="110" height="65"  fill="rgba(255,255,255,0.035)" />
                  <rect x="120" y="0"   width="140" height="65"  fill="rgba(255,255,255,0.03)"  />
                  <rect x="270" y="0"   width="90"  height="65"  fill="rgba(255,255,255,0.04)"  />
                  <rect x="370" y="0"   width="130" height="65"  fill="rgba(255,255,255,0.025)" />
                  <rect x="510" y="0"   width="90"  height="65"  fill="rgba(255,255,255,0.035)" />

                  <rect x="0"   y="75"  width="80"  height="55"  fill="rgba(255,255,255,0.03)"  />
                  <rect x="90"  y="75"  width="120" height="55"  fill="rgba(255,255,255,0.04)"  />
                  <rect x="220" y="75"  width="60"  height="55"  fill="rgba(255,255,255,0.03)"  />
                  <rect x="340" y="75"  width="100" height="55"  fill="rgba(255,255,255,0.04)"  />
                  <rect x="450" y="75"  width="150" height="55"  fill="rgba(255,255,255,0.025)" />

                  <rect x="0"   y="140" width="100" height="40"  fill="rgba(255,255,255,0.025)" />
                  <rect x="110" y="140" width="100" height="40"  fill="rgba(255,255,255,0.03)"  />
                  <rect x="330" y="140" width="80"  height="40"  fill="rgba(255,255,255,0.025)" />
                  <rect x="420" y="140" width="100" height="40"  fill="rgba(255,255,255,0.03)"  />
                  <rect x="530" y="140" width="70"  height="40"  fill="rgba(255,255,255,0.025)" />

                  {/* Thames River */}
                  <path d="M0 185 Q60 175 130 182 Q200 190 280 183 Q360 175 430 180 Q500 186 600 178 L600 220 L0 220 Z"
                    fill="rgba(18,30,35,0.95)" />
                  <path d="M0 188 Q60 178 130 185 Q200 193 280 186 Q360 178 430 183 Q500 189 600 181"
                    fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                  {/* Minor roads — horizontal */}
                  <line x1="0" y1="35"  x2="600" y2="35"  stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="0" y1="108" x2="600" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="0" y1="155" x2="600" y2="155" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                  {/* Minor roads — vertical */}
                  <line x1="80"  y1="0" x2="80"  y2="185" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="210" y1="0" x2="210" y2="185" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="440" y1="0" x2="440" y2="185" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="540" y1="0" x2="540" y2="185" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                  {/* Major roads — horizontal */}
                  <line x1="0" y1="68"  x2="600" y2="68"  stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" />
                  <line x1="0" y1="138" x2="600" y2="138" stroke="rgba(255,255,255,0.55)" strokeWidth="3" />

                  {/* Major roads — vertical */}
                  <line x1="115" y1="0" x2="115" y2="185" stroke="rgba(255,255,255,0.4)"  strokeWidth="2" />
                  <line x1="290" y1="0" x2="290" y2="185" stroke="rgba(255,255,255,0.55)" strokeWidth="3" />
                  <line x1="370" y1="0" x2="370" y2="185" stroke="rgba(255,255,255,0.4)"  strokeWidth="2" />

                  {/* Waterloo Bridge */}
                  <rect x="268" y="180" width="44" height="8" fill="rgba(255,255,255,0.5)" rx="2" />

                  {/* Subtle road labels */}
                  <text x="152" y="133" fontFamily="monospace" fontSize="7" fill="rgba(255,255,255,0.18)" letterSpacing="1">BELVEDERE RD</text>
                  <text x="295" y="60"  fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,0.15)" letterSpacing="0.5" transform="rotate(90,295,60)">WATERLOO</text>
                  <text x="220" y="198" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,0.2)" letterSpacing="1">WATERLOO BRIDGE</text>
                  <text x="220" y="210" fontFamily="monospace" fontSize="6" fill="rgba(30,60,75,0.0)">.</text>

                  {/* Pin pulse ring */}
                  <circle className="map-pulse" cx="290" cy="103" r="10" fill="none" stroke="#7FE0D5" strokeWidth="1.5" opacity="0.35" />

                  {/* Pin shadow */}
                  <ellipse cx="290" cy="119" rx="7" ry="3" fill="rgba(0,0,0,0.5)" />

                  {/* Pin body */}
                  <path d="M290 86 C280 86 272 94 272 104 C272 116 290 126 290 126 C290 126 308 116 308 104 C308 94 300 86 290 86 Z"
                    fill="#7FE0D5" />
                  {/* Pin inner circle */}
                  <circle cx="290" cy="103" r="5" fill="#0e2a2c" />

                  {/* "Rooftop Arena" label */}
                  <rect x="308" y="90" width="108" height="26" rx="6" fill="rgba(14,14,14,0.88)" />
                  <text x="316" y="103" fontFamily="sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" letterSpacing="0.3">Rooftop Arena</text>
                  <text x="316" y="114" fontFamily="sans-serif" fontSize="7.5" fill="rgba(255,255,255,0.45)">South Bank, London</text>
                </svg>

                {/* Gradient vignette on edges */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(14,14,14,0.7) 100%)', pointerEvents: 'none' }} />
              </div>

              {/* Info bar */}
              <div style={{ padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.45)', fontWeight: 600, marginBottom: 5 }}>GET THERE</div>
                  <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Rooftop Arena</div>
                  <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>South Bank, London</div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#EBE88A', borderRadius: 12, padding: '10px 18px', color: '#0e2a2c', fontFamily: F, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', flexShrink: 0 }}>
                  Open in Maps
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
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