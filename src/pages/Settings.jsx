import React from "react";
import { Box, Typography, Card, CardContent, Grid, Switch, FormControlLabel } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Settings() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SettingsIcon /> System Settings
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                General Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email Notifications"
              />
              <br />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="SMS Notifications"
              />
              <br />
              <FormControlLabel
                control={<Switch />}
                label="Maintenance Mode"
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Two-Factor Authentication"
              />
              <br />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Password Expiry (90 days)"
              />
              <br />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Login Attempt Limit"
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Academic Year Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Academic Year: 2025-2026
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
