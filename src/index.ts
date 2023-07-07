import { PrismaClient } from "@prisma/client";
import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { ExtendedClient } from "./interfaces/ExtendedClient";
import { errorHandler } from "./utils/errorHandler";
import { loadCommands } from "./utils/loadCommands";
import { loadQuestions } from "./utils/loadQuestions";
import { registerCommands } from "./utils/registerCommands";
import { isGuildInteraction } from "./utils/typeGuards";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  try {
    const bot = new Client({ intents: IntentOptions }) as ExtendedClient;
    validateEnv(bot);
    bot.db = new PrismaClient();
    await bot.db.$connect();
    await loadQuestions(bot);

    bot.on("ready", async () => {
      await loadCommands(bot);
      await registerCommands(bot, bot.commands);
    });

    bot.on("interactionCreate", async (interaction) => {
      if (interaction.isChatInputCommand()) {
        if (!isGuildInteraction(interaction)) {
          return;
        }
        const command = bot.commands.find(
          (cmd) => cmd.data.name === interaction.commandName
        );
        if (!command) {
          return;
        }
        await command.run(bot, interaction);
      }
    });

    bot.on("guildCreate", async (guild) => {
      await bot.env.webhook.send({
        content: `Joined guild: ${guild.name} (${guild.id}) - now at ${bot.guilds.cache.size} guilds.`,
      });
    });

    bot.on("guildDelete", async (guild) => {
      await bot.env.webhook.send({
        content: `Left guild: ${guild.name} (${guild.id}) - now at ${bot.guilds.cache.size} guilds.`,
      });
    });

    await bot.login(bot.env.token);
  } catch (err) {
    const bot = new Client({ intents: IntentOptions }) as ExtendedClient;
    validateEnv(bot);
    await errorHandler(bot, "index", err);
  }
})();
