import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";



export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup type="single" size="lg" className="items-center">
      <ToggleGroupItem
        value="light"
        pressed={theme === "light"}
        onClick={() => setTheme("light")}
        aria-label="Light theme"
      >
        <Sun className="h-4 w-4" />
        {theme === "light" && <span className="ml-2 text-xs font-medium">Light</span>}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="dark"
        pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
        aria-label="Dark theme"
      >
        <Moon className="h-4 w-4" />
        {theme === "dark" && <span className="ml-2 text-xs font-medium">Dark</span>}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="system"
        pressed={theme === "system"}
        onClick={() => setTheme("system")}
        aria-label="System theme"
      >
        <Laptop className="h-4 w-4" />
        {theme === "system" && <span className="ml-2 text-xs font-medium">System</span>}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}