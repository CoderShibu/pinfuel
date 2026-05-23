import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/site/CursorGlow";
import { ParticleBackground } from "@/components/site/ParticleBackground";

import appCss from "../styles.css?url";

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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PINFUEL — Engineering Digital Presence" },
      { name: "description", content: "PINFUEL is a futuristic digital intelligence platform." },
      { property: "og:title", content: "PINFUEL — Engineering Digital Presence" },
      { property: "og:description", content: "An operating system for digital influence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

import { ThemeProvider } from "@/components/ThemeProvider";

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="noise bg-background text-foreground min-h-screen selection:bg-accent/30 selection:text-white">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

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
