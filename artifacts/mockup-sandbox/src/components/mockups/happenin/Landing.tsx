import './_group.css';

const NAV_LINKS = ['Discover', 'Create Event', 'How it Works', 'Pricing'];

const CATEGORIES = [
  { icon: '🎵', label: 'Music' },
  { icon: '🎨', label: 'Art' },
  { icon: '🏃', label: 'Sports' },
  { icon: '💼', label: 'Business' },
  { icon: '🍽️', label: 'Food' },
  { icon: '🎭', label: 'Theatre' },
  { icon: '🎮', label: 'Gaming' },
  { icon: '📚', label: 'Education' },
];

const FEATURED_EVENTS = [
  {
    id: 1,
    title: 'Neon Pulse Music Festival',
    date: 'Sat, 14 Jun 2025',
    time: '6:00 PM',
    location: 'Rooftop Arena, London',
    category: 'Music',
    price: 'Free',
    image: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    tag: 'Featured',
    attendees: 842,
  },
  {
    id: 2,
    title: 'Digital Art & Design Summit',
    date: 'Fri, 20 Jun 2025',
    time: '10:00 AM',
    location: 'East Wing Gallery, Berlin',
    category: 'Art',
    price: 'Free',
    image: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #243447 100%)',
    tag: 'Trending',
    attendees: 320,
  },
  {
    id: 3,
    title: 'Startup Founders Meetup',
    date: 'Thu, 26 Jun 2025',
    time: '7:00 PM',
    location: 'Tech Hub, Amsterdam',
    category: 'Business',
    price: 'Free',
    image: 'linear-gradient(135deg, #0a1628 0%, #0e2240 50%, #132d55 100%)',
    tag: '',
    attendees: 178,
  },
];

const STEPS = [
  { num: '01', title: 'Create Your Event', desc: 'Set up your event in minutes with our guided multi-step creator. Add tickets, agenda and team.' },
  { num: '02', title: 'Manage & Plan', desc: 'Use the built-in planner to assign tasks, coordinate staff and track progress — all in one place.' },
  { num: '03', title: 'Engage Attendees', desc: 'Broadcast updates, chat live with ticket holders and collect feedback — no extra apps needed.' },
];

