# API Endpoints Documentation

Complete documentation of all API endpoints used by the Blog App Frontend.

---

## Base URL

```
https://blog-app-backend-v0sj.onrender.com
```

## Headers

All requests should include:

```javascript
{
  'Content-Type': 'application/json',
  'withCredentials': true  // Include cookies
}
```

---

## Authentication Endpoints

### Common API

#### Login

```http
POST /common-api/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "payload": {
    "userId": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "success": true
}
```

**Error Response (401):**

```json
{
  "error": "Invalid credentials",
  "success": false
}
```

---

#### Logout

```http
GET /common-api/logout
```

**Response (200 OK):**

```json
{
  "message": "Logged out successfully",
  "success": true
}
```

**Note:** Clears authentication cookies on server

---

#### Check Authentication

```http
GET /common-api/check-auth
```

**Response (200 OK) - User Authenticated:**

```json
{
  "payload": {
    "userId": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "AUTHOR"
  },
  "success": true
}
```

**Response (401) - Not Authenticated:**

```json
{
  "error": "Not authenticated",
  "success": false
}
```

**Usage:**

```javascript
const { checkAuth } = useAuth();

useEffect(() => {
  checkAuth(); // Called on app initialization
}, []);
```

---

#### Register

```http
POST /common-api/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Response (201 Created):**

```json
{
  "payload": {
    "userId": "124",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "success": true
}
```

**Validation Rules:**

- Email must be unique
- Email format must be valid
- Password minimum 8 characters
- Role must be USER or AUTHOR
- Name is required

---

## Article Endpoints

### Get All Articles

```http
GET /api/articles
```

**Query Parameters:**

```
?page=1
?limit=10
?category=technology
?search=keyword
?sort=date  // date, popularity, views
```

**Response (200 OK):**

```json
{
  "payload": [
    {
      "id": "article1",
      "title": "Getting Started with React",
      "description": "Learn React basics...",
      "content": "Full article content...",
      "author": {
        "id": "user123",
        "name": "John Doe"
      },
      "createdAt": "2024-05-15T10:30:00Z",
      "updatedAt": "2024-05-15T10:30:00Z",
      "views": 150,
      "likes": 25,
      "category": "technology",
      "tags": ["react", "javascript"]
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "success": true
}
```

---

### Get Article by ID

```http
GET /api/articles/:id
```

**Response (200 OK):**

```json
{
  "payload": {
    "id": "article1",
    "title": "Getting Started with React",
    "description": "Learn React basics...",
    "content": "Full article content...",
    "author": {
      "id": "user123",
      "name": "John Doe",
      "bio": "Full-stack developer"
    },
    "createdAt": "2024-05-15T10:30:00Z",
    "updatedAt": "2024-05-15T10:30:00Z",
    "views": 150,
    "likes": 25,
    "category": "technology",
    "tags": ["react", "javascript"],
    "featured": true
  },
  "success": true
}
```

**Response (404 Not Found):**

```json
{
  "error": "Article not found",
  "success": false
}
```

---

### Create Article

```http
POST /api/articles
```

**Authentication:** Required (AUTHOR or ADMIN)

**Request Body:**

```json
{
  "title": "My New Article",
  "description": "Article summary...",
  "content": "Full article content...",
  "category": "technology",
  "tags": ["react", "javascript"],
  "featuredImage": "image-url",
  "published": true
}
```

**Response (201 Created):**

```json
{
  "payload": {
    "id": "article2",
    "title": "My New Article",
    "description": "Article summary...",
    "content": "Full article content...",
    "author": {
      "id": "user123",
      "name": "John Doe"
    },
    "createdAt": "2024-05-15T14:00:00Z",
    "published": true
  },
  "success": true
}
```

**Validation:**

- Title required (max 200 characters)
- Content required (min 100 characters)
- Category from predefined list
- Tags array (max 5)

---

### Update Article

```http
PUT /api/articles/:id
```

**Authentication:** Required (Article author or ADMIN)

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated summary...",
  "content": "Updated content...",
  "category": "technology",
  "tags": ["react", "javascript", "hooks"],
  "published": true
}
```

**Response (200 OK):**

```json
{
  "payload": {
    "id": "article2",
    "title": "Updated Title",
    "description": "Updated summary...",
    "content": "Updated content...",
    "updatedAt": "2024-05-15T15:00:00Z",
    "version": 2
  },
  "success": true
}
```

**Response (403 Forbidden):**

```json
{
  "error": "Unauthorized to edit this article",
  "success": false
}
```

---

### Delete Article

```http
DELETE /api/articles/:id
```

**Authentication:** Required (Article author or ADMIN)

**Response (200 OK):**

```json
{
  "message": "Article deleted successfully",
  "success": true
}
```

**Response (403 Forbidden):**

```json
{
  "error": "Unauthorized to delete this article",
  "success": false
}
```

---

## User Endpoints

### Get User Profile

```http
GET /api/users/:userId
```

**Response (200 OK):**

```json
{
  "payload": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "AUTHOR",
    "bio": "Full-stack developer",
    "avatar": "avatar-url",
    "createdAt": "2024-01-01T00:00:00Z",
    "articlesCount": 15,
    "followers": 50
  },
  "success": true
}
```

---

### Update User Profile

```http
PUT /api/users/:userId
```

**Authentication:** Required (Same user or ADMIN)

**Request Body:**

```json
{
  "name": "John Doe",
  "bio": "Updated bio",
  "avatar": "new-avatar-url"
}
```

**Response (200 OK):**

```json
{
  "payload": {
    "id": "user123",
    "name": "John Doe",
    "bio": "Updated bio",
    "avatar": "new-avatar-url",
    "updatedAt": "2024-05-15T16:00:00Z"
  },
  "success": true
}
```

---

### Get Author's Articles

```http
GET /api/users/:authorId/articles
```

**Query Parameters:**

```
?page=1
?limit=10
?sort=date
```

**Response (200 OK):**

```json
{
  "payload": [
    {
      "id": "article1",
      "title": "Article Title",
      "description": "Summary...",
      "createdAt": "2024-05-15T10:30:00Z",
      "views": 100,
      "likes": 15
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 10,
  "success": true
}
```

---

## Category Endpoints

### Get All Categories

```http
GET /api/categories
```

**Response (200 OK):**

```json
{
  "payload": [
    {
      "id": "cat1",
      "name": "Technology",
      "slug": "technology",
      "description": "Tech related articles"
    },
    {
      "id": "cat2",
      "name": "Lifestyle",
      "slug": "lifestyle",
      "description": "Lifestyle articles"
    }
  ],
  "success": true
}
```

---

## Error Handling

### Common Error Codes

| Code | Status       | Message                    |
| ---- | ------------ | -------------------------- |
| 400  | Bad Request  | Invalid request parameters |
| 401  | Unauthorized | Authentication required    |
| 403  | Forbidden    | Insufficient permissions   |
| 404  | Not Found    | Resource not found         |
| 500  | Server Error | Internal server error      |

### Error Response Format

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "success": false
}
```

---

## Request Examples

### Login Example

```javascript
import axios from "axios";

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      "https://blog-app-backend-v0sj.onrender.com/common-api/login",
      { email, password },
      { withCredentials: true },
    );

    console.log("User logged in:", response.data.payload);
    return response.data.payload;
  } catch (error) {
    console.error("Login failed:", error.response?.data?.error);
    throw error;
  }
};
```

### Fetch Articles Example

```javascript
const getArticles = async (page = 1, category = null) => {
  try {
    const url = new URL(
      "https://blog-app-backend-v0sj.onrender.com/api/articles",
    );
    url.searchParams.append("page", page);
    url.searchParams.append("limit", 10);

    if (category) {
      url.searchParams.append("category", category);
    }

    const response = await axios.get(url.toString(), {
      withCredentials: true,
    });

    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
};
```

### Create Article Example

```javascript
const createArticle = async (articleData) => {
  try {
    const response = await axios.post(
      "https://blog-app-backend-v0sj.onrender.com/api/articles",
      articleData,
      { withCredentials: true },
    );

    console.log("Article created:", response.data.payload);
    return response.data.payload;
  } catch (error) {
    console.error("Failed to create article:", error.response?.data?.error);
    throw error;
  }
};
```

---

## Rate Limiting

**Note:** Check with backend team for rate limiting policies.

Typical rate limits may include:

- Login attempts: 5 per minute
- API requests: 100 per minute
- Upload size: 5MB per file

---

## CORS Configuration

The backend is configured to accept requests from the frontend with:

- Credentials enabled (cookies)
- Content-Type: application/json
- Origin: Your frontend domain

---

## API Response Format

All API responses follow a consistent format:

**Success Response:**

```json
{
  "payload": {...},
  "success": true,
  "message": "Optional success message"
}
```

**Error Response:**

```json
{
  "error": "Error description",
  "success": false,
  "code": "OPTIONAL_ERROR_CODE"
}
```

---

## Testing API Endpoints

### Using cURL

```bash
# Login
curl -X POST https://blog-app-backend-v0sj.onrender.com/common-api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  -c cookies.txt

# Get Articles
curl -X GET "https://blog-app-backend-v0sj.onrender.com/api/articles?page=1" \
  -b cookies.txt
```

### Using Postman

1. Set Base URL: `https://blog-app-backend-v0sj.onrender.com`
2. Enable cookie jar
3. Set headers: `Content-Type: application/json`
4. Test endpoints with provided examples above

---

## Pagination

All list endpoints support pagination:

**Request:**

```
GET /api/articles?page=2&limit=20
```

**Response Structure:**

```json
{
  "payload": [...],
  "total": 100,
  "page": 2,
  "limit": 20,
  "pages": 5
}
```

---

## Sorting

Article endpoints support sorting:

**Request:**

```
GET /api/articles?sort=date  // newest first
GET /api/articles?sort=date:asc  // oldest first
GET /api/articles?sort=popularity  // most liked
GET /api/articles?sort=views  // most viewed
```

---

## Filtering

Articles can be filtered by:

**Request:**

```
GET /api/articles?category=technology
GET /api/articles?author=user123
GET /api/articles?published=true
GET /api/articles?search=react
```

---

## Environment Variables

For production, store API URL in environment variables:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://blog-app-backend-v0sj.onrender.com";
```

Create `.env.local`:

```
VITE_API_BASE_URL=https://blog-app-backend-v0sj.onrender.com
```

---

## Troubleshooting API Issues

### CORS Errors

- Ensure `withCredentials: true` is set
- Check backend CORS configuration
- Verify correct base URL

### 401 Unauthorized

- User session may have expired
- Call `checkAuth()` to refresh
- Clear cookies and login again

### 403 Forbidden

- User lacks required permissions
- Check user role
- Verify resource ownership

### Timeout Issues

- Backend may be down or slow
- Check network connection
- Retry request with exponential backoff
