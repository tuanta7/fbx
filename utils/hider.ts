export interface Hider {
  setEnabled(value: boolean): void;
}

export function createCSSHider(selector: string): Hider {
  const style = document.createElement("style");
  style.textContent = `${selector} { display: none !important; }`;
  return {
    setEnabled(value) {
      if (value) {
        document.documentElement.append(style);
      } else {
        style.remove();
      }
    },
  };
}

// For targets CSS alone can't match: scans elements matching `selector`,
// tests them with `isTarget`, and toggles display on `resolveTarget(el)`.
export function createScriptHider(
  selector: string,
  isTarget: (el: HTMLElement) => boolean,
  resolveTarget: (el: HTMLElement) => HTMLElement = (el) => el,
): Hider {
  let enabled = false;
  const targets = new Set<HTMLElement>();

  const apply = () => {
    const display = enabled ? "none" : "";
    for (const el of targets) {
      if (el.style.display !== display) {
        el.style.display = display;
      }
    }
  };

  // each element is scanned once; detected targets are remembered so
  // toggling on/off never rescans the document
  const scan = () => {
    for (const el of document.querySelectorAll<HTMLElement>(`${selector}:not([data-fbx-scanned])`)) {
      el.setAttribute("data-fbx-scanned", "");
      if (isTarget(el)) {
        targets.add(resolveTarget(el));
      }
    }
    apply();
  };

  // coalesce constant mutation bursts into one scan per frame
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
    setEnabled(value) {
      enabled = value;
      apply();
    },
  };
}
