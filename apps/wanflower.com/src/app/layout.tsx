import "@/styles/global.css";
import { inter, roboto } from "@/lib/fonts";
// import '@ant-design/v5-patch-for-react-19';
// import 'antd/dist/reset.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
// nextjs 中使用 antd 需要等待 v6 版本，目前无法解决兼容问题。

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	return (
		<html lang={locale} className={`${inter.variable} ${roboto.variable}`}>
			<body>
				<AntdRegistry>{children}</AntdRegistry>
			</body>
		</html>
	);
}
