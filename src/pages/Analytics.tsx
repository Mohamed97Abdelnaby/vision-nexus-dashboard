
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { DetailedAnalytics } from "@/components/DetailedAnalytics";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, TrendingUp, Activity, BarChart3, Zap, Shield } from "lucide-react";

export default function Analytics() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights from your camera network and AI systems</p>
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Advanced
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <ChartBar className="w-4 h-4" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AnalyticsChart />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <AdvancedAnalytics />
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <AnalyticsChart />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <DetailedAnalytics />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
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
                  { name: "Front Entrance", detections: 1247, trend: "+12%" },
                  { name: "Parking Lot", detections: 892, trend: "+8%" },
                  { name: "Loading Dock", detections: 634, trend: "-3%" },
                  { name: "Back Exit", detections: 421, trend: "+15%" },
                ].map((camera, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium">{camera.name}</span>
                      <div className="text-xs text-muted-foreground">{camera.trend} vs last week</div>
                    </div>
                    <span className="text-tech-400 font-bold">{camera.detections}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Model Accuracy Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Person Detection", accuracy: "94.2%", trend: "+1.2%" },
                  { name: "Vehicle Detection", accuracy: "91.8%", trend: "+0.8%" },
                  { name: "License Plate", accuracy: "87.5%", trend: "-0.3%" },
                  { name: "Object Detection", accuracy: "89.1%", trend: "+2.1%" },
                ].map((model, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium">{model.name}</span>
                      <div className="text-xs text-muted-foreground">{model.trend} this week</div>
                    </div>
                    <span className="text-success-400 font-bold">{model.accuracy}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>System Metrics Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">CPU Usage</span>
                    <div className="text-xs text-muted-foreground">-5% vs yesterday</div>
                  </div>
                  <span className="text-warning-400 font-bold">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">Memory Usage</span>
                    <div className="text-xs text-muted-foreground">+2% vs yesterday</div>
                  </div>
                  <span className="text-success-400 font-bold">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">Storage</span>
                    <div className="text-xs text-muted-foreground">+1% vs yesterday</div>
                  </div>
                  <span className="text-tech-400 font-bold">23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">Network I/O</span>
                    <div className="text-xs text-muted-foreground">Stable</div>
                  </div>
                  <span className="text-success-400 font-bold">Normal</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
