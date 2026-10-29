import { Bricolage_Grotesque } from "next/font/google";

// Display face for the homepage. Applied by the page that uses it, so other routes do not
// preload it.
export const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});
