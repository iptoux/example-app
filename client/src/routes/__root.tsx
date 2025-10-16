import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css';
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <NavBar />
      <main className="container mx-auto px-4 py-8 flex-1">
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      </main>
      <Footer />
      </div>
    </>
  );
}
