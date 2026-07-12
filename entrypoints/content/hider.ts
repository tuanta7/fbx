import { hideAdsSetting, hideReelsSetting, hideStoriesSetting } from "@/utils/settings";

function createCSSHider(selector: string) {
  const style = document.createElement("style");
  style.textContent = `${selector} { display: none !important; }`;
  return {
    setEnabled(value: boolean) {
      if (value) {
        document.documentElement.append(style);
      } else {
        style.remove();
      }
    },
  };
}

export const hiders = [
  {
    setting: hideStoriesSetting,
    hider: createCSSHider('div[aria-label="Stories"]'),
  },
  {
    setting: hideAdsSetting,
    hider: createCSSHider("div.x1lliihq:has(div[aria-posinset] :is([data-ad-preview], [data-ad-comet-preview]))"),
  },
  {
    setting: hideReelsSetting,
    hider: createCSSHider('div.x1lliihq:has(div[aria-posinset] div[aria-label="Reels"][role="region"])'),
  },
];
