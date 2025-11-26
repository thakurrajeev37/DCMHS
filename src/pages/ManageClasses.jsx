import React, { useState } from "react";
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
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClassIcon from "@mui/icons-material/Class";

export default observer(function ManageClasses() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Class 10-A",
      grade: "10",
      section: "A",
      teacher: "Mr. Sharma",
      students: 35,
      subjects: ["Mathematics", "Science", "English", "Social Studies"]
    },
    {
      id: 2,
      name: "Class 10-B",
      grade: "10",
      section: "B",
      teacher: "Mrs. Verma",
      students: 32,
      subjects: ["Mathematics", "Science", "English", "Social Studies"]
    },
    {
      id: 3,
      name: "Class 9-A",
      grade: "9",
      section: "A",
      teacher: "Mr. Kumar",
      students: 38,
      subjects: ["Mathematics", "Science", "English", "Hindi"]
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    section: "",
    teacher: "",
    students: 0,
    subjects: []
  });

  const handleOpenDialog = (classItem = null) => {
    if (classItem) {
      setCurrentClass(classItem);
      setFormData(classItem);
    } else {
      setCurrentClass(null);
      setFormData({
        name: "",
        grade: "",
        section: "",
        teacher: "",
        students: 0,
        subjects: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentClass(null);
  };

  const handleSaveClass = () => {
    if (currentClass) {
      // Edit existing class
      setClasses(classes.map(c => c.id === currentClass.id ? { ...formData, id: currentClass.id } : c));
    } else {
      // Add new class
      setClasses([...classes, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDeleteClass = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ClassIcon /> Manage Classes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Class
        </Button>
      </Box>

      <Grid container spacing={3}>
        {classes.map((classItem) => (
          <Grid item xs={12} md={6} lg={4} key={classItem.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                  <Typography variant="h5" component="div">
                    {classItem.name}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(classItem)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClass(classItem.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Class Teacher:</strong> {classItem.teacher}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Total Students:</strong> {classItem.students}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Subjects:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {classItem.subjects.map((subject, index) => (
                      <Chip
                        key={index}
                        label={subject}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Class Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentClass ? "Edit Class" : "Add New Class"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Class Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Class Teacher"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Number of Students"
            type="number"
            value={formData.students}
            onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Subjects (comma-separated)"
            value={Array.isArray(formData.subjects) ? formData.subjects.join(", ") : ""}
            onChange={(e) => setFormData({
              ...formData,
              subjects: e.target.value.split(",").map(s => s.trim()).filter(s => s)
            })}
            helperText="Enter subjects separated by commas"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveClass} variant="contained">
            {currentClass ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});
