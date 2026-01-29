"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/base/input/label";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    return (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/50 border border-secondary transition-all hover:bg-secondary">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-md bg-background shadow-sm text-fg-quaternary">
                    {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
                </div>
                <span className="text-sm font-semibold text-foreground">
                    {isDark ? "Dark Mode" : "Light Mode"}
                </span>
            </div>
            <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                aria-label="Toggle theme"
            />
        </div>
    );
}
