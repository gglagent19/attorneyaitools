import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/vault";

export const metadata: Metadata = {
  title: "Legal AI Blog - News, Guides & Reviews",
  description:
    "Stay up to date with the latest in legal AI technology. Read guides, reviews, and insights about AI tools for attorneys.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Legal AI Blog
        </h1>
        <p className="text-lg text-slate-600">
          Guides, reviews, and insights about AI tools for legal professionals.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-slate-500 mb-3">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
  );
}
