"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DesktopSection } from "@/components/nav-bar/desktop-navigation/desktop-section";
import { MobileSection } from "@/components/nav-bar/mobile-navigation/mobile-section";

export type Props = {
  setSection: (activeSection: SectionName) => void;
  activeSection: SectionName;
  sectionItems: SectionItem[];
  isCollapsed: boolean;
};

export enum SectionName {
  ERKUNDEN,
  FORTSCHRITT,
  LEADERBOARD,
}

type SectionItem = {
  sectionName: SectionName;
  srcActive: string;
  srcInactive: string;
  alt: string;
  href: string;
};

const sectionItems: SectionItem[] = [
  {
    sectionName: SectionName.ERKUNDEN,
    srcActive: "/section/discover-active.svg",
    srcInactive: "/section/discover.svg",
    alt: "Erkunden",
    href: "/space",
  },
  {
    sectionName: SectionName.FORTSCHRITT,
    srcActive: "/section/pace-active.svg",
    srcInactive: "/section/pace.svg",
    alt: "Fortschritt",
    href: "/achievements",
  },
  {
    sectionName: SectionName.LEADERBOARD,
    srcActive: "/section/leaderboard-active.svg",
    srcInactive: "/section/leaderboard.svg",
    alt: "Leaderboard",
    href: "/leaderboard",
  },
];

export function Section({ isCollapsed }: { isCollapsed: boolean }) {
  const path = usePathname();
  const getActiveSection = () => {
    if (path.startsWith("/space")) {
      return SectionName.ERKUNDEN;
    } else if (path.startsWith("/achievements")) {
      return SectionName.FORTSCHRITT;
    } else if (path.startsWith("/leaderboard")) {
      return SectionName.LEADERBOARD;
    }
    return SectionName.ERKUNDEN;
  };

  const [activeSection, setActiveSection] = useState(getActiveSection);
  const [sections, setSections] = useState(sectionItems);

  useEffect(() => {
    const activeSection = getActiveSection();
    setActiveSection(activeSection);
  }, [getActiveSection, path]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage &&
      !localStorage.getItem("gameCode")
    ) {
      setSections(
        sections.filter((s) => s.sectionName !== SectionName.LEADERBOARD),
      );
    }
  }, []);

  return (
    <div className="flex items-center sm:block">
      <div className="hidden sm:block">
        <DesktopSection
          setSection={setActiveSection}
          activeSection={activeSection}
          sectionItems={sections}
          isCollapsed={isCollapsed}
        />
      </div>

      <div className="sm:hidden">
        <MobileSection
          setSection={setActiveSection}
          activeSection={activeSection}
          sectionItems={sections}
          isCollapsed={false}
        />
      </div>
    </div>
  );
}
