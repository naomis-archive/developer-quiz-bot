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

    await bot.login(bot.env.token);
  } catch (err) {
    const bot = new Client({ intents: IntentOptions }) as ExtendedClient;
    validateEnv(bot);
    await errorHandler(bot, "index", err);
  }
})();
