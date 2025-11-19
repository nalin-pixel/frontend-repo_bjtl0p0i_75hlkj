function DappCard({ dapp, onVote, onOpenComments }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
      {dapp.banner_url && (
        <img src={dapp.banner_url} alt="banner" className="w-full h-36 object-cover" />
      )}
      <div className="p-4 flex gap-4">
        <img src={dapp.logo_url || '/placeholder.svg'} alt="logo" className="w-14 h-14 rounded-xl bg-slate-700 object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-semibold truncate">{dapp.name}</h3>
            {dapp.category && <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">{dapp.category}</span>}
          </div>
          <p className="text-blue-200/80 text-sm line-clamp-2">{dapp.tagline}</p>
          {dapp.chains?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {dapp.chains.slice(0,4).map((c) => (
                <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-blue-200 border border-white/10">{c}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-between">
          <button onClick={() => onVote(dapp.id)} className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold">
            ▲ {dapp.votes ?? 0}
          </button>
          <button onClick={() => onOpenComments(dapp)} className="text-xs text-blue-200/80 hover:text-white mt-2">Comments</button>
        </div>
      </div>
    </div>
  )
}

export default DappCard
