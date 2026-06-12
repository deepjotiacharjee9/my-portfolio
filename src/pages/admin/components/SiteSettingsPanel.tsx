import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { supabase } from '../../../lib/supabase'

function parseDriveFileId(raw: string): string {
  const match = raw.match(/\/file\/d\/([^/?]+)/)
  if (match) return match[1]
  const idMatch = raw.match(/[?&]id=([^&]+)/)
  if (idMatch) return idMatch[1]
  return raw.trim()
}

function parseYouTubeId(raw: string): string {
  const match = raw.match(/(?:v=|youtu\.be\/)([^&?/]+)/)
  if (match) return match[1]
  return raw.trim()
}

function toDriveImageUrl(raw: string): string {
  const id = parseDriveFileId(raw)
  if (id !== raw.trim()) return `https://drive.google.com/thumbnail?id=${id}&sz=w800`
  return raw
}

export default function SiteSettingsPanel() {
  const [form, setForm] = useState({
    about_photo_url:     '',
    showreel_video_type: 'drive',
    showreel_video_id:   '',
  })
  const [photoPreview, setPhotoPreview] = useState('')
  const [saving,    setSaving]    = useState(false)
  const [saved,     setSaved]     = useState(false)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase.from('site_settings').select('key, value').then(({ data }) => {
      if (!data) return
      const m: Record<string, string> = {}
      data.forEach((r: any) => { m[r.key] = r.value })
      const photo = m['about_photo_url'] ?? ''
      setForm({
        about_photo_url:     photo,
        showreel_video_type: m['showreel_video_type'] ?? 'drive',
        showreel_video_id:   m['showreel_video_id']  ?? '',
      })
      setPhotoPreview(photo)
    })
  }, [])

  const handlePhotoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const resolved = toDriveImageUrl(raw)
    setForm((f) => ({ ...f, about_photo_url: resolved }))
    setPhotoPreview(resolved)
  }

  const handleShowreelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const id = form.showreel_video_type === 'drive'
      ? parseDriveFileId(raw)
      : parseYouTubeId(raw)
    setForm((f) => ({ ...f, showreel_video_id: id }))
  }

  const save = async () => {
    if (!supabase) return
    setSaving(true)
    setSaveError(false)
    const results = await Promise.all(
      Object.entries(form).map(([key, value]) =>
        supabase!.from('site_settings').upsert({ key, value }, { onConflict: 'key' })
      )
    )
    setSaving(false)
    if (results.some((r) => r.error)) {
      setSaveError(true)
      setTimeout(() => setSaveError(false), 5000)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  const showreelThumb = form.showreel_video_id
    ? (form.showreel_video_type === 'drive'
        ? `https://drive.google.com/thumbnail?id=${form.showreel_video_id}&sz=w400`
        : `https://img.youtube.com/vi/${form.showreel_video_id}/mqdefault.jpg`)
    : ''

  const inp = 'w-full bg-[#0A0A0A] border border-[#1E1E1E] text-[#F0EDE8] text-sm px-3 py-2.5 placeholder-[#2E2E2E] focus:outline-none focus:border-[#C8A96E]/40 transition-colors'
  const lbl = 'block text-[10px] text-[#333333] tracking-[0.18em] uppercase mb-1.5'

  return (
    <div className="max-w-xl space-y-6">

      {/* ── About photo ── */}
      <div className="border border-[#1A1A1A] p-6">
        <h3 className="font-display font-semibold text-[#F0EDE8] text-sm mb-5">About Photo</h3>

        <div>
          <label className={lbl}>
            Photo URL{' '}
            <span className="text-[#555555] normal-case tracking-normal">
              — paste any image URL or Google Drive share link
            </span>
          </label>
          <input
            className={inp}
            value={form.about_photo_url}
            onChange={handlePhotoUrl}
            placeholder="https://drive.google.com/file/d/FILE_ID/view"
          />
          <p className="text-[10px] text-[#2E2E2E] mt-1.5">
            Google Drive links are auto-converted to direct image URLs.
          </p>
        </div>

        {photoPreview && (
          <div className="mt-3 border border-[#1A1A1A] overflow-hidden">
            <img
              src={photoPreview}
              alt="About photo preview"
              className="w-full max-h-48 object-cover bg-[#0A0A0A]"
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
            />
          </div>
        )}
      </div>

      {/* ── Showreel ── */}
      <div className="border border-[#1A1A1A] p-6">
        <h3 className="font-display font-semibold text-[#F0EDE8] text-sm mb-5">Hero Showreel</h3>

        <div className="mb-4">
          <label className={lbl}>Video source</label>
          <div className="flex gap-2">
            {(['drive', 'youtube'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm((f) => ({ ...f, showreel_video_type: type, showreel_video_id: '' }))}
                className={`px-4 py-2 text-xs border transition-colors ${
                  form.showreel_video_type === type
                    ? 'border-[#C8A96E] text-[#C8A96E]'
                    : 'border-[#1E1E1E] text-[#383838] hover:text-[#555555]'
                }`}
              >
                {type === 'drive' ? 'Google Drive' : 'YouTube'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={lbl}>
            {form.showreel_video_type === 'drive'
              ? 'Drive share link or file ID'
              : 'YouTube URL or video ID'}
          </label>
          <input
            className={inp}
            value={form.showreel_video_id}
            onChange={handleShowreelInput}
            placeholder={form.showreel_video_type === 'drive'
              ? 'https://drive.google.com/file/d/FILE_ID/view'
              : 'https://www.youtube.com/watch?v=VIDEO_ID'
            }
          />
          <p className="text-[10px] text-[#2E2E2E] mt-1.5">
            The file ID is extracted automatically from full share links.
          </p>
        </div>

        {showreelThumb && (
          <div className="mt-3 border border-[#1A1A1A] overflow-hidden">
            <img
              src={showreelThumb}
              alt="Showreel thumbnail preview"
              className="w-full max-h-36 object-cover bg-[#0A0A0A]"
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#F0EDE8] text-[#0C0C0C] font-semibold text-sm hover:bg-[#C8A96E] disabled:opacity-40 transition-colors"
        >
          <Save size={14} />
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Settings'}
        </button>
        {saveError && (
          <p className="text-xs text-red-400">
            Save failed. Make sure the <code className="font-mono bg-[#1A1A1A] px-1 py-0.5">site_settings</code> table exists in Supabase — run the SQL from the setup guide, then try again.
          </p>
        )}
      </div>
    </div>
  )
}
