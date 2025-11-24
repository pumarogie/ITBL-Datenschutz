import clsx from "clsx";
import { Props } from "../section";
import { DesktopSectionItem } from "@/components/nav-bar/desktop-navigation/desktop-section-item";
import React from "react";

export function DesktopSection({
  setSection,
  activeSection,
  sectionItems,
  isCollapsed,
}: Props) {
  return (
    <div className="justify-center items-center min-h-48 bg-blue-background ml-6">
      {sectionItems.map(
        ({ sectionName, srcActive, srcInactive, alt, href }, index) => (
          <div
            key={index}
            className={clsx(
              "relative",
              activeSection === sectionName && "z-10",
            )}
          >
            <DesktopSectionItem
              setSection={setSection}
              sectionName={sectionName}
              isActive={activeSection === sectionName}
              srcActive={srcActive}
              srcInactive={srcInactive}
              alt={alt}
              href={href}
              isCollapsed={isCollapsed}
              className={clsx(
                "flex items-center justify-start px-11 flex-row space-x-5 min-h-16 bg-blue-background",
                activeSection === sectionName
                  ? "bg-white rounded-l-full text-orange-600 z-10"
                  : "text-white",
                index > 0 &&
                  sectionItems[index - 1].sectionName === activeSection &&
                  "rounded-tr-3xl",
                index < 3 &&
                  sectionItems.length === 4 &&
                  sectionItems[index + 1].sectionName === activeSection &&
                  "rounded-br-3xl",
                index < 2 &&
                  sectionItems.length === 3 &&
                  sectionItems[index + 1].sectionName === activeSection &&
                  "rounded-br-3xl",
              )}
            />

            {activeSection === sectionName && (
              <React.Fragment>
                <div className="bg-white absolute bottom-[100%] w-10 right-0 z-10">
                  <div
                    className={clsx(
                      "flex items-center justify-center flex-row space-x-5 w-full min-h-10 bg-blue-background z-30 rounded-br-3xl",
                    )}
                  />
                </div>
                <div className="bg-white absolute top-[100%] w-10 right-0 z-10">
                  <div
                    className={clsx(
                      "flex items-center justify-center flex-row space-x-5 w-full min-h-10 bg-blue-background z-30 rounded-tr-3xl",
                    )}
                  />
                </div>
              </React.Fragment>
            )}
          </div>
        ),
      )}
    </div>
  );
}

