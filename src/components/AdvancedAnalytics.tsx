
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, AreaChart, ScatterChart, Scatter, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Zap, Shield, Eye, Clock, Activity, AlertTriangle, Users, Camera } from "lucide-react";

const threatDetectionData = [
  { time: "00:00", threats: 2, severity: "low", responseTime: 3.2, resolved: 2 },
  { time: "04:00", threats: 0, severity: "none", responseTime: 0, resolved: 0 },
  { time: "08:00", threats: 5, severity: "medium", responseTime: 2.8, resolved: 4 },
  { time: "12:00", threats: 8, severity: "high", responseTime: 1.5, resolved: 6 },
  { time: "16:00", threats: 3, severity: "low", responseTime: 3.1, resolved: 3 },
  { time: "20:00", threats: 1, severity: "low", responseTime: 2.9, resolved: 1 },
];

const predictionAccuracy = [
  { model: "Person Detection", accuracy: 94.2, confidence: 0.92, samples: 15420 },
  { model: "Vehicle Recognition", accuracy: 91.8, confidence: 0.89, samples: 8930 },
  { model: "Anomaly Detection", accuracy: 87.5, confidence: 0.85, samples: 3240 },
  { model: "Face Recognition", accuracy: 89.1, confidence: 0.88, samples: 5670 },
];

const realTimeMetrics = [
  { metric: "Active Cameras", value: 24, trend: "+2", status: "good" },
  { metric: "Processing Speed", value: "45ms", trend: "-3ms", status: "excellent" },
  { metric: "Storage Used", value: "67%", trend: "+12%", status: "warning" },
  { metric: "Bandwidth", value: "234 Mbps", trend: "+15%", status: "good" },
];

const cameraPerformanceData = [
  { camera: "Entrance", uptime: 99.8, alerts: 34, quality: 95 },
  { camera: "Parking", uptime: 98.2, alerts: 12, quality: 92 },
  { camera: "Loading", uptime: 97.5, alerts: 8, quality: 88 },
  { camera: "Exit", uptime: 99.1, alerts: 15, quality: 94 },
  { camera: "Office", uptime: 98.8, alerts: 6, quality: 96 },
];

const detectionTypeData = [
  { name: "Person", value: 45, color: "#0ea5e9" },
  { name: "Vehicle", value: 28, color: "#22c55e" },
  { name: "Package", value: 15, color: "#f59e0b" },
  { name: "Animal", value: 8, color: "#ef4444" },
  { name: "Other", value: 4, color: "#8b5cf6" },
];

const hourlyActivityData = [
  { hour: "00", detections: 12, alerts: 2 },
  { hour: "06", detections: 45, alerts: 5 },
  { hour: "12", detections: 89, alerts: 12 },
  { hour: "18", detections: 76, alerts: 8 },
];

export function AdvancedAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Threat Detection Timeline */}
      <Card className="glass-effect col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Threat Detection & Response Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={threatDetectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area 
                type="monotone"
                dataKey="threats" 
                fill="#ef4444"
                fillOpacity={0.3}
                stroke="#ef4444"
              />
              <Line 
                type="monotone" 
                dataKey="responseTime" 
                stroke="#22c55e" 
                strokeWidth={2}
                yAxisId="right"
              />
              <Bar 
                dataKey="resolved" 
                fill="#0ea5e9"
                opacity={0.7}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detection Types Distribution */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Detection Types Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={detectionTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {detectionTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Camera Performance */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Camera Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cameraPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="camera" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="uptime" fill="#22c55e" />
              <Bar dataKey="quality" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Hourly Activity Pattern */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            24H Activity Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area 
                type="monotone"
                dataKey="detections" 
                stackId="1"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.6}
              />
              <Area 
                type="monotone"
                dataKey="alerts" 
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Real-time Metrics */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Real-time System Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {realTimeMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <div className="text-sm font-medium">{metric.metric}</div>
                <div className="text-2xl font-bold">{metric.value}</div>
              </div>
              <div className="flex items-center gap-2">
                {metric.trend.startsWith('+') ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge variant={metric.status === 'excellent' ? 'default' : metric.status === 'warning' ? 'destructive' : 'secondary'}>
                  {metric.trend}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Model Prediction Accuracy */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            AI Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictionAccuracy.map((model, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{model.model}</span>
                <Badge variant="outline">{model.accuracy}%</Badge>
              </div>
              <Progress value={model.accuracy} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Confidence: {(model.confidence * 100).toFixed(1)}%</span>
                <span>Samples: {model.samples.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Processing Speed Analysis */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Processing Speed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart data={predictionAccuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="accuracy" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[85, 95]}
              />
              <YAxis 
                dataKey="confidence"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0.8, 1]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Scatter 
                dataKey="samples" 
                fill="#0ea5e9"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
