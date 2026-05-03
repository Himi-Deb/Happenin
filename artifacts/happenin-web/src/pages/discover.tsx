import { useState } from 'react';
import logoPng from '@assets/Happenin-Logo_1777806807849.png';
import { useLocation } from 'wouter';

const F = 'Urbanist, sans-serif';
const BG = '#0e0c09';
const CARD_BG = '#13110d';
const TEAL = '#7FE0D5';
const GOLD = '#EBE88A';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = logoPng;

const CATEGORIES = ['All', 'Music', 'Arts', 'Food', 'Sports', 'Business', 'Theatre', 'Gaming', 'Education', 'Wellness'];
const SORT_OPTIONS = ['Date: Soonest', 'Most Popular', 'Newest', 'A–Z'];
const WHEN_OPTIONS = ['Any time', 'Today', 'This Weekend', 'This Week', 'This Month'];

type Evt = {
  id: number; title: string; date: string; time: string;
  location: string; category: string; price: string;
  image: string; tag: string; attendees: number;
};

function makeEvts(): Evt[] {
  const raw = [
    { title: 'Neon Pulse Music Festival', date: 'Sat, 14 Jun', time: '6:00 PM', location: 'Rooftop Arena, London', category: 'Music', price: 'Free', tag: 'Featured', attendees: 842, image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80' },
    { title: 'Digital Art & Design Summit', date: 'Fri, 20 Jun', time: '10:00 AM', location: 'East Wing Gallery, Berlin', category: 'Arts', price: 'Free', tag: 'Trending', attendees: 320, image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80' },
    { title: 'Startup Founders Meetup', date: 'Thu, 26 Jun', time: '7:00 PM', location: 'Tech Hub, Amsterdam', category: 'Business', price: 'Free', tag: '', attendees: 178, image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Global Street Food Festival', date: 'Sun, 6 Jul', time: '12:00 PM', location: 'Victoria Park, Melbourne', category: 'Food', price: 'Free', tag: 'Hot', attendees: 1240, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
    { title: 'Theatre Night: Hamlet Redux', date: 'Fri, 27 Jun', time: '8:00 PM', location: 'Royal Exchange, Manchester', category: 'Theatre', price: 'Free', tag: '', attendees: 390, image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80' },
    { title: 'Championship Gaming League', date: 'Fri, 11 Jul', time: '3:00 PM', location: 'Esports Arena, Seoul', category: 'Gaming', price: 'Free', tag: 'New', attendees: 2100, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
    { title: 'Wellness & Yoga Retreat', date: 'Sat, 5 Jul', time: '9:00 AM', location: 'Kew Gardens, London', category: 'Wellness', price: 'Free', tag: '', attendees: 210, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
    { title: 'Jazz Under the Stars', date: 'Wed, 9 Jul', time: '7:30 PM', location: 'Harbour Park, Sydney', category: 'Music', price: 'Free', tag: '', attendees: 560, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Python & AI Bootcamp', date: 'Mon, 30 Jun', time: '10:00 AM', location: 'Code Space, Toronto', category: 'Education', price: 'Free', tag: '', attendees: 145, image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80' },
    { title: 'Craft Beer Festival', date: 'Sat, 19 Jul', time: '2:00 PM', location: 'Battersea, London', category: 'Food', price: 'Free', tag: '', attendees: 870, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
    { title: 'AR & VR Expo 2025', date: 'Sat, 26 Jul', time: '10:00 AM', location: 'ExCeL London', category: 'Education', price: 'Free', tag: 'New', attendees: 1800, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
    { title: 'Salsa & Bachata Social', date: 'Fri, 18 Jul', time: '8:00 PM', location: 'Dance Fusion, Bristol', category: 'Theatre', price: 'Free', tag: 'New', attendees: 145, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sustainable Fashion Show', date: 'Sun, 20 Jul', time: '3:00 PM', location: 'Tate Modern, London', category: 'Arts', price: 'Free', tag: 'New', attendees: 420, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Triathlon Championship', date: 'Sat, 12 Jul', time: '7:00 AM', location: 'Hyde Park, London', category: 'Sports', price: 'Free', tag: 'New', attendees: 300, image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Night Market: Asia Edition', date: 'Sat, 19 Jul', time: '5:00 PM', location: 'Spitalfields, London', category: 'Food', price: 'Free', tag: 'New', attendees: 950, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
    { title: 'Web3 Builders Summit', date: 'Thu, 24 Jul', time: '9:00 AM', location: 'Canary Wharf, London', category: 'Business', price: 'Free', tag: 'New', attendees: 600, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
    { title: 'Classical Piano Recital', date: 'Wed, 16 Jul', time: '7:30 PM', location: 'Wigmore Hall, London', category: 'Music', price: 'Free', tag: 'New', attendees: 250, image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80' },
    { title: 'Mindfulness Meditation Day', date: 'Sun, 13 Jul', time: '10:00 AM', location: 'Battersea Park, London', category: 'Wellness', price: 'Free', tag: 'New', attendees: 110, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
    { title: 'Indie Art Pop-up', date: 'Sat, 28 Jun', time: '11:00 AM', location: 'Shoreditch, London', category: 'Arts', price: 'Free', tag: '', attendees: 320, image: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Premier League Watch Party', date: 'Sat, 5 Jul', time: '3:00 PM', location: 'Old Compton Bar, London', category: 'Sports', price: 'Free', tag: 'Hot', attendees: 480, image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80' },
  ];
  return raw.map((e, i) => ({ id: i + 1, ...e }));
}

const ALL_EVENTS = makeEvts();
const FEATURED_POOL = ALL_EVENTS.slice(0, 6);
const PER_PAGE = 12;

function FeaturedCarousel({ events }: { events: Evt[] }) {
  const [, navigate] = useLocation();
  const [cur, setCur] = useState(0);
  const e = events[cur];
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Featured Events</div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, height: 380 }}>
        {/* Main featured card */}
        <div onClick={() => navigate('/event/1')} style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${e.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'all 0.5s ease' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px' }}>
            {e.tag && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(127,224,213,0.15)', border: '1px solid rgba(127,224,213,0.3)', borderRadius: 9999, padding: '4px 12px', marginBottom: 10 }}>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: TEAL }}>{e.tag} · {e.category}</span>
            </div>}
            <h3 style={{ fontFamily: F, fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.5px', lineHeight: 1.05 }}>{e.title}</h3>
            <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{e.date} · {e.time} · {e.location}</div>
          </div>
          <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', gap: 6 }}>
            {events.map((_, i) => (
              <button key={i} onClick={ev => { ev.stopPropagation(); setCur(i); }} style={{ width: i === cur ? 24 : 8, height: 8, borderRadius: 9999, background: i === cur ? TEAL : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
            ))}
          </div>
        </div>
        {/* Side list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {events.slice(0, 3).map((ev, i) => (
            <div key={ev.id} onClick={() => { setCur(i); navigate('/event/1'); }} style={{ flex: 1, display: 'flex', gap: 12, alignItems: 'center', background: cur === i ? 'rgba(127,224,213,0.06)' : CARD_BG, border: `1px solid ${cur === i ? 'rgba(127,224,213,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 16, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.15s' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: '#111' }}>
                <img src={ev.image} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
                <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{ev.date} · {ev.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventGrid({ events }: { events: Evt[] }) {
  const [, navigate] = useLocation();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
      {events.map(ev => (
        <div key={ev.id} onClick={() => navigate('/event/1')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', background: CARD_BG, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden', transition: 'transform 0.15s, border-color 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
        >
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#111' }}>
            <img src={ev.image} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
            {ev.tag && (
              <div style={{ position: 'absolute', top: 12, left: 12, background: TEAL, borderRadius: 7, padding: '3px 10px' }}>
                <span style={{ fontFamily: F, fontSize: 9, fontWeight: 800, color: '#0e2a2c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{ev.tag}</span>
              </div>
            )}
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', borderRadius: 7, padding: '3px 10px' }}>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Free</span>
            </div>
          </div>
          <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontFamily: F, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)' }}>{ev.category}</div>
            <div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.25, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ev.title}</div>
            <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{ev.date} · {ev.time}</div>
            <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{ev.location}</div>
            <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{ev.attendees.toLocaleString()}</span>
              </div>
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Free →</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,0.07)', padding: '64px 80px 40px', marginTop: 80 }}>
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

export default function Discover() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Date: Soonest');
  const [when, setWhen] = useState('Any time');
  const [page, setPage] = useState(1);

  const filtered = ALL_EVENTS.filter(e => {
    const matchCat = category === 'All' || e.category === category;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#fff' }}>
      <style>{`
        .dc-inp::placeholder { color: rgba(255,255,255,0.2); }
        .dc-inp:focus { border-color: rgba(127,224,213,0.3) !important; outline: none; }
        select { -webkit-appearance: none; }
      `}</style>

      {/* Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
            <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
          </div>
          <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Discover</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
          <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 4 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <div onClick={() => navigate('/login')} style={{ background: GOLD, borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 32px', cursor: 'pointer' }}>
            <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c', textTransform: 'uppercase', letterSpacing: '1px' }}>LOGIN</span>
          </div>
        </div>
      </div>

      {/* Page header */}
      <div style={{ padding: '93px 80px 0' }}>
        <div style={{ paddingTop: 48, paddingBottom: 16, maxWidth: 1360, margin: '0 auto' }}>
          <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>EXPLORE</div>
          <h1 style={{ fontFamily: F, fontSize: 52, fontWeight: 800, letterSpacing: '-2px', color: '#fff', margin: '0 0 8px', lineHeight: 0.95 }}>
            Free events<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>near you</span>
          </h1>
          <div style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>London, UK · {ALL_EVENTS.length} events found</div>

          {/* Search + filters */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: CARD_BG, border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '0 16px', flex: 1, minWidth: 280 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input className="dc-inp" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search events, venues, cities…" style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontFamily: F, fontSize: 14, padding: '14px 0' }} />
            </div>
            {[
              { val: when, set: (v: string) => setWhen(v), options: WHEN_OPTIONS },
              { val: sort, set: (v: string) => setSort(v), options: SORT_OPTIONS },
            ].map((sel, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <select value={sel.val} onChange={e => sel.set(e.target.value)} style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '14px 36px 14px 16px', color: 'rgba(255,255,255,0.65)', fontFamily: F, fontSize: 14, cursor: 'pointer', outline: 'none' }}>
                  {sel.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: CARD_BG, border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '0 16px', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>London, UK</span>
            </div>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => { setCategory(c); setPage(1); }} style={{ padding: '8px 18px', borderRadius: 9999, background: category === c ? 'rgba(127,224,213,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${category === c ? 'rgba(127,224,213,0.3)' : 'rgba(255,255,255,0.07)'}`, color: category === c ? TEAL : 'rgba(255,255,255,0.45)', fontFamily: F, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '48px 80px 0', maxWidth: 1520, margin: '0 auto' }}>
        {/* Featured carousel */}
        {category === 'All' && !search && <FeaturedCarousel events={FEATURED_POOL} />}

        {/* Results header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ fontFamily: F, fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: '#fff' }}>
            {category === 'All' ? 'All Events' : category}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginLeft: 12 }}>{filtered.length} results</span>
          </div>
        </div>

        <EventGrid events={paged} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ width: 40, height: 40, borderRadius: 12, background: CARD_BG, border: '1px solid rgba(255,255,255,0.08)', color: page === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.65)', cursor: page === 1 ? 'default' : 'pointer', fontFamily: F, fontSize: 16 }}>←</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} style={{ width: 40, height: 40, borderRadius: 12, background: page === n ? TEAL : CARD_BG, border: `1px solid ${page === n ? 'transparent' : 'rgba(255,255,255,0.08)'}`, color: page === n ? '#0e2a2c' : 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: F, fontSize: 14, fontWeight: page === n ? 800 : 500 }}>{n}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ width: 40, height: 40, borderRadius: 12, background: CARD_BG, border: '1px solid rgba(255,255,255,0.08)', color: page === totalPages ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.65)', cursor: page === totalPages ? 'default' : 'pointer', fontFamily: F, fontSize: 16 }}>→</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
