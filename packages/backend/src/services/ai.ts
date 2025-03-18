import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { DBPlayer } from "../../../shared/models/Player";
const google = createGoogleGenerativeAI();
const model = google("gemini-2.0-flash-exp", {
  // safetySettings: [
  //   { category: "HARM_CATEGORY_UNSPECIFIED", threshold: "BLOCK_LOW_AND_ABOVE" },
  // ],
});

const PlayerDescriptionSchema = z.object({
  description: z
    .string()
    .describe("A 2-3 paragraph description of a baseball player."),
  name: z.string().describe("The name of the baseball player."),
  position: z.string().describe("The position of the baseball player."),
  hits: z.number().describe("The number of hits the baseball player has."),
});
export const createBaseballDescriptions = async (prompt: string) => {
  const result = await generateObject({
    model: model,
    prompt,
    schema: PlayerDescriptionSchema,
    schemaName: "PlayerDescriptions",
    system: `
        You are a baseball expert and sports journalist.
        Write a brief description (2-3 paragraphs) about the baseball player and their stats.
        `,
  });

  return result.object;
};
