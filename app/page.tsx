"use client";

import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/PillBadge";
import { useRouter } from "next/navigation";
import { ArrowRight, Code2, Building2, Brain, Target, Sparkles, Moon, Sun, Loader2 } from "lucide-react";
import Image from "next/image";
import { InfiniteLogoScroll } from "@/components/InfiniteLogoScroll";
import { useTheme } from "next-themes";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

import Hero from "../public/assets/hero.png";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
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
    <div className="flex min-h-screen flex-col">
      <header className="w-full bg-transparent sticky top-0 left-0 right-0 z-50 bg-opacity-50 backdrop-blur-sm px-2 sm:px-4 lg:px-6 h-14 border-b border-black/5 dark:border-white/10">
        <div className="container mx-auto flex items-center justify-between h-full">
          <div className="flex items-center space-x-2">
            <Code2 className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-bold text-sm sm:text-base">FaangPrepTracker</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {isSignedIn ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="hidden sm:inline-block text-sm">
                  Hi, {user.firstName || user.username}
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/90 px-2 sm:px-4 text-xs sm:text-sm"
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 hover:opacity-90 px-2 sm:px-4 text-xs sm:text-sm"
                  >
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto lg:-mt-24">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <PillBadge />
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Your <span className="bg-gradient-to-tr from-blue-500 to-white bg-clip-text text-transparent">Technical</span> Interview Prep
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Track 1200+ coding problems from top tech companies. Practice efficiently with our curated collection of interview questions.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => router.push('/problems')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 hover:opacity-90 inline-flex h-10 items-center justify-center space-x-2"
                  >
                    <span>Try for free</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={scrollToFeatures}
                    className="border-blue-500 border-opacity-50 text-blue-700 dark:text-white hover:bg-blue-500/10 hover:text-blue-700"
                  >
                    Learn More
                  </Button>
                  <a href="https://www.producthunt.com/posts/faangpreptracker-company-wise-problems?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-faangpreptracker&#0045;company&#0045;wise&#0045;problems" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=860766&theme=light&t=1739003002249" alt="FaangPrepTracker&#0032;&#0045;&#0032;Company&#0032;Wise&#0032;Problems - Leetcode&#0032;company&#0045;wise&#0032;problems | Product Hunt" width="180" height="54" /></a>
                </div>
                <div className="flex justify-center py-4  rounded-2xl">
                  <Image src={Hero} alt="Hero Image" width={1000} height={1000} className="rounded-2xl dark:border-white/5 border-2 border-black/5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full">
          <div className="py-8 text-center">
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-200">
              Find problems from top companies
            </h2>
          </div>
          <InfiniteLogoScroll />
        </div>

        <section id="features" className="w-full py-24 relative">

          <div className="container px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Everything you need to
                <span className="ml-1 text-gray-400">Ace</span> your <span className="bg-gradient-to-tr from-blue-500 to-white bg-clip-text text-transparent">Tech Interviews</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools and resources designed to help you succeed in your technical interviews
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Company-Specific Card */}
              <div className="group relative overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-lg transition-all duration-300 hover:border-black/10 dark:hover:border-white/20 hover:bg-white/20 dark:hover:bg-white/10 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="relative">
                  <div className="rounded-full bg-blue-500/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Company-Specific Practice</h3>
                  <p className="text-muted-foreground">
                    Access curated problems frequently asked by FAANG and other top tech companies during their interviews.
                  </p>
                </div>
              </div>

              {/* Difficulty Levels Card */}
              <div className="group relative overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-lg transition-all duration-300 hover:border-black/10 dark:hover:border-white/20 hover:bg-white/20 dark:hover:bg-white/10 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="relative">
                  <div className="rounded-full bg-green-500/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Difficulty-Based Learning</h3>
                  <p className="text-muted-foreground">
                    Practice problems organized by difficulty levels - from easy to hard, helping you gradually build your problem-solving skills.
                  </p>
                </div>
              </div>

              {/* Topic-wise Problems Card */}
              <div className="group relative overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-lg transition-all duration-300 hover:border-black/10 dark:hover:border-white/20 hover:bg-white/20 dark:hover:bg-white/10 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="relative">
                  <div className="rounded-full bg-purple-500/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Topic-wise Practice</h3>
                  <p className="text-muted-foreground">
                    Find and practice problems by specific topics like Arrays, Dynamic Programming, Graphs, and more to strengthen your fundamentals.
                  </p>
                </div>
              </div>

              {/* Coming Soon Card */}
              <div className="group relative overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-lg transition-all duration-300 hover:border-black/10 dark:hover:border-white/20 hover:bg-white/20 dark:hover:bg-white/10 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <div className="relative">
                  <div className="rounded-full bg-yellow-500/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">More Features Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Progress tracking, personalized study plans, performance analytics, and many more exciting features are on the way!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-24 relative">

          <div className="container px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Are you Ready to <span className="text-gray-400">Start</span> your Journey to<span className="bg-gradient-to-tr from-blue-500 to-white bg-clip-text text-transparent"> FAANG</span>?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start your journey to success today with
                <span className="bg-gradient-to-tr from-blue-500 to-white bg-clip-text text-transparent ml-1">FaangPrepTracker</span>.
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <Button
                onClick={() => router.push('/problems')}
                className="bg-blue-500 text-white hover:bg-blue-600 inline-flex h-10 items-center justify-center space-x-2"
              >
                Start Now ✨
              </Button>
              <a href="https://www.producthunt.com/posts/faangpreptracker-company-wise-problems?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-faangpreptracker&#0045;company&#0045;wise&#0045;problems" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=860766&theme=light&t=1739003002249" alt="FaangPrepTracker&#0032;&#0045;&#0032;Company&#0032;Wise&#0032;Problems - Leetcode&#0032;company&#0045;wise&#0032;problems | Product Hunt" width="180" height="54" /></a>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}