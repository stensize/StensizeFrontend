import { motion } from "framer-motion";
import { work } from "../utils/constants";
import React, { useState } from 'react'

export default function Work({cardVariants}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const radius = 320; // px, radius of the carousel
  const cardWidth = 300; // px
  const cardCount = work.length;

  const rotateLeft = () => setActiveIndex(i => (i - 1 + cardCount) % cardCount);
  const rotateRight = () => setActiveIndex(i => (i + 1) % cardCount);

  return (
    <section id="work" className="py-10 border-t border-white/10 scroll-my-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Selected Work</h2>
          <div className="hidden md:block text-sm text-white/60">Recent outcomes</div>
        </div>
        {/* Desktop/Tablet: 3D carousel */}
        <div className="hidden md:flex relative items-center justify-center w-full max-w-7xl mx-auto min-h-[400px]" style={{ height: '400px', perspective: '1200px' }}>
          <button onClick={rotateLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 px-3 py-2 bg-white/10 text-white rounded-full shadow hover:bg-white/20 transition">&#8592;</button>
          <div className="relative w-full h-full" style={{ height: '400px' }}>
            {work.map((w, i) => {
              const angle = ((360 / cardCount) * (i - activeIndex)) * (Math.PI / 180);
              const x = Math.sin(angle) * radius;
              const z = Math.cos(angle) * radius;
              const scale = i === activeIndex ? 1 : 0.85;
              const opacity = i === activeIndex ? 1 : 0.5;
              return (
                <motion.div
                  key={w.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={{
                    x,
                    z,
                    scale,
                    opacity,
                    rotateY: (i - activeIndex) * (360 / cardCount),
                    zIndex: i === activeIndex ? 10 : 5,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[${cardWidth}px] rounded-3xl p-10 bg-[#161618] border border-white/10 shadow-lg text-white transition-all duration-300 cursor-pointer ${i === activeIndex ? 'ring-2 ring-blue-200' : ''}`}
                  style={{
                    transform: `translateX(${x}px) translateZ(${z}px) scale(${scale}) rotateY(${(i - activeIndex) * (360 / cardCount)}deg)`,
                    opacity,
                    zIndex: i === activeIndex ? 10 : 5,
                  }}
                >
                  <div className="absolute -top-8 left-8 w-24 h-24 bg-gradient-to-tr from-[#a5b4fc]/40 to-[#fbbf24]/30 rounded-full blur-2xl opacity-40 pointer-events-none" />
                  <div className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight leading-tight drop-shadow">{w.title}</div>
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium mb-2">{w.text}</p>
                </motion.div>
              );
            })}
          </div>
          <button onClick={rotateRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 px-3 py-2 bg-white/10 text-white rounded-full shadow hover:bg-white/20 transition">&#8594;</button>
        </div>
        {/* Mobile: vertical 3D carousel */}
        <div className="md:hidden relative flex items-center justify-center w-full min-h-[340px]" style={{ height: '340px', perspective: '1200px' }}>
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {work.map((w, i) => (
              i === activeIndex && (
                <motion.div
                  key={w.title}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -50) setActiveIndex((activeIndex + 1) % work.length);
                    if (info.offset.x > 50) setActiveIndex((activeIndex - 1 + work.length) % work.length);
                  }}
                  initial={{ x: 0, opacity: 1, rotateY: 0 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  whileDrag={{ rotateY: info => info.offset.x < 0 ? -30 : 30 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="w-full h-full max-w-[260px] max-h-[260px] rounded-full p-4 bg-[#161618] border border-white/10 shadow-lg text-white flex flex-col justify-center items-center mx-auto overflow-hidden"
                  style={{ boxShadow: '0 0 24px 4px #93c5fd', cursor: 'grab', aspectRatio: '1/1' }}
                >
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="text-lg font-extrabold text-white mb-2 tracking-tight leading-tight drop-shadow text-center break-words max-w-[180px]">{w.title}</div>
                    <p className="text-sm text-white/70 leading-relaxed font-medium mb-2 text-center break-words max-w-[180px]">{w.text}</p>
                    
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
