/**
 * This utility helps load sticker files dynamically
 */

export interface Sticker {
  id: string;
  name: string;
  path: string;
  format: 'svg' | 'jpg' | 'png' | 'gif';
  url: string;
}

// Function to get all stickers
export async function getStickers(): Promise<Sticker[]> {
  // Import all sticker files from the stickers directory
  const stickerModules = import.meta.glob('/src/content/stickers/*.{svg,jpg,png,gif}', { 
    eager: true, 
    import: 'default',
    as: 'url'
  });
  
  const stickers = Object.entries(stickerModules).map(([path, url]) => {
    const fileName = path.split('/').pop() || '';
    const name = fileName.substring(0, fileName.lastIndexOf('.'));
    const format = fileName.split('.').pop() as 'svg' | 'jpg' | 'png' | 'gif';
    
    return {
      id: name,
      name: name,
      path: path,
      format: format,
      url: url as string
    };
  });
  
  // Sort alphabetically by name
  return stickers.sort((a, b) => a.name.localeCompare(b.name));
}
