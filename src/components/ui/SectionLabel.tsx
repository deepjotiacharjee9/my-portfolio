interface Props {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: Props) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[11px] text-[#60A5FA]">{number}</span>
      <span className="h-px w-6 bg-[rgba(96,165,250,0.20)] block" />
      <span className="text-[11px] text-[rgba(148,163,184,0.70)] tracking-[0.25em] uppercase">{label}</span>
    </div>
  )
}
