import React, { useState } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

export default function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, minWidth: { xs: 280, sm: 350 }, maxWidth: "90vw" }}>
        <Box mb={2} display="flex" justifyContent="center">
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, value) => value && setMode(value)}
            aria-label="auth mode"
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="register">Register</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {mode === "login" ? <Login /> : <Register />}
      </Paper>
    </Box>
  );
}
