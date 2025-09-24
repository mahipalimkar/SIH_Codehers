import { useState, useEffect } from "react";
import {
  Bell,
  Users,
  Target,
  AlertTriangle,
  TrendingUp,
  Plus,
  Settings,
  Filter,
  Search,
  Moon,
  Sun,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";

interface Employee {
  id: string;
  name: string;
  currentRole: string;
  targetRole: string;
  readiness: number;
  performance: "high" | "medium" | "low";
  potential: "high" | "medium" | "low";
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "Anil Kumar",
    currentRole: "Deputy GM – Transmission",
    targetRole: "ED (Engineering)",
    readiness: 85,
    performance: "high",
    potential: "high",
  },
  {
    id: "EMP002",
    name: "Priya Singh",
    currentRole: "Senior Manager – Finance",
    targetRole: "Director (Finance)",
    readiness: 72,
    performance: "high",
    potential: "medium",
  },
  {
    id: "EMP003",
    name: "Ravi Sharma",
    currentRole: "Manager – Operations",
    targetRole: "Director (Operation)",
    readiness: 72,
    performance: "medium",
    potential: "high",
  },
  {
    id: "EMP004",
    name: "Sunita Verma",
    currentRole: "Engineer",
    targetRole: "ED (Engineering)",
    readiness: 91,
    performance: "high",
    potential: "high",
  },
  {
    id: "EMP005",
    name: "Rajesh Gupta",
    currentRole: "Manager – Corporate Communications",
    targetRole: "Executive Director – Corporate Communications",
    readiness: 45,
    performance: "medium",
    potential: "medium",
  },
];
// Add this new array after mockEmployees (around line 95)
const unassignedEmployees = [
  { id: "EMP006", name: "Vikram Patel" },
  { id: "EMP007", name: "Meera Joshi" },
  { id: "EMP008", name: "Arjun Reddy" },
  { id: "EMP009", name: "Kavita Nair" },
  { id: "EMP010", name: "Rohit Malhotra" },
  { id: "EMP011", name: "Deepika Sharma" },
  { id: "EMP012", name: "Sanjay Yadav" },
  { id: "EMP013", name: "Pooja Agarwal" },
  { id: "EMP014", name: "Karan Singh" },
  { id: "EMP015", name: "Neha Gupta" },
];
const jobMatrices: Record<string, number[][]> = {
  "Director (Operations)": [
    [1, 2, 1],
    [0, 3, 1],
    [1, 0, 2],
  ],
  "Director (Finance)": [
    [2, 1, 1],
    [1, 2, 1],
    [0, 1, 2],
  ],
  Designer: [
    [1, 0, 2],
    [1, 2, 0],
    [2, 1, 1],
  ],
};

const jobAnalytics: Record<
  string,
  {
    criticalRoles: { role: string; readiness: string; urgency: string }[];
    topMissingSkills: { skill: string; count: number }[];
  }
> = {
  "Director (Operations)": {
    criticalRoles: [
      { role: "Director (Operations)", readiness: "68%", urgency: "medium" },
      { role: "Director (Finance)", readiness: "75%", urgency: "high" },
      {
        role: "Executive Director (Engineering)",
        readiness: "67%",
        urgency: "medium",
      },
      { role: "Design Head", readiness: "40%", urgency: "low" },
    ],
    topMissingSkills: [
      { skill: "Advanced Leadership", count: 12 },
      { skill: "Risk Assessment", count: 8 },
      { skill: "Problem Solving", count: 3 },
      { skill: "System Architecture and Design", count: 5 },
    ],
  },
  "Director (Finance)": {
    criticalRoles: [
      { role: "Director (Operations)", readiness: "68%", urgency: "medium" },
      { role: "Director (Finance)", readiness: "75%", urgency: "high" },
      {
        role: "Executive Director (Engineering)",
        readiness: "67%",
        urgency: "medium",
      },
      { role: "Design Head", readiness: "40%", urgency: "low" },
    ],
    topMissingSkills: [
      { skill: "Strategic Planning", count: 15 },
      { skill: "Budget Management", count: 10 },
    ],
  },
  Designer: {
    criticalRoles: [
      { role: "Director (Operations)", readiness: "68%", urgency: "medium" },
      { role: "Director (Finance)", readiness: "75%", urgency: "high" },
      {
        role: "Executive Director (Engineering)",
        readiness: "67%",
        urgency: "medium",
      },
      { role: "Design Head", readiness: "40%", urgency: "low" },
    ],
    topMissingSkills: [
      { skill: "UX/UI Design", count: 14 },
      { skill: "Prototyping", count: 9 },
    ],
  },
};

