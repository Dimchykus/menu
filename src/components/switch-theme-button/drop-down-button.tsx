"use client";

import { useTheme } from "next-themes";
import Icon from "@/icons/light-theme.svg";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const ThemeDropdownButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuItem
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icon className="w-full h-full" /> Theme
    </DropdownMenuItem>
  );
};

export default ThemeDropdownButton;
