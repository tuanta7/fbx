import { useState } from "react";

const supportLinks = [
  {
    label: "Browse my other extensions",
    href: import.meta.env.WXT_CHROME_STORE_URL,
    icon: <img src="/chrome-store.svg" className="h-3.5 w-3.5 mr-0.5 bg-gray-700 rounded-full" />,
  },
  {
    label: "Star the project on GitHub",
    href: import.meta.env.WXT_GITHUB_URL,
    icon: <img src="/github.svg" alt="GitHub" className="h-4 w-4 p-px bg-white rounded-full border border-gray-900" />,
  },

  {
    label: "Support me on Ko-fi",
    href: import.meta.env.WXT_KOFI_URL,
    icon: <img src="/kofi-giphy.webp" alt="Kofi" className="h-5 w-5 -mr-1 rounded-full" />,
  },
];

export function Support() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-100 px-3 py-2  dark:border-[#3A3B3C]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer font-normal text-gray-600 hover:text-[#0866FF] dark:text-gray-300"
      >
        Enjoying the extension?
      </button>
      {open && (
        <ul className="mt-2 flex flex-col gap-1.5">
          {supportLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-gray-600 hover:text-[#0866FF] hover:underline dark:text-gray-300"
              >
                {link.icon}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
