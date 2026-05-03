import './_group.css';
import { useState } from 'react';

const F = 'var(--font)';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function AtmospherePanel() {
  return (
    <div style={{ position: 'relative', width: '55%', height: '100vh', background: '#000', overflow: 'hidden', flexShrink: 0 }}>
      <style>{`
        @keyframes lf-float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(18px,-24px) scale(1.06); } }
        @keyframes lf-float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-14px,20px) scale(0.96); } }
        @keyframes lf-float3 { 0%,100% { transform: translate(0,0); } 33% { transform: translate(10px,-16px); } 66% { transform: translate(-8px,10px); } }
        @keyframes lf-pulse  { 0%,100% { opacity: 0.18; } 50% { opacity: 0.32; } }
        @keyframes lf-spark  { 0%,100% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes lf-scan   { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes lf-crowd  { 0%,100% { opacity: 0.22; } 50% { opacity: 0.30; } }
      `}</style>

      {/* Deep background gradients */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 70% at 20% 60%, rgba(14,42,44,0.85) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 75% 20%, rgba(52,32,8,0.7) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 85% 80%, rgba(30,10,50,0.6) 0%, transparent 55%)' }} />

      {/* Orb 1 — teal */}
      <div style={{ position: 'absolute', top: '15%', left: '12%', width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,224,213,0.22) 0%, rgba(127,224,213,0.06) 45%, transparent 70%)', animation: 'lf-float1 9s ease-in-out infinite', filter: 'blur(2px)' }} />

      {/* Orb 2 — gold */}
      <div style={{ position: 'absolute', top: '-5%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(235,232,138,0.18) 0%, rgba(235,232,138,0.05) 50%, transparent 72%)', animation: 'lf-float2 12s ease-in-out infinite', filter: 'blur(4px)' }} />

      {/* Orb 3 — violet accent */}
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,100,255,0.14) 0%, transparent 65%)', animation: 'lf-float3 14s ease-in-out infinite' }} />

      {/* Scan line */}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(127,224,213,0.08), transparent)', animation: 'lf-scan 8s linear infinite', pointerEvents: 'none' }} />

      {/* Grid overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.045 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="lg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0L0 0 0 60" fill="none" stroke="#7FE0D5" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lg-grid)"/>
      </svg>

      {/* Floating sparks */}
      {[
        { x: '22%', y: '28%', delay: '0s',  size: 3, color: '#7FE0D5' },
        { x: '68%', y: '18%', delay: '1.4s', size: 2, color: '#EBE88A' },
        { x: '45%', y: '55%', delay: '0.7s', size: 2.5, color: '#7FE0D5' },
        { x: '80%', y: '45%', delay: '2.1s', size: 2, color: '#EBE88A' },
        { x: '15%', y: '70%', delay: '1.8s', size: 3, color: '#7FE0D5' },
        { x: '58%', y: '80%', delay: '3.2s', size: 2, color: '#fff' },
        { x: '35%', y: '38%', delay: '2.6s', size: 2, color: '#EBE88A' },
        { x: '72%', y: '65%', delay: '0.4s', size: 2.5, color: '#7FE0D5' },
        { x: '88%', y: '30%', delay: '1.1s', size: 2, color: '#fff' },
        { x: '10%', y: '48%', delay: '3.7s', size: 3, color: '#EBE88A' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: s.size, height: s.size, borderRadius: '50%', background: s.color, boxShadow: `0 0 ${s.size * 3}px ${s.color}`, animation: `lf-spark ${2.4 + i * 0.3}s ease-in-out ${s.delay} infinite` }} />
      ))}

      {/* Crowd silhouette at the bottom */}
      <svg viewBox="0 0 900 220" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', animation: 'lf-crowd 6s ease-in-out infinite' }} preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        {/* Floor glow */}
        <ellipse cx="450" cy="210" rx="420" ry="30" fill="rgba(127,224,213,0.06)"/>
        {/* Crowd heads & raised arms — stylised silhouettes */}
        <path d="
          M0 220 L0 155 Q10 140 25 155 Q30 130 50 140 Q55 115 75 130 Q80 105 100 118
          Q105 95 125 110 Q135 90 155 100 Q160 75 180 90 Q185 65 205 82
          Q210 55 230 70 Q240 60 255 68 Q265 45 280 58
          Q290 38 305 52 Q315 35 330 48 Q338 25 352 40
          Q360 18 375 32 Q385 22 395 30 Q400 10 415 25
          Q425 15 440 22 Q445 5 458 18 Q468 10 478 16
          Q482 0 496 12 Q508 5 518 12 Q525 -5 540 10
          Q550 2 562 10 Q568 -3 582 8 Q592 0 600 8
          Q610 -5 622 6 Q634 0 645 8 Q652 -8 665 5
          Q678 -2 688 6 Q695 -5 707 4 Q718 -2 728 5
          Q738 -8 750 4 Q762 -4 772 5 Q780 -8 793 3
          Q804 -4 812 5 Q818 -6 830 4 Q840 0 850 6
          Q862 -4 875 5 Q885 0 900 8 L900 220 Z
        " fill="rgba(255,255,255,0.07)"/>
        <path d="
          M0 220 L0 170 Q15 158 35 168 Q45 148 65 158 Q75 138 95 150
          Q110 132 130 145 Q145 125 165 138 Q178 118 198 132
          Q215 112 235 126 Q252 108 272 120 Q290 100 310 114
          Q328 96 348 110 Q366 92 385 104 Q405 88 422 100
          Q442 82 460 96 Q480 78 498 92 Q518 74 537 88
          Q558 70 576 84 Q596 68 615 82 Q635 66 652 80
          Q672 64 690 78 Q710 62 728 76 Q748 60 765 74
          Q785 58 803 72 Q823 56 840 70 Q858 55 875 68
          Q885 58 900 65 L900 220 Z
        " fill="rgba(255,255,255,0.04)"/>
      </svg>

      {/* Spotlight beams from top */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, mixBlendMode: 'screen' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7FE0D5" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#7FE0D5" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="beam2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EBE88A" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#EBE88A" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="beam3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points="200,0 140,0 280,700" fill="url(#beam1)"/>
        <polygon points="420,0 370,0 520,750" fill="url(#beam2)"/>
        <polygon points="650,0 610,0 700,680" fill="url(#beam3)"/>
        <polygon points="830,0 790,0 870,600" fill="url(#beam1)" opacity="0.6"/>
      </svg>

      {/* Content overlay: tagline */}
      <div style={{ position: 'absolute', bottom: '18%', left: '10%', right: '10%' }}>
        <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.5)', fontWeight: 600, marginBottom: 14 }}>Your ticket to everything</div>
        <div style={{ fontFamily: F, fontSize: 48, fontWeight: 800, letterSpacing: '-2px', color: '#fff', lineHeight: 1, marginBottom: 8 }}>Find events<br/>worth going to.</div>
        <div style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.3)', fontWeight: 400, marginTop: 12 }}>Free tickets, real connections, zero friction.</div>
      </div>

      {/* Bottom edge fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', pointerEvents: 'none' }} />
    </div>
  );
}

export function Login() {
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
        @keyframes lf-fadein { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .lf-form-in { animation: lf-fadein 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .lf-btn-primary:hover { background: #a3ede6 !important; }
        .lf-social-btn:hover { background: rgba(255,255,255,0.08) !important; }
        input::placeholder { color: rgba(255,255,255,0.22); }
      `}</style>

      <AtmospherePanel />

      {/* Right panel — form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 80px', position: 'relative', overflowY: 'auto' }}>
        {/* Logo top-left of form panel */}
        <div style={{ position: 'absolute', top: 36, left: 60, cursor: 'pointer' }} onClick={() => window.location.href = `${BASE}/preview/happenin/Landing`}>
          <span style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>happenin<span style={{ color: '#7FE0D5' }}>*</span></span>
        </div>

        <div className="lf-form-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Heading */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.6)', fontWeight: 600, marginBottom: 12 }}>Welcome back</div>
            <h1 style={{ fontFamily: F, fontSize: 42, fontWeight: 800, letterSpacing: '-2px', color: '#fff', margin: 0, lineHeight: 1 }}>Sign in</h1>
            <p style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.35)', margin: '10px 0 0', fontWeight: 400 }}>
              New here?{' '}
              <a href={`${BASE}/preview/happenin/SignUp`} style={{ color: '#7FE0D5', textDecoration: 'none', fontWeight: 600 }}>Create an account</a>
            </p>
          </div>

          {/* Social buttons */}
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
              <button key={s.label} className="lf-social-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '13px 0', color: '#fff', fontFamily: F, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}>
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

          {/* CTA */}
          <button
            className="lf-btn-primary"
            onClick={() => window.location.href = `${BASE}/preview/happenin/TicketConfirmation`}
            style={{ width: '100%', background: '#7FE0D5', border: 'none', borderRadius: 14, padding: '16px 0', color: '#0e2a2c', fontFamily: F, fontSize: 15, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.2px', transition: 'background 0.15s', marginBottom: 24 }}
          >
            Sign in
          </button>

          {/* Terms */}
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
