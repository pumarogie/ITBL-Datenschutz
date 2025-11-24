"use client";

import { ActionCard } from "@/components/action-card";
import { HintCard } from "@/components/hint-card";
import Button from "@/components/button";
import { InputValidation } from "@/components/input-validation";
import { useMessages } from "@/services/notification/message-provider";
import { useEffect, useState } from "react";
import { calculateBruteForceTime } from "@/util/passwort/passwort-validation";
import { AchievementId } from "@/util/achievement-data";
import Robot from "@/components/robot/robot";
import { getUserService } from "@/services/user/UserService";

export default function Builder() {
  const { addMessage } = useMessages();
  const [input, setInput] = useState("");
  const [isSecure, setIsSecure] = useState(false);
  const [hint, setHint] = useState("0.00 Sekunden");
  const [challengeStarted, setChallengeStarted] = useState(false);
  const messageService = useMessages();

  useEffect(() => {
    const context = getUserService();
    const setAchievement = async () => {
      if (hint.includes("Unendlich")) {
        await context
          .setAchievement(AchievementId.PASSWORD_BUILDER, true)
          .then((res) => {
            if (res) {
              messageService.showAchievement(AchievementId.PASSWORD_BUILDER);
            }
          });
      }
    };
    setAchievement();
  }, [hint]);

  const instruction =
    "Du kannst jetzt im Passwortgenerator ausprobieren und vergleichen, wie sicher verschiedene Passwörter sind. Wenn du bereit bist, kannst du mit dem Passwort Profi Spiel weitermachen und Passwörter nach ihrer Stärke bewerten";

  return (
    <>
      {!challengeStarted ? (
        <div className="w-full flex flex-col gap-6 items-center">
          <Robot expression="smiling" className="my-8" />
          <span className="max-w-[600px] text-center"> {instruction}</span>
          <Button onClick={() => setChallengeStarted(true)}>Start</Button>
        </div>
      ) : (
        <div className="flex flex-row justify-between flex-wrap h-full">
          <div className="flex flex-col max-w-[1100px] px-2 lg:px-6 justify-start mt-[-1rem] mb-4">
            <div className="flex flex-col xl:mr-8">
              <div
                className="flex flex-col justify-start max-w-full space-y-2 pt-4 pb-1"
                style={{ paddingBottom: isSecure ? "0rem" : "2rem" }}
              >
                <h1 className="text-lg lg:text-2xl text-blue-background decoration-3">
                  Erstelle ein sicheres Passwort!
                </h1>
                <div className="flex flex-row gap-x-8 gap-y-2 flex-wrap">
                  <input
                    className="flex border-2 border-black rounded-xl text-xl md:text-2xl p-3 md:p-4 lg:w-7/12 sm:w-full h-14 max-w-[290px]"
                    onChange={(e) => {
                      setInput(e.target.value);
                      setIsSecure(false);
                    }}
                    name="passwort-input"
                  />

                  <Button
                    onClick={() => {
                      if (input.trim() !== "") {
                        setIsSecure(true);
                        setHint(calculateBruteForceTime(input));
                      } else {
                        addMessage(
                          "Bitte gib zuerst ein Passwort ein",
                          "error",
                        );
                      }
                    }}
                  >
                    Passwortcheck
                  </Button>
                </div>
                {isSecure && (
                  <div className="space-y-2">
                    <InputValidation input={input} />
                  </div>
                )}
              </div>{" "}
              <div className="flex flex-row pt-6 2xl:pt-12">
                <div className="flex flex-row lg:gap-6 flex-wrap justify-center">
                  <div className="max-w-[250px]">
                    <ActionCard
                      title="Passwort Profi"
                      description="Bewerte die Sicherheit unserer Passwörter"
                      iconSrc="/key.svg"
                      buttonText="Spiel starten"
                      primaryColor="#A9D6E5"
                      secondaryColor="#2A6F97"
                      titleColor="#2A6F97"
                      redirectPath="/space/passwort/strength/"
                    />
                  </div>
                  <div className="max-w-[250px] opacity-50 hover:opacity-100">
                    <ActionCard
                      title="Safety First"
                      description="Lerne was ein gutes Passwort ausmacht"
                      iconSrc="/safety-first.svg"
                      buttonText="Erneut spielen"
                      primaryColor="#A9D6E5"
                      secondaryColor="#2A6F97"
                      titleColor="#2A6F97"
                      redirectPath="/space/passwort/quiz/"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[400px] max-h-[450px] sm:max-h-[550px] mx-2 lg:mx-6 w-full h-full">
            <HintCard
              text="Was denkst du wie lange es dauern würde dein Passwort zu knacken?"
              buttonText="Lösung anzeigen"
              iconSrc="/smartphone-pw.png"
              hint={
                <>
                  Ein Hacker bräuchte bei einem Brute Force Angriff ungefähr
                  <div className="text-3xl my-4 bg-blue-contrast rounded-xl text-white px-3 py-6">
                    {hint}
                  </div>
                  um dieses Passwort zu knacken
                </>
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