// Mock employee projects, skills, roadmaps
const employeeProjects: Record<string, string[]> = {
  EMP001: ["Grid Modernization", "Safety Audit"],
  EMP002: ["Renewable Integration", "Budget Review"],
  EMP003: ["Data Analysis", "Reporting Automation"],
  EMP004: ["Infrastructure Upgrade"],
  EMP005: ["Specialist Training", "Compliance"],
};
const employeeSkills: Record<string, string[]> = {
  EMP001: ["Leadership", "Technical Expertise", "Risk Management"],
  EMP002: ["Project Planning", "Communication", "Budgeting"],
  EMP003: ["Data Analysis", "Problem Solving"],
  EMP004: ["Engineering", "Teamwork"],
  EMP005: ["Specialization", "Mentoring"],
};
const employeeRoadmaps: Record<string, string[]> = {
  EMP001: [
    "Complete Advanced Leadership Training",
    "Lead Grid Modernization Project",
    "Mentor junior engineers",
    "Prepare for Director (Operations) assessment",
  ],
  EMP002: [
    "Attend Strategic Planning Workshop",
    "Manage Renewable Integration project",
    "Shadow Senior Manager",
    "Review budget management skills",
  ],
  EMP003: [
    "Improve data visualization skills",
    "Automate reporting processes",
    "Participate in analytics bootcamp",
    "Prepare for Senior Analyst role",
  ],
  EMP004: [
    "Lead Infrastructure Upgrade",
    "Join teamwork enhancement program",
    "Take Senior Engineer certification",
    "Present at engineering seminar",
  ],
  EMP005: [
    "Complete Specialist Training",
    "Assist in compliance review",
    "Mentor new specialists",
    "Prepare for Lead Specialist promotion",
  ],
};

// Mock verifications (uploaded by employees)
const mockVerifications: {
  id: number;
  employeeId: string;
  file: string;
  status: "pending" | "approved";
}[] = [
  {
    id: 1,
    employeeId: "EMP001",
    file: "Leadership_Certificate.pdf",
    status: "approved",
  },
  {
    id: 2,
    employeeId: "EMP001",
    file: "Project_Completion_Grid.pdf",
    status: "pending",
  },
  {
    id: 3,
    employeeId: "EMP002",
    file: "Budget_Review_Certificate.pdf",
    status: "approved",
  },
  {
    id: 4,
    employeeId: "EMP003",
    file: "Analytics_Bootcamp.pdf",
    status: "pending",
  },
];

