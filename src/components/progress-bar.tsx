import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export type ProgressBarProps = {
  progress: number;
  steps: {
    progress: number;
    text?: string | undefined;
    icon?: string | undefined;
  }[];
};
export function ProgressBar({
  progress: initialProgress,
  steps: initSteps,
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const steps = [{ progress: 0 }, { progress: 1 }, ...initSteps];
  useEffect(() => {
    setProgress(initialProgress);
  }, [initialProgress]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center pb-10 relative">
        <div className="h-1 w-full bg-sky-100 rounded-full">
          <div
            className="h-1 bg-sky-800 rounded-full transition-all duration-1000 border-r-4 border-white"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
        {steps.map((section, index) => {
          const classes = clsx(
            section.icon ? "h-11 w-11 border-8" : "h-7 w-7 border-8",
            section.progress <= progress ? "bg-sky-800" : "bg-sky-200",
            "rounded-full shrink-0 absolute z-10 border-white inline-flex justify-center",
            "transition-all duration-1000",
          );
          const style = {
            left:
              section.progress === 1 ? undefined : section.progress * 100 + "%",
            right: section.progress === 1 ? "0" : undefined,
          };
          const textClasses = clsx(
            "absolute text-nowrap text-center text-slate-600 text-sm transition-all duration-200",
            section.icon ? "top-9" : "top-5",
            section.progress <= progress ? "opacity-0" : "",
          );
          const iconStyle = clsx(
            "w-full h-full saturate-0 box-border p-2",
            section.progress <= progress
              ? "brightness-200"
              : "brightness-0 opacity-30",
          );
          return (
            <div key={index} className={classes} style={style}>
              {section.icon && (
                <Image
                  src={section.icon}
                  alt={section.text ?? "icon"}
                  width="0"
                  height="0"
                  className={iconStyle}
                  priority
                />
              )}
              <span
                className={textClasses}
                style={{ transitionDelay: section.progress * 800 + "ms" }}
              >
                {section.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
