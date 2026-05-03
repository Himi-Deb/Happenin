import { useState } from 'react';
import { useLocation } from 'wouter';

const F = 'Urbanist, sans-serif';
const CLOSE = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="M6 6 18 18" />
  </svg>
);
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const SLIDES = [
  { img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80', emoji: '🎵', label: 'Music', sub: 'Festivals & Concerts' },
  { img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80', emoji: '🎨', label: 'Art & Design', sub: 'Exhibitions & Openings' },
  { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80', emoji: '🍽️', label: 'Food & Drink', sub: 'Festivals & Pop-ups' },
  { img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80', emoji: '💼', label: 'Business', sub: 'Meetups & Conferences' },
  { img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80', emoji: '🎮', label: 'Gaming', sub: 'Tournaments & Showcases' },
  { img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80', emoji: '🎭', label: 'Theatre & Culture', sub: 'Shows & Performances' },
];

function AtmospherePanel() {
  const total = SLIDES.length;
  const dur = 30;
  const perSlide = dur / total;

  return (
    <div style={{ position: 'relative', width: '55%', height: '100vh', background: '#000', overflow: 'hidden', flexShrink: 0 }}>
      <style>{`
        @keyframes ev-slide {
          0%           { opacity: 0; }
          6.67%        { opacity: 1; }
          16.67%       { opacity: 1; }
          23.33%       { opacity: 0; }
          100%         { opacity: 0; }
        }
        @keyframes ev-zoom {
          from { transform: scale(1) translateX(0px); }
          to   { transform: scale(1.1) translateX(-12px); }
        }
        @keyframes ev-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
      `}</style>

      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            opacity: 0,
            animation: `ev-slide ${dur}s ease-in-out ${i * perSlide}s infinite`,
          }}
        >
          <div style={{
            position: 'absolute', inset: '-5%',
            backgroundImage: `url(${slide.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: `ev-zoom ${dur}s ease-in-out ${i * perSlide}s infinite alternate`,
          }} />
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.72) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(14,42,44,0.45) 0%, transparent 70%)', mixBlendMode: 'multiply' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(127,224,213,0.12), transparent)', animation: 'ev-scan 9s linear infinite', pointerEvents: 'none' }} />

      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', top: 36, left: 36,
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 100, padding: '8px 16px 8px 12px',
            opacity: 0,
            animation: `ev-slide ${dur}s ease-in-out ${i * perSlide}s infinite`,
          }}
        >
          <span style={{ fontSize: 16 }}>{slide.emoji}</span>
          <div>
            <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{slide.label}</div>
            <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>{slide.sub}</div>
          </div>
        </div>
      ))}

      <div style={{ position: 'absolute', top: 52, right: 36, display: 'flex', gap: 6 }}>
        {SLIDES.map((_, i) => (
          <div key={i} style={{ position: 'relative', width: 24, height: 2, borderRadius: 2, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 2,
              background: '#7FE0D5',
              opacity: 0,
              animation: `ev-slide ${dur}s ease-in-out ${i * perSlide}s infinite`,
            }} />
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '60px 44px 48px', background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 60%, transparent 100%)' }}>
        <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.6)', fontWeight: 600, marginBottom: 14 }}>Your ticket to everything</div>
        <div style={{ fontFamily: F, fontSize: 46, fontWeight: 800, letterSpacing: '-2px', color: '#fff', lineHeight: 1.02 }}>Find events<br/>worth going to.</div>
        <div style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.38)', fontWeight: 400, marginTop: 14 }}>Free tickets, real connections, zero friction.</div>
      </div>
    </div>
  );
}

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focusedField === name ? 'rgba(127,224,213,0.5)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 14,
    padding: '15px 18px',
    color: '#fff',
    fontFamily: F,
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.18s',
  });

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', overflow: 'hidden' }}>
      <style>{`
        @keyframes lf-fadein { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .lf-form-in { animation: lf-fadein 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .lf-btn-primary:hover { background: #a3ede6 !important; }
        .lf-social-btn:hover { background: rgba(255,255,255,0.08) !important; }
        input::placeholder { color: rgba(255,255,255,0.22); }
      `}</style>

      <AtmospherePanel />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 80px', position: 'relative', overflowY: 'auto' }}>
        <button type="button" aria-label="Close login" style={{ position: 'absolute', top: 28, right: 28, width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          {CLOSE}
        </button>
        <div style={{ position: 'absolute', top: 36, left: 60, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>happenin<span style={{ color: '#7FE0D5' }}>*</span></span>
        </div>

        <div className="lf-form-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.6)', fontWeight: 600, marginBottom: 12 }}>Welcome back</div>
            <h1 style={{ fontFamily: F, fontSize: 42, fontWeight: 800, letterSpacing: '-2px', color: '#fff', margin: 0, lineHeight: 1 }}>Sign in</h1>
            <p style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.35)', margin: '10px 0 0', fontWeight: 400 }}>
              New here?{' '}
              <a onClick={() => navigate('/signup')} href="#" style={{ color: '#7FE0D5', textDecoration: 'none', fontWeight: 600 }}>Create an account</a>
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {[
              {
                label: 'Google',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ),
              },
              {
                label: 'Apple',
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                ),
              },
            ].map(s => (
              <button key={s.label} className="lf-social-btn" onClick={() => navigate((window.history.state?.usr as { from?: string } | undefined)?.from || '/')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '13px 0', color: '#fff', fontFamily: F, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}>
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
            <div>
              <label style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>EMAIL</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('email')}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px' }}>PASSWORD</label>
                <a href="#" style={{ fontFamily: F, fontSize: 12, color: 'rgba(127,224,213,0.7)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle('password'), paddingRight: 48 }}
                />
                <button onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0 }}>
                  {showPw
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
          </div>

          <button
            className="lf-btn-primary"
            onClick={() => navigate((window.history.state?.usr as { from?: string } | undefined)?.from || '/')}
            style={{ width: '100%', background: '#7FE0D5', border: 'none', borderRadius: 14, padding: '16px 0', color: '#0e2a2c', fontFamily: F, fontSize: 15, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.2px', transition: 'background 0.15s', marginBottom: 24 }}
          >
            Sign in
          </button>

          <p style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.7, margin: 0 }}>
            By continuing you agree to our{' '}
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
