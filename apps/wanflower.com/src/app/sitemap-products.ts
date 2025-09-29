import { MetadataRoute } from "next";

async function getProducts() {
	const res = await fetch("https://your-api.com/products", {
		next: { revalidate: 3600 },
	});
	return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const products = await getProducts();
	return products.map((p: { slug: string; updatedAt: string }) => ({
		url: `https://your-domain.com/product/${p.slug}`,
		lastModified: new Date(p.updatedAt),
		changeFrequency: "weekly",
		priority: 0.9,
	}));
}
