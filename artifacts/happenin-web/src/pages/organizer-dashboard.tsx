import { useState } from 'react';
import logoPng from '@assets/Happenin-Logo_1777806807849.png';
import { useLocation } from 'wouter';

const F = 'Urbanist, sans-serif';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = logoPng;

function Navbar() {
  const [, navigate] = useLocation();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28, cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <img src={LOGO_URL} alt="happenin" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>My Events</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 4 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        <div style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', cursor: 'pointer' }}>
          <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#0e2a2c', whiteSpace: 'nowrap' }}>Maya Chen</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color, icon }: { label: string; value: string; sub: string; color: string; icon: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${color}20`, borderRadius: 20, padding: '28px 32px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color} 0%, ${color}00 70%)` }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)' }}>{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: 40, fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1, marginBottom: 8 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{sub}</div>
    </div>
  );
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 0.4s' }} />
    </div>
  );
}

const ACTIVITY = [
  { ini: 'JL', name: 'Jamie L.', action: 'claimed a ticket', time: '2m ago', color: '#0e2a2c' },
  { ini: 'SS', name: 'Sara S.', action: 'claimed a ticket', time: '4m ago', color: '#1e1040' },
  { ini: 'TR', name: 'Tom R.', action: 'checked in at gate', time: '6m ago', color: '#0a2a18' },
  { ini: 'PR', name: 'Priya R.', action: 'posted in General Chat', time: '8m ago', color: '#2e1508' },
  { ini: 'KW', name: 'Kai W.', action: 'claimed a ticket', time: '11m ago', color: '#1a1060' },
  { ini: 'MO', name: 'Maya O.', action: 'checked in at gate', time: '14m ago', color: '#0d2830' },
  { ini: 'BL', name: 'Ben L.', action: 'claimed a ticket', time: '18m ago', color: '#1e2408' },
  { ini: 'AC', name: 'Ava C.', action: 'claimed a ticket', time: '22m ago', color: '#2a0e2c' },
];

const CHECKLIST = [
  { done: true,  text: 'Event details published' },
  { done: true,  text: 'Tickets activated (free)' },
  { done: true,  text: 'Venue address confirmed' },
  { done: true,  text: 'Announcements channel ready' },
  { done: false, text: 'Post welcome announcement' },
  { done: false, text: 'Upload stage map & set times' },
  { done: false, text: 'Brief check-in team' },
];

