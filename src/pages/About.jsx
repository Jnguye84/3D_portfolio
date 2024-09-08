import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import "react-vertical-timeline-component/style.min.css";
import {me} from "../assets/images";
const About = () => {
  return (
    <section className='max-container flex flex-col md:flex-row items-center justify-between my-20'>
      <div className='w-full md:w-1/2 p-4'>
        {/* Each sentence in its own paragraph for better spacing */}
        <p className='text-lg mb-4'>
          Jessica is dedicated to crafting impactful storytelling through data science.
        </p>
        <p className='text-lg mb-4'>
          She gravitates towards data on film and entertainment, including entertainment trends forecasting and refining process workflows and pipelines.
        </p>
        <p className='text-lg'>
          Her experience includes internships at the Department of State, the Department of Homeland Security, and Disney Animation Studios.
        </p>
      </div>

      {/* Image Section */}
      <div className='w-full md:w-1/2 p-4 flex justify-center'>
        <img
          src={me}
          alt='Profile Picture'
          className='w-full h-auto max-w-sm object-cover'
        />
      </div>
    </section>
  );
};

export default About;

