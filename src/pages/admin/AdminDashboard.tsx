import { useState, useEffect, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { Plus, LogOut, RefreshCw, Quote, Pencil, Trash2, Image } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import ProjectFormModal, { type ProjectRow } from './components/ProjectFormModal'
import SortableRow from './components/SortableRow'
import FrameDesignFormModal, { type FrameDesignRow } from './components/FrameDesignFormModal'
import type { Testimonial } from '../../types'

type Tab = 'projects' | 'frameDesigns' | 'testimonials'

// ── Testimonial form modal ──────────────────────────────────────────────────

interface TestimonialFormProps {
  initial?: Testimonial | null
  onSave:  (t: Omit<Testimonial, 'id'>) => Promise<void>
  onClose: () => void
}

function TestimonialForm({ initial, onSave, onClose }: TestimonialFormProps) {
  const [form, setForm] = useState({ name: '', role: '', platform: '', content: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initial) setForm({ name: initial.name, role: initial.role, platform: initial.platform, content: initial.content })
    else setForm({ name: '', role: '', platform: '', content: '' })
  }, [initial])

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave(form)
    onClose()
  }

  const inp = 'w-full bg-[#0A0A0A] border border-[#1E1E1E] text-[#F0EDE8] text-sm px-3 py-2.5 placeholder-[#2E2E2E] focus:outline-none focus:border-[#C8A96E]/40 transition-colors'
  const lbl = 'block text-[10px] text-[#333333] tracking-[0.18em] uppercase mb-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-[#0F0F0F] border border-[#1E1E1E]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
          <h2 className="font-display font-semibold text-[#F0EDE8] text-sm">
            {initial ? 'Edit Testimonial' : 'Add Testimonial'}
          </h2>
          <button onClick={onClose} className="text-[#383838] hover:text-[#F0EDE8]">✕</button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Name</label><input required className={inp} value={form.name} onChange={set('name')} placeholder="Arjun Mehta" /></div>
            <div><label className={lbl}>Role</label><input required className={inp} value={form.role} onChange={set('role')} placeholder="YouTube Creator" /></div>
          </div>
          <div><label className={lbl}>Platform / Audience</label><input className={inp} value={form.platform} onChange={set('platform')} placeholder="2.4M subscribers" /></div>
          <div><label className={lbl}>Quote</label><textarea required rows={4} className={`${inp} resize-none`} value={form.content} onChange={set('content')} placeholder="Their words about your work…" /></div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#1E1E1E] text-[#555555] text-sm hover:text-[#F0EDE8] transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-3 bg-[#F0EDE8] text-[#0C0C0C] font-semibold text-sm hover:bg-[#C8A96E] disabled:opacity-40 transition-colors">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Main Dashboard ──────────────────────────────────────────────────────────

interface Props { onLogout: () => void }

