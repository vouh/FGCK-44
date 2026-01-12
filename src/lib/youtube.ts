/**
 * Utility functions for YouTube URL parsing and thumbnail extraction.
 */

/**
 * Extracts the 11-character YouTube video ID from various URL formats.
 * Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 */
export function getYoutubeId(url: string | undefined | null): string | null {
  if (!url) return null;
  
  // Regular expression to match various YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  
  return match ? match[1] : null;
}

/**
 * Gets a reliable YouTube thumbnail URL.
 * Defaults to hqdefault.jpg as it is almost always available.
 * maxresdefault.jpg is higher quality but not always present.
 */
export function getYoutubeThumbnail(url: string | undefined | null, quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'default' = 'hqdefault'): string | undefined {
  const id = getYoutubeId(url);
  if (!id) return undefined;
  
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

/**
 * Gets the embed URL for a YouTube video.
 */
export function getYoutubeEmbedUrl(url: string | undefined | null): string | undefined {
  const id = getYoutubeId(url);
  if (!id) return undefined;
  
  return `https://www.youtube.com/embed/${id}`;
}
