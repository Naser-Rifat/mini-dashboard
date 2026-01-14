import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Authentication",
    desc: "Simulated auth with middleware route protection",
    done: true,
  },
  {
    title: "Data Handling",
    desc: "SSR with client-side SWR revalidation",
    done: true,
  },
  {
    title: "State Management",
    desc: "URL-persisted filters and pagination",
    done: true,
  },
  {
    title: "Performance",
    desc: "Memoization and skeleton loaders",
    done: true,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold mb-8">
          D
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Mini Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          Frontend Technical Assessment - Authentication, Data Handling, and
          State Management
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Login Page</Link>
          </Button>
        </div>

        {/* Demo Credentials */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Demo:{" "}
              <code className="px-2 py-0.5 bg-muted rounded">
                demo@example.com
              </code>{" "}
              /{" "}
              <code className="px-2 py-0.5 bg-muted rounded">password123</code>
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 max-w-2xl text-left">
          {features.map((f) => (
            <Card key={f.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  {f.title}
                  <Badge
                    variant={f.done ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {f.done ? "Done" : "Pending"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
