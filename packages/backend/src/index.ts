import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { DBPlayer, Player } from "../../shared/models/Player";
import { transformPlayer } from "../../shared/utils/TransformPlayer";
import * as db from "./database";
import { createBaseballDescriptions } from "./services/ai";

const app = new Hono();

app.use(cors());

// Routes
app.get("/", (c) => c.text("Baseball Stats API"));

app.get("/api/players", async (c) => {
  try {
    const players = db.getPlayers();
    return c.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return c.json({ error: "Failed to fetch players" }, 500);
  }
});

app.get("/api/players/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const player = db.getPlayerById(id);

    if (!player) {
      return c.json({ error: "Player not found" }, 404);
    }

    return c.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    return c.json({ error: "Failed to fetch player" }, 500);
  }
});

app.get("/api/players/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const player = db.getPlayerById(id);

    if (!player) {
      return c.json({ error: "Player not found" }, 404);
    }

    return c.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    return c.json({ error: "Failed to fetch player" }, 500);
  }
});

app.put("/api/players/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const player = db.getPlayerById(id);

    if (!player) {
      return c.json({ error: "Player not found" }, 404);
    }

    const playerData = await c.req.json();
    db.updatePlayer(id, playerData);

    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating player:", error);
    return c.json({ error: "Failed to update player" }, 500);
  }
});

app.get("/api/players/:id/generate-description", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const player = db.getPlayerById(id) as unknown as DBPlayer;

    if (!player) {
      return c.json({ error: "Player not found" }, 404);
    }

    const prompt = `
    Describe this baseball player:
    Name: ${player.playerName}
    Position: ${player.position}
    Hits: ${player.hits}
    Home Runs: ${player.runs}
    Batting Average: ${player.avg}
    Rank: ${player.rank}`;

    const { description } = await createBaseballDescriptions(prompt);

    return c.json({ description });
  } catch (error) {
    console.error("Error generating description:", error);
    return c.json({ error: "Failed to generate description" }, 500);
  }
});

app.delete("/api/players/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const player = db.getPlayerById(id);

    if (!player) {
      return c.json({ error: "Player not found" }, 404);
    }

    db.deletePlayer(id);

    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting player:", error);
    return c.json({ error: "Failed to delete player" }, 500);
  }
});

app.post("/api/sync", async (c) => {
  try {
    const response = await fetch(
      "https://api.hirefraction.com/api/test/baseball",
    );

    if (!response.ok) {
      return c.json({ error: "Failed to fetch from baseball API" }, 500);
    }

    const players: Player[] = await response.json();

    // Calculate ranks based on hits per season
    const sortedPlayers: Player[] = [...players].sort(
      (a, b) => b.Hits - a.Hits,
    );

    for (let i = 0; i < sortedPlayers.length; i++) {
      const player = sortedPlayers[i];

      // Transform the API data to match our schema
      const playerWithRank = transformPlayer(player, i + 1);

      db.createPlayer(playerWithRank);
    }

    return c.json({ success: true, count: players.length });
  } catch (error) {
    console.error("Error syncing data:", error);
    return c.json({ error: "Failed to sync data" }, 500);
  }
});

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
