import { useState } from "react";
import { Container, Typography } from '@mui/material';
import DrawingForm from "@/components/DrawingForm";
import RFIForm from "@/components/RFIForm";
import RFIList from "@/components/RFIList";

const Index = () => {
  const [rfis, setRfis] = useState([]);

  const handleRFISubmit = (rfiData) => {
    const newRFI = {
      ...rfiData,
      id: `RFI-${Date.now()}`
    };
    setRfis(prev => [...prev, newRFI]);
  };

  const handleRFIUpdate = (id, updatedRFI) => {
    setRfis(prev => prev.map(rfi => 
      rfi.id === id ? { ...updatedRFI, id } : rfi
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <DrawingForm />
      
      <Typography variant="h4" align="center" sx={{ mt: 6, mb: 4 }}>
        Request for Information (RFI)
      </Typography>
      
      <RFIForm onSubmit={handleRFISubmit} />
      
      {rfis.length > 0 && (
        <RFIList
          rfis={rfis}
          onUpdateRFI={handleRFIUpdate}
        />
      )}
    </Container>
  );
};

export default Index;