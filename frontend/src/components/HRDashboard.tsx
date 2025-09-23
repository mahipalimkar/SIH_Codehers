import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Users, Target, AlertTriangle, TrendingUp } from "lucide-react";

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

const jobAnalytics: Record<
  string,
  {
    criticalRoles: { role: string; readiness: string; urgency: string }[];
    topMissingSkills: { skill: string; count: number }[];
  }
> = {
  "Engineering Manager": {
    criticalRoles: [
      { role: "Engineering Manager", readiness: "68%", urgency: "high" },
      { role: "Technical Director", readiness: "75%", urgency: "medium" },
    ],
    topMissingSkills: [
      { skill: "Advanced Leadership", count: 12 },
      { skill: "Risk Assessment", count: 8 },
    ],
  },
  "Project Manager": {
    criticalRoles: [
      { role: "Senior Manager", readiness: "42%", urgency: "critical" },
      { role: "Operations Lead", readiness: "60%", urgency: "high" },
    ],
    topMissingSkills: [
      { skill: "Strategic Planning", count: 15 },
      { skill: "Budget Management", count: 10 },
    ],
  },
  Designer: {
    criticalRoles: [
      { role: "Lead Designer", readiness: "70%", urgency: "high" },
      { role: "Creative Director", readiness: "50%", urgency: "medium" },
    ],
    topMissingSkills: [
      { skill: "UX/UI Design", count: 14 },
      { skill: "Prototyping", count: 9 },
    ],
  },
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
      {/* Job Role Dropdown - COMMON */}
      <div className="mb-4 w-64">
        <Select defaultValue={selectedJob} onValueChange={setSelectedJob}>
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
            <p className="text-2xl font-medium">1,247</p>
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
            <p className="text-2xl font-medium text-green-600">156</p>
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
            <p className="text-2xl font-medium text-red-600">23</p>
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
                  defaultValue={selectedJob}
                  onValueChange={setSelectedJob}
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

        {/* Analytics Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Critical Role Readiness */}
              <div>
                <h4 className="font-medium mb-2">Critical Role Readiness</h4>
                <div className="space-y-2">
                  {/* Job Role Dropdown */}
                  <div className="mb-4 w-64">
                    <Select
                      defaultValue={selectedJob}
                      onValueChange={setSelectedJob}
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

                  {jobAnalytics[selectedJob].criticalRoles.map(
                    (role, index) => {
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
                    }
                  )}
                </div>
              </div>

              {/* Top Missing Skills */}
              <div>
                <h4 className="font-medium mb-2">Top Missing Skills</h4>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
