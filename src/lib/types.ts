// Core types for the AttorneyAITools directory

export interface AITool {
  slug: string;
  name: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Free Trial' | string;
  website: string;
  affiliate_link: string;
  logo: string;
  tags: string[];
  use_cases: string[];
  rating: number;
  featured: boolean;
  description: string;
  date_added: string;
  content: string;
}

export interface Attorney {
  slug: string;
  name: string;
  law_firm: string;
  city: string;
  city_slug: string;
  state: string;
  state_slug: string;
  practice_areas: string[];
  phone: string;
  email: string;
  website: string;
  experience_years: number;
  featured: boolean;
  rating: number;
  description: string;
  content: string;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  state_slug: string;
  population: string;
  content: string;
}

export interface State {
  slug: string;
  name: string;
  abbr: string;
  content: string;
}

export interface PracticeArea {
  slug: string;
  name: string;
  category: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  content: string;
}

export interface ProgrammaticPage {
  slug: string;
  title: string;
  template: string;
  practice_area: string;
  city: string;
  state: string;
  content: string;
}

// Filter types
export interface ToolFilters {
  category?: string;
  pricing?: string;
  use_case?: string;
  minRating?: number;
  search?: string;
}

export interface AttorneyFilters {
  state?: string;
  city?: string;
  practice_area?: string;
  minRating?: number;
  search?: string;
}
