import { useState, useEffect } from 'react'
import { supabase, isConfigured } from '../lib/supabase'

export interface SiteSettings {
  aboutPhotoUrl: string
  showreelVideoId: string
  showreelVideoType: 'drive' | 'youtube'
}

const DEFAULTS: SiteSettings = {
  aboutPhotoUrl: '',
  showreelVideoId: '',
  showreelVideoType: 'drive',
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS)

  useEffect(() => {
    if (!isConfigured || !supabase) return
    supabase
      .from('site_settings')
      .select('key, value')
      .then(({ data }) => {
        if (!data) return
        const map: Record<string, string> = {}
        data.forEach((r: { key: string; value: string }) => { map[r.key] = r.value })
        setSettings({
          aboutPhotoUrl:     map['about_photo_url']    ?? '',
          showreelVideoId:   map['showreel_video_id']  ?? '',
          showreelVideoType: (map['showreel_video_type'] as 'drive' | 'youtube') || 'drive',
        })
      })
  }, [])

  return { settings }
}
