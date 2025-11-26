// Test script for Role-Based Authentication
// Run with: node server/test-rbac.js

const BASE_URL = 'http://localhost:3000';

async function testRBAC() {
  console.log('🧪 Testing Role-Based Authentication System\n');

  try {
    // Test 1: Register users with different roles
    console.log('1️⃣ Registering users...');
    
    const adminUser = await register('admin@school.com', 'admin123', 'Admin User', 'admin');
    console.log('✅ Admin registered:', adminUser.user.email, '- Role:', adminUser.user.role);
    
    const teacherUser = await register('teacher@school.com', 'teacher123', 'Teacher User', 'teacher');
    console.log('✅ Teacher registered:', teacherUser.user.email, '- Role:', teacherUser.user.role);
    
    const studentUser = await register('student@school.com', 'student123', 'Student User', 'student');
    console.log('✅ Student registered:', studentUser.user.email, '- Role:', studentUser.user.role);
    console.log('');

    // Test 2: Login
    console.log('2️⃣ Testing login...');
    const adminLogin = await login('admin@school.com', 'admin123');
    console.log('✅ Admin logged in successfully');
    console.log('');

    // Test 3: Admin accessing admin-only endpoint
    console.log('3️⃣ Testing admin access to /api/admin/users...');
    const users = await getUsers(adminLogin.accessToken);
    console.log(`✅ Admin can view all users (${users.users.length} users found)`);
    console.log('');

    // Test 4: Teacher accessing teacher endpoint
    console.log('4️⃣ Testing teacher access to /api/admin/dashboard...');
    const teacherLogin = await login('teacher@school.com', 'teacher123');
    const dashboard = await getDashboard(teacherLogin.accessToken);
    console.log('✅ Teacher can access dashboard');
    console.log('📊 Stats:', dashboard.stats);
    console.log('');

    // Test 5: Student trying to access admin endpoint (should fail)
    console.log('5️⃣ Testing student access to /api/admin/users (should fail)...');
    const studentLogin = await login('student@school.com', 'student123');
    try {
      await getUsers(studentLogin.accessToken);
      console.log('❌ ERROR: Student should not have access!');
    } catch (error) {
      console.log('✅ Correctly blocked:', error.error);
      console.log('   Required role:', error.requiredRole);
      console.log('   User role:', error.userRole);
    }
    console.log('');

    // Test 6: Admin updating user role
    console.log('6️⃣ Testing admin updating user role...');
    const updatedUser = await updateUserRole(adminLogin.accessToken, studentUser.user.id, 'teacher');
    console.log('✅ Student promoted to teacher');
    console.log('   New role:', updatedUser.user.role);
    console.log('');

    console.log('✨ All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message || error);
    process.exit(1);
  }
}

// Helper functions
async function register(email, password, name, role) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name, role })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Registration failed');
  }
  
  return response.json();
}

async function login(email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }
  
  return response.json();
}

async function getUsers(token) {
  const response = await fetch(`${BASE_URL}/api/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  
  return response.json();
}

async function getDashboard(token) {
  const response = await fetch(`${BASE_URL}/api/admin/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Dashboard access failed');
  }
  
  return response.json();
}

async function updateUserRole(token, userId, newRole) {
  const response = await fetch(`${BASE_URL}/api/admin/users/${userId}/role`, {
    method: 'PUT',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role: newRole })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Role update failed');
  }
  
  return response.json();
}

// Run tests
testRBAC();
