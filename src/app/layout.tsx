import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yunation",
  description: "An art community for Yunation fans",
  icons: {
    icon: "https://cdn.glitch.global/55de0177-2d52-43bf-a066-45796ec8e7c9/BocchiYuna.webp?v=1713409649865",
  },
  openGraph: {
    title: "Yunation",
    description: "An art community for Yunation fans",
    url: "https://yunation.vercel.app", // ganti dengan URL kamu
    siteName: "Yunation",
    images: [
      {
        url: "https://cdn.glitch.global/55de0177-2d52-43bf-a066-45796ec8e7c9/BocchiYuna.webp?v=1713409649865",
        alt: "Bocchi Yuna Icon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yunation",
    description: "An art community for Yunation fans",
    images: ["https://cdn.glitch.global/55de0177-2d52-43bf-a066-45796ec8e7c9/BocchiYuna.webp?v=1713409649865"],
  },
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
