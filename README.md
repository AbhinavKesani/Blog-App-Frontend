# Blog App - Frontend

A blogging platform built with React, Vite, and Tailwind CSS with user authentication, article management, and role-based access control.

---

##  Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm 

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Blog-App-FrontEnd

# Install dependencies
npm install

# Start development server
npm run dev


The app will be available at `http://localhost:5173`

---

##  Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint code checker
```

---

##  Tech Stack

- **React** 19.2.0 - UI Framework
- **Vite** 7.3.1 - Build tool & dev server
- **React Router** 7.13.1 - Routing
- **Tailwind CSS** 4.2.1 - Styling
- **Zustand** 5.0.11 - State management
- **Axios** 1.13.6 - HTTP requests
- **React Hook Form** 7.71.2 - Form handling
- **React Hot Toast** 2.6.0 - Notifications

---

##  Project Structure

```
src/
├── components/      # React components
├── store/          # Zustand auth store
├── styles/         # CSS utilities
├── assets/         # Images & fonts
├── App.jsx         # Root component
└── main.jsx        # Entry point
```

---

##  User Roles & Features

**User** - Read articles, manage profile
**Author** - User access + Create/edit articles  
**Admin** - Full access + Content moderation

---

##  API Configuration

**Backend URL:** `https://blog-app-backend-dvt6.onrender.com`

Main endpoints:

- `POST /common-api/login` - Login
- `POST /common-api/register` - Register
- `GET /common-api/check-auth` - Verify session
- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create article (Author/Admin)
  │ │ ├── ArticleById.jsx # Single article view
  │ │ ├── AuthorArticles.jsx # Author's article list
  │ │ ├── AuthorDashboard.jsx # Author panel
  │ │ ├── EditArticle.jsx # Article editor
  │ │ ├── ErrorBoundary.jsx # Error handling wrapper
  │ │ ├── Footer.jsx # App footer
  │ │ ├── Header.jsx # App header/navbar
  │ │ ├── Home.jsx # Homepage
  │ │ ├── Login.jsx # Login form
  │ │ ├── ProtectedRoute.jsx # Route guard component
  │ │ ├── Register.jsx # Registration form
  │ │ ├── RouteLayout.jsx # Layout wrapper
  │ │ ├── Unauthorized.jsx # 403 page



 ## deployed link
 https://frontend-alpha-nine-sd0rzv1y1b.vercel.app/updated 
