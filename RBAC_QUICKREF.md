# 🎯 Role-Based Authentication Quick Reference

## 👥 Available Roles
- **admin**: Full system access
- **teacher**: Teaching resources & student data
- **student**: Basic student features

## 🔑 Key Endpoints

### Authentication
```
POST /api/auth/register  - Register new user (include role)
POST /api/auth/login     - Login and get access token
POST /api/auth/refresh   - Refresh access token
POST /api/auth/logout    - Logout user
```

### Admin Only
```
GET    /api/admin/users         - List all users
PUT    /api/admin/users/:id/role - Update user role
DELETE /api/admin/users/:id     - Delete user
```

### Teacher & Admin
```
GET /api/admin/dashboard - Get dashboard statistics
```

## 🛠️ Middleware Usage

```javascript
import { requireAuth, requireAdmin, requireTeacher, requireRole } from './middleware/auth.js';

// Any authenticated user
router.get('/profile', requireAuth, handler);

// Admin only
router.delete('/users/:id', requireAuth, requireAdmin, handler);

// Teacher or Admin
router.get('/grades', requireAuth, requireTeacher, handler);

// Custom roles
router.post('/assignment', requireAuth, requireRole('teacher', 'admin'), handler);
```

## 📝 Registration Example

```json
POST /api/auth/register
{
  "email": "user@school.com",
  "password": "password123",
  "name": "John Doe",
  "role": "student"  // or "teacher" or "admin"
}
```

## 🔐 Making Authenticated Requests

```bash
curl -X GET http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🧪 Test the System

```bash
node server/test-rbac.js
```

## 📚 Full Documentation

- `ROLE_BASED_AUTH.md` - Complete API documentation
- `RBAC_IMPLEMENTATION.md` - Implementation details
