import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yunation",
  description: "An art community for Yunation fans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat&family=Shadows+Into+Light&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
