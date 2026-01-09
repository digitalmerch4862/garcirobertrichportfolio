
export interface Competency {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'software' | 'design' | 'crm';
}
