import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string }; 
}) {
  const { cid } = params; 

  return (
    <div id="wd-kambaz">
      <table>
        <tbody>
          <tr>
            <td valign="top" width={200}>
              <AccountNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
