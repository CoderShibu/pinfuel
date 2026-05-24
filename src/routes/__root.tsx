import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  Link,
} from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/site/CursorGlow";
import { ParticleBackground } from "@/components/site/ParticleBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import React from "react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center z-10 relative">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <p className="mt-3 text-muted-foreground font-mono text-sm uppercase tracking-widest">
          Signal Lost in the PINFUEL.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex px-6 py-3 rounded-md bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-widest hover:bg-accent/80 transition-colors shadow-[0_0_20px_oklch(0.78_0.14_230/0.4)]"
        >
          Initialize Return
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center z-10 relative">
        <h1 className="text-2xl font-semibold text-destructive uppercase tracking-widest">
          System Failure
        </h1>
        <p className="mt-2 text-sm text-muted-foreground font-mono">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex px-6 py-3 rounded-md bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-widest hover:bg-accent/80 transition-colors shadow-[0_0_20px_oklch(0.78_0.14_230/0.4)]"
        >
          Reboot System
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <CursorGlow />
        <ParticleBackground />
        <Nav />
        <main className="relative z-[2] min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
