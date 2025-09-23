import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bell, BookOpen, Users, Target, Calendar, Award } from "lucide-react";

interface Skill {
  name: string;
  status: 'completed' | 'in-progress' | 'missing';
}

interface Milestone {
  quarter: string;
  type: 'training' | 'mentorship' | 'project';
  title: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface Resource {
  type: 'course' | 'mentor' | 'project';
  title: string;
  description: string;
  role?: "current" | "target";
}

const mockSkills: Skill[] = [
  { name: "Advanced Power Systems Analysis", status: "completed" },
  { name: "Leadership & Team Management", status: "in-progress" },
  { name: "Strategic Planning", status: "missing" },
  { name: "Risk Management", status: "completed" },
  { name: "Regulatory Compliance", status: "in-progress" },
  { name: "Budget & Financial Planning", status: "missing" },
  { name: "Project Management", status: "in-progress" },
  { name: "Cross-functional Collaboration", status: "completed" },
  { name: "Stakeholder Communication", status: "missing" },
];

const mockMilestones: Milestone[] = [
  { quarter: "Q1 2024", type: "training", title: "Leadership Fundamentals Course", status: "completed" },
  { quarter: "Q2 2024", type: "mentorship", title: "Senior Manager Mentorship Program", status: "current" },
  { quarter: "Q3 2024", type: "project", title: "Grid Modernization Initiative Lead", status: "upcoming" },
  { quarter: "Q4 2024", type: "training", title: "Advanced Strategic Planning Workshop", status: "upcoming" },
];

const mockResources: Resource[] = [
  {
    type: "course",
    title: "Strategic Planning Masterclass",
    description: "8-week intensive program covering strategic frameworks, execution, and real-world case studies."
  },
  {
    type: "mentor",
    title: "Sarah Johnson - VP Operations",
    description: "Available for bi-weekly mentoring sessions on leadership transition, team management, and strategic decision making."
  },
  {
    type: "project",
    title: "Energy Efficient Smart Grid Implementation Project",
    description: "Lead initiatives in Power Systems Division to implement smart grid technologies optimizing energy efficiency and operational performance.",
    role: "current"
  },
  {
    type: "project",
    title: "Smart Grid Implementation Project",
    description: "Lead a cross-functional team to implement advanced smart grid technologies, optimize energy efficiency, and ensure regulatory compliance across multiple departments.",
    role: "target"
  }
];

const mockNotifications = [
  { title: "Leadership Assessment Due", date: "Dec 15, 2024", type: "urgent" },
  { title: "Mentorship Session Scheduled", date: "Dec 18, 2024", type: "info" },
  { title: "Q4 Development Plan Review", date: "Dec 20, 2024", type: "reminder" }
];

export function EmployeeDashboard() {
  const [selectedRole, setSelectedRole] = useState<"current" | "target" | null>(null);

  const getSkillStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'missing': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'training': return <BookOpen className="h-4 w-4" />;
      case 'mentorship': return <Users className="h-4 w-4" />;
      case 'project': return <Target className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'mentor': return <Users className="h-4 w-4" />;
      case 'project': return <Target className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const roleInfo = {
    current: {
      roleName: "Senior Engineer",
      division: "Power Systems Division",
      skillNames: ["Advanced Power Systems Analysis", "Risk Management", "Leadership & Team Management"]
    },
    target: {
      roleName: "Engineering Manager",
      division: "Operations Leadership Track",
      skillNames: ["Strategic Planning", "Regulatory Compliance", "Budget & Financial Planning", "Project Management", "Cross-functional Collaboration", "Stakeholder Communication"]
    }
  };

  if (selectedRole) {
    const role = roleInfo[selectedRole];
    const skillsForRole = mockSkills.filter(skill => role.skillNames.includes(skill.name));
    const projectsForRole = mockResources.filter(r => r.type === "project" && r.role === selectedRole);
    const coursesForRole = mockResources.filter(r => r.type === "course");

    return (
      <div className="space-y-8 p-4 md:p-10">
        <Button onClick={() => setSelectedRole(null)} variant="link" className="text-lg">&larr; Back to Dashboard</Button>

        <Card className="shadow-lg rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">{role.roleName}</CardTitle>
            <p className="text-xl text-gray-600 mt-1">{role.division}</p>
          </CardHeader>
          <CardContent className="space-y-8 mt-6">

            <section>
              <h3 className="text-2xl font-semibold mb-4">Skills Required</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skillsForRole.map((skill, i) => (
                  <Badge
                    key={i}
                    className={`text-lg font-medium p-3 ${getSkillStatusColor(skill.status)} rounded-lg shadow-sm`}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-4">Key Projects</h3>
              <div className="space-y-3">
                {projectsForRole.map((p, i) => (
                  <Card key={i} className="p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="font-medium">{p.title}</h4>
                    <p className="text-sm text-gray-600">{p.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-4">Learning Resources</h3>
              <div className="space-y-3">
                {coursesForRole.map((c, i) => (
                  <Card key={i} className="p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="font-medium">{c.title}</h4>
                    <p className="text-sm text-gray-600">{c.description}</p>
                  </Card>
                ))}
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => setSelectedRole("current")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Current Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">Senior Engineer</p>
            <p className="text-muted-foreground text-sm">Power Systems Division</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => setSelectedRole("target")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Target Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">Engineering Manager</p>
            <p className="text-muted-foreground text-sm">Operations Leadership Track</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Readiness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-medium text-blue-600">72%</span>
                <span className="text-sm text-muted-foreground">Target: 85%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSkills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{skill.name}</span>
                  <Badge variant="outline" className={getSkillStatusColor(skill.status)}>
                    {skill.status.replace('-', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockNotifications.map((notification, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.date}</p>
                  </div>
                  <Badge variant={notification.type === 'urgent' ? 'destructive' : 'secondary'}>
                    {notification.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Development Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockMilestones.map((milestone, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                milestone.status === 'completed'
                  ? 'bg-green-50 border-green-200'
                  : milestone.status === 'current'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">{getMilestoneIcon(milestone.type)}
                  <span className="text-xs font-medium text-muted-foreground">{milestone.quarter}</span>
                </div>
                <h4 className="text-sm font-medium mb-1">{milestone.title}</h4>
                <Badge size="sm" variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                  {milestone.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources & Learning Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockResources.filter(r => r.type !== "project").map((resource, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {getResourceIcon(resource.type)}
                  <h4 className="font-medium">{resource.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <Button size="sm" variant="outline" className="w-full">{resource.type === 'mentor' ? 'Contact' : 'Access'}</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
