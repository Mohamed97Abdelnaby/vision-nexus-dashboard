
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Settings } from "lucide-react";

const cameras = [
  {
    id: 1,
    name: "Front Entrance",
    status: "online",
    location: "Building A - Level 1",
    models: ["Person Detection", "Vehicle Detection"],
    lastSeen: "2 minutes ago",
    detections: 45,
  },
  {
    id: 2,
    name: "Parking Lot",
    status: "online",
    location: "Outdoor - North Side",
    models: ["Vehicle Detection", "License Plate"],
    lastSeen: "1 minute ago",
    detections: 23,
  },
  {
    id: 3,
    name: "Conference Room",
    status: "offline",
    location: "Building B - Level 2",
    models: ["Person Detection"],
    lastSeen: "5 hours ago",
    detections: 0,
  },
  {
    id: 4,
    name: "Loading Dock",
    status: "online",
    location: "Building C - Ground",
    models: ["Object Detection", "Safety Monitoring"],
    lastSeen: "30 seconds ago",
    detections: 12,
  },
];

interface CameraGridProps {
  onOpenModelManager?: (cameraId: number) => void;
}

export function CameraGrid({ onOpenModelManager }: CameraGridProps) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cameras.map((camera) => (
        <Card key={camera.id} className="glass-effect hover-lift group">
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
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Camera Feed</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Models Active:</span>
                <span className="font-medium">{camera.models.length}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {camera.models.map((model, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Detections Today:</span>
                <span className="font-medium text-tech-400">{camera.detections}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Seen:</span>
                <span className="font-medium">{camera.lastSeen}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                View Feed
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => onOpenModelManager?.(camera.id)}
              >
                <Settings className="w-4 h-4 mr-1" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
