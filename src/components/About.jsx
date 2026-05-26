import React from 'react'

export default function About() {
  return (
    <section id="about" className="bg-[#020202] text-[#F0EAD6] py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: visual / key stats */}
        <div className="space-y-6">
          <div className="rounded-xl bg-gradient-to-b from-[#0c0b09] to-[#060605] p-6 border border-[rgba(212,175,55,0.08)] shadow-md">
            <h3 className="text-sm uppercase text-[#D4AF37] tracking-widest mb-4">Key Highlights</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 bg-[#080707] rounded-md border border-[rgba(212,175,55,0.04)] hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="text-2xl font-semibold">8.35</div>
                  <div className="text-xs text-[#D2C4A5] mt-1">MCA CGPA</div>
                </div>
                <div className="text-sm text-[#D4AF37]">Anna University</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#080707] rounded-md border border-[rgba(212,175,55,0.04)] hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="text-2xl font-semibold">#3</div>
                  <div className="text-xs text-[#D2C4A5] mt-1">Class Rank</div>
                </div>
                <div className="text-sm text-[#D4AF37]">MCA Batch</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#080707] rounded-md border border-[rgba(212,175,55,0.04)] hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="text-2xl font-semibold">4 mo</div>
                  <div className="text-xs text-[#D2C4A5] mt-1">Internship</div>
                </div>
                <div className="text-sm text-[#D4AF37]">VDart</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6 bg-[#080707] border border-[rgba(212,175,55,0.04)] shadow-sm">
            <h4 className="text-sm text-[#D4AF37] uppercase tracking-wider mb-3">Quick note</h4>
            <p className="font-sans text-sm text-[#D2C4A5] leading-relaxed">I craft systems with a focus on reliability, observability and long-term maintainability — elegant engineering that scales.</p>
          </div>
        </div>

        {/* Right: About content */}
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-serif text-[#F0EAD6] mb-4">About Me</h2>

          <p className="font-sans text-lg leading-relaxed text-[#F0EAD6] mb-4">
            "I'm <strong>M. Wilson</strong> — a Full Stack Developer and MCA graduate from Anna University, where I graduated ranked <span className="text-[#D4AF37] font-medium">3rd in my class</span>. I am drawn to elegant systems and purposeful code. Whether archiving robust backend logic or designing dynamic user experiences, I love turning complex problems into clean, working software."
          </p>

          <p className="font-sans text-lg leading-relaxed text-[#F0EAD6] mb-4">
            "During my 4-month software engineering internship at <span className="text-[#D4AF37] font-medium">VDart</span>, I gained crucial production-grade experience. I actively shipped user-facing features, integrated robust <span className="text-[#D4AF37] font-medium">REST APIs</span>, and collaborated across cross-functional teams through complete Software Development Life Cycle (SDLC) phases."
          </p>

          <div className="font-sans text-lg leading-relaxed text-[#F0EAD6] mb-4">
            <p className="mb-2">"My technical stack spans the entire web ecosystem:"</p>
            <ul className="list-none space-y-2 pl-0">
              <li className="flex items-start gap-3"><span className="text-[#D4AF37]">•</span> <span className="ml-1">Backend &amp; Logic: <span className="text-[#D4AF37] font-medium">Python, REST API Design, Django/FastAPI</span></span></li>
              <li className="flex items-start gap-3"><span className="text-[#D4AF37]">•</span> <span className="ml-1">Frontend &amp; UI: <span className="text-[#D4AF37] font-medium">React.js, JavaScript, Tailwind CSS</span></span></li>
              <li className="flex items-start gap-3"><span className="text-[#D4AF37]">•</span> <span className="ml-1">Database Management: <span className="text-[#D4AF37] font-medium">MySQL, Structured Query Design</span></span></li>
            </ul>
          </div>

          <p className="font-sans text-lg leading-relaxed text-[#F0EAD6] italic">"Driven by clean code, scalability, and practical engineering solutions."</p>
        </div>
      </div>
    </section>
  )
}
