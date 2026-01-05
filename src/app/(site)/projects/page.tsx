"use client";

import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { useState, useEffect } from "react";
import { getProjects, Project, slugify } from "@/lib/firestore";
import { Loader2 } from "lucide-react";

function ProjectCard({
  title,
  description,
  deadline,
  image,
  progress,
  slug,
}: {
  title: string;
  description?: string;
  deadline?: string;
  image?: string;
  progress?: number;
  slug?: string;
}) {
  const progressValue = progress || 0;
  
  return (
    <Link
      href={`/projects/${slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-48 bg-slate-100">
        <Image 
          src={image || "/images/placeholder-project.svg"} 
          alt={title} 
          fill 
          className="object-cover" 
        />
        <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
          Active
        </div>
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-slate-500">{deadline || "Ongoing"}</span>
        <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-blue-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{description}</p>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Progress</span>
            <span className="font-bold text-blue-900">{progressValue}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400" 
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
        
        <span className="mt-4 inline-block text-sm font-semibold text-blue-900">View details →</span>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const featuredProject = projects[0];
  const restProjects = projects.slice(1);

  return (
    <PageShell title="Church Projects" description="See how we're making an impact through various church development and community outreach projects.">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-slate-600">No projects available yet.</p>
          <p className="mt-2 text-sm text-slate-500">Check back soon for new initiatives!</p>
        </div>
      ) : (
        <>
          {/* Featured Project Hero */}
          {featuredProject && (
            <div className="mb-10 overflow-hidden rounded-2xl bg-amber-50">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src={featuredProject.image || "/images/placeholder-project.svg"} 
                    alt="Featured project" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">Featured Project</span>
                  <h2 className="mt-3 text-2xl font-black text-slate-900">{featuredProject.title}</h2>
                  <p className="mt-3 text-slate-600">{featuredProject.description}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-700">Progress</span>
                      <span className="font-bold text-amber-700">{featuredProject.progress || 0}% Complete</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-amber-200">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400" 
                        style={{ width: `${featuredProject.progress || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/projects/${slugify(featuredProject.title)}`}
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
          )}

          {/* All Projects */}
          <h3 className="text-xl font-bold text-slate-900">All Projects</h3>
          {restProjects.length === 0 && projects.length === 1 ? (
            <p className="mt-4 text-slate-600">More projects coming soon.</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(restProjects.length > 0 ? restProjects : projects).map((project) => (
                <ProjectCard 
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  deadline={project.deadline}
                  image={project.image}
                  progress={project.progress}
                  slug={slugify(project.title)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </PageShell>
  );
}
