import type { ApplicationCommandOptionData, ChatInputCommandInteraction } from 'discord.js';
import type { MainClient } from '../utils/MainClient';

export default interface CommandStructure {
  data: CommandOptions,
  execute: (client: MainClient, interaction: ChatInputCommandInteraction<"cached">) => void,
  category?: string
}

interface CommandOptions {
  name: string;
  description: string;
  type?: string | number;
  options?: ApplicationCommandOptionData[];
  cooldown?: number;
};