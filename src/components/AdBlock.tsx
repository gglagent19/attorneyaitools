interface AdBlockProps {
  slot?: string;
  format?: "horizontal" | "vertical" | "rectangle";
}

const sizeClasses: Record<string, string> = {
  horizontal: "w-full h-24 sm:h-[90px]",
  vertical: "w-[160px] min-h-[600px]",
  rectangle: "w-full max-w-[336px] h-[280px]",
};

export default function AdBlock({ slot, format = "rectangle" }: AdBlockProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
        Advertisement
      </span>
      <div
        className={`${sizeClasses[format]} bg-slate-100 border border-dashed border-slate-300 rounded-lg flex items-center justify-center`}
        data-ad-slot={slot}
        data-ad-format={format}
      >
        {/* Google AdSense script would be injected here */}
        <span className="text-xs text-slate-400">Ad Space</span>
      </div>
    </div>
  );
}
