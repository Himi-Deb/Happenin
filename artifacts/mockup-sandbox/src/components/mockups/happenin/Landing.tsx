import './_group.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';

const F = 'var(--font)';

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
  { id: 1, title: 'Neon Pulse Music Festival', date: 'Sat, 14 Jun 2025 · 6:00 PM', location: 'Rooftop Arena, London', category: 'Music', tag: 'Featured', bg: 'linear-gradient(135deg, #0d0221 0%, #150a3a 30%, #1e0e52 55%, #0a1628 100%)', accent: '#B1D8D4' },
  { id: 2, title: 'Digital Art & Design Summit', date: 'Fri, 20 Jun 2025 · 10:00 AM', location: 'East Wing Gallery, Berlin', category: 'Art', tag: 'Trending', bg: 'linear-gradient(135deg, #051e1a 0%, #082f28 35%, #0a3d32 60%, #051410 100%)', accent: '#EBE88A' },
  { id: 3, title: 'Startup Founders Meetup', date: 'Thu, 26 Jun 2025 · 7:00 PM', location: 'Tech Hub, Amsterdam', category: 'Business', tag: '', bg: 'linear-gradient(135deg, #1a0d00 0%, #2e1a05 35%, #3d2408 60%, #1a0d00 100%)', accent: '#EBE88A' },
  { id: 4, title: 'Global Street Food Festival', date: 'Sun, 6 Jul 2025 · 12:00 PM', location: 'Victoria Park, Melbourne', category: 'Food', tag: 'Hot', bg: 'linear-gradient(135deg, #1a0505 0%, #2e0c0c 35%, #3d1010 60%, #1a0505 100%)', accent: '#EBE88A' },
  { id: 5, title: 'Championship Gaming League', date: 'Fri, 11 Jul 2025 · 3:00 PM', location: 'Esports Arena, Seoul', category: 'Gaming', tag: 'New', bg: 'linear-gradient(135deg, #000d1a 0%, #001428 35%, #001f3d 60%, #000d1a 100%)', accent: '#B1D8D4' },
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
    id: i + 1,
    title: 'Event Title',
    date: 'Sat, 14 Jun 2025',
    time: '6:00 PM',
    location: 'Venue, City',
    category: 'Music',
    price: 'Free',
    image: palettes[i % palettes.length],
    tag: '',
    attendees: 100 + i * 47,
    ...base,
    ...o,
  }));
}

const FEATURED_EVENTS = makeEvents([
  { title: 'Neon Pulse Music Festival', date: 'Sat, 14 Jun 2025', time: '6:00 PM', location: 'Rooftop Arena, London', category: 'Music', price: 'Free', tag: 'Featured', attendees: 842 },
  { title: 'Digital Art & Design Summit', date: 'Fri, 20 Jun 2025', time: '10:00 AM', location: 'East Wing Gallery, Berlin', category: 'Art', price: 'Free', tag: 'Trending', attendees: 320 },
  { title: 'Startup Founders Meetup', date: 'Thu, 26 Jun 2025', time: '7:00 PM', location: 'Tech Hub, Amsterdam', category: 'Business', price: 'Free', tag: '', attendees: 178 },
  { title: 'Global Street Food Festival', date: 'Sun, 6 Jul 2025', time: '12:00 PM', location: 'Victoria Park, Melbourne', category: 'Food', price: '£12', tag: 'Hot', attendees: 1240 },
  { title: 'Theatre Night: Hamlet Redux', date: 'Fri, 27 Jun 2025', time: '8:00 PM', location: 'Royal Exchange, Manchester', category: 'Theatre', price: '£25', tag: '', attendees: 390 },
  { title: 'Championship Gaming League', date: 'Fri, 11 Jul 2025', time: '3:00 PM', location: 'Esports Arena, Seoul', category: 'Gaming', price: 'Free', tag: 'New', attendees: 2100 },
  { title: 'Wellness & Yoga Retreat', date: 'Sat, 5 Jul 2025', time: '9:00 AM', location: 'Kew Gardens, London', category: 'Sports', price: '£40', tag: '', attendees: 210 },
  { title: 'Jazz Under the Stars', date: 'Wed, 9 Jul 2025', time: '7:30 PM', location: 'Harbour Park, Sydney', category: 'Music', price: '£18', tag: '', attendees: 560 },
  { title: 'Python & AI Bootcamp', date: 'Mon, 30 Jun 2025', time: '10:00 AM', location: 'Code Space, Toronto', category: 'Education', price: '£60', tag: '', attendees: 145 },
  { title: 'Craft Beer Festival', date: 'Sat, 19 Jul 2025', time: '2:00 PM', location: 'Battersea, London', category: 'Food', price: '£20', tag: '', attendees: 870 },
]);

