import { useEffect, useState } from 'react'
import { supabase, isConfigured } from '../lib/supabase'
import { projects as fallbackProjects, testimonials as fallbackTestimonials, frameDesigns as fallbackFrameDesigns } from '../data/projects'
import type { Project, Testimonial, FrameDesign } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProject(r: any): Project {
  return {
    id:          r.id,
    title:       r.title,
    client:      r.client,
    year:        r.year,
    era:         r.era,
    format:      r.format,
    thumbnail:   r.thumbnail ?? '',
    videoType:   r.video_type,
    videoId:     r.video_id,
    description: r.description ?? '',
    tags:        r.tags ?? [],
    featured:    r.featured ?? false,
    duration:    r.duration ?? undefined,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toTestimonial(r: any): Testimonial {
  return {
    id:       r.id,
    name:     r.name,
    role:     r.role,
    platform: r.platform,
    content:  r.content,
    avatar:   r.avatar ?? undefined,
  }
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [loading,  setLoading]  = useState(isConfigured)

  useEffect(() => {
    if (!isConfigured || !supabase) { setLoading(false); return }
    supabase
      .from('projects')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data?.length) setProjects(data.map(toProject))
        setLoading(false)
      })
  }, [])

  return { projects, loading }
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)

  useEffect(() => {
    if (!isConfigured || !supabase) return
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data?.length) setTestimonials(data.map(toTestimonial))
      })
  }, [])

  return { testimonials }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toFrameDesign(r: any): FrameDesign {
  return {
    id:          r.id,
    title:       r.title,
    description: r.description ?? undefined,
    imageUrl:    r.image_url,
    category:    r.category ?? 'Design',
  }
}

export function useFrameDesigns() {
  const [designs, setDesigns] = useState<FrameDesign[]>(fallbackFrameDesigns)

  useEffect(() => {
    if (!isConfigured || !supabase) return
    supabase
      .from('frame_designs')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setDesigns(data.map(toFrameDesign))
      })
  }, [])

  return { designs }
}
