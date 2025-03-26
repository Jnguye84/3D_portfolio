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
      <div className='w-full md:w-1/2 p-5'>
        {/* Each sentence in its own paragraph for better spacing */}
        <p className='text-lg mb-4'>
          Jessica is dedicated to{' '}
          <a 
            href="https://medium.com/@jessicanguyen858" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            crafting impactful storytelling through data science
          </a>.
        </p>

        <p className='text-lg mb-4'>
          She gravitates towards data on film and entertainment, including entertainment trends forecasting and refining process workflows and pipelines.
        </p>

        <p className='text-lg mb-4'>
          Her experience includes internships at the Department of State, the Department of Homeland Security, and Disney Animation Studios.
        </p>

        <p className='text-lg mb-4'>
        She can be contacted by <a href="mailto:jessicanguyen858@gmail.com" className="text-blue-600 hover:underline">jessicanguyen858@gmail.com</a>
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

