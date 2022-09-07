import { client } from "../..";
import type CommandStructure from "../../structures/Command";

export const command: CommandStructure = {
  "data": {
    "name": "avatar",
    "description": "User Avatar",
    "options": [{
      "name": 'member',
      "description": "View another member's avatar",
      "type": 6,
      "required": false,
    }],
  },
  "execute": (_, interaction) => {
    const member = interaction.options.getMember("member");
    const target = member || interaction.member
    interaction.reply({
      "embeds": [
        {
          "title": `${target.displayName}'s Avatar`,
          "image": { "url": target.displayAvatarURL({ "size": 2048 }) },
          "color": client.design.mainColor
        }
      ]
    });
  }
}