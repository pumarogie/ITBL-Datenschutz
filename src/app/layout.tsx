import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MessageProvider } from "@/services/notification/message-provider";
import NotificationsProvider from "@/services/notification/notifications-provider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeSpace",
  description: "Sicher unterwegs in sozialen Medien",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MessageProvider>
          <NotificationsProvider>{children}</NotificationsProvider>
        </MessageProvider>
      </body>
    </html>
  );
}
