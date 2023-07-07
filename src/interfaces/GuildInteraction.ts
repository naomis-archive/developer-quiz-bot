import { ChatInputCommandInteraction, Guild, GuildMember } from "discord.js";

export interface GuildInteraction extends ChatInputCommandInteraction {
  guild: Guild;
  member: GuildMember;
}
