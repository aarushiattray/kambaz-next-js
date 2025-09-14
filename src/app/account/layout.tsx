import type { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-kambaz">
      <table role="presentation">
        <tbody>
          <tr>
            <td>
              <aside aria-label="Account navigation">
                <AccountNavigation />
              </aside>
            </td>
            <td>
              <main>{children}</main>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
