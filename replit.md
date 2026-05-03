# Happenin* — Free Events Platform

## Overview
A production React/Vite SPA for discovering and hosting free-only events. Dark warm/brownish theme. All 12 pages implemented and fully navigable.

## Design Tokens
- **BG**: `#0e0c09` (page background)
- **CARD_BG**: `#13110d` (card surfaces)
- **INPUT_BG**: `#0a0804` (form inputs)
- **TEAL**: `#7FE0D5` (primary accent)
- **GOLD**: `#EBE88A` (CTA / highlight)
- **Fonts**: Urbanist (body/headings) + Space Grotesk (section titles in forms)

## Pages & Routes
| Route | File | Description |
|---|---|---|
| `/` | `pages/landing.tsx` | Hero carousel, event rows, organiser CTA, footer |
| `/discover` | `pages/discover.tsx` | Featured carousel, 4-col grid, filters, pagination |
| `/event/:id` | `pages/event-detail.tsx` | Hero, tabs (About/Lineup/Agenda), gallery, ticket panel |
| `/checkout` | `pages/ticket-checkout.tsx` | Ticket claim form, FAQ accordion |
| `/confirmation` | `pages/ticket-confirmation.tsx` | QR ticket, animated check, map, lineup |
| `/chat` | `pages/event-chat.tsx` | Setup view → live anonymous chat (avatars, seed messages) |
| `/organizer/hub` | `pages/organizer-hub.tsx` | Multi-channel organiser hub (5 channels, live stats, tasks) |
| `/organizer/dashboard` | `pages/organizer-dashboard.tsx` | Dashboard with stats, events list, actions |
| `/organizer/create` | `pages/create-event.tsx` | Multi-section event creator with sidebar nav |
| `/organizer/edit` | `pages/edit-event.tsx` | Pre-filled event editor with unsaved-change tracking |
| `/login` | `pages/login.tsx` | Split-panel login with Google/Apple/email |
| `/signup` | `pages/signup.tsx` | Split-panel signup with Google/Apple/email |

## Architecture
- **Framework**: React 18 + Vite (artifact: `artifacts/happenin-web`)
- **Router**: wouter `Switch`/`Route` with `base={import.meta.env.BASE_URL.replace(/\/$/, "")}`
- **State**: React useState (no server state needed — all pages are self-contained UI)
- **Styling**: Inline styles throughout (no Tailwind / CSS modules)
- **Images**: Unsplash CDN for event photos; `happenin-logo-new.png` + `happenin-wordmark-trimmed.png` in public/

## Key Patterns
- All navigation uses `useLocation` from wouter; `navigate('/path')` for programmatic routing
- `const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')` for asset URLs
- Every page is fully self-contained with its own `Navbar`, `Footer`, and data constants
- No external API calls — all data is hardcoded for the prototype
