import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { HRDashboard } from "./components/HRDashboard";
import { LoginPage } from "./components/LoginPage";
import { 
  User, 
  Users, 
  Building, 
  Settings,
  Bell,
  LogOut 
} from "lucide-react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeRole, setActiveRole] = useState<'employee' | 'hr'>('employee');
  const [currentUser, setCurrentUser] = useState({
    name: "John Smith",
    role: "Senior Engineer",
    department: "Power Systems Division"
  });

  const handleLogin = (role: 'employee' | 'hr', user: any) => {
    setActiveRole(role);
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveRole('employee');
    setCurrentUser({
      name: "John Smith",
      role: "Senior Engineer",
      department: "Power Systems Division"
    });
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">PowerGrid</h1>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Succession Planning & Development
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Role Switcher */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={activeRole === 'employee' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveRole('employee')}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Employee
              </Button>
              <Button
                variant={activeRole === 'hr' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveRole('hr')}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                HR/Committee
              </Button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              <div className="flex items-center gap-2 pl-3 border-l border-gray-300">
                <div className="text-right">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.role}</p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <LogOut 
                  className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700 ml-2" 
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {activeRole === 'employee' ? 'My Development Dashboard' : 'HR Management Dashboard'}
              </h2>
              <p className="text-gray-600">
                {activeRole === 'employee' 
                  ? 'Track your career progression and development opportunities'
                  : 'Manage employee development and succession planning across the organization'
                }
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {activeRole === 'employee' ? 'Employee View' : 'HR/Committee View'}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Customize View
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {activeRole === 'employee' ? (
            <EmployeeDashboard />
          ) : (
            <HRDashboard />
          )}
        </div>

        {/* Quick Stats Footer */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-blue-600">1,247</p>
                <p className="text-sm text-gray-600">Total Employees</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-600">156</p>
                <p className="text-sm text-gray-600">Ready for Promotion</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibent text-orange-600">89</p>
                <p className="text-sm text-gray-600">In Development</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-purple-600">34</p>
                <p className="text-sm text-gray-600">Critical Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 PowerGrid Corporation. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}