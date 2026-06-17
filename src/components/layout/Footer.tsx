export default function Footer() {
  return (
    <footer className="border-t border-[rgba(96,165,250,0.12)] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[rgba(148,163,184,0.82)]">
          © {new Date().getFullYear()} Deepjoti Acharjee. All rights reserved.
        </p>

        <p className="text-[10px] text-[rgba(148,163,184,0.60)] tracking-[0.3em] uppercase">
          Crafted with intent
        </p>
      </div>
    </footer>
  )
}
