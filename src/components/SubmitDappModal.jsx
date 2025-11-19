import { useState } from 'react'

function SubmitDappModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    tagline: '',
    website: '',
    category: 'Tooling',
    chains: '',
    logo_url: '',
    banner_url: ''
  })

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      chains: form.chains.split(',').map(s => s.trim()).filter(Boolean),
      votes: 0
    }
    onSubmit(payload)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-20 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold">Submit a Dapp</h3>
          <button onClick={onClose} className="text-blue-200 hover:text-white">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-blue-200/70 mb-1">Name</label>
              <input required value={form.name} onChange={e=>update('name', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10 text-white" />
            </div>
            <div>
              <label className="block text-xs text-blue-200/70 mb-1">Category</label>
              <select value={form.category} onChange={e=>update('category', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10 text-white">
                {['DeFi','NFT','Tooling','Infra','Gaming','Social'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-blue-200/70 mb-1">Tagline</label>
            <input required value={form.tagline} onChange={e=>update('tagline', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10 text-white" />
          </div>
          <div>
            <label className="block text-xs text-blue-200/70 mb-1">Website</label>
            <input value={form.website} onChange={e=>update('website', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10 text-white" placeholder="https://" />
          </div>
          <div>
            <label className="block text-xs text-blue-200/70 mb-1">Chains (comma separated)</label>
            <input value={form.chains} onChange={e=>update('chains', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10 text-white" placeholder="Ethereum, Polygon" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-blue-200/70 mb-1">Logo URL</label>
              <input value={form.logo_url} onChange={e=>update('logo_url', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10 text-white" />
            </div>
            <div>
              <label className="block text-xs text-blue-200/70 mb-1">Banner URL</label>
              <input value={form.banner_url} onChange={e=>update('banner_url', e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10 text-white" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded bg-slate-700 text-white">Cancel</button>
            <button type="submit" className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubmitDappModal
