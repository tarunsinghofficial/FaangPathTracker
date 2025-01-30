"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ProblemCard } from "@/components/ProblemCard";
import { ProblemList } from "@/components/ProblemList";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Loader2 } from "lucide-react";

interface Problem {
    problem_name: string;
    problem_link: string;
    companies: string[];
    difficulty: "Easy" | "Medium" | "Hard";
}

const ITEMS_PER_PAGE = 15;

export default function Home() {
    const [data, setData] = useState<Problem[]>([]);
    const [selectedCompany, setSelectedCompany] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "Easy" | "Medium" | "Hard">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [loading, setLoading] = useState(true);
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);
                const text = await response.text();

                let jsonData;
                try {
                    jsonData = JSON.parse(text.replace(/NaN/g, '"Medium"'));
                } catch (parseError) {
                    console.error('JSON Parse Error:', parseError);
                    throw parseError;
                }
                const problemsMap = new Map<string, Problem>();

                Object.entries(jsonData as Record<string, any[]>).forEach(([company, problems]) => {
                    problems.forEach((problem) => {
                        const existingProblem = problemsMap.get(problem.problem_name);

                        if (existingProblem) {
                            if (!existingProblem.companies.includes(company)) {
                                existingProblem.companies.push(company);
                            }
                        } else {
                            problemsMap.set(problem.problem_name, {
                                problem_name: problem.problem_name,
                                problem_link: problem.link,
                                companies: [company],
                                difficulty: problem.difficulty || "Medium",
                            });
                        }
                    });
                });

                // Convert Map to array
                const transformedData = Array.from(problemsMap.values());
                setData(transformedData);
            } catch (error) {
                console.error("Error loading data:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setVisibleItems(ITEMS_PER_PAGE);
    }, [searchQuery, selectedCompany, selectedDifficulty]);

    // Get unique companies after ensuring data is an array
    const companies = Array.from(
        new Set(data.flatMap(problem => problem.companies))
    ).sort();

    const filteredProblems = data.filter((problem) => {
        if (selectedCompany !== "all" && !problem.companies.includes(selectedCompany)) return false;
        if (selectedDifficulty !== "all" && problem.difficulty !== selectedDifficulty) return false;

        const searchLower = searchQuery.toLowerCase();
        return (
            problem.problem_name.toLowerCase().includes(searchLower) ||
            problem.companies.some(company => company.toLowerCase().includes(searchLower))
        );
    });

    const visibleProblems = filteredProblems.slice(0, visibleItems);
    const hasMore = visibleItems < filteredProblems.length;

    const loadMore = () => {
        setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="relative">
                    <div className="absolute inset-0 animate-pulse">
                        <div className="h-24 w-24 rounded-full bg-blue-500/20 blur-xl" />
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full border-4 border-muted" />
                        <div className="absolute h-16 w-16 rounded-full border-4 border-t-blue-500 animate-spin" />
                        <Loader2 className="absolute h-8 w-8 animate-spin text-muted-foreground" />
                    </div>

                    <p className="mt-4 text-center text-sm text-muted-foreground animate-pulse">
                        Loading problems...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen min-w-full bg-background">
            <Navbar
                isProblemsPage={true}
                companies={companies}
                selectedCompany={selectedCompany}
                onCompanyChange={setSelectedCompany}
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setSelectedDifficulty}
                onSearchChange={setSearchQuery}
            />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold">
                            {selectedCompany === "all" ? "All" : selectedCompany} Problems
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Showing {visibleProblems.length} of {filteredProblems.length} problems
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {viewMode === "grid" ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleProblems.map((problem, index) => (
                            <ProblemCard
                                key={`${problem.companies.join('-')}-${problem.problem_name}-${index}`}
                                {...problem}
                            />
                        ))}
                    </div>
                ) : (
                    <ProblemList problems={visibleProblems} />
                )}

                {hasMore && (
                    <div className="mt-8 flex justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={loadMore}
                            className="min-w-[200px]"
                        >
                            Load More Problems
                        </Button>
                    </div>
                )}
            </div>

        </main>
    );
}