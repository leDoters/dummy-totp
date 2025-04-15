import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dummy TOTP",
  description: "Generador de OTP",
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
