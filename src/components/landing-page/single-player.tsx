import { ArrowsClockwise } from "@phosphor-icons/react";

export function SinglePlayer({
  username,
  generateUsername,
}: {
  username: string;
  generateUsername: () => void;
}) {
  return (
    <div className="space-y-4 rounded-3xl p-4">
      <div className="flex flex-col space-y-4 items-center">
        <label className="flex justify-center text-blue-background text-3xl mb-2">
          Benutzername
        </label>
        <span className="flex items-center rounded-xl bg-white text-2xl w-full md:w-72">
          <span
            className="p-2 mr-1 hover:cursor-pointer"
            onClick={generateUsername}
          >
            <ArrowsClockwise size={35} />
          </span>
          <span>{username}</span>
        </span>
      </div>
    </div>
  );
}
