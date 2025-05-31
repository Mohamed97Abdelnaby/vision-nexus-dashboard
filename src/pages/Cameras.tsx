
import { useState } from "react";
import { CameraGrid } from "@/components/CameraGrid";
import { ModelManager } from "@/components/ModelManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera } from "lucide-react";

export default function Cameras() {
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [cameraModels, setCameraModels] = useState<Record<number, string[]>>({
    1: ["Person Detection", "Vehicle Detection"],
    2: ["Vehicle Detection", "License Plate"],
    3: ["Person Detection"],
    4: ["Object Detection", "Safety Monitoring"],
  });

  const handleOpenModelManager = (cameraId: number) => {
    setSelectedCamera(cameraId);
  };

  const handleModelsUpdate = (models: string[]) => {
    if (selectedCamera) {
      setCameraModels(prev => ({
        ...prev,
        [selectedCamera]: models
      }));
    }
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Camera Management</h1>
          <p className="text-muted-foreground">Configure and monitor your camera network</p>
        </div>
        <Button className="bg-tech-500 hover:bg-tech-600">
          <Camera className="w-4 h-4 mr-2" />
          Add Camera
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input 
          placeholder="Search cameras..." 
          className="max-w-sm"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cameras</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="building-a">Building A</SelectItem>
            <SelectItem value="building-b">Building B</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CameraGrid onOpenModelManager={handleOpenModelManager} />

      {/* Model Management Dialog */}
      <Dialog open={selectedCamera !== null} onOpenChange={() => setSelectedCamera(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Configure AI Models - Camera {selectedCamera}
            </DialogTitle>
          </DialogHeader>
          {selectedCamera && (
            <ModelManager
              cameraId={selectedCamera}
              currentModels={cameraModels[selectedCamera] || []}
              onModelsUpdate={handleModelsUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
