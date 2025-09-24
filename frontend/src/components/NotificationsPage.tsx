import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Clock, AlertCircle, Info } from "lucide-react";

const mockNotifications = [
  { 
    id: 1,
    title: "Leadership Assessment Due", 
    description: "Complete your quarterly leadership skills assessment to track your progress towards Engineering Manager role.",
    date: "Dec 15, 2024", 
    type: "urgent",
    isRead: false
  },
  { 
    id: 2,
    title: "Mentorship Session Scheduled", 
    description: "Your next mentorship session with Sarah Johnson (VP Operations) is confirmed.",
    date: "Dec 18, 2024", 
    type: "info",
    isRead: false
  },
  { 
    id: 3,
    title: "Q4 Development Plan Review", 
    description: "Time to review your Q4 development goals and plan for Q1 2025 objectives.",
    date: "Dec 20, 2024", 
    type: "reminder",
    isRead: true
  },
  { 
    id: 4,
    title: "New Course Available", 
    description: "Strategic Planning Masterclass enrollment is now open. Early bird pricing ends soon.",
    date: "Dec 10, 2024", 
    type: "info",
    isRead: true
  },
  { 
    id: 5,
    title: "Project Milestone Achieved", 
    description: "Congratulations! You've completed Phase 1 of the Grid Modernization Initiative.",
    date: "Dec 8, 2024", 
    type: "success",
    isRead: true
  }
];

export function NotificationsPage() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/employee-dashboard');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'reminder': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'success': return <Bell className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
      case 'urgent': return 'destructive';
      case 'info': return 'default';
      case 'reminder': return 'secondary';
      case 'success': return 'outline';
      default: return 'secondary';
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={handleBackToDashboard}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <Card key={notification.id} className={`transition-all duration-200 hover:shadow-md ${!notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={getNotificationBadgeVariant(notification.type)} size="sm">
                        {notification.type}
                      </Badge>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {notification.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockNotifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-lg mb-2">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}