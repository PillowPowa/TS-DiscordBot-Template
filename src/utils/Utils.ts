import { stat, readdir } from "fs/promises"

export async function walk(path: string): Promise<string[]> {
  if (path.endsWith("/")) throw Error("Path must ends without '/', for example: './src/commands'");
  if ((await stat(path)).isDirectory()) {
    return (
      await Promise.all((await readdir(path)).map(dir => {
        return walk(path + "/" + dir)
      }))
    ).flat();
  }
  return [ path ];
}