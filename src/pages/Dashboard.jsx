import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Card, Typography, Button, Alert, Box, Grid, Paper, Divider, Snackbar } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AddUserDialog from "../components/AddUserDialog";

export default observer(function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Check if user is admin
  const isAdmin = authStore.user?.role === "admin";
  console.log("******User role:", authStore.user?.role);
  useEffect(() => {
    // Fetch admin dashboard stats if user is admin
    if (isAdmin && authStore.accessToken) {
      fetchDashboardStats();
    } else {
      setLoading(false);
    }
  }, [isAdmin, authStore.accessToken]);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      });
      setStats(response.data.stats);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch dashboard data");
      setLoading(false);
    }
  };

  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Access Denied. This dashboard is only accessible to administrators.
        </Alert>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Your role: {authStore.user?.role || "Not set"}
        </Typography>
        <Button variant="contained" href="/" fullWidth>
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>
      
      <Alert severity="success" sx={{ mb: 3 }}>
        Welcome, {authStore.user?.name || authStore.user?.email || "Admin"}!
      </Alert>

      {loading && (
        <Typography align="center">Loading dashboard data...</Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      {stats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#e3f2fd" }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
                {stats.totalStudents}
              </Typography>
              <Typography variant="h6">Total Students</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#f3e5f5" }}>
              <Typography variant="h3" color="secondary" sx={{ fontWeight: "bold" }}>
                {stats.totalTeachers}
              </Typography>
              <Typography variant="h6">Total Teachers</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#fff3e0" }}>
              <Typography variant="h3" sx={{ color: "#ff6f00", fontWeight: "bold" }}>
                {stats.totalAdmins}
              </Typography>
              <Typography variant="h6">Total Admins</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* User Management Section */}
      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PeopleIcon /> User Management
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<PersonAddIcon />}
              sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" } }}
              onClick={() => setOpenAddUserDialog(true)}
            >
              Add Teacher
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<PersonAddIcon />}
              sx={{ bgcolor: "#7b1fa2", "&:hover": { bgcolor: "#6a1b9a" } }}
              onClick={() => setOpenAddUserDialog(true)}
            >
              Add Student
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<EditIcon />}
              sx={{ bgcolor: "#0288d1", "&:hover": { bgcolor: "#01579b" } }}
              onClick={() => navigate("/manage-users")}
            >
              Manage Users
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Academic Management Section */}
      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SchoolIcon /> Academic Management
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ClassIcon />}
              color="success"
              onClick={() => navigate("/manage-classes")}
            >
              Add Class
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<EditIcon />}
              color="success"
              onClick={() => navigate("/manage-classes")}
            >
              Manage Classes
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<SchoolIcon />}
              color="success"
              onClick={() => navigate("/manage-classes")}
            >
              Assign Teachers
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Events Management Section */}
      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EventIcon /> Events Management
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<EventIcon />}
              sx={{ bgcolor: "#d32f2f", "&:hover": { bgcolor: "#c62828" } }}
              onClick={() => navigate("/manage-events")}
            >
              Add Event
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<EditIcon />}
              sx={{ bgcolor: "#f57c00", "&:hover": { bgcolor: "#ef6c00" } }}
              onClick={() => navigate("/manage-events")}
            >
              Manage Events
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<EventIcon />}
              sx={{ bgcolor: "#c2185b", "&:hover": { bgcolor: "#ad1457" } }}
              onClick={() => navigate("/events")}
            >
              View Calendar
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* System Management Section */}
      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SettingsIcon /> System Management
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<BarChartIcon />}
              color="info"
            >
              View Reports
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<SettingsIcon />}
              color="info"
            >
              System Settings
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              fullWidth
              color="error"
              onClick={() => authStore.logout()}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Add User Dialog */}
      <AddUserDialog
        open={openAddUserDialog}
        onClose={() => setOpenAddUserDialog(false)}
        onSuccess={(role) => {
          setSuccessMessage(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`);
          fetchDashboardStats(); // Refresh stats
        }}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
});
