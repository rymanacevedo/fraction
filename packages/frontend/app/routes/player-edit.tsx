import {
  Form,
  redirect,
  useNavigate,
  useRouteLoaderData,
} from "react-router";
import type { Route } from "../+types/root";
import { DBPlayerSchema, type DBPlayer } from "../../../shared/models/Player";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData) as Record<string, string>;

  const updatedPlayer: DBPlayer = {
    id: parseInt(entries.id),
    playerName: entries.playerName,
    position: entries.position,
    rank: parseInt(entries.rank),
    games: parseInt(entries.games),
    atBat: parseInt(entries.atBat),
    runs: parseInt(entries.runs),
    hits: parseInt(entries.hits),
    doubles: parseInt(entries.doubles),
    thirdBaseman: parseInt(entries.thirdBaseman),
    homeRun: parseInt(entries.homeRuns),
    rbi: parseInt(entries.rbi),
    aWalk: parseInt(entries.aWalk),
    strikeouts: parseInt(entries.strikeouts),
    stolenBases: parseInt(entries.stolenBases),
    caughtStealing: entries.caughtStealing === '--' ? -1 : parseInt(entries.caughtStealing),
    avg: parseFloat(entries.avg),
    onBasePercentage: parseFloat(entries.onBasePercentage),
    sluggingPercentage: parseFloat(entries.sluggingPercentage),
    onBasePlusSlugging: parseFloat(entries.onBasePlusSlugging),
  };

  DBPlayerSchema.parse(updatedPlayer);

  const response = await fetch(
    `https://effective-adventure-xrxjjr9j6793vr7g-3001.app.github.dev/api/players/${updatedPlayer.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlayer),
    },
  );
  // Redirect to the player detail page after successful update
  return redirect(`/player/${encodeURIComponent(updatedPlayer.id)}`);
}

export default function PlayerEdit() {
  const player = useRouteLoaderData<DBPlayer>("playerId");
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 dark:bg-gray-800">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer rounded-md bg-white text-gray-400 hover:text-gray-500 dark:bg-gray-800 dark:hover:text-gray-400"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Your existing form content here */}
            <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200 dark:text-white">
              Edit Player: {player?.playerName}
            </h2>

            <Form method="post" className="mt-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="playerName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Player Name
                  </label>
                  <input
                    type="text"
                    name="playerName"
                    id="playerName"
                    defaultValue={player?.playerName}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Position
                  </label>
                  <select
                    name="position"
                    id="position"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                    defaultValue={player?.position}
                  >
                    <option value="C">Catcher (C)</option>
                    <option value="1B">First Base (1B)</option>
                    <option value="2B">Second Base (2B)</option>
                    <option value="3B">Third Base (3B)</option>
                    <option value="SS">Shortstop (SS)</option>
                    <option value="LF">Left Field (LF)</option>
                    <option value="CF">Center Field (CF)</option>
                    <option value="RF">Right Field (RF)</option>
                    <option value="DH">Designated Hitter (DH)</option>
                    <option value="P">Pitcher (P)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="games"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Games Played
                  </label>
                  <input
                    type="number"
                    name="games"
                    id="games"
                    min="0"
                    defaultValue={player?.games}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="hits"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Hits
                  </label>
                  <input
                    type="number"
                    name="hits"
                    id="hits"
                    min="0"
                    defaultValue={player?.hits}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="homeRuns"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Home Runs
                  </label>
                  <input
                    type="number"
                    name="homeRuns"
                    id="homeRuns"
                    min="0"
                    defaultValue={player?.homeRun}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="avg"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Batting Average
                  </label>
                  <input
                    type="number"
                    name="avg"
                    id="avg"
                    min="0"
                    max="1"
                    defaultValue={player?.avg}
                    step="0.001"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>
              {/* Hidden fields for remaining DBPlayer properties */}
              <input type="hidden" name="id" value={player?.id} />
              <input type="hidden" name="rank" value={player?.rank} />
              <input type="hidden" name="atBat" value={player?.atBat} />
              <input type="hidden" name="runs" value={player?.runs} />
              <input type="hidden" name="doubles" value={player?.doubles} />
              <input
                type="hidden"
                name="thirdBaseman"
                value={player?.thirdBaseman}
              />
              <input type="hidden" name="rbi" value={player?.rbi} />
              <input type="hidden" name="aWalk" value={player?.aWalk} />
              <input
                type="hidden"
                name="strikeouts"
                value={player?.strikeouts}
              />
              <input
                type="hidden"
                name="stolenBases"
                value={player?.stolenBases}
              />
              <input
                type="hidden"
                name="caughtStealing"
                value={player?.caughtStealing}
              />
              <input
                type="hidden"
                name="onBasePercentage"
                value={player?.onBasePercentage}
              />
              <input
                type="hidden"
                name="sluggingPercentage"
                value={player?.sluggingPercentage}
              />
              <input
                type="hidden"
                name="onBasePlusSlugging"
                value={player?.onBasePlusSlugging}
              />

              <div className="mt-6 flex items-center space-x-4">
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
