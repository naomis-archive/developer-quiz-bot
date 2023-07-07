import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

import { CategoryNames } from "../config/CategoryNames";
import { Command } from "../interfaces/Command";
import { Scores } from "../interfaces/Scores";
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
      ) as keyof Scores;
      const question = getRandomValue(bot.questions[category]);
      const answers = generateQuizAnswers(question);
      const embed = new EmbedBuilder();
      embed.setTitle(question.Question);
      embed.addFields(answers);
      embed.setFooter({
        text: "https://developerquiz.org",
      });

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
        let correct = false;
        const embed = new EmbedBuilder();
        embed.setDescription(question.Explanation);
        embed.addFields({
          name: "Learn More!",
          value: question.Link,
        });
        embed.setFooter({
          text: "https://developerquiz.org",
        });
        const response = i.customId;
        const responseValue = answers.find((m) => m.name === response)?.value;
        if (responseValue === question.Answer) {
          embed.setTitle("Correct!");
          embed.setColor(0x00ff00);
          correct = true;
        } else {
          embed.setTitle("Not quite...");
          embed.setColor(0xff0000);
        }
        await i.update({
          embeds: [embed],
          components: [],
        });
        if (correct) {
          await bot.db.users.upsert({
            where: {
              serverId_userId: {
                serverId: interaction.guild.id,
                userId: interaction.user.id,
              },
            },
            update: {
              [category]: {
                increment: 1,
              },
              total: {
                increment: 1,
              },
            },
            create: {
              serverId: interaction.guild.id,
              userId: interaction.user.id,
              username: interaction.user.username,
              [category]: 1,
              total: 1,
            },
          });
        }
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
