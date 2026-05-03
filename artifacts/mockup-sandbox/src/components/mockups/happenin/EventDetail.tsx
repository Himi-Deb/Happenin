import './_group.css';
import React, { useState, useRef } from 'react';

const F = 'var(--font)';
const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/happenin-logo-new.png`;

const EVENT = {
  title: 'Neon Pulse Music Festival',
  date: 'Saturday, 14 June 2025',
  time: '6:00 PM – 2:00 AM',
  location: 'Rooftop Arena, London',
  address: '32 Upper Ground, South Bank, London SE1 9PX',
  category: 'Music',
  tag: 'Featured',
  attendees: 842,
  image: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=80)',
  organiser: 'NeonWave Events',
  organiserFollowers: '12.4k',
  description: `Get ready for the most electrifying night of the year. Neon Pulse brings together the world's finest DJs and live acts for an unforgettable rooftop experience above the London skyline.\n\nFrom sunset to sunrise, expect pulsing basslines, stunning visuals, and an atmosphere unlike anything else in the city. Whether you're a seasoned raver or just looking for a night out to remember — this is where you need to be.`,
  lineup: [
    { time: '6:00 PM', act: 'Doors Open', type: 'info' },
    { time: '7:00 PM', act: 'DJ Mara — Opening Set', type: 'dj' },
    { time: '8:30 PM', act: 'Polaris Live', type: 'live' },
    { time: '10:00 PM', act: 'Hybrid Minds', type: 'headline' },
    { time: '12:00 AM', act: 'DJ Koast — Late Night', type: 'dj' },
    { time: '2:00 AM', act: 'Venue Closes', type: 'info' },
  ],
  tickets: [
    { tier: 'Early Bird', price: 'Free', desc: 'Limited — first come, first served', available: true },
    { tier: 'General Admission', price: '£25', desc: 'Full access to all stages', available: true },
    { tier: 'VIP Experience', price: '£75', desc: 'VIP lounge, priority entry, welcome drink', available: true },
    { tier: 'Backstage Pass', price: '£150', desc: 'Meet artists, exclusive backstage access', available: false },
  ],
};

const RELATED = [
  { id: 1, title: 'Jazz Under the Stars', date: 'Wed, 9 Jul', location: 'Harbour Park, Sydney', price: '£18', image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80)', category: 'Music' },
  { id: 2, title: 'Rooftop DJ Set', date: 'Sat, 21 Jun', location: 'Brixton, London', price: '£15', image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80)', category: 'Music' },
  { id: 3, title: 'Coldplay: Music of the Spheres', date: 'Sun, 27 Jul', location: 'Emirates Stadium, London', price: '£95', image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80)', category: 'Music' },
  { id: 4, title: 'Arctic Monkeys: World Tour', date: 'Sat, 2 Aug', location: 'Wembley Stadium, London', price: '£85', image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80)', category: 'Music' },
  { id: 5, title: 'Frank Ocean: Rare Appearance', date: 'Fri, 22 Aug', location: 'Brixton Academy, London', price: '£110', image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80)', category: 'Music' },
];

function HappeninLogo({ height = 32 }: { height?: number }) {
  return (
    <img src={LOGO_URL} alt="Happenin" style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }} />
  );
}

function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <HappeninLogo />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Discover</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 4 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <div style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 32px', cursor: 'pointer' }}>
          <span style={{ color: '#0e2a2c', fontFamily: F, fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>LOGIN</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [saved, setSaved] = useState(false);
  return (
    <section style={{ position: 'relative', width: '100%', aspectRatio: '1920 / 1280', background: '#000' }}>
      {/* Background clipped separately so content can overflow the section bottom */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 0 }}>
        <div style={{ position: 'absolute', top: '-8%', left: '-10%', width: 820, height: 760, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(72,46,25,0.55) 0%, rgba(72,46,25,0.22) 34%, transparent 72%)' }} />
        <div style={{ position: 'absolute', top: '8%', left: '26%', width: 700, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(14,42,44,0.35) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: EVENT.image, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.18) 70%, transparent 100%)' }} />
      </div>

      {/* Back button */}
      <button style={{ position: 'absolute', top: 120, left: 56, zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 9999, padding: '10px 20px', color: 'rgba(255,255,255,0.75)', fontFamily: F, fontSize: 14, cursor: 'pointer' }}>
        <span style={{ fontSize: 16 }}>←</span> Back
      </button>

      {/* Bottom-left: event meta text */}
      <div style={{ position: 'absolute', bottom: 52, left: 72, zIndex: 4, maxWidth: 860 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(177,216,212,0.15)', border: '1px solid rgba(177,216,212,0.35)', borderRadius: 9999, padding: '5px 14px', marginBottom: 18 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B1D8D4', display: 'inline-block' }} />
          <span style={{ color: '#B1D8D4', fontFamily: F, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{EVENT.tag} · {EVENT.category}</span>
        </div>
        <h1 style={{ fontFamily: F, fontSize: 72, fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2.5px', color: '#fff', margin: '0 0 24px' }}>{EVENT.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <span style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.72)' }}>{EVENT.date}</span>
          </div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 13 8 13s8-7.6 8-13a8 8 0 0 0-8-8z" /></svg>
            <span style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.72)' }}>{EVENT.location}</span>
          </div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            <span style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.72)' }}>{EVENT.attendees.toLocaleString()} going</span>
          </div>
        </div>
      </div>

      {/* Bottom-right: ticket card pinned inside hero */}
      <div style={{ position: 'absolute', bottom: 180, right: 72, zIndex: 5, width: 420 }}>
        <TicketCard />
      </div>
    </section>
  );
}

function TicketCard() {
  const [selected, setSelected] = useState(1);
  const ticket = EVENT.tickets[selected];
  return (
    <div style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontFamily: F, fontSize: 12, color: '#B1D8D4', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Select Tickets</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {EVENT.tickets.map((t, i) => (
            <button
              key={i}
              onClick={() => t.available && setSelected(i)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: selected === i ? 'rgba(177,216,212,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected === i ? 'rgba(177,216,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 14, padding: '14px 18px', cursor: t.available ? 'pointer' : 'default',
                opacity: t.available ? 1 : 0.38, transition: 'all 0.18s', textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${selected === i ? '#B1D8D4' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {selected === i && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#B1D8D4' }} />}
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{t.tier}</div>
                  <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{t.desc}</div>
                </div>
              </div>
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: selected === i ? '#B1D8D4' : 'rgba(255,255,255,0.6)', flexShrink: 0, marginLeft: 12 }}>{t.price}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>1× {ticket.tier}</span>
          <span style={{ fontFamily: F, fontSize: 14, color: '#fff' }}>{ticket.price}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>Service fee</span>
          <span style={{ fontFamily: F, fontSize: 14, color: '#fff' }}>
            {ticket.price === 'Free' ? 'Free' : '£1.50'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#fff' }}>Total</span>
          <span style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#B1D8D4' }}>
            {ticket.price === 'Free' ? 'Free' : `£${(parseFloat(ticket.price.replace('£', '')) + 1.5).toFixed(2)}`}
          </span>
        </div>
      </div>

      <button style={{ width: '100%', background: '#EBE88A', border: 'none', borderRadius: 14, padding: '16px 0', color: '#0e2a2c', fontFamily: F, fontSize: 16, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        Get Tickets
      </button>
      <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>No payment required until checkout</div>
    </div>
  );
}

function RelatedCard({ event }: { event: typeof RELATED[0] }) {
  return (
    <div style={{ width: 320, flexShrink: 0 }}>
      <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: '#111', aspectRatio: '4/5', boxShadow: '0 16px 48px rgba(0,0,0,0.35)' }}>
        <div style={{ position: 'absolute', inset: 0, background: event.image, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.82) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>{event.category}</div>
            <div style={{ fontFamily: F, fontSize: 11, textTransform: 'uppercase', color: '#fff', background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9999, padding: '6px 10px' }}>{event.price}</div>
          </div>
          <div>
            <div style={{ fontFamily: F, fontSize: 26, lineHeight: 1.0, fontWeight: 600, letterSpacing: '-0.8px', color: '#fff', marginBottom: 6 }}>{event.title}</div>
            <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{event.date}</div>
            <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{event.location}</div>
          </div>
        </div>
      </div>
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

export function EventDetail() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="happenin-root">
      <Navbar />
      <Hero />

      {/* Main content */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '64px 72px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 156, alignItems: 'start' }}>

        {/* Left column: About + Lineup */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          <div>
            <div style={{ fontSize: 11, color: '#B1D8D4', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12, fontFamily: F }}>About</div>
            <h2 style={{ fontFamily: F, fontSize: 32, fontWeight: 700, letterSpacing: '-1px', margin: '0 0 20px', color: '#fff' }}>About this event</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {EVENT.description.split('\n\n').map((p, i) => (
                <p key={i} style={{ fontFamily: F, fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', margin: 0 }}>{p}</p>
              ))}
            </div>
          </div>

          {/* Lineup */}
          <div>
            <div style={{ fontSize: 11, color: '#B1D8D4', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12, fontFamily: F }}>Schedule</div>
            <h2 style={{ fontFamily: F, fontSize: 32, fontWeight: 700, letterSpacing: '-1px', margin: '0 0 24px', color: '#fff' }}>Lineup & Schedule</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {EVENT.lineup.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.type === 'headline' ? '#EBE88A' : item.type === 'info' ? 'rgba(255,255,255,0.18)' : '#B1D8D4', flexShrink: 0, zIndex: 1 }} />
                    {i < EVENT.lineup.length - 1 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.08)' }} />}
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i < EVENT.lineup.length - 1 ? 20 : 0, paddingLeft: 12 }}>
                    <div>
                      <div style={{ fontFamily: F, fontSize: item.type === 'headline' ? 20 : 16, fontWeight: item.type === 'headline' ? 700 : 400, color: item.type === 'info' ? 'rgba(255,255,255,0.35)' : '#fff', letterSpacing: item.type === 'headline' ? '-0.3px' : 0 }}>{item.act}</div>
                      {item.type === 'headline' && <div style={{ fontFamily: F, fontSize: 11, color: '#EBE88A', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginTop: 2 }}>Headliner</div>}
                    </div>
                    <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', flexShrink: 0, marginLeft: 24 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Details + Organiser */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          <div>
            <div style={{ fontSize: 11, color: '#B1D8D4', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12, fontFamily: F }}>Details</div>
            <h2 style={{ fontFamily: F, fontSize: 32, fontWeight: 700, letterSpacing: '-1px', margin: '0 0 24px', color: '#fff' }}>When & Where</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B1D8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>, label: 'Date', value: EVENT.date },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B1D8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, label: 'Time', value: EVENT.time },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B1D8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 13 8 13s8-7.6 8-13a8 8 0 0 0-8-8z" /></svg>, label: 'Venue', value: EVENT.location },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B1D8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, label: 'Address', value: EVENT.address },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px 22px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5 }}>{label}</div>
                    <div style={{ fontFamily: F, fontSize: 15, color: '#fff', fontWeight: 500, lineHeight: 1.35 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, borderRadius: 16, overflow: 'hidden', height: 220, background: 'linear-gradient(135deg, rgba(12,22,23,0.96), rgba(6,11,12,0.98))', border: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(127,224,213,0.16) 1px, transparent 1px)', backgroundSize: '18px 18px', opacity: 0.55 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)' }} />
              <svg viewBox="0 0 720 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none">
                <path d="M96 242C152 214 176 182 216 156C260 128 306 124 346 138C388 152 422 180 466 176C518 171 548 134 602 118" stroke="rgba(177,216,212,0.55)" strokeWidth="6" strokeLinecap="round" />
                <path d="M70 94C122 102 164 92 204 74C246 55 280 50 324 62C370 74 402 104 448 110C500 117 550 100 632 72" stroke="rgba(127,224,213,0.24)" strokeWidth="4" strokeLinecap="round" />
                <path d="M126 284C172 272 208 246 248 228C292 209 338 206 382 220C430 235 470 262 524 260C570 258 616 234 656 200" stroke="rgba(235,232,138,0.18)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="362" cy="160" r="14" fill="#7FE0D5" opacity="0.95" />
                <circle cx="362" cy="160" r="30" stroke="rgba(127,224,213,0.28)" strokeWidth="2" />
                <circle cx="362" cy="160" r="52" stroke="rgba(127,224,213,0.16)" strokeWidth="2" />
                <path d="M362 128C366 138 374 146 384 150C374 154 366 162 362 172C358 162 350 154 340 150C350 146 358 138 362 128Z" fill="#EBE88A" opacity="0.9" />
              </svg>
              <div style={{ position: 'absolute', left: 20, top: 20, background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9999, padding: '7px 12px', fontFamily: F, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B1D8D4' }}>Map · {EVENT.address}</div>
              <div style={{ position: 'absolute', left: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontFamily: F }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(127,224,213,0.15)', border: '1px solid rgba(127,224,213,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Rooftop Arena</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>South Bank · London</div>
                </div>
              </div>
            </div>
          </div>

          {/* Organiser */}
          <div>
            <div style={{ fontSize: 11, color: '#B1D8D4', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12, fontFamily: F }}>Organiser</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #0e2a2c, #1a4a4e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: '#B1D8D4' }}>N</span>
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{EVENT.organiser}</div>
                  <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{EVENT.organiserFollowers} followers</div>
                </div>
              </div>
              <button style={{ background: 'rgba(177,216,212,0.1)', border: '1px solid rgba(177,216,212,0.25)', borderRadius: 9999, padding: '10px 22px', color: '#B1D8D4', fontFamily: F, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Follow</button>
            </div>
          </div>
        </div>

      </div>

      {/* Related events */}
      <section style={{ padding: '72px 72px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, color: '#B1D8D4', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8, fontFamily: F }}>More Like This</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px', fontFamily: F, margin: 0 }}>You Might Also Like</h2>
          </div>
          <a href="#" style={{ fontSize: 13, color: '#B1D8D4', fontWeight: 600, textDecoration: 'none', fontFamily: F, textTransform: 'uppercase', letterSpacing: '0.5px' }}>VIEW ALL →</a>
        </div>
        <div ref={scrollRef} style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
          {RELATED.map(e => <RelatedCard key={e.id} event={e} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
