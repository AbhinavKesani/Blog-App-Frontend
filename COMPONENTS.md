# Components Documentation

Detailed documentation for all React components in the Blog App Frontend.

---

## Table of Contents

- [Authentication Components](#authentication-components)
- [Layout Components](#layout-components)
- [Page Components](#page-components)
- [Dashboard Components](#dashboard-components)
- [Article Management](#article-management)
- [Utility Components](#utility-components)

---

## Authentication Components

### Login.jsx

**Purpose:** Handles user login functionality

**Props:** None (uses global auth store)

**State:**

- Form data (email, password)
- Loading state
- Error messages

**Features:**

- Email and password validation
- "Remember me" option (if applicable)
- Error toast notifications
- Redirect to dashboard after login
- Link to registration page

**Usage:**

```jsx
import Login from "./components/Login";

// Rendered in router configuration
```

**Key Actions:**

- Calls `useAuth().login()` on form submit
- Stores user data in Zustand store
- Redirects based on user role

---

### Register.jsx

**Purpose:** Handles new user registration

**Props:** None

**Form Fields:**

- Full Name
- Email
- Password
- Confirm Password
- Role Selection (User/Author)

**Features:**

- Password strength validation
- Email format validation
- Password confirmation match
- Role selection dropdown
- Error handling with toast notifications

**Usage:**

```jsx
import Register from "./components/Register";

// Rendered in router configuration
```

**Validation Rules:**

- Email must be valid format
- Password minimum 8 characters
- Passwords must match
- All fields required

---

### ProtectedRoute.jsx

**Purpose:** Guards routes based on authentication and user role

**Props:**

- `children` - Component to render if authorized
- `allowedRoles` - Array of allowed roles (e.g., ["AUTHOR", "ADMIN"])

**Logic Flow:**

1. Check if user is authenticated
2. Verify user role is in allowedRoles
3. Render children if authorized
4. Redirect to login if not authenticated
5. Redirect to Unauthorized if role not allowed

**Usage:**

```jsx
<ProtectedRoute allowedRoles={["AUTHOR"]}>
  <WriteArticle />
</ProtectedRoute>
```

---

## Layout Components

### RouteLayout.jsx

**Purpose:** Main layout wrapper for all pages

**Contains:**

- Header component (top)
- Page content (children)
- Footer component (bottom)

**Features:**

- Responsive grid layout
- Sticky header
- Consistent styling across pages
- Footer always at bottom

**Usage:**

```jsx
// Rendered as main route element in router
```

---

### Header.jsx

**Purpose:** Navigation bar and user menu

**Features:**

- Display app logo/name
- Navigation links
- User authentication status indicator
- User profile dropdown
- Logout button
- Role-based menu options

**Navigation Links by Role:**
| User | Author | Admin |
|------|--------|-------|
| Home | Home | Home |
| Profile | Write Article | Admin Dashboard |
| | Author Dashboard | |
| | My Articles | |

**Usage:**

```jsx
import Header from "./components/Header";

// Used in RouteLayout
```

---

### Footer.jsx

**Purpose:** Application footer

**Contains:**

- Copyright information
- Company/Author details
- Quick links
- Social media links (if applicable)

**Usage:**

```jsx
import Footer from "./components/Footer";

// Used in RouteLayout
```

---

## Page Components

### Home.jsx

**Purpose:** Homepage - displays all published articles

**Features:**

- Article grid/list view
- Search functionality
- Filter by category (if applicable)
- Article cards with preview
- Links to full articles
- Load more / pagination

**Article Card Shows:**

- Article title
- Author name
- Publication date
- Article excerpt
- Category tags

**Usage:**

```jsx
import Home from "./components/Home";

// Rendered at route "/"
```

---

### ArticleById.jsx

**Purpose:** Display full article content

**Route:** `/article/:id`

**Features:**

- Full article text
- Author information with link
- Publication and update dates
- Article metadata (category, tags)
- Comments section (if applicable)
- Like/Save functionality
- Navigation to next/previous articles

**Data Fetched:**

- Article content from `/api/articles/:id`
- Author details
- Related articles

**Usage:**

```jsx
import ArticleById from "./components/ArticleById";

// Rendered at dynamic route
```

---

## Dashboard Components

### UserDashboard.jsx

**Purpose:** User profile and account dashboard

**Route:** `/user-profile` (Protected - USER role)

**Features:**

- Display user profile information
- Account settings
- Saved articles/bookmarks list
- User activity history
- Profile edit functionality

**Displays:**

- User name and email
- Join date
- Total articles read
- Bookmarked articles

**Usage:**

```jsx
import UserDashboard from "./components/UserDashboard";

// Protected route for USER role
```

---

### AuthorDashboard.jsx

**Purpose:** Author control panel

**Route:** `/author-dashboard` (Protected - AUTHOR role)

**Features:**

- List of user's authored articles
- Article statistics (views, likes)
- Quick stats dashboard
- Links to create new article
- Links to edit articles
- View article analytics

**Statistics Shown:**

- Total articles written
- Total views
- Total likes
- Most popular article

**Actions:**

- Create new article button
- Edit article button
- Delete article button
- View article details

**Usage:**

```jsx
import AuthorDashboard from "./components/AuthorDashboard";

// Protected route for AUTHOR role
```

---

### AdminDashboard.jsx

**Purpose:** Administrator control panel

**Route:** `/admin-dashboard` (Protected - ADMIN role)

**Features:**

- Overview of all articles
- User management
- Content moderation
- System statistics
- Report generation

**Statistics:**

- Total users
- Total articles
- Total views
- System health

**Actions:**

- View all users
- View all articles
- Moderate content
- Manage reports

**Usage:**

```jsx
import AdminDashboard from "./components/AdminDashboard";

// Protected route for ADMIN role
```

---

### AdminProfile.jsx

**Purpose:** Admin account management

**Route:** `/admin-profile` (Protected - ADMIN role)

**Features:**

- Admin profile information
- Account settings
- Administrative preferences
- Security settings

**Usage:**

```jsx
import AdminProfile from "./components/AdminProfile";

// Protected route for ADMIN role
```

---

## Article Management

### WriteArticle.jsx

**Purpose:** Create new blog articles

**Route:** `/write-article` (Protected - AUTHOR role)

**Form Fields:**

- Article Title
- Article Description/Excerpt
- Article Content (rich text editor)
- Category Selection
- Tags
- Featured Image (optional)
- Publish Settings

**Features:**

- Rich text editor for content
- Real-time preview
- Auto-save drafts
- Publish/Save as draft options
- Cancel button
- Validation before submit

**Actions:**

- POST to `/api/articles` on publish
- Save as draft
- Preview article
- Discard changes

**Usage:**

```jsx
import WriteArticle from "./components/WriteArticle";

// Protected route for AUTHOR role
```

---

### EditArticle.jsx

**Purpose:** Edit existing articles

**Route:** `/edit-article/:id` (Protected - AUTHOR role)

**Features:**

- Pre-populate form with article data
- All WriteArticle features
- Update existing article
- Change publication status
- View revision history (optional)

**Form Pre-population:**

- Fetch article data from API
- Display current values
- Allow updates to all fields

**Actions:**

- PUT to `/api/articles/:id` on save
- Revert to previous version
- Publish/Unpublish
- Delete article

**Usage:**

```jsx
import EditArticle from "./components/EditArticle";

// Protected route for AUTHOR role
```

---

### AuthorArticles.jsx

**Purpose:** Display all articles by a specific author

**Route:** `/author/:authorId/articles`

**Features:**

- Author profile header
- Author's article list
- Filter options
- Sort by date/popularity
- Pagination
- Author information

**Author Info Shows:**

- Author name and bio
- Profile picture
- Total articles written
- Join date
- Follow button (if applicable)

**Article List:**

- Title
- Publication date
- View count
- Like count
- Link to article

**Usage:**

```jsx
import AuthorArticles from "./components/AuthorArticles";

// Public route for viewing author's work
```

---

## Utility Components

### ErrorBoundary.jsx

**Purpose:** Catch and handle React errors

**Features:**

- Catches JavaScript errors in child components
- Displays fallback UI
- Prevents complete app crash
- Error logging
- Retry option

**Fallback UI Shows:**

- Error message
- Stack trace (development only)
- Retry button
- Go Home button

**Usage:**

```jsx
import ErrorBoundary from "./components/ErrorBoundary";

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>;
```

**Error Handling:**

```javascript
// Catches errors in:
// - Render methods
// - Lifecycle methods
// - Constructors
// Does NOT catch:
// - Event handlers (use try-catch)
// - Async code (use try-catch)
// - Server-side rendering
```

---

### Unauthorized.jsx

**Purpose:** Display 403 Forbidden error

**Route:** `/unauthorized`

**Features:**

- Clear error message
- Explanation of why access denied
- Navigation options
- Go to home button
- Go to login button
- Contact support link (optional)

**Usage:**

```jsx
import Unauthorized from "./components/Unauthorized";

// Rendered when user lacks permissions
```

---

## Component Dependency Graph

```
App.jsx
├── RouteLayout
│   ├── Header
│   ├── [Page Component]
│   └── Footer
├── Login
├── Register
└── ProtectedRoute (wrapper)
    ├── UserDashboard
    ├── AuthorDashboard
    ├── AdminDashboard
    ├── WriteArticle
    ├── EditArticle
    └── [Other protected routes]

Home
├── ArticleCard (list)
└── ArticleById

AuthorArticles
├── AuthorProfile
└── ArticleCard (list)

ErrorBoundary (wrapper for any component)
```

---

## Best Practices

### When Creating New Components

1. **Use Functional Components** with React Hooks
2. **Extract Styles** to external CSS or use Tailwind CSS
3. **Prop Validation** - Define clear prop types
4. **Error Handling** - Use ErrorBoundary and try-catch
5. **Loading States** - Show loading indicators
6. **User Feedback** - Use toast notifications for actions
7. **Accessibility** - Use semantic HTML and ARIA labels
8. **Performance** - Memoize if needed, lazy load routes

### Component Structure Template

```jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";

/**
 * ComponentName - Description of what this component does
 *
 * @component
 * @example
 * return (
 *   <ComponentName prop1="value" />
 * )
 */
function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Initialize component
  }, []);

  const handleAction = async () => {
    try {
      setLoading(true);
      // API call
      toast.success("Success!");
    } catch (err) {
      setError(err.message);
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return <div>{/* JSX content */}</div>;
}

export default ComponentName;
```

---

## Testing Components

### Manual Testing Checklist

- [ ] Component renders without errors
- [ ] Props are passed correctly
- [ ] Loading states display properly
- [ ] Error states show appropriate messages
- [ ] User interactions work as expected
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Accessibility features work (keyboard navigation, screen readers)
- [ ] Protected routes redirect properly
- [ ] Toast notifications display correctly
- [ ] API integration works as expected
