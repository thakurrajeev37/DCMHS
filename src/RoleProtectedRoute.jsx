import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import { Alert, Box, Button, Typography } from "@mui/material";
import { authStore } from "./stores/authStore";

/**
 * RoleProtectedRoute - Protects routes based on user roles
 * @param {Array<string>} allowedRoles - Array of roles that can access this route
 * @param {React.ReactNode} children - The component to render if authorized
 * @param {string} redirectTo - Where to redirect if not authorized (default: "/")
 */
export default observer(function RoleProtectedRoute({ 
  children, 
  allowedRoles = [], 
  redirectTo = "/" 
}) {
  console.log("=== RoleProtectedRoute RENDER ===");
  console.log("Allowed roles:", allowedRoles);
  console.log("Is authenticated:", authStore.isAuthenticated);
  console.log("Current user:", authStore.user);
  
  const [mounted, setMounted] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    console.log("=== RoleProtectedRoute useEffect ===");
    setMounted(true);
    // Check auth if user is logged in
    if (authStore.isAuthenticated) {
      authStore.checkAuth().then(() => {
        setChecking(false);
      }).catch(() => {
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, []);

  // Wait for client-side mount to avoid SSR mismatch
  if (!mounted || checking) {
    return null;
  }

  console.log("RoleProtectedRoute - User:", authStore.user);
  console.log("RoleProtectedRoute - Allowed roles:", allowedRoles);
  console.log("RoleProtectedRoute - User role:", authStore.user?.role);

  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return (
      <>
        <Alert severity="error" sx={{ mb: 2 }}>
          You must be logged in to access this page.
        </Alert>
        <Navigate to="/auth" replace />
      </>
    );
  }

  // Check if user has required role
  const userRole = authStore.user?.role;
  const hasRequiredRole = allowedRoles.length === 0 || allowedRoles.includes(userRole);

  console.log("=== ROLE CHECK ===");
  console.log("User role:", userRole);
  console.log("Has required role:", hasRequiredRole);
  console.log("==================");

  if (!hasRequiredRole) {
    console.log("ACCESS DENIED - Showing error message");
    console.log("User role:", userRole, "Required:", allowedRoles);
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Access Denied. You don't have permission to access this page.
        </Alert>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Your role: <strong>{userRole || "Not set"}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Required role(s): <strong>{allowedRoles.join(", ")}</strong>
        </Typography>
        <Button variant="contained" href={redirectTo} fullWidth>
          Go Back
        </Button>
      </Box>
    );
  }

  return children;
});
