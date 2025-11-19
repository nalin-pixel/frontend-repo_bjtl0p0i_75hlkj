import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import DappCard from './components/DappCard'
import SubmitDappModal from './components/SubmitDappModal'
import CommentsPanel from './components/CommentsPanel'

function App() {
  const backendUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [dapps, setDapps] = useState([])
  const [loading, setLoading] = useState(true)
  const [showSubmit, setShowSubmit] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [activeDapp, setActiveDapp] = useState(null)
  const [filters, setFilters] = useState({ category: 'All', chain: 'All' })

  const fetchDapps = async () => {
    setLoading(true)
    try {
      const qs = new URLSearchParams()
      if (filters.category !== 'All') qs.append('category', filters.category)
      if (filters.chain !== 'All') qs.append('chain', filters.chain)
      const res = await fetch(`${backendUrl}/dapps?${qs.toString()}`)
      const data = await res.json()
      // ensure id field present
      setDapps(data.map(d => ({ ...d, id: d.id || d._id })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDapps() }, [filters.category, filters.chain])

  const submitDapp = async (payload) => {
    const res = await fetch(`${backendUrl}/dapps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      setShowSubmit(false)
      fetchDapps()
    }
  }

  const vote = async (id) => {
    const res = await fetch(`${backendUrl}/dapps/${id}/vote`, { method: 'POST' })
    if (res.ok) fetchDapps()
  }

  const openComments = (dapp) => { setActiveDapp(dapp); setCommentsOpen(true) }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Header onOpenSubmit={() => setShowSubmit(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-white text-2xl font-semibold">Today in Web3</h2>
            <div className="flex items-center gap-2">
              <select value={filters.category} onChange={e=>setFilters(f=>({...f, category: e.target.value}))} className="px-3 py-2 rounded bg-slate-800 border border-white/10 text-blue-100">
                {['All','DeFi','NFT','Tooling','Infra','Gaming','Social'].map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={filters.chain} onChange={e=>setFilters(f=>({...f, chain: e.target.value}))} className="px-3 py-2 rounded bg-slate-800 border border-white/10 text-blue-100">
                {['All','Ethereum','Polygon','Solana','Base','Arbitrum','Optimism'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <p className="text-blue-200/70 text-sm mt-1">Submit, upvote and discuss the latest decentralized apps.</p>
        </section>

        {loading ? (
          <p className="text-blue-200">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dapps.map(d => (
              <DappCard key={d.id} dapp={d} onVote={vote} onOpenComments={openComments} />
            ))}
          </div>
        )}
      </main>

      <SubmitDappModal open={showSubmit} onClose={() => setShowSubmit(false)} onSubmit={submitDapp} />
      <CommentsPanel dapp={activeDapp} open={commentsOpen} onClose={()=>setCommentsOpen(false)} backendUrl={backendUrl} />
    </div>
  )
}

export default App
