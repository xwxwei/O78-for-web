# AGENTS.md

## Project Goal

o78 is not a traditional tarot or fortune-telling website.

The product goal is to create a calm, immersive, emotionally reflective AI ritual experience for Western audiences through tarot-inspired interaction design.

The core experience is:
- users enter emotionally meaningful questions
- participate in a ritualized card-drawing interaction
- receive symbolic interpretation and reflection
- build a long-term emotional journal through repeated use

o78 should feel:
- cinematic
- intimate
- minimal
- mysterious
- emotionally intelligent

o78 should NOT feel like:
- a scammy psychic website
- a neon occult store
- a casual horoscope app
- a gamified card battler
- a generic AI chatbot wrapper

The product should prioritize:
- emotional resonance
- ritual pacing
- visual restraint
- contemplative interaction
- symbolic storytelling
- psychological immersion

The experience should resemble:
- a reflective emotional space
- an AI oracle
- a modern spiritual interface

rather than a traditional “fortune telling” platform.



## Technology Stack Declaration

Frontend:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

Rendering & Interaction:
- SVG-based procedural animation
- Canvas only when necessary
- Motion must remain subtle and low-frequency
- Animation should feel organic and atmospheric, never cyberpunk

State & Data:
- Supabase
- PostgreSQL
- Edge Functions when appropriate

Authentication:
- Supabase Auth
- Google OAuth
- Email Magic Link

AI:
- OpenAI APIs
- Structured prompt architecture
- Emotionally reflective interpretation generation
- Never frame outputs as factual prediction

Design System Principles:
- Near-black palette
- Soft glow accents
- Minimal typography
- Large negative space
- Circular visual motifs
- Slow transitions
- High contrast hierarchy

Interaction Principles:
- Ritual over utility
- Participation over automation
- Emotional pacing over speed
- Discovery over explanation

Performance Principles:
- Fast initial load
- Motion must never block interaction
- GPU-heavy effects should be avoided in MVP
- Mobile-first responsiveness is required



## Non-Negotiable Validation Requirements

All generated interpretations MUST comply with modern AI emotional safety expectations inspired by Google-style responsible AI principles.

The system MUST NOT:
- claim supernatural certainty
- claim objective future prediction
- present tarot as factual authority
- encourage dependency
- manipulate vulnerable users emotionally
- imply consciousness, psychic powers, or divine access
- provide medical, legal, financial, or crisis advice disguised as spiritual guidance

Interpretations MUST:
- remain reflective rather than deterministic
- encourage introspection rather than obedience
- avoid fear-based language
- avoid absolutist statements
- avoid coercive emotional framing

Preferred language patterns:
- “may”
- “could”
- “suggests”
- “invites reflection”
- “might indicate”

Avoid:
- “this will happen”
- “your future is decided”
- “the cards guarantee”
- “you must”
- “the universe demands”

The product experience MUST maintain:
- emotional safety
- psychological softness
- user agency
- interpretive ambiguity
- reflective openness

AI outputs should feel:
- thoughtful
- symbolic
- emotionally aware
- calm
- poetic but grounded

The system should never create panic, emotional dependency, or false certainty.

o78 is an emotional reflection interface — not a prediction engine.