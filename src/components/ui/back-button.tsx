import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

export function BackButton({ onClick, className }: BackButtonProps) {
  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior - go back in history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // If no history, redirect to home or root
        window.location.href = "/";
      }
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleBack}
      className={`flex items-center gap-2 ${className || ""}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}