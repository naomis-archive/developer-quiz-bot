import { Prisma } from "@prisma/client";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

import { CategoryNames } from "../config/CategoryNames";
import { Command } from "../interfaces/Command";
import { generateQuizAnswers } from "../modules/generateQuizAnswers";
import { errorHandler } from "../utils/errorHandler";
import { getRandomValue } from "../utils/getRandomValue";

export const quiz: Command = {
  data: new SlashCommandBuilder()
    .setName("quiz")
    .setDescription("Generate a quiz question~!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category to generate a question from.")
        .setRequired(true)
        .addChoices(
          ...Object.entries(CategoryNames).map(([value, name]) => ({
            name,
            value,
          }))
        )
    )
    .setDMPermission(false),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();

      const category = interaction.options.getString(
        "category",
        true
      ) as keyof Prisma.ScoreSelectScalar;
      const question = getRandomValue(bot.questions[category]);
      const answers = generateQuizAnswers(question);
      const embed = new EmbedBuilder();
      embed.setTitle(question.Question);
      embed.addFields(answers);

      const aButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🇦")
        .setCustomId("A");
      const bButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🇧")
        .setCustomId("B");
      const cButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🇨")
        .setCustomId("C");
      const dButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🇩")
        .setCustomId("D");

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        aButton,
        bButton,
        cButton,
        dButton
      );

      const post = await interaction.editReply({
        embeds: [embed],
        components: [row],
      });

      const collector = post.createMessageComponentCollector({
        time: 30000,
      });

      collector.on("collect", async (i) => {
        if (i.user.id !== interaction.user.id) {
          await interaction.reply({
            content:
              "You can't answer this question! But you can run the /quiz command to get your own!",
            ephemeral: true,
          });
          return;
        }
        const embed = new EmbedBuilder();
        embed.setDescription(question.Explanation);
        embed.addFields({
          name: "Learn More!",
          value: question.Link,
        });
        const response = i.customId;
        const responseValue = answers.find((m) => m.name === response)?.value;
        if (responseValue === question.Answer) {
          embed.setTitle("Correct!");
          embed.setColor(0x00ff00);
        } else {
          embed.setTitle("Not quite...");
          embed.setColor(0xff0000);
        }
        await i.update({
          embeds: [embed],
          components: [],
        });
      });

      collector.on("end", async () => {
        await post.edit({
          components: [],
        });
      });
    } catch (err) {
      await errorHandler(bot, "quiz commnad", err);
    }
  },
};
