import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FileUp, Send } from "lucide-react";

interface RFIFormProps {
  existingRFI?: RFI;
  onSubmit: (rfi: Omit<RFI, 'id'>) => void;
  onCancel?: () => void;
}

export interface RFI {
  id: string;
  description: string;
  comments: string;
  requiredDate: string;
  assignedTo: string;
}

const RFIForm: React.FC<RFIFormProps> = ({ existingRFI, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    description: existingRFI?.description || '',
    comments: existingRFI?.comments || '',
    requiredDate: existingRFI?.requiredDate || '',
    assignedTo: existingRFI?.assignedTo || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    toast({
      title: existingRFI ? "RFI Updated" : "RFI Created",
      description: existingRFI ? "The RFI has been updated successfully." : "New RFI has been created successfully.",
    });
  };

  const handleAttach = () => {
    document.getElementById('rfiFileInput')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "File Attached",
        description: `${file.name} has been attached successfully.`,
      });
    }
  };

  return (
    <Card className="w-full p-4 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">RFI Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter RFI description..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Comments</Label>
          <Textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            placeholder="Enter comments..."
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="requiredDate">Required On Date</Label>
            <Input
              id="requiredDate"
              name="requiredDate"
              type="date"
              value={formData.requiredDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Input
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              placeholder="Enter assignee name..."
            />
          </div>
        </div>

        <input
          type="file"
          id="rfiFileInput"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-wrap gap-4 justify-end pt-4">
          <Button
            type="button"
            onClick={handleAttach}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <FileUp className="w-4 h-4" />
            Attach
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
            >
              Cancel
            </Button>
          )}
          
          <Button
            type="submit"
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {existingRFI ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RFIForm;