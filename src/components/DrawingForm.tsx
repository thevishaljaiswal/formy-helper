import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FileUp, Download, Send } from "lucide-react";

const DrawingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    drawingNumber: "DWG-2024-001",
    drawingId: "ID-001-A",
    description: "",
    projectName: "Project Alpha",
    location: "Building B, Floor 3",
    category: "Structural",
    remarks: ""
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
    toast({
      title: "Form Submitted",
      description: "Drawing details have been successfully submitted.",
    });
    console.log('Form submitted:', formData);
  };

  const handleAttach = () => {
    // Trigger file input click
    document.getElementById('fileInput')?.click();
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

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your drawing is being downloaded.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Drawing Details Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="drawingNumber">Drawing Number</Label>
            <Input
              id="drawingNumber"
              name="drawingNumber"
              value={formData.drawingNumber}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="drawingId">Drawing ID</Label>
            <Input
              id="drawingId"
              name="drawingId"
              value={formData.drawingId}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Drawing Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter drawing description..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              placeholder="Enter any remarks..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button
            type="button"
            onClick={handleAttach}
            className="flex items-center gap-2"
          >
            <FileUp className="w-4 h-4" />
            Attach
          </Button>
          
          <Button
            type="button"
            onClick={handleDownload}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          
          <Button
            type="submit"
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DrawingForm;