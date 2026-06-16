// Light-theme funnel layout — replaces the old dark lp.css-based chrome.
// The main /lp/a page is fully self-contained (sticky header, etc.) so this
// layout is intentionally minimal. Tail funnel pages (oto1, down1, thanks)
// still share this layout; they manage their own chrome.
import "../../lp/ds.css";
import PixelScripts from "./PixelScripts";

export default function LpALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PixelScripts />
      {children}
    </>
  );
}
