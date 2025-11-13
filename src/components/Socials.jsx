import React from 'react'

export default function Socials({ socials, setSocials }) {
  const fields = [
    { key: 'website', label: 'Website' },
    { key: 'github', label: 'GitHub' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'twitter', label: 'Twitter' },
    { key: 'dribbble', label: 'Dribbble' },
  ]
  const update = (key, value) => setSocials(prev => ({ ...prev, [key]: value }))
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Social links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(f => (
          <input key={f.key} value={socials[f.key] || ''} onChange={e=>update(f.key, e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder={`${f.label} URL`} />
        ))}
      </div>
    </div>
  )
}
