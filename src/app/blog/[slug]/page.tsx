import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogPosts, getBlogPostWithHtml } from "@/lib/vault";
import { generateBlogMeta, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
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
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-[#f6f3ee]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <article>
            <header className="mb-8">
              <h1 className="serif-ed text-3xl sm:text-4xl text-[#14181f] mb-3">
                {post.title}
              </h1>
              <p className="text-sm text-[#8a93a1]">
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
                      className="px-2.5 py-1 bg-[#d9ece7] text-[#0f7d6c] text-xs rounded-md border border-[#e2ddd3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="bg-white rounded-2xl border border-[#e2ddd3] p-6 sm:p-8">
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
      </div>
    </>
  );
}