const TODAY_EVENTS = makeEvents([
  { title: 'Morning Yoga Flow', time: '8:00 AM', location: 'Hyde Park, London', category: 'Sports', price: 'Free', attendees: 80 },
  { title: 'Indie Art Pop-up', time: '10:00 AM', location: 'Shoreditch, London', category: 'Art', price: 'Free', attendees: 130 },
  { title: 'Lunchtime Jazz', time: '12:30 PM', location: 'Soho Square, London', category: 'Music', price: 'Free', attendees: 200 },
  { title: 'Startup Pitch Hour', time: '2:00 PM', location: 'WeWork, Canary Wharf', category: 'Business', price: 'Free', attendees: 95 },
  { title: 'Afternoon Photography Walk', time: '3:30 PM', location: 'South Bank, London', category: 'Art', price: 'Free', attendees: 55 },
  { title: 'Street Food Market', time: '5:00 PM', location: 'Borough Market, London', category: 'Food', price: 'Free', attendees: 640 },
  { title: 'Comedy Night Open Mic', time: '7:00 PM', location: 'The Comedy Store, London', category: 'Theatre', price: '£10', attendees: 180 },
  { title: 'Rooftop DJ Set', time: '8:30 PM', location: 'Brixton, London', category: 'Music', price: '£15', attendees: 310 },
  { title: 'Pub Quiz Night', time: '8:00 PM', location: 'The Crown, Islington', category: 'Education', price: '£5', attendees: 120 },
  { title: 'Late Night Cinema Screening', time: '10:00 PM', location: 'BFI Southbank, London', category: 'Theatre', price: '£12', attendees: 220 },
]);

const FRESH_EVENTS = makeEvents([
  { title: 'AR & VR Expo 2025', date: 'Sat, 26 Jul 2025', time: '10:00 AM', location: 'ExCeL London', category: 'Education', price: '£35', tag: 'New', attendees: 1800 },
  { title: 'Salsa & Bachata Social', date: 'Fri, 18 Jul 2025', time: '8:00 PM', location: 'Dance Fusion, Bristol', category: 'Theatre', price: '£8', tag: 'New', attendees: 145 },
  { title: 'Sustainable Fashion Show', date: 'Sun, 20 Jul 2025', time: '3:00 PM', location: 'Tate Modern, London', category: 'Art', price: 'Free', tag: 'New', attendees: 420 },
  { title: 'Triathlon Championship', date: 'Sat, 12 Jul 2025', time: '7:00 AM', location: 'Hyde Park, London', category: 'Sports', price: '£80', tag: 'New', attendees: 300 },
  { title: 'Night Market: Asia Edition', date: 'Sat, 19 Jul 2025', time: '5:00 PM', location: 'Spitalfields, London', category: 'Food', price: 'Free', tag: 'New', attendees: 950 },
  { title: 'Web3 Builders Summit', date: 'Thu, 24 Jul 2025', time: '9:00 AM', location: 'Canary Wharf, London', category: 'Business', price: '£120', tag: 'New', attendees: 600 },
  { title: 'Classical Piano Recital', date: 'Wed, 16 Jul 2025', time: '7:30 PM', location: 'Wigmore Hall, London', category: 'Music', price: '£30', tag: 'New', attendees: 250 },
  { title: 'Mindfulness Meditation Day', date: 'Sun, 13 Jul 2025', time: '10:00 AM', location: 'Battersea Park, London', category: 'Sports', price: '£20', tag: 'New', attendees: 110 },
  { title: 'Graphic Novel Workshop', date: 'Sat, 5 Jul 2025', time: '2:00 PM', location: 'Foyles, Charing Cross', category: 'Art', price: '£15', tag: 'New', attendees: 60 },
  { title: 'Fintech Innovation Forum', date: 'Tue, 22 Jul 2025', time: '9:00 AM', location: 'Level39, London', category: 'Business', price: '£90', tag: 'New', attendees: 480 },
]);

