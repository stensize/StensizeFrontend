import React from 'react'
import { motion } from "framer-motion";
import { features } from "../utils/constants";

export default function Services({cardVariants}) {
  return (
    <section id="services" className="py-10 border-t border-white/10 scroll-my-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Services</h2>
            <div className="hidden md:block text-sm text-white/60">What we do best</div>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
            {features.map((f, i) => (
                <motion.div 
                style={{'box-shadow': '0 0 12px 2px rgba(147, 197, 253, 0.3)'}} 
                key={f.title} 
                custom={i} 
                variants={cardVariants} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }} 
                whileHover="hover" 
                className="rounded-2xl border p-6 bg-[#161618] border-white/10"
                
                >
                <div className="text-xl font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-white/70">{f.text}</p>
                <motion.div className="mt-4 h-0.5 bg-white/10" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} />
                </motion.div>
            ))}
            </div>
        </div>
    </section>
  )
}
