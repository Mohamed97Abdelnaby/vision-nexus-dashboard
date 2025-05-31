
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Settings as SettingsIcon, 
  Camera, 
  Bell, 
  Shield, 
  Database, 
  Wifi, 
  User,
  LogOut,
  UserCog
} from "lucide-react";

export default function Settings() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your system preferences and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Account Settings */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account
            </CardTitle>
            <CardDescription>Manage your account and profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Signed in as:</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <Badge variant="secondary">{user?.name}</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={handleProfileClick} className="w-full">
                <UserCog className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="destructive" onClick={handleLogout} className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Camera Settings */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Camera Configuration
            </CardTitle>
            <CardDescription>Configure camera settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Auto-detection</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Recording Quality</span>
              <Badge variant="secondary">HD</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Night Vision</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <Button variant="outline" className="w-full">Configure Cameras</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage alert and notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Motion Alerts</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">System Alerts</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Email Notifications</span>
              <Badge variant="secondary">Disabled</Badge>
            </div>
            <Button variant="outline" className="w-full">Configure Notifications</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>Security and access control settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Two-Factor Auth</span>
              <Badge variant="secondary">Disabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Session Timeout</span>
              <Badge variant="default">24h</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Login Attempts</span>
              <Badge variant="default">5 max</Badge>
            </div>
            <Button variant="outline" className="w-full">Security Settings</Button>
          </CardContent>
        </Card>

        {/* Storage Management */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Storage
            </CardTitle>
            <CardDescription>Manage data storage and retention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Used Storage</span>
              <Badge variant="default">2.3 TB</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Retention Period</span>
              <Badge variant="secondary">30 days</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Auto-cleanup</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <Button variant="outline" className="w-full">Manage Storage</Button>
          </CardContent>
        </Card>

        {/* Network Settings */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5" />
              Network
            </CardTitle>
            <CardDescription>Network and connectivity settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Connection Status</span>
              <Badge variant="default">Online</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Bandwidth Usage</span>
              <Badge variant="secondary">Normal</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Remote Access</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <Button variant="outline" className="w-full">Network Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
