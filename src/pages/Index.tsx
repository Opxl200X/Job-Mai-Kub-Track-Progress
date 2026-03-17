import { useState } from "react";
import { CheckCircle, BookOpen, Clock, Flame } from "lucide-react";
import StatCard from "@/components/StatCard";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import OverallProgress from "@/components/OverallProgress";
import CompletedCoursesDialog from "@/components/CompletedCoursesDialog";
import { computeStats } from "@/lib/learningData";

const stats = computeStats();

const Index = () => {
  const [showCourses, setShowCourses] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-card border-b border-border py-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium mb-4">
          Track Progress
        </span>
        <h1 className="text-4xl font-bold text-card-foreground mb-2">Your Learning Journey</h1>
        <p className="text-muted-foreground">Keep up the great work!</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={CheckCircle} value={stats.coursesComplete} label="Courses Complete" clickable onClick={() => setShowCourses(true)} />
          <StatCard icon={BookOpen} value={stats.totalLessons} label="Lessons Done" />
          <StatCard icon={Clock} value={stats.totalHours} label="Total Hours" />
          <StatCard icon={Flame} value={`${stats.streak} days`} label="Current Streak" highlighted />
        </div>

        {/* Activity + Overall */}
        <div className="flex flex-col lg:flex-row gap-4">
          <ActivityHeatmap stats={stats} />
          <OverallProgress />
        </div>
      </div>

      <CompletedCoursesDialog open={showCourses} onOpenChange={setShowCourses} />
    </div>
  );
};

export default Index;
