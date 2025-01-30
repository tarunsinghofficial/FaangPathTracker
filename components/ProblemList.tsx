import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Problem {
  problem_name: string;
  problem_link: string;
  companies: string[];
  difficulty: "Easy" | "Medium" | "Hard";
}

interface ProblemListProps {
  problems: Problem[];
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function ProblemList({ problems }: ProblemListProps) {
  return (
    <div className="space-y-4">
      {problems.map((problem, index) => (
        <div key={`${problem.problem_name}-${index}`}
          className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-2">
            <h3 className="font-semibold">
              <a href={problem.problem_link} target="_blank" rel="noopener noreferrer"
                className="hover:text-blue-500">
                {problem.problem_name}
              </a>
            </h3>
            <div className="flex flex-wrap gap-2">
              {problem.companies.map((company) => (
                <Badge key={company} variant="secondary" className="text-xs dark:text-white text-blue-700">
                  {company}
                </Badge>
              ))}
            </div>
          </div>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}>
            {problem.difficulty}
          </span>
        </div>
      ))}
    </div>
  );
}