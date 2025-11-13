import React from 'react'

export default function Projects({ projects, setProjects }) {
  const update = (idx, field, value) => {
    setProjects(prev => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)))
  }
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Projects</h3>
      {projects.map((p, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <input value={p.title} onChange={e=>update(idx,'title',e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Project title" />
          <input value={p.link} onChange={e=>update(idx,'link',e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Link (https://)" />
          <input value={p.technologies} onChange={e=>update(idx,'technologies',e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 md:col-span-2" placeholder="Technologies (comma separated)" />
          <textarea value={p.description} onChange={e=>update(idx,'description',e.target.value)} rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 md:col-span-2" placeholder="Short description" />
          <div className="md:col-span-2 flex justify-end">
            {projects.length > 1 && (
              <button onClick={() => setProjects(prev => prev.filter((_, i) => i !== idx))} className="text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50">Remove</button>
            )}
          </div>
        </div>
      ))}
      <button onClick={() => setProjects(prev => [...prev, { title: '', link: '', description: '', technologies: '' }])} className="text-sm px-3 py-1.5 rounded-md bg-sky-600 text-white hover:bg-sky-700">Add project</button>
    </div>
  )
}
