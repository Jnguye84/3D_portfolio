import { Link } from "react-router-dom";

import { CTA } from "../components";
import { Entertainmentprojects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  return (
    <section className='max-container'>

      <div className='flex flex-wrap my-20 gap-16'>
        {Entertainmentprojects.map((project) => (
          <div className='lg:w-[400px] w-full' key={project.name}>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={project.iconUrl}
                  alt='threads'
                  className='w-120 h-60 object-contain'
                />
              </div>

            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500'>{project.description}</p>
              <div className='mt-5 flex items-center gap-2 font-poppins'>
              {project.link && (
                  <>
                    <Link
                      to={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-semibold text-blue-600'
                    >
                      Link
                    </Link>
                    <img
                      src={arrow}
                      alt='arrow'
                      className='w-4 h-4 object-contain'
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default Projects;
