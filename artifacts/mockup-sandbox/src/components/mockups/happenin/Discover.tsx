import './_group.css';
import { useState } from 'react';

const F = 'var(--font)';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = `${BASE}/happenin-logo-new.png`;

const NAV_LINKS = ['Discover', 'My Tickets', 'Saved', 'Chat'];

const CATS = [
  { icon: '✦', label: 'All' },
  { icon: '🎵', label: 'Music' },
  { icon: '🎨', label: 'Art' },
  { icon: '🍽️', label: 'Food' },
  { icon: '💼', label: 'Business' },
  { icon: '🎮', label: 'Gaming' },
  { icon: '🎭', label: 'Theatre' },
  { icon: '🏃', label: 'Sports' },
  { icon: '📚', label: 'Education' },
  { icon: '🌿', label: 'Wellness' },
];

type Ev = {
  id: number; title: string; date: string; time: string;
  location: string; city: string; category: string; price: string;
  image: string; tag: string; attendees: number;
};

const ALL_EVENTS: Ev[] = [
  { id: 1,  title: 'Neon Pulse Music Festival',      date: 'Sat, 14 Jun', time: '6:00 PM', location: 'Rooftop Arena',          city: 'London',    category: 'Music',     price: 'Free', tag: 'Featured', attendees: 842,    image: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80)' },
  { id: 2,  title: 'Digital Art & Design Summit',    date: 'Fri, 20 Jun', time: '10:00 AM', location: 'East Wing Gallery',      city: 'Berlin',    category: 'Art',       price: 'Free', tag: 'Trending', attendees: 320,    image: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80)' },
  { id: 3,  title: 'Global Street Food Festival',    date: 'Sun, 6 Jul',  time: '12:00 PM', location: 'Victoria Park',          city: 'Melbourne', category: 'Food',      price: '£12', tag: 'Hot',      attendees: 1240,   image: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80)' },
  { id: 4,  title: 'Startup Founders Meetup',        date: 'Thu, 26 Jun', time: '7:00 PM',  location: 'Tech Hub',               city: 'Amsterdam', category: 'Business',  price: 'Free', tag: '',         attendees: 178,    image: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80)' },
  { id: 5,  title: 'Championship Gaming League',     date: 'Fri, 11 Jul', time: '3:00 PM',  location: 'Esports Arena',          city: 'Seoul',     category: 'Gaming',    price: 'Free', tag: 'New',      attendees: 2100,   image: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80)' },
  { id: 6,  title: 'Theatre Night: Hamlet Redux',    date: 'Fri, 27 Jun', time: '8:00 PM',  location: 'Royal Exchange',         city: 'Manchester',category: 'Theatre',   price: '£25', tag: '',         attendees: 390,    image: 'url(https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80)' },
  { id: 7,  title: 'Arctic Monkeys: World Tour',     date: 'Sat, 2 Aug',  time: '7:00 PM',  location: 'Wembley Stadium',        city: 'London',    category: 'Music',     price: '£85', tag: 'Popular',  attendees: 85000,  image: 'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80)' },
  { id: 8,  title: 'Jazz Under the Stars',           date: 'Wed, 9 Jul',  time: '7:30 PM',  location: 'Harbour Park',           city: 'Sydney',    category: 'Music',     price: '£18', tag: '',         attendees: 560,    image: 'url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80)' },
  { id: 9,  title: 'AR & VR Expo 2025',              date: 'Sat, 26 Jul', time: '10:00 AM', location: 'ExCeL London',           city: 'London',    category: 'Education', price: '£35', tag: 'New',      attendees: 1800,   image: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80)' },
  { id: 10, title: 'Wellness & Yoga Retreat',        date: 'Sat, 5 Jul',  time: '9:00 AM',  location: 'Kew Gardens',            city: 'London',    category: 'Wellness',  price: '£40', tag: '',         attendees: 210,    image: 'url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80)' },
  { id: 11, title: 'Coldplay: Music of the Spheres', date: 'Sun, 27 Jul', time: '7:30 PM',  location: 'Emirates Stadium',       city: 'London',    category: 'Music',     price: '£95', tag: 'Popular',  attendees: 60000,  image: 'url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80)' },
  { id: 12, title: 'Sustainable Fashion Show',       date: 'Sun, 20 Jul', time: '3:00 PM',  location: 'Tate Modern',            city: 'London',    category: 'Art',       price: 'Free', tag: 'New',      attendees: 420,    image: 'url(https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80)' },
  { id: 13, title: 'Craft Beer Festival',            date: 'Sat, 19 Jul', time: '2:00 PM',  location: 'Battersea',              city: 'London',    category: 'Food',      price: '£20', tag: '',         attendees: 870,    image: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80)' },
  { id: 14, title: 'Web3 Builders Summit',           date: 'Thu, 24 Jul', time: '9:00 AM',  location: 'Canary Wharf',           city: 'London',    category: 'Business',  price: '£120', tag: 'New',     attendees: 600,    image: 'url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80)' },
  { id: 15, title: 'London Marathon 2025',           date: 'Sun, 27 Jul', time: '9:00 AM',  location: 'Greenwich Park',         city: 'London',    category: 'Sports',    price: '£50', tag: '',         attendees: 42000,  image: 'url(https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=900&q=80)' },
  { id: 16, title: 'Classical Piano Recital',        date: 'Wed, 16 Jul', time: '7:30 PM',  location: 'Wigmore Hall',           city: 'London',    category: 'Music',     price: '£30', tag: '',         attendees: 250,    image: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80)' },
  { id: 17, title: 'Night Market: Asia Edition',     date: 'Sat, 19 Jul', time: '5:00 PM',  location: 'Spitalfields',           city: 'London',    category: 'Food',      price: 'Free', tag: 'New',      attendees: 950,    image: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80)' },
  { id: 18, title: 'Salsa & Bachata Social',         date: 'Fri, 18 Jul', time: '8:00 PM',  location: 'Dance Fusion',           city: 'Bristol',   category: 'Theatre',   price: '£8', tag: 'New',       attendees: 145,    image: 'url(https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=900&q=80)' },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Featured: { bg: '#7FE0D5', color: '#0e2a2c' },
  Trending:  { bg: '#EBE88A', color: '#1a1600' },
  Hot:       { bg: '#ff6b4a', color: '#fff' },
  New:       { bg: 'rgba(255,255,255,0.15)', color: '#fff' },
  Popular:   { bg: '#EBE88A', color: '#1a1600' },
};

