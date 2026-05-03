import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import logoPng from '@assets/Happenin-Logo_1777804986503.png';
import wordmarkPng from '@assets/happenin-wordmark-4x_1777805318717.png';

const F = 'Urbanist, sans-serif';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const LOGO_URL = logoPng;

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

const CAROUSEL_SLIDES = [
  { id: 1, title: 'Neon Pulse Music Festival', date: 'Sat, 14 Jun 2025 · 6:00 PM', location: 'Rooftop Arena, London', category: 'Music', tag: 'Featured', bg: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%), url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80)', accent: '#B1D8D4' },
  { id: 2, title: 'Digital Art & Design Summit', date: 'Fri, 20 Jun 2025 · 10:00 AM', location: 'East Wing Gallery, Berlin', category: 'Art', tag: 'Trending', bg: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%), url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80)', accent: '#EBE88A' },
  { id: 3, title: 'Startup Founders Meetup', date: 'Thu, 26 Jun 2025 · 7:00 PM', location: 'Tech Hub, Amsterdam', category: 'Business', tag: '', bg: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%), url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80)', accent: '#EBE88A' },
  { id: 4, title: 'Global Street Food Festival', date: 'Sun, 6 Jul 2025 · 12:00 PM', location: 'Victoria Park, Melbourne', category: 'Food', tag: 'Hot', bg: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80)', accent: '#EBE88A' },
  { id: 5, title: 'Championship Gaming League', date: 'Fri, 11 Jul 2025 · 3:00 PM', location: 'Esports Arena, Seoul', category: 'Gaming', tag: 'New', bg: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%), url(https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80)', accent: '#B1D8D4' },
];

type EventItem = {
  id: number; title: string; date: string; time: string;
  location: string; category: string; price: string;
  image: string; tag: string; attendees: number;
};

function makeEvents(overrides: Partial<EventItem>[], base: Partial<EventItem> = {}): EventItem[] {
  const palettes = [
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #243447 100%)',
    'linear-gradient(135deg, #0a1628 0%, #0e2240 50%, #132d55 100%)',
    'linear-gradient(135deg, #1a0d00 0%, #2e1a05 50%, #3d2408 100%)',
    'linear-gradient(135deg, #051e1a 0%, #082f28 50%, #0a3d32 100%)',
    'linear-gradient(135deg, #1a0505 0%, #2e0c0c 50%, #3d1010 100%)',
    'linear-gradient(135deg, #0d0221 0%, #150a3a 50%, #1e0e52 100%)',
    'linear-gradient(135deg, #000d1a 0%, #001428 50%, #001f3d 100%)',
    'linear-gradient(135deg, #0f1a10 0%, #1a2e1b 50%, #243d25 100%)',
    'linear-gradient(135deg, #1a1205 0%, #2e200a 50%, #3d2d0f 100%)',
  ];
  return overrides.map((o, i) => ({
    id: i + 1, title: 'Event Title', date: 'Sat, 14 Jun 2025', time: '6:00 PM',
    location: 'Venue, City', category: 'Music', price: 'Free',
    image: palettes[i % palettes.length], tag: '', attendees: 100 + i * 47,
    ...base, ...o,
  }));
}

