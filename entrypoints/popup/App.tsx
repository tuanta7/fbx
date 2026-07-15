import { useEffect, useState } from "react";
import { Switch } from "@/components/Switch";
import { Support } from "@/components/Support";
import { hideAdsSetting, hideReelsSetting, hideSidebarAdsSetting, hideStoriesSetting } from "@/utils/settings";

const rows = [
  {
    setting: hideStoriesSetting,
    title: "Hide Stories",
    description: "Remove the Stories carousel",
  },
  {
    setting: hideAdsSetting,
    title: "Hide Ads",
    description: "Remove sponsored posts",
  },
  {
    setting: hideReelsSetting,
    title: "Hide Reels",
    description: "Remove the Reels carousel",
  },
  {
    setting: hideSidebarAdsSetting,
    title: "Hide Sidebar Ads",
    description: "Remove sponsored links in the right column",
  },
];

function App() {
  const [values, setValues] = useState(() => rows.map((r) => r.setting.fallback));

  useEffect(() => {
    const setAt = (i: number) => (value: boolean) => setValues((prev) => prev.map((v, j) => (j === i ? value : v)));
    rows.forEach((row, i) => row.setting.getValue().then(setAt(i)));
    const unwatchers = rows.map((row, i) => row.setting.watch(setAt(i)));
    return () => unwatchers.forEach((unwatch) => unwatch());
  }, []);

  const toggle = (i: number) => (value: boolean) => {
    setValues((prev) => prev.map((v, j) => (j === i ? value : v)));
    rows[i].setting.setValue(value);
  };

  return (
    <div className="w-full bg-white dark:bg-[#18191A]">
      <header className="flex items-center gap-3 px-3 py-2">
        <img src="/icon/128.png" alt="logo" className="w-7 h-auto py-1" />
        <div>
          <span className="text-xs font-bold ">FBx</span>
          <p className="text-xs ">Hide ads, reels and more</p>
        </div>
      </header>

      <main className="py-1">
        {rows.map((row, i) => (
          <label
            key={row.title}
            className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-[#242526]"
          >
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{row.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{row.description}</p>
            </div>
            <Switch checked={values[i]} onChange={toggle(i)} />
          </label>
        ))}
      </main>

      <div className="flex items-center justify-between p-3 text-xs text-gray-400 dark:text-gray-500">
        <p>
          Something not working?{" "}
          <a href={`mailto:${import.meta.env.WXT_CONTACT_EMAIL}`} className="text-[#0866FF] hover:underline">
            Email me
          </a>
        </p>
        <span>v{import.meta.env.WXT_APP_VERSION}</span>
      </div>
      <Support />
    </div>
  );
}

export default App;
