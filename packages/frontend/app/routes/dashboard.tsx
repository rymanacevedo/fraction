import { data, Outlet, useLoaderData, useNavigate } from "react-router";
import type { Route } from "../+types/root";
import type { DBPlayer } from "../../../shared/models/Player";

export async function loader({ request }: Route.LoaderArgs) {
  const response = await fetch('https://effective-adventure-xrxjjr9j6793vr7g-3001.app.github.dev/api/players');
  const players: DBPlayer[] = await response.json();
  return data(players);
}

export default function Dashboard() {
  const players = useLoaderData<DBPlayer[]>();
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
        Baseball Player Stats
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Player list table */}
        <div className="overflow-y-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg max-h-96">
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
                  key={player.id}
                  className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600`}
                  onClick={() =>
                    navigate(
                      `/dashboard/player/${encodeURIComponent(player.id)}`,
                    )
                  }
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                    {player.rank}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {player.playerName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {player.position}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {player.hits}
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
