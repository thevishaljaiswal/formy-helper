import { useState } from "react";
import DrawingForm from "@/components/DrawingForm";
import RFIForm from "@/components/RFIForm";
import RFIList from "@/components/RFIList";
import type { RFI } from "@/components/RFIForm";

const Index = () => {
  const [rfis, setRfis] = useState<RFI[]>([]);

  const handleRFISubmit = (rfiData: Omit<RFI, 'id'>) => {
    const newRFI: RFI = {
      ...rfiData,
      id: `RFI-${Date.now()}`
    };
    setRfis(prev => [...prev, newRFI]);
  };

  const handleRFIUpdate = (id: string, updatedRFI: Omit<RFI, 'id'>) => {
    setRfis(prev => prev.map(rfi => 
      rfi.id === id ? { ...updatedRFI, id } : rfi
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <DrawingForm />
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Request for Information (RFI)</h2>
          <RFIForm onSubmit={handleRFISubmit} />
          
          {rfis.length > 0 && (
            <RFIList
              rfis={rfis}
              onUpdateRFI={handleRFIUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;