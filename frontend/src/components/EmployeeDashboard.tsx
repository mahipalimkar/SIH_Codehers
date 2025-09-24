import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bell, BookOpen, Users, Target, Calendar, Award, MapPin, BarChart3, PieChart, TrendingUp, Calculator, Loader2 } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";

interface Skill {
  name: string;
  category: 'skill' | 'knowledge' | 'leadership';
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
  // Skill Gap
  { name: "Asset Management Systems", category: "skill" },
  { name: "Real-Time Monitoring / SCADA", category: "skill" },
  { name: "Preventive and Predictive Maintenance", category: "skill" },
  // { name: "Energy Efficiency Optimization", category: "skill" },
  
  // Knowledge Gap
  { name: "Transmission network operations", category: "knowledge" },
  { name: "technical specs (e.g.', 'HVDC etc.)", category: "knowledge" },
  // { name: "Environmental Impact Assessment", category: "knowledge" },
  // { name: "Smart Grid Technologies", category: "knowledge" },
  
  // Leadership Gap
  { name: "Operational Excellence", category: "leadership" },
  { name: "Accountability", category: "leadership" },
  { name: "Resilience", category: "leadership" },
  // { name: "Stakeholder Communication", category: "leadership" },
];

const mockMilestones: Milestone[] = [
  // ===== Year 1: Foundational Technical Expertise & Operational Leadership =====
  { quarter: "Q1 2024", type: "training", title: "Integrated O&M of Transmission Line & Substation (Asset Management Systems)", status: "current" },
  { quarter: "Q2 2024", type: "rotation", title: "3-Month NTAMC Manesar Rotation (SCADA/Real-Time Monitoring)", status: "upcoming" },
  { quarter: "Q2 2024", type: "training", title: "Best Practices in Transmission System Program", status: "upcoming" },
  { quarter: "Q3 2024", type: "shadowing", title: "Shadowing Senior Engineers in Technical Specifications Unit (2 months)", status: "upcoming" },
  { quarter: "Q3 2024", type: "rotation", title: "2-Month RTAMC Rotation – Regional Transmission Ops", status: "upcoming" },
  { quarter: "Q4 2024", type: "training", title: "Behavioral/Leadership Development Program (Accountability & Resilience)", status: "upcoming" },

  // ===== Year 2: Strategic Operational Expertise & Executive Visibility =====
  { quarter: "Q1 2025", type: "training", title: "Power Systems: Concept to Commissioning (HVDC Focus)", status: "upcoming" },
  { quarter: "Q1 2025", type: "project", title: "Lead Pilot Project – Predictive Maintenance Strategy at Substation", status: "upcoming" },
  { quarter: "Q2 2025", type: "certification", title: "Operational Excellence Certification", status: "upcoming" },
  { quarter: "Q2 2025", type: "shadowing", title: "6-Month Shadowing with ED-Operations", status: "upcoming" },
  { quarter: "Q3 2025", type: "study", title: "Cross-Regional Benchmarking of Operational Efficiency", status: "upcoming" },
  { quarter: "Q4 2025", type: "exposure", title: "Regulatory Interface Participation (Prepare Briefings, Attend Meetings)", status: "upcoming" },

  // ===== Year 3: Executive Readiness & Enterprise Leadership =====
  { quarter: "Q1 2027", type: "committee", title: "Observer – Corporate Strategy Committee Meetings (6 months)", status: "upcoming" },
  { quarter: "Q2 2027", type: "presentation", title: "Board-Level Presentation: Benchmarking + Predictive Maintenance Results", status: "upcoming" },
  { quarter: "Q2 2027", type: "rotation", title: "2-Month Assignment in Finance/Project Management (P&L Exposure)", status: "upcoming" },
  { quarter: "Q3 2027", type: "simulation", title: "Large-Scale Outage Management Simulation – Lead Team Response", status: "upcoming" },
  { quarter: "Q3 2027", type: "training", title: "Capital Project Approval & Appraisal Training", status: "upcoming" },
  { quarter: "Q4 2027", type: "exposure", title: "Stakeholder Governance – Represent POWERGRID at Industry Conference", status: "upcoming" },
];


