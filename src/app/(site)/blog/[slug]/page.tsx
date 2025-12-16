import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageShell
      title="Blog Post"
      description={
        <>
          Placeholder blog post detail page for <span className="font-semibold text-slate-900">{slug}</span>.
        </>
      }
    >
      <div className="rounded-2xl border border-blue-900/10 bg-white p-6">
        <div className="text-sm font-extrabold text-blue-950">Body</div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          (Placeholder) This will render blog content stored in Firestore (rich text or Markdown).
        </p>
        <div className="mt-6">
          <Link href="/blog" className="text-sm font-semibold text-blue-900">
            ← Back to blog
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
