import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-kambaz" style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: "200px", borderRight: "1px solid #ccc" }}>
        <AccountNavigation />
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

