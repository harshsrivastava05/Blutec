import type { Metadata } from "next";
import "./globals.css";
import "./home.css";
import "./scenes.css";
import "./home-ending.css";
import "./faq-reference.css";
import { PawTrail } from "@/components/paw-trail";
import { Header, MobileActions, Intro } from "@/components/shell";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
  description: "Meet your new best friend at TeddyPups U.A.E.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Intro />
        <PawTrail />
        <Header />
        {children}
        <Footer />
        <MobileActions />
      </body>
    </html>
  );
}
