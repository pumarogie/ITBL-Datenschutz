"use client";

import Button from "@/components/button";
import { redirect, useRouter } from "next/navigation";
import { SinglePlayer } from "@/components/landing-page/single-player";
import { Multiplayer } from "@/components/landing-page/multi-player";
import { useEffect, useState } from "react";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";
import Impressum from "./(safespace)/impressum/page";
import {
  getUserService,
  ServiceMode,
  setUserServiceMode,
} from "@/services/user/UserService";

export default function HomePage() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [dataProtectionAgreed, setDataProtectionAgreed] = useState(false);
  const [mode, setMode] = useState<ServiceMode | null>(null);
  const [username, setUsername] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [showImpressum, setShowImpressum] = useState(false);
  const router = useRouter();
  const generateUsername = () =>
    setUsername(
      uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: " ",
        style: "capital",
      }),
    );

  useEffect(() => {
    if (!username) {
      generateUsername();
    }
  }, [username]);

  const handleModeSelection = (selectedMode: ServiceMode) => {
    setMode(selectedMode);
  };

  const handleStartGame = async () => {
    if (mode !== null && username != null) {
      setUserServiceMode(mode);
      await getUserService().createPlayer(username, mode, gameCode);
    }
    router.replace("/space");
  };

  useEffect(() => {
    async function func() {
      if (await getUserService().isLoggedIn()) {
        router.replace("/space");
      }
    }
    func().then();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-blue-background">
      {!showImpressum ? (
        <>
          <h1 className="flex text-xl lg:text-5xl text-white font-mono mb-10 ">
            Willkommen zu Safe Space
          </h1>
          {!dataProtectionAgreed && (
            <div className="flex flex-col space-y-4 mx-4 lg:mx-10 w-200 p-4 lg:p-10 shadow-lg bg-blue-200 rounded-3xl max-h-[80%]">
              <p>
                Bevor du in SafeSpace einsteigen kannst, bitten wir dich, die
                Datenschutzerklärung durchzulesen.
              </p>
              <div className="py-4 px-6 bg-white rounded-xl overflow-y-auto">
                <h3 className="text-2xl font-semibold text-blue-background">
                  Datenschutzerklärung
                </h3>
                <div>
                  <h4 className="text-xl font-semibold mb-4 mt-6">
                    I. Informationen über die Verarbeitung Ihrer Daten gemäß
                    Art. 13 der Datenschutz-Grundverordnung (DS-GVO)
                  </h4>
                  <h5 className="text-lg font-semibold mb-2 mt-4">
                    1. Verantwortlicher und Datenschutzbeauftragter
                  </h5>
                  Verantwortlich für diese Website ist Anna Weber. Den
                  Datenschutzbeauftragten erreichen Sie per E-Mail unter
                  ge89duk@mytum.de.
                  <h5 className="text-lg font-semibold mb-2 mt-4">
                    2. Daten, die für die Bereitstellung der Website und die
                    Erstellung der Protokolldateien verarbeitet werden
                  </h5>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    a. Welche Daten werden für welchen Zweck verarbeitet?
                  </h6>
                  Bei jedem Zugriff auf Inhalte der Website werden vorübergehend
                  Daten gespeichert, die möglicherweise eine Identifizierung
                  zulassen. Die folgenden Daten können hierbei erhoben:
                  <ul className="list-disc ml-4">
                    <li>Datum und Uhrzeit des Zugriffs</li>

                    <li>IP-Adresse</li>

                    <li>Hostname des zugreifenden Rechners</li>

                    <li>Website, von der aus die Website aufgerufen wurde</li>

                    <li>Websites, die über die Website aufgerufen werden</li>

                    <li>Besuchte Seite auf unserer Website</li>

                    <li>Meldung, ob der Abruf erfolgreich war</li>

                    <li>Übertragene Datenmenge</li>

                    <li>
                      Informationen über den Browsertyp und die verwendete
                      Version
                    </li>

                    <li>Betriebssystem</li>
                  </ul>
                  <p>
                    Die vorübergehende Speicherung der Daten ist für den Ablauf
                    eines Websitebesuchs erforderlich, um eine Auslieferung der
                    Website zu ermöglichen. Eine weitere Speicherung in
                    Protokolldateien erfolgt, um die Funktionsfähigkeit der
                    Website und die Sicherheit der informationstechnischen
                    Systeme sicherzustellen. In diesen Zwecken liegt auch unser
                    berechtigtes Interesse an der Datenverarbeitung.
                  </p>
                  <p>
                    Zusätzlich verwenden wir Cookies, um Nutzernamen zu
                    speichern und einen internen Videoplayer bereitzustellen.
                    Diese Cookies helfen uns, die Benutzerfreundlichkeit unserer
                    Website zu verbessern und dir eine personalisierte Erfahrung
                    zu bieten.
                  </p>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    b. Auf welcher Rechtsgrundlage werden diese Daten
                    verarbeitet?
                  </h6>
                  <p>
                    Die Daten werden auf der Grundlage des Art. 6 Abs. 1
                    Buchstabe f DS-GVO verarbeitet.
                  </p>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    c. Wie lange werden die Daten gespeichert?
                  </h6>
                  <p>
                    Die Daten werden gelöscht, sobald sie für die Erreichung des
                    Zwecks ihrer Erhebung nicht mehr erforderlich sind. Bei der
                    Bereitstellung der Website ist dies der Fall, wenn die
                    jeweilige Sitzung beendet ist. Die Protokolldateien werden
                    direkt und ausschließlich für Administratoren zugänglich
                    aufbewahrt. Danach sind sie nur noch indirekt über die
                    Rekonstruktion von Sicherungsbändern verfügbar und werden
                    nach […, maximal vier Wochen] endgültig gelöscht.
                  </p>
                  <h5 className="text-lg font-semibold mb-2 mt-4">
                    3. Betroffenenrechte
                  </h5>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    a. Recht auf Auskunft
                  </h6>
                  <p>
                    Sie können Auskunft nach Art. 15 DS-GVO über Ihre
                    personenbezogenen Daten verlangen, die wir verarbeiten.
                  </p>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    b. Recht auf Widerspruch:
                  </h6>
                  <p>
                    Sie haben ein Recht auf Widerspruch aus besonderen Gründen
                    (siehe unter Punkt II).
                  </p>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    c. Recht auf Berichtigung
                  </h6>
                  <p>
                    Sollten die Sie betreffenden Angaben nicht (mehr) zutreffend
                    sein, können Sie nach Art. 16 DS-GVO eine Berichtigung
                    verlangen. Sollten Ihre Daten unvollständig sein, können Sie
                    eine Vervollständigung verlangen.
                  </p>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    d. Recht auf Löschung
                  </h6>
                  <p>
                    Sie können nach Art. 17 DS-GVO die Löschung Ihrer
                    personenbezogenen Daten verlangen.
                  </p>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    e. Recht auf Einschränkung der Verarbeitung
                  </h6>
                  <p>
                    Sie haben nach Art. 18 DS-GVO das Recht, eine Einschränkung
                    der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </p>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    f. Recht auf Beschwerde
                  </h6>
                  <p>
                    Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer
                    personenbezogenen Daten gegen Datenschutzrecht verstößt,
                    haben Sie nach Ar. 77 Abs. 1 DS-GVO das Recht, sich bei
                    einer Datenschutzaufsichtsbehörde eigener Wahl zu
                    beschweren. Hierzu gehört auch die für den Verantwortlichen
                    zuständige Datenschutzaufsichtsbehörde: Bayerische
                    Landesbeauftragte für den Datenschutz
                    (https://www.lda.bayern.de/de/index.html)
                  </p>
                  <h6 className="text-sm font-semibold mb-1 mt-2">
                    g. Recht auf Datenübertragbarkeit
                  </h6>
                  <p>
                    Für den Fall, dass die Voraussetzungen des Art. 20 Abs. 1
                    DS-GVO vorliegen, steht Ihnen das Recht zu, sich Daten, die
                    wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
                    Vertrags automatisiert verarbeiten, an sich oder an Dritte
                    aushändigen zu lassen. Die Erfassung der Daten zur
                    Bereitstellung der Website und die Speicherung der
                    Protokolldateien sind für den Betrieb der Internetseite
                    zwingend erforderlich. Sie beruhen daher nicht auf einer
                    Einwilligung nach Art. 6 Abs. 1 Buchstabe a DS-GVO oder auf
                    einem Vertrag nach Art. 6 Abs. 1 Buchstabe b DS-GVO, sondern
                    sind nach Art. 6 Abs. 1 Buchstabe f DS-GVO gerechtfertigt.
                    Die Voraussetzungen des Art. 20 Abs. 1 DS-GVO sind demnach
                    insoweit nicht erfüllt.
                  </p>
                  <h4 className="text-xl font-semibold mb-4 mt-6">
                    II. Recht auf Widerspruch gemäß Art. 21 Abs. 1 DS-GVO
                  </h4>
                  <p>
                    Sie haben das Recht, aus Gründen, die sich aus Ihrer
                    besonderen Situation ergeben, jederzeit gegen die
                    Verarbeitung Ihrer personenbezogenen Daten, die aufgrund von
                    Artikel 6 Abs. 1 Buchstabe f DS-GVO erfolgt, Widerspruch
                    einzulegen. Der Verantwortliche verarbeitet die
                    personenbezogenen Daten dann nicht mehr, es sei denn, er
                    kann zwingende schutzwürdige Gründe für die Verarbeitung
                    nachweisen, die die Interessen, Rechte und Freiheiten der
                    betroffenen Person überwiegen, oder die Verarbeitung dient
                    der Geltendmachung, Ausübung oder Verteidigung von
                    Rechtsansprüchen. Die Erfassung der Daten zur Bereitstellung
                    der Website und die Speicherung der Protokolldateien sind
                    für den Betrieb der Internetseite zwingend erforderlich.
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <input
                    id="data_aggreement"
                    type="checkbox"
                    className="mr-2"
                    onChange={(ev) => setCheckboxChecked(ev.target.checked)}
                  />
                  <label htmlFor="data_aggreement">
                    Ich habe die Informationen gelesen und stimme der
                    anonymisierten Datenspeicherung und -verarbeitung zu.
                  </label>
                </div>
                <Button
                  className="mt-4"
                  onClick={() => setDataProtectionAgreed(checkboxChecked)}
                >
                  Weiter
                </Button>
              </div>
            </div>
          )}
          {dataProtectionAgreed && (
            <>
              <div className="flex flex-col space-y-4 justify-center items-center w-200 p-10 shadow-lg bg-blue-200 rounded-3xl">
                <div className="flex space-x-5 justify-center">
                  {!mode && (
                    <div className="flex flex-col md:flex-row gap-5">
                      <Button
                        onClick={() => handleModeSelection("singlePlayer")}
                        className="flex justify-center w-full md:w-72 h-14 p-5 text-2xl"
                      >
                        Single Player
                      </Button>
                      <Button
                        onClick={() => handleModeSelection("multiPlayer")}
                        className="flex justify-center w-full md:w-72 h-14 p-5 text-2xl"
                      >
                        Multiplayer
                      </Button>
                    </div>
                  )}
                </div>
                <>
                  {mode === "singlePlayer" && (
                    <SinglePlayer
                      username={username}
                      generateUsername={generateUsername}
                    />
                  )}
                  {mode === "multiPlayer" && (
                    <Multiplayer
                      username={username}
                      setGameCode={setGameCode}
                      generateUsername={generateUsername}
                    />
                  )}
                </>
                <div>
                  {mode !== null && (
                    <Button
                      onClick={handleStartGame}
                      className="flex justify-center text-xl w-full h-14 p-5 mb-2"
                    >
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}

          <span className="absolute bottom-3 w-full text-center">
            <span
              onClick={() => setShowImpressum(true)}
              className="text-white text-sm opacity-50 hover:opacity-100 hover:underline hover:cursor-pointer"
            >
              Impressum
            </span>
          </span>
        </>
      ) : (
        <div className="flex flex-col">
          <span className="h-[80vh] overflow-y-auto text-gray-200">
            <Impressum />
          </span>
          <Button
            onClick={() => setShowImpressum(false)}
            className="ml-6 mt-4 max-w-[150px]"
          >
            Schließen
          </Button>
        </div>
      )}
    </div>
  );
}
