
import { Competency, Experience, Skill } from './types';

export const COMPETENCIES: Competency[] = [
  {
    id: '1',
    title: 'Real Estate Documentation',
    description: 'Expert preparation and review of sales contracts, deeds, and legal instruments.',
    iconName: 'FileText'
  },
  {
    id: '2',
    title: 'Title Transfer',
    description: 'End-to-end management of property ownership transfers and registration processes.',
    iconName: 'Building'
  },
  {
    id: '3',
    title: 'Due Diligence',
    description: 'Comprehensive verification of titles, encumbrances, and property legal status.',
    iconName: 'ShieldCheck'
  },
  {
    id: '4',
    title: 'BIR Processing',
    description: 'Liaising with the Bureau of Internal Revenue for tax clearances and assessments.',
    iconName: 'Scale'
  },
  {
    id: '5',
    title: 'Loan Documentation',
    description: 'Streamlining mortgage and loan requirements with major banking institutions.',
    iconName: 'CreditCard'
  },
  {
    id: '6',
    title: 'Legal Compliance',
    description: 'Ensuring all property transactions adhere to local laws and regulations.',
    iconName: 'Gavel'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    year: '2023 - 2025',
    role: 'Senior Paralegal Lead',
    company: 'CDC Holdings Inc.',
    description: 'Leading the documentation team for major vertical residential developments and mixed-use estates.'
  },
  {
    id: 'exp2',
    year: '2015 - 2023',
    role: 'Real Estate Legal Specialist',
    company: 'Century Properties Group',
    description: 'Managed complex title consolidations and provided legal support for luxury real estate portfolios.'
  },
  {
    id: 'exp3',
    year: '2009 - 2015',
    role: 'Paralegal Officer',
    company: 'Amaia Land Corp (Ayala Land)',
    description: 'Spearheaded the registration and titling of affordable housing units across the Philippines.'
  },
  {
    id: 'exp4',
    year: '2006 - 2009',
    role: 'Junior Legal Assistant',
    company: 'Private Practice',
    description: 'Foundational experience in property litigation support and administrative legal processing.'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Microsoft Word', category: 'software' },
  { name: 'Microsoft Excel', category: 'software' },
  { name: 'Outlook', category: 'software' },
  { name: 'GoHighLevel CRM', category: 'crm' },
  { name: 'Adobe Photoshop', category: 'design' },
  { name: 'Adobe Illustrator', category: 'design' },
  { name: 'Adobe Premiere Pro', category: 'design' },
  { name: 'Case Management Systems', category: 'software' },
  { name: 'Notarial Procedures', category: 'software' },
  { name: 'Legal Research', category: 'software' }
];
