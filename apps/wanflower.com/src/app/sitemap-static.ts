import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://your-domain.com/",
			changeFrequency: "daily",
			priority: 1.0,
		},
		{
			url: "https://your-domain.com/about",
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: "https://your-domain.com/privacy",
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: "https://your-domain.com/refund",
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: "https://your-domain.com/contact",
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: "https://your-domain.com/shipping-info",
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];
}
