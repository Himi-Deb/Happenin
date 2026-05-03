import './_group.css';
import { useState, useEffect, useRef, useCallback } from 'react';

const F = 'var(--font)';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = `${BASE}/happenin-logo-new.png`;


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
  { id: 19, title: 'Open Mic Comedy Night',          date: 'Thu, 17 Jul', time: '9:00 PM',  location: 'The Laugh Factory',   city: 'London',     category: 'Theatre',   price: 'Free',  tag: 'New',      attendees: 220,   dateOrder: 10, image: 'url(https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80)' },
  { id: 20, title: 'Mindful Morning Run',            date: 'Sun, 13 Jul', time: '7:00 AM',  location: 'Hyde Park',           city: 'London',     category: 'Sports',    price: 'Free',  tag: '',         attendees: 310,   dateOrder: 9,  image: 'url(https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=80)' },
  { id: 21, title: 'Blockchain Horizon Conference',  date: 'Fri, 1 Aug',  time: '9:00 AM',  location: 'The Shard',           city: 'London',     category: 'Business',  price: '£75',   tag: '',         attendees: 720,   dateOrder: 14, image: 'url(https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=80)' },
  { id: 22, title: 'Graffiti & Street Art Tour',     date: 'Sat, 5 Jul',  time: '2:00 PM',  location: 'Shoreditch',          city: 'London',     category: 'Art',       price: 'Free',  tag: 'Trending', attendees: 185,   dateOrder: 6,  image: 'url(https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=900&q=80)' },
  { id: 23, title: 'Electronic Music Showcase',      date: 'Sat, 12 Jul', time: '10:00 PM', location: 'Fabric Club',         city: 'London',     category: 'Music',     price: '£15',   tag: 'Hot',      attendees: 1400,  dateOrder: 9,  image: 'url(https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=900&q=80)' },
  { id: 24, title: 'Vegan Food & Wellness Fair',     date: 'Sun, 20 Jul', time: '11:00 AM', location: 'Southbank Centre',    city: 'London',     category: 'Wellness',  price: 'Free',  tag: '',         attendees: 430,   dateOrder: 10, image: 'url(https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=900&q=80)' },
];

const FEATURED_POOL = ALL_EVENTS.slice(0, 6);
const PAGE_SIZE = 20;

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
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Discover</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, padding: 4 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <div onClick={() => window.location.href = `${BASE}/preview/happenin/Login`} style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 32px', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ color: '#0e2a2c', fontFamily: F, fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>LOGIN</span>
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
          <div style={{ fontFamily: F, color: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 36, paddingLeft: 0, paddingRight: 24 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7FE0D5', marginBottom: 18 }}>ABOUT HAPPENIN</div>
              <div style={{ display: 'grid', gap: 12, fontSize: 20, lineHeight: 1, fontWeight: 400 }}>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Discover</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Events</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Saved</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Profile</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7FE0D5', marginBottom: 18 }}>LEGAL</div>
              <div style={{ display: 'grid', gap: 12, fontSize: 20, lineHeight: 1, fontWeight: 400 }}>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7FE0D5', marginBottom: 18 }}>SOCIAL</div>
              <div style={{ display: 'grid', gap: 12, fontSize: 20, lineHeight: 1, fontWeight: 400 }}>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Instagram</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>X</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Email</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>LinkedIn</a>
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
          src={`${BASE}/happenin-wordmark-trimmed.png`}
          alt="happenin*"
          style={{ width: '100%', display: 'block', objectFit: 'contain' }}
        />
      </div>
    </footer>
  );
}

