import { ApplicationCommandDataResolvable, Client, Collection, GatewayIntentBits } from "discord.js";
import type CommandStructure from "../structures/Command";

import { handle } from "../commands/index";
import { handleEvent } from "../events";
import design from "../config/design.json";

import "dotenv/config";

export class MainClient extends Client {
  private static intentParser(intents: string[] | number): number {
    if (typeof intents === "number") return intents;
    return intents.reduce((prev, cur) => prev + (GatewayIntentBits[cur as keyof typeof GatewayIntentBits] || 0), 0);
  }

  public commands = new Collection<string, CommandStructure>();
  public design = design;
  
  constructor(intents: string[] | number) {
    super({ "intents": MainClient.intentParser(intents) });
  }
  public async init() {
    const start = Date.now();
    
    await super.login(process.env.TOKEN);

    const handler = await Promise.all([
      await handle(),
      await handleEvent(this)
    ]);

    const commands = handler[0];
    this.commands = commands;
    await this.application?.commands.set(commands.map(command => command.data as ApplicationCommandDataResolvable));
    
    console.log(`[INFO] -> Bot successfully started per ${Date.now() - start} ms.`);
    return true
  }
}