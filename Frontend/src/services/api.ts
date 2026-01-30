// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export type Member = {
  _id: string;
  name: string;
  imageUrl: string;
  role: string;
  memberType: string;  // faculty, super-core, core
  department?: string;  // Only for core members
  linkedin?: string;
  github?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
};

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  event_type: string;
  cover_image: string;
  gallery: Array<{
    image_url: string;
    caption: string;
  }>;
  codex_categories?: CodeXCategory[];
  event_photos?: string[];
  winners?: Array<{
    name: string;
    photo_url: string;
    position: string;
  }>;
  created_at: string;
}

export type CodeXWinner = {
  name: string;
  rank: number;
  photo_url: string;
};

export type CodeXCategory = {
  category_name: string;
  winners: CodeXWinner[];
};

export type CodeXEvent = Event & {
  month: string;
  codex_categories: CodeXCategory[];
};

// API Functions
export const api = {
  // Members
  async getMembers(memberType?: string, department?: string): Promise<Member[]> {
    let url = `${API_BASE_URL}/members`;
    const params = new URLSearchParams();
    if (memberType) params.append('memberType', memberType);
    if (department) params.append('department', department);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  },

  async getMembersByDepartment(): Promise<Array<{department: string, members: Member[]}>> {
    const response = await fetch(`${API_BASE_URL}/members/by-department`);
    if (!response.ok) throw new Error('Failed to fetch members by department');
    return response.json();
  },

  // Events
  async getEvents(): Promise<Event[]> {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  },

  async getEvent(id: string): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    return response.json();
  },

  // CodeX
  async getLatestCodeX(): Promise<CodeXEvent> {
    const response = await fetch(`${API_BASE_URL}/codex/latest`);
    if (!response.ok) throw new Error('Failed to fetch latest CodeX');
    return response.json();
  },

  async getCodeXByMonth(month: string): Promise<CodeXEvent> {
    const response = await fetch(`${API_BASE_URL}/codex/${month}`);
    if (!response.ok) throw new Error('Failed to fetch CodeX');
    return response.json();
  },

  async getAllCodeX(): Promise<CodeXEvent[]> {
    const response = await fetch(`${API_BASE_URL}/codex/all`);
    if (!response.ok) throw new Error('Failed to fetch CodeX events');
    return response.json();
  },
};
