import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogPosts, getBlogPostWithHtml } from "@/lib/vault";
import { generateBlogMeta, generateArticleSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBlock from "@/components/AdBlock";
import NewsletterSignup from "@/components/NewsletterSignup";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return generateBlogMeta(post);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostWithHtml(slug);
  if (!post) notFound();

  const schema = generateArticleSchema(post);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <article>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {post.title}
            </h1>
            <p className="text-sm text-slate-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />
          </div>
        </article>

        <div className="mt-8">
          <AdBlock format="horizontal" slot="blog-post-bottom" />
        </div>

        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}
