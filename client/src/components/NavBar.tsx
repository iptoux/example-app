import { Link } from "@tanstack/react-router";
import { signOut, useSession } from "../lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";

function AvatarFallback({ name }: { name?: string }) {
    const char = name?.charAt(0)?.toUpperCase() || "U";
    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">{char}</div>
    );
}

export function NavBar() {
    const { data: session } = useSession();
    const sess = session as unknown;

    function resolveUser(s: unknown): { name?: string; email?: string; image?: string } | null {
        if (!s || typeof s !== "object") return null;
        const obj = s as Record<string, unknown>;
        const maybeSession = obj["session"];
        if (maybeSession && typeof maybeSession === "object") {
            const ms = maybeSession as Record<string, unknown>;
            const maybeUser = ms["user"];
            if (maybeUser && typeof maybeUser === "object") return maybeUser as { name?: string; email?: string; image?: string };
        }
        const maybeUserTop = obj["user"];
        if (maybeUserTop && typeof maybeUserTop === "object") return maybeUserTop as { name?: string; email?: string; image?: string };
        return null;
    }

    const user = resolveUser(sess);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
                {/* Brand */}
                <div className="flex items-center space-x-3">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-sm font-bold">E</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">ExampleApp</span>
                    </Link>
                </div>

                {/* Nav links */}
                                        <div className="hidden md:flex items-center space-x-4">
                                        <Link to="/" className={cn("px-3 py-2 rounded-md", "hover:bg-accent/40")}>
                        Home
                    </Link>
                                        <a href="/about" className={cn("px-3 py-2 rounded-md", "hover:bg-accent/40")}>About</a>
                                        <a href="/contact" className={cn("px-3 py-2 rounded-md", "hover:bg-accent/40")}>Contact</a>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                    <ModeToggle />
                    {user ? (
                        <div className="relative">
                            <details className="relative">
                                <summary className="list-none">
                                    <Button variant="ghost" className="p-0 h-10 w-10 rounded-full">
                                        {user.image ? (
                                                                    <img src={user.image} alt={user.name || user.email || "user"} className="h-10 w-10 rounded-full object-cover" />
                                        ) : (
                                            <AvatarFallback name={user.name || user.email} />
                                        )}
                                    </Button>
                                </summary>
                                                        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-background p-2 shadow-lg">
                                    <div className="px-2 py-1">
                                        <p className="text-sm font-medium">{user.name || 'User'}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                    <div className="mt-2 border-t pt-2">
                                                                <a href="/profile" className="block px-2 py-2 rounded hover:bg-accent/30">Profile</a>
                                                                <a href="/settings" className="block px-2 py-2 rounded hover:bg-accent/30">Settings</a>
                                        <button onClick={() => signOut()} className="w-full text-left px-2 py-2 rounded hover:bg-destructive/10 text-destructive">Sign out</button>
                                    </div>
                                </div>
                            </details>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login">
                                <Button variant="ghost" className="text-foreground/80 hover:text-foreground">Sign in</Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-primary text-primary-foreground">Sign up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}