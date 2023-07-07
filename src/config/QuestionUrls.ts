import { Scores } from "../interfaces/Scores";

export const QuestionUrls: {
  [key in keyof Required<Scores>]: string;
} = {
  accessibility:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/accessibility-quiz.ts",
  agile:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/agile-quiz.ts",
  cloudComputing:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/cloud-computing-quiz.ts",
  css: "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/css-quiz.ts",
  devops:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/devops-quiz.ts",
  freeCodeCamp:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/freecodecamp-quiz.ts",
  computerScience:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/general-cs-quiz.ts",
  git: "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/git-quiz.ts",
  html: "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/html-quiz.ts",
  informationTechnology:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/information-technology-quiz.ts",
  javascript:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/javascript-quiz.ts",
  linux:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/linux-quiz.ts",
  python:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/python-quiz.ts",
  qualityAssurance:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/quality-assurance-quiz.ts",
  regex:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/regex-quiz.ts",
  security:
    "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/security-quiz.ts",
  sql: "https://github.com/freeCodeCamp/Developer_Quiz_Site/raw/main/src/data/sql-quiz.ts",
};
