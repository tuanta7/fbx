import { hiders } from "./hider";

export default defineContentScript({
  matches: ["*://*.facebook.com/*"],
  async main() {
    await Promise.all(
      hiders.map(async ({ setting, hider }) => {
        hider.setEnabled(await setting.getValue());
        setting.watch((value) => hider.setEnabled(value));
      }),
    );
  },
});
