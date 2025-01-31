import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import { AttachFile, Download, Send } from '@mui/icons-material';

const DrawingForm = () => {
  const [formData, setFormData] = useState({
    drawingNumber: "DWG-2024-001",
    drawingId: "ID-001-A",
    description: "",
    projectName: "Project Alpha",
    location: "Building B, Floor 3",
    category: "Structural",
    remarks: ""
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarMessage("Drawing details have been successfully submitted.");
    setOpenSnackbar(true);
    console.log('Form submitted:', formData);
  };

  const handleAttach = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSnackbarMessage(`${file.name} has been attached successfully.`);
      setOpenSnackbar(true);
    }
  };

  const handleDownload = () => {
    setSnackbarMessage("Your drawing is being downloaded.");
    setOpenSnackbar(true);
  };

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Drawing Details Form
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Drawing Number"
                name="drawingNumber"
                value={formData.drawingNumber}
                disabled
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Drawing ID"
                name="drawingId"
                value={formData.drawingId}
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Drawing Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                value={formData.projectName}
                disabled
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                disabled
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleAttach}
                startIcon={<AttachFile />}
              >
                Attach
              </Button>
            </Grid>
            
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleDownload}
                startIcon={<Download />}
              >
                Download
              </Button>
            </Grid>
            
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send />}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default DrawingForm;