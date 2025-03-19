import { useEffect, useState } from "react";
import { Link, Outlet, data, useLoaderData } from "react-router";
import type { Route } from "../+types/root";
import type { DBPlayer } from "../../../shared/models/Player";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `https://effective-adventure-xrxjjr9j6793vr7g-3001.app.github.dev/api/players/${params.id}`,
  );
  const player: DBPlayer = await response.json();
  return data(player);
}

export default function PlayerDetail() {
  const player = useLoaderData<DBPlayer>();
  const [playerDescription, setPlayerDescription] = useState<string | null>(
    null,
  );
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);

  useEffect(() => {
    const generateDescription = async () => {
      setIsLoadingDescription(true);
      try {
        const response = await fetch(
          `https://effective-adventure-xrxjjr9j6793vr7g-3001.app.github.dev/api/players/${player.id}/generate-description`,
        );

        const description = await response.json();

        setPlayerDescription(description.description);
      } catch (error) {
        console.error("Error generating description:", error);
      } finally {
        setIsLoadingDescription(false);
      }
    };

    generateDescription();
  }, [player]);

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200 dark:text-white">
          {player.playerName}
        </h2>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Position:</span> {player.position}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Games:</span> {player.games}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Hits:</span> {player.hits}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Home Runs:</span> {player.homeRun}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Batting Average:</span> {player.avg}
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
          ) : (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md border-l-4 border-blue-500 shadow-sm">
              <p className={`text-sm text-gray-700 dark:text-gray-300`}>
                {playerDescription}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            to={`/player/${encodeURIComponent(player.id)}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Player
          </Link>
        </div>
      </div>
      {/* Where the edit modal renders */}
      <Outlet />
    </>
  );
}
