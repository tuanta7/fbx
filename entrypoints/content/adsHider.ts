// FB obfuscates the "Sponsored"/"Ad" label as scrambled single-letter spans:
// decoy letters sit offscreen via inline position:absolute, the real ones are
// reordered visually with CSS `order`. data-ad-* attributes show up on normal
// posts too, so this label is the only reliable proof of an ad. Comparing the
// visible letters order-insensitively skips getComputedStyle entirely.
const sortLetters = (text: string) => [...text.replace(/\s/g, "")].sort().join("");
const AD_LABELS = new Set(["Ad", "Sponsored"].map(sortLetters));

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

export function createAdsHider() {
  let enabled = false;
  const ads = new Set<HTMLElement>();

  const apply = () => {
    const target = enabled ? "none" : "";
    for (const el of ads) {
      if (el.style.display !== target) {
        el.style.display = target;
      }
    }
  };

  // each post is scanned once; detected ads are remembered so toggling
  // on/off never rescans the document
  const scan = () => {
    for (const post of document.querySelectorAll<HTMLElement>(
      "div[aria-posinset]:not([data-fbx-scanned])",
    )) {
      post.setAttribute("data-fbx-scanned", "");
      if (isSponsored(post)) {
        ads.add(post.closest<HTMLElement>("div.x1lliihq") ?? post);
      }
    }
    apply();
  };

  // coalesce FB's constant mutation bursts into one scan per frame
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      scan();
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  scan();

  return {
    setEnabled(value: boolean) {
      enabled = value;
      apply();
    },
  };
}
