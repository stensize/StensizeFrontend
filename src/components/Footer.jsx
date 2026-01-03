import React from 'react'

export default function Footer() {
    const LOGO_SRC = "/StensizeLogo.png";
  return (
    <footer className="border-t border-white/10 scroll-my-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="Stensize logo small" className="h-7 w-7" onError={(e)=>{e.currentTarget.style.display='none';}} />
            <div className="h-6 w-px bg-white/10" />
            <span className="text-sm text-white/60">© {new Date().getFullYear()} Stensize Technologies. All rights reserved.</span>
          </div>
          <div className="text-xs text-white/60">Privacy • Terms • Careers</div>
        </div>
    </footer>
  )
}
