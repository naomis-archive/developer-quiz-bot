import { QuestionUrls } from "../config/QuestionUrls";
import { ExtendedClient } from "../interfaces/ExtendedClient";
import { Scores } from "../interfaces/Scores";

import { logHandler } from "./logHandler";
import { parseQuestions } from "./parseQuestions";

/**
 * Fetches the questions from GitHub and mounts them to the bot's
 * instance.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 */
export const loadQuestions = async (bot: ExtendedClient) => {
  logHandler.log("info", "Loading questions.");
  // @ts-expect-error - We're going to be assigning to this property.
  bot.questions = {};
  const urls = Object.entries(QuestionUrls) as [
    keyof Required<Scores>,
    string
  ][];
  for (const [key, url] of urls) {
    const raw = await fetch(url);
    const data = await raw.text();
    const questions = parseQuestions(data);
    bot.questions[key] = questions;
    logHandler.log(
      "info",
      `Loaded ${bot.questions[key].length} questions for ${key}`
    );
  }
};
