import { MetadataRoute } from "next";

async function getCategories() {
	const res = await fetch("https://your-api.com/categories", {
		next: { revalidate: 3600 },
	});
	return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const categories = await getCategories();
	return categories.map((cat: { slug: string; updatedAt: string }) => ({
		url: `https://your-domain.com/category/${cat.slug}`,
		lastModified: new Date(cat.updatedAt),
		changeFrequency: "weekly",
		priority: 0.7,
	}));
}
