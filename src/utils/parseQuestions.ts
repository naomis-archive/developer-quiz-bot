// @ts-expect-error No type def, and it doesn't like the module name.
import dJSON from "dirty-json";

import { Question } from "../interfaces/Question";

/**
 * Parses the fetched raw data from the GitHub repo
 * into a JSON serialisable object.
 *
 * @param {string} text The data to parse.
 * @returns {Question[]} The parsed questions.
 */
export const parseQuestions = (text: string): Question[] =>
  dJSON.parse(
    text
      .replace(/const\s+\w*\s*=\s*/, "")
      .replace(/export\s+default\s+\w+;/, "")
      .replace(/];/, "]")
  );
