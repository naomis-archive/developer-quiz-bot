import { ChatInputCommandInteraction } from "discord.js";

import { GuildInteraction } from "../interfaces/GuildInteraction";

/**
 * Validates that a slash command was run in a guild.
 *
 * @param {ChatInputCommandInteraction} interaction The interaction payload from Discord.
 * @returns {interaction is GuildInteraction} Whether or not the interaction was run in a guild.
 */
export const isGuildInteraction = (
  interaction: ChatInputCommandInteraction
): interaction is GuildInteraction => {
  return (
    !!interaction.guild &&
    !!interaction.member &&
    typeof interaction.member.permissions !== "string"
  );
};
