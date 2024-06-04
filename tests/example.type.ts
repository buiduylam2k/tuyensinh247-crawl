export type Crawl = {
  title: string;
  slug: string;
  content: string;
  banner: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  author: string;
  tag: string;
  comments: string[];
  answer: string;
};
