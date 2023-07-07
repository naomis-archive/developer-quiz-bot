import { APIEmbedField } from "discord.js";

import { Question } from "../interfaces/Question";
import { getRandomValue } from "../utils/getRandomValue";

/**
 * Generates the answers for a quiz question, formatted as
 * Discord embed fields.
 *
 * @param {Question} question The question to generate from.
 * @returns {APIEmbedField[]} Discord embed fields.
 */
export const generateQuizAnswers = (question: Question): APIEmbedField[] => {
  const correct = question.Answer;
  const incorrect = [
    question.Distractor1,
    question.Distractor2,
    question.Distractor3,
  ];
  const map: { [key: string]: string } = {
    a: "",
    b: "",
    c: "",
    d: "",
  };
  const letters = ["a", "b", "c", "d"];
  const correctLetter = getRandomValue(letters);
  map[correctLetter] = correct;
  letters.splice(letters.indexOf(correctLetter), 1);
  for (const letter of letters) {
    const value = getRandomValue(incorrect);
    map[letter] = value;
    incorrect.splice(incorrect.indexOf(value), 1);
  }
  return Object.entries(map).map(([letter, answer]) => ({
    name: `${letter.toUpperCase()}`,
    value: answer,
  }));
};
