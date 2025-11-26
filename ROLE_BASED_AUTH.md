# Role-Based Authentication API Documentation

## Overview
The system implements role-based access control (RBAC) with three roles:
- **admin**: Full system access
- **teacher**: Access to teaching resources and student data
- **student**: Basic access to student features

## User Model
```javascript
{
  name: String,
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  bio: String,
  avatar: String,
  role: String (enum: ['admin', 'teacher', 'student'], default: 'student')
}
```

## Authentication Endpoints

### 1. Register
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "student" // Optional: "admin", "teacher", or "student" (default: "student")
}
```

**Response:**
```json
{
  "accessToken": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

### 3. Refresh Token
**POST** `/api/auth/refresh`

**Headers:**
- Cookie: `refreshToken=token_here`

**Response:**
```json
{
  "accessToken": "new_jwt_token_here"
}
```

### 4. Logout
**POST** `/api/auth/logout`

**Response:**
```json
{
  "success": true
}
```

## Admin Endpoints (Admin Only)

### 1. Get All Users
**GET** `/api/admin/users`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "users": [
    {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "student",
      "createdAt": "2025-11-25T00:00:00.000Z"
    }
  ]
}
```

### 2. Update User Role
**PUT** `/api/admin/users/:id/role`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "role": "teacher"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "teacher"
  }
}
```

### 3. Delete User
**DELETE** `/api/admin/users/:id`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

## Teacher Endpoints (Admin & Teacher)

### 1. Get Dashboard Stats
**GET** `/api/admin/dashboard`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "Teacher dashboard data",
  "stats": {
    "totalStudents": 50,
    "totalTeachers": 10,
    "totalAdmins": 2
  },
  "user": {
    "id": "user_id",
    "role": "teacher",
    "email": "teacher@example.com"
  }
}
```

## Middleware Usage

### In Your Routes

```javascript
import { requireAuth, requireAdmin, requireTeacher, requireRole } from './middleware/auth.js';

// Require authentication only
router.get('/profile', requireAuth, (req, res) => {
  // req.user contains { id, role, email, name }
});

// Require admin role
router.delete('/users/:id', requireAuth, requireAdmin, (req, res) => {
  // Only admins can access
});

// Require teacher or admin role
router.get('/grades', requireAuth, requireTeacher, (req, res) => {
  // Teachers and admins can access
});

// Custom role requirements
router.post('/assignment', requireAuth, requireRole('teacher', 'admin'), (req, res) => {
  // Only teachers and admins can access
});
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied. Insufficient permissions.",
  "requiredRole": ["admin"],
  "userRole": "student"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

## Testing with cURL

### Register as Admin
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "admin123",
    "name": "Admin User",
    "role": "admin"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "admin123"
  }'
```

### Access Protected Route
```bash
curl -X GET http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update User Role
```bash
curl -X PUT http://localhost:3000/api/admin/users/USER_ID/role \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "teacher"
  }'
```

## Security Notes

1. **Password Hashing**: Passwords are hashed using bcrypt before storage
2. **JWT Tokens**: 
   - Access tokens expire in 15 minutes
   - Refresh tokens expire in 7 days
   - Tokens include user ID, email, and role
3. **Role Validation**: Roles are validated on both registration and role updates
4. **Default Role**: If no role is specified during registration, user defaults to "student"
5. **Admin Privileges**: Only admins can change user roles and delete users

## Frontend Integration Example

```javascript
// Register
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'student@school.com',
    password: 'password123',
    name: 'Student Name',
    role: 'student'
  })
});
const { accessToken, user } = await response.json();
localStorage.setItem('accessToken', accessToken);

// Make authenticated request
const protectedResponse = await fetch('/api/admin/dashboard', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
});
```
