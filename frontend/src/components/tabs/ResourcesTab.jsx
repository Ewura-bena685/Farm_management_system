import React from 'react'

const resourceImages = [
  '/images/images.jpg',
  '/images/download.jpg',
  '/images/download%20(1).jpg',
  '/images/download%20(2).jpg',
  '/images/images%20(1).jpg',
  '/images/images%20(2).jpg',
  '/images/images%20(3).jpg',
  '/images/images%20(4).jpg',
]

function ResourcesTab() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-900">Farm Resources & Compliance Guide</h2>
            <p className="mt-2 text-sm text-slate-600">
              Access the MOFA PBB guide directly from the app and review the latest livestock management and compliance rules for Ghana farms.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <iframe
              title="MOFA PBB Guide"
              src="/docs/2026-PBB-MOFA.pdf"
              className="w-full h-[640px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/docs/2026-PBB-MOFA.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-800"
            >
              Open full guide
            </a>
            <a
              href="/docs/2026-PBB-MOFA.pdf"
              download
              className="inline-flex rounded-full border border-emerald-900 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-emerald-900">Farm imagery</h3>
          <p className="mt-2 text-sm text-slate-600">
            Use these field and livestock images as visual guides for pen layout, animal health, and training modules.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resourceImages.map(src => (
            <div key={src} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <img src={src} alt="Farm resource" className="h-48 w-full object-cover transition duration-300 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-emerald-900">AI-ready resource notes</h3>
        <p className="mt-2 text-sm text-slate-600">
          This section is designed to help capture farm knowledge and training materials into the app. In a future version we can add search and question-answering over the MOFA guide.
        </p>
      </section>
    </div>
  )
}

export default ResourcesTab
