import { Collection } from "discord.js";
import type CommandStructure from "../structures/Command";
import { walk } from "../utils/Utils";
const commands = new Collection<string, CommandStructure>();

export const handle = async () => {
  const pathes = await walk(__dirname);

  for (const commandPath of pathes) {
    if (!commandPath.endsWith("index.ts")) {
      const command = (await import(commandPath)).command as CommandStructure;
      const category = commandPath.split("/").at(-2);
      command.category = category;
      commands.set(command.data.name, command);
      console.log("[HANDLER] -> Command", command.data.name, "successfully reserved");
    }
  }
  return commands;
}