const CONCERT_EVENTS = makeEvents([
  { title: 'Arctic Monkeys: World Tour', date: 'Sat, 2 Aug 2025', time: '7:00 PM', location: 'Wembley Stadium, London', category: 'Music', price: '£85', tag: 'Popular', attendees: 85000 },
  { title: 'Dua Lipa: Future Nostalgia', date: 'Fri, 25 Jul 2025', time: '8:00 PM', location: 'O2 Arena, London', category: 'Music', price: '£70', tag: 'Hot', attendees: 20000 },
  { title: 'Coldplay: Music of the Spheres', date: 'Sun, 27 Jul 2025', time: '7:30 PM', location: 'Emirates Stadium, London', category: 'Music', price: '£95', tag: 'Popular', attendees: 60000 },
  { title: 'The Weeknd: After Hours Tour', date: 'Thu, 31 Jul 2025', time: '9:00 PM', location: 'Tottenham Stadium, London', category: 'Music', price: '£75', tag: '', attendees: 35000 },
  { title: 'Blur: Special Edition Show', date: 'Sat, 9 Aug 2025', time: '7:00 PM', location: 'Hyde Park, London', category: 'Music', price: '£60', tag: '', attendees: 25000 },
  { title: 'Billie Eilish: Hit Me Hard', date: 'Wed, 6 Aug 2025', time: '8:00 PM', location: 'Alexandra Palace, London', category: 'Music', price: '£55', tag: '', attendees: 10000 },
  { title: 'Jungle: Electronic Night', date: 'Fri, 1 Aug 2025', time: '10:00 PM', location: 'Fabric, London', category: 'Music', price: '£25', tag: '', attendees: 1800 },
  { title: 'London Symphony Orchestra', date: 'Sun, 3 Aug 2025', time: '6:00 PM', location: 'Royal Albert Hall', category: 'Music', price: '£45', tag: '', attendees: 5000 },
  { title: 'Glass Animals: Live Show', date: 'Sat, 16 Aug 2025', time: '8:30 PM', location: 'Eventim Apollo, London', category: 'Music', price: '£40', tag: '', attendees: 3500 },
  { title: 'Frank Ocean: Rare Appearance', date: 'Fri, 22 Aug 2025', time: '9:00 PM', location: 'Brixton Academy, London', category: 'Music', price: '£110', tag: 'Hot', attendees: 4900 },
]);

const SPORTS_EVENTS = makeEvents([
  { title: 'Premier League: Arsenal vs Chelsea', date: 'Sat, 5 Jul 2025', time: '3:00 PM', location: 'Emirates Stadium, London', category: 'Sports', price: '£65', tag: 'Hot', attendees: 60000 },
  { title: 'Wimbledon Men\'s Final', date: 'Sun, 13 Jul 2025', time: '2:00 PM', location: 'All England Club, London', category: 'Sports', price: '£200', tag: 'Popular', attendees: 15000 },
  { title: 'London Marathon 2025', date: 'Sun, 27 Jul 2025', time: '9:00 AM', location: 'Greenwich Park, London', category: 'Sports', price: '£50', tag: '', attendees: 42000 },
  { title: 'UFC Fight Night London', date: 'Sat, 19 Jul 2025', time: '6:00 PM', location: 'O2 Arena, London', category: 'Sports', price: '£90', tag: 'Hot', attendees: 20000 },
  { title: 'British Grand Prix', date: 'Sun, 6 Jul 2025', time: '3:00 PM', location: 'Silverstone Circuit', category: 'Sports', price: '£150', tag: 'Popular', attendees: 140000 },
  { title: 'CrossFit Open Championship', date: 'Sat, 12 Jul 2025', time: '10:00 AM', location: 'Excel London', category: 'Sports', price: '£25', tag: '', attendees: 3000 },
  { title: '5K City Run Challenge', date: 'Sat, 19 Jul 2025', time: '8:00 AM', location: 'Victoria Park, London', category: 'Sports', price: '£15', tag: '', attendees: 1500 },
  { title: 'Basketball: London Lions vs Brighton', date: 'Fri, 18 Jul 2025', time: '7:30 PM', location: 'Crystal Palace NSC', category: 'Sports', price: '£20', tag: '', attendees: 4000 },
  { title: 'Triathlon Open Water Swim', date: 'Sun, 20 Jul 2025', time: '7:00 AM', location: 'Serpentine, Hyde Park', category: 'Sports', price: '£35', tag: '', attendees: 800 },
  { title: 'Rock Climbing Competition', date: 'Sat, 26 Jul 2025', time: '11:00 AM', location: 'The Climbing Hangar, London', category: 'Sports', price: '£18', tag: '', attendees: 350 },
]);

