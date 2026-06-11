import { ICON_BODIES } from '../../data/toolIcons'
import type { IconData } from '../../data/toolIcons'

interface Tool {
  name:  string
  icon:  keyof typeof ICON_BODIES
  color?: string
}

const TOOLS: Tool[] = [
  { name: 'Premiere Pro',    icon: 'premierepro'                     },
  { name: 'After Effects',   icon: 'aftereffects'                    },
  { name: 'DaVinci Resolve', icon: 'davinciresolve', color: '#FFA200'},
  { name: 'Photoshop',       icon: 'photoshop'                       },
  { name: 'Figma',           icon: 'figma'                           },
  { name: 'Canva',           icon: 'canva',          color: '#00C4CC'},
  { name: 'ChatGPT',         icon: 'openai',         color: '#10A37F'},
  { name: 'Claude',          icon: 'claude'                          },
  { name: 'Gemini',          icon: 'gemini'                          },
  { name: 'ElevenLabs',      icon: 'elevenlabs',     color: '#F7941D'},
  { name: 'Midjourney',      icon: 'midjourney'                      },
  { name: 'Notion',          icon: 'notion',         color: '#FFFFFF'},
]

function BrandIcon({ icon, color }: { icon: Tool['icon']; color?: string }) {
  const data: IconData | undefined = ICON_BODIES[icon]
  if (!data) return null
  return (
    <svg
      width={15}
      height={15}
      viewBox={`0 0 ${data.w} ${data.h}`}
      style={{ color: color ?? 'currentColor', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: data.body }}
    />
  )
}

export default function ToolkitStrip() {
  return (
    <div className="border-t border-[rgba(96,165,250,0.08)] mt-10 flex items-stretch overflow-hidden">

      {/* Static label */}
      <div className="shrink-0 flex items-center gap-2.5 px-5 py-3 border-r border-[rgba(96,165,250,0.15)] bg-[rgba(96,165,250,0.04)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shrink-0" />
        <span className="text-[10px] text-[rgba(147,197,253,0.92)] tracking-[0.28em] uppercase font-semibold whitespace-nowrap">
          My Toolkit
        </span>
      </div>

      {/* Scrolling marquee */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center whitespace-nowrap animate-marquee no-select py-2.5">
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 mx-2.5 px-3 py-1.5 border border-[rgba(96,165,250,0.12)] bg-[rgba(255,255,255,0.025)] shrink-0"
            >
              <BrandIcon icon={tool.icon} color={tool.color} />
              <span className="text-[11px] text-[rgba(203,213,225,0.82)] tracking-[0.06em] font-medium">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
