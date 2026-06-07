interface Props {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: Props) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[11px] text-[#C8A96E]">{number}</span>
      <span className="h-px w-6 bg-[#252525] block" />
      <span className="text-[11px] text-[#444444] tracking-[0.25em] uppercase">{label}</span>
    </div>
  )
}
