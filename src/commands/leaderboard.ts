import { SlashCommandBuilder } from "discord.js";

import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

const medals: { [key: number]: string } = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export const leaderboard: Command = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show the top ten quiz-takers in your server!"),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();
      const records = await bot.db.users.findMany({
        where: {
          serverId: interaction.guild.id,
        },
      });
      const sorted = records.sort((a, b) => b.total - a.total);
      const topTen = sorted.slice(0, 10);
      const leaderboard = topTen.map(
        (record, index) =>
          `${index + 1}. <@${record.userId}>: ${record.total} points! ${
            medals[index + 1] ?? "🎉"
          }`
      );
      leaderboard.unshift("# 🏆 Leaderboard 🏆");
      const userIndex = sorted.findIndex(
        (record) => record.userId === interaction.user.id
      );
      userIndex !== -1
        ? leaderboard.push(
            `You are #${userIndex + 1} on the leaderboard with ${
              sorted[userIndex].total
            } points!!`
          )
        : leaderboard.push(
            `You don't seem to have any points yet. Try playing \`quiz\` to get some!`
          );
      await interaction.editReply({
        content: leaderboard.join("\n"),
      });
    } catch (err) {
      await errorHandler(bot, "leaderboard command", err);
    }
  },
};
