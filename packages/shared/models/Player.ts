import { z } from "zod";

const PlayerSchema = z.object({
  "Player name": z.string(),
  position: z.string(),
  Games: z.number(),
  "At-bat": z.number(),
  Runs: z.number(),
  Hits: z.number(),
  "Double (2B)": z.number(),
  "third baseman": z.number(),
  "home run": z.number(),
  "run batted in": z.number(),
  "a walk": z.number(),
  Strikeouts: z.number(),
  "stolen base": z.number(),
  "Caught stealing": z.union([z.number(), z.string()]),
  AVG: z.number(),
  "On-base Percentage": z.number(),
  "Slugging Percentage": z.number(),
  "On-base Plus Slugging": z.number(),
});

export type Player = z.infer<typeof PlayerSchema>;
