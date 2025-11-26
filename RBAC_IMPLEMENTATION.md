# Role-Based Authentication Implementation Summary

## ✅ What Was Implemented

### 1. **User Model Updates** (`server/models/User.js`)
- Added `role` field with enum values: `['admin', 'teacher', 'student']`
- Default role is set to `'student'`
- Role is required for all users

### 2. **Authentication Middleware** (`server/middleware/auth.js`)
Enhanced with role-based authorization:
- `requireAuth` - Basic authentication (updated to include role in req.user)
- `requireRole(...roles)` - Check if user has any of the specified roles
- `requireAdmin` - Admin-only access
- `requireTeacher` - Admin or Teacher access
- `requireStudent` - Any authenticated user access

### 3. **Auth Routes** (`server/routes/auth.js`)
Updated to handle roles:
- Registration now accepts `role` parameter
- Login returns user role information
- JWT tokens include role information
- Default role assignment for new users

### 4. **Admin Routes** (`server/routes/admin.js`) - NEW
Created admin and teacher endpoints:
- `GET /api/admin/users` - List all users (Admin only)
- `PUT /api/admin/users/:id/role` - Update user role (Admin only)
- `DELETE /api/admin/users/:id` - Delete user (Admin only)
- `GET /api/admin/dashboard` - Dashboard stats (Admin & Teacher)

### 5. **Server Integration** (`server/index.js`)
- Added admin routes to the Express app
- Routes are available at `/api/admin/*`

## 📁 Files Created/Modified

### Modified:
1. ✏️ `server/models/User.js` - Added role field
2. ✏️ `server/middleware/auth.js` - Added role-based middleware
3. ✏️ `server/routes/auth.js` - Updated for role support
4. ✏️ `server/index.js` - Added admin routes

### Created:
5. ✨ `server/routes/admin.js` - Admin & teacher endpoints
6. ✨ `ROLE_BASED_AUTH.md` - Complete API documentation
7. ✨ `server/test-rbac.js` - Test script
8. ✨ `RBAC_IMPLEMENTATION.md` - This summary

## 🚀 How to Use

### 1. Start the Server
```bash
npm run dev
# or
npm start
```

### 2. Register Users with Different Roles

**Admin:**
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

**Teacher:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@school.com",
    "password": "teacher123",
    "name": "Teacher User",
    "role": "teacher"
  }'
```

**Student:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@school.com",
    "password": "student123",
    "name": "Student User",
    "role": "student"
  }'
```

### 3. Login and Get Access Token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "admin123"
  }'
```

Save the `accessToken` from the response.

### 4. Test Role-Based Endpoints

**Admin - View All Users:**
```bash
curl -X GET http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Teacher - View Dashboard:**
```bash
curl -X GET http://localhost:3000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Admin - Update User Role:**
```bash
curl -X PUT http://localhost:3000/api/admin/users/USER_ID/role \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "teacher"}'
```

### 5. Run Automated Tests
```bash
node server/test-rbac.js
```

## 🔐 Security Features

1. **Password Hashing**: All passwords are hashed with bcrypt
2. **JWT Tokens**: 
   - Access tokens expire in 15 minutes
   - Refresh tokens expire in 7 days
   - Include user ID, email, and role
3. **Role Validation**: Roles are validated on registration and updates
4. **Middleware Protection**: Routes are protected by authentication and authorization
5. **Error Handling**: Proper error messages for unauthorized access

## 📊 Access Control Matrix

| Endpoint | Student | Teacher | Admin |
|----------|---------|---------|-------|
| GET /api/admin/users | ❌ | ❌ | ✅ |
| PUT /api/admin/users/:id/role | ❌ | ❌ | ✅ |
| DELETE /api/admin/users/:id | ❌ | ❌ | ✅ |
| GET /api/admin/dashboard | ❌ | ✅ | ✅ |
| GET /api/user/profile | ✅ | ✅ | ✅ |

## 🎯 Next Steps

To extend the system, you can:

1. **Add More Endpoints**: Create role-specific routes for students and teachers
2. **Frontend Integration**: Build UI components that check user roles
3. **Permissions**: Add granular permissions beyond roles
4. **Audit Logs**: Track role changes and admin actions
5. **Multi-tenancy**: Add school/organization scoping

## 📝 Example: Adding a New Protected Route

```javascript
// In any route file
import { requireAuth, requireRole } from '../middleware/auth.js';

// Only teachers and admins can create assignments
router.post('/assignments', 
  requireAuth, 
  requireRole('teacher', 'admin'), 
  async (req, res) => {
    // Your logic here
    // Access user info via req.user
    console.log('User role:', req.user.role);
  }
);
```

## 🐛 Troubleshooting

**Issue: "Access denied" error**
- Check that the user has the correct role in the database
- Verify the JWT token includes the role claim
- Ensure middleware is applied in correct order

**Issue: "No token provided"**
- Make sure to include `Authorization: Bearer <token>` header
- Token should be from the login/register response

**Issue: "Invalid token"**
- Token may have expired (15 minutes)
- Use refresh token endpoint to get a new access token

## 📖 Documentation

For complete API documentation, see `ROLE_BASED_AUTH.md`
