import { Button } from "../../ui/button";
import { Pencil, Trash } from "lucide-react";

interface EditButtonProps {
  onClick: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: string;
  delete?: boolean;
}

export const EditButton = ({
  onClick,
  size = "icon",
  className = "h-8 w-8",
  children,
  delete: isDelete,
}: EditButtonProps) => {
  return (
    <Button
      variant="ghost"
      size={size}
      className={className}
      onClick={(e) => {
        e.stopPropagation();

        onClick();
      }}
      title={children || "Edit"}
    >
      {isDelete ? (
        <Trash className="h-4 w-4" />
      ) : (
        <Pencil className="h-4 w-4" />
      )}
      {size !== "icon" && children && <span className="ml-2">{children}</span>}
    </Button>
  );
};
