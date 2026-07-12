import { useEffect, useState } from "react";
import { Switch } from "@/components/Switch";
import {
  hideAdsSetting,
  hideReelsSetting,
  hideStoriesSetting,
} from "@/utils/settings";

const rows = [
  {
    setting: hideStoriesSetting,
    title: "Hide Stories",
    description: "Remove the Stories carousel from your feed",
  },
  {
    setting: hideAdsSetting,
    title: "Hide Ads",
    description: "Remove sponsored posts from your feed",
  },
  {
    setting: hideReelsSetting,
    title: "Hide Reels",
    description: "Remove the Reels carousel from your feed",
  },
];

function App() {
  const [values, setValues] = useState(() => rows.map((r) => r.setting.fallback));

  useEffect(() => {
    const setAt = (i: number) => (value: boolean) =>
      setValues((prev) => prev.map((v, j) => (j === i ? value : v)));
    rows.forEach((row, i) => row.setting.getValue().then(setAt(i)));
    const unwatchers = rows.map((row, i) => row.setting.watch(setAt(i)));
    return () => unwatchers.forEach((unwatch) => unwatch());
  }, []);

  const toggle = (i: number) => (value: boolean) => {
    setValues((prev) => prev.map((v, j) => (j === i ? value : v)));
    rows[i].setting.setValue(value);
  };

  return (
    <div className="w-72 bg-gray-100 dark:bg-[#18191A]">
      <header className="bg-gradient-to-r from-[#0064E0] to-[#0082FB] px-4 py-3">
        <h1 className="text-base font-bold text-white">FBx</h1>
        <p className="text-xs text-blue-100">Simpler Facebook</p>
      </header>

      <main className="p-3">
        <div className="divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-700 dark:bg-[#242526]">
          {rows.map((row, i) => (
            <label
              key={row.title}
              className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {row.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {row.description}
                </p>
              </div>
              <Switch checked={values[i]} onChange={toggle(i)} />
            </label>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;