export default function OrganizerDashboard() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<'overview' | 'attendees' | 'checklist'>('overview');

  const capacity = 1200;
  const claimed  = 842;
  const checkedIn = 312;
  const msgs = 127;

  return (
    <div style={{ height: '100vh', background: '#080a0b', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: F }}>
      <style>{`
        .dash-tab:hover { color: #fff !important; }
        .action-btn:hover { background: rgba(127,224,213,0.1) !important; border-color: rgba(127,224,213,0.35) !important; }
        .action-primary:hover { opacity: 0.9 !important; }
        .activity-row:hover { background: rgba(255,255,255,0.02) !important; }
        .scroll-y::-webkit-scrollbar { width: 4px; }
        .scroll-y::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 4px; }
      `}</style>

      <Navbar />

      <div style={{ marginTop: 125, flexShrink: 0 }}>
        <div style={{ padding: '36px 56px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, cursor: 'pointer', alignSelf: 'flex-start', marginTop: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>My Events</span>
          </div>
        </div>

        <div style={{ padding: '0 56px 32px', display: 'flex', alignItems: 'center', gap: 28, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ width: 96, height: 96, borderRadius: 20, background: 'linear-gradient(135deg, #0e3a3e, #0d2830)', border: '1px solid rgba(127,224,213,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(127,224,213,0.04) 0, rgba(127,224,213,0.04) 1px, transparent 1px, transparent 12px)' }} />
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(127,224,213,0.5)" strokeWidth="1.5" strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-1.2px', lineHeight: 1 }}>Neon Pulse Music Festival</h1>
              <div style={{ background: 'rgba(127,224,213,0.1)', border: '1px solid rgba(127,224,213,0.25)', borderRadius: 8, padding: '4px 12px', flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#7FE0D5' }}>Live</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' as const }}>
              {[
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, text: 'Sat 14 Jun 2025 · 5:30 PM' },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: '32 Upper Ground, South Bank' },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, text: `1,200 capacity` },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ opacity: 0.6 }}>{m.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{m.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <button className="action-btn" onClick={() => navigate('/organizer/edit')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontFamily: F, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Event
            </button>
            <button className="action-primary" onClick={() => navigate('/organizer/hub')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 14, background: '#7FE0D5', border: 'none', color: '#0e2a2c', fontFamily: F, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.18s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0e2a2c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Open Event Hub
            </button>
          </div>
        </div>

        <div style={{ padding: '0 56px', display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {(['overview', 'attendees', 'checklist'] as const).map(t => (
            <button key={t} className="dash-tab" onClick={() => setTab(t)} style={{ background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? '#7FE0D5' : 'transparent'}`, padding: '18px 28px 16px', fontFamily: F, fontSize: 14, fontWeight: tab === t ? 700 : 500, color: tab === t ? '#7FE0D5' : 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'color 0.15s', textTransform: 'capitalize' as const, letterSpacing: '0.2px' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'overview' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '36px 56px 48px' }} className="scroll-y">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 36 }}>
            <StatCard label="Tickets Claimed" value={claimed.toLocaleString()} sub={`${Math.round(claimed / capacity * 100)}% of ${capacity.toLocaleString()} capacity`} color="#7FE0D5" icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2" strokeLinecap="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/></svg>} />
            <StatCard label="Checked In" value={checkedIn.toLocaleString()} sub={`${Math.round(checkedIn / claimed * 100)}% of ticket holders`} color="#B1D8D4" icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B1D8D4" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} />
            <StatCard label="Chat Messages" value={msgs.toLocaleString()} sub="across 2 channels today" color="#EBE88A" icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#EBE88A" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>} />
            <StatCard label="Announcements" value="5" sub="842 avg readers per post" color="#7FE0D5" icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7FE0D5" strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>} />
          </div>

          <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 32px', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>Ticket Breakdown</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{capacity - claimed} remaining</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { label: 'Claimed', val: claimed, pct: claimed / capacity * 100, color: '#7FE0D5' },
                { label: 'Checked in', val: checkedIn, pct: checkedIn / capacity * 100, color: '#B1D8D4' },
                { label: 'Not checked in yet', val: claimed - checkedIn, pct: (claimed - checkedIn) / capacity * 100, color: 'rgba(255,255,255,0.18)' },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{r.label}</span>
                    <span style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{r.val.toLocaleString()} <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>({Math.round(r.pct)}%)</span></span>
                  </div>
                  <Bar pct={r.pct} color={r.color} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
            <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 0 8px', overflow: 'hidden' }}>
              <div style={{ padding: '0 32px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>Recent Activity</span>
                <span style={{ fontSize: 12, color: 'rgba(127,224,213,0.6)', fontWeight: 600, cursor: 'pointer' }}>View all</span>
              </div>
              {ACTIVITY.map((a, i) => (
                <div key={i} className="activity-row" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 32px', transition: 'background 0.12s' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: a.color, border: '1.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: F, fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>{a.ini}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{a.name}</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}> {a.action}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{a.time}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '24px 24px 20px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', textTransform: 'uppercase' as const, display: 'block', marginBottom: 16 }}>Quick Actions</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Post Announcement', color: '#7FE0D5', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>, onClick: undefined },
                    { label: 'Open Event Hub', color: '#7FE0D5', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, onClick: () => navigate('/organizer/hub') },
                    { label: 'View Attendees', color: 'rgba(255,255,255,0.6)', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, onClick: () => setTab('attendees') },
                    { label: 'Download Check-in List', color: 'rgba(255,255,255,0.6)', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>, onClick: undefined },
                  ].map((qa, i) => (
                    <button key={i} className="action-btn" onClick={qa.onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: i < 2 ? 'rgba(127,224,213,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i < 2 ? 'rgba(127,224,213,0.18)' : 'rgba(255,255,255,0.07)'}`, color: qa.color, fontFamily: F, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s', textAlign: 'left' as const }}>
                      {qa.icon}
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '24px 24px 20px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)' }}>Pre-event Checklist</span>
                  <span style={{ fontSize: 12, color: '#7FE0D5', fontWeight: 700 }}>{CHECKLIST.filter(c => c.done).length}/{CHECKLIST.length}</span>
                </div>
                <Bar pct={CHECKLIST.filter(c => c.done).length / CHECKLIST.length * 100} color="#7FE0D5" />
                <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {CHECKLIST.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, background: item.done ? '#7FE0D5' : 'transparent', border: `1.5px solid ${item.done ? '#7FE0D5' : 'rgba(255,255,255,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {item.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0e2a2c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span style={{ fontSize: 13.5, color: item.done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.75)', fontWeight: item.done ? 400 : 600, textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'attendees' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '36px 56px 48px' }} className="scroll-y">
          <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 140px 120px', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}>
              {['Attendee', 'Ticket', 'Status', 'Claimed'].map(h => (
                <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)' }}>{h}</span>
              ))}
            </div>
            {[
              { ini: 'WR', name: '@wave_rider',  full: 'Alex K.',   ticket: 'General Admission', status: 'checked-in', time: '6m ago',  bg: '#0d2e32' },
              { ini: 'DG', name: '@deep_groove', full: 'Sam T.',    ticket: 'General Admission', status: 'checked-in', time: '11m ago', bg: '#1e1040' },
              { ini: 'NS', name: '@neon_soul',   full: 'Priya L.',  ticket: 'General Admission', status: 'not-in',     time: '1h ago',  bg: '#2a2208' },
              { ini: 'BE', name: '@bass_echo',   full: 'Jordan M.', ticket: 'General Admission', status: 'not-in',     time: '2h ago',  bg: '#0a2a18' },
              { ini: 'CL', name: '@city_lights', full: 'Riley F.',  ticket: 'General Admission', status: 'checked-in', time: '14m ago', bg: '#2e1508' },
              { ini: 'JL', name: '@jam_lane',    full: 'Jamie L.',  ticket: 'General Admission', status: 'not-in',     time: '2m ago',  bg: '#0d2e32' },
              { ini: 'SS', name: '@sounds_so',   full: 'Sara S.',   ticket: 'General Admission', status: 'not-in',     time: '4m ago',  bg: '#1e1040' },
              { ini: 'MO', name: '@mix_o',       full: 'Maya O.',   ticket: 'General Admission', status: 'checked-in', time: '14m ago', bg: '#0d2830' },
            ].map((a, i) => (
              <div key={i} className="activity-row" style={{ display: 'grid', gridTemplateColumns: '1fr 160px 140px 120px', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.12s', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: a.bg, border: '1.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.6)' }}>{a.ini}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{a.full}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{a.name}</div>
                  </div>
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{a.ticket}</span>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.5px', color: a.status === 'checked-in' ? '#7FE0D5' : 'rgba(255,255,255,0.35)', background: a.status === 'checked-in' ? 'rgba(127,224,213,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${a.status === 'checked-in' ? 'rgba(127,224,213,0.2)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 6, padding: '3px 10px' }}>
                    {a.status === 'checked-in' ? 'Checked in' : 'Not checked in'}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'checklist' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '36px 56px 48px' }} className="scroll-y">
          <div style={{ maxWidth: 700 }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>{CHECKLIST.filter(c => c.done).length} of {CHECKLIST.length} completed</div>
              <Bar pct={CHECKLIST.filter(c => c.done).length / CHECKLIST.length * 100} color="#7FE0D5" />
            </div>
            {CHECKLIST.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: item.done ? '#7FE0D5' : 'transparent', border: `1.5px solid ${item.done ? '#7FE0D5' : 'rgba(255,255,255,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0e2a2c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <span style={{ fontSize: 15, color: item.done ? 'rgba(255,255,255,0.3)' : '#fff', fontWeight: item.done ? 400 : 600, textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