const STEPS = [
  { num: '01', title: 'Create Your Event', desc: 'Set up your event in minutes with our guided multi-step creator. Add tickets, agenda and team.' },
  { num: '02', title: 'Manage & Plan', desc: 'Use the built-in planner to assign tasks, coordinate staff and track progress — all in one place.' },
  { num: '03', title: 'Engage Attendees', desc: 'Broadcast updates, chat live with ticket holders and collect feedback — no extra apps needed.' },
];

function HappeninLogo() {
  return (
    <svg width="116" height="29" viewBox="0 0 116 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.05 22V14.728V5.248H4.282V9.064C4.282 9.4 4.274 9.76 4.258 10.144C4.242 10.512 4.21 10.896 4.162 11.296C4.114 11.696 4.066 12.104 4.018 12.52C3.97 12.92 3.914 13.328 3.85 13.744H4.234C4.458 12.736 4.754 11.904 5.122 11.248C5.49 10.592 5.962 10.104 6.538 9.784C7.114 9.448 7.786 9.28 8.554 9.28C9.962 9.28 11.01 9.776 11.698 10.768C12.386 11.744 12.73 13.208 12.73 15.16V22H10.522V15.376C10.522 13.936 10.298 12.888 9.85 12.232C9.418 11.56 8.77 11.224 7.906 11.224C7.298 11.224 6.77 11.408 6.322 11.776C5.874 12.128 5.53 12.648 5.29 13.336C5.05 14.008 4.93 14.84 4.93 15.832V22H2.05Z" fill="white"/>
      <path d="M21.4785 22.24C20.3745 22.24 19.4385 22.008 18.6705 21.544C17.9025 21.08 17.3185 20.416 16.9185 19.552C16.5185 18.688 16.3185 17.648 16.3185 16.432C16.3185 15.2 16.5185 14.144 16.9185 13.264C17.3185 12.384 17.8865 11.704 18.6225 11.224C19.3745 10.744 20.2625 10.504 21.2865 10.504C21.9185 10.504 22.5105 10.6 23.0625 10.792C23.6305 10.984 24.1265 11.288 24.5505 11.704C24.9905 12.12 25.3345 12.656 25.5825 13.312C25.8305 13.952 25.9545 14.72 25.9545 15.616V16.696H17.8305V15.16H24.0225C24.0065 14.472 23.8705 13.888 23.6145 13.408C23.3745 12.928 23.0305 12.56 22.5825 12.304C22.1345 12.048 21.6065 11.92 21.0025 11.92C20.3505 11.92 19.7825 12.072 19.2945 12.376C18.8225 12.68 18.4545 13.104 18.1905 13.648C17.9265 14.192 17.7945 14.824 17.7945 15.544V16.888C17.7945 17.896 17.9585 18.736 18.2865 19.408C18.6305 20.064 19.1025 20.56 19.7025 20.896C20.3025 21.216 20.9905 21.376 21.7665 21.376C22.2945 21.376 22.7745 21.304 23.2065 21.16C23.6545 21.016 24.0385 20.8 24.3585 20.512C24.6945 20.224 24.9425 19.864 25.1025 19.432L26.8785 19.888C26.6785 20.528 26.3425 21.088 25.8705 21.568C25.3985 22.048 24.8065 22.424 24.0945 22.696C23.3825 22.952 22.5745 23.08 21.6705 23.08L21.4785 22.24Z" fill="white"/>
      <path d="M29.3672 22V10.744H31.4312V12.784H31.6952C31.9192 12.112 32.3112 11.584 32.8712 11.2C33.4312 10.8 34.0952 10.6 34.8632 10.6C34.9912 10.6 35.1432 10.608 35.3192 10.624C35.4952 10.64 35.6232 10.656 35.7032 10.672V12.712C35.6552 12.696 35.5192 12.672 35.2952 12.64C35.0872 12.608 34.8632 12.592 34.6232 12.592C34.0072 12.592 33.4552 12.728 32.9672 13C32.4952 13.272 32.1192 13.648 31.8392 14.128C31.5592 14.608 31.4192 15.16 31.4192 15.784V22H29.3672Z" fill="white"/>
      <path d="M38.1797 27.04V10.744H40.2077V12.736H40.4717C40.6317 12.416 40.8717 12.088 41.1917 11.752C41.5117 11.4 41.9277 11.104 42.4397 10.864C42.9677 10.624 43.6237 10.504 44.4077 10.504C45.3957 10.504 46.2717 10.752 47.0317 11.248C47.7917 11.728 48.3917 12.416 48.8317 13.312C49.2717 14.192 49.4917 15.24 49.4917 16.456C49.4917 17.672 49.2717 18.728 48.8317 19.624C48.3917 20.52 47.7957 21.216 47.0437 21.712C46.2917 22.192 45.4237 22.432 44.4397 22.432C43.6717 22.432 43.0157 22.312 42.4717 22.072C41.9277 21.832 41.5037 21.536 41.1997 21.184C40.8957 20.816 40.6557 20.48 40.4797 20.176H40.2797V27.04H38.1797ZM40.2557 16.432C40.2557 17.296 40.3837 18.048 40.6397 18.688C40.9117 19.312 41.2957 19.8 41.7917 20.152C42.2877 20.488 42.8717 20.656 43.5437 20.656C44.2477 20.656 44.8477 20.48 45.3437 20.128C45.8397 19.76 46.2157 19.256 46.4717 18.616C46.7437 17.96 46.8797 17.224 46.8797 16.408C46.8797 15.6 46.7477 14.88 46.4837 14.248C46.2197 13.6 45.8437 13.096 45.3557 12.736C44.8677 12.36 44.2637 12.172 43.5437 12.172C42.8717 12.172 42.2877 12.336 41.7917 12.664C41.2957 12.992 40.9117 13.464 40.6397 14.08C40.3837 14.696 40.2557 15.416 40.2557 16.24V16.432Z" fill="white"/>
      <path d="M52.4629 22V10.744H54.5269V12.784H54.7909C55.0149 12.112 55.4069 11.584 55.9669 11.2C56.5269 10.8 57.1909 10.6 57.9589 10.6C58.0869 10.6 58.2389 10.608 58.4149 10.624C58.5909 10.64 58.7189 10.656 58.7989 10.672V12.712C58.7509 12.696 58.6149 12.672 58.3909 12.64C58.1829 12.608 57.9589 12.592 57.7189 12.592C57.1029 12.592 56.5509 12.728 56.0629 13C55.5909 13.272 55.2149 13.648 54.9349 14.128C54.6549 14.608 54.5149 15.16 54.5149 15.784V22H52.4629Z" fill="white"/>
      <path d="M61.3945 8.272V5.968H63.5185V8.272H61.3945ZM61.4425 22V10.744H63.4945V22H61.4425Z" fill="white"/>
      <path d="M67.0996 22V10.744H69.1396V12.784H69.3796C69.5876 12.176 69.9716 11.664 70.5316 11.248C71.1076 10.816 71.8596 10.6 72.7876 10.6C73.7116 10.6 74.4956 10.832 75.1396 11.296C75.7996 11.744 76.2956 12.4 76.6276 13.264H76.8916C77.2396 12.416 77.7836 11.76 78.5236 11.296C79.2796 10.832 80.1556 10.6 81.1556 10.6C82.4276 10.6 83.4436 11.008 84.2036 11.824C84.9796 12.624 85.3676 13.832 85.3676 15.448V22H83.2916V15.64C83.2916 14.6 83.0596 13.832 82.5956 13.336C82.1316 12.824 81.4996 12.568 80.6996 12.568C79.8036 12.568 79.0836 12.872 78.5396 13.48C77.9956 14.088 77.7236 14.9 77.7236 15.916V22H75.6476V15.448C75.6476 14.504 75.4076 13.768 74.9276 13.24C74.4476 12.696 73.8076 12.424 73.0076 12.424C72.4556 12.424 71.9516 12.568 71.4956 12.856C71.0556 13.128 70.7036 13.52 70.4396 14.032C70.1756 14.528 70.0436 15.112 70.0436 15.784V22H67.0996Z" fill="white"/>
      <path d="M89.0762 8.272V5.968H91.2002V8.272H89.0762ZM89.1242 22V10.744H91.1762V22H89.1242Z" fill="white"/>
      <path d="M95.0293 22V10.744H97.0693V12.784H97.3093C97.5173 12.176 97.9013 11.664 98.4613 11.248C99.0373 10.816 99.7893 10.6 100.717 10.6C102.125 10.6 103.173 11.096 103.861 12.088C104.549 13.064 104.893 14.528 104.893 16.48V22H102.685V15.376C102.685 13.936 102.461 12.888 102.013 12.232C101.581 11.56 100.933 11.224 100.069 11.224C99.461 11.224 98.933 11.408 98.485 11.776C98.037 12.128 97.693 12.648 97.453 13.336C97.213 14.008 97.093 14.84 97.093 15.832V22H95.0293Z" fill="white"/>
      <path d="M109.669 10L107.755 8.72L110.238 6.48L110.212 6.35692L106.824 5.76615L107.522 3.62462L110.6 5.24923L110.677 5.15077L110.16 2H112.488L111.945 5.15077L112.074 5.24923L115.1 3.62462L115.824 5.76615L112.462 6.35692L112.41 6.48L114.971 8.69538L113.108 10L111.427 7.14462H111.272L109.669 10Z" fill="#B1D8D4"/>
    </svg>
  );
}

