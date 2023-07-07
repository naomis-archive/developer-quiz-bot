import { Scores } from "../interfaces/Scores";

export const CategoryNames: {
  [key in keyof Required<Scores>]: string;
} = {
  accessibility: "Accessibility",
  agile: "Agile",
  cloudComputing: "Cloud Computing",
  css: "CSS",
  devops: "DevOps",
  freeCodeCamp: "freeCodeCamp",
  computerScience: "General Computer Science",
  git: "Git",
  html: "HTML",
  informationTechnology: "Information Technology",
  javascript: "JavaScript",
  linux: "Linux",
  python: "Python",
  qualityAssurance: "Quality Assurance",
  regex: "Regular Expressions",
  security: "Security",
  sql: "SQL",
};
