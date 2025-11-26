# Frontend Role-Based Access Control

## Dashboard - Admin Only Access

The Dashboard page is now restricted to **admin users only**.

## Implementation Details

### 1. **RoleProtectedRoute Component** (`src/RoleProtectedRoute.jsx`)
A reusable component that protects routes based on user roles.

**Usage:**
```jsx
<RoleProtectedRoute allowedRoles={["admin"]}>
  <Dashboard />
</RoleProtectedRoute>
```

**Props:**
- `allowedRoles`: Array of roles that can access the route (e.g., `["admin"]`, `["admin", "teacher"]`)
- `children`: The component to render if authorized
- `redirectTo`: Where to redirect if not authorized (default: `"/"`)

### 2. **Dashboard Component** (`src/pages/Dashboard.jsx`)
- Shows admin dashboard with statistics
- Displays "Access Denied" message for non-admin users
- Fetches data from `/api/admin/dashboard` endpoint
- Shows user role information

**Features for Admin Users:**
- Total Students count
- Total Teachers count
- Total Admins count
- Admin action buttons
- Logout functionality

### 3. **Updated AuthStore** (`src/stores/authStore.js`)
- Now stores full user object including role from server response
- Updated `login()` to accept user data from API
- Updated `register()` to accept name and role parameters

### 4. **Protected Routes** (`src/routes.jsx`)
Dashboard route is now protected with role-based access:
```jsx
{
  path: "/dashboard",
  element: (
    <RoleProtectedRoute allowedRoles={["admin"]}>
      <Dashboard />
    </RoleProtectedRoute>
  )
}
```

## User Experience

### For Admin Users:
1. Login with admin credentials
2. Access `/dashboard` to see admin dashboard
3. View statistics and manage system

### For Non-Admin Users (Teacher/Student):
1. Login with their credentials
2. Attempt to access `/dashboard`
3. See "Access Denied" message with their role information
4. Redirected or shown option to go back home

## Testing

### Create Test Users:

**Admin:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","password":"admin123","name":"Admin User","role":"admin"}'
```

**Teacher:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teacher@school.com","password":"teacher123","name":"Teacher User","role":"teacher"}'
```

**Student:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"student@school.com","password":"student123","name":"Student User","role":"student"}'
```

### Test Access:
1. Login as admin → Can access dashboard ✅
2. Login as teacher → Cannot access dashboard ❌
3. Login as student → Cannot access dashboard ❌

## Extending Role-Based Protection

To protect other routes with specific roles:

```jsx
// Teacher and Admin only
<RoleProtectedRoute allowedRoles={["admin", "teacher"]}>
  <TeacherPanel />
</RoleProtectedRoute>

// Any authenticated user (no role check)
<ProtectedRoute>
  <Profile />
</ProtectedRoute>

// Admin only
<RoleProtectedRoute allowedRoles={["admin"]}>
  <AdminSettings />
</RoleProtectedRoute>
```

## Security Notes

1. **Client-side protection is not sufficient** - Always validate roles on the backend
2. **JWT tokens contain role information** - Roles are verified server-side on API calls
3. **Role checking happens on both route access and API requests**
4. **Users cannot modify their own roles** - Only admins can change user roles via API

## API Integration

The Dashboard component calls the following admin endpoint:
```
GET /api/admin/dashboard
Authorization: Bearer <token>
```

This endpoint is protected server-side and returns:
```json
{
  "message": "Teacher dashboard data",
  "stats": {
    "totalStudents": 50,
    "totalTeachers": 10,
    "totalAdmins": 2
  },
  "user": {
    "id": "...",
    "role": "admin",
    "email": "admin@school.com"
  }
}
```

## Files Modified

1. ✏️ `src/pages/Dashboard.jsx` - Admin-only dashboard with role check
2. ✏️ `src/stores/authStore.js` - Updated to store user role from API
3. ✏️ `src/routes.jsx` - Added RoleProtectedRoute for dashboard
4. ✨ `src/RoleProtectedRoute.jsx` - New reusable role-based protection component
5. ✨ `FRONTEND_RBAC.md` - This documentation
