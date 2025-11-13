import React, { useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

function Chip({ children }) {
  return <span className="inline-block px-3 py-1 rounded-full text-sm bg-sky-50 text-sky-700 border border-sky-100 mr-2 mb-2">{children}</span>
}

function SectionTitle({ children }) {
  return <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">{children}</h3>
}

export default function App() {
  const backendEnv = import.meta.env.VITE_BACKEND_URL
  const backendUrl = useMemo(() => backendEnv || `${window.location.protocol}//${window.location.hostname}:8000`, [backendEnv])

  const [photo, setPhoto] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [summary, setSummary] = useState('')
  const [skills, setSkills] = useState('')
  const [certs, setCerts] = useState('')
  const [education, setEducation] = useState([{ institution: '', degree: '', start_date: '', end_date: '', details: '' }])
  const [experience, setExperience] = useState([{ company: '', role: '', start_date: '', end_date: '', responsibilities: '' }])
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [savedId, setSavedId] = useState('')

  const portfolioPayload = useMemo(() => ({
    name,
    title,
    email,
    phone,
    location,
    summary,
    photo,
    skills: skills.split(',').map(s => s.trim()).filter(Boolean),
    certifications: certs.split(',').map(s => s.trim()).filter(Boolean),
    education,
    experience,
  }), [name, title, email, phone, location, summary, photo, skills, certs, education, experience])

  function onPhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  function updateArray(setter, idx, field, value) {
    setter(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item))
  }

  async function savePortfolio() {
    try {
      setSaving(true)
      const res = await fetch(`${backendUrl}/api/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioPayload)
      })
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      setSavedId(data.id)
    } catch (e) {
      alert(`Error saving: ${e.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function downloadCV() {
    try {
      setDownloading(true)
      const res = await fetch(`${backendUrl}/api/portfolio/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioPayload)
      })
      if (!res.ok) throw new Error('Failed to generate download')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${(name || 'Portfolio').replace(/\s+/g,'_')}_CV.html`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      alert(`Error downloading: ${e.message}`)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-gray-900">
      {/* Hero with Spline */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 md:p-8 shadow-xl">
            <p className="text-sky-600 font-semibold mb-2">Portfolio & CV Generator</p>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Showcase your story in a modern, iridescent style</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">Upload your photo, add education and experience, then download a ready-to-share portfolio or CV.</p>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Profile photo</label>
                <input type="file" accept="image/*" onChange={onPhotoChange} className="mt-1 block w-full text-sm" />
                {photo && <img src={photo} alt="Photo preview" className="mt-3 w-24 h-24 rounded-lg object-cover border" />}
              </div>
              <div>
                <label className="block text-sm font-medium">Full name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Product Designer" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="jane@doe.com" />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="+1 555 123 4567" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Location</label>
                <input value={location} onChange={e=>setLocation(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="San Francisco, CA" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Summary</label>
                <textarea value={summary} onChange={e=>setSummary(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Brief professional summary" />
              </div>
              <div>
                <label className="block text-sm font-medium">Skills (comma separated)</label>
                <input value={skills} onChange={e=>setSkills(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="React, Tailwind, Figma" />
              </div>
              <div>
                <label className="block text-sm font-medium">Certifications (comma separated)</label>
                <input value={certs} onChange={e=>setCerts(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="AWS, PMP" />
              </div>
            </div>

            <SectionTitle>Education</SectionTitle>
            {education.map((e, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input value={e.institution} onChange={ev=>updateArray(setEducation, idx, 'institution', ev.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Institution" />
                <input value={e.degree} onChange={ev=>updateArray(setEducation, idx, 'degree', ev.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Degree" />
                <input value={e.start_date} onChange={ev=>updateArray(setEducation, idx, 'start_date', ev.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Start" />
                <input value={e.end_date} onChange={ev=>updateArray(setEducation, idx, 'end_date', ev.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="End" />
                <input value={e.details} onChange={ev=>updateArray(setEducation, idx, 'details', ev.target.value)} className="md:col-span-2 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Highlights (GPA, coursework)" />
                <div className="md:col-span-2 flex justify-end gap-2">
                  {education.length > 1 && (
                    <button onClick={() => setEducation(prev => prev.filter((_, i) => i !== idx))} className="text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50">Remove</button>
                  )}
                </div>
              </div>
            ))}
            <button onClick={() => setEducation(prev => [...prev, { institution: '', degree: '', start_date: '', end_date: '', details: '' }])} className="text-sm px-3 py-1.5 rounded-md bg-sky-600 text-white hover:bg-sky-700">Add education</button>

            <SectionTitle>Experience</SectionTitle>
            {experience.map((x, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input value={x.company} onChange={ev=>updateArray(setExperience, idx, 'company', ev.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Company" />
                <input value={x.role} onChange={ev=>updateArray(setExperience, idx, 'role', ev.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Role" />
                <input value={x.start_date} onChange={ev=>updateArray(setExperience, idx, 'start_date', ev.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Start" />
                <input value={x.end_date} onChange={ev=>updateArray(setExperience, idx, 'end_date', ev.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="End" />
                <input value={x.responsibilities} onChange={ev=>updateArray(setExperience, idx, 'responsibilities', ev.target.value)} className="md:col-span-2 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Key achievements / responsibilities" />
                <div className="md:col-span-2 flex justify-end gap-2">
                  {experience.length > 1 && (
                    <button onClick={() => setExperience(prev => prev.filter((_, i) => i !== idx))} className="text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50">Remove</button>
                  )}
                </div>
              </div>
            ))}
            <button onClick={() => setExperience(prev => [...prev, { company: '', role: '', start_date: '', end_date: '', responsibilities: '' }])} className="text-sm px-3 py-1.5 rounded-md bg-sky-600 text-white hover:bg-sky-700">Add experience</button>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={savePortfolio} disabled={saving} className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60">{saving ? 'Saving...' : 'Save to Cloud'}</button>
              <button onClick={downloadCV} disabled={downloading} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60">{downloading ? 'Preparing...' : 'Download CV'}</button>
              {savedId && <span className="text-sm text-green-700">Saved ✓</span>}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              {photo && <img src={photo} alt="Profile" className="w-24 h-24 rounded-xl object-cover border" />}
              <div>
                <h2 className="text-2xl font-bold">{name || 'Your Name'}</h2>
                <div className="text-sky-700">{title || 'Your Title'}</div>
                <div className="text-gray-500 text-sm mt-1">{[email, phone, location].filter(Boolean).join(' · ')}</div>
              </div>
            </div>

            {summary && (
              <div className="mt-5">
                <SectionTitle>Summary</SectionTitle>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </div>
            )}

            {(skills || certs) && (
              <div className="mt-2">
                {skills && (
                  <div className="mt-3">
                    <SectionTitle>Skills</SectionTitle>
                    <div>
                      {skills.split(',').map(s => s.trim()).filter(Boolean).map((s, i) => <Chip key={i}>{s}</Chip>)}
                    </div>
                  </div>
                )}
                {certs && (
                  <div className="mt-3">
                    <SectionTitle>Certifications</SectionTitle>
                    <div>
                      {certs.split(',').map(s => s.trim()).filter(Boolean).map((s, i) => <Chip key={i}>{s}</Chip>)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {education.some(e => e.institution || e.degree) && (
              <div>
                <SectionTitle>Education</SectionTitle>
                <div className="space-y-2">
                  {education.map((e, i) => (
                    <div key={i}>
                      <div className="font-medium">{e.degree || 'Degree'} · {e.institution || 'Institution'}</div>
                      <div className="text-sm text-gray-500">{[e.start_date, e.end_date].filter(Boolean).join(' - ')}</div>
                      {e.details && <div className="text-sm text-gray-700">{e.details}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {experience.some(x => x.company || x.role) && (
              <div>
                <SectionTitle>Experience</SectionTitle>
                <div className="space-y-2">
                  {experience.map((x, i) => (
                    <div key={i}>
                      <div className="font-medium">{x.role || 'Role'} · {x.company || 'Company'}</div>
                      <div className="text-sm text-gray-500">{[x.start_date, x.end_date].filter(Boolean).join(' - ')}</div>
                      {x.responsibilities && <div className="text-sm text-gray-700">{x.responsibilities}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">Backend: {backendUrl}</p>
      </section>
    </div>
  )
}
