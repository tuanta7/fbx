import { hiders } from "./hider";

export default defineContentScript({
  matches: ["*://*.facebook.com/*"],
  runAt: "document_start",
  async main() {
    for (const { setting, hider } of hiders) {
      hider.setEnabled(setting.fallback);
    }
    await Promise.all(
      hiders.map(async ({ setting, hider }) => {
        hider.setEnabled(await setting.getValue());
        setting.watch((value) => hider.setEnabled(value));
      }),
    );
  },
});
