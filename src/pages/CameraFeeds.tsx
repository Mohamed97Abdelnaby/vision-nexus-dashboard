
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Grid, List, Maximize, Play, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    models: ["Vehicle Detection", "License Plate Recognition"],
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

export default function CameraFeeds() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: false,
    4: true,
  });

  const filteredCameras = cameras.filter(camera => {
    const matchesSearch = camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         camera.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || camera.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const togglePlayback = (cameraId: number) => {
    setIsPlaying(prev => ({
      ...prev,
      [cameraId]: !prev[cameraId]
    }));
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Live Camera Feeds</h1>
          <p className="text-muted-foreground">Monitor live feeds from all connected cameras</p>
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
              {/* Camera Feed Area */}
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-tech-400/20 to-tech-600/20" />
                <div className="text-center z-10">
                  <Camera className="w-12 h-12 mx-auto mb-2 text-white/80" />
                  <p className="text-sm text-white/80">
                    {camera.status === "online" ? "Live Feed" : "Camera Offline"}
                  </p>
                  {camera.status === "online" && (
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs text-white/60">LIVE</span>
                    </div>
                  )}
                </div>
                
                {/* Feed Controls */}
                {camera.status === "online" && (
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                      onClick={() => togglePlayback(camera.id)}
                    >
                      {isPlaying[camera.id] ? (
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
                )}
              </div>

              {/* Detection Info */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Detections Today:</span>
                <Badge variant="secondary" className="text-tech-400">
                  {camera.detections}
                </Badge>
              </div>

              {/* Active Models */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Models:</span>
                  <span className="font-medium">{camera.models.length}</span>
                </div>
                {camera.models.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {camera.models.map((model, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {model}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Last Seen */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Last Seen:</span>
                <span className="font-medium">{camera.lastSeen}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCameras.length === 0 && (
        <div className="text-center py-12">
          <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No cameras found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
