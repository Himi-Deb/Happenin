import './_group.css';

const CATEGORIES = ['All', 'Music', 'Art', 'Sports', 'Business', 'Food & Drink', 'Theatre', 'Gaming', 'Education', 'Tech'];

const EVENTS = [
  { id: 1, title: 'Neon Pulse Music Festival', date: 'Sat, 14 Jun', time: '6:00 PM', location: 'London', category: 'Music', price: 'Free', image: 'linear-gradient(135deg,#1a1a2e,#0f3460)', tag: 'Featured', attendees: 842 },
  { id: 2, title: 'Digital Art & Design Summit', date: 'Fri, 20 Jun', time: '10:00 AM', location: 'Berlin', category: 'Art', price: 'Free', image: 'linear-gradient(135deg,#0d1b2a,#243447)', tag: 'Trending', attendees: 320 },
  { id: 3, title: 'Startup Founders Meetup', date: 'Thu, 26 Jun', time: '7:00 PM', location: 'Amsterdam', category: 'Business', price: 'Free', image: 'linear-gradient(135deg,#0a1628,#132d55)', tag: '', attendees: 178 },
  { id: 4, title: 'Street Food Market Weekend', date: 'Sun, 29 Jun', time: '12:00 PM', location: 'Paris', category: 'Food & Drink', price: 'Free', image: 'linear-gradient(135deg,#1a0a0a,#3d1a0a)', tag: '', attendees: 560 },
  { id: 5, title: 'Indie Game Dev Expo', date: 'Sat, 5 Jul', time: '9:00 AM', location: 'Stockholm', category: 'Gaming', price: 'Free', image: 'linear-gradient(135deg,#0a1a0a,#0f3020)', tag: 'New', attendees: 94 },
  { id: 6, title: 'Mindfulness & Wellness Retreat', date: 'Fri, 11 Jul', time: '8:00 AM', location: 'Barcelona', category: 'Sports', price: 'Free', image: 'linear-gradient(135deg,#1a1a0a,#2e2a0f)', tag: '', attendees: 210 },
];

function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 20, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <nav style={{
        pointerEvents: 'all',
        background: 'rgba(22,22,22,0.85)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-pill)',
        padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#0C0C0C' }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Happenin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '0 8px' }}>
          {['Discover', 'Create Event', 'How it Works', 'Pricing'].map(link => (
            <a key={link} href="#" style={{
              color: link === 'Discover' ? 'var(--primary)' : 'var(--text-secondary)',
              fontSize: 13.5, fontWeight: 500, padding: '6px 14px', borderRadius: 'var(--radius-pill)',
              textDecoration: 'none', background: link === 'Discover' ? 'var(--primary-dim)' : 'transparent',
            }}>{link}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8, borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', padding: '7px 14px', borderRadius: 'var(--radius-pill)' }}>Sign In</button>
          <button style={{ background: 'var(--primary)', border: 'none', color: '#0C0C0C', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', padding: '8px 18px', borderRadius: 'var(--radius-pill)' }}>Get Started</button>
        </div>
      </nav>
    </div>
  );
}

export function Discover() {
  return (
    <div className="happenin-root">
      <Navbar />
      <div style={{ paddingTop: 100 }}>
        <div style={{
          background: 'linear-gradient(180deg, rgba(177,216,212,0.04) 0%, transparent 100%)',
          padding: '48px 80px 40px',
          borderBottom: '1px solid var(--border)',
        }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>Discover Events</h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>Find what's happening near you</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              flex: 1, maxWidth: 480, background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)', padding: '12px 20px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>🔍</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Search events, artists, venues...</span>
            </div>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)', padding: '12px 20px',
              display: 'flex', alignItems: 'center', gap: 8,
              color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer',
            }}>
              <span>📍</span> London, UK
            </div>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)', padding: '12px 20px',
              display: 'flex', alignItems: 'center', gap: 8,
              color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer',
            }}>
              <span>📅</span> Any Date
            </div>
            <button style={{
              background: 'var(--primary)', border: 'none', color: '#0C0C0C',
              fontSize: 14, fontWeight: 700, padding: '12px 24px',
              borderRadius: 'var(--radius-pill)', cursor: 'pointer',
            }}>Search</button>
          </div>
        </div>
        <div style={{ padding: '24px 80px 0', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
          {CATEGORIES.map((cat, i) => (
            <button key={cat} style={{
              background: i === 0 ? 'var(--primary)' : 'var(--surface)',
              border: `1px solid ${i === 0 ? 'transparent' : 'var(--border)'}`,
              borderRadius: 'var(--radius-pill)', padding: '8px 18px',
              color: i === 0 ? '#0C0C0C' : 'var(--text-secondary)',
              fontSize: 13.5, fontWeight: i === 0 ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{cat}</button>
          ))}
        </div>
        <div style={{ padding: '32px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Showing <strong style={{ color: 'var(--text-primary)' }}>127 events</strong> near London</p>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)', padding: '8px 16px',
              fontSize: 13.5, color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', gap: 6, alignItems: 'center',
            }}>Sort: Upcoming ▾</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {EVENTS.map(event => (
              <div key={event.id} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              }}>
                <div style={{ height: 180, background: event.image, position: 'relative', padding: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  {event.tag && (
                    <span style={{
                      background: event.tag === 'Featured' ? 'var(--primary)' : event.tag === 'New' ? 'var(--surface-2)' : 'var(--gold)',
                      color: event.tag === 'New' ? 'var(--text-primary)' : '#0C0C0C',
                      fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--radius-pill)',
                    }}>{event.tag}</span>
                  )}
                  {!event.tag && <div />}
                  <button style={{ background: 'rgba(12,12,12,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', fontSize: 14 }}>♡</button>
                </div>
                <div style={{ padding: '16px 20px 20px' }}>
                  <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 6 }}>{event.category}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>{event.title}</h3>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 4 }}>📅 {event.date} · {event.time}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 16 }}>📍 {event.location}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>{event.price}</span>
                    <button style={{ background: 'var(--primary-dim)', border: '1px solid rgba(177,216,212,0.2)', color: 'var(--primary)', fontSize: 12.5, fontWeight: 600, padding: '6px 16px', borderRadius: 'var(--radius-pill)', cursor: 'pointer' }}>Get Tickets</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
            <button style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600,
              padding: '12px 32px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
            }}>Load more events</button>
          </div>
        </div>
      </div>
    </div>
  );
}