export function HRDashboard() {
  const [selectedJob, setSelectedJob] = useState("Director (Operations)");
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedVerificationEmp, setSelectedVerificationEmp] =
    useState<string>("");

  const boxCounts = jobMatrices[selectedJob];

  const getReadinessColor = (readiness: number) => {
    if (readiness >= 80) return "text-green-600";
    if (readiness >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) document.body.classList.add("dark");
      else document.body.classList.remove("dark");
      return next;
    });
  };

  return (
    <div
      className={`space-y-6 min-h-screen transition-colors ${
        darkMode ? "bg-[#18181b] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={darkMode ? "bg-[#232326] border-gray-700" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" /> Total Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">1,247</p>
            <p className="text-xs text-muted-foreground">+12 this quarter</p>
          </CardContent>
        </Card>
        <Card className={darkMode ? "bg-[#232326] border-gray-700" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" /> Ready for Promotion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium text-green-600">156</p>
            <p className="text-xs text-muted-foreground">12.5% of workforce</p>
          </CardContent>
        </Card>
        <Card className={darkMode ? "bg-[#232326] border-gray-700" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Critical Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium text-red-600">23</p>
            <p className="text-xs text-muted-foreground">
              Requires immediate action
            </p>
          </CardContent>
        </Card>
        <Card className={darkMode ? "bg-[#232326] border-gray-700" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Avg. Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium text-blue-600">73%</p>
            <p className="text-xs text-muted-foreground">
              +5% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose a job role -</h2>

      {/* Job Role & Dark Mode Toggle */}
      <div className="mb-4 w-full flex items-center justify-between">
        <div className="w-64">
          <Select defaultValue={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger
              className={
                darkMode ? "bg-[#27272a] text-gray-100 border-gray-700" : ""
              }
            >
              <SelectValue placeholder="Select job role" />
            </SelectTrigger>
            <SelectContent
              className={
                darkMode ? "bg-[#27272a] text-gray-100 border-gray-700" : ""
              }
            >
              {Object.keys(jobMatrices).map((job) => (
                <SelectItem key={job} value={job}>
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleDarkMode}
          className={
            darkMode ? "bg-[#27272a] text-gray-100 border-gray-700" : "ml-4"
          }
        >
          {darkMode ? (
            <>
              <Sun className="h-4 w-4 mr-2" /> Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" /> Dark Mode
            </>
          )}
        </Button>
      </div>

      {/* 9-Box Matrix & Analytics */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 9-Box */}
        
        <Card className={darkMode ? "bg-[#232326] border-gray-700" : ""}>
          <CardHeader>
            <CardTitle>9-Box Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-1 aspect-square max-w-sm">
              {[...boxCounts].reverse().map((row, rowIndex) =>
                row.map((count, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`border-2 rounded-lg p-2 flex flex-col justify-between text-center
                  ${
                    rowIndex === 0 && colIndex === 2
                      ? "bg-green-50 border-green-200"
                      : rowIndex === 0 && colIndex === 1
                      ? "bg-blue-50 border-blue-200"
                      : rowIndex === 2 && colIndex === 0
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  >
                    <div className="text-xs text-muted-foreground mb-1">
                      {
                        [
                          "Poor Performer",
                          "Underutilized",
                          "Star Player",
                          "Question Mark",
                          "Solid Performer",
                          "Key Player",
                          "Inconsistent Performer",
                          "Core Player",
                          "High Performer",
                        ][rowIndex * 3 + colIndex]
                      }
                    </div>
                    <div className="text-lg font-medium">{count}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className={darkMode ? "bg-[#232326] border-gray-700" : ""}>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h4 className="font-medium mb-2">Critical Role Readiness</h4>
              <div className="space-y-2">
                {jobAnalytics[selectedJob].criticalRoles.map((role, index) => {
                  const readinessValue = parseInt(
                    role.readiness.replace("%", "")
                  );
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{role.role}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            readinessValue >= 80
                              ? "text-green-600"
                              : readinessValue >= 60
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {role.readiness}
                        </span>
                        <Badge
                          variant={
                            role.urgency === "critical"
                              ? "destructive"
                              : role.urgency === "high"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {role.urgency}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              <h4 className="font-medium mb-2">Top Missing Skills (for current job)</h4>
              <div className="space-y-2">
                {jobAnalytics[selectedJob].topMissingSkills.map(
                  (skill, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{skill.skill}</span>
                      <Badge variant="outline">{skill.count} employees</Badge>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Tracking + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Development Tracking */}
        <Card
          className={`lg:col-span-2 ${
            darkMode ? "bg-[#232326] border-gray-700" : ""
          }`}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Employee Development Tracking</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      darkMode ? "text-gray-400" : "text-muted-foreground"
                    }`}
                  />
                  <Input
                    placeholder="Search employees..."
                    className={`pl-9 w-64 ${
                      darkMode
                        ? "bg-[#18181b] text-gray-100 border-gray-700 placeholder:text-gray-400"
                        : ""
                    }`}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={
                    darkMode ? "bg-[#27272a] text-gray-100 border-gray-700" : ""
                  }
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className={`p-3 border rounded-lg space-y-2 ${
                    darkMode ? "bg-[#18181b] border-gray-700" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{emp.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {emp.id}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {emp.currentRole} → {emp.targetRole}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div
                          className={`font-medium ${getReadinessColor(
                            emp.readiness
                          )}`}
                        >
                          {emp.readiness}%
                        </div>
                        <Progress value={emp.readiness} className="w-20 h-1" />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setExpandedEmployee(
                            expandedEmployee === emp.id ? null : emp.id
                          )
                        }
                      >
                        {expandedEmployee === emp.id
                          ? "Hide Details"
                          : "View Details"}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Employee Details */}
                  {expandedEmployee === emp.id && (
                    <div
                      className={`mt-3 p-3 rounded-lg space-y-3 ${
                        darkMode ? "bg-[#232326]" : "bg-gray-50"
                      }`}
                    >
                      <h4 className="font-medium text-sm">Employee Insights</h4>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Progress towards target role
                        </p>
                        <Progress value={emp.readiness} className="h-2" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Current Projects
                        </p>
                        <ul className="list-disc pl-4 text-xs">
                          {(employeeProjects[emp.id] || []).map((proj, idx) => (
                            <li key={idx}>{proj}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Skills
                        </p>
                        <div className="flex gap-1 flex-wrap">
                          {(employeeSkills[emp.id] || []).map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-[10px] px-2 py-0.5"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Roadmap
                        </p>
                        <ol className="list-decimal pl-4 text-xs">
                          {(employeeRoadmaps[emp.id] || []).map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className={darkMode ? "bg-[#232326] border-gray-700" : ""}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Card
              className={`p-3 ${
                darkMode ? "bg-[#18181b] border-gray-700" : ""
              }`}
            >
              <CardTitle className="text-sm mb-2">Role Assignment</CardTitle>
              <div className="space-y-2">
                <Select>
  <SelectTrigger>
    <SelectValue placeholder="Select employee" />
  </SelectTrigger>
  <SelectContent>
    {unassignedEmployees.map((emp) => (
      <SelectItem key={emp.id} value={emp.id}>
        {emp.name} ({emp.id})
      </SelectItem>
    ))}
  </SelectContent>
</Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Suggest target role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Director (Operations)</SelectItem>
                    <SelectItem value="senior">Senior Engineer</SelectItem>
                    <SelectItem value="lead">Lead Specialist</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="w-full">
                  Assign Role
                </Button>
              </div>
            </Card>

            <Card
              className={`p-3 ${
                darkMode ? "bg-[#18181b] border-gray-700" : ""
              }`}
            >
              <CardTitle className="text-sm mb-2">
                Resource Management
              </CardTitle>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Training Program
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Users className="h-4 w-4 mr-2" /> Manage Mentor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Target className="h-4 w-4 mr-2" /> Create Project
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" /> System Settings
                </Button>
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Verifications Section */}
      <Card className={darkMode ? "bg-[#232326] border-gray-700" : ""}>
        <CardHeader>
          <CardTitle>Employee Verifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select
              defaultValue={selectedVerificationEmp}
              onValueChange={setSelectedVerificationEmp}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                {mockEmployees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Only show verifications if an employee is selected */}
          {selectedVerificationEmp ? (
            <div className="space-y-2">
              {mockVerifications
                .filter((v) => v.employeeId === selectedVerificationEmp)
                .map((v) => (
                  <div
                    key={v.id}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span>{v.file}</span>
                      {v.status === "approved" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <Badge
                      variant={
                        v.status === "approved" ? "secondary" : "outline"
                      }
                    >
                      {v.status}
                    </Badge>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Select an employee to view their verifications.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
