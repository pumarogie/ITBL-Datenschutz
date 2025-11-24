"use client";

import Image from "next/image";
import { useState } from "react";
import Task from "@/components/task";
import {
  House,
  Info,
  MagnifyingGlass,
  Plus,
  PlusSquare,
  Trash,
  User,
  Video,
  X,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Button from "@/components/button";
import { useMessages } from "@/services/notification/message-provider";
import Link from "next/link";
import TagList from "@/app/(safespace)/space/daten-verarbeitung/kapitel2/analyse/components/tag-list";

type FeedPost = string;
const posts = [
  "/datenverarbeitung/analyse/level0/wrong_post3.jpg",
  "/datenverarbeitung/analyse/level0/wrong_post8.jpg",
  "/datenverarbeitung/analyse/level0/correct_post10.jpg",
  "/datenverarbeitung/analyse/level0/wrong_post2.jpg",
  "/datenverarbeitung/analyse/level0/correct_post7.jpg",
  "/datenverarbeitung/analyse/level0/wrong_post11.jpg",
  "/datenverarbeitung/analyse/level0/correct_post6.jpg",
  "/datenverarbeitung/analyse/level0/wrong_post10.jpg",
  "/datenverarbeitung/analyse/level0/correct_post11.jpg",
  "/datenverarbeitung/analyse/level0/correct_post2.jpg",
  "/datenverarbeitung/analyse/level0/wrong_post1.jpg",
  "/datenverarbeitung/analyse/level0/correct_post3.jpg",
  "/datenverarbeitung/analyse/level0/wrong_post9.jpg",
  "/datenverarbeitung/analyse/level0/correct_post1.jpg",
  "/datenverarbeitung/analyse/level0/correct_post5.jpg",
  "/datenverarbeitung/analyse/level0/wrong_post4.jpg",
  "/datenverarbeitung/analyse/level0/correct_post4.jpg",
  "/datenverarbeitung/analyse/level0/correct_post9.jpg",
  "/datenverarbeitung/analyse/level0/wrong_post7.jpg",
  "/datenverarbeitung/analyse/level0/correct_post8.jpg",
];

const correctPosts = [
  "/datenverarbeitung/analyse/level0/correct_post7.jpg",
  "/datenverarbeitung/analyse/level0/correct_post6.jpg",
  "/datenverarbeitung/analyse/level0/correct_post2.jpg",
  "/datenverarbeitung/analyse/level0/correct_post3.jpg",
  "/datenverarbeitung/analyse/level0/correct_post1.jpg",
  "/datenverarbeitung/analyse/level0/correct_post5.jpg",
  "/datenverarbeitung/analyse/level0/correct_post4.jpg",
  "/datenverarbeitung/analyse/level0/correct_post9.jpg",
  "/datenverarbeitung/analyse/level0/correct_post8.jpg",
  "/datenverarbeitung/analyse/level0/correct_post10.jpg",
  "/datenverarbeitung/analyse/level0/correct_post11.jpg",
];

export default function DataProcessingPart1() {
  const [selectedPosts, setSelectedPosts] = useState<FeedPost[]>([]);
  const [done, setDone] = useState(false);
  const [showData, setShowData] = useState(false);
  const { addMessage } = useMessages();

  function onSelect(post: string) {
    if (selectedPosts.includes(post)) {
      setSelectedPosts((currentPosts) => currentPosts.filter((p) => p != post));
    } else {
      if (selectedPosts.length == correctPosts.length) return;
      setSelectedPosts((currentPosts) => [...currentPosts, post]);
    }
  }

  function check() {
    const correct = selectedPosts.filter((p) =>
      correctPosts.includes(p),
    ).length;
    if (correct == correctPosts.length) {
      addMessage("Du hast alle passenden Posts gefunden!", "success");
      setDone(true);
    } else {
      addMessage(
        "Es fehlen noch einige Posts. Du hast " +
          correct +
          " von " +
          correctPosts.length +
          " richtigen Posts gefunden.",
      );
    }
  }

  return (
    <div className="flex w-full h-full gap-10 relative">
      <TagList show={showData} onClose={() => setShowData(false)} />

      <div className="flex flex-wrap content-start gap-4 overflow-y-auto h-full max-w-[500px] m-auto">
        {!done && (
          <div>
            <Task>
              Wähle aus den verfügbaren Posts diejenigen aus, die Marie am
              meisten gefallen könnten.
            </Task>
            <Button
              style="secondary"
              className="mt-4"
              onClick={() => setShowData(!showData)}
            >
              <Info weight="fill" className="mr-4" /> Gesammelte Daten
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-1 w-full">
          {posts
            .filter((p) => !selectedPosts.includes(p))
            .map((post) => (
              <div
                key={post}
                onClick={() => onSelect(post)}
                className="relative group hover:z-10 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute w-full h-full z-10 p-10 group-hover:opacity-100 opacity-0 transition-all">
                  <Plus className="relative w-full h-full z-10 text-green-200" />
                  <div className="absolute top-0 left-0 w-full h-full bg-green-800 opacity-50" />
                </div>
                <Post
                  src={post}
                  className="max-w-28 group-hover:scale-110 transition-all"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="max-w-96 w-full flex-shrink-0 flex flex-col h-full overflow-y-auto">
        <span className="text-xl font-semibold mb-6">For you</span>
        <div className="grid grid-cols-3 content-start gap-1 h-full">
          {selectedPosts.map((post) => (
            <div
              key={post}
              onClick={() => onSelect(post)}
              className="relative group hover:z-10 transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute w-full h-full z-10 p-10 group-hover:opacity-100 opacity-0 transition-all">
                <Trash className="relative w-full h-full z-10 text-red-200" />
                <div className="absolute top-0 left-0 w-full h-full bg-red-800 opacity-50" />
              </div>
              <Post
                src={post}
                className="group-hover:scale-110 transition-all"
              />
            </div>
          ))}
          {Array(correctPosts.length - selectedPosts.length)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 w-full h-full aspect-square"
              ></div>
            ))}
        </div>
        <div className="flex-shrink-0 flex justify-between text-2xl pb-10 px-6">
          <House /> <MagnifyingGlass /> <PlusSquare /> <Video /> <User />{" "}
        </div>
        {!done && (
          <Button onClick={check} className="flex-shrink-0">
            Erfolg prüfen
          </Button>
        )}
        {done && (
          <Link href="/space/daten-verarbeitung/kapitel2/analyse/level/1/part/0">
            <Button onClick={() => {}}>Weiter</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function Post({
  src,
  onClick,
  className,
}: {
  src: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className={clsx("aspect-square", className)} onClick={onClick}>
      <Image
        src={src}
        alt="post"
        width="200"
        height="200"
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
