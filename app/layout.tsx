import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import "./globals.css";


export const metadata: Metadata = {
  title: "Cashfolio",
  description: "Your personal finance Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
