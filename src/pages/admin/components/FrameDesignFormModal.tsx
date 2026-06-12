import { useState, useEffect } from 'react'

export interface FrameDesignRow {
  id: string
  title: string
  description?: string
  image_url: string
  category: string
  visible: boolean
  sort_order: number
}

interface Props {
  initial?: FrameDesignRow | null
  onSave:  (data: Omit<FrameDesignRow, 'id' | 'sort_order'>) => Promise<void>
  onClose: () => void
}

const CATEGORIES = ['Thumbnail', 'YouTube Frame', 'Banner', 'Title Card', 'End Screen', 'Overlay', 'Design']

function parseDriveImageUrl(raw: string): string {
  const match = raw.match(/\/file\/d\/([^/]+)/)
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`
  const idMatch = raw.match(/[?&]id=([^&]+)/)
  if (idMatch) return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`
  return raw
}

export default function FrameDesignFormModal({ initial, onSave, onClose }: Props) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'Thumbnail',
    visible: true,
  })
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (initial) {
      setForm({
        title:       initial.title,
        description: initial.description ?? '',
        image_url:   initial.image_url,
        category:    initial.category,
        visible:     initial.visible,
      })
      setPreview(initial.image_url)
    } else {
      setForm({ title: '', description: '', image_url: '', category: 'Thumbnail', visible: true })
      setPreview('')
    }
  }, [initial])

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val = k === 'visible'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
      setForm((f) => ({ ...f, [k]: val }))
    }

  const handleImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const resolved = parseDriveImageUrl(raw)
    setForm((f) => ({ ...f, image_url: resolved }))
    setPreview(resolved)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave({
      title:       form.title,
      description: form.description || undefined,
      image_url:   form.image_url,
      category:    form.category,
      visible:     form.visible,
    })
    onClose()
  }

  const inp = 'w-full bg-[#0A0A0A] border border-[#1E1E1E] text-[#F0EDE8] text-sm px-3 py-2.5 placeholder-[#2E2E2E] focus:outline-none focus:border-[#C8A96E]/40 transition-colors'
  const lbl = 'block text-[10px] text-[#333333] tracking-[0.18em] uppercase mb-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-[#0F0F0F] border border-[#1E1E1E] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] sticky top-0 bg-[#0F0F0F]">
          <h2 className="font-display font-semibold text-[#F0EDE8] text-sm">
            {initial ? 'Edit Frame Design' : 'Add Frame Design'}
          </h2>
          <button onClick={onClose} className="text-[#383838] hover:text-[#F0EDE8] transition-colors">✕</button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className={lbl}>Title</label>
            <input
              required
              className={inp}
              value={form.title}
              onChange={set('title')}
              placeholder="e.g. YouTube Thumbnail v1"
            />
          </div>

          <div>
            <label className={lbl}>
              Image URL{' '}
              <span className="text-[#555555] normal-case tracking-normal">
                — paste any image URL or Google Drive share link
              </span>
            </label>
            <input
              required
              className={inp}
              value={form.image_url}
              onChange={handleImageUrl}
              placeholder="https://drive.google.com/file/d/FILE_ID/view"
            />
            <p className="text-[10px] text-[#2E2E2E] mt-1.5">
              Google Drive share links are auto-converted to direct image URLs.
            </p>
          </div>

          {/* Image preview */}
          {preview && (
            <div className="border border-[#1A1A1A] overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-40 object-contain bg-[#0A0A0A]"
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Category</label>
              <select
                className={`${inp} appearance-none`}
                value={form.category}
                onChange={set('category')}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-3 cursor-pointer pb-2.5">
                <div
                  className={`w-9 h-5 rounded-full transition-colors duration-200 relative ${form.visible ? 'bg-[#C8A96E]' : 'bg-[#1E1E1E]'}`}
                  onClick={() => setForm((f) => ({ ...f, visible: !f.visible }))}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${form.visible ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-[11px] text-[#555555] tracking-[0.1em] uppercase">Visible on site</span>
              </label>
            </div>
          </div>

          <div>
            <label className={lbl}>Description <span className="text-[#2E2E2E] normal-case tracking-normal">— optional</span></label>
            <textarea
              rows={2}
              className={`${inp} resize-none`}
              value={form.description}
              onChange={set('description')}
              placeholder="Brief description of this design…"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#1E1E1E] text-[#555555] text-sm hover:text-[#F0EDE8] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-[#F0EDE8] text-[#0C0C0C] font-semibold text-sm hover:bg-[#C8A96E] disabled:opacity-40 transition-colors"
            >
              {saving ? 'Saving…' : 'Save Design'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
