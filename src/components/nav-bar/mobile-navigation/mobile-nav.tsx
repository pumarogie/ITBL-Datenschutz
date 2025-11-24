"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Overlay } from "./mobile-overlay";
import { Section } from "../section";

export function MobileNav({
  masterQuizUnlocked,
}: {
  masterQuizUnlocked: boolean;
}) {
  const [showOverlay, setOverlay] = useState(false);

  const toggleOverlay = () => {
    setOverlay(!showOverlay);
  };

  return (
    <div className="relative flex flex-row max-h-sidebar justify-between align-center mb-3 gap-x-4">
      <nav
        className="flex items-center bg-blue-contrast rounded-xl max-h-14 min-w-14 justify-center p-4"
        onClick={toggleOverlay}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={20}
          height={20}
          className="mx-auto"
          priority
        />
      </nav>
      <Section isCollapsed={false} />
      {showOverlay && <Overlay masterQuizUnlocked={masterQuizUnlocked} />}
    </div>
  );
}
