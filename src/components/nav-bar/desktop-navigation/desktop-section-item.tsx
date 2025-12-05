import Link from "next/link";
import { SectionName } from "../section";
import Image from "next/image";
import clsx from "clsx";

type DesktopSectionItem = {
  setSection: (activeSection: SectionName) => void;
  sectionName: SectionName;
  isActive: boolean;
  srcActive: string;
  srcInactive: string;
  alt: string;
  href: string;
  className: string;
  isCollapsed: boolean;
};

export function DesktopSectionItem({
  setSection,
  sectionName,
  isActive,
  srcActive,
  srcInactive,
  alt,
  href,
  className,
  isCollapsed,
}: DesktopSectionItem) {
  return (
    <Link
      onClick={() => setSection(sectionName)}
      href={href}
      className={className}
    >
      {isActive ? (
        <Image
          src={srcActive}
          alt={alt}
          width={30}
          height={30}
          className="scale-100"
          priority
        />
      ) : (
        <Image src={srcInactive} alt={alt} width={30} height={30} priority />
      )}
      <span
        className={clsx(
          "text-center transition-opacity",
          isCollapsed && "opacity-0",
        )}
      >
        {alt}
      </span>
    </Link>
  );
}
