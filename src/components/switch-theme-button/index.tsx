"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import Icon from "@/icons/light-theme.svg";

const SwitchThemeButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Icon className="w-full h-full" />
    </Button>
  );
};

export default SwitchThemeButton;
