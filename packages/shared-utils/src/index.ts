import type { TranslationRequest } from "@oh-my-ai-translator/shared-types";

export function createTranslationRequest(
  text: string,
  sourceLang: string,
  targetLang: string,
): TranslationRequest {
  return { text, sourceLang, targetLang };
}
