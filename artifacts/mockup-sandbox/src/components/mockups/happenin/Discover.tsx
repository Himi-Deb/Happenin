import './_group.css';
import { useState, useEffect, useRef, useCallback } from 'react';

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

const FILTERS = ['All', 'Free', 'This Week', 'This Weekend', 'This Month'];
const SORTS = ['Date', 'Popularity', 'Price: Low to High', 'Price: High to Low'];

type Ev = {
  id: number; title: string; date: string; time: string;
  location: string; city: string; category: string; price: string;
  image: string; tag: string; attendees: number; dateOrder: number;
};

const ALL_EVENTS: Ev[] = [
  { id: 1,  title: 'Neon Pulse Music Festival',      date: 'Sat, 14 Jun', time: '6:00 PM',  location: 'Rooftop Arena',       city: 'London',     category: 'Music',     price: 'Free',  tag: 'Featured', attendees: 842,   dateOrder: 1,  image: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80)' },
  { id: 2,  title: 'Digital Art & Design Summit',    date: 'Fri, 20 Jun', time: '10:00 AM', location: 'East Wing Gallery',   city: 'Berlin',     category: 'Art',       price: 'Free',  tag: 'Trending', attendees: 320,   dateOrder: 2,  image: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80)' },
  { id: 3,  title: 'Global Street Food Festival',    date: 'Sun, 6 Jul',  time: '12:00 PM', location: 'Victoria Park',       city: 'Melbourne',  category: 'Food',      price: '£12',   tag: 'Hot',      attendees: 1240,  dateOrder: 7,  image: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80)' },
  { id: 4,  title: 'Startup Founders Meetup',        date: 'Thu, 26 Jun', time: '7:00 PM',  location: 'Tech Hub',            city: 'Amsterdam',  category: 'Business',  price: 'Free',  tag: '',         attendees: 178,   dateOrder: 3,  image: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80)' },
  { id: 5,  title: 'Championship Gaming League',     date: 'Fri, 11 Jul', time: '3:00 PM',  location: 'Esports Arena',       city: 'Seoul',      category: 'Gaming',    price: 'Free',  tag: 'New',      attendees: 2100,  dateOrder: 9,  image: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80)' },
  { id: 6,  title: 'Theatre Night: Hamlet Redux',    date: 'Fri, 27 Jun', time: '8:00 PM',  location: 'Royal Exchange',      city: 'Manchester', category: 'Theatre',   price: '£25',   tag: '',         attendees: 390,   dateOrder: 4,  image: 'url(https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80)' },
  { id: 7,  title: 'Arctic Monkeys: World Tour',     date: 'Sat, 2 Aug',  time: '7:00 PM',  location: 'Wembley Stadium',     city: 'London',     category: 'Music',     price: '£85',   tag: 'Popular',  attendees: 85000, dateOrder: 13, image: 'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80)' },
  { id: 8,  title: 'Jazz Under the Stars',           date: 'Wed, 9 Jul',  time: '7:30 PM',  location: 'Harbour Park',        city: 'Sydney',     category: 'Music',     price: '£18',   tag: '',         attendees: 560,   dateOrder: 8,  image: 'url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80)' },
  { id: 9,  title: 'AR & VR Expo 2025',              date: 'Sat, 26 Jul', time: '10:00 AM', location: 'ExCeL London',        city: 'London',     category: 'Education', price: '£35',   tag: 'New',      attendees: 1800,  dateOrder: 11, image: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80)' },
  { id: 10, title: 'Wellness & Yoga Retreat',        date: 'Sat, 5 Jul',  time: '9:00 AM',  location: 'Kew Gardens',         city: 'London',     category: 'Wellness',  price: '£40',   tag: '',         attendees: 210,   dateOrder: 6,  image: 'url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80)' },
  { id: 11, title: 'Coldplay: Music of the Spheres', date: 'Sun, 27 Jul', time: '7:30 PM',  location: 'Emirates Stadium',    city: 'London',     category: 'Music',     price: '£95',   tag: 'Popular',  attendees: 60000, dateOrder: 12, image: 'url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80)' },
  { id: 12, title: 'Sustainable Fashion Show',       date: 'Sun, 20 Jul', time: '3:00 PM',  location: 'Tate Modern',         city: 'London',     category: 'Art',       price: 'Free',  tag: 'New',      attendees: 420,   dateOrder: 10, image: 'url(https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80)' },
  { id: 13, title: 'Craft Beer Festival',            date: 'Sat, 19 Jul', time: '2:00 PM',  location: 'Battersea',           city: 'London',     category: 'Food',      price: '£20',   tag: '',         attendees: 870,   dateOrder: 10, image: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80)' },
  { id: 14, title: 'Web3 Builders Summit',           date: 'Thu, 24 Jul', time: '9:00 AM',  location: 'Canary Wharf',        city: 'London',     category: 'Business',  price: '£120',  tag: 'New',      attendees: 600,   dateOrder: 11, image: 'url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80)' },
  { id: 15, title: 'London Marathon 2025',           date: 'Sun, 27 Jul', time: '9:00 AM',  location: 'Greenwich Park',      city: 'London',     category: 'Sports',    price: '£50',   tag: '',         attendees: 42000, dateOrder: 12, image: 'url(https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=900&q=80)' },
  { id: 16, title: 'Classical Piano Recital',        date: 'Wed, 16 Jul', time: '7:30 PM',  location: 'Wigmore Hall',        city: 'London',     category: 'Music',     price: '£30',   tag: '',         attendees: 250,   dateOrder: 10, image: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80)' },
  { id: 17, title: 'Night Market: Asia Edition',     date: 'Sat, 19 Jul', time: '5:00 PM',  location: 'Spitalfields',        city: 'London',     category: 'Food',      price: 'Free',  tag: 'New',      attendees: 950,   dateOrder: 10, image: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80)' },
  { id: 18, title: 'Salsa & Bachata Social',         date: 'Fri, 18 Jul', time: '8:00 PM',  location: 'Dance Fusion',        city: 'Bristol',    category: 'Theatre',   price: '£8',    tag: 'New',      attendees: 145,   dateOrder: 10, image: 'url(https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=900&q=80)' },
];

