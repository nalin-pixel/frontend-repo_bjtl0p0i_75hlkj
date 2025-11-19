import { useEffect, useState } from 'react'

function CommentsPanel({ dapp, open, onClose, backendUrl }) {
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && dapp?.id) fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, dapp?.id])

  const fetchComments = async () => {
    try {
      const res = await fetch(`${backendUrl}/comments?dapp_id=${dapp.id}`)
      const data = await res.json()
      setComments(data)
    } catch (e) {
      console.error(e)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${backendUrl}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dapp_id: dapp.id, content: text })
      })
      if (res.ok) {
        setText('')
        fetchComments()
      }
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-30 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-white/10 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold">Comments</h3>
          <button onClick={onClose} className="text-blue-200 hover:text-white">✕</button>
        </div>
        <p className="text-blue-200/80 text-sm mb-4">{dapp?.name}</p>
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="p-3 rounded-xl bg-slate-800/50 border border-white/10">
              <p className="text-sm text-blue-100">{c.content}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-blue-300/60">Be the first to comment.</p>
          )}
        </div>
        <form onSubmit={addComment} className="mt-4">
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white" placeholder="Share your thoughts..." />
          <div className="flex justify-end mt-2">
            <button disabled={loading} className="px-3 py-2 rounded bg-blue-600 text-white">Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentsPanel
