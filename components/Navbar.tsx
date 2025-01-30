"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Search, Moon, Sun, Menu, Home, LogOut } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

interface NavbarProps {
  companies?: string[];
  selectedCompany?: string;
  onCompanyChange?: (company: string) => void;
  selectedDifficulty?: "all" | "Easy" | "Medium" | "Hard";
  onDifficultyChange?: (difficulty: "all" | "Easy" | "Medium" | "Hard") => void;
  onSearchChange?: (query: string) => void;
  isProblemsPage?: boolean;
}

export function Navbar({
  companies = [],
  selectedCompany = "all",
  onCompanyChange = () => { },
  selectedDifficulty = "all",
  onDifficultyChange = () => { },
  onSearchChange = () => { },
  isProblemsPage = false,
}: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const { isSignedIn, user } = useUser();

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="lg:hidden p-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Home className="h-5 w-5" />
              <span className="font-semibold">Home</span>
            </Link>

            {isProblemsPage && (
              <>
                <Select value={selectedCompany} onValueChange={onCompanyChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
                  <SelectTrigger className="w-full mt-4">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </div>
          </Link>

          {isProblemsPage && (
            <>
              <Select value={selectedCompany} onValueChange={onCompanyChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        {/* Search, Theme Toggle & Auth */}
        <div className="flex items-center gap-2">
          {isProblemsPage && (
            <Input
              type="search"
              placeholder="Search problems..."
              className="w-full sm:w-[300px] mr-2"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          )}

          {isSignedIn && user && (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block text-sm">
                Hi, {user.firstName || user.emailAddresses[0].emailAddress}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}