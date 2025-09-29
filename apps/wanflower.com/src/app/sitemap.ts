import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: "https://your-domain.com/sitemap-static.xml" },
		{ url: "https://your-domain.com/sitemap-categories.xml" },
		{ url: "https://your-domain.com/sitemap-products.xml" },
		{ url: "https://your-domain.com/sitemap-blog.xml" },
	];
}