function fmtAttendees(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

function EventCard({ ev, large = false }: { ev: Ev; large?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const tag = TAG_COLORS[ev.tag];
  const isFree = ev.price === 'Free';
  const photoH = large ? 380 : 260;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.location.href = `${BASE}/preview/happenin/EventDetail`}
      style={{
        background: '#111213',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${hovered ? 'rgba(127,224,213,0.35)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.18s, transform 0.18s, box-shadow 0.18s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 40px rgba(127,224,213,0.1)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', height: photoH, flexShrink: 0, background: '#1a1a1a', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: ev.image,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'transform 0.4s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
        {/* Tag */}
        {ev.tag && tag && (
          <div style={{ position: 'absolute', top: 16, left: 16, background: tag.bg, color: tag.color, fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', borderRadius: 100, padding: '5px 12px' }}>
            {ev.tag}
          </div>
        )}
        {/* Price */}
        <div style={{ position: 'absolute', top: 16, right: 16, background: isFree ? 'rgba(127,224,213,0.18)' : 'rgba(235,232,138,0.15)', border: `1px solid ${isFree ? 'rgba(127,224,213,0.4)' : 'rgba(235,232,138,0.4)'}`, backdropFilter: 'blur(8px)', color: isFree ? '#7FE0D5' : '#EBE88A', fontFamily: F, fontSize: 13, fontWeight: 700, borderRadius: 100, padding: '5px 13px' }}>
          {ev.price}
        </div>
        {/* Category pill on photo */}
        <div style={{ position: 'absolute', bottom: 14, left: 16, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontFamily: F, fontSize: 11, fontWeight: 600, borderRadius: 100, padding: '4px 11px' }}>
          {ev.category}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: large ? '22px 24px 24px' : '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontFamily: F, fontSize: large ? 19 : 16, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 10 }}>{ev.title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.6)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{ev.date} · {ev.time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{ev.location}, {ev.city}</span>
          </div>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex' }}>
              {[0,1,2].map(j => <div key={j} style={{ width: 22, height: 22, borderRadius: '50%', background: ['#7FE0D5','#EBE88A','#fff'][j], border: '2px solid #111213', marginLeft: j > 0 ? -7 : 0, opacity: 0.7 + j * 0.1 }} />)}
            </div>
            <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{fmtAttendees(ev.attendees)} going</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: isFree ? '#7FE0D5' : '#EBE88A', fontFamily: F, fontSize: 13, fontWeight: 700 }}>
            {isFree ? 'Free' : ev.price}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.14)', backdropFilter: 'blur(16px)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px 0 0' }}>
        <div style={{ background: '#0e2a2c', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        {NAV_LINKS.map(link => (
          <div key={link} style={{ padding: '0 16px', height: 61, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ fontFamily: F, fontSize: 16, fontWeight: link === 'Discover' ? 700 : 400, color: link === 'Discover' ? '#7FE0D5' : 'rgba(255,255,255,0.65)', borderBottom: link === 'Discover' ? '2px solid #7FE0D5' : '2px solid transparent', paddingBottom: 2, transition: 'color 0.15s' }}>
              {link}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, padding: '0 20px', height: 52 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.8)" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>London, UK</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div onClick={() => window.location.href = `${BASE}/preview/happenin/Login`} style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 32px', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ color: '#0e2a2c', fontFamily: F, fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px' }}>Sign In</span>
        </div>
      </div>
    </div>
  );
}

export function Discover() {
  const [activecat, setActivecat] = useState('All');
  const [searchVal, setSearchVal] = useState('');

  const filtered = ALL_EVENTS.filter(ev => {
    const catMatch = activecat === 'All' || ev.category === activecat;
    const searchMatch = !searchVal || ev.title.toLowerCase().includes(searchVal.toLowerCase()) || ev.location.toLowerCase().includes(searchVal.toLowerCase());
    return catMatch && searchMatch;
  });

  const featured = filtered.slice(0, 2);
  const rest = filtered.slice(2);

  return (
    <div className="happenin-root" style={{ background: '#080a0b', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        .dc-search:focus { outline: none; border-color: rgba(127,224,213,0.5) !important; }
        .dc-search::placeholder { color: rgba(255,255,255,0.28); }
        .dc-cat:hover { background: rgba(127,224,213,0.1) !important; color: #7FE0D5 !important; }
      `}</style>
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ position: 'relative', paddingTop: 160, paddingBottom: 60, paddingLeft: 80, paddingRight: 80, overflow: 'hidden' }}>
        {/* Background accent glows */}
        <div style={{ position: 'absolute', top: 0, left: '-10%', width: 900, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,42,44,0.55) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-5%', right: '-5%', width: 700, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(50,40,8,0.4) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, marginBottom: 48 }}>
          <div style={{ fontFamily: F, fontSize: 12, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.6)', fontWeight: 600, marginBottom: 18 }}>
            Events near you · London, UK
          </div>
          <h1 style={{ fontFamily: F, fontSize: 72, fontWeight: 800, letterSpacing: '-3px', color: '#fff', lineHeight: 1, margin: 0, marginBottom: 18 }}>
            Discover<br/><span style={{ color: '#7FE0D5' }}>what's happening.</span>
          </h1>
          <p style={{ fontFamily: F, fontSize: 18, color: 'rgba(255,255,255,0.4)', fontWeight: 400, margin: 0, lineHeight: 1.5, maxWidth: 520 }}>
            Free tickets, real events, real people. Browse thousands of experiences happening this week and beyond.
          </p>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 12, maxWidth: 900 }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg style={{ position: 'absolute', left: 20, flexShrink: 0 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.5)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              className="dc-search"
              type="text"
              placeholder="Search events, artists, venues..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '20px 20px 20px 54px', color: '#fff', fontFamily: F, fontSize: 16, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '0 24px', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.65)', fontWeight: 500, whiteSpace: 'nowrap' }}>London, UK</span>
          </div>
          <button style={{ background: '#7FE0D5', border: 'none', borderRadius: 16, padding: '0 40px', color: '#0e2a2c', fontFamily: F, fontSize: 16, fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}>
            Search
          </button>
        </div>

        {/* Stats row */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 40, marginTop: 36 }}>
          {[['2,400+', 'Events this month'], ['180+', 'Cities worldwide'], ['80k+', 'Active members'], ['Free', 'Always free tickets']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: '#7FE0D5', letterSpacing: '-0.5px' }}>{val}</div>
              <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Filter ── */}
      <div style={{ position: 'sticky', top: 82, zIndex: 50, background: 'rgba(8,10,11,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 80px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {CATS.map(cat => {
            const active = cat.label === activecat;
            return (
              <button
                key={cat.label}
                className={active ? '' : 'dc-cat'}
                onClick={() => setActivecat(cat.label)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, background: active ? '#7FE0D5' : 'rgba(255,255,255,0.06)', border: `1px solid ${active ? '#7FE0D5' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '10px 20px', color: active ? '#0e2a2c' : 'rgba(255,255,255,0.65)', fontFamily: F, fontSize: 14, fontWeight: active ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', flexShrink: 0 }}
              >
                <span style={{ fontSize: 15 }}>{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '60px 80px 120px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.5)', fontWeight: 600, marginBottom: 8 }}>
              {activecat === 'All' ? 'Handpicked for you' : activecat + ' events'}
            </div>
            <h2 style={{ fontFamily: F, fontSize: 36, fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>
              {activecat === 'All' ? 'Featured Events' : `Top ${activecat} Events`}
            </h2>
          </div>
          <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(127,224,213,0.7)', fontWeight: 600, cursor: 'pointer' }}>
            {filtered.length} results
          </span>
        </div>

        {/* Featured row (2 large cards) */}
        {featured.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: featured.length === 1 ? '1fr' : '1fr 1fr', gap: 32, marginBottom: 48 }}>
            {featured.map(ev => <EventCard key={ev.id} ev={ev} large />)}
          </div>
        )}

        {/* Divider */}
        {rest.length > 0 && featured.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 600, flexShrink: 0 }}>
              All Events
            </div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>
        )}

        {/* 3-col grid */}
        {rest.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 64 }}>
            {rest.map(ev => <EventCard key={ev.id} ev={ev} />)}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>No events found</div>
            <div style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.35)' }}>Try a different category or search term</div>
          </div>
        )}

        {/* Load more */}
        {filtered.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button style={{ background: 'transparent', border: '1px solid rgba(127,224,213,0.3)', borderRadius: 14, padding: '16px 56px', color: '#7FE0D5', fontFamily: F, fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.2px' }}>
              Load more events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
