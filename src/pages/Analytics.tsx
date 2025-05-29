
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartBar } from "lucide-react";

export default function Analytics() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Detailed insights from your camera network</p>
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnalyticsChart />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBar className="w-5 h-5" />
              Top Performing Cameras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Front Entrance", detections: 1247 },
              { name: "Parking Lot", detections: 892 },
              { name: "Loading Dock", detections: 634 },
              { name: "Back Exit", detections: 421 },
            ].map((camera, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{camera.name}</span>
                <span className="text-tech-400 font-bold">{camera.detections}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Person Detection", accuracy: "94.2%" },
              { name: "Vehicle Detection", accuracy: "91.8%" },
              { name: "License Plate", accuracy: "87.5%" },
              { name: "Object Detection", accuracy: "89.1%" },
            ].map((model, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{model.name}</span>
                <span className="text-success-400 font-bold">{model.accuracy}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">CPU Usage</span>
              <span className="text-warning-400 font-bold">67%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Memory Usage</span>
              <span className="text-success-400 font-bold">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-tech-400 font-bold">23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Network I/O</span>
              <span className="text-success-400 font-bold">Normal</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
