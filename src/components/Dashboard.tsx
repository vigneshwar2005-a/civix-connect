import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  Filter
} from "lucide-react";

const mockReports = [
  {
    id: "CIV-2024-001",
    type: "Road Issues",
    description: "Large pothole on Main Street affecting traffic",
    location: "Main Street, Downtown",
    status: "In Progress",
    priority: "High",
    reportedAt: "2 hours ago",
    progress: 65,
    assignedTo: "Public Works Dept"
  },
  {
    id: "CIV-2024-002", 
    type: "Street Lighting",
    description: "Broken streetlight causing safety concerns",
    location: "Park Avenue & 5th St",
    status: "Resolved",
    priority: "Medium",
    reportedAt: "1 day ago",
    progress: 100,
    assignedTo: "Electrical Dept"
  },
  {
    id: "CIV-2024-003",
    type: "Waste Management", 
    description: "Overflowing garbage bins in residential area",
    location: "Oak Street Complex",
    status: "Submitted",
    priority: "Low",
    reportedAt: "3 hours ago",
    progress: 10,
    assignedTo: "Sanitation Dept"
  }
];

const stats = [
  { label: "Total Reports", value: "2,847", change: "+12%", icon: TrendingUp, color: "text-primary" },
  { label: "Resolved Issues", value: "2,453", change: "+8%", icon: CheckCircle, color: "text-secondary" },
  { label: "Active Citizens", value: "15,234", change: "+25%", icon: Users, color: "text-accent" },
  { label: "Avg Resolution", value: "24h", change: "-15%", icon: Clock, color: "text-blue-500" },
];

const Dashboard = () => {
  const [filter, setFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-secondary text-secondary-foreground";
      case "In Progress": return "bg-accent text-accent-foreground";
      case "Submitted": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-destructive";
      case "Medium": return "text-accent";
      case "Low": return "text-secondary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track all civic issues in real-time. Monitor progress, view statistics, 
            and see how your community is making a difference.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label} className="p-6 shadow-card hover:shadow-glow transition-smooth">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.color}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} bg-opacity-20 rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All Issues
          </Button>
          <Button
            variant={filter === "active" ? "secondary" : "outline"}
            onClick={() => setFilter("active")}
            size="sm"
          >
            Active
          </Button>
          <Button
            variant={filter === "resolved" ? "track" : "outline"}
            onClick={() => setFilter("resolved")}
            size="sm"
          >
            Resolved
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          {mockReports.map((report) => (
            <Card key={report.id} className="p-6 shadow-card hover:shadow-primary/5 transition-smooth">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Left side - Main info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="outline" className="font-mono text-xs">
                      {report.id}
                    </Badge>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <span className={`text-sm font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority} Priority
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{report.type}</h3>
                    <p className="text-muted-foreground">{report.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {report.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.reportedAt}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-muted-foreground">Assigned to: </span>
                    <span className="font-medium">{report.assignedTo}</span>
                  </div>
                </div>

                {/* Right side - Progress */}
                <div className="lg:w-48 space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{report.progress}%</div>
                    <div className="text-xs text-muted-foreground">Progress</div>
                  </div>
                  
                  <Progress value={report.progress} className="h-2" />
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    {report.status !== "Resolved" && (
                      <Button variant="ghost" size="sm">
                        <AlertCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="px-8">
            Load More Issues
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;