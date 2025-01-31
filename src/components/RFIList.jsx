import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import { AttachFile, Edit } from '@mui/icons-material';
import RFIForm from './RFIForm';

const RFIList = ({ rfis, onUpdateRFI }) => {
  const [editingId, setEditingId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAttachment = (rfiId) => {
    document.getElementById(`rfiFile-${rfiId}`).click();
  };

  const handleFileChange = (e, rfiId) => {
    const file = e.target.files?.[0];
    if (file) {
      setSnackbarMessage(`${file.name} has been attached to RFI #${rfiId}`);
      setOpenSnackbar(true);
    }
  };

  const handleUpdate = (id, updatedRFI) => {
    onUpdateRFI(id, updatedRFI);
    setEditingId(null);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Existing RFIs
      </Typography>
      
      {rfis.map((rfi) => (
        <Card key={rfi.id} sx={{ mb: 2 }}>
          <CardContent>
            {editingId === rfi.id ? (
              <RFIForm
                existingRFI={rfi}
                onSubmit={(updatedRFI) => handleUpdate(rfi.id, updatedRFI)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rfi.description}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Comments
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rfi.comments}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Required Date
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rfi.requiredDate}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Assigned To
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rfi.assignedTo}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Grid item>
                    <input
                      type="file"
                      id={`rfiFile-${rfi.id}`}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, rfi.id)}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleAttachment(rfi.id)}
                      startIcon={<AttachFile />}
                    >
                      Attach
                    </Button>
                  </Grid>
                  
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setEditingId(rfi.id)}
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </Card>
      ))}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RFIList;