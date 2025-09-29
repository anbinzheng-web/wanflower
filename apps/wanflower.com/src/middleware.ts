import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

export default function middleware(request: NextRequest) {
	// const url = new URL(request.url);

	//   // 如果路径以 /en/ 开头，就把它 rewrite 成去掉 /en 的路径
	//   if (url.pathname.startsWith('/en/')) {
	//     return NextResponse.rewrite(
	//       new URL(url.pathname.replace(/^\/en/, '') || '/', request.url)
	//     );
	//   }

	return intlMiddleware(request);
}
