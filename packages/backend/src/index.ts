import { Hono } from "hono";
import { cors } from "hono/cors";
import * as db from "./database";
import { createBaseballDescriptions } from "./services/ai";
import { Player } from "../../shared/models/Player";

const app = new Hono();

app.use(cors());

const syncBaseballData = async () => {
  try {
    const response = await fetch(
      "https://api.hirefraction.com/api/test/baseball",
    );
    const players: Player[] = await response.json();

    // Sort players by hits per season to calculate ranks
    const sortedPlayers = [...players].sort((a, b) => b.Hits - a.Hits);

    // Assign ranks
    // sortedPlayers.forEach((player, index) => {
    //   player.rank = index + 1;
    //   db.insertPlayer(
    //     player.name,
    //     player.team,
    //     player.position,
    //     player.hitsPerSeason,
    //     player.rank
    //   );
    // });

    console.log("Baseball data synced successfully");
  } catch (error) {
    console.error("Error syncing baseball data:", error);
  }
};

// Routes
app.get("/", (c) => c.text("Baseball Stats API"));

// Get all players
app.get("/api/players", (c) => {
  return c.json(db.getPlayers());
});

// Get player by ID
app.get("/api/players/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const player = db.getPlayerById(id);
  if (!player) {
    return c.json({ error: "Player not found" }, 404);
  }
  return c.json(player);
});

// Update player
app.put("/api/players/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const player: Player = await c.req.json();
  // db.updatePlayer(
  //   id,
  //   player.name,
  //   player.team,
  //   player.position,
  //   player.hitsPerSeason,
  //   player.rank
  // );
  return c.json({ success: true });
});

// Generate player description using LLM
app.get("/api/players/:id/generate-description", async (c) => {
  const id = parseInt(c.req.param("id"));
  const player = db.getPlayerById(id);

  if (!player) {
    return c.json({ error: "Player not found" }, 404);
  }

  try {
    const { description } = await createBaseballDescriptions("", player);
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are a baseball expert and sports journalist.",
    //     },
    //     {
    //       role: "user",
    //       content: `Write a brief description (2-3 paragraphs) about a baseball player with the following stats:
    //       Name: ${player.name}
    //       Team: ${player.team}
    //       Position: ${player.position}
    //       Hits Per Season: ${player.hitsPerSeason}
    //       Rank: ${player.rank} (based on hits per season)`,
    //     },
    //   ],
    // });
    db.updatePlayerDescription(id, description);

    return c.json({ description });
  } catch (error) {
    console.error("Error generating description:", error);
    return c.json({ error: "Failed to generate description" }, 500);
  }
});

// Initialize the database with data from API on startup
syncBaseballData();

export default app;
