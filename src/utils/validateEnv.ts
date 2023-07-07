import { WebhookClient } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";

/**
 * Validates that the environment variables are present. If so,
 * attaches them to the bot instance.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 */
export const validateEnv = (bot: ExtendedClient) => {
  if (!process.env.BOT_TOKEN || !process.env.WH_URL || !process.env.MONGO_URL) {
    throw new Error("Missing environment variables~!");
  }
  bot.env = {
    token: process.env.BOT_TOKEN,
    webhook: new WebhookClient({ url: process.env.WH_URL }),
    dbUrl: process.env.MONGO_URL,
  };
};
