export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl?: string;
  image?: string;
}

export interface ArticleMetadata {
  id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl?: string;
} 