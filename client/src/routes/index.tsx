import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSession } from "../lib/auth-client";
//import { RadialOrbitalTimelineDemo } from "@/components/demo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Code, FileText, User } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
export const Route = createFileRoute("/")({
  component: Index,
});


const timelineData = [
  {
    id: 1,
    title: "Vite + React App Shell",
    date: "Implemented",
    content: "Fast dev server and optimized build using Vite. Docs: https://vitejs.dev/",
    category: "frontend",
    icon: Calendar,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "TanStack Router Integration",
    date: "Implemented",
    content: "Route-driven UI with TanStack Router for nested layouts and file routes. Docs: https://tanstack.com/router",
    category: "frontend",
    icon: FileText,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 3,
    title: "Tailwind + shadcn UI",
    date: "Implemented",
    content: "Design system with Tailwind CSS and shadcn components for consistent UI. Docs: https://tailwindcss.com/",
    category: "frontend",
    icon: Code,
    relatedIds: [1, 2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 4,
    title: "Auth & Sessions",
    date: "Implemented",
    content: "Authentication via Better-Auth with session handling on client/server. Docs: https://better-auth.dev/",
    category: "backend",
    icon: User,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 5,
    title: "Bun + Hono Server",
    date: "Implemented",
    content: "High-performance server using Bun and Hono for routing. Docs: https://hono.dev/",
    category: "backend",
    icon: Clock,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 6,
    title: "Database & ORM",
    date: "Implemented",
    content: "PostgreSQL with Prisma migrations and schema management. Docs: https://www.prisma.io/",
    category: "backend",
    icon: Clock,
    relatedIds: [5],
    status: "completed" as const,
    energy: 100,
  },
    {
    id: 7,
    title: "Tanstack Query",
    date: "Planned",
    content: "Data fetching and state management for React applications. Docs: https://tanstack.com/query",
    category: "frontend",
    icon: Clock,
    relatedIds: [5],
    status: "pending" as const,
    energy: 0,
  },
];

function Index() {
  const { data: session } = useSession();
  const navigate = useNavigate();

  return (
      <>
      {session ? (
          // Dashboard for signed-in users
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={session.user?.image ?? undefined} alt={session.user?.name ?? undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {session.user?.name?.charAt(0)?.toUpperCase() ||
                     session.user?.email?.charAt(0)?.toUpperCase() ||
                     'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Welcome back, {session.user?.name || 'User'}!
                  </h1>
                  <p className="text-muted-foreground">{session.user?.email}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm">
                Premium Member
              </Badge>
            </div>

            {/* Dashboard Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      📊
                    </div>
                    <span>Analytics</span>
                  </CardTitle>
                  <CardDescription>
                    View your usage statistics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      ⚙️
                    </div>
                    <span>Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Open Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      �
                    </div>
                    <span>Projects</span>
                  </CardTitle>
                  <CardDescription>
                    Access your recent projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    View Projects
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Posts Section */}
            <div className="grid gap-6">
              {/* Test Toast Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={() => {
                    console.log('Test toast clicked')
                    toast.success('Test toast! 🎉')
                  }}
                  variant="outline"
                >
                  Test Toast
                </Button>
              </div>
              
            </div>
          </div>
        ) : (
          // Landing page for non-signed-in users
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 min-h-[36rem]">
              <div className="order-2 md:order-1 text-center md:text-left space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  Welcome to ExampleApp
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
                  Build fast. Ship fast. Vite + Bun + React + Tailwind + shadcn + Better-Auth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild className="px-8 py-3 text-lg font-medium shadow-lg transition-all duration-200">
                        <a
                          href="https://github.com/catalinpit/example-app"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Get Started
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Download from <strong>catalinpit/example-app</strong></TooltipContent>
                  </Tooltip>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate({ to: "/login" })}
                    className="px-8 py-3 text-lg font-medium border-border hover:bg-accent transition-all duration-200 cursor-pointer"
                  >
                    Sign In
                  </Button>
                </div>
              </div>

              <div className="order-1 md:order-2 flex items-center justify-center">
                <div className="w-full max-w-4xl">
                  <RadialOrbitalTimeline timelineData={timelineData} compact />
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    🚀
                  </div>
                  <CardTitle>Fast & Reliable</CardTitle>
                  <CardDescription>
                    Lightning-fast performance with 99.9% uptime guarantee
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    🔒
                  </div>
                  <CardTitle>Secure</CardTitle>
                  <CardDescription>
                    Enterprise-grade security with end-to-end encryption
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    🎨
                  </div>
                  <CardTitle>Beautiful Design</CardTitle>
                  <CardDescription>
                    Modern, intuitive interface designed for the best user experience
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}
      </> 
  );
}
