import Link from "next/link";
import { InlineNavigation } from "@/components/inline-navigation";
import { useRouter } from "next/navigation";
import { LockKey, SignOut, Star } from "@phosphor-icons/react";
import { getUserService } from "@/services/user/UserService";

export function Overlay({
  masterQuizUnlocked,
}: {
  masterQuizUnlocked: boolean;
}) {
  const router = useRouter();
  return (
    <div className="absolute left-[-0.3rem] right-[-0.3rem] top-full mt-2 bg-white shadow-xl px-5 pt-6 pb-4 z-50 rounded-3xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-x-3 justify-around">
          <div className="flex items-center">
            <InlineNavigation />
          </div>

          <Link
            href={masterQuizUnlocked ? "/space/masterquiz" : ""}
            className="flex flex-col items-center bg-blue-contrast rounded-xl min-h-16 min-w-16 justify-center py-4 px-2"
          >
            <span className="pb-2 text-xs text-white">MasterQuiz</span>
            {masterQuizUnlocked ? (
              <Star size={60} color="#FFDB58" weight="fill" />
            ) : (
              <LockKey size={60} weight="duotone" color="#A9D6E5" />
            )}
          </Link>
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
          <SignOut size={28} />
          <span className="text-lg align-center">Ausloggen</span>
        </span>
      </div>
    </div>
  );
}
