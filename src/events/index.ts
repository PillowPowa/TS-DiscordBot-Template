import type { ClientEvents } from "discord.js";
import type Event from "../structures/Event";
import type { MainClient } from "../utils/MainClient";
import { walk } from "../utils/Utils";

export const handleEvent = async (client: MainClient) => {
  const pathes = await walk(__dirname);

  for (const eventPath of pathes) {
    if (!eventPath.endsWith("index.ts")) {
      const category = eventPath.split("/").at(-2);
      switch (category) {
        case "Discord": {
          const event: Event<keyof ClientEvents> = (await import(eventPath))?.default;
          const fileName = eventPath.split("/").at(-1);
          if (!event) throw Error(`[HANDLER] -> Event with filename ${fileName} hasn't default export`);
    
          event.once ?
            client.once(event.name, (...args) => event.execute(client, ...args)) :
            client.on(event.name, (...args) => event.execute(client, ...args));
    
          console.log(`[HANDLER] -> ${category} Event ${event.name}/${fileName} successfully reserved`);
        }
          break;
        default: console.warn(`[HANDLER] -> Cannot find eventer for category: ${category}`);
      }
    }
  }
  return true;
}