import { EmbedBuilder } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";

import { logHandler } from "./logHandler";

/**
 * Standard error handling module to pipe errors to Discord and
 * format the error for logging.
 *
 * @param { ExtendedClient } bot The bot's Discord instance.
 * @param {string} context A description of where the error occurred.
 * @param {any} error The error object.
 */
export const errorHandler = async (
  bot: ExtendedClient,
  context: string,
  error: unknown
) => {
  const err = error as Error;
  logHandler.log("error", `There was an error in the ${context}:`);
  logHandler.log(
    "error",
    JSON.stringify({ errorMessage: err.message, errorStack: err.stack })
  );
  const embed = new EmbedBuilder();
  embed.setTitle(`Error in ${context}`);
  embed.setDescription(`Error Stack:\n\`\`\`\n${err.stack}\n\`\`\``);
  embed.addFields([{ name: "Error Message", value: err.message }]);
  await bot.env.webhook.send({
    embeds: [embed],
    username: bot.user?.username ?? "Developer Quiz",
    avatarURL:
      bot.user?.displayAvatarURL() ??
      "https://cdn.nhcarrigan.com/avatars/nhcarrigan.png",
  });
};
