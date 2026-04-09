
export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  mediaType?: 'image' | 'iframe';
}

export interface SituationItem {
  title: string;
}

export interface PortfolioItem {
  id: number;
  image: string;
  task: string;
  solution: string;
  mediaType?: 'image' | 'iframe';
}
