import { hideAdsSetting, hideReelsSetting, hideStoriesSetting } from "@/utils/settings";

function createHider(collect: () => Iterable<HTMLElement>) {
  let enabled = false;

  const apply = () => {
    const target = enabled ? "none" : "";
    for (const el of collect()) {
      if (el.style.display !== target) {
        el.style.display = target;
      }
    }
  };

  const observer = new MutationObserver(() => {
    if (enabled) apply();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return {
    setEnabled(value: boolean) {
      enabled = value;
      apply();
    },
  };
}

// every post, ad or reels carousel is wrapped in a div.x1lliihq
const feedPostElement = (el: HTMLElement) => el.closest<HTMLElement>("div.x1lliihq") ?? el;

export const hiders = [
  {
    setting: hideStoriesSetting,
    hider: createHider(() => document.querySelectorAll<HTMLElement>('div[aria-label="Stories"]')),
  },
  {
    setting: hideAdsSetting,
    hider: createHider(() =>
      [...document.querySelectorAll<HTMLElement>("div[aria-posinset]")]
        .filter((el) => el.querySelector("[data-ad-preview], [data-ad-comet-preview]"))
        .map(feedPostElement),
    ),
  },
  {
    setting: hideReelsSetting,
    hider: createHider(() =>
      [...document.querySelectorAll<HTMLElement>('div[aria-label="Reels"][role="region"]')].map(feedPostElement),
    ),
  },
];
