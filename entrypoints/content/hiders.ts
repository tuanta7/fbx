import { createCSSHider, createScriptHider } from "@/utils/hider";
import { hideAdsSetting, hideReelsSetting, hideSidebarAdsSetting, hideStoriesSetting } from "@/utils/settings";

// FB obfuscates the "Sponsored"/"Ad" label as scrambled single-letter spans:
// decoy letters sit offscreen via inline position:absolute, the real ones are
// reordered visually with CSS `order`. data-ad-* attributes show up on normal
// posts too, so this label is the only reliable proof of an ad. Comparing the
// visible letters order-insensitively skips getComputedStyle entirely.
const sortLetters = (text: string) => [...text.replace(/\s/g, "")].sort().join("");
const AD_LABELS = new Set(["Ad", "Sponsored", "Được tài trợ", "Publicidad", "Anuncio"].map(sortLetters));

function isSponsored(post: HTMLElement) {
  for (const label of post.querySelectorAll<HTMLElement>('a span[style*="flex"]')) {
    const visibleText = [...label.children]
      .filter((s): s is HTMLElement => s instanceof HTMLElement && s.style.position !== "absolute")
      .map((s) => s.textContent)
      .join("");
    if (AD_LABELS.has(sortLetters(visibleText))) return true;
  }
  return false;
}

const adsHider = createScriptHider(
  "div[aria-posinset]",
  isSponsored,
  (post) => post.closest<HTMLElement>("div.x1lliihq") ?? post,
);

const storiesHider = createCSSHider('div[aria-label="Stories"]');
const reelsHider = createCSSHider('div.x1lliihq:has(div[aria-posinset] div[aria-label="Reels"][role="region"])');
const sidebarAdsHider = createCSSHider(
  'div[role="complementary"] div:has(> div > div[data-visualcompletion="ignore-late-mutation"])',
);

export const hiders = [
  { setting: hideStoriesSetting, hider: storiesHider },
  { setting: hideAdsSetting, hider: adsHider },
  { setting: hideReelsSetting, hider: reelsHider },
  { setting: hideSidebarAdsSetting, hider: sidebarAdsHider },
];
