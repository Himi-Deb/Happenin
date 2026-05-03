import { useState } from 'react';
import { useLocation } from 'wouter';

const F = 'Urbanist, sans-serif';
const BG = '#0e0c09';
const CARD_BG = '#13110d';
const INPUT_BG = '#0a0804';
const TEAL = '#7FE0D5';
const GOLD = '#EBE88A';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = `${BASE}/happenin-logo-new.png`;

const FAQS = [
  { q: 'Is this event really free?', a: 'Absolutely. happenin* is a free-events-only platform. No payment info is ever required.' },
  { q: 'What happens after I claim my ticket?', a: "You'll receive a digital ticket with a unique QR code. Save it or show it from the happenin* app at the door." },
  { q: 'Can I cancel or transfer my ticket?', a: "Yes — cancel anytime from your account and your spot returns to the pool. Transfers aren't currently supported." },
  { q: 'Do I need to print my ticket?', a: 'No — a digital ticket on your phone is fine. The QR code is what matters at check-in.' },
  { q: 'What if my ticket gets lost?', a: "Log in to happenin* at any time to retrieve your ticket. It's always saved in your account." },
  { q: 'Are there age restrictions?', a: 'This event is 18+. Valid photo ID is required at the door. Under-18s will not be admitted.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '24px 0' }}>
        <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{q}</span>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: open ? `${TEAL}15` : 'rgba(255,255,255,0.04)', border: `1px solid ${open ? `${TEAL}30` : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? TEAL : 'rgba(255,255,255,0.35)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
      {open && (
        <div style={{ paddingBottom: 24, marginTop: -8 }}>
          <p style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,0.07)', padding: '64px 80px 40px' }}>
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

const inp: React.CSSProperties = {
  width: '100%', background: INPUT_BG, border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 12, padding: '14px 16px', color: '#fff', fontFamily: F, fontSize: 15,
  outline: 'none', boxSizing: 'border-box',
};

export default function TicketCheckout() {
  const [, navigate] = useLocation();
  const [firstName, setFirstName]   = useState('');
  const [lastName, setLastName]     = useState('');
  const [email, setEmail]           = useState('');
  const [quantity, setQuantity]     = useState(1);
  const [agreed, setAgreed]         = useState(false);

  const canSubmit = agreed && firstName.trim() && lastName.trim() && email.trim();

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .co-inp:focus { border-color: rgba(127,224,213,0.4) !important; }
        .co-inp::placeholder { color: rgba(255,255,255,0.2); }
        .co-security { opacity: 0.7; }
      `}</style>

      {/* BG blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '55%', height: '75%', background: 'radial-gradient(ellipse at 30% 30%, rgba(127,224,213,0.04) 0%, transparent 65%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: '40%', height: '55%', background: 'radial-gradient(ellipse at 70% 70%, rgba(235,232,138,0.025) 0%, transparent 65%)', borderRadius: '50%' }} />
      </div>

      {/* Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
          <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
            <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: F, fontSize: 15, whiteSpace: 'nowrap' }}>Neon Pulse Music Festival</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
          <div style={{ background: GOLD, borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', cursor: 'pointer' }}>
            <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c' }}>Maya Chen</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 0', paddingTop: 93, width: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', height: 380 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center 30%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,12,9,0.35) 0%, rgba(14,12,9,0.65) 60%, #0e0c09 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 80px 40px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(127,224,213,0.12)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 9999, padding: '5px 14px', width: 'fit-content', marginBottom: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL }} />
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: TEAL }}>Free Event · Music</span>
            </div>
            <h1 style={{ fontFamily: F, fontSize: 52, fontWeight: 800, letterSpacing: '-2px', color: '#fff', margin: 0, lineHeight: 0.95 }}>Neon Pulse Music Festival</h1>
            <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
              <span style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>📅 Sat, 14 Jun 2025 · 6:00 PM – 11:30 PM</span>
              <span style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>📍 Rooftop Arena, London</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '64px 80px 0' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 460px', gap: 48, alignItems: 'start' }}>
          {/* Left: Event info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Quick info */}
            <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 32px' }}>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: '#fff', margin: '0 0 20px' }}>Event Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: '📅', label: 'Date', val: 'Saturday, 14 June 2025' },
                  { icon: '🕕', label: 'Time', val: '6:00 PM – 11:30 PM (BST)' },
                  { icon: '📍', label: 'Venue', val: 'Rooftop Arena, 32 Upper Ground, London SE1 9PP' },
                  { icon: '🎟️', label: 'Price', val: 'Free — no cost, ever' },
                ].map(d => (
                  <div key={d.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{d.icon}</span>
                    <div>
                      <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.35)', marginBottom: 3 }}>{d.label}</div>
                      <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{d.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lineup */}
            <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 32px' }}>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: '#fff', margin: '0 0 20px' }}>Lineup</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { act: 'Warm Up DJ', time: '6:30 PM', type: 'Support' },
                  { act: 'Hybrid Minds', time: '8:00 PM', type: 'Support' },
                  { act: 'DJ Mara', time: '10:00 PM', type: 'Headliner' },
                ].map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: l.type === 'Headliner' ? 'rgba(127,224,213,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${l.type === 'Headliner' ? 'rgba(127,224,213,0.2)' : 'rgba(255,255,255,0.07)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={l.type === 'Headliner' ? TEAL : 'rgba(255,255,255,0.3)'} strokeWidth="2" strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: F, fontSize: 15, fontWeight: l.type === 'Headliner' ? 800 : 600, color: l.type === 'Headliner' ? '#fff' : 'rgba(255,255,255,0.65)' }}>{l.act}</div>
                      <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{l.type}</div>
                    </div>
                    <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{l.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 32px' }}>
              <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: '#fff', margin: '0 0 14px' }}>About</h2>
              <p style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0 }}>
                Join us for a night of pulsing electronic music under the open sky at Rooftop Arena, South Bank. From ambient warm-ups to peak-hour sets, Neon Pulse brings together the city's finest DJs for a free, all-welcome festival.<br /><br />
                Doors open at 5:30 PM. Free to attend — grab your ticket to secure your spot. The event is 18+ and valid ID will be required at the door.
              </p>
            </div>
          </div>

          {/* Right: Claim ticket form */}
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, overflow: 'hidden' }}>
              {/* Form header */}
              <div style={{ background: 'linear-gradient(135deg,#0d1e20,#1a1208)', padding: '24px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(127,224,213,0.025) 0,rgba(127,224,213,0.025) 1px,transparent 1px,transparent 18px)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(127,224,213,0.6)', marginBottom: 6 }}>Claim Free Ticket</div>
                    <div style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: '#fff' }}>Neon Pulse</div>
                  </div>
                  <div style={{ background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 10, padding: '8px 14px' }}>
                    <div style={{ fontFamily: F, fontSize: 18, fontWeight: 900, color: TEAL }}>£0</div>
                    <div style={{ fontFamily: F, fontSize: 9, color: 'rgba(127,224,213,0.5)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Free</div>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Quantity */}
                <div>
                  <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Tickets (max 2)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F }}>−</button>
                    <span style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: '#fff', minWidth: 24, textAlign: 'center' }}>{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(2, q + 1))} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F }}>+</button>
                    <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>× General Admission</span>
                  </div>
                </div>

                {/* Name */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>First Name *</div>
                    <input className="co-inp" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First" style={inp} />
                  </div>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Last Name *</div>
                    <input className="co-inp" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last" style={inp} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Email *</div>
                  <input className="co-inp" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" style={inp} />
                </div>

                {/* Summary */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>General Admission × {quantity}</span>
                    <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>£0.00</span>
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#fff' }}>Total</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: F, fontSize: 20, fontWeight: 900, color: TEAL }}>£0.00</span>
                      <span style={{ fontFamily: F, fontSize: 11, color: TEAL, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.2)', borderRadius: 6, padding: '3px 7px' }}>Free</span>
                    </div>
                  </div>
                </div>

                {/* T&C */}
                <div onClick={() => setAgreed(a => !a)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: agreed ? `${TEAL}18` : INPUT_BG, border: `1.5px solid ${agreed ? TEAL : 'rgba(255,255,255,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, transition: 'all 0.15s' }}>
                    {agreed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span style={{ fontFamily: F, fontSize: 12.5, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>
                    I agree to the <span style={{ color: TEAL, textDecoration: 'underline' }}>Terms of Service</span> and <span style={{ color: TEAL, textDecoration: 'underline' }}>Privacy Policy</span>. I understand this is a free ticket and no payment is required.
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => canSubmit && navigate('/confirmation')}
                  style={{
                    width: '100%',
                    background: canSubmit ? GOLD : 'rgba(235,232,138,0.1)',
                    border: `1px solid ${canSubmit ? 'transparent' : 'rgba(235,232,138,0.15)'}`,
                    borderRadius: 14,
                    padding: '17px 0',
                    color: canSubmit ? '#0e2a2c' : 'rgba(235,232,138,0.25)',
                    fontFamily: F,
                    fontSize: 17,
                    fontWeight: 800,
                    cursor: canSubmit ? 'pointer' : 'default',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s',
                    marginTop: 4,
                  }}
                >
                  Confirm Free Ticket →
                </button>

                {/* Security note */}
                <div className="co-security" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Free ticket — no payment information required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ position: 'relative', zIndex: 1, padding: '112px 80px 0' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(177,216,212,0.55)', fontWeight: 600, marginBottom: 12 }}>QUICK ANSWERS</div>
            <h2 style={{ fontFamily: F, fontSize: 52, fontWeight: 800, letterSpacing: '-2px', color: '#fff', margin: 0, lineHeight: 0.95 }}>Frequently asked<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>questions</span></h2>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </div>

      <div style={{ height: 96 }} />
      <Footer />
    </div>
  );
}
