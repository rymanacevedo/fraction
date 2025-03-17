import { useEffect, useState } from "react";
import { data, useLoaderData, Link } from "react-router";
import type { Route } from "../+types/root";
import type { Player } from "../../../shared/models/Player";

export async function loader({ params }: Route.LoaderArgs) {
  const playerName = params.playerName;

  const players = [
    {
      "Player name": "B Bonds",
      position: "LF",
      Games: 2986,
      "At-bat": 9847,
      Runs: 2227,
      Hits: 2935,
      "Double (2B)": 601,
      "third baseman": 77,
      "home run": 762,
      "run batted in": 1996,
      "a walk": 2558,
      Strikeouts: 1539,
      "stolen base": 514,
      "Caught stealing": 141,
      AVG: 0.298,
      "On-base Percentage": 0.444,
      "Slugging Percentage": 0.607,
      "On-base Plus Slugging": 1.051,
    },
    {
      "Player name": "H Aaron",
      position: "RF",
      Games: 3298,
      "At-bat": 12364,
      Runs: 2174,
      Hits: 3771,
      "Double (2B)": 624,
      "third baseman": 98,
      "home run": 755,
      "run batted in": 2297,
      "a walk": 1402,
      Strikeouts: 1383,
      "stolen base": 240,
      "Caught stealing": 73,
      AVG: 0.305,
      "On-base Percentage": 0.374,
      "Slugging Percentage": 0.555,
      "On-base Plus Slugging": 0.929,
    },
  ];

  const player = players.find((p) => p["Player name"] === playerName);

  if (!player) {
    throw new Response("Player not found", { status: 404 });
  }

  return data(player);
}

export default function PlayerDetail() {
  const player = useLoaderData<Player>();
  const [playerDescription, setPlayerDescription] = useState<string | null>(
    null,
  );
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);

  useEffect(() => {
    const generateDescription = async () => {
      setIsLoadingDescription(true);
      try {
        // In a real app, you would call your AI backend service here
        // For now, we'll simulate a response after a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const description = `${player["Player name"]} is a legendary ${player.position} known for accumulating ${player.Hits} hits throughout their illustrious career. With ${player["home run"]} home runs and ${player["run batted in"]} RBIs, they have established themselves as one of baseball's greatest hitters.\n\nTheir career batting average of ${player.AVG} and on-base percentage of ${player["On-base Percentage"]} demonstrate their exceptional ability to both hit for power and get on base consistently.`;

        setPlayerDescription(description);
      } catch (error) {
        console.error("Error generating description:", error);
      } finally {
        setIsLoadingDescription(false);
      }
    };

    generateDescription();
  }, [player]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200 dark:text-white">
        {player["Player name"]}
      </h2>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Position:</span> {player.position}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Games:</span> {player.Games}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Hits:</span> {player.Hits}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Home Runs:</span> {player["home run"]}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Batting Average:</span> {player.AVG}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3 dark:text-white">
          Player Description
        </h3>
        {isLoadingDescription ? (
          <div className="h-24 flex items-center justify-center text-gray-500 italic">
            Generating description...
          </div>
        ) : playerDescription ? (
          <div className="bg-white dark:bg-gray-700 p-4 rounded-md border-l-4 border-blue-500 shadow-sm">
            {playerDescription.split("\n\n").map((paragraph, idx) => (
              <p
                key={idx}
                className={`text-sm text-gray-700 dark:text-gray-300 ${idx > 0 ? "mt-3" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No description available
          </p>
        )}
      </div>

      <div className="mt-6">
        <Link
          to={`/dashboard/player/${encodeURIComponent(player["Player name"])}/edit`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit Player
        </Link>
      </div>
    </div>
  );
}
