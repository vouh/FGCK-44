"use client";

import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getProjects, slugify, Project } from "@/lib/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { Loader2 } from "lucide-react";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const projects = await getProjects();
        const found = projects.find((p) => slugify(p.title) === slug);
        setProject(found || null);
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <PageShell title="Loading..." description="">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </PageShell>
    );
  }

  if (!project) {
    return (
      <PageShell title="Project Not Found" description="">
        <div className="text-center py-12">
          <p className="text-slate-600">This project could not be found.</p>
          <Link href="/projects" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={project.title}
      description={project.description || "Support this community project"}
    >
      <div className="grid gap-6">
        {/* Project Image */}
        {project.image && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Project Details Card */}
        <div className="rounded-2xl border border-blue-900/10 bg-white p-6 shadow-sm">
          {/* Progress Bar */}
          {typeof project.progress === 'number' && (
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-900">Progress</span>
                <span className="font-bold text-blue-900">{project.progress}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="grid gap-4 text-sm text-slate-600">
            {project.deadline && (
              <div>
                <span className="font-semibold text-slate-900">Deadline:</span> {project.deadline}
              </div>
            )}
          </div>

          {project.description && (
            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="text-sm font-extrabold text-blue-950">About This Project</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          )}



          {/* How to Support */}
          <div className="mt-6 rounded-xl bg-blue-50 p-4">
            <div className="text-sm font-extrabold text-blue-950">How to Support</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Your support can make a real difference in this project. Consider giving towards this mission.
            </p>
            <Link
              href="/give"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              Give Now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <Link href="/projects" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