const FEATURED_EVENTS = makeEvents([
  { title: 'Neon Pulse Music Festival', date: 'Sat, 14 Jun 2025', time: '6:00 PM', location: 'Rooftop Arena, London', category: 'Music', price: 'Free', tag: 'Featured', attendees: 842, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Digital Art & Design Summit', date: 'Fri, 20 Jun 2025', time: '10:00 AM', location: 'East Wing Gallery, Berlin', category: 'Art', price: 'Free', tag: 'Trending', attendees: 320, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Startup Founders Meetup', date: 'Thu, 26 Jun 2025', time: '7:00 PM', location: 'Tech Hub, Amsterdam', category: 'Business', price: 'Free', tag: '', attendees: 178, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Global Street Food Festival', date: 'Sun, 6 Jul 2025', time: '12:00 PM', location: 'Victoria Park, Melbourne', category: 'Food', price: 'Free', tag: 'Hot', attendees: 1240, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Theatre Night: Hamlet Redux', date: 'Fri, 27 Jun 2025', time: '8:00 PM', location: 'Royal Exchange, Manchester', category: 'Theatre', price: 'Free', tag: '', attendees: 390, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Championship Gaming League', date: 'Fri, 11 Jul 2025', time: '3:00 PM', location: 'Esports Arena, Seoul', category: 'Gaming', price: 'Free', tag: 'New', attendees: 2100, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Wellness & Yoga Retreat', date: 'Sat, 5 Jul 2025', time: '9:00 AM', location: 'Kew Gardens, London', category: 'Sports', price: 'Free', tag: '', attendees: 210, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Jazz Under the Stars', date: 'Wed, 9 Jul 2025', time: '7:30 PM', location: 'Harbour Park, Sydney', category: 'Music', price: 'Free', tag: '', attendees: 560, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Python & AI Bootcamp', date: 'Mon, 30 Jun 2025', time: '10:00 AM', location: 'Code Space, Toronto', category: 'Education', price: 'Free', tag: '', attendees: 145, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Craft Beer Festival', date: 'Sat, 19 Jul 2025', time: '2:00 PM', location: 'Battersea, London', category: 'Food', price: 'Free', tag: '', attendees: 870, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80)' },
]);

const TODAY_EVENTS = makeEvents([
  { title: 'Morning Yoga Flow', time: '8:00 AM', location: 'Hyde Park, London', category: 'Sports', price: 'Free', attendees: 80, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Indie Art Pop-up', time: '10:00 AM', location: 'Shoreditch, London', category: 'Art', price: 'Free', attendees: 130, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1499916078039-922301b0eb9c?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Lunchtime Jazz', time: '12:30 PM', location: 'Soho Square, London', category: 'Music', price: 'Free', attendees: 200, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Startup Pitch Hour', time: '2:00 PM', location: 'WeWork, Canary Wharf', category: 'Business', price: 'Free', attendees: 95, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Afternoon Photography Walk', time: '3:30 PM', location: 'South Bank, London', category: 'Art', price: 'Free', attendees: 55, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Street Food Market', time: '5:00 PM', location: 'Borough Market, London', category: 'Food', price: 'Free', attendees: 640, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Comedy Night Open Mic', time: '7:00 PM', location: 'The Comedy Store, London', category: 'Theatre', price: 'Free', attendees: 180, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Rooftop DJ Set', time: '8:30 PM', location: 'Brixton, London', category: 'Music', price: 'Free', attendees: 310, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80)' },
]);

const FRESH_EVENTS = makeEvents([
  { title: 'AR & VR Expo 2025', date: 'Sat, 26 Jul 2025', time: '10:00 AM', location: 'ExCeL London', category: 'Education', price: 'Free', tag: 'New', attendees: 1800, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Salsa & Bachata Social', date: 'Fri, 18 Jul 2025', time: '8:00 PM', location: 'Dance Fusion, Bristol', category: 'Theatre', price: 'Free', tag: 'New', attendees: 145, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Sustainable Fashion Show', date: 'Sun, 20 Jul 2025', time: '3:00 PM', location: 'Tate Modern, London', category: 'Art', price: 'Free', tag: 'New', attendees: 420, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Triathlon Championship', date: 'Sat, 12 Jul 2025', time: '7:00 AM', location: 'Hyde Park, London', category: 'Sports', price: 'Free', tag: 'New', attendees: 300, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Night Market: Asia Edition', date: 'Sat, 19 Jul 2025', time: '5:00 PM', location: 'Spitalfields, London', category: 'Food', price: 'Free', tag: 'New', attendees: 950, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Web3 Builders Summit', date: 'Thu, 24 Jul 2025', time: '9:00 AM', location: 'Canary Wharf, London', category: 'Business', price: 'Free', tag: 'New', attendees: 600, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Classical Piano Recital', date: 'Wed, 16 Jul 2025', time: '7:30 PM', location: 'Wigmore Hall, London', category: 'Music', price: 'Free', tag: 'New', attendees: 250, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Mindfulness Meditation Day', date: 'Sun, 13 Jul 2025', time: '10:00 AM', location: 'Battersea Park, London', category: 'Sports', price: 'Free', tag: 'New', attendees: 110, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80)' },
]);

