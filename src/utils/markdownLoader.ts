/**
 * This utility helps load markdown files dynamically
 */

interface PostMeta {
  title?: string;
  date?: string;
  excerpt?: string;
  [key: string]: string | undefined;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  path: string;
}

// Function to get all blog posts
export async function getBlogPosts(): Promise<Post[]> {
  const blogModules = import.meta.glob('/src/content/blogs/*.md', { query: '?raw', import: 'default' });
  
  const blogPosts = await Promise.all(
    Object.entries(blogModules).map(async ([path, loadModule]) => {
      const content = await loadModule() as string;
      const fileName = path.split('/').pop()?.replace('.md', '') || '';
      
      // Extract metadata from markdown (assuming frontmatter format)
      const metaMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const meta = metaMatch ? parseYamlFrontMatter(metaMatch[1]) : {};
      
      return {
        id: fileName,
        title: meta.title || fileName,
        date: meta.date || 'Unknown date',
        excerpt: meta.excerpt || content.substring(content.indexOf('---', 3) + 3).trim().substring(0, 150) + '...',
        content,
        path: `/blog/${fileName}`,
      };
    })
  );
  
  // Sort by date (newest first)
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Function to get all news posts
export async function getNewsPosts(): Promise<Post[]> {
  const newsModules = import.meta.glob('/src/content/news/*.md', { query: '?raw', import: 'default' });
  
  const newsPosts = await Promise.all(
    Object.entries(newsModules).map(async ([path, loadModule]) => {
      const content = await loadModule() as string;
      const fileName = path.split('/').pop()?.replace('.md', '') || '';
      
      // Extract metadata from markdown (assuming frontmatter format)
      const metaMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const meta = metaMatch ? parseYamlFrontMatter(metaMatch[1]) : {};
      
      return {
        id: fileName,
        title: meta.title || fileName,
        date: meta.date || 'Unknown date',
        excerpt: meta.excerpt || content.substring(content.indexOf('---', 3) + 3).trim().substring(0, 20) + '...',
        content,
        path: `/news/${fileName}`,
      };
    })
  );
  
  // Sort by date (newest first)
  return newsPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Simple YAML frontmatter parser
function parseYamlFrontMatter(text: string): PostMeta {
  const result: PostMeta = {};
  const lines = text.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      result[key] = value.trim();
    }
  }
  
  return result;
}
