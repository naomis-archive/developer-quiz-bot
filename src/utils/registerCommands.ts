import { REST, Routes } from "discord.js";

import { Command } from "../interfaces/Command";
import { ExtendedClient } from "../interfaces/ExtendedClient";

import { errorHandler } from "./errorHandler";

/**
 * Takes both the commands and contexts, parses the `data` properties as needed,
 * and builds an array of all command data. Then, posts the data to the Discord endpoint
 * for registering commands.
 *
 * Will register commands globally if in a production environment, otherwise defaults to the
 * home guild only.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 * @param {Command[]} commands The array of command data.
 * @returns {boolean} True if the commands were registered, false on error.
 */
export const registerCommands = async (
  bot: ExtendedClient,
  commands: Command[]
): Promise<boolean> => {
  try {
    if (!bot.user?.id) {
      await bot.env.webhook.send(
        "Failed to register commands - bot user has not been instantiated."
      );
      return false;
    }
    const rest = new REST({ version: "10" }).setToken(bot.env.token);

    const commandData = commands.map((command) => command.data.toJSON());

    if (process.env.NODE_ENV === "production") {
      await bot.env.webhook.send("registering commands globally!");
      await rest.put(Routes.applicationCommands(bot.user.id), {
        body: commandData,
      });
    } else {
      if (!process.env.HOME_GUILD) {
        await bot.env.webhook.send(
          "Cannot register to home guild. No guild ID found."
        );
        return false;
      }
      await bot.env.webhook.send("registering to home guild only");
      await rest.put(
        Routes.applicationGuildCommands(bot.user.id, process.env.HOME_GUILD),
        { body: commandData }
      );
    }
    return true;
  } catch (err) {
    await errorHandler(bot, "slash command register", err);
    return false;
  }
};