const FEATURED_POOL = ALL_EVENTS.slice(0, 6);

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

function priceSortVal(price: string): number {
  if (price === 'Free') return 0;
  return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
}

function EventCard({ ev, large = false }: { ev: Ev; large?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const tag = TAG_COLORS[ev.tag];
  const isFree = ev.price === 'Free';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.location.href = `${BASE}/preview/happenin/EventDetail`}
      style={{
        position: 'relative', borderRadius: 24, overflow: 'hidden',
        background: '#111', aspectRatio: large ? '4/3' : '4/5',
        boxShadow: hovered ? '0 24px 64px rgba(0,0,0,0.55)' : '0 18px 60px rgba(0,0,0,0.35)',
        cursor: 'pointer',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
      }}
    >
      {/* Photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: ev.image, backgroundSize: 'cover', backgroundPosition: 'center',
        transition: 'transform 0.45s ease',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }} />
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.86) 100%)' }} />

      {/* Content layer */}
      <div style={{ position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

        {/* Top row: category + price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>{ev.category}</div>
          <div style={{ fontFamily: F, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: isFree ? '#7FE0D5' : '#fff', background: isFree ? 'rgba(127,224,213,0.18)' : 'rgba(0,0,0,0.3)', border: `1px solid ${isFree ? 'rgba(127,224,213,0.35)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 9999, padding: '6px 13px', backdropFilter: 'blur(8px)' }}>
            {ev.price}
          </div>
        </div>

        {/* Bottom: tag + title + meta */}
        <div>
          {ev.tag && tag && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: tag.bg, color: tag.color, fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', borderRadius: 100, padding: '4px 10px', marginBottom: 10 }}>
              {ev.tag}
            </div>
          )}
          <div style={{ fontFamily: F, fontSize: large ? 28 : 22, lineHeight: 1.0, fontWeight: 600, letterSpacing: '-0.6px', color: '#fff', marginBottom: 8 }}>{ev.title}</div>
          <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 3 }}>{ev.date} · {ev.time}</div>
          <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{ev.location}, {ev.city}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
            <div style={{ display: 'flex' }}>
              {[0,1,2].map(j => <div key={j} style={{ width: 20, height: 20, borderRadius: '50%', background: ['#7FE0D5','#EBE88A','rgba(255,255,255,0.6)'][j], border: '2px solid rgba(0,0,0,0.4)', marginLeft: j > 0 ? -6 : 0 }} />)}
            </div>
            <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{fmtAttendees(ev.attendees)} going</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCarousel({ items }: { items: Ev[] }) {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const maxIdx = Math.max(0, items.length - 2);

  const slideTo = useCallback((next: number) => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const step = (wrap.offsetWidth - 32) / 2 + 32;
    track.style.transform = `translateX(-${next * step}px)`;
    setIdx(next);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(prev => {
        const next = prev >= maxIdx ? 0 : prev + 1;
        slideTo(next);
        return next;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [maxIdx, slideTo]);

  const prev = () => slideTo(idx <= 0 ? maxIdx : idx - 1);
  const next = () => slideTo(idx >= maxIdx ? 0 : idx + 1);

  return (
    <div style={{ position: 'relative' }}>
      {/* Track wrapper — clips overflow */}
      <div ref={wrapRef} style={{ overflow: 'hidden', borderRadius: 20 }}>
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: 32, transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)' }}
        >
          {items.map(ev => (
            <div key={ev.id} style={{ minWidth: 'calc(50% - 16px)', flexShrink: 0 }}>
              <EventCard ev={ev} large />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      {[
        { dir: 'prev', onClick: prev, x: -24, icon: <polyline points="15 18 9 12 15 6"/> },
        { dir: 'next', onClick: next, x: undefined, right: -24, icon: <polyline points="9 18 15 12 9 6"/> },
      ].map(btn => (
        <button
          key={btn.dir}
          onClick={btn.onClick}
          style={{
            position: 'absolute', top: '50%',
            ...(btn.dir === 'prev' ? { left: -24 } : { right: -24 }),
            transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(14,42,44,0.85)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(127,224,213,0.25)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10, transition: 'background 0.15s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2.5" strokeLinecap="round">{btn.icon}</svg>
        </button>
      ))}

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => slideTo(i)}
            style={{ width: i === idx ? 28 : 8, height: 8, borderRadius: 100, border: 'none', cursor: 'pointer', background: i === idx ? '#7FE0D5' : 'rgba(255,255,255,0.18)', transition: 'all 0.3s', padding: 0 }}
          />
        ))}
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
            <span style={{ fontFamily: F, fontSize: 16, fontWeight: link === 'Discover' ? 700 : 400, color: link === 'Discover' ? '#7FE0D5' : 'rgba(255,255,255,0.65)', borderBottom: link === 'Discover' ? '2px solid #7FE0D5' : '2px solid transparent', paddingBottom: 2 }}>
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
          <span style={{ color: '#0e2a2c', fontFamily: F, fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Sign In</span>
        </div>
      </div>
    </div>
  );
}

export function Discover() {
  const [activecat, setActivecat] = useState('All');
  const [searchVal, setSearchVal] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [sortOpen, setSortOpen] = useState(false);

  const baseFiltered = ALL_EVENTS.filter(ev => {
    const catMatch = activecat === 'All' || ev.category === activecat;
    const searchMatch = !searchVal || ev.title.toLowerCase().includes(searchVal.toLowerCase()) || ev.location.toLowerCase().includes(searchVal.toLowerCase());
    const freeMatch = activeFilter !== 'Free' || ev.price === 'Free';
    const weekMatch = activeFilter !== 'This Week' || ev.dateOrder <= 5;
    const wkndMatch = activeFilter !== 'This Weekend' || ev.dateOrder <= 3;
    const monthMatch = activeFilter !== 'This Month' || ev.dateOrder <= 10;
    return catMatch && searchMatch && freeMatch && weekMatch && wkndMatch && monthMatch;
  });

  const sorted = [...baseFiltered].sort((a, b) => {
    if (sortBy === 'Popularity') return b.attendees - a.attendees;
    if (sortBy === 'Price: Low to High') return priceSortVal(a.price) - priceSortVal(b.price);
    if (sortBy === 'Price: High to Low') return priceSortVal(b.price) - priceSortVal(a.price);
    return a.dateOrder - b.dateOrder;
  });

  const gridEvents = sorted;

  return (
    <div className="happenin-root" style={{ background: '#080a0b', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        .dc-search:focus { outline: none; border-color: rgba(127,224,213,0.5) !important; }
        .dc-search::placeholder { color: rgba(255,255,255,0.28); }
        .dc-cat:hover { background: rgba(127,224,213,0.1) !important; color: #7FE0D5 !important; }
        .dc-filt:hover { background: rgba(255,255,255,0.1) !important; }
        .dc-sort-item:hover { background: rgba(127,224,213,0.08) !important; color: #7FE0D5 !important; }
      `}</style>
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ position: 'relative', paddingTop: 160, paddingBottom: 60, paddingLeft: 80, paddingRight: 80, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '-10%', width: 900, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,42,44,0.55) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-5%', right: '-5%', width: 700, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(50,40,8,0.4) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, marginBottom: 48 }}>
          <div style={{ fontFamily: F, fontSize: 12, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.6)', fontWeight: 600, marginBottom: 18 }}>Events near you · London, UK</div>
          <h1 style={{ fontFamily: F, fontSize: 72, fontWeight: 800, letterSpacing: '-3px', color: '#fff', lineHeight: 1, margin: 0, marginBottom: 18 }}>
            Discover<br/><span style={{ color: '#7FE0D5' }}>what's happening.</span>
          </h1>
          <p style={{ fontFamily: F, fontSize: 18, color: 'rgba(255,255,255,0.4)', fontWeight: 400, margin: 0, lineHeight: 1.5, maxWidth: 520 }}>
            Free tickets, real events, real people. Browse thousands of experiences happening this week and beyond.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 12, maxWidth: 900 }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg style={{ position: 'absolute', left: 20 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.5)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="dc-search" type="text" placeholder="Search events, artists, venues..." value={searchVal} onChange={e => setSearchVal(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '20px 20px 20px 54px', color: '#fff', fontFamily: F, fontSize: 16, boxSizing: 'border-box', transition: 'border-color 0.2s' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '0 24px', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.65)', fontWeight: 500, whiteSpace: 'nowrap' }}>London, UK</span>
          </div>
          <button style={{ background: '#7FE0D5', border: 'none', borderRadius: 16, padding: '0 40px', color: '#0e2a2c', fontFamily: F, fontSize: 16, fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}>Search</button>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 40, marginTop: 36 }}>
          {[['2,400+', 'Events this month'], ['180+', 'Cities worldwide'], ['80k+', 'Active members'], ['Free', 'Always free tickets']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: '#7FE0D5', letterSpacing: '-0.5px' }}>{val}</div>
              <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Filter (sticky) ── */}
      <div style={{ position: 'sticky', top: 82, zIndex: 50, background: 'rgba(8,10,11,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 80px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {CATS.map(cat => {
            const active = cat.label === activecat;
            return (
              <button key={cat.label} className={active ? '' : 'dc-cat'} onClick={() => setActivecat(cat.label)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, background: active ? '#7FE0D5' : 'rgba(255,255,255,0.06)', border: `1px solid ${active ? '#7FE0D5' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '10px 20px', color: active ? '#0e2a2c' : 'rgba(255,255,255,0.65)', fontFamily: F, fontSize: 14, fontWeight: active ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', flexShrink: 0 }}>
                <span style={{ fontSize: 15 }}>{cat.icon}</span>{cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '60px 80px 120px' }}>

        {/* ── Featured Header ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.5)', fontWeight: 600, marginBottom: 8 }}>
            {activecat === 'All' ? 'Handpicked for you' : activecat + ' picks'}
          </div>
          <h2 style={{ fontFamily: F, fontSize: 36, fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>
            {activecat === 'All' ? 'Featured Events' : `Top ${activecat} Events`}
          </h2>
        </div>

        {/* ── Featured Carousel ── */}
        <div style={{ marginBottom: 64, paddingLeft: 28, paddingRight: 28 }}>
          <FeaturedCarousel items={FEATURED_POOL} />
        </div>

        {/* ── All Events header + Filter/Sort bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, gap: 24 }}>
          {/* Left: section heading */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.5)', fontWeight: 600, marginBottom: 8 }}>
              {sorted.length} results
            </div>
            <h2 style={{ fontFamily: F, fontSize: 36, fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>
              All Events
            </h2>
          </div>

          {/* Right: filter chips + sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {/* Filter chips */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {FILTERS.map(f => {
                const active = f === activeFilter;
                return (
                  <button key={f} className={active ? '' : 'dc-filt'} onClick={() => setActiveFilter(f)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: active ? 'rgba(127,224,213,0.15)' : 'rgba(255,255,255,0.06)', border: `1px solid ${active ? 'rgba(127,224,213,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '9px 18px', color: active ? '#7FE0D5' : 'rgba(255,255,255,0.6)', fontFamily: F, fontSize: 13, fontWeight: active ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
                    {f === 'Free' && <span style={{ fontSize: 12 }}>✦</span>}
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

            {/* Sort dropdown */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: sortOpen ? 'rgba(127,224,213,0.1)' : 'rgba(255,255,255,0.06)', border: `1px solid ${sortOpen ? 'rgba(127,224,213,0.4)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 12, padding: '9px 16px', color: sortOpen ? '#7FE0D5' : 'rgba(255,255,255,0.7)', fontFamily: F, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
                Sort: {sortBy}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {sortOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#181a1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, overflow: 'hidden', zIndex: 200, minWidth: 220, boxShadow: '0 16px 40px rgba(0,0,0,0.6)' }}>
                  {SORTS.map(s => (
                    <button key={s} className="dc-sort-item" onClick={() => { setSortBy(s); setSortOpen(false); }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', background: s === sortBy ? 'rgba(127,224,213,0.1)' : 'transparent', border: 'none', padding: '13px 20px', color: s === sortBy ? '#7FE0D5' : 'rgba(255,255,255,0.7)', fontFamily: F, fontSize: 14, fontWeight: s === sortBy ? 700 : 500, cursor: 'pointer', transition: 'all 0.12s' }}>
                      {s === sortBy && <span style={{ marginRight: 8 }}>✓</span>}{s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 3-col event grid ── */}
        {gridEvents.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 64 }}>
            {gridEvents.map(ev => <EventCard key={ev.id} ev={ev} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>No events found</div>
            <div style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.35)' }}>Try a different filter or search term</div>
          </div>
        )}

        {gridEvents.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button style={{ background: 'transparent', border: '1px solid rgba(127,224,213,0.3)', borderRadius: 14, padding: '16px 56px', color: '#7FE0D5', fontFamily: F, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Load more events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
