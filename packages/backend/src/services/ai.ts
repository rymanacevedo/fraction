import { generateObject } from "ai"
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from "zod";
import { Player } from "..";
const google = createGoogleGenerativeAI();
const model = google('gemini-2.0-flash-exp', {
    // safetySettings: [
    //     { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_LOW_AND_ABOVE' },
    //   ],
});

const DescriptionSchema = z.object({
    description: z.string().describe('A 2-3 paragraph description of a baseball player.')
})
export const createBaseballDescriptions = async(prompt: string, player: Player) => {
    const result = await generateObject({
        model: model,
        prompt,
        schema: DescriptionSchema,
        schemaName: 'Descriptions',
        system: `
        You are a baseball expert and sports journalist.
        Write a brief description (2-3 paragraphs) about a baseball player with the following stats:
        Name: ${player["Player name"]}
        Position: ${player.position}
        Hits Per Season: ${player.Hits}
        `
    })

    return result.object;
}