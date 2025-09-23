import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { HRDashboard } from "./components/HRDashboard";
import { LoginPage } from "./components/LoginPage";
import { 
  Building, 
  Settings,
  Bell,
  LogOut 
} from "lucide-react";

type UserRole = 'user' | 'admin';

// Protected Route Component
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole: UserRole }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserType = localStorage.getItem('userType') as UserRole;
    
    if (token && savedUserType) {
      setIsAuthenticated(true);
      setUserRole(savedUserType);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== requiredRole) {
    // Redirect to correct dashboard based on user role
    const correctPath = userRole === 'admin' ? '/admin-dashboard' : '/employee-dashboard';
    return <Navigate to={correctPath} replace />;
  }

  return <>{children}</>;
}

// Dashboard Layout Component
function DashboardLayout({ userRole, children }: { userRole: UserRole, children: React.ReactNode }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: "John Smith",
    role: userRole === 'admin' ? "Administrator" : "Senior Engineer",
    department: "Power Systems Division"
  });

  const handleLogout = async () => {
    try {
      // Call logout API
      const endpoint = userRole === 'admin' 
        ? 'http://localhost:4001/api/admin/logout' 
        : 'http://localhost:4001/api/user/logout';
      
      await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Navigate to login
    navigate('/', { replace: true });
  };

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
                    {currentUser.name.split(' ').map((n: string) => n[0]).join('')}
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
                {userRole === 'user' ? 'My Development Dashboard' : 'Admin Management Dashboard'}
              </h2>
              <p className="text-gray-600">
                {userRole === 'user' 
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
                {userRole === 'user' ? 'Employee View' : 'Admin View'}
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
          {children}
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
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
                <p className="text-2xl font-semibold text-orange-600">89</p>
                <p className="text-sm text-gray-600">In Development</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-purple-600">34</p>
                <p className="text-sm text-gray-600">Critical Positions</p>
              </div>
            </div>
          </div>
        </div>
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

// Main Login Route Component
function LoginRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    // Always clear any existing tokens on app load to force fresh login
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }, []);

  const handleLogin = (role: UserRole, user: any) => {
    // Navigate to appropriate dashboard
    const dashboardPath = role === 'admin' ? '/admin-dashboard' : '/employee-dashboard';
    navigate(dashboardPath, { replace: true });
  };

  return <LoginPage onLogin={handleLogin} />;
}

export default function App() {
  return (
    <Routes>
      {/* Login Route - Default route, always shows auth page when not logged in */}
      <Route path="/" element={<LoginRoute />} />
      
      {/* Protected Employee Dashboard */}
      <Route 
        path="/employee-dashboard" 
        element={
          // <ProtectedRoute requiredRole="user">
            <DashboardLayout userRole="user">
              <EmployeeDashboard />
            </DashboardLayout>
          // </ProtectedRoute>
        } 
      />
      
      {/* Protected Admin Dashboard */}
      <Route 
        path="/admin-dashboard" 
        element={
          // <ProtectedRoute requiredRole="admin">
            <DashboardLayout userRole="admin">
              <HRDashboard />
            </DashboardLayout>
          // </ProtectedRoute>
        } 
      />
      
      {/* Catch all route - redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}