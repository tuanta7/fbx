import { storage } from "wxt/utils/storage";

export const hideStoriesSetting = storage.defineItem<boolean>("local:hideStories", { fallback: true });
export const hideAdsSetting = storage.defineItem<boolean>("local:hideAds", { fallback: true });
export const hideReelsSetting = storage.defineItem<boolean>("local:hideReels", { fallback: true });
export const hideSidebarAdsSetting = storage.defineItem<boolean>("local:hideSidebarAds", { fallback: true });
