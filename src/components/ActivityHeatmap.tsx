import { useState, useMemo } from "react";
import { generateYearData, getAllYears } from "@/lib/learningData";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

function getLevel(count: number) {
  const colors = [
    "bg-[hsl(var(--heatmap-0))]",
    "bg-[hsl(var(--heatmap-1))]",
    "bg-[hsl(var(--heatmap-2))]",
    "bg-[hsl(var(--heatmap-3))]",
    "bg-[hsl(var(--heatmap-4))]",
  ];
  return colors[count] || colors[0];
}

interface ActivityHeatmapProps {
  stats: {
    totalLessons: number;
    perYear: Record<number, number>;
  };
}

const ActivityHeatmap = ({ stats }: ActivityHeatmapProps) => {
  const years = getAllYears();
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const yearData = useMemo(() => generateYearData(selectedYear), [selectedYear]);
  const lessonsCount = stats.perYear[selectedYear] || 0;

  // Build weeks grid
  const weeks = useMemo(() => {
    const result: { date: string; level: number }[][] = [];
    const start = new Date(selectedYear, 0, 1);
    const dayOfWeek = start.getDay() === 0 ? 6 : start.getDay() - 1;
    
    let currentWeek: { date: string; level: number }[] = [];
    for (let i = 0; i < dayOfWeek; i++) {
      currentWeek.push({ date: "", level: -1 });
    }

    const end = new Date(selectedYear, 11, 31);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];
      currentWeek.push({ date: key, level: yearData[key] ?? 0 });
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push({ date: "", level: -1 });
      result.push(currentWeek);
    }
    return result;
  }, [selectedYear, yearData]);

  return (
    <div className="rounded-xl border bg-card p-6 flex-1">
      <h3 className="text-lg font-bold text-card-foreground">Activity Track</h3>
      <p className="text-sm text-muted-foreground mb-4">{lessonsCount} Lessons in {selectedYear}</p>

      <div className="flex gap-6">
        <div className="flex-1 overflow-x-auto">
          <div className="flex mb-1 ml-8">
            {MONTHS.map((m) => (
              <div key={m} className="text-xs text-muted-foreground flex-1">{m}</div>
            ))}
          </div>
          <div className="flex gap-[2px]">
            <div className="flex flex-col gap-[2px] mr-1">
              {DAYS.map((d, i) => (
                <div key={i} className="text-xs text-muted-foreground h-[11px] leading-[11px] w-6">{d}</div>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`w-[11px] h-[11px] rounded-sm ${
                      day.level === -1 ? "bg-transparent" : getLevel(day.level)
                    }`}
                    title={day.date ? `${day.date}: level ${day.level}` : ""}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground flex-wrap">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-[11px] h-[11px] rounded-sm ${getLevel(level)}`} />
            ))}
            <span>More</span>
            <span className="ml-2 text-muted-foreground/60">
              ({[
                { level: 0, label: "No activity" },
                { level: 1, label: "2 lessons" },
                { level: 2, label: "4 lessons" },
                { level: 3, label: "6 lessons" },
                { level: 4, label: "8+ lessons" },
              ].map(({ level, label }, i) => (
                <span key={level}>
                  <span className={`inline-block w-2 h-2 rounded-sm align-middle ${getLevel(level)}`} />
                  <span className="ml-0.5">{label}</span>
                  {i < 4 && " · "}
                </span>
              ))})
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                y === selectedYear
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
