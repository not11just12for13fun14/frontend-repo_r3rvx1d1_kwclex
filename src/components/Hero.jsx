import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
        <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 md:p-8 shadow-xl">
          <p className="text-sky-600 font-semibold mb-2">Portfolio & CV Generator</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Showcase your story in a modern, iridescent style</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">Upload your photo, add education, experience, projects and socials, then download a ready-to-share portfolio or CV.</p>
        </div>
      </div>
    </section>
  )
}
