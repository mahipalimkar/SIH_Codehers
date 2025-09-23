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
  Users,
  UserPlus
} from "lucide-react";

interface LoginPageProps {
  onLogin: (role: 'user' | 'admin', userData: any) => void;
}

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const API_BASE_URL = "http://localhost:4001/api";

  // Validation functions
  const validateForm = (isSignup = false) => {
    const newErrors = {};

    if (isSignup && (!formData.username || formData.username.length < 3)) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.username && !isSignup) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const validationErrors = validateForm(false);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = userType === 'admin' ? `${API_BASE_URL}/admin/login` : `${API_BASE_URL}/user/login`;
      
      console.log('Attempting login to:', endpoint); // Debug log
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      console.log('Response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Response data:', data); // Debug log

      if (response.ok) {
        // Store token in localStorage for persistence
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userType', userType);
        }

        // Call the parent component's onLogin function
        onLogin(userType, {
          ...data.user || data.admin,
          name: formData.username,
          role: userType === 'admin' ? 'HR Manager' : 'Employee',
          department: userType === 'admin' ? 'Human Resources' : 'Power Systems Division'
        });
      } else {
        setErrors({ general: data.error || data.message || "Login failed" });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: "Network error. Please make sure the backend server is running on port 4001." });
    }

    setIsLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const validationErrors = validateForm(true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = userType === 'admin' ? `${API_BASE_URL}/admin/signup` : `${API_BASE_URL}/user/signup`;
      
      console.log('Attempting signup to:', endpoint); // Debug log
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      console.log('Signup response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Signup response data:', data); // Debug log

      if (response.ok) {
        // Switch to login tab after successful signup
        setActiveTab("login");
        setFormData(prev => ({ ...prev, password: "" }));
        setErrors({ general: "Account created successfully! Please login." });
      } else {
        setErrors({ general: data.message || data.errors?.[0] || "Signup failed" });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: "Network error. Please make sure the backend server is running on port 4001." });
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

        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setUserType('user')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    userType === 'user' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <User className="h-4 w-4 mr-2 inline" />
                  Employee
                </button>
                <button
                  onClick={() => setUserType('admin')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    userType === 'admin' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Users className="h-4 w-4 mr-2 inline" />
                  Admin
                </button>
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900">
              {userType === 'admin' ? 'Admin Access' : 'Employee Portal'}
            </CardTitle>
            <p className="text-center text-gray-600">
              {activeTab === 'login' ? 'Welcome back to your portal' : 'Create your account'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Login/Signup Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'login' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'signup' 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </button>
            </div>

            {/* Global Error Display */}
            {errors.general && (
              <Alert variant={errors.general.includes('successfully') ? "default" : "destructive"} 
                     className={errors.general.includes('successfully') ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username" className="text-gray-700">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-username"
                      type="text"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={`pl-10 h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400 ${
                        errors.username ? 'border-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-red-600">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
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
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username" className="text-gray-700">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={`pl-10 h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400 ${
                        errors.username ? 'border-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-red-600">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Create Account Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Information Section */}
            <div className="pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">
                  {userType === 'admin' ? 'Admin Dashboard Access' : 'Employee Portal Access'}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Shield className="h-3 w-3" />
                  <span>Secure JWT Authentication</span>
                </div>
              </div>
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
            Role-based access with JWT token authentication
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