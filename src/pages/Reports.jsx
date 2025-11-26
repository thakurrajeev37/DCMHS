import React from "react";
import { Box, Typography, Card, CardContent, Grid, Paper } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Reports() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BarChartIcon /> Reports & Analytics
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and export attendance records for all classes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track student performance and academic progress.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Financial Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fee collection and financial summary reports.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Events Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Summary of past and upcoming school events.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3, mt: 3, bgcolor: "#f5f5f5" }}>
        <Typography variant="body1" color="text.secondary">
          Reports module coming soon. This feature will include detailed analytics and exportable reports.
        </Typography>
      </Paper>
    </Box>
  );
}
