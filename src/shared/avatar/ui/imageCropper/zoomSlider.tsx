import { cn } from "@/shared/shadcn/lib/utils";

type ZoomSliderProps = {
  className?: string;
  value: number;
  onChange: (v: number) => void;
};

export const ZoomSlider: React.FC<ZoomSliderProps> = ({ className, value, onChange }) => {
  return (
    <input
      type="range"
      min={1}
      max={3}
      step={0.01}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn("zoom-slider", className)}
      style={{
        ...({ "--progress": `${((value - 1) / 2) * 100}%` } as React.CSSProperties),
      }}
    />
  );
};
