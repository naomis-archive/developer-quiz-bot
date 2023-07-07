import { Prisma } from "@prisma/client";
import { Client, WebhookClient } from "discord.js";

import { Command } from "./Command";
import { Question } from "./Question";

export interface ExtendedClient extends Client {
  env: {
    token: string;
    webhook: WebhookClient;
  };
  questions: {
    [key in keyof Required<Prisma.ScoreSelectScalar>]: Question[];
  };
  commands: Command[];
}
