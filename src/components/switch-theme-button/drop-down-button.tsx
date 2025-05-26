"use client";

import { useTheme } from "next-themes";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { SunMoon } from "lucide-react";

const ThemeDropdownButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuItem
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunMoon className="w-full h-full" /> Theme
    </DropdownMenuItem>
  );
};

export default ThemeDropdownButton;
