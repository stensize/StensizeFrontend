import React from 'react'
import { motion } from "framer-motion";

export default function About({cardVariants}) {
  const LOGO_SRC = "/StensizeLogo.png";
  return (
    <section id="about" className="py-10 border-t border-white/10 scroll-my-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
            <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Who we are</h2>
            <p className="mt-4 text-base text-white/70">We’re a technology-driven team passionate about turning ideas into impactful digital solutions. From innovative web and mobile apps to AI-powered systems and creative design, we build products that are reliable, scalable, and crafted with care.</p>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
                <li>• Growth-focused solutions that drive real business impact</li>
                <li>• Clear and transparent collaboration at every step</li>
                <li>• Modern, user-centric design for engaging experiences</li>
                <li>• Scalable technology built for the future</li>
                <li>• Commitment to quality, innovation, and long-term success</li>
            </ul>
            </div>
            <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover="hover" className="rounded-3xl border p-6 bg-[#161618] border-white/10">
            
              <div className="flex items-center gap-4">
                  <img src={LOGO_SRC} alt="Stensize mark" className="h-14 w-14" onError={(e)=>{e.currentTarget.style.display='none';}} />
                  <div>
                  <div className="font-bold text-2xl">STENSIZE</div>
                  <div className="text-xs text-white/60">TECHNOLOGIES</div>
                  </div>
              </div>
              <div className="mt-6 h-px w-full bg-blue-200/70" />
              <p className="mt-6 text-sm text-white/70">Our identity reflects our code — clean lines, bold contrasts, and pragmatic elegance, crafted to deliver clarity, efficiency and timeless digital experiences.</p>
            </motion.div>
        </div>
    </section>
  )
}
