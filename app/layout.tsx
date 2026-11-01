import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Парикмахерская на Пономарёва, 7 — Минск",
  description: "Демонстрационный концепт сайта парикмахерской на ул. Пономарёва, 7 в Минске.",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
