import { MainClient } from "./utils/MainClient";
import config from "./config/general.json";
export const client = new MainClient(config.intents);
(async() => await client.init())();