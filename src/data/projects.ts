import type { Project, Testimonial } from '../types'

/**
 * HOW TO ADD YOUR PROJECTS
 * ─────────────────────────────────────────────────────────────────
 *
 * era:    'recent' → shows under "Recent Works"
 *         'old'   → shows under "Old Videos"
 *
 * format: 'short-form' → Reels, Shorts, clips under 5 min
 *         'long-form'  → full-length videos, docs, podcasts
 *
 * Google Drive video:
 *   Share URL: https://drive.google.com/file/d/FILE_ID/view
 *   Copy FILE_ID → set videoType: 'drive', videoId: 'FILE_ID'
 *
 * YouTube video:
 *   URL: https://www.youtube.com/watch?v=VIDEO_ID
 *   Copy VIDEO_ID → set videoType: 'youtube', videoId: 'VIDEO_ID'
 *
 * Thumbnail: Leave empty ('') to auto-generate from Drive/YouTube.
 * ─────────────────────────────────────────────────────────────────
 */

export const projects: Project[] = [

  // ── RECENT WORKS › SHORT FORM ──────────────────────────────────
  {
    id: 'r-s-1',
    title: 'Brand Reel — Summer Campaign',
    client: 'Client Name',
    year: 2024,
    era: 'recent',
    format: 'short-form',
    thumbnail: '',
    videoType: 'drive',
    videoId: 'YOUR_DRIVE_FILE_ID',
    description: 'A punchy 60-second brand reel for a summer product launch.',
    tags: ['Reel', 'Color Grade', 'Motion'],
    featured: true,
    duration: '0:58',
  },
  {
    id: 'r-s-2',
    title: 'Instagram Reel Pack',
    client: 'Creator Channel',
    year: 2024,
    era: 'recent',
    format: 'short-form',
    thumbnail: '',
    videoType: 'youtube',
    videoId: 'YOUR_YOUTUBE_VIDEO_ID',
    description: 'Series of 30-second reels edited for maximum retention.',
    tags: ['Reels', 'Trending'],
    featured: false,
    duration: '0:31',
  },
  {
    id: 'r-s-3',
    title: 'YouTube Short — Travel Cut',
    client: 'Travel Creator',
    year: 2024,
    era: 'recent',
    format: 'short-form',
    thumbnail: '',
    videoType: 'drive',
    videoId: 'YOUR_DRIVE_FILE_ID',
    description: 'Fast-cut travel short with sync cuts and color grade.',
    tags: ['YouTube Short', 'Travel'],
    featured: false,
    duration: '0:45',
  },

  // ── RECENT WORKS › LONG FORM ───────────────────────────────────
  {
    id: 'r-l-1',
    title: 'The Creator Documentary',
    client: 'YouTube Channel',
    year: 2024,
    era: 'recent',
    format: 'long-form',
    thumbnail: '',
    videoType: 'youtube',
    videoId: 'YOUR_YOUTUBE_VIDEO_ID',
    description: 'A 45-minute deep dive into the creator economy in India.',
    tags: ['Documentary', 'Long-form', 'YouTube'],
    featured: true,
    duration: '45:02',
  },
  {
    id: 'r-l-2',
    title: 'Podcast — Full Episode Edit',
    client: 'The Deep Dive Podcast',
    year: 2024,
    era: 'recent',
    format: 'long-form',
    thumbnail: '',
    videoType: 'drive',
    videoId: 'YOUR_DRIVE_FILE_ID',
    description: 'Full 60-minute podcast episode with chapters and graphics.',
    tags: ['Podcast', 'Retention Edit'],
    featured: false,
    duration: '1:02:18',
  },
  {
    id: 'r-l-3',
    title: 'Masterclass Video',
    client: 'Creator Academy',
    year: 2024,
    era: 'recent',
    format: 'long-form',
    thumbnail: '',
    videoType: 'youtube',
    videoId: 'YOUR_YOUTUBE_VIDEO_ID',
    description: 'Structured 55-minute masterclass edited for engagement.',
    tags: ['Education', 'Long-form'],
    featured: false,
    duration: '55:30',
  },

  // ── OLD VIDEOS › SHORT FORM ────────────────────────────────────
  {
    id: 'o-s-1',
    title: 'Product Launch Teaser',
    client: 'Brand Name',
    year: 2022,
    era: 'old',
    format: 'short-form',
    thumbnail: '',
    videoType: 'drive',
    videoId: 'YOUR_DRIVE_FILE_ID',
    description: '30-second teaser for a product launch event.',
    tags: ['Teaser', 'Brand'],
    featured: false,
    duration: '0:30',
  },
  {
    id: 'o-s-2',
    title: 'Event Highlights Reel',
    client: 'Event Agency',
    year: 2022,
    era: 'old',
    format: 'short-form',
    thumbnail: '',
    videoType: 'youtube',
    videoId: 'YOUR_YOUTUBE_VIDEO_ID',
    description: '90-second highlights from a corporate event.',
    tags: ['Highlights', 'Event'],
    featured: false,
    duration: '1:30',
  },

  // ── OLD VIDEOS › LONG FORM ─────────────────────────────────────
  {
    id: 'o-l-1',
    title: 'Voices from the Valley',
    client: 'Independent Film',
    year: 2022,
    era: 'old',
    format: 'long-form',
    thumbnail: '',
    videoType: 'drive',
    videoId: 'YOUR_DRIVE_FILE_ID',
    description: 'Documentary following weavers in Assam keeping a dying craft alive.',
    tags: ['Documentary', 'Color Grade'],
    featured: false,
    duration: '31:55',
  },
  {
    id: 'o-l-2',
    title: 'Ground Zero',
    client: 'News Channel',
    year: 2021,
    era: 'old',
    format: 'long-form',
    thumbnail: '',
    videoType: 'drive',
    videoId: 'YOUR_DRIVE_FILE_ID',
    description: 'Field documentary on grassroots climate action in rural Maharashtra.',
    tags: ['Documentary', 'News'],
    featured: false,
    duration: '18:40',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    role: 'YouTube Creator',
    platform: '2.4M subscribers',
    content: 'Deepjoti transformed my raw footage into something I didn\'t know was possible. The pacing, the sound design, the cuts — everything felt intentional and powerful. My average view duration went up 40% after working with him.',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Podcast Host & Filmmaker',
    platform: 'The Deep Dive Podcast',
    content: 'I was skeptical that a video editor could understand the nuance of documentary storytelling, but Deepjoti proved me completely wrong. He doesn\'t just cut — he thinks about narrative arc before he touches a single clip.',
  },
  {
    id: '3',
    name: 'Rahul Verma',
    role: 'Content Creator',
    platform: '890K subscribers',
    content: 'Working with Deepjoti feels like having a co-director. He brings ideas I never thought of and executes them flawlessly. Turnaround is always on time, quality is always above expectation.',
  },
]