export function Discover() {
  const [activecat, setActivecat] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  const resetPage = () => setPage(1);

  const baseFiltered = ALL_EVENTS.filter(ev => {
    const catMatch = activecat === 'All' || ev.category === activecat;
    const freeMatch = activeFilter !== 'Free' || ev.price === 'Free';
    const weekMatch = activeFilter !== 'This Week' || ev.dateOrder <= 5;
    const wkndMatch = activeFilter !== 'This Weekend' || ev.dateOrder <= 3;
    const monthMatch = activeFilter !== 'This Month' || ev.dateOrder <= 10;
    return catMatch && freeMatch && weekMatch && wkndMatch && monthMatch;
  });

  const sorted = [...baseFiltered].sort((a, b) => {
    if (sortBy === 'Popularity') return b.attendees - a.attendees;
    if (sortBy === 'Price: Low to High') return priceSortVal(a.price) - priceSortVal(b.price);
    if (sortBy === 'Price: High to Low') return priceSortVal(b.price) - priceSortVal(a.price);
    return a.dateOrder - b.dateOrder;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const gridEvents = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="happenin-root" style={{ background: '#080a0b', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        .dc-cat:hover { background: rgba(127,224,213,0.1) !important; color: #7FE0D5 !important; }
        .dc-filt:hover { background: rgba(255,255,255,0.1) !important; }
        .dc-sort-item:hover { background: rgba(127,224,213,0.08) !important; color: #7FE0D5 !important; }
      `}</style>
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ position: 'relative', paddingTop: 130, paddingBottom: 80, paddingLeft: 80, paddingRight: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', minHeight: 560 }}>
        {/* Background glows */}
        <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: 1000, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,42,44,0.7) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-8%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(50,40,8,0.4) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '28%', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,224,213,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Left: text */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 880, paddingRight: 60 }}>
          <h1 style={{ fontFamily: F, fontSize: 82, fontWeight: 800, letterSpacing: '-3.5px', color: '#fff', lineHeight: 0.93, margin: '0 0 26px' }}>
            Discover<br/><span style={{ color: '#7FE0D5' }}>what's<br/>happening.</span>
          </h1>
          <p style={{ fontFamily: F, fontSize: 18, color: 'rgba(255,255,255,0.38)', fontWeight: 400, margin: 0, lineHeight: 1.65, maxWidth: 460 }}>
            Free tickets, real events, real people. Browse thousands of experiences happening this week and beyond.
          </p>
        </div>

        {/* Right: staggered photo collage — pinned top-right */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: 860, height: 560, zIndex: 1 }}>

          {/* Card 1 — tall left, music */}
          <div style={{ position: 'absolute', left: 0, top: 30, width: 290, height: 370, borderRadius: 22, overflow: 'hidden', backgroundImage: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', transform: 'rotate(-3deg)', boxShadow: '0 24px 64px rgba(0,0,0,0.55)', border: '2px solid rgba(255,255,255,0.07)', zIndex: 2 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.75) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#7FE0D5', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 4 }}>🎵 Music</div>
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Neon Pulse Festival</div>
            </div>
          </div>

          {/* Card 2 — top right, art */}
          <div style={{ position: 'absolute', right: 10, top: 0, width: 250, height: 258, borderRadius: 22, overflow: 'hidden', backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', transform: 'rotate(2.5deg)', boxShadow: '0 18px 52px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.07)', zIndex: 1 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.78) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#EBE88A', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 4 }}>🎨 Art</div>
              <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#fff' }}>Design Summit</div>
            </div>
          </div>

          {/* Card 3 — bottom right, concert */}
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: 275, height: 220, borderRadius: 22, overflow: 'hidden', backgroundImage: 'url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', transform: 'rotate(-1.5deg)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.07)', zIndex: 2 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.78) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#ff6b4a', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 4 }}>🎵 Music</div>
              <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#fff' }}>Coldplay World Tour</div>
            </div>
          </div>

          {/* Floating FREE badge */}
          <div style={{ position: 'absolute', top: 72, right: 248, background: '#7FE0D5', borderRadius: 9999, padding: '9px 18px', zIndex: 10, transform: 'rotate(-7deg)', boxShadow: '0 10px 28px rgba(127,224,213,0.35)' }}>
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 800, color: '#0e2a2c', textTransform: 'uppercase', letterSpacing: '1px' }}>✦ Free</span>
          </div>

          {/* Floating attendees pill */}
          <div style={{ position: 'absolute', top: 8, left: 256, background: 'rgba(10,12,14,0.82)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 16px', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex' }}>
                {['#7FE0D5', '#EBE88A', '#ff6b4a'].map((c, i) => (
                  <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: '2px solid #0a0c0e', marginLeft: i > 0 ? -7 : 0, flexShrink: 0 }} />
                ))}
              </div>
              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>+2.4k going</span>
            </div>
          </div>

          {/* Floating date pill */}
          <div style={{ position: 'absolute', bottom: 50, left: 264, background: 'rgba(10,12,14,0.82)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 16px', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.7)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>This weekend</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Category Filter ── */}
      <section style={{ padding: '36px 72px 28px', background: '#000', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {CATS.map(cat => {
              const active = cat.label === activecat;
              return (
                <button key={cat.label} onClick={() => { setActivecat(cat.label); resetPage(); }} style={{
                  background: active ? 'rgba(177,216,212,0.15)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active ? 'rgba(177,216,212,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 12, padding: '10px 20px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  color: active ? '#B1D8D4' : 'rgba(255,255,255,0.5)',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: F,
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                  transition: 'all 0.15s',
                }}>
                  <span>{cat.icon}</span><span>{cat.label}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 16px', cursor: 'pointer', flexShrink: 0, marginLeft: 16 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(177,216,212,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>London, UK</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </section>

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
                  <button key={f} className={active ? '' : 'dc-filt'} onClick={() => { setActiveFilter(f); resetPage(); }}
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
                    <button key={s} className="dc-sort-item" onClick={() => { setSortBy(s); setSortOpen(false); resetPage(); }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', background: s === sortBy ? 'rgba(127,224,213,0.1)' : 'transparent', border: 'none', padding: '13px 20px', color: s === sortBy ? '#7FE0D5' : 'rgba(255,255,255,0.7)', fontFamily: F, fontSize: 14, fontWeight: s === sortBy ? 700 : 500, cursor: 'pointer', transition: 'all 0.12s' }}>
                      {s === sortBy && <span style={{ marginRight: 8 }}>✓</span>}{s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 4-col event grid ── */}
        {gridEvents.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 64 }}>
            {gridEvents.map(ev => <EventCard key={ev.id} ev={ev} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>No events found</div>
            <div style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.35)' }}>Try a different category or filter</div>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {/* Prev */}
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              style={{ width: 44, height: 44, borderRadius: 12, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: safePage === 1 ? 'default' : 'pointer', opacity: safePage === 1 ? 0.3 : 1, transition: 'all 0.15s' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const isActive = p === safePage;
              const show = p === 1 || p === totalPages || Math.abs(p - safePage) <= 1;
              const showEllipsisBefore = p === safePage - 2 && safePage - 2 > 1;
              const showEllipsisAfter  = p === safePage + 2 && safePage + 2 < totalPages;
              if (!show && !showEllipsisBefore && !showEllipsisAfter) return null;
              if (showEllipsisBefore || showEllipsisAfter) return (
                <span key={`e${p}`} style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.3)', padding: '0 4px' }}>…</span>
              );
              return (
                <button key={p} onClick={() => setPage(p)}
                  style={{ width: 44, height: 44, borderRadius: 12, background: isActive ? '#EBE88A' : 'transparent', border: 'none', color: isActive ? '#0e2a2c' : 'rgba(255,255,255,0.75)', fontFamily: F, fontSize: 17, fontWeight: isActive ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  {p}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              style={{ width: 44, height: 44, borderRadius: 12, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: safePage === totalPages ? 'default' : 'pointer', opacity: safePage === totalPages ? 0.3 : 1, transition: 'all 0.15s' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            {/* Page info */}
            <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>
              Page {safePage} of {totalPages} · {sorted.length} events
            </span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
