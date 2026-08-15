import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatPercent } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  accent?: "brand" | "gold" | "rise";
}

export function StatCard({ label, value, change, icon: Icon, accent = "brand" }: StatCardProps) {
  const positive = (change ?? 0) >= 0;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md",
            accent === "brand" && "bg-brand/10 text-brand",
            accent === "gold" && "bg-gold/10 text-gold",
            accent === "rise" && "bg-rise/10 text-rise"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">{value}</p>
        {typeof change === "number" && (
          <p className={cn("mt-1 text-xs font-medium", positive ? "text-rise" : "text-fall")}>
            {formatPercent(change)} this month
          </p>
        )}
      </CardContent>
    </Card>
  );
}