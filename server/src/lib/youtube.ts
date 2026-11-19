import {
  YoutubeTranscript,
  YoutubeTranscriptDisabledError,
} from "youtube-transcript";
import { ValidationError } from "../types/errors.js";

// TODO: Enhance this function to support multiple languages and handle cases where the transcript is not
//      available in the default language.

// ponytail: hard cap at ~1hr of video; upgrade path = chunked summarisation for longer content
const MAX_TRANSCRIPT_CHARS = 60_000;

export async function fetchYoutubeTranscript(url: string) {
  const videoId =
    url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
    )?.[1] ?? url.match(/youtube\.com\/shorts\/([\w-]{11})/)?.[1];

  if (!videoId) {
    throw new ValidationError("Enter a valid YouTube URL");
  }

  try {
    const segments = await YoutubeTranscript.fetchTranscript(videoId);
    const full = segments
      .map((segment) => segment.text)
      .join(" ")
      .trim();

    if (!full) {
      throw new ValidationError("No transcript found for this video");
    }

    if (full.length > MAX_TRANSCRIPT_CHARS) {
      console.warn(
        `YouTube transcript for ${videoId} truncated from ${full.length} to ${MAX_TRANSCRIPT_CHARS} chars`,
      );
    }

    return { videoId, content: full.slice(0, MAX_TRANSCRIPT_CHARS) };
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }

    // Log the real reason (IP block, captcha, disabled captions) for debugging.
    // todo Transcript API service (Supadata, etc.)
    console.error(`YouTube transcript fetch failed for ${videoId}:`, error);

    if (error instanceof YoutubeTranscriptDisabledError) {
      throw new ValidationError(
        "Transcript is disabled from youtube for this video",
      );
    }

    throw new ValidationError(
      "Could not fetch transcript. The video may not have captions.",
    );
  }
}
