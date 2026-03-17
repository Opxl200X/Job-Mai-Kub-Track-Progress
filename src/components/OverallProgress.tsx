import { Progress } from "@/components/ui/progress";

const OverallProgress = () => {
  const completed = 1;
  const total = 6;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="rounded-xl border bg-card p-6 min-w-[280px]">
      <h3 className="text-lg font-bold text-card-foreground mb-4">Overall Progress</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-card-foreground">Your Progress</span>
        <span className="text-sm font-bold text-primary">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2 mb-3" />
      <p className="text-sm text-muted-foreground">
        {completed} of {total} Courses Complete
      </p>
    </div>
  );
};

export default OverallProgress;
