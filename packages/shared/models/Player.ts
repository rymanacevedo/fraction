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

export const DBPlayerSchema = z.object({
  id: z.number(),
  playerName: z.string(),
  rank: z.number(),
  position: z.string(),
  games: z.number(),
  atBat: z.number(),
  runs: z.number(),
  hits: z.number(),
  doubles: z.number(),
  thirdBaseman: z.number(),
  homeRun: z.number(),
  rbi: z.number(),
  aWalk: z.number(),
  strikeouts: z.number(),
  stolenBases: z.number(),
  caughtStealing: z.union([z.number(), z.string()]),
  avg: z.number(),
  onBasePercentage: z.number(),
  sluggingPercentage: z.number(),
  onBasePlusSlugging: z.number(),
});

export type Player = z.infer<typeof PlayerSchema>;
export type DBPlayer = z.infer<typeof DBPlayerSchema>;
