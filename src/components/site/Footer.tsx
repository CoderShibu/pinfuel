import { Link } from "@tanstack/react-router";
import { Brand } from "./Nav";

const social = [
  {
    name: "X",
    d: "M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.78-6.26L4.8 22H2l7.02-8.02L2 2h6.93l4.3 5.69L18.244 2Zm-2.38 18h1.74L7.27 4H5.4l10.46 16Z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background relative z-10">
      <div className="container-x py-12">
        <div className="flex flex-wrap justify-between gap-8 mb-9">
          <div>
            <Brand />
            <div className="text-subtle text-[13px] mt-1.5">Engineering Digital Presence.</div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              to="/process"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Process
            </Link>

            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <div className="flex gap-2.5">
              {social.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-[34px] h-[34px] rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
              <a
                href="#"
                aria-label="Instagram"
                className="w-[34px] h-[34px] rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-[34px] h-[34px] rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8h4.56v14H.22V8Zm7.27 0h4.37v1.91h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.45h-4.56v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H7.49V8Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-wrap justify-between gap-4 text-xs text-subtle">
          <div>© 2025 PINFUEL. All rights reserved.</div>
          <div className="flex gap-3">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
