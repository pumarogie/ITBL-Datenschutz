"use client";
import { customDecorateOptions } from "@/components/quiz/helper";
import { useMessages } from "./message-provider";
import Notification from "@/components/notification";
import { ReactNode, useEffect, useState } from "react";
import Explosion from "react-canvas-confetti/dist/presets/explosion";
import clsx from "clsx";

export default function NotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { messages, removeMessage } = useMessages();
  const [achievementMessage, setAchievementMessage] = useState<
    React.ReactNode | undefined
  >(undefined);
  const [blurOut, setBlurOut] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const achievementMsg = messages.find((msg) => msg.type === "achievement");
    if (achievementMsg) {
      setAchievementMessage(achievementMsg.message);
      setTimeout(() => {
        setBlurOut(true);
      }, 2500);
      setTimeout(() => {
        setFadeOut(true);
      }, 4000);
      setTimeout(() => {
        setAchievementMessage(undefined);
        removeMessage(achievementMsg.id);
      }, 4500);
    }
  }, [messages]);

  return (
    <>
      <div className="absolute flex flex-col gap-y-2 top-4 right-4 max-h-[95vh] overflow-hidden">
        {messages.map(
          (msg) =>
            msg.type !== "achievement" && (
              <Notification
                key={msg.id}
                id={msg.id}
                message={msg.message}
                type={msg.type}
                removeMessage={removeMessage}
              />
            ),
        )}
      </div>
      {achievementMessage && (
        <div
          className={clsx(
            "fixed inset-0 flex items-center justify-center z-50",
            fadeOut && "animate-fadeOut",
          )}
        >
          <div className="shadow-3xl animate-slideIn">{achievementMessage}</div>
          <Explosion
            autorun={{ speed: 10, duration: 2500 }}
            decorateOptions={customDecorateOptions}
          />
        </div>
      )}
      <div
        className={clsx(
          achievementMessage && "animate-blurIn",
          blurOut && "animate-blurOut",
        )}
        style={{ filter: achievementMessage && !blurOut ? "blur(6px)" : "" }}
      >
        {children}
      </div>
    </>
  );
}
