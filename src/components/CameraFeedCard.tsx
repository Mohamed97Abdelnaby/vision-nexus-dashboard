
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Maximize, Play, Pause, Plus, X } from "lucide-react";
import { useState } from "react";

const availableModels = [
  { id: "person-detection", name: "Person Detection" },
  { id: "vehicle-detection", name: "Vehicle Detection" },
  { id: "license-plate", name: "License Plate Recognition" },
  { id: "object-detection", name: "Object Detection" },
  { id: "safety-monitoring", name: "Safety Monitoring" },
  { id: "face-recognition", name: "Face Recognition" },
  { id: "motion-detection", name: "Motion Detection" },
  { id: "crowd-counting", name: "Crowd Counting" },
];

interface CameraFeedCardProps {
  camera: {
    id: number;
    name: string;
    status: string;
    location: string;
    models: string[];
    detections: number;
  };
  onModelsUpdate: (cameraId: number, models: string[]) => void;
}

export function CameraFeedCard({ camera, onModelsUpdate }: CameraFeedCardProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string>("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success-500";
      case "offline":
        return "bg-danger-500";
      default:
        return "bg-warning-500";
    }
  };

  const handleAddModel = () => {
    if (selectedModel && !camera.models.includes(selectedModel)) {
      const newModels = [...camera.models, selectedModel];
      onModelsUpdate(camera.id, newModels);
      setSelectedModel("");
    }
  };

  const handleRemoveModel = (modelToRemove: string) => {
    const newModels = camera.models.filter(model => model !== modelToRemove);
    onModelsUpdate(camera.id, newModels);
  };

  const availableToAdd = availableModels.filter(model => 
    !camera.models.includes(model.name)
  );

  return (
    <Card className="glass-effect hover-lift group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Camera className="w-5 h-5" />
            {camera.name}
          </CardTitle>
          <div className={`status-indicator ${getStatusColor(camera.status)}`} />
        </div>
        <p className="text-sm text-muted-foreground">{camera.location}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Camera Feed Area */}
        <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-tech-400/20 to-tech-600/20" />
          <div className="text-center z-10">
            <Camera className="w-12 h-12 mx-auto mb-2 text-white/80" />
            <p className="text-sm text-white/80">Live Feed</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-white/60">LIVE</span>
            </div>
          </div>
          
          {/* Feed Controls */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
            >
              <Maximize className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Detection Info */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Detections Today:</span>
          <Badge variant="secondary" className="text-tech-400">
            {camera.detections}
          </Badge>
        </div>

        {/* Model Management */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="flex-1 h-8">
                <SelectValue placeholder="Add AI Model..." />
              </SelectTrigger>
              <SelectContent>
                {availableToAdd.map((model) => (
                  <SelectItem key={model.id} value={model.name}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              size="sm" 
              onClick={handleAddModel} 
              disabled={!selectedModel}
              className="h-8 w-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Active Models */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Models:</span>
              <span className="font-medium">{camera.models.length}</span>
            </div>
            {camera.models.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {camera.models.map((model, index) => (
                  <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                    {model}
                    <button
                      onClick={() => handleRemoveModel(model)}
                      className="ml-1 hover:bg-black/20 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No models active</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
