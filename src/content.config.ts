import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const components = defineCollection({
	loader: glob({ pattern: ["**/*.mdx", "**/*.md"], base: "./src/data/components" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
	}),
});

export const collections = { components };