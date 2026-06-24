import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/vault";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Legal AI Blog - News, Guides & Reviews",
  description:
    "Stay up to date with the latest in legal AI technology. Read guides, reviews, and insights about AI tools for attorneys.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);
  const itemList = generateItemListSchema(
    "AttorneyAITools Blog",
    posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <div className="bg-[#f6f3ee]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <header className="mb-10">
            <span className="eyebrow-ed inline-flex items-center gap-2 rounded-full bg-[#d9ece7] px-3 py-1.5 text-[#0f7d6c] mb-4">
              Editorial
            </span>
            <h1 className="serif-ed text-4xl sm:text-5xl text-[#14181f] leading-[1.05] mb-3">
              Legal AI Blog
            </h1>
            <p className="text-lg text-[#5b6472]">
              Guides, reviews, and insights about AI tools for legal professionals.
            </p>
          </header>

          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-[#e2ddd3] p-6 hover:shadow-md hover:border-[#d4cebf] transition-all"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-[#14181f] hover:text-[#0f7d6c] transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-[#8a93a1] mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {" · By AttorneyAITools Editorial"}
                </p>
                <p className="text-[#5b6472] line-clamp-2">{post.description}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[#eeeae2] text-[#5b6472] text-xs rounded-md border border-[#e2ddd3]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16 bg-[#eeeae2] rounded-2xl border border-[#e2ddd3]">
              <p className="text-[#8a93a1] text-lg">No blog posts yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
