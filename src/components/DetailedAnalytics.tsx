
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react";

const alertTrends = [
  { type: "Security Breach", count: 3, change: -40, status: "decreased" },
  { type: "Motion Detection", count: 1247, change: 15, status: "increased" },
  { type: "Object Recognition", count: 892, change: 8, status: "increased" },
  { type: "System Alerts", count: 23, change: -12, status: "decreased" },
];

const modelPerformance = [
  { name: "YOLOv8 Person Detection", accuracy: 94.2, latency: "45ms", confidence: 87 },
  { name: "Vehicle Classification", accuracy: 91.8, latency: "52ms", confidence: 92 },
  { name: "License Plate Reader", accuracy: 87.5, latency: "78ms", confidence: 85 },
  { name: "Face Recognition", accuracy: 89.1, latency: "63ms", confidence: 88 },
];

const systemHealth = [
  { component: "Database", status: "healthy", uptime: 99.8, response: "12ms" },
  { component: "AI Processing", status: "healthy", uptime: 98.5, response: "45ms" },
  { component: "Storage", status: "warning", uptime: 97.2, response: "89ms" },
  { component: "Network", status: "healthy", uptime: 99.1, response: "23ms" },
];

const detectionHistory = [
  { time: "14:30", camera: "Front Entrance", object: "Person", confidence: 94 },
  { time: "14:28", camera: "Parking Lot", object: "Vehicle", confidence: 87 },
  { time: "14:25", camera: "Loading Dock", object: "Package", confidence: 92 },
  { time: "14:22", camera: "Back Exit", object: "Person", confidence: 89 },
  { time: "14:20", camera: "Conference Room", object: "Person", confidence: 96 },
];

export function DetailedAnalytics() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getTrendIcon = (status: string) => {
    return status === "increased" ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Alert Trends */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alert Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alertTrends.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <div className="font-medium text-sm">{alert.type}</div>
                <div className="text-2xl font-bold">{alert.count}</div>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(alert.status)}
                <span className={`text-sm font-bold ${alert.status === 'increased' ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(alert.change)}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            AI Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {modelPerformance.map((model, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{model.name}</span>
                <Badge variant="secondary">{model.accuracy}%</Badge>
              </div>
              <Progress value={model.accuracy} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Latency: {model.latency}</span>
                <span>Confidence: {model.confidence}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemHealth.map((system, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <div className="font-medium text-sm">{system.component}</div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    system.status === 'healthy' ? 'bg-green-500' : 
                    system.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className={`text-xs ${getStatusColor(system.status)}`}>
                    {system.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{system.uptime}%</div>
                <div className="text-xs text-muted-foreground">{system.response}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Detections */}
      <Card className="glass-effect lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Detections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {detectionHistory.map((detection, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-mono text-muted-foreground">
                    {detection.time}
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{detection.camera}</div>
                    <div className="text-xs text-muted-foreground">
                      Detected: {detection.object}
                    </div>
                  </div>
                </div>
                <Badge variant={detection.confidence > 90 ? "default" : "secondary"}>
                  {detection.confidence}% confidence
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-green-500">99.2%</div>
              <div className="text-xs text-muted-foreground">Overall Uptime</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-blue-500">47ms</div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-purple-500">91.8%</div>
              <div className="text-xs text-muted-foreground">Avg Accuracy</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-orange-500">2.3k</div>
              <div className="text-xs text-muted-foreground">Daily Detections</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
