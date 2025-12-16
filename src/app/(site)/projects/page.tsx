import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { placeholderProjects } from "@/lib/placeholders";

function ProjectCard({
  title,
  subtitle,
  dateLabel,
  slug,
}: {
  title: string;
  subtitle?: string;
  dateLabel?: string;
  slug?: string;
}) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-48 bg-slate-100">
        <Image src="/images/placeholder-project.svg" alt={title} fill className="object-cover" />
        <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
          Active
        </div>
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-slate-500">{dateLabel}</span>
        <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-blue-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Progress</span>
            <span className="font-bold text-blue-900">65%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
          </div>
        </div>
        
        <span className="mt-4 inline-block text-sm font-semibold text-blue-900">View details →</span>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <PageShell title="Church Projects" description="See how we're making an impact through various church development and community outreach projects.">
      {/* Featured Project Hero */}
      <div className="mb-10 overflow-hidden rounded-2xl bg-amber-50">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image src="/images/placeholder-project.svg" alt="Featured project" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">Featured Project</span>
            <h2 className="mt-3 text-2xl font-black text-slate-900">Church Development Project</h2>
            <p className="mt-3 text-slate-600">
              Help us build a house of worship that will serve our community for generations to come.
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700">Progress</span>
                <span className="font-bold text-amber-700">65% Complete</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-amber-200">
                <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-amber-500 to-amber-400" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects/church-development-project"
                className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-700"
              >
                Learn More
              </Link>
              <Link
                href="/give"
                className="rounded-lg border border-amber-600 px-5 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100"
              >
                Support This Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* All Projects */}
      <h3 className="text-xl font-bold text-slate-900">All Projects</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </PageShell>
  );
}
