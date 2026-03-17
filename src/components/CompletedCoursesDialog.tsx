import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const completedCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    completedDate: "2025-08-15",
    lessons: 12,
    hours: 8,
  },
  {
    id: 2,
    title: "React Fundamentals",
    completedDate: "2026-02-20",
    lessons: 18,
    hours: 15,
  },
];

interface CompletedCoursesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompletedCoursesDialog = ({ open, onOpenChange }: CompletedCoursesDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Completed Courses
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-2">
          {completedCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-lg border border-border bg-secondary/50 p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground text-sm">{course.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {course.lessons} lessons · {course.hours} hrs · Completed {course.completedDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompletedCoursesDialog;
