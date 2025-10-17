import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const GITHUB_REPO = "https://github.com/catalinpit/example-app";
const IPTX_URL = "https://github.com/iptoux";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border pt-6 pb-6">
      <div className="container mx-auto px-4 text-muted-foreground">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
                aria-hidden
              >
                <path d="M12 .297a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.63-5.47 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0012 .297z" />
              </svg>
              <span className="text-lg font-semibold">Example App</span>
              </div>
              <div
                aria-label="View repository on GitHub"
                className="inline-flex items-center gap-3 dark:text-secondary dark:hover:text-destructive hover:text-secondary-foreground"
              >
                <span className="text-sm font-normal">(from <a href={GITHUB_REPO} target="_blank" rel="noreferrer" className="text-secondary hover:text-accent hover:underline">Catalinpit</a>)</span>
              </div>
            </div>
            <div className="md:ml-2">
              <p className="text-sm text-muted-foreground max-w-lg">A small example app with a C64-inspired theme by iptoux — download, inspect and reuse. Built for rapid development with modern web tools.</p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-secondary">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className="bg-accent-foreground/80 text-secondary hover:text-accent dark:bg-accent/80 dark:text-accent-foreground dark:hover:text-secondary-foreground px-1 rounded-0">Vite</a>
                    </TooltipTrigger>
                    <TooltipContent side="top">https://vitejs.dev</TooltipContent>
                  </Tooltip>
                <span className="text-muted-foreground">•</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://react.dev" target="_blank" rel="noreferrer" className="bg-accent-foreground/80 text-secondary hover:text-accent dark:bg-accent/80 dark:text-accent-foreground dark:hover:text-secondary-foreground px-1 rounded-0">React</a>
                    </TooltipTrigger>
                    <TooltipContent side="top">https://react.dev</TooltipContent>
                  </Tooltip>
                <span className="text-muted-foreground">•</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://bun.sh" target="_blank" rel="noreferrer" className="bg-accent-foreground/80 text-secondary hover:text-accent dark:bg-accent/80 dark:text-accent-foreground dark:hover:text-secondary-foreground px-1 rounded-0">Bun</a>
                    </TooltipTrigger>
                    <TooltipContent side="top">https://bun.sh</TooltipContent>
                  </Tooltip>
                <span className="text-muted-foreground">•</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="bg-accent-foreground/80 text-secondary hover:text-accent dark:bg-accent/80 dark:text-accent-foreground dark:hover:text-secondary-foreground px-1 rounded-0">Tailwind</a>
                    </TooltipTrigger>
                    <TooltipContent side="top">https://tailwindcss.com</TooltipContent>
                  </Tooltip>
                <span className="text-muted-foreground">•</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="bg-accent-foreground/80 text-secondary hover:text-accent dark:bg-accent/80 dark:text-accent-foreground dark:hover:text-secondary-foreground px-1 rounded-0">shadcn/ui</a>
                    </TooltipTrigger>
                    <TooltipContent side="top">https://ui.shadcn.com</TooltipContent>
                  </Tooltip>
                <span className="text-muted-foreground">•</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://www.better-auth.com/" target="_blank" rel="noreferrer" className="bg-accent-foreground/80 text-secondary hover:text-accent dark:bg-accent/80 dark:text-accent-foreground dark:hover:text-secondary-foreground px-1 rounded-0">Better-Auth</a>
                    </TooltipTrigger>
                    <TooltipContent side="top">https://www.better-auth.com/</TooltipContent>
                  </Tooltip>
              </div>
            </div>
          </div>

          <div className="ml-auto text-sm text-muted-foreground/60">
            C64 Theme made with <span className="text-red-700 dark:text-destructive">♥</span> by <a
              href={IPTX_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-accent-foreground/80 text-secondary hover:text-accent dark:bg-accent/80 dark:text-accent-foreground dark:hover:text-secondary-foreground p-1 rounded"
            >iptoux
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
