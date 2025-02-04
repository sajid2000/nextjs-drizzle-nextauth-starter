"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";

type Props = React.HTMLAttributes<HTMLDivElement>;

const ThemeToggle: React.FC<Props> = ({ className, ...rest }) => {
  const { setTheme, theme } = useTheme();

  return (
    <div className={className} {...rest}>
      <Button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        size="icon"
        variant="secondary"
        className="size-10 rounded-full text-muted-foreground"
      >
        <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default ThemeToggle;
