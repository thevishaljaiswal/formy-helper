import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUp, Edit, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { RFI } from './RFIForm';
import RFIForm from './RFIForm';

interface RFIListProps {
  rfis: RFI[];
  onUpdateRFI: (id: string, rfi: Omit<RFI, 'id'>) => void;
}

const RFIList: React.FC<RFIListProps> = ({ rfis, onUpdateRFI }) => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAttachment = (rfiId: string) => {
    document.getElementById(`rfiFile-${rfiId}`)?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, rfiId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "File Attached",
        description: `${file.name} has been attached to RFI #${rfiId}`,
      });
    }
  };

  const handleUpdate = (id: string, updatedRFI: Omit<RFI, 'id'>) => {
    onUpdateRFI(id, updatedRFI);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Existing RFIs</h3>
      {rfis.map((rfi) => (
        <Card key={rfi.id} className="p-4">
          {editingId === rfi.id ? (
            <RFIForm
              existingRFI={rfi}
              onSubmit={(updatedRFI) => handleUpdate(rfi.id, updatedRFI)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm text-gray-600">{rfi.description}</p>
                </div>
                <div>
                  <h4 className="font-medium">Comments</h4>
                  <p className="text-sm text-gray-600">{rfi.comments}</p>
                </div>
                <div>
                  <h4 className="font-medium">Required Date</h4>
                  <p className="text-sm text-gray-600">{rfi.requiredDate}</p>
                </div>
                <div>
                  <h4 className="font-medium">Assigned To</h4>
                  <p className="text-sm text-gray-600">{rfi.assignedTo}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <input
                  type="file"
                  id={`rfiFile-${rfi.id}`}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, rfi.id)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAttachment(rfi.id)}
                  className="flex items-center gap-2"
                >
                  <FileUp className="w-4 h-4" />
                  Attach
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingId(rfi.id)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default RFIList;