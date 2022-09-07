import Event from "../../structures/Event";

export default new Event("interactionCreate", async (client, interaction) => {
  if (!interaction.inCachedGuild()) return;

  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      command.execute(client, interaction);
    } catch (e) {
      console.error(e)
    }
  }
});