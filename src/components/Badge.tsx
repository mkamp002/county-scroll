import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "verified" | "invalid" | "unknown" | "hot" | "clerk";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "verified", children, className }: BadgeProps) {
  const variants = {
    verified: "bg-verified/20 text-verified border-verified/30",
    invalid: "bg-invalid/20 text-invalid border-invalid/30",
    unknown: "bg-unknown/20 text-unknown border-unknown/30",
    hot: "bg-primary/20 text-primary border-primary/30 hot-glow",
    clerk: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
