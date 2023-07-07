import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import { CategoryNames } from "../config/CategoryNames";
import { Command } from "../interfaces/Command";
import { Scores } from "../interfaces/Scores";
import { errorHandler } from "../utils/errorHandler";

export const score: Command = {
  data: new SlashCommandBuilder()
    .setName("score")
    .setDescription("Get your current quiz scores."),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();
      const record = await bot.db.users.findUnique({
        where: {
          serverId_userId: {
            serverId: interaction.guild.id,
            userId: interaction.user.id,
          },
        },
      });
      if (!record) {
        await interaction.editReply({
          content:
            "You haven't answered any questions correctly yet. Try `/quiz` to play!",
        });
        return;
      }
      const keys = Object.keys(CategoryNames) as (keyof Scores)[];
      const embed = new EmbedBuilder();
      embed.setTitle(`${interaction.user.username}'s Scores`);
      embed.setDescription(
        `Congratulations~! You have answered ${record.total} questions correctly! 🎉🎉🎉`
      );
      embed.addFields(
        keys.map((key) => ({
          name: CategoryNames[key],
          value: `${record[key]} correct`,
          inline: true,
        }))
      );
      await interaction.editReply({
        embeds: [embed],
      });
    } catch (err) {
      await errorHandler(bot, "score command", err);
    }
  },
};
