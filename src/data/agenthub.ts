export interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface Team {
  id: string;
  name: string;
  icon: string;
  agents: Agent[];
}

export const director: Agent = {
  id: 'director',
  name: 'Director',
  role: 'Primary Agent',
  icon: '◆',
  description: 'Central orchestrator and the only always-on gateway agent. Routes tasks, manages infrastructure, coordinates teams.',
  skills: ['Code dev & debugging', 'System admin & DevOps', 'Research & analysis', 'Content creation', 'Hindsight memory management'],
};

export const teams: Team[] = [
  {
    id: 'operations',
    name: 'Operations',
    icon: '⚙',
    agents: [
      {
        id: 'ops',
        name: 'Ops',
        role: 'Infrastructure Specialist',
        icon: '▸',
        description: 'System monitoring, emergency response, and infrastructure management. First responder for critical alerts.',
        skills: ['Health checks', 'Incident response', 'Service management', 'Log analysis'],
      },
    ],
  },
  {
    id: 'development',
    name: 'Development',
    icon: '⟐',
    agents: [
      {
        id: 'developer',
        name: 'Developer',
        role: 'Code Engineer',
        icon: '⟩',
        description: 'Full-stack coding agent. Handles feature implementation, bug fixes, and code review.',
        skills: ['Full-stack dev', 'Testing', 'Code review', 'Documentation'],
      },
    ],
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: '✦',
    description: 'Design, illustration, and visual storytelling.',
    agents: [
      {
        id: 'designer',
        name: 'Designer',
        role: 'Visual Designer',
        icon: '◎',
        description: 'Visual design, UI/UX, illustrations, and brand identity. Turns concepts into visual systems.',
        skills: ['UI/UX design', 'Illustration', 'Brand identity', 'Design systems'],
      },
      {
        id: 'writer',
        name: 'Writer',
        role: 'Content Strategist',
        icon: '✎',
        description: 'Content creation, copywriting, and editorial. Crafts narratives and messaging.',
        skills: ['Copywriting', 'Content strategy', 'Editing', 'Social media'],
      },
    ],
  },
  {
    id: 'research',
    name: 'Research',
    icon: '◈',
    agents: [
      {
        id: 'researcher',
        name: 'Researcher',
        role: 'Knowledge Explorer',
        icon: '◎',
        description: 'Deep research, analysis, and synthesis. Turns raw data into actionable insights.',
        skills: ['Web research', 'Data analysis', 'Report writing', 'Strategy'],
      },
      {
        id: 'analyst',
        name: 'Analyst',
        role: 'Data Analyst',
        icon: '⊞',
        description: 'Quantitative analysis, financial modeling, and data-driven decision support.',
        skills: ['Data analysis', 'Financial modeling', 'Visualization', 'Statistics'],
      },
    ],
  },
  {
    id: 'strategy',
    name: 'Strategy',
    icon: '▹',
    agents: [
      {
        id: 'strategist',
        name: 'Strategist',
        role: 'Strategic Advisor',
        icon: '◇',
        description: 'Product strategy, market analysis, and long-term planning. Connects trends to opportunities.',
        skills: ['Product strategy', 'Market analysis', 'Business modeling', 'Roadmapping'],
      },
    ],
  },
];