function Navbar() {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <nav style={{
        pointerEvents: 'all',
        background: 'rgba(22,22,22,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-pill)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: '#0C0C0C',
          }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Happenin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '0 8px' }}>
          {NAV_LINKS.map(link => (
            <a key={link} href="#" style={{
              color: link === 'Discover' ? 'var(--primary)' : 'var(--text-secondary)',
              fontSize: 13.5,
              fontWeight: 500,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              background: link === 'Discover' ? 'var(--primary-dim)' : 'transparent',
              transition: 'all 0.2s',
            }}>{link}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8, borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          <button style={{
            background: 'transparent', border: 'none', color: 'var(--text-secondary)',
            fontSize: 13.5, fontWeight: 500, cursor: 'pointer', padding: '7px 14px', borderRadius: 'var(--radius-pill)',
          }}>Sign In</button>
          <button style={{
            background: 'var(--primary)', border: 'none', color: '#0C0C0C',
            fontSize: 13.5, fontWeight: 700, cursor: 'pointer', padding: '8px 18px',
            borderRadius: 'var(--radius-pill)',
          }}>Get Started</button>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <section style={{
      padding: '160px 80px 100px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(177,216,212,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'var(--primary-dim)', border: '1px solid rgba(177,216,212,0.2)',
        borderRadius: 'var(--radius-pill)', padding: '6px 16px',
        marginBottom: 32, fontSize: 13, fontWeight: 500, color: 'var(--primary)',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
        All-in-one event management platform
      </div>
      <h1 style={{
        fontSize: 72, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px',
        marginBottom: 24, maxWidth: 780, margin: '0 auto 24px',
      }}>
        Plan, Manage &<br />
        <span style={{ color: 'var(--primary)' }}>Make it Happen.</span>
      </h1>
      <p style={{
        fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7,
        maxWidth: 520, margin: '0 auto 48px', fontWeight: 400,
      }}>
        Discover events near you, create unforgettable experiences, and connect with your audience — all in one place.
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 64,
      }}>
        <button style={{
          background: 'var(--primary)', color: '#0C0C0C', border: 'none',
          fontSize: 15, fontWeight: 700, padding: '14px 32px', borderRadius: 'var(--radius-pill)',
          cursor: 'pointer', letterSpacing: '-0.2px',
        }}>Explore Events</button>
        <button style={{
          background: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)',
          fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 'var(--radius-pill)',
          cursor: 'pointer',
        }}>Create an Event →</button>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48,
      }}>
        {[['12K+', 'Events Hosted'], ['340K+', 'Tickets Booked'], ['98%', 'Organizer Satisfaction']].map(([num, label]) => (
          <div key={label}>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)' }}>{num}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryBar() {
  return (
    <section style={{ padding: '0 80px 80px' }}>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button key={cat.label} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-pill)',
            padding: '10px 20px',
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'var(--text-secondary)', fontSize: 13.5, fontWeight: 500,
            cursor: 'pointer',
          }}>
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: typeof FEATURED_EVENTS[0] }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      flex: '1 1 340px',
      maxWidth: 400,
      transition: 'transform 0.2s, border-color 0.2s',
    }}>
      <div style={{
        height: 200,
        background: event.image,
        position: 'relative',
        display: 'flex', alignItems: 'flex-start', padding: 16,
      }}>
        {event.tag && (
          <span style={{
            background: event.tag === 'Featured' ? 'var(--primary)' : 'var(--gold)',
            color: '#0C0C0C', fontSize: 11, fontWeight: 700,
            padding: '4px 10px', borderRadius: 'var(--radius-pill)', letterSpacing: '0.5px',
          }}>{event.tag}</span>
        )}
        <div style={{
          position: 'absolute', bottom: 16, left: 16,
          background: 'rgba(12,12,12,0.8)', backdropFilter: 'blur(8px)',
          borderRadius: 8, padding: '4px 10px',
          fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500,
        }}>{event.category}</div>
      </div>
      <div style={{ padding: '20px 24px 24px' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, lineHeight: 1.3, color: 'var(--text-primary)' }}>
          {event.title}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>📅</span>{event.date} · {event.time}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>📍</span>{event.location}
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 16, borderTop: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>From</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: event.price === 'Free' ? 'var(--primary)' : 'var(--text-primary)' }}>
              {event.price}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: `hsl(${i * 40 + 160}, 30%, 40%)`,
                  border: '2px solid var(--surface)',
                  marginLeft: i > 0 ? -8 : 0,
                }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{event.attendees}+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedEvents() {
  return (
    <section style={{ padding: '0 80px 100px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Happening Now</div>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-1px' }}>Featured Events</h2>
        </div>
        <a href="#" style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View all events →</a>
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {FEATURED_EVENTS.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{
      margin: '0 80px 100px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: '64px 80px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Simple Process</div>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-1px' }}>How Happenin Works</h2>
      </div>
      <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
        {STEPS.map((step, i) => (
          <div key={step.num} style={{ flex: 1, maxWidth: 280, position: 'relative' }}>
            {i < STEPS.length - 1 && (
              <div style={{
                position: 'absolute', top: 24, left: 'calc(100% - 0px)', width: 48,
                height: 1, background: 'var(--border)',
              }} />
            )}
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius-md)',
              background: 'var(--primary-dim)', border: '1px solid rgba(177,216,212,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 800, color: 'var(--primary)', marginBottom: 20,
            }}>{step.num}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: '40px 80px',
      borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: '#0C0C0C',
        }}>H</div>
        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-secondary)' }}>Happenin</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>© 2025 Happenin. All rights reserved.</p>
      <div style={{ display: 'flex', gap: 24 }}>
        {['Privacy', 'Terms', 'Contact'].map(l => (
          <a key={l} href="#" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <div className="happenin-root">
      <Navbar />
      <Hero />
      <CategoryBar />
      <FeaturedEvents />
      <HowItWorks />
      <Footer />
    </div>
  );
}
