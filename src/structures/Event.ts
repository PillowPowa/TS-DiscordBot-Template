import type { ClientEvents } from "discord.js";
import type { MainClient } from "../utils/MainClient";

export default class Event<Key extends keyof ClientEvents> {
  constructor(
    public name: Key,
    public execute: (client: MainClient, ...args: ClientEvents[Key]) => void,
    public once: boolean = false
  ) {}
}