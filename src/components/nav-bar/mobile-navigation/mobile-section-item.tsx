import Link from "next/link";
import { SectionName } from "../section";
import Image from "next/image";

type MobileSectionItem = {
  setSection: (activeSection: SectionName) => void;
  sectionName: SectionName;
  isActive: boolean;
  srcActive: string;
  srcInactive: string;
  alt: string;
  href: string;
};

export function MobileSectionItem({
  setSection,
  sectionName,
  isActive,
  srcActive,
  srcInactive,
  alt,
  href,
}: MobileSectionItem) {
  return (
    <Link onClick={() => setSection(sectionName)} href={href}>
      {isActive ? (
        <Image
          src={srcActive}
          alt={alt}
          width={40}
          height={40}
          className="scale-100"
          priority
        />
      ) : (
        <Image src={srcInactive} alt={alt} width={40} height={40} />
      )}
    </Link>
  );
}