export default function AdminDashboard({ onLogout }: Props) {
  const [tab,          setTab]         = useState<Tab>('projects')
  const [projects,     setProjects]    = useState<ProjectRow[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [frameDesigns, setFrameDesigns] = useState<FrameDesignRow[]>([])
  const [loading,      setLoading]     = useState(true)
  const [editProject,  setEditProject] = useState<ProjectRow | null | undefined>(undefined)
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null | undefined>(undefined)
  const [editFrameDesign, setEditFrameDesign] = useState<FrameDesignRow | null | undefined>(undefined)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const loadProjects = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.from('projects').select('*').order('sort_order')
    if (data) setProjects(data as ProjectRow[])
    setLoading(false)
  }, [])

  const loadTestimonials = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.from('testimonials').select('*').order('sort_order')
    if (data) setTestimonials(data as Testimonial[])
  }, [])

  const loadFrameDesigns = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.from('frame_designs').select('*').order('sort_order')
    if (data) setFrameDesigns(data as FrameDesignRow[])
  }, [])

  useEffect(() => { loadProjects(); loadTestimonials(); loadFrameDesigns() }, [loadProjects, loadTestimonials, loadFrameDesigns])

  // ── Drag end — reorder + update sort_order in DB ────────────────
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = projects.findIndex((p) => p.id === active.id)
    const newIndex = projects.findIndex((p) => p.id === over.id)
    const reordered = arrayMove(projects, oldIndex, newIndex)
    setProjects(reordered)
    if (!supabase) return
    await Promise.all(
      reordered.map((p, i) =>
        supabase!.from('projects').update({ sort_order: i }).eq('id', p.id)
      )
    )
  }

  // ── Project CRUD ────────────────────────────────────────────────
  const saveProject = async (data: Omit<ProjectRow, 'id' | 'sort_order'>) => {
    if (!supabase) return
    if (editProject?.id) {
      await supabase.from('projects').update(data).eq('id', editProject.id)
    } else {
      const maxOrder = projects.length ? Math.max(...projects.map((p) => p.sort_order)) + 1 : 0
      await supabase.from('projects').insert({ ...data, sort_order: maxOrder })
    }
    await loadProjects()
  }

  const deleteProject = async (id: string) => {
    if (!supabase) return
    await supabase.from('projects').delete().eq('id', id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setDeleteConfirm(null)
  }

  const toggleVisible = async (id: string, visible: boolean) => {
    if (!supabase) return
    await supabase.from('projects').update({ visible }).eq('id', id)
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, visible } : p)))
  }

  // ── Testimonial CRUD ────────────────────────────────────────────
  const saveTestimonial = async (data: Omit<Testimonial, 'id'>) => {
    if (!supabase) return
    if (editTestimonial?.id) {
      await supabase.from('testimonials').update(data).eq('id', editTestimonial.id)
    } else {
      await supabase.from('testimonials').insert({ ...data, sort_order: testimonials.length })
    }
    await loadTestimonials()
  }

  const deleteTestimonial = async (id: string) => {
    if (!supabase) return
    await supabase.from('testimonials').delete().eq('id', id)
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
  }

  // ── Frame Design CRUD ───────────────────────────────────────────
  const saveFrameDesign = async (data: Omit<FrameDesignRow, 'id' | 'sort_order'>) => {
    if (!supabase) return
    if (editFrameDesign?.id) {
      await supabase.from('frame_designs').update(data).eq('id', editFrameDesign.id)
    } else {
      const maxOrder = frameDesigns.length ? Math.max(...frameDesigns.map((d) => d.sort_order)) + 1 : 0
      await supabase.from('frame_designs').insert({ ...data, sort_order: maxOrder })
    }
    await loadFrameDesigns()
  }

  const deleteFrameDesign = async (id: string) => {
    if (!supabase) return
    await supabase.from('frame_designs').delete().eq('id', id)
    setFrameDesigns((prev) => prev.filter((d) => d.id !== id))
  }

  const toggleFrameDesignVisible = async (id: string, visible: boolean) => {
    if (!supabase) return
    await supabase.from('frame_designs').update({ visible }).eq('id', id)
    setFrameDesigns((prev) => prev.map((d) => (d.id === id ? { ...d, visible } : d)))
  }

  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
    onLogout()
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#F0EDE8]">
      {/* Top bar */}
      <header className="border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0C0C0C]/95 backdrop-blur-sm z-30">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-[#C8A96E]/30 flex items-center justify-center">
            <span className="font-display font-bold text-[#C8A96E] text-sm">D</span>
          </div>
          <span className="font-display font-semibold text-sm">Portfolio Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#/" className="text-xs text-[#383838] hover:text-[#555555] transition-colors">
            View Site →
          </a>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs text-[#383838] hover:text-[#F0EDE8] transition-colors">
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-[#1A1A1A]">
          {([
            ['projects',     'Projects',      projects.length],
            ['frameDesigns', 'Frame Designs', frameDesigns.length],
            ['testimonials', 'Testimonials',  testimonials.length],
          ] as const).map(([key, label, count]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
                tab === key
                  ? 'border-[#C8A96E] text-[#C8A96E]'
                  : 'border-transparent text-[#383838] hover:text-[#555555]'
              }`}
            >
              {label}
              <span className="ml-2 text-[10px] tabular-nums">{count}</span>
            </button>
          ))}
        </div>

        {/* ── Projects tab ── */}
        {tab === 'projects' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-semibold text-[#F0EDE8]">Projects</h2>
                <p className="text-[11px] text-[#383838] mt-0.5">Drag rows to reorder card placement on the portfolio</p>
              </div>
              <div className="flex gap-2">
                <button onClick={loadProjects} className="p-2 border border-[#1E1E1E] text-[#383838] hover:text-[#F0EDE8] transition-colors">
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setEditProject(null)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#F0EDE8] text-[#0C0C0C] font-semibold text-xs hover:bg-[#C8A96E] transition-colors"
                >
                  <Plus size={13} /> Add Project
                </button>
              </div>
            </div>

            {loading ? (
              <p className="text-[#383838] text-sm py-10 text-center">Loading…</p>
            ) : projects.length === 0 ? (
              <div className="border border-dashed border-[#1E1E1E] py-16 text-center">
                <p className="text-[#2E2E2E] text-sm mb-4">No projects yet</p>
                <button onClick={() => setEditProject(null)}
                  className="text-xs text-[#C8A96E]/70 hover:text-[#C8A96E] transition-colors">
                  + Add your first project
                </button>
              </div>
            ) : (
              <div className="border border-[#1A1A1A] overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#1A1A1A]">
                      <th className="pl-3 py-2 w-8" />
                      <th className="py-2 pr-3 w-14" />
                      <th className="py-2 pr-4 text-[10px] text-[#2E2E2E] tracking-[0.15em] uppercase">Title</th>
                      <th className="py-2 pr-4 text-[10px] text-[#2E2E2E] tracking-[0.15em] uppercase hidden md:table-cell">Section</th>
                      <th className="py-2 pr-4 text-[10px] text-[#2E2E2E] tracking-[0.15em] uppercase hidden lg:table-cell">Year</th>
                      <th className="py-2 pr-4 w-5 hidden lg:table-cell" />
                      <th className="py-2 pr-4 w-24" />
                    </tr>
                  </thead>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                      <tbody>
                        {projects.map((p) => (
                          <SortableRow
                            key={p.id}
                            project={p}
                            onEdit={(proj) => setEditProject(proj)}
                            onDelete={(id) => setDeleteConfirm(id)}
                            onToggleVisible={toggleVisible}
                          />
                        ))}
                      </tbody>
                    </SortableContext>
                  </DndContext>
                </table>
              </div>
            )}
          </>
        )}

        {/* ── Frame Designs tab ── */}
        {tab === 'frameDesigns' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-semibold text-[#F0EDE8]">Frame Designs</h2>
                <p className="text-[11px] text-[#383838] mt-0.5">
                  Thumbnails, frames, and graphic designs shown between Recent Works and Old Videos
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={loadFrameDesigns} className="p-2 border border-[#1E1E1E] text-[#383838] hover:text-[#F0EDE8] transition-colors">
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setEditFrameDesign(null)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#F0EDE8] text-[#0C0C0C] font-semibold text-xs hover:bg-[#C8A96E] transition-colors"
                >
                  <Plus size={13} /> Add Design
                </button>
              </div>
            </div>

            {frameDesigns.length === 0 ? (
              <div className="border border-dashed border-[#1E1E1E] py-16 text-center">
                <Image size={28} className="text-[#1E1E1E] mx-auto mb-4" />
                <p className="text-[#2E2E2E] text-sm mb-4">No frame designs yet</p>
                <button
                  onClick={() => setEditFrameDesign(null)}
                  className="text-xs text-[#C8A96E]/70 hover:text-[#C8A96E] transition-colors"
                >
                  + Upload your first design
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {frameDesigns.map((d) => (
                  <div
                    key={d.id}
                    className="border border-[#1A1A1A] hover:border-[#252525] transition-colors group"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video bg-[#0A0A0A] overflow-hidden relative">
                      <img
                        src={d.image_url}
                        alt={d.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
                      />
                      {!d.visible && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-[10px] text-[#555555] tracking-[0.15em] uppercase">Hidden</span>
                        </div>
                      )}
                    </div>

                    {/* Info + actions */}
                    <div className="p-3">
                      <div className="text-[10px] text-[#C8A96E]/70 tracking-[0.15em] uppercase mb-0.5">
                        {d.category}
                      </div>
                      <div className="text-xs text-[#C8C8C8] truncate">{d.title}</div>

                      <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleFrameDesignVisible(d.id, !d.visible)}
                          className="flex-1 py-1 text-[10px] border border-[#1E1E1E] text-[#383838] hover:text-[#F0EDE8] transition-colors tracking-[0.1em] uppercase"
                        >
                          {d.visible ? 'Hide' : 'Show'}
                        </button>
                        <button
                          onClick={() => setEditFrameDesign(d)}
                          className="p-1.5 text-[#383838] hover:text-[#C8A96E] transition-colors border border-[#1E1E1E]"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => deleteFrameDesign(d.id)}
                          className="p-1.5 text-[#383838] hover:text-red-400 transition-colors border border-[#1E1E1E]"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Testimonials tab ── */}
        {tab === 'testimonials' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-semibold text-[#F0EDE8]">Testimonials</h2>
                <p className="text-[11px] text-[#383838] mt-0.5">Client reviews shown in the Testimonials section</p>
              </div>
              <button
                onClick={() => setEditTestimonial(null)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F0EDE8] text-[#0C0C0C] font-semibold text-xs hover:bg-[#C8A96E] transition-colors"
              >
                <Plus size={13} /> Add Testimonial
              </button>
            </div>

            {testimonials.length === 0 ? (
              <div className="border border-dashed border-[#1E1E1E] py-16 text-center">
                <p className="text-[#2E2E2E] text-sm">No testimonials yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="border border-[#1A1A1A] p-5 flex items-start gap-4 group hover:border-[#252525] transition-colors">
                    <Quote size={16} className="text-[#C8A96E]/40 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#555555] text-sm leading-relaxed line-clamp-2">"{t.content}"</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm font-medium text-[#C8C8C8]">{t.name}</span>
                        <span className="text-xs text-[#C8A96E]">{t.role}</span>
                        <span className="text-xs text-[#383838]">{t.platform}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button onClick={() => setEditTestimonial(t)}
                        className="p-1.5 text-[#383838] hover:text-[#C8A96E] transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => deleteTestimonial(t.id)}
                        className="p-1.5 text-[#383838] hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Delete confirmation ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#0F0F0F] border border-[#1E1E1E] p-8 max-w-sm w-full text-center">
            <p className="text-[#F0EDE8] font-semibold mb-2">Delete this project?</p>
            <p className="text-xs text-[#555555] mb-7">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-[#1E1E1E] text-[#555555] text-sm hover:text-[#F0EDE8] transition-colors">
                Cancel
              </button>
              <button onClick={() => deleteProject(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-900/60 text-red-300 text-sm hover:bg-red-900 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Project form modal ── */}
      {editProject !== undefined && (
        <ProjectFormModal
          initial={editProject}
          onSave={saveProject}
          onClose={() => setEditProject(undefined)}
        />
      )}

      {/* ── Testimonial form modal ── */}
      {editTestimonial !== undefined && (
        <TestimonialForm
          initial={editTestimonial}
          onSave={saveTestimonial}
          onClose={() => setEditTestimonial(undefined)}
        />
      )}

      {/* ── Frame Design form modal ── */}
      {editFrameDesign !== undefined && (
        <FrameDesignFormModal
          initial={editFrameDesign}
          onSave={saveFrameDesign}
          onClose={() => setEditFrameDesign(undefined)}
        />
      )}
    </div>
  )
}
