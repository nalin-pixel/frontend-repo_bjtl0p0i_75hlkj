import { useState } from 'react'

function Header({ onOpenSubmit }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <div>
            <h1 className="text-white font-semibold leading-tight">Dapp Hunt</h1>
            <p className="text-xs text-blue-300/70">Discover the best new web3 apps</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/test" className="text-xs text-blue-200/80 hover:text-white">Backend Test</a>
          <button onClick={onOpenSubmit} className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow">
            Submit a Dapp
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
