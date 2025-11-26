import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  Snackbar
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { authStore } from "../stores/authStore";
import axios from "axios";

export default observer(function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    endDate: "",
    location: "",
    fullDesc: "",
    time: "",
    color: "#2196F3",
    isRange: false
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      setEvents(response.data.events);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch events");
      setLoading(false);
    }
  };

  const handleOpenDialog = (event = null) => {
    console.log('Opening dialog with event:', event);
    if (event) {
      setCurrentEvent(event);
      const editFormData = {
        title: event.title,
        date: event.date,
        endDate: event.endDate || "",
        location: event.location,
        fullDesc: event.fullDesc,
        time: event.time,
        color: event.color || "#2196F3",
        isRange: event.isRange || false
      };
      console.log('Form data set for editing:', editFormData);
      setFormData(editFormData);
    } else {
      setCurrentEvent(null);
      setFormData({
        title: "",
        date: "",
        endDate: "",
        location: "",
        fullDesc: "",
        time: "",
        color: "#2196F3",
        isRange: false
      });
      console.log('Form data set for new event');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEvent(null);
    setError(null);
  };

  const handleSaveEvent = async () => {
    try {
      // Validation
      if (!formData.title || !formData.date || !formData.time || !formData.location || !formData.fullDesc) {
        setError("Please fill in all required fields");
        return;
      }

      if (formData.isRange && !formData.endDate) {
        setError("Please select an end date for multi-day events");
        return;
      }

      console.log('Saving event:', { currentEvent: currentEvent?._id, formData });
      
      if (currentEvent) {
        // Edit existing event
        const response = await axios.put(
          `/api/events/${currentEvent._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`
            }
          }
        );
        console.log('Event updated:', response.data);
        setSuccessMessage("Event updated successfully!");
      } else {
        // Add new event
        const response = await axios.post(
          "/api/events",
          formData,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`
            }
          }
        );
        console.log('Event created:', response.data);
        setSuccessMessage("Event created successfully!");
      }
      handleCloseDialog();
      fetchEvents();
    } catch (err) {
      console.error('Error saving event:', err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to save event");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        });
        setSuccessMessage("Event deleted successfully!");
        fetchEvents();
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete event");
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Manage Events</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Event
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event._id}>
            <Card sx={{ borderLeft: `4px solid ${event.color}` }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                  <Typography variant="h6">{event.title}</Typography>
                  <Box>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(event)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  📅 {event.isRange && event.endDate ? `${event.date} to ${event.endDate}` : event.date}
                  {event.isRange && <Chip label="Multi-day" size="small" sx={{ ml: 1 }} />}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  📍 {event.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  ⏰ {event.time}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Event Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(135deg, #3B6866 0%, #2d7a6e 100%)',
            color: "white",
            py: 3,
            px: 3,
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: '-0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderBottom: '3px solid #F7CA02'
          }}
        >
          <Box 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              borderRadius: 2, 
              p: 1, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {currentEvent ? "✏️" : "➕"}
          </Box>
          <Box>
            {currentEvent ? "Edit Event" : "Create New Event"}
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.9, fontSize: '0.75rem', fontWeight: 400, mt: 0.5 }}>
              {currentEvent ? "Update the event details below" : "Fill in the information to add a new event"}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 4, pb: 3, px: 3, bgcolor: '#fafafa' }}>
          <Grid container spacing={3}>
            {/* Event Details Section */}
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: 'white', 
                p: 3, 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #e0e0e0'
              }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 2.5, 
                    color: "#3B6866", 
                    fontWeight: 700,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box sx={{ 
                    bgcolor: '#3B6866', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: 28, 
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}>
                    1
                  </Box>
                  Event Details
                </Typography>
                <TextField
                  fullWidth
                  required
                  label="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Annual Sports Day, Science Exhibition"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'white',
                      '&:hover fieldset': {
                        borderColor: '#3B6866',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3B6866',
                        borderWidth: 2
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#3B6866'
                    }
                  }}
                />
              </Box>
            </Grid>
            
            {/* Date & Time Section */}
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: 'white', 
                p: 3, 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #e0e0e0'
              }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 2.5, 
                    color: "#3B6866", 
                    fontWeight: 700,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box sx={{ 
                    bgcolor: '#3B6866', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: 28, 
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}>
                    2
                  </Box>
                  Date & Time
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        height: '56px',
                        px: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        bgcolor: '#f9f9f9',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: '#f0f0f0',
                          borderColor: '#3B6866'
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        id="multiDayCheckbox"
                        checked={formData.isRange}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFormData({ 
                            ...formData, 
                            isRange: isChecked,
                            endDate: isChecked ? formData.endDate : ""
                          });
                        }}
                        style={{ 
                          marginRight: '12px',
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: '#3B6866'
                        }}
                      />
                      <label 
                        htmlFor="multiDayCheckbox"
                        style={{ 
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: '0.95rem'
                        }}
                      >
                        📅 Multi-day Event
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={formData.isRange ? 6 : 12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label={formData.isRange ? "Start Date" : "Date"}
                        value={formData.date ? new Date(formData.date) : null}
                        onChange={(newValue) => {
                          if (newValue) {
                            const formattedDate = newValue.toISOString().split('T')[0];
                            setFormData({ ...formData, date: formattedDate });
                          }
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            helperText: formData.isRange ? "Select start date" : "Select event date"
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {formData.isRange && (
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="End Date"
                          value={formData.endDate ? new Date(formData.endDate) : null}
                          onChange={(newValue) => {
                            if (newValue) {
                              const formattedDate = newValue.toISOString().split('T')[0];
                              setFormData({ ...formData, endDate: formattedDate });
                            }
                          }}
                          minDate={formData.date ? new Date(formData.date) : null}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              required: true,
                              helperText: "Select end date"
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="⏰ Time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g., 9:00 AM - 4:00 PM"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'white',
                          '&:hover fieldset': {
                            borderColor: '#3B6866',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3B6866',
                            borderWidth: 2
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3B6866'
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            {/* Location & Description Section */}
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: 'white', 
                p: 3, 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #e0e0e0'
              }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 2.5, 
                    color: "#3B6866", 
                    fontWeight: 700,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box sx={{ 
                    bgcolor: '#3B6866', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: 28, 
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}>
                    3
                  </Box>
                  Location & Description
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="📍 Location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Main Auditorium, School Ground"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'white',
                          '&:hover fieldset': {
                            borderColor: '#3B6866',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3B6866',
                            borderWidth: 2
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3B6866'
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="📝 Description"
                      value={formData.fullDesc}
                      onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                      multiline
                      rows={4}
                      placeholder="Provide detailed information about the event..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'white',
                          '&:hover fieldset': {
                            borderColor: '#3B6866',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3B6866',
                            borderWidth: 2
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3B6866'
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            {/* Appearance Section */}
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: 'white', 
                p: 3, 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #e0e0e0'
              }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 2.5, 
                    color: "#3B6866", 
                    fontWeight: 700,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box sx={{ 
                    bgcolor: '#3B6866', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: 28, 
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}>
                    4
                  </Box>
                  Appearance
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TextField
                    label="🎨 Event Color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    sx={{
                      width: '150px',
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'white',
                        '&:hover fieldset': {
                          borderColor: '#3B6866',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3B6866',
                          borderWidth: 2
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3B6866'
                      }
                    }}
                  />
                  <Box 
                    sx={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: 2, 
                      bgcolor: formData.color,
                      border: '3px solid #e0e0e0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    Choose a color to highlight your event in the calendar
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2.5, bgcolor: '#f9f9f9', gap: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              color: '#666',
              borderColor: '#ddd',
              textTransform: 'none',
              px: 3,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#999',
                bgcolor: 'transparent'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveEvent} 
            variant="contained"
            sx={{
              bgcolor: '#3B6866',
              textTransform: 'none',
              px: 3,
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(59, 104, 102, 0.3)',
              '&:hover': {
                bgcolor: '#2d7a6e',
                boxShadow: '0 4px 12px rgba(59, 104, 102, 0.4)'
              }
            }}
          >
            {currentEvent ? "💾 Update Event" : "✨ Create Event"}
          </Button>
        </DialogActions>
      </Dialog>

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
