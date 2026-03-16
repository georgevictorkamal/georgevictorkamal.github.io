# George Victor Kamal - Software Engineer Portfolio

A premium, high-performance full-stack portfolio application meticulously engineered to showcase professional expertise in full-stack development, mobile engineering, and AI integration.

## 🚀 Live Demonstration
The portfolio features a cutting-edge technical stack designed for speed, scalability, and exceptional user experience.

- **Frontend:** [Visit Website](https://georgevictorkamal.github.io)
- **LinkedIn:** [georgevictorkamal](https://linkedin.com/in/georgevictorkamal)
- **GitHub:** [georgevictorkamal](https://github.com/georgevictorkamal)

---

## 🛠️ Unified Technical Stack

Building upon a modern "Type-Safe" architecture, this project utilizes:

### Frontend Layer
- **Core:** React 19 (Hooks & Functional Components)
- **Styling:** Tailwind CSS 4.x (Liquid-smooth responsive design)
- **Animations:** Framer Motion (Professional transitions & scroll-triggered micro-interactions)
- **State & API:** TanStack React Query + tRPC (Full end-to-end type safety)
- **Theming:** Dynamic Dark/Light mode with glassmorphic accents

### Backend Layer
- **Runtime:** Node.js (TSX for native TypeScript execution)
- **API Architecture:** tRPC (Typed Remote Procedure Calls)
- **ORM:** Drizzle ORM (Lightweight, performance-first mapping)
- **Database:** MySQL (Structured persistence for projects & messages)
- **Email System:** Nodemailer (Integrated SMTP notifications for contact inquiries)

---

## 🌟 Professional Highlights

### 1. Intelligent Case Studies
Deep-dive project breakdowns including **Problem Statements**, **Architectural Solutions**, and **Measurable Outcomes**. Each project is enriched with domain-specific professional imagery and technology badges dynamically colored by project category.

### 2. Verified Credentials
Integrated verification system linked directly to official Microsoft, LinkedIn, and University credential gateways, ensuring 100% authenticity of certifications.

### 3. AI-Powered "Twin" Interface
A custom-built AI Chat interface (`AIChatBox`) designed to act as a digital recruiter assistant, acknowledging technical and biographical questions based on verified profile data.

### 4. Professional Filtering
Scalable project gallery with real-time searching and categorical filtering (Backend, Full Stack, Mobile, Power Platform) utilizing fluid layout animations.

---

## 🏗️ Project Architecture

```text
d:/george_portfolio/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # High-fidelity UI components
│   │   ├── pages/          # Home, ProjectDetail, NotFound
│   │   ├── lib/            # tRPC clients & utility helpers
│   │   └── contexts/       # Theme & Global State
├── server/                 # Node.js Backend (tRPC)
│   ├── _core/              # Entry point, Env config, Services
│   ├── routers.ts          # Type-safe API procedures
│   ├── db.ts               # Drizzle connection & Mock fallback
│   └── mockData.ts         # High-fidelity career data
├── shared/                 # Shared TypeScript types
└── drizzle/                # Database schemas & migrations
```

---

## 🚀 Execution Guide

### Prerequisites
- **Node.js** (v20+)
- **MySQL** (For production persistence)

### Installation & Launch
1. **Clone the repository**
   ```bash
   git clone https://github.com/georgevictorkamal/georgevictorkamal.github.io.git
   ```
2. **Setup Dependencies**
   ```bash
   npm install      # Root packages (using pnpm)
   cd client && npm install  # Frontend packages
   ```
3. **Environment Setup**
   Configure your `.env` with SMTP and MySQL details (see `.env.example`).
4. **Development Mode**
   ```bash
   pnpm run dev
   ```

5. **Build for Production (Static)**
   ```bash
   pnpm run build:static
   ```

---

## 📈 Performance & Quality
- **Type Safety:** 100% TypeScript coverage from Database to UI.
- **Clean Code:** Adheres to enterprise standards (Zero inline comments, centralized Technical Documentation).
- **SEO Optimized:** Semantic HTML5 structure with meta-tag management.
- **Accessibility:** Radix-UI based accessible primitives.

---

**Crafted with 🧠 and 💻 by George Victor Kamal**
*Full Stack Software Engineer | Microsoft Certified Azure AI Engineer*
