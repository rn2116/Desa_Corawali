// app/layout.tsx
import "./globals.css";
import { DM_Serif_Text } from "next/font/google";

const dmSerif = DM_Serif_Text({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Sistem Informasi Desa Corawali",
  description: "Website resmi Desa Corawali",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${dmSerif.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
