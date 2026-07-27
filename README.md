# 🚀 Sumanth Reddy Kasireddy — 3D Interactive Portfolio & RAG AI Assistant

An interactive, high-performance 3D developer portfolio and RAG-powered AI assistant application built by **Sumanth Reddy Kasireddy**. 

This web application combines modern 3D graphics, fluid scroll animations, micro-interactions, and a custom vector-search AI chatbot to showcase full-stack projects, technical skills, and professional experience.

---

## ✨ Features

- 🎨 **3D Visual Experience**: Immersive 3D scenes and canvas particle effects powered by Three.js and `@react-three/fiber`.
- 🤖 **RAG AI Assistant (ChatBot)**:
  - Context-aware chatbot trained on resume and profile data.
  - **Embedding Engine**: Jina AI (`jina-embeddings-v3`, 1024-dimensional vectors).
  - **Vector Database**: Supabase PostgreSQL with `pgvector` extension.
  - **LLM Inference**: Groq API for rapid streaming response generation.
- ⚡ **Fluid Animations & Micro-Interactions**: Smooth scrolling using **Lenis**, complex scroll triggers with **GSAP**, and interactive motion elements powered by **Framer Motion**.
- 💼 **Project & Work Showcase**: Interactive gallery of full-stack projects with live demo links, repository links, and tech stack tags.
- 📬 **Interactive Contact System**: Integrated contact form with EmailJS and serverless API fallback.
- 📊 **Analytics & Insights**: Integrated with Vercel Analytics and Speed Insights for real-time performance optimization.

---

## 🛠️ Tech Stack

### **Frontend & UI**
- **Core Framework**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling & Fonts**: Tailwind CSS v4, `@fontsource-variable/geist`, Lucide Icons, Shadcn UI / Base UI
- **3D & Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), OGL
- **Animation**: GSAP (ScrollTrigger, SplitText), Framer Motion, Lenis Smooth Scroll

### **Backend & AI Pipeline**
- **Serverless API**: Vercel Serverless Functions (`/api/chat`, `/api/contact`)
- **Vector Search & Storage**: Supabase (PostgreSQL with `pgvector`)
- **Embeddings Model**: Jina AI (`jina-embeddings-v3`)
- **LLM**: Groq LLaMA models (`@google/generative-ai` fallback)
- **Communication**: EmailJS Browser Integration

---

## 📁 Project Structure

```text
portfolio/
├── api/                      # Vercel Serverless Functions
│   ├── chat.js               # RAG AI Chatbot Endpoint (Jina + Supabase + Groq)
│   └── contact.js            # Contact Form Endpoint
├── public/                   # Static assets, 3D models (.gltf/.glb), textures
├── scripts/
│   └── seed-embeddings.mjs   # Utility script to vectorize & seed resume data into Supabase
├── src/
│   ├── components/           # Reusable UI & 3D Components
│   │   ├── ChatBot.jsx       # Interactive AI ChatBot Widget
│   │   ├── KeyBoard.jsx      # Interactive 3D Keyboard Scene
│   │   └── ui/               # Tailored UI primitives
│   ├── constants/            # Resume data, portfolio projects, and configuration
│   │   ├── index.js          # Navigation links, project list, tech stack details
│   │   └── resumeData.js     # Structured resume content for RAG embedding
│   ├── sections/             # Main page sections
│   │   ├── Navbar.jsx        # Navigation header
│   │   ├── Hero.jsx          # Hero section with 3D canvas
│   │   ├── About.jsx         # Background, bio, and skills grid
│   │   ├── Work.jsx          # Featured projects showcase
│   │   ├── Contact.jsx       # Contact form section
│   │   ├── Footer.jsx        # Footer & social links
│   │   └── Particles.jsx     # Background particle visualizer
│   ├── App.jsx               # Main Application Component
│   ├── index.css             # Design tokens & global tailwind styles
│   └── main.jsx              # Application entry point
├── package.json              # Dependencies and scripts
└── vite.config.js            # Vite build configuration
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### **Prerequisites**
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### **1. Clone the Repository**
```bash
git clone https://github.com/Sumanthreddy4620/Anti_Portfolio.git
cd Anti_Portfolio/portfolio
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
Create a `.env` file in the `portfolio` root folder and populate the following keys:

```env
# AI Assistant & RAG Configuration
GROQ_API_KEY=your_groq_api_key
VITE_GROQ_API_KEY=your_groq_api_key

# Supabase Vector Database
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Jina AI Embeddings
JINA_API_KEY=your_jina_api_key
```

### **4. (Optional) Seed AI Embeddings**
To generate and store vector embeddings for the AI Assistant into Supabase:
```bash
node scripts/seed-embeddings.mjs
```

### **5. Run Development Server**
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to view the portfolio.

---

## 📜 Available Scripts

In the `portfolio` directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the local Vite development server with HMR. |
| `npm run build` | Bundles the application for production deployment. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint to check for code quality and formatting issues. |
| `node scripts/seed-embeddings.mjs` | Seeds resume embeddings into Supabase vector database. |

---

## 📬 Contact & Connect

**Sumanth Reddy Kasireddy**  
- **Portfolio**: [sumanthreddykasireddy.vercel.app](https://sumanthreddykasireddy.vercel.app)
- **LinkedIn**: [linkedin.com/in/sumanthreddy-kasireddy-72b6662a9](https://www.linkedin.com/in/sumanthreddy-kasireddy-72b6662a9/)
- **GitHub**: [@Sumanthreddy4620](https://github.com/Sumanthreddy4620)
- **Email**: [k.sumanthreddy4620@gmail.com](mailto:k.sumanthreddy4620@gmail.com)

---

⭐ *If you like this project, feel free to give it a star on GitHub!*
