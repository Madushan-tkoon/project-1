import "./globals.css";
import {Merriweather_Sans, Jockey_One, Marck_Script} from "next/font/google";
import { CartProvider } from "../context/CartContext";

const staatliches = Jockey_One({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-staatliches",
});

const notoSansMono = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-noto-sans-mono",
});

const oswald = Marck_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "MtkooN",
  description: "Your one-stop shop for custom t-shirts and hoodies.",
  icon: '/favicon.ico'
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${staatliches.variable} ${notoSansMono.variable} ${oswald.variable}`} >
        <CartProvider>
          {children}
        </CartProvider>        
      </body>
    </html>
  );
}
