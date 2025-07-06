"use client";

import { useEffect } from "react";

export default function Home() {
  const applyTheme = (theme: string) => {
    const html = document.documentElement;
    html.removeAttribute("data-theme");

    if (theme !== "light") {
      html.setAttribute("data-theme", theme);
    }

    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme || "light");
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:w-auto p-4 border rounded-[30px] bg-secondary w-full h-full">
      <button
        onClick={() => applyTheme("light")}
        className="p-2 border rounded-md hover:opacity-75"
      >
        ☀️ Light
      </button>
      <button
        onClick={() => applyTheme("desert")}
        className="p-2 border rounded-md hover:opacity-75"
      >
        🏜️ Desert
      </button>
      <button
        onClick={() => applyTheme("sakura")}
        className="p-2 border rounded-md hover:opacity-75"
      >
        🌸 Sakura
      </button>
      <button
        onClick={() => applyTheme("mint")}
        className="p-2 border rounded-md hover:opacity-75"
      >
        🌿 Mint
      </button>
    </div>
  );
}
