import { data, Outlet, useLoaderData, useNavigate } from "react-router";
import type { Route } from "../+types/root";
import type { Player } from "../../../shared/models/Player";

export async function loader({ request }: Route.LoaderArgs) {
  // const response = await fetch('http://')

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
  const playersWithRanks = [...players]
    .sort((a, b) => b.Hits - a.Hits)
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

  return data(playersWithRanks);
}

export default function Dashboard() {
  const players = useLoaderData<(Player & { rank: number })[]>();
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
        Baseball Player Stats
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Player list table */}
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                >
                  Hits
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-700">
              {players.map((player) => (
                <tr
                  key={player["Player name"]}
                  className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600`}
                  onClick={() =>
                    navigate(
                      `/dashboard/player/${encodeURIComponent(player["Player name"])}`,
                    )
                  }
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                    {player.rank}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {player["Player name"]}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {player.position}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {player.Hits}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {/* <Link
                      to={`/dashboard/player/${encodeURIComponent(player["Player name"])}/edit`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Player details panel - this is where the Outlet goes */}
        <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
