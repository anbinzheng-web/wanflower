import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: ["/"],
				disallow: [
					"/cart",
					"/checkout",
					"/orders",
					"/orders/*",
					"/account",
					"/account/*",
					"/login",
					"/register",
				],
			},
		],
		sitemap: "https://your-domain.com/sitemap.xml",
	};
}
