import { useState } from "react";
import { data, useLoaderData, Form, useNavigate, redirect } from "react-router";
import type { Route } from "../+types/root";
import type { Player } from "../../../shared/models/Player";

export async function loader({ params }: Route.LoaderArgs) {
  // In a real app, you'd fetch the specific player data from your API
  const playerName = params.playerName;
  
  // Mock data - in a real app, you would fetch this from your API
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

  const player = players.find(p => p["Player name"] === playerName);
  
  if (!player) {
    throw new Response("Player not found", { status: 404 });
  }
  
  return data(player);
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const playerName = params.playerName;
  const entries = Object.fromEntries(formData);
  
  // Extract values from form
  const updates = {
    "Player name": formData.get("playerName") as string,
    position: formData.get("position") as string,
    Games: parseInt(formData.get("games") as string),
    Hits: parseInt(formData.get("hits") as string),
    "home run": parseInt(formData.get("homeRuns") as string),
    AVG: parseFloat(formData.get("avg") as string),
    // Add other fields as needed
  };
  
  // In a real app, you would send the updates to your API
  console.log("Updating player:", playerName, "with data:", updates);
  
  // Simulate a delay for the API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Redirect to the player detail page after successful update
  return redirect(`/dashboard/player/${encodeURIComponent(updates["Player name"])}`);
}

export default function PlayerEdit() {
  const player = useLoaderData<Player>();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/dashboard/player/${encodeURIComponent(player["Player name"])}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200 dark:text-white">
        Edit Player: {player["Player name"]}
      </h2>
      
      <Form method="post" className="mt-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Player Name
            </label>
            <input
              type="text"
              name="playerName"
              id="playerName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Position
            </label>
            <select
              name="position"
              id="position"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
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
            <label htmlFor="games" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Games Played
            </label>
            <input
              type="number"
              name="games"
              id="games"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="hits" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Hits
            </label>
            <input
              type="number"
              name="hits"
              id="hits"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="homeRuns" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Home Runs
            </label>
            <input
              type="number"
              name="homeRuns"
              id="homeRuns"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="avg" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Batting Average
            </label>
            <input
              type="number"
              name="avg"
              id="avg"
              min="0"
              max="1"
              step="0.001"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>
        
        <div className="mt-6 flex items-center space-x-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
