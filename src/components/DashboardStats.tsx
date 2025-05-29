
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ChartBar, LayoutDashboard, AlertTriangle } from "lucide-react";

const stats = [
  {
    title: "Active Cameras",
    value: "24",
    change: "+2 from yesterday",
    icon: Camera,
    color: "text-tech-400",
    bgColor: "bg-tech-500/10",
  },
  {
    title: "Models Running",
    value: "47",
    change: "+5 this week",
    icon: LayoutDashboard,
    color: "text-success-500",
    bgColor: "bg-success-500/10",
  },
  {
    title: "Objects Detected",
    value: "12,847",
    change: "+1,234 today",
    icon: ChartBar,
    color: "text-warning-500",
    bgColor: "bg-warning-500/10",
  },
  {
    title: "Alerts Triggered",
    value: "3",
    change: "-2 from yesterday",
    icon: AlertTriangle,
    color: "text-danger-500",
    bgColor: "bg-danger-500/10",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-effect hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
