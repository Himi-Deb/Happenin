import './_group.css';
import { useState } from 'react';

const F = 'var(--font)';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function AtmospherePanel() {
  return (
    <div style={{ position: 'relative', width: '55%', height: '100vh', background: '#000', overflow: 'hidden', flexShrink: 0 }}>
      <style>{`
        @keyframes su-float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,22px) scale(1.05); } }
        @keyframes su-float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(16px,-18px) scale(0.97); } }
        @keyframes su-float3 { 0%,100% { transform: translate(0,0); } 33% { transform: translate(-12px,14px); } 66% { transform: translate(9px,-9px); } }
        @keyframes su-spark  { 0%,100% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes su-scan   { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes su-crowd  { 0%,100% { opacity: 0.22; } 50% { opacity: 0.30; } }
        @keyframes su-ring   { 0%,100% { opacity: 0.12; transform: scale(1); } 50% { opacity: 0.22; transform: scale(1.08); } }
      `}</style>

      {/* Background gradient layers */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 65% at 80% 55%, rgba(10,36,40,0.9) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 50% at 15% 25%, rgba(55,28,5,0.65) 0%, transparent 58%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 10% 80%, rgba(25,8,55,0.55) 0%, transparent 55%)' }} />

      {/* Orb 1 — gold top-left */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(235,232,138,0.2) 0%, rgba(235,232,138,0.05) 48%, transparent 70%)', animation: 'su-float1 11s ease-in-out infinite', filter: 'blur(3px)' }} />

      {/* Orb 2 — teal right */}
      <div style={{ position: 'absolute', top: '30%', right: '-12%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,224,213,0.18) 0%, rgba(127,224,213,0.05) 50%, transparent 72%)', animation: 'su-float2 13s ease-in-out infinite', filter: 'blur(4px)' }} />

      {/* Orb 3 — pink-violet bottom */}
      <div style={{ position: 'absolute', bottom: '-5%', left: '20%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,80,180,0.12) 0%, transparent 65%)', animation: 'su-float3 15s ease-in-out infinite' }} />

      {/* Concentric rings */}
      {[280, 360, 440].map((r, i) => (
        <div key={i} style={{ position: 'absolute', top: '38%', left: '50%', width: r, height: r, borderRadius: '50%', border: '1px solid rgba(127,224,213,0.1)', transform: 'translate(-50%,-50%)', animation: `su-ring ${4 + i * 1.5}s ease-in-out ${i * 0.6}s infinite` }} />
      ))}

      {/* Scan line */}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(235,232,138,0.07), transparent)', animation: 'su-scan 10s linear infinite', pointerEvents: 'none' }} />

      {/* Grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="su-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0L0 0 0 60" fill="none" stroke="#EBE88A" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#su-grid)"/>
      </svg>

      {/* Sparks */}
      {[
        { x: '18%', y: '22%', delay: '0.2s',  size: 3,   color: '#EBE88A' },
        { x: '62%', y: '15%', delay: '1.6s',  size: 2,   color: '#7FE0D5' },
        { x: '42%', y: '48%', delay: '0.9s',  size: 2.5, color: '#EBE88A' },
        { x: '78%', y: '38%', delay: '2.3s',  size: 2,   color: '#fff'    },
        { x: '12%', y: '65%', delay: '1.1s',  size: 3,   color: '#7FE0D5' },
        { x: '54%', y: '75%', delay: '3.0s',  size: 2,   color: '#EBE88A' },
        { x: '30%', y: '32%', delay: '2.7s',  size: 2,   color: '#7FE0D5' },
        { x: '70%', y: '60%', delay: '0.5s',  size: 2.5, color: '#EBE88A' },
        { x: '86%', y: '25%', delay: '1.3s',  size: 2,   color: '#fff'    },
        { x: '8%',  y: '44%', delay: '3.8s',  size: 3,   color: '#7FE0D5' },
        { x: '50%', y: '10%', delay: '0.7s',  size: 2,   color: '#EBE88A' },
        { x: '92%', y: '70%', delay: '2.0s',  size: 2,   color: '#fff'    },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: s.size, height: s.size, borderRadius: '50%', background: s.color, boxShadow: `0 0 ${s.size * 3}px ${s.color}`, animation: `su-spark ${2.2 + i * 0.28}s ease-in-out ${s.delay} infinite` }} />
      ))}

      {/* Crowd silhouette */}
      <svg viewBox="0 0 900 220" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', animation: 'su-crowd 7s ease-in-out infinite' }} preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="450" cy="210" rx="420" ry="28" fill="rgba(235,232,138,0.05)"/>
        <path d="
          M0 220 L0 150 Q12 135 28 150 Q34 122 56 138 Q62 108 82 124
          Q90 95 112 112 Q120 88 142 104 Q152 78 174 96
          Q182 62 204 80 Q214 54 234 70 Q246 48 262 62
          Q272 36 288 52 Q300 28 315 44 Q325 20 342 38
          Q352 15 368 30 Q380 8 395 24 Q405 12 418 22
          Q426 2 440 16 Q452 6 464 14 Q470 -2 485 12
          Q498 4 510 12 Q516 -4 532 8 Q545 0 557 9
          Q565 -5 578 6 Q590 -2 600 6 Q612 -6 626 5
          Q640 -2 650 6 Q658 -8 672 4 Q685 -4 695 5
          Q704 -6 716 3 Q728 -3 738 4 Q748 -9 760 2
          Q773 -5 783 4 Q793 -6 806 3 Q818 -5 828 4
          Q840 -2 852 5 Q862 -5 878 4 Q888 0 900 7 L900 220 Z
        " fill="rgba(255,255,255,0.065)"/>
        <path d="
          M0 220 L0 172 Q18 160 38 170 Q50 148 70 160 Q82 138 102 152
          Q118 130 138 144 Q155 122 175 136 Q190 114 210 128
          Q228 106 248 122 Q266 104 286 118 Q304 98 325 114
          Q344 94 364 110 Q383 90 402 104 Q422 86 440 100
          Q460 80 478 96 Q498 76 518 90 Q538 72 558 86
          Q578 68 596 82 Q616 65 634 80 Q654 63 670 78
          Q690 61 708 76 Q728 59 746 74 Q766 57 784 72
          Q804 55 822 70 Q842 54 858 68 Q878 53 900 64 L900 220 Z
        " fill="rgba(255,255,255,0.035)"/>
      </svg>

      {/* Spotlight beams */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1, mixBlendMode: 'screen' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sbeam1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EBE88A" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#EBE88A" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="sbeam2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7FE0D5" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#7FE0D5" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="sbeam3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points="160,0 110,0 260,720" fill="url(#sbeam1)"/>
        <polygon points="380,0 330,0 500,760" fill="url(#sbeam2)"/>
        <polygon points="620,0 580,0 670,700" fill="url(#sbeam3)"/>
        <polygon points="820,0 785,0 855,640" fill="url(#sbeam1)" opacity="0.5"/>
      </svg>

      {/* Tagline */}
      <div style={{ position: 'absolute', bottom: '18%', left: '10%', right: '10%' }}>
        <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(235,232,138,0.55)', fontWeight: 600, marginBottom: 14 }}>Join 80,000+ event-goers</div>
        <div style={{ fontFamily: F, fontSize: 48, fontWeight: 800, letterSpacing: '-2px', color: '#fff', lineHeight: 1, marginBottom: 8 }}>Be there<br/>for it all.</div>
        <div style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.3)', fontWeight: 400, marginTop: 12 }}>Music, art, food, culture — all in one place.</div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', pointerEvents: 'none' }} />
    </div>
  );
}

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputStyle = (name: string) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focusedField === name ? 'rgba(127,224,213,0.5)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 14,
    padding: '15px 18px',
    color: '#fff',
    fontFamily: F,
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.18s',
  });

  return (
    <div className="happenin-root" style={{ display: 'flex', height: '100vh', background: '#000', overflow: 'hidden' }}>
      <style>{`
        @keyframes su-fadein { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .su-form-in { animation: su-fadein 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .su-btn-primary:hover { background: #a3ede6 !important; }
        .su-social-btn:hover { background: rgba(255,255,255,0.08) !important; }
        input::placeholder { color: rgba(255,255,255,0.22); }
      `}</style>

      <AtmospherePanel />

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 80px', position: 'relative', overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ position: 'absolute', top: 36, left: 60, cursor: 'pointer' }} onClick={() => window.location.href = `${BASE}/preview/happenin/Landing`}>
          <span style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>happenin<span style={{ color: '#7FE0D5' }}>*</span></span>
        </div>

        <div className="su-form-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column' }}>
          {/* Heading */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(235,232,138,0.6)', fontWeight: 600, marginBottom: 12 }}>Get started free</div>
            <h1 style={{ fontFamily: F, fontSize: 42, fontWeight: 800, letterSpacing: '-2px', color: '#fff', margin: 0, lineHeight: 1 }}>Create account</h1>
            <p style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.35)', margin: '10px 0 0', fontWeight: 400 }}>
              Already have one?{' '}
              <a href={`${BASE}/preview/happenin/Login`} style={{ color: '#7FE0D5', textDecoration: 'none', fontWeight: 600 }}>Sign in</a>
            </p>
          </div>

          {/* Social */}
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
              <button key={s.label} className="su-social-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '13px 0', color: '#fff', fontFamily: F, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}>
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 26 }}>
            <div>
              <label style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>FULL NAME</label>
              <input
                type="text"
                placeholder="Alex Morgan"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('name')}
              />
            </div>
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
              <label style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
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
              {/* Password strength hint */}
              {password.length > 0 && (
                <div style={{ display: 'flex', gap: 5, marginTop: 8, alignItems: 'center' }}>
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < Math.min(Math.ceil(password.length / 3), 4) ? (password.length < 6 ? '#e05555' : password.length < 10 ? '#EBE88A' : '#7FE0D5') : 'rgba(255,255,255,0.1)', transition: 'background 0.2s' }} />
                  ))}
                  <span style={{ fontFamily: F, fontSize: 11, color: password.length < 6 ? '#e05555' : password.length < 10 ? '#EBE88A' : '#7FE0D5', marginLeft: 4, minWidth: 32 }}>
                    {password.length < 6 ? 'Weak' : password.length < 10 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <button
            className="su-btn-primary"
            onClick={() => window.location.href = `${BASE}/preview/happenin/Login`}
            style={{ width: '100%', background: '#7FE0D5', border: 'none', borderRadius: 14, padding: '16px 0', color: '#0e2a2c', fontFamily: F, fontSize: 15, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.2px', transition: 'background 0.15s', marginBottom: 22 }}
          >
            Create account
          </button>

          {/* Terms */}
          <p style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.7, margin: 0 }}>
            By creating an account you agree to our{' '}
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Terms</a>
            {' '}and{' '}
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