function Navbar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 56px 0', pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'all', background: 'rgba(177,216,212,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20, paddingRight: 28 }}>
        <div style={{ background: '#0e2a2c', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 164, height: 61, padding: '16px 24px', flexShrink: 0, overflow: 'hidden' }}>
          <HappeninLogo />
        </div>
        <span style={{ color: '#fff', fontFamily: F, fontSize: 18, fontWeight: 400, whiteSpace: 'nowrap' }}>Discover</span>
      </div>
      <div style={{ pointerEvents: 'all', background: '#EBE88A', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 32px', cursor: 'pointer', flexShrink: 0 }}>
        <span style={{ color: '#0e2a2c', fontFamily: F, fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>LOGIN</span>
      </div>
    </div>
  );
}

function HeroCarousel() {
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
    <section style={{ position: 'relative', width: '100%', aspectRatio: '1920 / 1280', overflow: 'hidden', background: '#000' }}>
      {CAROUSEL_SLIDES.map((s, i) => (
        <div key={s.id} style={{ position: 'absolute', inset: 0, background: s.bg, opacity: i === current ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
        </div>
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.1) 65%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 72px 56px', zIndex: 3, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}>
        <div style={{ flex: 1, maxWidth: 720 }}>
          {slide.tag && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: slide.accent === '#EBE88A' ? 'rgba(235,232,138,0.15)' : 'rgba(177,216,212,0.15)', border: `1px solid ${slide.accent === '#EBE88A' ? 'rgba(235,232,138,0.35)' : 'rgba(177,216,212,0.35)'}`, borderRadius: 9999, padding: '5px 14px', marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: slide.accent, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ color: slide.accent, fontFamily: F, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{slide.tag} · {slide.category}</span>
            </div>
          )}
          <h1 style={{ fontFamily: F, fontSize: 68, fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px', color: '#fff', margin: '0 0 20px' }}>{slide.title}</h1>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20, flexShrink: 0 }}>
          <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={prev} style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F }}>←</button>
            <button onClick={next} style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F }}>→</button>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {CAROUSEL_SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 24 : 6, height: 6, borderRadius: 9999, background: i === current ? '#B1D8D4' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBar() {
  return (
    <section style={{ padding: '48px 72px 32px', background: '#000' }}>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        {CATEGORIES.map((cat, i) => (
          <button key={cat.label} style={{ background: i === 0 ? 'rgba(177,216,212,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${i === 0 ? 'rgba(177,216,212,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, color: i === 0 ? '#B1D8D4' : 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: F, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>{cat.icon}</span><span>{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', width: 320, flexShrink: 0 }}>
      <div style={{ height: 200, background: event.image, position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 14 }}>
        {event.tag ? (
          <span style={{ background: event.tag === 'Featured' || event.tag === 'Popular' ? '#B1D8D4' : '#EBE88A', color: '#0a1e1f', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 9999, letterSpacing: '0.5px', fontFamily: F, textTransform: 'uppercase' }}>{event.tag}</span>
        ) : <span />}
        <button style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', fontSize: 14, flexShrink: 0 }}>♡</button>
        <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '2px 8px', fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 500, fontFamily: F }}>{event.category}</div>
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, lineHeight: 1.3, color: '#fff', fontFamily: F }}>{event.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 5, fontFamily: F }}><span>📅</span>{event.date} · {event.time}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 5, fontFamily: F }}><span>📍</span>{event.location}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: F }}>From</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#B1D8D4', fontFamily: F }}>{event.price}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ display: 'flex' }}>
              {[0,1,2].map(i => (<div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: `hsl(${i * 40 + 160}, 25%, 38%)`, border: '2px solid rgba(0,0,0,0.4)', marginLeft: i > 0 ? -8 : 0 }} />))}
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: F }}>{event.attendees}+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewMoreCard() {
  return (
    <div style={{ width: 280, flexShrink: 0, borderRadius: 20, border: '1px dashed rgba(177,216,212,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, cursor: 'pointer', padding: '40px 24px', background: 'rgba(177,216,212,0.03)' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(177,216,212,0.1)', border: '1px solid rgba(177,216,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>→</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#B1D8D4', marginBottom: 6 }}>VIEW MORE</div>
        <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Explore all events</div>
      </div>
    </div>
  );
}

function SectionHeader({ label, title, link }: { label: string; title: string; link: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, paddingRight: 72 }}>
      <div>
        <div style={{ fontSize: 11, color: '#B1D8D4', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8, fontFamily: F }}>{label}</div>
        <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px', fontFamily: F, margin: 0 }}>{title}</h2>
      </div>
      <a href="#" style={{ fontSize: 13, color: '#B1D8D4', fontWeight: 600, textDecoration: 'none', fontFamily: F, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{link} →</a>
    </div>
  );
}

function HScrollRow({ events, showViewMore = false }: { events: EventItem[]; showViewMore?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={scrollRef}
        style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}
      >
        <style>{`.happenin-hscroll::-webkit-scrollbar { display: none; }`}</style>
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

function HowItWorks() {
  return (
    <section style={{ margin: '0 72px 100px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 28, padding: '64px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 12, color: '#B1D8D4', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10, fontFamily: F }}>Simple Process</div>
        <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-1.5px', fontFamily: F }}>How Happenin Works</h2>
      </div>
      <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
        {STEPS.map((step, i) => (
          <div key={step.num} style={{ flex: 1, maxWidth: 280, position: 'relative' }}>
            {i < STEPS.length - 1 && <div style={{ position: 'absolute', top: 24, left: 'calc(100%)', width: 48, height: 1, background: 'rgba(255,255,255,0.07)' }} />}
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(177,216,212,0.1)', border: '1px solid rgba(177,216,212,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#B1D8D4', marginBottom: 20, fontFamily: F }}>{step.num}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, fontFamily: F }}>{step.title}</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontFamily: F }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: '40px 72px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <HappeninLogo />
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: F }}>© 2025 Happenin. All rights reserved.</p>
      <div style={{ display: 'flex', gap: 28 }}>
        {['Privacy', 'Terms', 'Contact'].map(l => (
          <a key={l} href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontFamily: F }}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <div className="happenin-root">
      <Navbar />
      <HeroCarousel />
      <CategoryBar />
      <section style={{ padding: '48px 0 72px', paddingLeft: 72 }}>
        <SectionHeader label="Happening Now" title="Featured Events" link="VIEW ALL" />
        <HScrollRow events={FEATURED_EVENTS} showViewMore />
      </section>
      <EventSection label="Today Only" title="Happening Today" link="VIEW TODAY" events={TODAY_EVENTS} showViewMore />
      <EventSection label="Just Added" title="Fresh Finds" link="VIEW ALL" events={FRESH_EVENTS} showViewMore />
      <EventSection label="Most Popular" title="Concerts" link="VIEW ALL" events={CONCERT_EVENTS} showViewMore />
      <EventSection label="Get Active" title="GET ALIVE" link="VIEW ALL" events={SPORTS_EVENTS} showViewMore />
      <HowItWorks />
      <Footer />
    </div>
  );
}
