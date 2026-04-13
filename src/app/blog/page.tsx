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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">
            Editorial
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-3">
            Legal AI Blog
          </h1>
          <p className="text-lg text-slate-600">
            Guides, reviews, and insights about AI tools for legal professionals.
          </p>
        </header>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-emerald-500/30 transition-all"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-slate-900 hover:text-emerald-600 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-slate-500 mb-3">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {" · By AttorneyAITools Editorial"}
              </p>
              <p className="text-slate-600 line-clamp-2">{post.description}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-md border border-slate-200"
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
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">No blog posts yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
