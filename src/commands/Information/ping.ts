import type CommandStructure from "../../structures/Command";

export const command: CommandStructure = {
  "data": {
    "name": "ping",
    "description": "pong"
  },
  "execute": (client, interaction) => {
    interaction.reply({ "content": `My ping: ${client.ws.ping}`});
  }
}