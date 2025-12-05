import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";

type Timestamp = {
  label: string;
  time: number;
  durationInMinutes: number;
  iconSrc?: string;
};

type VideoPlayerProps = {
  src: string;
  timestamps: Timestamp[];
  className?: string;
  height: number;
  width: number;
};

export function VideoPlayer({
  src,
  timestamps,
  className,
  width,
  height,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.src = "";
      }
    };
  });

  const handleTimestampClick = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      videoRef.current.play();
    }
  };

  return (
    <div className={clsx(className, "flex flex-col xl:flex-row gap-6")}>
      <div>
        <video
          ref={videoRef}
          width={width.toString()}
          height={height.toString()}
          controls
          className="rounded-2xl"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <div className="min-w-fit flex flex-col gap-y-2">
        <div className="text-3xl">Kapitel</div>
        {timestamps.map((timestamp, index) => (
          <span
            key={index}
            onClick={() => handleTimestampClick(timestamp.time)}
            className="flex p-1 hover:cursor-pointer hover:bg-gray-100 rounded-xl"
          >
            <Image
              src={timestamp.iconSrc ? timestamp.iconSrc : "/list.svg"}
              alt={timestamp.label}
              width={50}
              height={50}
              className="bg-orange-500 p-3 rounded-xl mr-4 max-h-[50px]"
              priority
            />
            <span className="flex flex-col justify-center">
              <span>{timestamp.label}</span>
              <span className="text-xs text-gray-400">
                Kapitel {index + 1} · {timestamp.durationInMinutes} Minuten
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
