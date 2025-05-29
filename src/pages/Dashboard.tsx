
import { DashboardStats } from "@/components/DashboardStats";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { CameraGrid } from "@/components/CameraGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentAlerts = [
  {
    id: 1,
    camera: "Front Entrance",
    type: "Person Detection",
    timestamp: "2 minutes ago",
    severity: "low",
  },
  {
    id: 2,
    camera: "Parking Lot",
    type: "Vehicle Detection",
    timestamp: "5 minutes ago",
    severity: "medium",
  },
  {
    id: 3,
    camera: "Loading Dock",
    type: "Safety Alert",
    timestamp: "1 hour ago",
    severity: "high",
  },
];

export default function Dashboard() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-danger-500";
      case "medium":
        return "bg-warning-500";
      default:
        return "bg-success-500";
    }
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your camera network and AI models</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)}`} />
                    <span className="font-medium text-sm">{alert.camera}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.type}</p>
                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
                <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Active Cameras</h2>
        <CameraGrid />
      </div>
    </div>
  );
}
