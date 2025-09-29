import { Inter, Roboto } from "next/font/google";

export const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
	weight: "400",
});
