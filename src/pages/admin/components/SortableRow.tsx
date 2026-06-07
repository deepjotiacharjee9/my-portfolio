import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import type { ProjectRow } from './ProjectFormModal'

interface Props {
  project:      ProjectRow
  onEdit:       (p: ProjectRow) => void
  onDelete:     (id: string) => void
  onToggleVisible: (id: string, visible: boolean) => void
}

function autoThumb(p: ProjectRow): string {
  if (p.thumbnail) return p.thumbnail
  if (p.video_type === 'drive') return `https://drive.google.com/thumbnail?id=${p.video_id}&sz=w200`
  return `https://img.youtube.com/vi/${p.video_id}/mqdefault.jpg`
}

export default function SortableRow({ project, onEdit, onDelete, onToggleVisible }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-[#141414] hover:bg-[#111111] transition-colors group"
    >
      {/* Drag handle */}
      <td className="pl-3 py-3 w-8">
        <button
          {...attributes}
          {...listeners}
          className="text-[#252525] hover:text-[#555555] cursor-grab active:cursor-grabbing transition-colors touch-none"
        >
          <GripVertical size={16} />
        </button>
      </td>

      {/* Thumbnail */}
      <td className="py-3 pr-3 w-14">
        <div className="w-12 aspect-video bg-[#141414] overflow-hidden">
          <img
            src={autoThumb(project)}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          />
        </div>
      </td>

      {/* Title + client */}
      <td className="py-3 pr-4 max-w-[200px]">
        <p className="text-sm text-[#C8C8C8] truncate">{project.title}</p>
        <p className="text-[11px] text-[#383838] truncate mt-0.5">{project.client}</p>
      </td>

      {/* Badges */}
      <td className="py-3 pr-4 hidden md:table-cell">
        <div className="flex flex-col gap-1">
          <span className={`inline-block px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border w-fit ${
            project.era === 'recent'
              ? 'border-[#C8A96E]/30 text-[#C8A96E]'
              : 'border-[#252525] text-[#444444]'
          }`}>
            {project.era === 'recent' ? 'Recent' : 'Old'}
          </span>
          <span className="inline-block px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-[#1E1E1E] text-[#383838] w-fit">
            {project.format === 'short-form' ? 'Short' : 'Long'}
          </span>
        </div>
      </td>

      {/* Year */}
      <td className="py-3 pr-4 hidden lg:table-cell">
        <span className="text-xs text-[#383838] tabular-nums">{project.year}</span>
      </td>

      {/* Featured dot */}
      <td className="py-3 pr-4 hidden lg:table-cell">
        {project.featured && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] inline-block" title="Featured" />
        )}
      </td>

      {/* Actions */}
      <td className="py-3 pr-4">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleVisible(project.id, !project.visible)}
            title={project.visible ? 'Hide from site' : 'Show on site'}
            className={`p-1.5 rounded transition-colors ${
              project.visible
                ? 'text-[#383838] hover:text-[#F0EDE8]'
                : 'text-red-500/60 hover:text-red-400'
            }`}
          >
            {project.visible ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
          <button
            onClick={() => onEdit(project)}
            className="p-1.5 rounded text-[#383838] hover:text-[#C8A96E] transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-1.5 rounded text-[#383838] hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}
