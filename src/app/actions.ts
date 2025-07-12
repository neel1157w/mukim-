"use server";

import { suggestTags } from "@/ai/flows/suggest-tags";
import type { SuggestTagsInput } from "@/ai/flows/suggest-tags";

export async function suggestItemTags(
  input: SuggestTagsInput
): Promise<{ tags?: string[]; error?: string }> {
  try {
    if (!input.photoDataUri) {
      return { error: "Image data is missing." };
    }
    if (!input.description) {
      return { error: "Description is missing." };
    }

    const result = await suggestTags({
      photoDataUri: input.photoDataUri,
      description: input.description,
    });

    return { tags: result.tags };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to suggest tags: ${errorMessage}` };
  }
}
