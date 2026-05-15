# Contributing Guidelines

Thank you for your interest in contributing to the Blog App Frontend! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [Testing](#testing)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our values:

- **Be Respectful:** Treat all contributors with respect
- **Be Inclusive:** Welcome contributors of all backgrounds
- **Be Collaborative:** Work together to improve the project
- **Be Professional:** Maintain professional communication

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**

   ```bash
   # On GitHub, click "Fork"
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Blog-App-FrontEnd.git
   cd Blog-App-FrontEnd
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/Blog-App-FrontEnd.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Run linter**
   ```bash
   npm run lint
   ```

---

## Development Workflow

### Understanding the Project Structure

```
src/
├── components/          # React components
├── store/              # Zustand state management
├── styles/             # Styling utilities
├── assets/             # Images, fonts, etc.
├── App.jsx             # Root component
└── main.jsx            # Entry point
```

### Creating a Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Branch Naming Conventions

- `feature/add-search` - New feature
- `fix/login-bug` - Bug fix
- `docs/update-readme` - Documentation
- `refactor/optimize-api-calls` - Refactoring
- `test/add-component-tests` - Tests

---

## Coding Standards

### Component Style

Use functional components with React Hooks:

```jsx
import React, { useState, useEffect } from "react";

function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Side effects
  }, []);

  const handleAction = async () => {
    try {
      // Logic
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <div>{/* JSX */}</div>;
}

export default MyComponent;
```

### Naming Conventions

**Components:** PascalCase

```jsx
function UserDashboard() {}
function ArticleCard() {}
```

**Functions:** camelCase

```javascript
function handleSubmit() {}
function fetchArticles() {}
```

**Constants:** UPPER_SNAKE_CASE

```javascript
const MAX_ARTICLES = 10;
const API_BASE_URL = "...";
```

**Files:**

- Components: `ComponentName.jsx`
- Utilities: `utilityName.js`
- Stores: `storeName.js`

### Code Formatting

Use ESLint to format code:

```bash
npm run lint
```

### Comments and Documentation

```javascript
/**
 * Fetches articles from the API
 *
 * @param {number} page - Page number for pagination
 * @param {string} category - Article category filter
 * @returns {Promise<Article[]>} Array of articles
 */
async function fetchArticles(page = 1, category = null) {
  // Implementation
}

// Single line comment for complex logic
const result = calculation(); // Inline comment if needed
```

### Error Handling

Always include error handling:

```javascript
try {
  const response = await axios.post("/api/endpoint", data);
  return response.data;
} catch (error) {
  console.error("Failed to fetch data:", error);
  throw new Error("Failed to fetch data");
}
```

### Import Organization

```javascript
// 1. React imports
import React, { useState, useEffect } from "react";

// 2. Third-party imports
import axios from "axios";
import { useAuth } from "zustand-store";

// 3. Local imports
import Header from "./components/Header";
import { API_URL } from "./config";

// 4. Styles
import "./styles.css";
```

---

## Git Workflow

### Creating Commits

1. **Stage changes**

   ```bash
   git add src/components/MyComponent.jsx
   ```

2. **Commit with clear message**

   ```bash
   git commit -m "feat: add user profile component"
   ```

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Keeping Your Branch Updated

```bash
# Fetch latest upstream changes
git fetch upstream

# Rebase your branch
git rebase upstream/main

# If conflicts occur, resolve them and continue
git rebase --continue
```

---

## Commit Messages

### Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding tests
- `chore` - Build process, dependencies

### Examples

```
feat: add search functionality to article list

- Add search input to Home component
- Filter articles by title and description
- Debounce search input for performance

Fixes #123
```

```
fix: resolve authentication redirect loop

The user was being redirected infinitely when checking auth status.
Now checkAuth only updates state if response is successful.

Fixes #456
```

```
docs: update API documentation with new endpoints
```

---

## Pull Requests

### Before Creating a PR

- [ ] Code follows coding standards
- [ ] All tests pass: `npm run lint`
- [ ] Branch is updated with latest main: `git rebase upstream/main`
- [ ] Commits are clean and well-organized
- [ ] No console errors or warnings

### Creating a PR

1. **Push your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues

Fixes #123

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

How have you tested these changes?

## Screenshots (if applicable)

Screenshots of UI changes

## Checklist

- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No new warnings
```

### PR Review Process

1. **Review by maintainers**
   - Check code quality
   - Verify functionality
   - Request changes if needed

2. **Address feedback**
   - Make requested changes
   - Push updates
   - Ensure CI passes

3. **Merge**
   - PR approved
   - Branch merged to main
   - Branch deleted

---

## Testing

### Running Tests

```bash
# Run linter
npm run lint

# Build check
npm run build
```

### Testing Guidelines

- Test new features locally before submitting PR
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design on mobile/tablet/desktop
- Test with different user roles
- Test error scenarios

### Manual Testing Checklist

- [ ] Feature works as described
- [ ] No console errors
- [ ] No console warnings
- [ ] Responsive on all screen sizes
- [ ] Keyboard navigation works
- [ ] Loading states display correctly
- [ ] Error states show appropriate messages
- [ ] API calls succeed/fail gracefully

---

## Documentation

### When to Update Documentation

- [ ] Adding new components
- [ ] Changing API endpoints
- [ ] Modifying authentication flow
- [ ] Adding new features
- [ ] Fixing bugs
- [ ] Improving existing features

### Documentation Files

- `README.md` - Project overview and setup
- `COMPONENTS.md` - Component documentation
- `API.md` - API endpoints
- `CONTRIBUTING.md` - This file
- Code comments - In-code documentation

### Documentation Style

```markdown
# Heading 1

## Heading 2

**Bold text** for emphasis

- Bullet points
- For lists

`code` for inline code

\`\`\`javascript
// Code blocks
\`\`\`

[Link text](url) for links
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :5173
kill -9 <PID>
```

#### Dependencies Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Git Conflicts

```bash
# During rebase, if conflicts occur:
# 1. Open conflicted files
# 2. Resolve conflicts (keep needed code)
# 3. Stage resolved files
git add .

# 4. Continue rebase
git rebase --continue
```

#### Linting Errors

```bash
# Run linter to see errors
npm run lint

# Some can be auto-fixed (be cautious)
# Check code and ensure it's correct
```

---

## Questions?

- **Issues:** Open an issue on GitHub
- **Discussions:** Use GitHub Discussions
- **Email:** Contact project maintainers

---

## License

By contributing to this project, you agree that your contributions will be licensed under the project's license.

---

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to make Blog App better! 🎉
