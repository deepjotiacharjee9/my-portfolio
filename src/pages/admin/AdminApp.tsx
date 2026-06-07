import { useEffect, useState } from 'react'
import { supabase, isConfigured } from '../../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import CustomCursor from '../../components/ui/CustomCursor'

export default function AdminApp() {
  const [authed,   setAuthed]   = useState(false)
  const [checking, setChecking] = useState(isConfigured)

  useEffect(() => {
    if (!isConfigured || !supabase) { setChecking(false); return }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(Boolean(data.session))
      setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(Boolean(session))
    })
    return () => subscription.unsubscribe()
  }, [])

  if (!isConfigured) {
    return (
      <>
        <CustomCursor />
        <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <div className="w-12 h-12 border border-[#C8A96E]/30 flex items-center justify-center mx-auto mb-6">
              <span className="font-display font-bold text-[#C8A96E] text-xl">D</span>
            </div>
            <h1 className="font-display font-semibold text-[#F0EDE8] mb-3">Supabase not configured</h1>
            <p className="text-sm text-[#555555] leading-relaxed mb-6">
              Create a <code className="text-[#C8A96E]">.env</code> file in the project root with your Supabase credentials.
            </p>
            <div className="bg-[#0F0F0F] border border-[#1E1E1E] p-4 text-left text-xs font-mono text-[#C8A96E] space-y-1">
              <div>VITE_SUPABASE_URL=https://xxxx.supabase.co</div>
              <div>VITE_SUPABASE_ANON_KEY=eyJhbGci...</div>
            </div>
            <p className="mt-4 text-xs text-[#383838]">Then restart the dev server.</p>
            <a href="#/" className="mt-6 inline-block text-xs text-[#383838] hover:text-[#555555] transition-colors">
              ← Back to portfolio
            </a>
          </div>
        </div>
      </>
    )
  }

  if (checking) {
    return (
      <>
        <CustomCursor />
        <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
          <div className="w-5 h-5 border border-[#C8A96E]/30 border-t-[#C8A96E] rounded-full animate-spin" />
        </div>
      </>
    )
  }

  if (!authed) {
    return (
      <>
        <CustomCursor />
        <AdminLogin onLogin={() => setAuthed(true)} />
      </>
    )
  }

  return (
    <>
      <CustomCursor />
      <AdminDashboard onLogout={() => setAuthed(false)} />
    </>
  )
}
