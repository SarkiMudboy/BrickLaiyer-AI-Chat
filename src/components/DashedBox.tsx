// import { cn } from "@/lib/utils";

const createDashPattern = (
  orientation: "horizontal" | "vertical",
  dashLength: number,
  gapLength: number,
  thickness = 1,
  color = "#FFFFFF"
) => {
  const totalLength = dashLength + gapLength;
  const colorEncoded = encodeURIComponent(color);

  const svg =
    orientation == "horizontal"
      ? `data:image/svg+xml,%3csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='${dashLength}' height='${thickness}' fill='${colorEncoded}'/%3e%3c/svg%3e`
      : `data:image/svg+xml,%3csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='${thickness}' height='${dashLength}' fill='${colorEncoded}'/%3e%3c/svg%3e`;

  return svg;
};

type DashedBorderProps = {
  pattern: {
    dashLength: number;
    gapLength: number;
    thickness?: number;
    color?: string;
  };
  className: string;
  children: React.ReactNode;
};

export default function DashedBox({
  pattern,
  className,
  children,
}: DashedBorderProps) {
  const horizontalDashUrl = createDashPattern(
    "horizontal",
    pattern.dashLength,
    pattern.gapLength,
    pattern.thickness,
    pattern.color
  );

  const verticalDashUrl = createDashPattern(
    "vertical",
    pattern.dashLength,
    pattern.gapLength,
    pattern.thickness,
    pattern.color
  );

  const totalLength = pattern.dashLength + pattern.gapLength;

  return (
    <div
      className={"relative ".concat(className)}
      style={{
        // Top border
        backgroundImage: `url("${horizontalDashUrl}")`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "top",
        backgroundSize: `${totalLength}px ${pattern.thickness}px`,
      }}
    >
      {/* Bottom border */}
      <div
        className={className}
        style={{
          height: `${pattern.thickness}px`,
          backgroundImage: `url("${horizontalDashUrl}")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: `${totalLength}px ${pattern.thickness}px`,
        }}
      />

      {/* Left border */}
      <div
        className={className}
        style={{
          width: `${pattern.thickness}px`,
          backgroundImage: `url("${verticalDashUrl}")`,
          backgroundRepeat: "repeat-y",
          backgroundSize: `${pattern.thickness}px ${totalLength}px`,
        }}
      />

      {/* Right border */}
      <div
        className={className}
        style={{
          width: `${pattern.thickness}px`,
          backgroundImage: `url("${verticalDashUrl}")`,
          backgroundRepeat: "repeat-y",
          backgroundSize: `${pattern.thickness}px ${totalLength}px`,
        }}
      />

      {children}
    </div>
  );
}
