import { hideAdsSetting, hideReelsSetting, hideSidebarAdsSetting, hideStoriesSetting } from "@/utils/settings";
import { createAdsHider } from "./adsHider";

export function createCSSHider(selector: string) {
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

export function createScriptHider() {}

export const hiders = [
  {
    setting: hideStoriesSetting,
    hider: createCSSHider('div[aria-label="Stories"]'),
  },
  {
    setting: hideAdsSetting,
    hider: createAdsHider(),
  },
  {
    setting: hideReelsSetting,
    hider: createCSSHider('div.x1lliihq:has(div[aria-posinset] div[aria-label="Reels"][role="region"])'),
  },
  {
    setting: hideSidebarAdsSetting,
    hider: createCSSHider(
      'div[role="complementary"] div:has(> div > div[data-visualcompletion="ignore-late-mutation"])',
    ),
  },
];