const CONCERT_EVENTS = makeEvents([
  { title: 'Arctic Monkeys: World Tour', date: 'Sat, 2 Aug 2025', time: '7:00 PM', location: 'Wembley Stadium, London', category: 'Music', price: 'Free', tag: 'Popular', attendees: 85000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Dua Lipa: Future Nostalgia', date: 'Fri, 25 Jul 2025', time: '8:00 PM', location: 'O2 Arena, London', category: 'Music', price: 'Free', tag: 'Hot', attendees: 20000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Coldplay: Music of the Spheres', date: 'Sun, 27 Jul 2025', time: '7:30 PM', location: 'Emirates Stadium, London', category: 'Music', price: 'Free', tag: 'Popular', attendees: 60000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'The Weeknd: After Hours Tour', date: 'Thu, 31 Jul 2025', time: '9:00 PM', location: 'Tottenham Stadium, London', category: 'Music', price: 'Free', tag: '', attendees: 35000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Blur: Special Edition Show', date: 'Sat, 9 Aug 2025', time: '7:00 PM', location: 'Hyde Park, London', category: 'Music', price: 'Free', tag: '', attendees: 25000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'Billie Eilish: Hit Me Hard', date: 'Wed, 6 Aug 2025', time: '8:00 PM', location: 'Alexandra Palace, London', category: 'Music', price: 'Free', tag: '', attendees: 10000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80)' },
]);

const SPORTS_EVENTS = makeEvents([
  { title: 'Premier League: Arsenal vs Chelsea', date: 'Sat, 5 Jul 2025', time: '3:00 PM', location: 'Emirates Stadium, London', category: 'Sports', price: 'Free', tag: 'Hot', attendees: 60000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80)' },
  { title: "Wimbledon Men's Final", date: 'Sun, 13 Jul 2025', time: '2:00 PM', location: 'All England Club, London', category: 'Sports', price: 'Free', tag: 'Popular', attendees: 15000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'London Marathon 2025', date: 'Sun, 27 Jul 2025', time: '9:00 AM', location: 'Greenwich Park, London', category: 'Sports', price: 'Free', tag: '', attendees: 42000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'UFC Fight Night London', date: 'Sat, 19 Jul 2025', time: '6:00 PM', location: 'O2 Arena, London', category: 'Sports', price: 'Free', tag: 'Hot', attendees: 20000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80)' },
  { title: 'British Grand Prix', date: 'Sun, 6 Jul 2025', time: '3:00 PM', location: 'Silverstone Circuit', category: 'Sports', price: 'Free', tag: 'Popular', attendees: 140000, image: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25)), url(https://images.unsplash.com/photo-1502732739272-5a74c3c3f10b?auto=format&fit=crop&w=1200&q=80)' },
]);

const STEPS = [
  { num: '01', title: 'Create Your Event', desc: 'Set up your event in minutes with our guided multi-step creator. Add tickets, agenda and team.' },
  { num: '02', title: 'Manage & Plan', desc: 'Use the built-in planner to assign tasks, coordinate staff and track progress — all in one place.' },
  { num: '03', title: 'Engage Attendees', desc: 'Broadcast updates, chat live with ticket holders and collect feedback — no extra apps needed.' },
];

function HappeninLogo({ height = 32 }: { height?: number }) {
  return (
    <img
      src={LOGO_URL}
      alt="Happenin"
      loading="eager"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = `${BASE}/happenin-wordmark-trimmed.png`;
      }}
      style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
    />
  );
}

