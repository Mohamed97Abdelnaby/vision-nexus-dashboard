
import { useState } from "react";
import { CameraFeedCard } from "@/components/CameraFeedCard";
import { ModelManager } from "@/components/ModelManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Video, Grid, List } from "lucide-react";

const initialCameras = [
  {
    id: 1,
    name: "Front Entrance",
    status: "online",
    location: "Building A - Level 1",
    models: ["Person Detection", "Vehicle Detection"],
    detections: 45,
  },
  {
    id: 2,
    name: "Parking Lot",
    status: "online",
    location: "Outdoor - North Side",
    models: ["Vehicle Detection", "License Plate"],
    detections: 23,
  },
  {
    id: 3,
    name: "Conference Room",
    status: "offline",
    location: "Building B - Level 2",
    models: ["Person Detection"],
    detections: 0,
  },
  {
    id: 4,
    name: "Loading Dock",
    status: "online",
    location: "Building C - Ground",
    models: ["Object Detection", "Safety Monitoring"],
    detections: 12,
  },
];

export default function CameraFeeds() {
  const [cameras, setCameras] = useState(initialCameras);
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCameras = cameras.filter(camera => {
    const matchesSearch = camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         camera.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || camera.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenSettings = (cameraId: number) => {
    setSelectedCamera(cameraId);
  };

  const handleModelsUpdate = (models: string[]) => {
    if (selectedCamera) {
      setCameras(prev => prev.map(camera => 
        camera.id === selectedCamera 
          ? { ...camera, models }
          : camera
      ));
    }
  };

  const selectedCameraData = cameras.find(camera => camera.id === selectedCamera);

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Camera Feeds</h1>
          <p className="text-muted-foreground">Monitor live camera feeds and manage AI models</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search cameras..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cameras</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Camera Feeds Grid */}
      <div className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "grid grid-cols-1 lg:grid-cols-2 gap-6"
      }>
        {filteredCameras.map((camera) => (
          <CameraFeedCard
            key={camera.id}
            camera={camera}
            onOpenSettings={handleOpenSettings}
          />
        ))}
      </div>

      {filteredCameras.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No cameras found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Model Management Dialog */}
      <Dialog open={selectedCamera !== null} onOpenChange={() => setSelectedCamera(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Configure Models - {selectedCameraData?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedCameraData && (
            <ModelManager
              cameraId={selectedCameraData.id}
              currentModels={selectedCameraData.models}
              onModelsUpdate={handleModelsUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
