import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Target,
  Plus,
  Settings,
  Search,
  Filter,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  currentRole: string;
  targetRole: string;
  readiness: number;
  performance: "high" | "medium" | "low";
  potential: "high" | "medium" | "low";
}

const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Smith",
    currentRole: "Senior Engineer",
    targetRole: "Engineering Manager",
    readiness: 85,
    performance: "high",
    potential: "high",
  },
  {
    id: "EMP002",
    name: "Sarah Davis",
    currentRole: "Project Manager",
    targetRole: "Senior Manager",
    readiness: 72,
    performance: "high",
    potential: "medium",
  },
  {
    id: "EMP003",
    name: "Mike Johnson",
    currentRole: "Analyst",
    targetRole: "Senior Analyst",
    readiness: 68,
    performance: "medium",
    potential: "high",
  },
  {
    id: "EMP004",
    name: "Lisa Wang",
    currentRole: "Engineer",
    targetRole: "Senior Engineer",
    readiness: 91,
    performance: "high",
    potential: "high",
  },
  {
    id: "EMP005",
    name: "David Brown",
    currentRole: "Specialist",
    targetRole: "Lead Specialist",
    readiness: 45,
    performance: "medium",
    potential: "medium",
  },
];

const criticalRoles = [
  { role: "Engineering Manager", readiness: "68%", urgency: "high" },
  { role: "Senior Operations Manager", readiness: "42%", urgency: "critical" },
  { role: "Technical Director", readiness: "75%", urgency: "medium" },
];

const topMissingSkills = [
  { skill: "Strategic Planning", count: 15 },
  { skill: "Advanced Leadership", count: 12 },
  { skill: "Budget Management", count: 10 },
  { skill: "Risk Assessment", count: 8 },
];

// Job-specific 9-box matrices
const jobMatrices: Record<string, number[][]> = {
  "Engineering Manager": [
    [1, 2, 1],
    [0, 3, 1],
    [1, 0, 2],
  ],
  "Project Manager": [
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

export function HRDashboard() {
  const [selectedJob, setSelectedJob] = useState("Engineering Manager");

  const boxCounts = jobMatrices[selectedJob];

  const boxLabels = [
    ["Inconsistent Performer", "Core Player", "High Performer"],
    ["Question Mark", "Solid Performer", "Key Player"],
    ["Poor Performer", "Underutilized", "Star Player"],
  ];

  const getReadinessColor = (readiness: number) => {
    if (readiness >= 80) return "text-green-600";
    if (readiness >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">10</p>
            <p className="text-xs text-muted-foreground">+12 this quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              Ready for Promotion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium text-green-600">2</p>
            <p className="text-xs text-muted-foreground">12.5% of workforce</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium text-red-600">3</p>
            <p className="text-xs text-muted-foreground">
              Requires immediate action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg. Readiness
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 9-Box Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>9-Box Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Job Role Dropdown */}
              <div className="mb-4 w-64">
                <Select
                  value={selectedJob}
                  onValueChange={(value) => setSelectedJob(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(jobMatrices).map((job) => (
                      <SelectItem key={job} value={job}>
                        {job}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <span className="text-xs text-muted-foreground">
                  High Potential →
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 aspect-square max-w-sm">
                {boxCounts.reverse().map((row, rowIndex) =>
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
                        {boxLabels[2 - rowIndex][colIndex]}
                      </div>
                      <div className="text-lg font-medium">{count}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-start">
                <span className="text-xs text-muted-foreground">
                  High Performance ↑
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Critical Role Readiness</h4>
                <div className="space-y-2">
                  {criticalRoles.map((role, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{role.role}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${getReadinessColor(
                            parseInt(role.readiness)
                          )}`}
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
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Top Missing Skills</h4>
                <div className="space-y-2">
                  {topMissingSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{skill.skill}</span>
                      <Badge variant="outline">{skill.count} employees</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee List & Management */}
      {/* ...Keep the rest of your employee list and quick actions as-is... */}
    </div>
  );
}
