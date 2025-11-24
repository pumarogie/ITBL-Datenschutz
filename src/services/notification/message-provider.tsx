"use client";
import AchievementCard from "@/components/achievements/achievement-card";
import {
  Achievement,
  AchievementData,
  AchievementId,
} from "@/util/achievement-data";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type MessageType = "info" | "success" | "error" | "achievement";

type Message = {
  id: number;
  message: React.ReactNode;
  type: MessageType;
};

type MessageContextType = {
  messages: Message[];
  addMessage: (message: React.ReactNode, type?: MessageType) => void;
  showAchievement: (achievementId: AchievementId) => void;
  removeMessage: (id: number) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback(
    (message: React.ReactNode, type: MessageType = "info") => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), message, type },
      ]);
    },
    [],
  );

  const showAchievement = useCallback((achievementId: AchievementId) => {
    const achievement: Achievement | undefined =
      AchievementData.achievements.find((a) => a.id === achievementId);
    if (achievement) {
      const message = (
        <AchievementCard
          id={achievement.id}
          title={achievement.title}
          description={achievement.description}
          progress={true}
          icon={achievement.icon}
        />
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), message, type: "achievement" },
      ]);
    }
  }, []);

  const removeMessage = useCallback((id: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  }, []);

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, removeMessage, showAchievement }}
    >
      {children}
    </MessageContext.Provider>
  );
};
