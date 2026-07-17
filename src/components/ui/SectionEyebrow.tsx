import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-3",
        light && "text-signal",
        className
      )}
    >
      <span className="h-px w-6 bg-current" aria-hidden />
      {children}
    </div>
  );
}
