import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';

const RFIForm = ({ existingRFI, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: existingRFI?.description || '',
    comments: existingRFI?.comments || '',
    requiredDate: existingRFI?.requiredDate || '',
    assignedTo: existingRFI?.assignedTo || ''
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
    onSubmit(formData);
    if (!existingRFI) {
      setFormData({
        description: '',
        comments: '',
        requiredDate: '',
        assignedTo: ''
      });
    }
    setSnackbarMessage(existingRFI ? "RFI Updated" : "New RFI Created");
    setOpenSnackbar(true);
  };

  const handleAttach = () => {
    document.getElementById('rfiFileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSnackbarMessage(`${file.name} has been attached successfully.`);
      setOpenSnackbar(true);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="RFI Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Required Date"
                name="requiredDate"
                type="date"
                value={formData.requiredDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Assigned To"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <input
            type="file"
            id="rfiFileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleAttach}
                startIcon={<AttachFile />}
              >
                Attach
              </Button>
            </Grid>
            
            {onCancel && (
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
            )}
            
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send />}
              >
                {existingRFI ? 'Update' : 'Submit'}
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

export default RFIForm;