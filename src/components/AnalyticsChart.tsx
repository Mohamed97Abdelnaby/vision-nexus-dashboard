import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar } from "recharts";

const hourlyData = [
  { hour: "00", detections: 12, alerts: 1, accuracy: 92 },
  { hour: "01", detections: 8, alerts: 0, accuracy: 94 },
  { hour: "02", detections: 5, alerts: 0, accuracy: 95 },
  { hour: "03", detections: 3, alerts: 0, accuracy: 96 },
  { hour: "04", detections: 7, alerts: 0, accuracy: 93 },
  { hour: "05", detections: 15, alerts: 1, accuracy: 91 },
  { hour: "06", detections: 35, alerts: 2, accuracy: 89 },
  { hour: "07", detections: 58, alerts: 3, accuracy: 87 },
  { hour: "08", detections: 89, alerts: 5, accuracy: 85 },
  { hour: "09", detections: 124, alerts: 7, accuracy: 88 },
  { hour: "10", detections: 156, alerts: 6, accuracy: 90 },
  { hour: "11", detections: 178, alerts: 4, accuracy: 92 },
  { hour: "12", detections: 198, alerts: 8, accuracy: 86 },
  { hour: "13", detections: 165, alerts: 6, accuracy: 89 },
  { hour: "14", detections: 142, alerts: 4, accuracy: 91 },
  { hour: "15", detections: 159, alerts: 5, accuracy: 90 },
  { hour: "16", detections: 187, alerts: 7, accuracy: 88 },
  { hour: "17", detections: 203, alerts: 9, accuracy: 85 },
  { hour: "18", detections: 145, alerts: 4, accuracy: 92 },
  { hour: "19", detections: 98, alerts: 2, accuracy: 94 },
  { hour: "20", detections: 67, alerts: 1, accuracy: 95 },
  { hour: "21", detections: 45, alerts: 1, accuracy: 93 },
  { hour: "22", detections: 32, alerts: 0, accuracy: 96 },
  { hour: "23", detections: 21, alerts: 0, accuracy: 97 },
];

const weeklyData = [
  { day: "Mon", detections: 1247, accuracy: 91, cameras: 22 },
  { day: "Tue", detections: 1356, accuracy: 89, cameras: 23 },
  { day: "Wed", detections: 1198, accuracy: 93, cameras: 24 },
  { day: "Thu", detections: 1445, accuracy: 88, cameras: 24 },
  { day: "Fri", detections: 1523, accuracy: 86, cameras: 24 },
  { day: "Sat", detections: 987, accuracy: 94, cameras: 20 },
  { day: "Sun", detections: 743, accuracy: 96, cameras: 18 },
];

const objectData = [
  { name: "Person", value: 45, color: "#0ea5e9", count: 5487 },
  { name: "Vehicle", value: 28, color: "#22c55e", count: 3421 },
  { name: "Package", value: 15, color: "#f59e0b", count: 1832 },
  { name: "Other", value: 12, color: "#ef4444", count: 1467 },
];

const cameraPerformanceData = [
  { name: "Front Entrance", detections: 1247, accuracy: 94, uptime: 99.8 },
  { name: "Parking Lot", detections: 892, accuracy: 91, uptime: 98.5 },
  { name: "Loading Dock", detections: 634, accuracy: 89, uptime: 97.2 },
  { name: "Back Exit", detections: 421, accuracy: 96, uptime: 99.1 },
  { name: "Conference Room", detections: 156, accuracy: 93, uptime: 95.8 },
];

const systemMetrics = [
  { name: "CPU", value: 67, color: "#f59e0b" },
  { name: "Memory", value: 45, color: "#22c55e" },
  { name: "Storage", value: 23, color: "#0ea5e9" },
  { name: "Network", value: 34, color: "#8b5cf6" },
];

export function AnalyticsChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Main Detection Chart */}
      <Card className="glass-effect col-span-full">
        <CardHeader>
          <CardTitle>Detections vs Alerts (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyData}>
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
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Trend */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Weekly Detection Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
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
              <Line 
                type="monotone" 
                dataKey="detections" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Object Distribution */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Object Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={objectData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {objectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {objectData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-xs font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Performance */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="80%"
              barSize={10}
              data={systemMetrics}
            >
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="value"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {systemMetrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: metric.color }}
                  />
                  <span className="text-sm">{metric.name}</span>
                </div>
                <span className="text-xs font-bold">{metric.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Camera Performance */}
      <Card className="glass-effect lg:col-span-2">
        <CardHeader>
          <CardTitle>Camera Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cameraPerformanceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                dataKey="name"
                type="category"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={100}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar 
                dataKey="detections" 
                fill="#0ea5e9"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Accuracy Trend */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Model Accuracy Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hourlyData.slice(-12)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                domain={[80, 100]}
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
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ fill: "#22c55e" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
