'use client';

import { workshopsData } from '@/utils/data/workshops-data';
import WorkshopCard from './workshop-card';

const Workshops = () => {
  return (
    <div id='workshops' className="relative z-50 my-12 lg:my-24">
      {/* Decorative Background Blur */}
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            WORKSHOPS & LECTURES
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Section Description */}
      <div className="pt-12 pb-8 max-w-4xl">
        <p className="text-gray-400 text-base lg:text-lg">
          <span className="text-[#16f2b3] font-semibold">Empowering Others Through Knowledge Sharing</span>
          {' '}- Passionate about sharing expertise and inspiring the next generation of tech professionals through interactive workshops and engaging lectures.
        </p>
      </div>

      {/* Workshops Grid */}
      <div className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {workshopsData.map((workshop, index) => (
            <div
              key={workshop.id}
              className="w-full transform transition-all duration-500 hover:scale-[1.02]"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              <WorkshopCard workshop={workshop} />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Bottom Blur */}
      <div className="w-[100px] h-[100px] bg-pink-100 rounded-full absolute bottom-0 right-0 translate-x-1/2 filter blur-3xl opacity-20"></div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Workshops;