const mockResources: Resource[] = [
  {
    type: "course",
    title: "NPTI — Training Programs & Smart Grid Courses",
    description: "The National Power Training Institute (NPTI) offers training in transmission, distribution, SCADA/EMS, smart grid, condition-based maintenance, etc. This is highly relevant because many of your technical gaps (asset management systems, real-time monitoring) fall in their domain."
  },
  {
    type: "course",
    title: "Hitachi Energy Grid Academy",
    description: "They offer specialist courses in power systems, grid codes, HVDC, system engineering, and grid technologies. Great for more advanced/industry‐level technical knowledge."
  },
  {
    type: "course",
    title: "NPTEL / edX – Smart Grid / Transmission Courses",
    description: "NPTEL’s “Smart Grid: Basics to Advanced Technologies” covers many relevant topics (microgrids, real-time monitoring, integration)",
  },
];

export function EmployeeDashboard() {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showGaps, setShowGaps] = useState(false);
  const [isComputing, setIsComputing] = useState(false);

 const [activeAction, setActiveAction] = useState<{
  milestoneId: number;
  type: "request" | "upload";
} | null>(null);
const [showSuccess, setShowSuccess] = useState(false);

const handleAction = () => {
 
  setShowSuccess(true);

  setTimeout(() => {
    setActiveAction(null);
    setShowSuccess(false);
  }, 2000);
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'skill': return <Target className="h-5 w-5 text-blue-600" />;
      case 'knowledge': return <BookOpen className="h-5 w-5 text-red-600" />;
      case 'leadership': return <Users className="h-5 w-5 text-green-600" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'skill': return 'bg-blue-50 border-blue-200';
      case 'knowledge': return 'bg-red-50 border-red-200';
      case 'leadership': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleComputeGap = async () => {
    setIsComputing(true);
    
    // Simulate 5-second computation
    setTimeout(() => {
      setIsComputing(false);
      setShowGaps(true);
    }, 5000);
  };

  const skillGapItems = mockSkills.filter(skill => skill.category === 'skill');
  const knowledgeGapItems = mockSkills.filter(skill => skill.category === 'knowledge');
  const leadershipGapItems = mockSkills.filter(skill => skill.category === 'leadership');

  // Competency completion percentages
  const competencyData = {
    skill: 65,
    knowledge: 78,
    leadership: 82
  };

  const BreakdownChart = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Readiness Score Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Skills */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  Technical Skills
                </span>
                <span className="text-sm font-semibold text-blue-600">{competencyData.skill}%</span>
              </div>
              <Progress value={competencyData.skill} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">Power systems, grid modernization, safety protocols</p>
            </div>

            {/* Knowledge */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-red-600" />
                  Domain Knowledge
                </span>
                <span className="text-sm font-semibold text-red-600">{competencyData.knowledge}%</span>
              </div>
              <Progress value={competencyData.knowledge} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">Regulatory compliance, industry standards, best practices</p>
            </div>

            {/* Leadership */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  Leadership Capabilities
                </span>
                <span className="text-sm font-semibold text-green-600">{competencyData.leadership}%</span>
              </div>
              <Progress value={competencyData.leadership} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">Team management, strategic planning, communication</p>
            </div>
          </div>

          {/* Visual representation */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="text-blue-700 font-bold">{competencyData.skill}%</span>
              </div>
              <p className="text-xs font-medium">Technical Skills</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-2">
                <span className="text-red-700 font-bold">{competencyData.knowledge}%</span>
              </div>
              <p className="text-xs font-medium">Domain Knowledge</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-2">
                <span className="text-green-700 font-bold">{competencyData.leadership}%</span>
              </div>
              <p className="text-xs font-medium">Leadership</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <div className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-transparent animate-pulse"></div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-700">Computing Competency Gaps...</p>
        <p className="text-sm text-gray-500">Analyzing your skills against target role requirements</p>
      </div>
      <div className="flex items-center space-x-2 text-xs text-gray-400">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 ">
      <div className="bg-gray grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Current Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">Manager – Operations</p>
            <br />
            <p className="text-muted-foreground text-sm"><b>Skills - </b>
SCADA, Asset Management, Preventive Maintenance</p>
<p className="text-muted-foreground text-sm"><b>Leadership experience - </b>
Crisis Management, Team Leadership</p>
<p className="text-muted-foreground text-sm"><b>Core knowledge - </b>
Grid stability, maintenance standards</p>
<p className="text-muted-foreground text-sm"><b>Years of experience </b>- 13</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Target Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">Director (Operations)</p>
            <p className="text-muted-foreground text-sm">Grid Operations, Transmission, Maintenance</p>

            
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Readiness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-2xl font-medium text-blue-600">72%</span>
                <span className="text-sm text-muted-foreground">Target: 85%</span>
              </div>
              <Progress value={72} className="h-2" />
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-xs"
                onClick={() => setShowBreakdown(!showBreakdown)}
              >
                <TrendingUp className="h-3 w-3 mr-2" />
                {showBreakdown ? 'Hide' : 'View'} Breakdown
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Chart - conditionally rendered */}
      {showBreakdown && <BreakdownChart />}

      {/* Competency Gap Analysis Title with Compute Button */}
      <div className="flex items-center justify-between py-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Competency Gap Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">Identify areas for development to reach your target role</p>
        </div>
        
        {!showGaps && !isComputing && (
          <Button 
            onClick={handleComputeGap}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Compute Gap
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isComputing && (
        <Card>
          <CardContent>
            <LoadingSpinner />
          </CardContent>
        </Card>
      )}

      {/* Three-column Gap Analysis - Show only after computation */}
      {showGaps && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700">
          {/* Skill Gap */}
          <Card className="animate-in slide-in-from-left-4 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon('skill')}
                Skill Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {skillGapItems.map((skill, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${getCategoryColor(skill.category)} animate-in slide-in-from-left-2 duration-300`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Gap */}
          <Card className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon('knowledge')}
                Knowledge Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {knowledgeGapItems.map((skill, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${getCategoryColor(skill.category)} animate-in slide-in-from-bottom-2 duration-300`}
                    style={{ animationDelay: `${200 + (index * 100)}ms` }}
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leadership Gap */}
          <Card className="animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon('leadership')}
                Leadership Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leadershipGapItems.map((skill, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${getCategoryColor(skill.category)} animate-in slide-in-from-right-2 duration-300`}
                    style={{ animationDelay: `${400 + (index * 100)}ms` }}
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Dev plan Title */}
      <div className="py-4">
        <h2 className="text-2xl font-bold text-gray-800">Development Plan</h2>
        <p className="text-sm text-muted-foreground mt-1">Achieve Director/ED-Operations level within 3 years</p>
      </div>
      {/* Development Roadmap Timeline */}
      <Card>
        <CardHeader>
          {/* <CardTitle>Development Roadmap</CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="relative pb-12">
            {/* Sine wave dotted line */}
            <svg
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0"
              height="40"
              width="100%"
              preserveAspectRatio="none"
              viewBox="0 0 100 40"
            >
              <path
                d="M0,20 C15,30 25,10 40,20 C55,30 65,10 80,20 C95,30 100,10 100,20"
                fill="none"
                stroke="#86b9faff"
                strokeWidth="2"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
           
            {/* Timeline points */}
            <div className="relative flex justify-between items-center px-8">
              {mockMilestones.map((milestone, index) => (
                <div key={index} className="relative z-20">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div
                        className={`w-5 h-5 rounded-full border-4 cursor-pointer transition-all duration-200 hover:scale-[2.2] shadow-md  ${
                          milestone.status === 'completed'
                            ? 'bg-green-500 border-green-600'
                            : milestone.status === 'current'
                            ? 'bg-blue-500 border-blue-600'
                            : 'bg-gray-200 border-gray-300'
                        }`}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96 p-4 z-30">
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      {getMilestoneIcon(milestone.type)}
      <span className="text-sm font-medium">{milestone.quarter}</span>
      <Badge
        variant={milestone.status === 'completed' ? 'default' : 'secondary'}
        className="ml-auto"
      >
        {milestone.status}
      </Badge>
    </div>
    <h4 className="font-medium">{milestone.title}</h4>
    
    {/* View Details Section */}
    <div className="border-t pt-3">
      <h5 className="text-sm font-semibold text-gray-700 mb-2">Details:</h5>
      <div className="text-xs text-gray-600 space-y-1">
        <p><strong>Duration:</strong> 2-3 months</p>
        <p><strong>Location:</strong> NTAMC Manesar / Regional Office</p>
        <p><strong>Prerequisites:</strong> Basic SCADA knowledge</p>
        <p><strong>Expected Outcome:</strong> Advanced monitoring capabilities</p>
        <p><strong>Assessment:</strong> Practical demonstration + Report submission</p>
      </div>
    </div>

  {/* Action Buttons */}
<div className="border-t pt-3 space-y-2">
  <Button
    size="sm"
    variant="outline"
    className="w-full text-xs"
    onClick={() => setActiveAction({ milestoneId: index, type: "request" })}
  >
    Request Change
  </Button>
  <Button
    size="sm"
    variant="default"
    className="w-full text-xs"
    onClick={() => setActiveAction({ milestoneId: index, type: "upload" })}
  >
    Upload Verification
  </Button>
</div>

{/* Inline Expanded Section */}
{activeAction?.milestoneId === index && (
  <div className="mt-3 p-3 border rounded-lg bg-gray-50 space-y-3">
    {activeAction.type === "request" ? (
      <>
        <h4 className="font-semibold text-sm">
          Request Change for {milestone.title}
        </h4>
        <textarea
          placeholder="Explain your requested change..."
          className="w-full border p-2 rounded h-24"
        />
        <Button size="sm" onClick={handleAction}>
          Submit Request
        </Button>
      </>
    ) : (
      <>
        <h4 className="font-semibold text-sm">
          Upload Verification for {milestone.title}
        </h4>
        <input type="file" className="w-full border p-2 rounded" />
        <Button size="sm" onClick={handleAction}>
          Upload
        </Button>
      </>
    )}

    {/* Success message */}
    {showSuccess && (
      <p className="text-green-600 font-medium text-sm mt-2">
        {activeAction.type === "request"
          ? "Request submitted successfully!"
          : "Upload completed successfully!"}
      </p>
    )}
  </div>
)}



  </div>
</HoverCardContent>
                  </HoverCard>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                    {milestone.quarter}
                  </div>
                  {/* Add destination marker to the last milestone */}
                  {index === mockMilestones.length - 1 && (
                    <div className="absolute -right-4 top-4 z-30">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

              {/* Resources Title */}
      <div className="py-4">
        <h2 className="text-2xl font-bold text-gray-800">Resources and Learning Hub</h2>
        <p className="text-sm text-muted-foreground mt-1">Resources to help with development activities</p>
      </div>
      {/* Resources & Learning Hub */}
<Card>
  <CardHeader>
    {/* <CardTitle>Resources & Learning Hub</CardTitle> */}
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {mockResources.filter(r => r.type !== "project").map((resource, index) => {
        // Define the URLs for each resource
        const resourceUrls = [
          "https://npti.gov.in/en/training-programes",
          "https://www.hitachienergy.com/in/en/services-and-consulting/consulting-solutions-/power-consulting/hitachi-grid-academy",
          "https://onlinecourses.nptel.ac.in/noc23_ee60/preview"
        ];

        return (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {getResourceIcon(resource.type)}
              <h4 className="font-medium">{resource.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full"
              onClick={() => window.open(resourceUrls[index], '_blank')}
            >
              {resource.type === 'mentor' ? 'Contact' : 'Access'}
            </Button>
          </div>
        );
      })}
    </div>
  </CardContent>
</Card>
    </div>
  );
}

