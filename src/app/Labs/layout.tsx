import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <TOC />
      <div>{children}</div>
    </div>
  );
}