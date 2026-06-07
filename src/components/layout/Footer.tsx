import { Youtube, Instagram, Linkedin, Github, Mail } from 'lucide-react'

const socials = [
  { icon: Youtube,   href: '#',                              label: 'YouTube'   },
  { icon: Instagram, href: '#',                              label: 'Instagram' },
  { icon: Linkedin,  href: '#',                              label: 'LinkedIn'  },
  { icon: Github,    href: 'https://github.com/deepjotiacharjee9', label: 'GitHub' },
  { icon: Mail,      href: 'mailto:rabbanideep@gmail.com',   label: 'Email'     },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#383838]">
          © {new Date().getFullYear()} Deepjoti Acharjee. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#383838] hover:text-[#C8A96E] transition-colors duration-200"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <p className="text-[10px] text-[#2A2A2A] tracking-[0.3em] uppercase">
          Crafted with intent
        </p>
      </div>
    </footer>
  )
}
