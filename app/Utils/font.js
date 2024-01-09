import { Salsa, Sansita } from "next/font/google";
import localFont from "next/font/local";

export const sansita = Sansita({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });

export const sansation = localFont({ src: "./font/Sansation_Regular.ttf" });
