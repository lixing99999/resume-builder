let _uid = 0
export function nextId() {
  _uid += 1
  return `r-${_uid}`
}

export function emptyJob() {
  return {
    _id: nextId(),
    company: '',
    title: '',
    start: '',
    end: '',
    bullets: ''
  }
}

export function emptyEducation() {
  return {
    _id: nextId(),
    school: '',
    degree: '',
    details: ''
  }
}

export function emptyProject() {
  return {
    _id: nextId(),
    name: '',
    url: '',
    stack: '',
    description: ''
  }
}

export function defaultResume() {
  return {
    fullName: '',
    jobTitle: '',
    contact: {
      email: '',
      phone: '',
      linkedin: ''
    },
    summary: '',
    jobs: [emptyJob()],
    skills: '',
    education: [emptyEducation()],
    languages: '',
    certifications: '',
    projects: [emptyProject()]
  }
}

export function buildSampleResume() {
  return {
    fullName: 'Alex Rivera',
    jobTitle: 'Senior Software Engineer',
    contact: {
      email: 'alex.rivera@example.com',
      phone: '+1 (415) 555-0198',
      linkedin: 'linkedin.com/in/alexrivera-dev'
    },
    summary:
      'Full-stack engineer with 8+ years shipping web products. Strong in Vue, Node, and cloud infrastructure. Looking for a senior IC role on a product team that values ownership, clear metrics, and pragmatic delivery.',
    jobs: [
      {
        _id: nextId(),
        company: 'Northwind Labs',
        title: 'Senior Software Engineer',
        start: 'Mar 2021',
        end: 'Present',
        bullets:
          'Led migration from legacy SPA to Nuxt 2, cutting time-to-interactive by ~35%.\nMentored 4 engineers; introduced RFC process for API and frontend changes.\nOwned billing integrations (Stripe); reduced failed renewals with retry + alerting.'
      },
      {
        _id: nextId(),
        company: 'Brightline Analytics',
        title: 'Software Engineer',
        start: 'Jun 2017',
        end: 'Feb 2021',
        bullets:
          'Built dashboards used by 200+ enterprise customers (Vue, D3, REST).\nImplemented role-based access and audit logging for SOC2 readiness.\nCut CI build time by 40% via caching and parallelized test splits.'
      }
    ],
    skills:
      'JavaScript, TypeScript, Vue.js, Nuxt, Node.js, Express, PostgreSQL, Redis, Docker, AWS (ECS, S3, RDS), GitHub Actions, REST, GraphQL basics, Jest, Cypress',
    education: [
      {
        _id: nextId(),
        school: 'State University',
        degree: 'B.S. Computer Science',
        details: '2013 – 2017 · Dean’s list, ACM chapter'
      }
    ],
    languages: 'English (native), Spanish (professional working proficiency)',
    certifications:
      'AWS Certified Developer – Associate (2023)\nCertified Kubernetes Application Developer (CKAD) – 2022',
    projects: [
      {
        _id: nextId(),
        name: 'resume-builder OSS',
        url: 'https://github.com/example/resume-builder',
        stack: 'Nuxt 2, Element UI, Node',
        description:
          'Open-source resume editor with structured sections and export; 400+ stars. I own architecture, UI, and releases.'
      },
      {
        _id: nextId(),
        name: 'CLI time-tracker',
        url: 'https://github.com/example/ttrack',
        stack: 'Node.js, SQLite',
        description:
          'Small CLI for logging billable hours with CSV export; personal productivity tool used daily.'
      }
    ]
  }
}

export function normalizeResume(raw) {
  const base = defaultResume()
  if (!raw || typeof raw !== 'object') {
    return base
  }
  return {
    fullName: raw.fullName || '',
    jobTitle: raw.jobTitle || '',
    contact: { ...base.contact, ...(raw.contact || {}) },
    summary: raw.summary || '',
    skills: raw.skills || '',
    languages: raw.languages || '',
    certifications: raw.certifications || '',
    jobs:
      Array.isArray(raw.jobs) && raw.jobs.length > 0
        ? raw.jobs.map((j, index) => ({
            _id: j._id || `job-${index}`,
            company: j.company || '',
            title: j.title || '',
            start: j.start || '',
            end: j.end || '',
            bullets: j.bullets || ''
          }))
        : [emptyJob()],
    education:
      Array.isArray(raw.education) && raw.education.length > 0
        ? raw.education.map((e, index) => ({
            _id: e._id || `edu-${index}`,
            school: e.school || '',
            degree: e.degree || '',
            details: e.details || ''
          }))
        : [emptyEducation()],
    projects:
      Array.isArray(raw.projects) && raw.projects.length > 0
        ? raw.projects.map((p, index) => ({
            _id: p._id || `proj-${index}`,
            name: p.name || '',
            url: p.url || '',
            stack: p.stack || '',
            description: p.description || ''
          }))
        : [emptyProject()]
  }
}
