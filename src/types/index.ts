export interface Project {
  id: string
  title: string
  client: string
  year: number
  /** 'recent' shows under "Recent Works", 'old' shows under "Old Videos" */
  era: 'recent' | 'old'
  /** 'short-form' = Reels/Shorts/clips; 'long-form' = full-length videos */
  format: 'short-form' | 'long-form'
  /** Direct URL to a custom thumbnail image, or leave empty to auto-generate */
  thumbnail: string
  videoType: 'drive' | 'youtube'
  /**
   * Google Drive: the file ID from the share URL
   *   https://drive.google.com/file/d/FILE_ID/view  →  FILE_ID
   *
   * YouTube: the video ID from the watch URL
   *   https://www.youtube.com/watch?v=VIDEO_ID      →  VIDEO_ID
   */
  videoId: string
  description: string
  tags: string[]
  featured: boolean
  /** Display duration, e.g. "22:14" */
  duration?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  platform: string
  content: string
  avatar?: string
}

export interface FrameDesign {
  id: string
  title: string
  description?: string
  imageUrl: string
  category: string
}
