import { Button } from "../../ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

interface PreviewButtonProps {
  href: string;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: string;
}

const PreviewMenuButton = ({
  href,
  size = "icon",
  className = "h-8 w-8",
  children,
}: PreviewButtonProps) => {
  return (
    <Link href={href} target="_blank" onClick={(e) => e.stopPropagation()}>
      <Button
        variant="ghost"
        size={size}
        className={className}
        title={children || "Preview Menu"}
      >
        <Eye className="h-4 w-4" />
        {size !== "icon" && children && (
          <span className="ml-2">{children}</span>
        )}
      </Button>
    </Link>
  );
};

export default PreviewMenuButton;
