import { SlashCommandBuilder } from "discord.js";

import { ExtendedClient } from "./ExtendedClient";
import { GuildInteraction } from "./GuildInteraction";

export interface Command {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  run: (bot: ExtendedClient, interaction: GuildInteraction) => Promise<void>;
}
