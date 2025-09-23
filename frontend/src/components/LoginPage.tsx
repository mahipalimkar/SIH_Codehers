import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Building, 
  Zap, 
  User, 
  Lock, 
  LogIn,
  AlertCircle,
  Shield,
  Users
} from "lucide-react";

interface LoginPageProps {
  onLogin: (role: 'employee' | 'hr', user: any) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Accept any credentials - for demo purposes
    if (username.trim() && password.trim()) {
      // Determine role based on username pattern or default to employee
      // If username contains 'hr' or 'admin', assign HR role, otherwise employee
      const isHR = username.toLowerCase().includes('hr') || 
                   username.toLowerCase().includes('admin') || 
                   username.toLowerCase().includes('manager');
      
      const role = isHR ? 'hr' : 'employee';
      
      // Create user object with provided username
      const userDisplayName = username.split('.').map((part: string) => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ') || 'User';
      
      onLogin(role, {
        name: userDisplayName,
        role: isHR ? 'HR Manager' : 'Employee',
        department: isHR ? 'Human Resources' : 'Power Systems Division'
      });
    } else {
      setError("Please enter both username and password.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_26%,transparent_27%,transparent_74%,rgba(59,130,246,0.05)_75%,rgba(59,130,246,0.05)_76%,transparent_77%)] bg-[length:60px_60px]" />
      
      <div className="relative w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="relative">
              <Building className="h-12 w-12 text-blue-600" />
              <Zap className="absolute -top-1 -right-1 h-6 w-6 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">PowerGrid</h1>
              <div className="flex items-center gap-2 justify-center">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                  Enterprise Portal
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-gray-600 font-medium">Future Leaders of PowerGrid</p>
          <p className="text-sm text-gray-500 mt-1">Succession Planning & Development System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center text-gray-900">Welcome Back</CardTitle>
            <p className="text-center text-gray-600">
              Access your development portal
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Demo Information */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center mb-3">Demo Mode - Any Credentials Accepted:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-blue-600" />
                    <span className="font-medium text-blue-900">Employee Access</span>
                  </div>
                  <div className="text-blue-700">
                    <div>Any username / Any password</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-green-600" />
                    <span className="font-medium text-green-900">HR/Admin Access</span>
                  </div>
                  <div className="text-green-700">
                    <div>Username with 'hr', 'admin', or 'manager'</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Role determined by username pattern
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="h-3 w-3" />
            <span>Secure enterprise authentication</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Demo mode: Role-based access with flexible authentication
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          © 2024 PowerGrid Corporation. All rights reserved.
        </div>
      </div>
    </div>
  );
}