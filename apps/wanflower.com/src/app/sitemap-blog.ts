import { MetadataRoute } from "next";

async function getPosts() {
	const res = await fetch("https://your-api.com/posts", {
		next: { revalidate: 3600 },
	});
	return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts();
	return posts.map((post: { slug: string; updatedAt: string }) => ({
		url: `https://your-domain.com/blog/${post.slug}`,
		lastModified: new Date(post.updatedAt),
		changeFrequency: "weekly",
		priority: 0.8,
	}));
}
