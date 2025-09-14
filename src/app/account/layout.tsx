import type { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-kambaz" style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 200, borderRight: "1px solid #ccc", padding: 16 }}>
        <AccountNavigation />
      </aside>
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}