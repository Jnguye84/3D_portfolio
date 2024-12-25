import React, { useEffect, useRef } from 'react';

import {fun, mitreality, episode, harvard, outlandish, theater, doc, moviesml, biotech} from "../assets/images/portfolio";

const Portfolio = () => {
  const videosRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // At least 50% of the video must be visible to trigger playback
      }
    );

    videosRef.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videosRef.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);
  return (
  <section className='max-container'>      
    My first experience with coding was from creating stories off the Episode game. 
    <img
        src={episode}
        alt='Profile Picture'
        className='object-cover transform scale-200'
      />
    From then on, I realized that a goal of mine was to create accessible storytelling through coding. There was always an artistic approach to how I wanted to invest within my social impact. I initially went into college thinking I wanted to become a diplomat from my prior high
    school experience with working with The Borgen Project. The Borgen Project is an international organizzation that fights global poverty trhough pushing legislation. 
    To fundraise, I upcycled thrifted clothing and donated the proceeds while maintaing eco-friendly method of production. In one summer, I managed to raise
    $500 dollars for the project. 
      <img
        src={outlandish}
        alt='Profile Picture'
        className='w-full h-auto max-w-sm object-cover'
      />
      During this time, jessicafilmpotpourri.com was born: a personal film review blog based on international movies from 
      countries such as South Korea, France, South Africa, and Kenya. This blog was live for 2 years until I moved onto hosting on Medium. 
 
      In my freshman year of college as a data science major, I conducted undergraduate research on Jensen's Inequality and the Box-Muller Method to simulate how to find the best optimal number of vines within a vineyard. This 
      grew my curiosity into applications of higher-level mathematics as I dove into economics and their impacts on topics such as poly-centric systems of governance, environment, and incarceration. I joined the Mercatus Research Center as 
      an undergraduate fellow discussing these topics within context of peer-reviewed material and fundamental texts. One of my projects was exploring Consumats on a Network NetLogo model and further adding additional analysis to the
      Chapter 19 of Introduction to Agent-Based Modeling by Marco Janssen. I primarily used excel for my data visualizations and obtained additional conclusions on the flow of the market based on
      different decision types and product gini distribution score.

      I went to the Harvard Rare Diseases Hackathon with a group from my university where we created a social-network based application connecting new diagnoses of rare Diseases
      with specialized dotors within the field based on their scholarly research. This project used many web APIs from medical community-based websites, google scholar, and ADCY5 website.
      The project went on to earn second place. 
      <video
      ref={(el) => videosRef.current.push(el)}
      src={harvard}
      alt='Episode Story GIF'
      className='object-cover transform scale-200'
      loop
      muted
      onMouseEnter={e => e.currentTarget.play()}
      onMouseLeave={e => e.currentTarget.pause()}
      />
      Following this tract, I with one other team member from that previous hackathon created a pharmecuetical stock analysis API at my university's hackathon to assist in predicting the very volatile pharmeucuticals market. This included
      APIs from Reddit and Yahoo Finance, SEC forms analysis, and social network analysis within biotechnology market. 

      I've experimented with coding projects that dealt with computer vision and OCR data. I was an undergraduate researcher at the Human-Centered Computing lab where I worked on capturing user's movements
      and analysis on ADHD technologies as well as assisting with the trial experiments. 
      <video
        ref={(el) => videosRef.current.push(el)}
        src={biotech}
        alt='Episode Story GIF'
        className='object-cover transform scale-200'
        loop
        muted
        onMouseEnter={e => e.currentTarget.play()}
        onMouseLeave={e => e.currentTarget.pause()}
      />
      I also conducted a hackathon projet within the MIT Reality Hack where I and others completed a project that could combine instructions of a cookbook to memories of a scrapbook in a mixed reality experience. This used tools such as Unity, Figma, Bezi, and Meta Quest 3. The project
      captured live footage of the wearer cooking and then automized the seperation between cooking instruction and anecdotal storytelling that a loved One may induce
      while cooking their favourite meal.
      <video
        ref={(el) => videosRef.current.push(el)}
        src={mitreality}
        alt='Episode Story GIF'
        className='w-full h-auto max-w-sm object-cover'
        loop
        muted
        onMouseEnter={e => e.currentTarget.play()}
        onMouseLeave={e => e.currentTarget.pause()}
      />

      I set out to complete small arduino projects through self-teaching and workshops offered by my school. I also did some hands-on learning with my computers that I had at home such as
      building PCs, experimenting with building Hackintoshes.

      Projects that I'm currently working on is a documentary on the process of creating a Magic Lantern show, one of the oldest forms of animation. 
      <img
        src={doc}
        alt='Profile Picture'
        className='w-full h-auto max-w-sm object-cover'
      />
      I've wanted to spread these skills I've acquired from making software projects for others. This is when I created the club Movies and Machine Learning where the club sought to create
      a new project every semester. We also did workshops within local libraries to teach these projects to elementary-high school students. 
      <video
      ref={(el) => videosRef.current.push(el)}
      src={moviesml}
      alt='Episode Story GIF'
      className='object-cover transform scale-200'
      loop
      muted
      onMouseEnter={e => e.currentTarget.play()}
      onMouseLeave={e => e.currentTarget.pause()}
    />


      I still participate in storytelling endeavors and south to involve myself in projects of all artistic mediums- however, I hope to carry a legacy of making data more accessible and transparent to the greater good.
      <img
        src={theater}
        alt='Profile Picture'
        className='w-full h-auto max-w-sm object-cover'
      />
      <a href="URL">Link Text</a>
      <a href="https://www.gmu.edu/news/2023-08/mason-students-take-bow-capital-fringe">Link Text</a>
      <a href="https://www.broadwayworld.com/washington-dc/article/Review-THE-ROAD-TO-THE-END-Takes-a-Bittersweet-Trip-Down-Memory-Lane-at-Theater-J-20230718">Link</a>
      <video
      ref={(el) => videosRef.current.push(el)}
      src={fun}
      alt='Episode Story GIF'
      className='object-cover transform scale-200'
      loop
      muted
      onMouseEnter={e => e.currentTarget.play()}
      onMouseLeave={e => e.currentTarget.pause()}
    />
  </section>
  )
}

export default Portfolio
