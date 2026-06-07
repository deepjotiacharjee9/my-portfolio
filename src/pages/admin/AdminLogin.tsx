import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { LogIn, Eye, EyeOff } from 'lucide-react'

interface Props { onLogin: () => void }

export default function AdminLogin({ onLogin }: Props) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) { setError('Supabase not configured — add .env keys.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false) }
    else onLogin()
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-[#C8A96E]/30 mb-4">
            <span className="font-display font-bold text-[#C8A96E] text-xl">D</span>
          </div>
          <h1 className="font-display font-semibold text-[#F0EDE8] text-lg">Admin Panel</h1>
          <p className="text-[11px] text-[#383838] tracking-[0.2em] uppercase mt-1">Portfolio Manager</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-[11px] text-[#333333] tracking-[0.2em] uppercase mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[#0F0F0F] border border-[#1E1E1E] text-[#F0EDE8] text-sm px-4 py-3 placeholder-[#2E2E2E] focus:outline-none focus:border-[#C8A96E]/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#333333] tracking-[0.2em] uppercase mb-2">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0F0F0F] border border-[#1E1E1E] text-[#F0EDE8] text-sm px-4 py-3 pr-11 placeholder-[#2E2E2E] focus:outline-none focus:border-[#C8A96E]/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#383838] hover:text-[#666666] transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400/80 border border-red-900/30 bg-red-900/10 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#F0EDE8] text-[#0C0C0C] font-semibold text-sm tracking-wide hover:bg-[#C8A96E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 mt-2"
          >
            {loading ? 'Signing in…' : <><LogIn size={15} /> Sign In</>}
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] text-[#252525]">
          ← <a href="#/" className="hover:text-[#383838] transition-colors">Back to portfolio</a>
        </p>
      </div>
    </div>
  )
}
