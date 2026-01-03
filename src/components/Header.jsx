import React, {useState} from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../utils/constants";

export default function Header() {
    const LOGO_SRC = "/StensizeLogo.png";
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="Stensize logo" className="h-9 w-9 object-contain" onError={(e)=>{e.currentTarget.style.display='none';}} />
            <div className="h-8 w-px bg-white/10" />
            <div className="leading-tight">
              <div className="font-extrabold tracking-wide text-lg">STENSIZE</div>
              <div className="text-[10px] text-white/60">TECHNOLOGIES</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-white/70 hover:text-white duration-200 hover:text-lg"
                style={{ transition: 'all 0.5s cubic-bezier(.4,0,.2,1)' }}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden h-9 w-9 grid place-items-center rounded-xl border border-white/15 hover:bg-white/5">
            <span className="sr-only">Toggle menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </div>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="md:hidden border-t border-white/10 bg-[#121214] fixed top-16 left-0 w-full z-[99]" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <div className="px-4 py-3 flex flex-col gap-2">
                {navItems.map((n) => (
                  <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/5">{n.label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.header>
  )
}
