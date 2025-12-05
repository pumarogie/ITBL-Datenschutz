"use client";
import Link from "next/link";
import Image from "next/image";
import { Section } from "../section";
import { LockKey, SignOut, Star } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Button from "@/components/button";
import { getUserService } from "@/services/user/UserService";

export function DesktopNav({
  masterQuizUnlocked,
  isCollapsed,
}: {
  masterQuizUnlocked: boolean;
  isCollapsed: boolean;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-full justify-between align-center">
      <div>
        <div className="flex flex-row space-x-4 justify-start items-center ml-14 mt-5 mb-12">
          <Link
            href={"/space"}
            className="flex items-center bg-blue-contrast rounded-xl max-h-14 min-w-14 justify-center p-4"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={20}
              height={20}
              className="mx-auto"
              priority
            />
          </Link>
          <h2
            className={clsx(
              "text-white text-3xl font-bold transition-opacity",
              isCollapsed && "opacity-0",
            )}
          >
            SafeSpace
          </h2>
        </div>
        <Section isCollapsed={isCollapsed} />
      </div>
      <div
        className={clsx(
          "mx-auto transition-opacity",
          isCollapsed && "opacity-0",
        )}
      >
        <div
          className={clsx(
            "min-w-[225px] h-[270px] rounded-xl p-4 scale-95",
            !masterQuizUnlocked && "opacity-60",
            masterQuizUnlocked && "animate-pulse",
          )}
          style={{ backgroundColor: "#014F86", animationIterationCount: 8 }}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col relative justify-start items-start ">
              <h3
                className="text-lg pb-2 font-medium"
                style={{ color: "white" }}
              >
                Master Quiz
              </h3>
              <span className="font-light text-sm pb-2 text-module-blue">
                {masterQuizUnlocked
                  ? "Teste all dein Wissen"
                  : "Noch nicht freigeschaltet"}
              </span>
              <Button
                className="z-50"
                style={masterQuizUnlocked ? "default" : "neutral"}
                onClick={() => router.push("/space/masterquiz")}
                disabled={!masterQuizUnlocked}
              >
                Start
              </Button>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 right-0 rounded-br-xl"
              width="170"
              height="170"
              viewBox="0 0 179 161"
              fill="none"
            >
              <circle
                opacity="0.5"
                cx="123"
                cy="123"
                r="123"
                fill={"#2A6F97"}
              />
            </svg>
            <div className="flex justify-end w-full z-50">
              {masterQuizUnlocked ? (
                <Star size={120} color="#FFDB58" weight="fill" />
              ) : (
                <LockKey size={120} weight="duotone" color="#A9D6E5" />
              )}
            </div>
          </div>
        </div>
        <span
          className="flex justify-center items-center gap-2 mt-2 hover:cursor-pointer"
          onClick={() => {
            getUserService()
              .deleteUser()
              .then(() => {
                router.push("/");
              });
          }}
        >
          <SignOut size={28} color="#ffffff" />
          <span className="text-white text-lg align-center">Ausloggen</span>
        </span>
      </div>
    </div>
  );
}
