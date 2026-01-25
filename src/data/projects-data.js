export const projectsData = [
  {
    id: 'green-mobility',
    title: 'Green Mobility Platform',
    date: '2024-07',
    startDate: '2024-02',
    endDate: '2024-07',
    tags: ['Symfony', 'Next.js', 'Flutter', 'Full-Stack', 'Mobile', 'Internship'],
    description: 'Full-stack web and mobile solution promoting sustainable transportation. Final year internship project combining Symfony 7 backend, Next.js 6 frontend, and Flutter mobile app with seamless UX and best practices.',
    modalContent: {
      subtitle: 'Full-stack web and mobile solution promoting sustainable transportation (Final Year Internship)',
      points: [
        { label: 'Web Stack', text: 'Symfony 7 and Next.js 6 for high-performance, scalable architecture' },
        { label: 'Mobile', text: 'Flutter for cross-platform iOS and Android with seamless UX' },
        { label: 'Best Practices', text: 'Code reviews, clean architecture, and maintainable codebase' },
        { label: 'Agile Development', text: 'Collaborative team environment with iterative delivery' },
        { label: 'Impact', text: 'Real-world application addressing environmental sustainability' }
      ]
    },
    image: 'assets/images/projects/green-challenge.png',
    links: {
      github: null,
      live: null,
      drive: null
    }
  },
  {
    id: 'devops-jenkins',
    title: 'DevOps - Jenkins Pipeline',
    date: '2023-12',
    tags: ['DevOps', 'Jenkins', 'Docker', 'SonarQube', 'CI/CD', 'University'],
    description: 'University project automating the analysis and dockerization of SpringBoot applications using Jenkins Pipeline. Implemented build automation, code analysis with SonarQube, Docker image creation, and DockerHub deployment.',
    modalContent: {
      subtitle: 'Automate the analysis and dockerization of SpringBoot App in Github with Jenkins Pipeline',
      points: [
        { label: 'Step 1', text: 'Build Maven with Jenkins Pipeline' },
        { label: 'Step 2', text: 'Analyse Code with SonarQube' },
        { label: 'Step 3', text: 'Building the docker Image' },
        { label: 'Step 4', text: 'Pushing the image to dockerhub' }
      ]
    },
    image: 'assets/images/projects/devops.png',
    links: {
      github: 'https://github.com/siw-ss/devops-automation',
      live: null,
      drive: null
    }
  },
  {
    id: 'power-bi',
    title: 'Museum Of Modern Art - Power BI Dashboard',
    date: '2023-12',
    tags: ['Power BI', 'Data Analysis', 'DAX', 'University'],
    description: 'University project analyzing The Museum of Modern Art\'s collection. Implemented data preparation, DAX calculations, interactive visualizations, and navigation features for comprehensive artwork analysis.',
    modalContent: {
      subtitle: 'Analysis of The collection of the Museum\'s artworks',
      points: [
        { label: 'Data Preparation', text: 'Sort, analyse and clean data using Data Queries' },
        { label: 'Data Presentation', text: 'Using DAX methods and diverse charts provided by Power BI' },
        { label: 'Data Filtering', text: 'Adding proper filters to each section' },
        { label: 'Data Navigation', text: 'Using buttons and bookmarks with different views' }
      ]
    },
    image: 'assets/images/projects/power-bi.png',
    links: {
      github: null,
      live: 'https://drive.google.com/file/d/1XWlacQ281I0sP3LlnM44sz-f6t5SqINc/view?usp=sharing',
      drive: null
    }
  },
  {
    id: 'perpetual-code',
    title: 'Perpetual Code Website',
    date: '2023-08',
    startDate: '2022-06',
    endDate: '2023-08',
    tags: ['Nuxt 3', 'Node.js', 'pnpm', 'Frontend', 'Performance', 'Internship'],
    description: 'Summer internship 2022-23 project. Developed the official website for Perpetual Code company using Nuxt 3 and pnpm. Focused on UI/UX design and performance optimization for an exceptional user experience.',
    modalContent: {
      subtitle: 'Official website for Perpetual Code (Summer Internship 22-23)',
      points: [
        { label: 'Framework', text: 'Built with Nuxt 3 and pnpm for modern development' },
        { label: 'Focus', text: 'UI/UX design and performance optimization' },
        { label: 'Result', text: 'High-performance, SEO-focused, responsive website' }
      ]
    },
    image: 'assets/images/projects/perpetual-code.png',
    links: {
      github: null,
      live: "https://perpetualcode.com/en",
      drive: null
    }
  },
  {
    id: 'ai-models',
    title: 'AI Models & Deep Learning',
    date: '2023-07',
    tags: ['AI', 'Deep Learning', 'CNN', 'NLP', 'Python', 'Certification'],
    description: 'Certified AI program during summer 2022-23. Comprehensive exploration of machine learning models including Deep Learning, CNN for ASL prediction, and NLP techniques. Hands-on experience with cutting-edge AI technologies.',
    modalContent: {
      subtitle: 'Certified AI program with hands-on experience',
      points: [
        { label: 'Deep Learning', text: 'Explored neural networks and advanced architectures' },
        { label: 'CNN', text: 'Built ASL (American Sign Language) prediction project' },
        { label: 'NLP', text: 'Natural Language Processing techniques and applications' },
        { label: 'Certification', text: 'Completed comprehensive AI program' }
      ]
    },
    image: 'assets/images/projects/ai-models.png',
    links: {
      github: null,
      live: 'https://drive.google.com/drive/folders/13WyUGH54TG4AdQeekR8Uhz70MOVYTbNW?usp=sharing',
      drive: null
    }
  },
  {
    id: 'event-manager',
    title: 'Event Manager',
    date: '2022-12',
    tags: ['React', 'Node.js', 'MongoDB', 'MERN', 'Authentication', 'Full-Stack', 'University'],
    description: 'MERN Stack event management application built in December 2022. Features user authentication and comprehensive event management capabilities. A fun and practical project demonstrating full-stack development skills.',
    modalContent: {
      subtitle: 'MERN Stack event management application',
      points: [
        { label: 'Frontend', text: 'React with modern UI/UX design' },
        { label: 'Backend', text: 'Node.js with Express server' },
        { label: 'Database', text: 'MongoDB for data persistence' },
        { label: 'Features', text: 'User authentication and event management' }
      ]
    },
    image: 'assets/images/projects/event-manager.png',
    links: {
      github: 'https://github.com/siw-ss/event-manager-react',
      live: null,
      drive: null
    }
  },
  {
    id: 'be-nextgen',
    title: 'BeNextGen - Vegan Community Platform',
    date: '2022-08',
    startDate: '2021-06',
    endDate: '2022-08',
    tags: ['Angular', 'MongoDB', 'Node.js', 'E-commerce', 'Community', 'Internship'],
    description: 'Summer internship 2021-22 project. Full-stack web platform for selling vegan food and building vegan communities. Built with Angular frontend and MongoDB backend, promoting sustainable lifestyle choices.',
    modalContent: {
      subtitle: 'Full-stack platform for vegan food and community (Summer Internship 21-22)',
      points: [
        { label: 'Frontend', text: 'Angular for dynamic, responsive user interface' },
        { label: 'Backend', text: 'Node.js with MongoDB for scalable architecture' },
        { label: 'Features', text: 'E-commerce functionality and community building tools' },
        { label: 'Mission', text: 'Promoting sustainable vegan lifestyle choices' }
      ]
    },
    image: 'assets/images/projects/be-nextgen.png',
    links: {
      github: null,
      live: null,
      drive: null
    }
  },
  {
    id: 'sobflous',
    title: 'Sobflous Wheel of Fortune Solution',
    date: '2021-11',
    tags: ['Hackathon', 'Full-Stack', 'Gamification', 'Winner'],
    description: 'Award-winning project from a 4-day hackathon in 2021 organized by JET for junior enterprises in Tunisia. Team of 4 (2 developers, 1 sales, 1 designer) developed an interactive wheel of fortune solution for Sobflous company. Won first prize.',
    modalContent: {
      subtitle: '🏆 First Prize Winner - JET Hackathon 2021 (4 days)',
      points: [
        { label: 'Challenge', text: 'Develop and pitch a gamification solution for Sobflous company' },
        { label: 'Team', text: 'Collaborated with 2 developers, 1 sales, 1 designer' },
        { label: 'Solution', text: 'Interactive wheel of fortune with engaging user experience' },
        { label: 'My Role', text: 'Full-stack development and technical implementation' },
        { label: 'Achievement', text: 'Won first prize among all junior enterprises in Tunisia' }
      ]
    },
    image: 'assets/images/projects/sobflous.png',
    links: {
      github: null,
      live: null,
      drive: null
    }
  },
  {
    id: 'optimaje',
    title: 'Optimaje - Junior Enterprise Website',
    date: '2022-06',
    tags: ['WordPress', 'PHP', 'MySQL', 'Web Design', 'Leadership'],
    description: 'Renovated the official website of Optima Junior Enterprise (FST\'s junior enterprise) in 2022 as Head of Projects Department. Showcases their expertise in web development, mobile development, and web marketing services. The platform highlights their commitment to client satisfaction, quality, and competitive pricing.',
    modalContent: {
      subtitle: 'Official website renovation for Optima Junior Enterprise',
      points: [
        { label: 'Role', text: 'Head of Projects Department (Mandate 21-22)' },
        { label: 'Services', text: 'Web development, mobile development, web marketing' },
        { label: 'Tech Stack', text: 'WordPress, PHP, MySQL' },
        { label: 'Focus', text: 'Client satisfaction, quality, competitive pricing' }
      ]
    },
    image: 'assets/images/projects/optimajuniorentreprise.png',
    links: {
      github: null,
      live: 'https://optimajuniorentreprise.com',
      drive: null
    }
  },
  {
    id: 'lunivers-du-decor',
    title: 'L\'Univers Du Décor Website',
    date: '2023-06',
    tags: ['WordPress', 'PHP', 'MySQL', 'E-commerce', 'Web Design'],
    description: 'Professional website for L\'univers du décor, a specialized interior decoration and furnishing company in Tunisia. Showcases their 25+ years of experience in custom decoration solutions, pergolas, false ceilings, and floor coverings.',
    modalContent: {
      subtitle: 'E-commerce website for interior decoration company (2023)',
      points: [
        { label: 'Development', text: 'Built with WordPress, PHP, and MySQL' },
        { label: 'Features', text: 'Product catalog, service showcase, and contact system' },
        { label: 'Design', text: 'Professional layout highlighting 25+ years of expertise' },
        { label: 'Scope', text: 'Full website development and deployment' }
      ]
    },
    image: 'assets/images/projects/lunivers-du-decor.png',
    links: {
      github: null,
      live: 'https://luniversdudecor.com.tn',
      drive: null
    }
  },
  {
    id: 'prostore',
    title: 'ProStore Website',
    date: '2022-09',
    tags: ['WordPress', 'PHP', 'MySQL', 'E-commerce', 'Product Showcase'],
    description: 'Website for ProStore, a manufacturer of custom interior blinds and solar protection solutions in Tunisia and Africa. Features product catalog including Zebra, Boat, Japanese, and Vertical blinds with detailed specifications.',
    modalContent: {
      subtitle: 'E-commerce platform for blinds manufacturer (2022)',
      points: [
        { label: 'Development', text: 'Built with WordPress, PHP, and MySQL' },
        { label: 'Features', text: 'Product catalog with detailed specifications and images' },
        { label: 'Products', text: 'Custom Various Blinds Manufacturer' },
        { label: 'Scope', text: 'Full website development for Tunisia and Africa market' }
      ]
    },
    image: 'assets/images/projects/prostore.png',
    links: {
      github: null,
      live: 'https://prostore.com.tn',
      drive: null
    }
  },
  {
    id: 'geoplus',
    title: 'GeoPlus Website',
    date: '2022-12',
    tags: ['WordPress', 'CSS', 'Web Design', 'Corporate'],
    description: 'Website for GeoPlus, an applied geophysics expertise company in Tunisia. Highlights their scientific approach, HSE compliance, and collaboration with academic institutions for geophysical solutions.',
    modalContent: {
      subtitle: 'Corporate website for geophysics company (2022)',
      points: [
        { label: 'Development', text: 'Built with WordPress and custom CSS' },
        { label: 'Content', text: 'Showcased Applied Geophysics' },
        { label: 'Design', text: 'Professional corporate layout and branding' },
        { label: 'Scope', text: 'Full website development and content integration' }
      ]
    },
    image: 'assets/images/projects/geoplus.png',
    links: {
      github: null,
      live: 'https://geoplus.com.tn',
      drive: null
    }
  },
  {
    id: 'cciboost',
    title: 'CCIBoost Website',
    date: '2023-03',
    tags: ['WordPress', 'PHP', 'MySQL', 'Web Design', 'Corporate', 'Data Platform'],
    description: 'Professional website for CCI Boost, a platform connecting creative and cultural enterprises with investors and business partners. Features The Index (27 indicators for business analysis), matchmaking services, and academy resources. Supports 122+ enterprises across 60 countries with data-driven insights.',
    modalContent: {
      subtitle: 'Platform connecting creative enterprises with investors (2023)',
      points: [
        { label: 'Development', text: 'Built with WordPress, PHP, and MySQL' },
        { label: 'Content', text: 'Creative & Cultural Ecosystem, matchmaking, academy resources' },
        { label: 'Complexity', text: 'Data visualization and enterprise management system' },
      ]
    },
    image: 'assets/images/projects/cci-boost.png',
    links: {
      github: null,
      live: 'https://cciboost.com',
      drive: null
    }
  },
  {
    id: 'omnihome',
    title: 'OmniHome Website',
    date: '2022-05',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Vanilla', 'Frontend'],
    description: 'Vanilla HTML/CSS/JavaScript website for OmniHome, a smart home solutions company. Built with Bootstrap for responsive design and modern web standards.',
    modalContent: {
      subtitle: 'Smart home solutions website (2022)',
      points: [
        { label: 'Development', text: 'Vanilla HTML, CSS, JavaScript with Bootstrap' },
        { label: 'Content', text: 'Smart Home Solutions' },
        { label: 'Approach', text: 'Clean, performant frontend without frameworks' },
        { label: 'Design', text: 'Responsive layout with modern web standards' },
        { label: 'Focus', text: 'Fast loading times and cross-browser compatibility' }
      ]
    },
    image: 'assets/images/projects/omnihome.png',
    links: {
      github: null,
      live: 'https://www.omnihome.fr',
      drive: null
    }
  }
];
