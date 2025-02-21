import { Article, ArticleMetadata } from '../types/article';

interface ArticleFrontmatter {
  id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  [key: string]: string | string[] | undefined; // Add index signature
}

class ArticleService {
  private articles: Map<string, Article> = new Map();
  private metadata: ArticleMetadata[] = [];
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.init();
  }

  private async init() {
    try {
      console.log('Starting initialization...'); // Debug log
      await this.loadArticles();
    } catch (error) {
      console.error('Error in init:', error);
      throw error;
    }
  }

  private parseFrontMatter(content: string): { data: ArticleFrontmatter; content: string } {
    try {
      // Ensure we're working with unix-style line endings
      const normalizedContent = content.replace(/\r\n/g, '\n');
      
      // More precise frontmatter regex that ensures proper boundaries
      const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
      const matches = normalizedContent.match(frontMatterRegex);
      
      if (!matches) {
        console.error('Content does not match frontmatter pattern:', normalizedContent.substring(0, 100));
        throw new Error('Invalid frontmatter format');
      }

      const [, frontMatterStr, markdownContent] = matches;
      const frontMatterLines = frontMatterStr.split('\n');
      const data: ArticleFrontmatter = {} as ArticleFrontmatter;

      frontMatterLines.forEach(line => {
        // Skip empty lines
        if (!line.trim()) return;
        
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;
        
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        
        // Handle array values (e.g., tags: [tag1, tag2])
        if (value.startsWith('[') && value.endsWith(']')) {
          const arrayStr = value.slice(1, -1);
          const arrayValue = arrayStr.split(',').map(v => {
            // Remove quotes and trim whitespace
            return v.trim().replace(/^["']|["']$/g, '');
          });
          data[key as keyof ArticleFrontmatter] = arrayValue;
        } else {
          // Handle string values
          value = value.replace(/^["']|["']$/g, ''); // Remove quotes if present
          data[key as keyof ArticleFrontmatter] = value;
        }
      });

      // Validate required fields
      const requiredFields: (keyof ArticleFrontmatter)[] = ['id', 'title', 'slug', 'description', 'author', 'date', 'readTime'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        console.error('Missing required frontmatter fields:', missingFields);
        throw new Error(`Missing required frontmatter fields: ${missingFields.join(', ')}`);
      }

      return {
        data,
        content: markdownContent.trim()
      };
    } catch (error) {
      console.error('Error parsing front matter:', error);
      throw error;
    }
  }

  private async loadArticles() {
    try {
      console.log('Starting to load articles...'); // Debug log

      // Import markdown files using development path
      const devMarkdownFiles = import.meta.glob('../content/articles/*.md', { 
        query: '?raw',
        import: 'default',
        eager: true 
      });
      
      console.log('Dev markdown files found:', Object.keys(devMarkdownFiles));

      // Process development files
      for (const [path, content] of Object.entries(devMarkdownFiles)) {
        if (typeof content === 'string') {
          await this.processArticle(path, content);
        }
      }

      // If we're in production and no files were found, try the production path
      if (Object.keys(devMarkdownFiles).length === 0) {
        console.log('Trying production path...');
        try {
          const prodMarkdownFiles = import.meta.glob('/content/articles/*.md', { 
            query: '?raw',
            import: 'default',
            eager: true 
          });

          for (const [path, content] of Object.entries(prodMarkdownFiles)) {
            if (typeof content === 'string') {
              await this.processArticle(path, content);
            }
          }
        } catch (error) {
          console.error('Error loading production files:', error);
        }
      }
      
      if (this.metadata.length === 0) {
        console.warn('No articles were loaded successfully');
        // Final fallback: try direct fetch
        try {
          const files = await fetch('/content/articles/').then(res => res.text());
          const parser = new DOMParser();
          const doc = parser.parseFromString(files, 'text/html');
          const links = Array.from(doc.querySelectorAll('a'))
            .map(a => a.href)
            .filter(href => href.endsWith('.md'));
          
          for (const link of links) {
            const response = await fetch(link);
            if (response.ok) {
              const content = await response.text();
              await this.processArticle(link, content);
            }
          }
        } catch (error) {
          console.error('Error in final fallback:', error);
        }
      } else {
        console.log(`Successfully loaded ${this.metadata.length} articles`);
      }
      
      // Sort metadata by date
      this.metadata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log('Final metadata array:', this.metadata);
    } catch (error) {
      console.error('Error loading articles:', error);
      throw error;
    }
  }

  private async processArticle(path: string, content: string) {
    try {
      // Extract slug from path (e.g., '../content/articles/sample-article.md' -> 'sample-article')
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      console.log(`Processing article: ${slug} from path: ${path}`); // Debug log

      // Remove any BOM characters that might be present at the start of the content
      const cleanContent = content.replace(/^\uFEFF/, '');
      
      const { data: frontmatter, content: articleContent } = this.parseFrontMatter(cleanContent);
      console.log(`Parsed frontmatter for ${slug}:`, frontmatter); // Debug log

      if (!frontmatter.title || !frontmatter.description) {
        console.warn(`Skipping article ${slug} due to missing required frontmatter`);
        return;
      }
      
      const article: Article = {
        ...frontmatter as ArticleMetadata,
        content: articleContent,
        slug: slug
      };
      
      this.articles.set(slug, article);
      this.metadata.push({
        ...frontmatter as ArticleMetadata,
        slug: slug
      });

      console.log(`Successfully loaded article: ${slug}`); // Debug log
    } catch (error) {
      console.error(`Error processing article from ${path}:`, error);
    }
  }

  public async getAllArticles(): Promise<Article[]> {
    await this.initialized;
    return Array.from(this.articles.values());
  }

  public async getAllMetadata(): Promise<ArticleMetadata[]> {
    await this.initialized;
    return this.metadata;
  }

  public async getArticleBySlug(slug: string): Promise<Article | undefined> {
    await this.initialized;
    return this.articles.get(slug);
  }

  public async getArticlesByTag(tag: string): Promise<ArticleMetadata[]> {
    await this.initialized;
    return this.metadata.filter(article => article.tags.includes(tag));
  }

  public async getRecentArticles(count: number = 3): Promise<ArticleMetadata[]> {
    await this.initialized;
    return this.metadata.slice(0, count);
  }
}

export const articleService = new ArticleService(); 