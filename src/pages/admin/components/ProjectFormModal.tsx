import { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'

export interface ProjectRow {
  id:          string
  title:       string
  client:      string
  year:        number
  era:         'recent' | 'old'
  format:      'short-form' | 'long-form'
  thumbnail:   string
  video_type:  'drive' | 'youtube'
  video_id:    string
  description: string
  tags:        string[]
  featured:    boolean
  duration:    string
  visible:     boolean
  sort_order:  number
}

const BLANK: Omit<ProjectRow, 'id' | 'sort_order'> = {
  title: '', client: '', year: new Date().getFullYear(),
  era: 'recent', format: 'short-form',
  thumbnail: '', video_type: 'drive', video_id: '',
  description: '', tags: [], featured: false,
  duration: '', visible: true,
}

interface Props {
  initial?: ProjectRow | null
  onSave:  (data: Omit<ProjectRow, 'id' | 'sort_order'>) => Promise<void>
  onClose: () => void
}

export default function ProjectFormModal({ initial, onSave, onClose }: Props) {
  const [form,    setForm]    = useState<Omit<ProjectRow, 'id' | 'sort_order'>>(BLANK)
  const [tagInput, setTagInput] = useState('')
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    if (initial) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, sort_order, ...rest } = initial
      setForm(rest)
    } else {
      setForm(BLANK)
    }
  }, [initial])

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm((f) => ({ ...f, [k]: v }))

  // Auto-extract ID if user pastes a full URL
  const handleVideoIdChange = (raw: string) => {
    let id = raw.trim()
    // Google Drive: https://drive.google.com/file/d/FILE_ID/view  or  /open?id=FILE_ID
    const driveMatch = id.match(/\/file\/d\/([^/?&]+)/) || id.match(/[?&]id=([^&]+)/)
    // YouTube: watch?v=ID  or  youtu.be/ID  or  /embed/ID
    const ytMatch = id.match(/(?:v=|youtu\.be\/|\/embed\/)([A-Za-z0-9_-]{11})/)

    if (form.video_type === 'drive' && driveMatch) id = driveMatch[1]
    if (form.video_type === 'youtube' && ytMatch)   id = ytMatch[1]

    set('video_id', id)
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
    setTagInput('')
  }

  const removeTag = (t: string) => set('tags', form.tags.filter((x) => x !== t))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSave(form)
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed')
      setSaving(false)
    }
  }

  const inp = 'w-full bg-[#0A0A0A] border border-[#1E1E1E] text-[#F0EDE8] text-sm px-3 py-2.5 placeholder-[#2E2E2E] focus:outline-none focus:border-[#C8A96E]/40 transition-colors'
  const lbl = 'block text-[10px] text-[#333333] tracking-[0.18em] uppercase mb-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="w-full max-w-2xl bg-[#0F0F0F] border border-[#1E1E1E]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
          <h2 className="font-display font-semibold text-[#F0EDE8] text-sm">
            {initial ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-[#383838] hover:text-[#F0EDE8] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-5">

          {/* Title + Client */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Title</label>
              <input required className={inp} placeholder="Brand Reel — Summer 2024" value={form.title}
                onChange={(e) => set('title', e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Client</label>
              <input required className={inp} placeholder="Client / Channel name" value={form.client}
                onChange={(e) => set('client', e.target.value)} />
            </div>
          </div>

          {/* Year + Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Year</label>
              <input required type="number" min={2000} max={2100} className={inp}
                value={form.year} onChange={(e) => set('year', Number(e.target.value))} />
            </div>
            <div>
              <label className={lbl}>Duration (e.g. 2:45)</label>
              <input className={inp} placeholder="2:45" value={form.duration}
                onChange={(e) => set('duration', e.target.value)} />
            </div>
          </div>

          {/* Era + Format */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Section</label>
              <select className={`${inp} appearance-none`} value={form.era}
                onChange={(e) => set('era', e.target.value as 'recent' | 'old')}>
                <option value="recent">Recent Works</option>
                <option value="old">Old Videos</option>
              </select>
            </div>
            <div>
              <label className={lbl}>Format</label>
              <select className={`${inp} appearance-none`} value={form.format}
                onChange={(e) => set('format', e.target.value as 'short-form' | 'long-form')}>
                <option value="short-form">Short Form</option>
                <option value="long-form">Long Form</option>
              </select>
            </div>
          </div>

          {/* Video Type + ID */}
          <div>
            <label className={lbl}>Video Source</label>
            <div className="flex gap-2 mb-2">
              {(['drive', 'youtube'] as const).map((vt) => (
                <button key={vt} type="button"
                  onClick={() => set('video_type', vt)}
                  className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors border ${
                    form.video_type === vt
                      ? 'border-[#C8A96E]/50 text-[#C8A96E] bg-[#C8A96E]/5'
                      : 'border-[#1E1E1E] text-[#383838] hover:border-[#2E2E2E]'
                  }`}>
                  {vt === 'drive' ? 'Google Drive' : 'YouTube'}
                </button>
              ))}
            </div>
            <input required className={inp}
              placeholder={form.video_type === 'drive'
                ? 'Paste full Drive link or just the File ID'
                : 'Paste full YouTube link or just the Video ID'}
              value={form.video_id}
              onChange={(e) => handleVideoIdChange(e.target.value)} />

            {/* Parsed ID preview */}
            {form.video_id && (
              <p className="mt-1.5 text-[10px] text-[#C8A96E]/70 font-mono">
                ID: {form.video_id}
              </p>
            )}

            {/* Sharing warning for Drive */}
            {form.video_type === 'drive' && (
              <div className="mt-2 flex items-start gap-2 bg-[#C8A96E]/5 border border-[#C8A96E]/15 px-3 py-2">
                <span className="text-[#C8A96E] text-xs shrink-0 mt-0.5">!</span>
                <p className="text-[10px] text-[#555555] leading-relaxed">
                  The file must be shared as <span className="text-[#C8A96E]">"Anyone with the link"</span>.
                  In Drive: right-click file → Share → Change to "Anyone with the link" → Done.
                </p>
              </div>
            )}
          </div>

          {/* Custom thumbnail (optional) */}
          <div>
            <label className={lbl}>Custom Thumbnail URL (optional)</label>
            <input className={inp}
              placeholder="Leave blank to auto-generate from Drive / YouTube"
              value={form.thumbnail}
              onChange={(e) => set('thumbnail', e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <label className={lbl}>Description</label>
            <textarea rows={3} className={`${inp} resize-none`}
              placeholder="One or two sentences about the project."
              value={form.description}
              onChange={(e) => set('description', e.target.value)} />
          </div>

          {/* Tags */}
          <div>
            <label className={lbl}>Tags</label>
            <div className="flex gap-2 mb-2">
              <input className={`${inp} flex-1`} placeholder="Add tag (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }} />
              <button type="button" onClick={addTag}
                className="px-4 border border-[#1E1E1E] text-[#555555] hover:text-[#F0EDE8] text-xs transition-colors">
                Add
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-[#1A1A1A] text-[#666666] text-[11px] border border-[#252525]">
                    {t}
                    <button type="button" onClick={() => removeTag(t)} className="text-[#383838] hover:text-red-400 ml-0.5">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="flex gap-8">
            {([['featured', 'Featured'] as const, ['visible', 'Visible on site'] as const]).map(([k, label]) => (
              <label key={k} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => set(k, !form[k])}
                  className={`w-9 h-5 rounded-full border transition-colors flex items-center ${
                    form[k]
                      ? 'bg-[#C8A96E]/20 border-[#C8A96E]/40'
                      : 'bg-transparent border-[#252525]'
                  }`}
                >
                  <span className={`ml-0.5 w-4 h-4 rounded-full transition-all ${
                    form[k] ? 'bg-[#C8A96E] translate-x-4' : 'bg-[#252525] translate-x-0'
                  }`} />
                </div>
                <span className="text-xs text-[#555555]">{label}</span>
              </label>
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-400/80 border border-red-900/30 bg-red-900/10 px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border border-[#1E1E1E] text-[#555555] text-sm hover:text-[#F0EDE8] hover:border-[#252525] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F0EDE8] text-[#0C0C0C] font-semibold text-sm hover:bg-[#C8A96E] disabled:opacity-40 transition-colors">
              {saving ? 'Saving…' : <><Save size={14} /> Save Project</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
