import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProblemCardProps {
  problem_name: string;
  problem_link: string;
  companies: string[];
  difficulty: "Easy" | "Medium" | "Hard";
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function ProblemCard({ problem_name, problem_link, companies, difficulty }: ProblemCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 relative">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-lg leading-none">{problem_name}</h3>
            <a
              href={problem_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
          <div className="flex flex-wrap gap-2 items-center mb-8">
            {companies.map((company) => (
              <Badge key={company} variant="secondary" className="text-sm">
                {company}
              </Badge>
            ))}
          </div>
          <div className="absolute bottom-4 right-4">
            <Badge className={`text-sm ${difficultyColors[difficulty]}`}>
              {difficulty}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}