function Navbar() {
  const [, navigate] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLDivElement | null>(null);

  const searchableItems = [...FEATURED_EVENTS, ...TODAY_EVENTS, ...FRESH_EVENTS, ...CONCERT_EVENTS, ...SPORTS_EVENTS];
  const filteredResults = searchTerm.trim()
    ? searchableItems.filter((event, index, arr) => {
        const q = searchTerm.toLowerCase();
        return (
          arr.findIndex((item) => item.title === event.title) === index &&
          `${event.title} ${event.location} ${event.category}`.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : searchableItems.slice(0, 6);

  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setSearchOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28, cursor: 'pointer' }} onClick={() => navigate('/discover')}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <HappeninLogo />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Discover</span>
      </div>
      <div ref={searchRef} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, pointerEvents: 'all', position: 'relative' }}>
        <button onClick={() => setSearchOpen((v) => !v)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, padding: 4 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        {searchOpen && (
          <div style={{ position: 'absolute', top: 44, right: 68, width: 360, background: '#13110d', border: '1px solid rgba(127,224,213,0.18)', borderRadius: 18, padding: 14, boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events, places, categories"
              autoFocus
              style={{ width: '100%', background: '#0a0804', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, outline: 'none', padding: '14px 16px', color: '#fff', fontFamily: F, fontSize: 14 }}
            />
            <div style={{ marginTop: 12, maxHeight: 260, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredResults.length ? filteredResults.map((event) => (
                <button
                  key={`${event.title}-${event.location}`}
                  onClick={() => navigate('/discover')}
                  style={{ textAlign: 'left', background: '#0a0804', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 14px', cursor: 'pointer', color: '#fff' }}
                >
                  <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700 }}>{event.title}</div>
                  <div style={{ marginTop: 4, fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.62)' }}>{event.location} · {event.category}</div>
                </button>
              )) : (
                <div style={{ padding: '10px 4px', fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>No results found.</div>
              )}
            </div>
          </div>
        )}
        <div onClick={() => navigate('/login')} style={{ background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 32px', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ color: '#0e2a2c', fontFamily: F, fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>LOGIN</span>
        </div>
      </div>
    </div>
  );
}

function ListingSection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category]
    );
  };
  const sourceEvents = [...FEATURED_EVENTS, ...TODAY_EVENTS, ...FRESH_EVENTS, ...CONCERT_EVENTS, ...SPORTS_EVENTS];
  const events = sourceEvents.filter(
    (event, index, arr) => arr.findIndex((item) => item.title === event.title) === index && (selectedCategories.length === 0 || selectedCategories.includes(event.category))
  );

  return (
    <>
      <CategoryBar selectedCategories={selectedCategories} onToggleCategory={toggleCategory} />
      <section style={{ padding: '48px 0 72px', paddingLeft: 72 }}>
        <SectionHeader label="Happening Now" title="Featured Events" link="VIEW ALL" />
        <HScrollRow events={events.filter((event) => ['Music', 'Art', 'Business', 'Food', 'Theatre', 'Gaming', 'Sports', 'Education'].includes(event.category))} showViewMore />
      </section>
      <EventSection label="Today Only" title="Happening Today" link="VIEW TODAY" events={events.filter((event) => TODAY_EVENTS.some((today) => today.title === event.title))} showViewMore />
      <EventSection label="Just Added" title="Fresh Finds" link="VIEW ALL" events={events.filter((event) => FRESH_EVENTS.some((fresh) => fresh.title === event.title))} showViewMore />
      <EventSection label="Most Popular" title="Concerts" link="VIEW ALL" events={events.filter((event) => CONCERT_EVENTS.some((concert) => concert.title === event.title))} showViewMore />
      <EventSection label="Get Active" title="GET ALIVE" link="VIEW ALL" events={events.filter((event) => SPORTS_EVENTS.some((sport) => sport.title === event.title))} showViewMore />
    </>
  );
}

function HeroCarousel() {
  const [, navigate] = useLocation();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const total = CAROUSEL_SLIDES.length;

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((index + total) % total);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, total]);

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = CAROUSEL_SLIDES[current];

  return (
    <section style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {CAROUSEL_SLIDES.map((s, i) => (
        <div key={s.id} style={{ position: 'absolute', inset: 0, backgroundImage: s.bg, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: i === current ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
        </div>
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.1) 65%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, padding: '0 72px 56px', zIndex: 3, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}>
        <div style={{ flex: 1, maxWidth: 720 }}>
          {slide.tag && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: slide.accent === '#EBE88A' ? 'rgba(235,232,138,0.15)' : 'rgba(177,216,212,0.15)', border: `1px solid ${slide.accent === '#EBE88A' ? 'rgba(235,232,138,0.35)' : 'rgba(177,216,212,0.35)'}`, borderRadius: 9999, padding: '5px 14px', marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: slide.accent, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ color: slide.accent, fontFamily: F, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{slide.tag} · {slide.category}</span>
            </div>
          )}
          <h1 style={{ fontFamily: F, fontSize: 68, fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px', color: '#fff', margin: '0 0 20px', cursor: 'pointer' }} onClick={() => navigate('/event/1')}>{slide.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, opacity: 0.6 }}>📅</span>
              <span style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>{slide.date}</span>
            </div>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, opacity: 0.6 }}>📍</span>
              <span style={{ fontFamily: F, fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>{slide.location}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, flexShrink: 0, width: 250 }}>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', width: '100%' }}>
            <button onClick={prev} style={{ width: 120, height: 120, borderRadius: '50%', background: 'transparent', border: 'none', color: '#fff', fontSize: 45, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F }}>←</button>
            <button onClick={next} style={{ width: 120, height: 120, borderRadius: '50%', background: 'transparent', border: 'none', color: '#fff', fontSize: 45, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F }}>→</button>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', width: '100%' }}>
            {CAROUSEL_SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 48 : 14, height: 14, borderRadius: 9999, background: i === current ? '#B1D8D4' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBar({ selectedCategories, onToggleCategory }: { selectedCategories: string[]; onToggleCategory: (category: string) => void }) {
  return (
    <section style={{ padding: '48px 72px 36px', background: '#000' }}>
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => {
            const active = selectedCategories.includes(cat.label);
            return (
              <button
                key={cat.label}
                onClick={() => onToggleCategory(cat.label)}
                style={{ background: active ? 'rgba(177,216,212,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${active ? 'rgba(177,216,212,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, color: active ? '#B1D8D4' : 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: F, textTransform: 'uppercase', letterSpacing: '0.5px' }}
              >
                <span>{cat.icon}</span><span>{cat.label}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 16px', cursor: 'pointer', flexShrink: 0, marginLeft: 16 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(177,216,212,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>London, UK</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const [, navigate] = useLocation();
  return (
    <div style={{ width: 360, flexShrink: 0, cursor: 'pointer' }} onClick={() => navigate('/event/1')}>
      <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: '#111', aspectRatio: '4 / 5', boxShadow: '0 18px 60px rgba(0,0,0,0.35)' }}>
        <div style={{ position: 'absolute', inset: 0, background: event.image, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.82) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>{event.category}</div>
            <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9999, padding: '6px 10px' }}>{event.price === 'Free' ? 'Free' : event.price}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontFamily: F, fontSize: 30, lineHeight: 0.98, fontWeight: 500, letterSpacing: '-1px', color: '#fff' }}>{event.title}</div>
              <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{event.date}</div>
              <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{event.location}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewMoreCard() {
  const [, navigate] = useLocation();
  return (
    <div onClick={() => navigate('/discover')} style={{ width: 280, flexShrink: 0, borderRadius: 20, border: '1px dashed rgba(177,216,212,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, cursor: 'pointer', padding: '40px 24px', background: 'rgba(177,216,212,0.03)' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(177,216,212,0.1)', border: '1px solid rgba(177,216,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>→</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#B1D8D4', marginBottom: 6 }}>VIEW MORE</div>
        <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Explore all events</div>
      </div>
    </div>
  );
}

function SectionHeader({ label, title, link }: { label: string; title: string; link: string }) {
  const [, navigate] = useLocation();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, paddingRight: 72 }}>
      <div>
        <div style={{ fontSize: 11, color: '#B1D8D4', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8, fontFamily: F }}>{label}</div>
        <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px', fontFamily: F, margin: 0 }}>{title}</h2>
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('/discover'); }} style={{ fontSize: 13, color: '#B1D8D4', fontWeight: 600, textDecoration: 'none', fontFamily: F, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{link} →</a>
    </div>
  );
}

function HScrollRow({ events, showViewMore = false }: { events: EventItem[]; showViewMore?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div style={{ position: 'relative' }}>
      <style>{`.h-scroll-hide::-webkit-scrollbar { display: none; }`}</style>
      <div ref={scrollRef} className="h-scroll-hide" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
        {events.map(event => <EventCard key={event.id} event={event} />)}
        {showViewMore && <ViewMoreCard />}
      </div>
    </div>
  );
}

function EventSection({ label, title, link, events, showViewMore = false }: { label: string; title: string; link: string; events: EventItem[]; showViewMore?: boolean }) {
  return (
    <section style={{ padding: '0 0 72px', paddingLeft: 72 }}>
      <SectionHeader label={label} title={title} link={link} />
      <HScrollRow events={events} showViewMore={showViewMore} />
    </section>
  );
}

function OrganizerCTA() {
  const [, navigate] = useLocation();
  return (
    <section style={{ padding: '96px 72px', background: 'linear-gradient(180deg, #000 0%, #0a1a0e 50%, #000 100%)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontFamily: F, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(127,224,213,0.6)', fontWeight: 600, marginBottom: 16 }}>For Organisers</div>
          <h2 style={{ fontFamily: F, fontSize: 56, fontWeight: 800, letterSpacing: '-2px', color: '#fff', lineHeight: 1.02, margin: '0 0 20px' }}>Host events<br/>that people remember.</h2>
          <p style={{ fontFamily: F, fontSize: 18, color: 'rgba(255,255,255,0.38)', maxWidth: 520, margin: '0 auto' }}>Everything you need to run a free event — from ticketing to live chat — in one place.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 48 }}>
          {STEPS.map(step => (
            <div key={step.num} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '32px 28px' }}>
              <div style={{ fontFamily: F, fontSize: 40, fontWeight: 900, color: 'rgba(127,224,213,0.2)', letterSpacing: '-1px', marginBottom: 16 }}>{step.num}</div>
              <div style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{step.title}</div>
              <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button onClick={() => navigate('/organizer/create')} style={{ background: '#7FE0D5', border: 'none', borderRadius: 14, padding: '16px 40px', color: '#0e2a2c', fontFamily: F, fontSize: 16, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.2px' }}>
            Create Your Event
          </button>
          <button onClick={() => navigate('/organizer/dashboard')} style={{ background: 'transparent', border: '1px solid rgba(127,224,213,0.3)', borderRadius: 14, padding: '16px 40px', color: '#7FE0D5', fontFamily: F, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            View Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ padding: '96px 72px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1360, display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 560px)', gap: 90, alignItems: 'start' }}>
          <div style={{ fontFamily: F, color: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 36, paddingRight: 24 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7FE0D5', marginBottom: 18 }}>ABOUT HAPPENIN</div>
              <div style={{ display: 'grid', gap: 12, fontSize: 20, lineHeight: 1, fontWeight: 400 }}>
                {['Home', 'Discover', 'Events', 'Saved', 'Profile'].map(l => <a key={l} href="#" style={{ color: '#fff', textDecoration: 'none' }}>{l}</a>)}
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
        <img src={wordmarkPng} alt="happenin*" loading="eager" style={{ width: '100%', display: 'block' }} />
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div style={{ background: '#0e0c09', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <HeroCarousel />
      <ListingSection />
      <OrganizerCTA />
      <Footer />
    </div>
  );
}
