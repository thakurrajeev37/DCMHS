# Testing Admin-Only Dashboard Access

## Issue Fixed
Non-admin users were able to access the dashboard page due to timing issues with user data loading.

## Changes Made

### 1. Enhanced RoleProtectedRoute (`src/RoleProtectedRoute.jsx`)
- Added `checking` state to wait for authentication check
- Added console logs for debugging
- Properly waits for `checkAuth()` to complete before rendering

### 2. Updated AuthStore (`src/stores/authStore.js`)
- Enhanced `checkAuth()` to ensure user data is parsed from token
- Added console logs for debugging user data
- Ensures user object is always populated when authenticated

### 3. Debug Logging
Added comprehensive logging to trace:
- User role from authStore
- Token parsing
- Role checking in RoleProtectedRoute

## Testing Steps

### Step 1: Clear Browser Storage
```javascript
// In browser console:
localStorage.clear();
```

### Step 2: Test Admin Access

**Login as Admin:**
```bash
# Use existing admin account
Email: admin@school.com
Password: admin123
```

**Expected Result:**
- ✅ Can access `/dashboard`
- ✅ Sees admin dashboard with statistics
- ✅ Console shows: `User role: admin`

### Step 3: Test Teacher Access

**Create Teacher Account:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teacher@school.com","password":"teacher123","name":"Teacher User","role":"teacher"}'
```

**Login as Teacher:**
```
Email: teacher@school.com
Password: teacher123
```

**Expected Result:**
- ❌ Cannot access `/dashboard`
- ❌ Sees "Access Denied" message
- ❌ Shows "Your role: teacher"
- ❌ Console shows: `User role: teacher`

### Step 4: Test Student Access

**Create Student Account:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"student@school.com","password":"student123","name":"Student User","role":"student"}'
```

**Login as Student:**
```
Email: student@school.com
Password: student123
```

**Expected Result:**
- ❌ Cannot access `/dashboard`
- ❌ Sees "Access Denied" message
- ❌ Shows "Your role: student"
- ❌ Console shows: `User role: student`

## Console Debugging

Open browser DevTools (F12) and check console for:

```
AuthStore initialized with user: {id: "...", email: "...", role: "admin"}
RoleProtectedRoute - User: {id: "...", email: "...", role: "admin"}
RoleProtectedRoute - Allowed roles: ["admin"]
RoleProtectedRoute - User role: admin
RoleProtectedRoute - Has required role: true
```

## Troubleshooting

### Issue: User role shows as "undefined"
**Solution:** 
- Clear localStorage
- Re-login to get fresh token with role information
- Check server response includes role in JWT

### Issue: Still seeing dashboard as non-admin
**Solution:**
- Clear browser cache and localStorage
- Check console for role value
- Verify JWT token includes role claim
- Restart development server

### Issue: "Access Denied" shows immediately then dashboard appears
**Solution:**
- This is a timing issue - the fix should prevent this
- If still occurring, increase the delay in RoleProtectedRoute

## Verifying JWT Token

To check if your token has role information:

```javascript
// In browser console:
const token = localStorage.getItem('accessToken');
if (token) {
  const base64 = token.split('.')[1];
  const decoded = JSON.parse(atob(base64));
  console.log('Token payload:', decoded);
  console.log('Role:', decoded.role);
}
```

Expected output:
```json
{
  "id": "...",
  "email": "admin@school.com",
  "role": "admin",
  "iat": ...,
  "exp": ...
}
```

## Clean Test Procedure

1. **Reset everything:**
   ```bash
   # Clear localStorage
   localStorage.clear();
   ```

2. **Login as admin:**
   - Go to `/auth`
   - Login with admin@school.com / admin123
   - Navigate to `/dashboard`
   - Should see admin dashboard ✅

3. **Logout and login as teacher:**
   - Click Logout
   - Login with teacher@school.com / teacher123
   - Navigate to `/dashboard`
   - Should see "Access Denied" ❌

4. **Logout and login as student:**
   - Click Logout
   - Login with student@school.com / student123
   - Navigate to `/dashboard`
   - Should see "Access Denied" ❌

## Success Criteria

- ✅ Only admin users can see dashboard content
- ✅ Non-admin users see "Access Denied" message
- ✅ Role is displayed correctly in error message
- ✅ No timing issues or flashing of wrong content
- ✅ Console logs show correct role values
