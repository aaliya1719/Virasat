# VIRASAT

### The Heritage of India
**An Interactive Digital Platform for Exploring India's Living Cultural Heritage**

VIRASAT transforms Indian cultural heritage from scattered, static information into an interactive cultural exploration experience.

Instead of treating heritage as a collection of isolated articles, VIRASAT connects regions, traditions, languages, art, music, dance, cuisine, attire, festivals, monuments, and indigenous practices through an explorable journey.

> **Don't make the user read about India. Make them explore India.**

---

## Project Demo

| Resource | Link |
|---|---|
| Live prototype | Add deployment link |
| GitHub repository | [github.com/mahek02007/Virasat](https://github.com/mahek02007/Virasat) |
| Demo video | Add demo video link |
| SIH presentation | Add PPT or Drive link if required |

---

## Overview

India's cultural heritage is extraordinarily diverse, but discovering it digitally is often fragmented across websites, articles, archives, videos, and institutional resources.

VIRASAT provides a geographic and cultural exploration hierarchy:

```text
India
  |
  +-- Region / State
        |
        +-- Cultural Category
              |
              +-- Heritage Place / Tradition / Story
                    |
                    +-- Interactive Exploration
```

Users can begin with an interactive cultural atlas, select a region, explore its cultural identity through visual and structured content, discover specific heritage places and traditions, and interact with a contextual Cultural Guide.

## Problem Statement

Digital discovery of India's tangible and intangible heritage faces several challenges:

- Cultural information is distributed across different sources and platforms.
- Much of the available material is presented as text-heavy articles or archives.
- Lesser-known local traditions, crafts, indigenous practices, and regional art forms are harder to discover.
- Learning about one cultural element does not always lead naturally to related places, people, or practices.
- Traditional heritage resources often focus on information consumption rather than exploration and interactive learning.

## Proposed Solution

VIRASAT combines geographic exploration, structured cultural content, visual storytelling, interactive activities, and a contextual Cultural Guide in one platform.

```text
Landing Page
     |
     v
Cultural Atlas
     |
     v
Select Region
     |
     v
Regional Cultural Hub
     |
     v
Heritage Content and Stories
     |
     v
Cultural Guide and Activities
```

---

## Key Features

### Interactive Cultural Atlas

The atlas acts as the primary navigation layer. Users can explore regions through a map interface, zone-based filtering, regional hotspots, search, and animated region cards.

### Regional Cultural Exploration

Regional hubs organize content into accessible categories including:

- Culture and language
- Music and dance
- Art and crafts
- Attire and cuisine
- Festivals and traditions
- Heritage places and monuments
- Indigenous and traditional practices

### Heritage Discovery

Regional exploration can lead to individual monuments, festivals, art forms, crafts, dance forms, musical traditions, cuisine, clothing, cultural stories, and heritage sites.

### Cultural Guide

The prototype includes a contextual Cultural Guide interface with region-specific content and suggested questions. A production Retrieval-Augmented Generation (RAG) system is planned so responses can be grounded in a curated heritage knowledge base.

### Interactive Learning

The experience includes exploration progress, cultural facts, heritage cards, and the foundation for quizzes, challenges, badges, and regional discovery milestones.

### Immersive Presentation

The interface includes a cinematic landing page, responsive layouts, regional imagery, multilingual greetings, avatar voiceovers through the Web Speech Synthesis API, and an optional ambient soundscape.

### Tangible and Intangible Heritage

VIRASAT represents both physical heritage and living culture:

| Tangible heritage | Intangible heritage |
|---|---|
| Monuments and temples | Festivals and rituals |
| Forts and archaeological sites | Languages and oral traditions |
| Historic structures | Music, dance, and crafts |
| Cultural landscapes | Cuisine, clothing, and indigenous practices |

---

## Cultural Content Model

```text
                    INDIA
                      |
             +--------+--------+
             |                 |
          REGION            REGION
             |
     +-------+--------+
     |       |        |
  Culture  Art     Language
     |
     +-- Traditions
     +-- Festivals
     +-- Music
     +-- Dance
     +-- Cuisine
     +-- Attire
     +-- Heritage Places
             |
       +-----+-----+
       |           |
    Place      Tradition
```

This hierarchy supports both broad regional exploration and focused discovery of individual heritage elements.

## System Architecture

The repository contains a static prototype, a Vite/React application, and a FastAPI backend foundation.

```text
                         User
                          |
                          v
              +-------------------------+
              | VIRASAT Web Experience  |
              | HTML/CSS/JS or React    |
              +------------+------------+
                           |
              +------------+------------+
              |                         |
              v                         v
       Cultural Atlas             Regional Content
       and Navigation              and Heritage Data
              |                         |
              +------------+------------+
                           v
              +-------------------------+
              | FastAPI Backend         |
              | Auth, content, search,  |
              | facts, places, regions  |
              +------------+------------+
                           |
                           v
              +-------------------------+
              | Supabase / Database     |
              | and planned RAG layer   |
              +-------------------------+
```

The backend includes routers and data models for authentication, content, facts, places, regions, search, and chat. The Cultural Guide's full LLM and RAG integration remains planned unless configured in a deployment environment.

## User Journey

1. **Discover:** Enter through the heritage-focused landing page.
2. **Explore India:** Open the Cultural Atlas.
3. **Select a region:** Choose a state or cultural region.
4. **Explore culture:** Browse language, art, music, dance, cuisine, festivals, attire, and places.
5. **Discover heritage:** Open individual stories, traditions, and sites.
6. **Ask the Cultural Guide:** Use contextual prompts to learn more.
7. **Participate:** Complete interactive activities and quizzes as they become available.
8. **Progress:** Build a record of regional and cultural discoveries.

---

## Current Prototype

### Implemented

- VIRASAT landing experience with cinematic visual treatment
- Cultural Atlas and region-based navigation
- Regional navigation and structured cultural datasets
- Maharashtra and Odisha regional content experiences
- Additional pilot content for Rajasthan and Tamil Nadu in the original atlas flow
- Heritage exploration cards and regional imagery
- Regional Cultural Guide interface and simulated interactions
- Search, cultural facts, multilingual greetings, and avatar voiceovers
- Responsive web interfaces
- Vite/React frontend foundation
- FastAPI backend foundation with routers, schemas, models, and migrations
- Supabase client integration points

### Planned or In Development

- Production backend deployment and persistent user accounts
- User progress synchronization
- Full RAG-based Cultural Guide and LLM integration
- Voice interaction beyond browser speech synthesis
- Personalised recommendations
- Expanded regional coverage
- Full gamification system
- Content management and expert review workflows
- Multilingual content beyond the current prototype greetings

This distinction is intentional: the prototype demonstrates the product experience, while the remaining architecture describes how the platform can scale into a production system.

## Technology Stack

| Layer | Technology | Status |
|---|---|---|
| Static prototype | HTML5, CSS3, vanilla JavaScript | Implemented |
| Frontend application | React, React DOM, React Router, Vite | Implemented in `src/` |
| Backend | FastAPI and Python | Foundation implemented in `backend/` |
| Database integration | Supabase client and SQL migrations | Integration points implemented |
| Styling | Custom responsive CSS, Google Fonts | Implemented |
| Mapping | Interactive atlas and region-based navigation | Implemented |
| Voiceover | Web Speech Synthesis API | Implemented in the prototype |
| Ambient audio | Web Audio API | Implemented in the prototype |
| AI Cultural Guide | Contextual UI and chat foundation | Full RAG/LLM integration planned |
| Deployment | Vite build and web deployment configuration | Supported |

---

## AI and Technical Approach

The planned AI architecture uses Retrieval-Augmented Generation:

```text
User Question
      |
      v
Identify Current Region and Context
      |
      v
Retrieve Relevant Curated Content
      |
      v
Construct Context
      |
      v
Generate Response
      |
      v
Cultural Guide
```

The knowledge base can contain regions, traditions, festivals, monuments, art forms, languages, cuisine, clothing, indigenous practices, and regional variations. Grounding responses in curated content is important for accuracy, attribution, regional variation, and cultural sensitivity.

## Content and Authenticity

Potential sources for validation include the Ministry of Culture, state tourism departments, Sangeet Natak Akademi, INTACH, universities, research institutions, cultural historians, local practitioners, and community representatives.

The intended content lifecycle is:

```text
Research
   |
   v
Content Preparation
   |
   v
Expert and Cultural Sensitivity Review
   |
   v
Publication
   |
   v
Periodic Audit and Update
```

Sources and attribution should remain associated with published content wherever applicable.

## Regional Coverage

The architecture is designed to scale across India's states and union territories. The prototype uses selected regions to validate the interaction model before attempting full national coverage. This depth-first approach prioritizes meaningful cultural detail before broad expansion.

## Project Structure

```text
Virasat/
├── index.html, style.css, app.js       # Original landing experience
├── home.html, home.css, home.js        # Atlas and exploration hub
├── explore.html                         # Original regional exploration page
├── regional-content.*                   # Regional content system
├── state.html, state.css, state.js     # State exploration flow
├── maharashtra.html, odisha.html       # Regional pages
├── src/                                 # Vite/React application
│   ├── components/                      # Shared UI components
│   ├── context/                         # Authentication context
│   ├── hooks/                           # Application hooks
│   ├── lib/                             # API and Supabase clients
│   └── pages/                           # Landing, atlas, and region pages
├── backend/                             # FastAPI backend foundation
│   ├── routers/                          # Chat, content, facts, places, regions, search
│   ├── migrations/                      # Database migrations
│   └── models.py, schemas.py, auth.py   # Backend data and auth layers
├── public/assets/                       # Regional and avatar assets
├── state-data.js, data.js               # Cultural datasets
└── package.json                         # Vite and React project configuration
```

## Getting Started

### Prerequisites

- A modern web browser
- Node.js and npm for the Vite/React application
- Python 3 and the packages in `backend/requirements.txt` for the backend

### Run the frontend

```bash
npm install
npm run dev
```

For the original static experience, open `index.html` through a local server such as VS Code Live Server or:

```bash
python -m http.server 8000
```

### Build the frontend

```bash
npm run build
```

Backend setup and environment configuration are documented in the files under `backend/`. Configure Supabase credentials before enabling database-backed features.

## Screenshots

Screenshots can be added under `screenshots/`:

- `screenshots/landing-page.png`
- `screenshots/cultural-atlas.png`
- `screenshots/regional-exploration.png`
- `screenshots/cultural-guide.png`
- `screenshots/heritage-exploration.png`

## Future Scope

1. Complete coverage across all states and union territories.
2. A grounded, versioned RAG-powered Cultural Guide.
3. Hindi and regional Indian language support.
4. Voice interaction and spoken explanations.
5. Personalised cultural journeys and recommendations.
6. Moderated contributions from practitioners, historians, institutions, and communities.
7. Regional milestones, badges, quizzes, and discovery profiles.
8. A cultural knowledge graph connecting places, traditions, communities, languages, and historical events.

## Why VIRASAT?

Existing digital resources perform important work archiving, documenting, digitising, and presenting cultural information. VIRASAT focuses on the exploration layer:

```text
Geographic Exploration
        +
Cultural Context
        +
Visual Storytelling
        +
Interactive Discovery
        +
Conversational Guidance
        +
Gamified Learning
```

The goal is not to replace authoritative cultural archives. It is to make India's diverse heritage easier to discover, understand, and connect with responsibly.

## Smart India Hackathon

VIRASAT was developed as a solution for the Smart India Hackathon under the cultural heritage domain. The project focuses on cultural preservation and awareness, digital accessibility, discovery of lesser-known practices, interactive learning, regional representation, and responsible use of AI.

## Team

**Team name:** Add team name

| Name | Role |
|---|---|
| Add member | Add role |
| Add member | Add role |
| Add member | Add role |

## License

This project is intended for educational and cultural preservation purposes. Add the repository's formal license file and terms here when finalized.

## Acknowledgements

VIRASAT builds upon publicly available cultural information and research from recognised cultural institutions, government resources, educational institutions, and documented heritage sources. The project recognises the importance of responsible documentation, attribution, expert review, and cultural sensitivity.

<p align="center">
  <strong>विरासत</strong> · <em>Preserving India's Living Heritage, One Story at a Time</em>
</p>
