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
  [key: string]: string | string[] | undefined;
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
      await this.loadArticles();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Error in init: ${errorMessage}`);
    }
  }

  private parseFrontMatter(content: string): { data: ArticleFrontmatter; content: string } {
    // Ensure we're working with unix-style line endings
    const normalizedContent = content.replace(/\r\n/g, '\n');
    
    // More precise frontmatter regex that ensures proper boundaries
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const matches = normalizedContent.match(frontMatterRegex);
    
    if (!matches) {
      throw new Error('Invalid frontmatter format');
    }

    const [, frontMatterStr, markdownContent] = matches;
    const frontMatterLines = frontMatterStr.split('\n');
    const data: ArticleFrontmatter = {} as ArticleFrontmatter;

    frontMatterLines.forEach(line => {
      if (!line.trim()) return;
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) return;
      
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayStr = value.slice(1, -1);
        const arrayValue = arrayStr.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        data[key as keyof ArticleFrontmatter] = arrayValue;
      } else {
        value = value.replace(/^["']|["']$/g, '');
        data[key as keyof ArticleFrontmatter] = value;
      }
    });

    const requiredFields: (keyof ArticleFrontmatter)[] = ['id', 'title', 'slug', 'description', 'author', 'date', 'readTime'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required frontmatter fields: ${missingFields.join(', ')}`);
    }

    return {
      data,
      content: markdownContent.trim()
    };
  }

  private async loadDevArticles() {
    try {
      const files = import.meta.glob('../content/articles/*.md', {
        eager: true,
        as: 'raw'
      });
      if (Object.keys(files).length === 0) {
        throw new Error('No markdown files found in development path');
      }
      return files;
    } catch (error) {
      throw new Error(`Failed to load dev articles: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async loadProdArticles() {
    try {
      const files = import.meta.glob('./content/articles/*.md', {
        eager: true,
        as: 'raw'
      });
      if (Object.keys(files).length === 0) {
        throw new Error('No markdown files found in production path');
      }
      return files;
    } catch (error) {
      throw new Error(`Failed to load prod articles: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async loadArticles() {
    try {
      let markdownFiles;
      if (import.meta.env.DEV) {
        markdownFiles = await this.loadDevArticles();
      } else {
        markdownFiles = await this.loadProdArticles();
      }

      if (!markdownFiles || Object.keys(markdownFiles).length === 0) {
        throw new Error('No markdown files found');
      }

      const processedArticles = await Promise.all(
        Object.entries(markdownFiles).map(async ([path, content]) => {
          const slug = path.replace(/^.*[/\\]/, '').replace(/\.md$/, '');
          const { data: frontmatter, content: body } = this.parseFrontMatter(content as string);
          
          return {
            id: frontmatter.id,
            slug,
            title: frontmatter.title,
            description: frontmatter.description,
            author: frontmatter.author,
            date: frontmatter.date,
            readTime: frontmatter.readTime,
            tags: frontmatter.tags,
            content: body
          };
        })
      );

      this.metadata = processedArticles;
      this.articles = new Map(processedArticles.map(article => [article.slug, article]));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to load articles: ${errorMessage}`);
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