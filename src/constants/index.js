import { meta, shopify, starbucks, tesla, makeup,moviecard,biotech, druganalysis, moviesml, bb, problemista,bp} from "../assets/images";
import {
    contact,
    css,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    react,
    redux,
    sass,
    tailwindcss,
    typescript
} from "../assets/icons";



export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: motion,
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/Jnguye84',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/jessica-nguyen-gmu/',
    }
];

export const projects = [
    {
        iconUrl: moviesml,
        theme: 'btn-back-red',
        name: 'Movies and Machine Learning Club',
        description: 'Founder and president of club that started in Fall 2023. The mission of MoviesML is to create a collaborative student-run space for projects and independent research focused on the film industry. ',
        onlylink: 'https://www.linkedin.com/company/movies-machine-learning-movieml/posts/?feedView=all',
    },
    {
        iconUrl: biotech,
        theme: 'btn-back-green',
        name: 'Harvard Rare Diseases Hackathon- Second Place Winner',
        description: 'Built an interactive dashboard of physicians and researchers, categorized by rare diseases that they have patients in and/or have research paper publications in. Tools used: Python and Neo4j.',
        link: 'https://github.com/Jnguye84/rarediseases',
        videolink: 'https://www.youtube.com/watch?v=nMjota5Zhok'
    },
    {
        iconUrl: druganalysis,
        theme: 'btn-back-blue',
        name: 'Biotech Sentiment Bot',
        description: 'Built a dashboard to predict the success of a drug stock based on factors such as analysis on FDA Clinical Trials, analysis on SEC Forms and financial news, and social media sentiment. Tools used: RStudio and Python.',
        link: 'https://github.com/Jnguye84/trading',
        videolink: 'https://www.youtube.com/watch?v=eFQV9EWggUQ'
    },
    {
        iconUrl: makeup,
        theme: 'btn-back-pink',
        name: 'Makeup Brand Analysis',
        description: 'Data cleaned, scraped, and mined various makeup brands in order to find the most affordable vegan makeup brands. Tools used: Jupyter Notebook and Python.',
        link: 'https://github.com/Jnguye84/Makeup'
    }

];

export const Entertainmentprojects = [
    {
        iconUrl: bb,
        theme: 'btn-back-red',
        name: 'Bigger Than the Both of Us',
        description: 'Self published passion project during the pandemic.',
        link: 'https://www.amazon.com/Bigger-Than-Both-Us-Novel/dp/B08BW5Y5XD',
    },
    {
        iconUrl: problemista,
        theme: 'btn-back-red',
        name: 'Jessica Film Potpourri',
        description: 'Film review blog started in 2021. Wrote articles about film reviews + analysis until 2024.'
    },
    {
        iconUrl: bp,
        theme: 'btn-back-red',
        name: 'The Beautiful People',
        description: 'Wrote The Beautiful People, a ten-minute play, performed in The Originals! 2024 Play Festival.',
        link: 'https://issuu.com/cvpa/docs/the_originals_2024_playbill_1_?fr=sYzZiNTYzODM3MjA',
    },
    

    ];