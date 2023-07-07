import { PrismaClient } from "@prisma/client";
import { Client, WebhookClient } from "discord.js";

import { Command } from "./Command";
import { Question } from "./Question";
import { Scores } from "./Scores";

export interface ExtendedClient extends Client {
  env: {
    token: string;
    webhook: WebhookClient;
    dbUrl: string;
  };
  questions: {
    [key in keyof Required<Scores>]: Question[];
  };
  commands: Command[];
  db: PrismaClient;
}
