import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Script from "next/script";
import RecoilRootWrapper from "./recoil-wrapper";
import Providers from "@/components/providers";
declare global {
	interface Window {
		kakao: any;
		closeOverlay: any;
		overlay: any;
	}
}
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "ZZCAFE",
		template: "%s | ZZCAFE",
	},
	description: "당신만의 카페 리스트를 완성해보세요.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Script
					strategy={"beforeInteractive"}
					src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services,clusterer,drawing`}
				/>
				<RecoilRootWrapper>
					<Providers>{children}</Providers>
				</RecoilRootWrapper>
			</body>
		</html>
	);
}
