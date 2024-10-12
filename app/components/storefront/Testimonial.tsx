import React from 'react';
import { UserCircle, UserCog, ChefHatIcon } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  avatar: JSX.Element;
}

const testimonials: Testimonial[] = [
  {
    name: 'Jane D',
    role: 'Crafty-Man',
    feedback: 'Zuma is simply the best tool of investment in the market right now.',
    avatar: <UserCircle className="w-12 h-12 text-gray-500"/>,
  },
  {
    name: 'Harsh P.',
    role: 'Electronics Guru',
    feedback: "I was hesitant to try Zuma Electronics at first, but I'm so glad I did - it's exceeded all of my expectations.",
    avatar: <UserCog className="w-12 h-12 text-gray-500"/>,
  },
  {
    name: 'Alex K.',
    role: 'Chief Restaurant',
    feedback: "Zuma stands out as the most user-friendly and effective solution I've ever used for kitchen wares.",
    avatar: <ChefHatIcon className="w-12 h-12 text-gray-500"/>,
  },
];

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-4xl font-bold text-gray-900 text-center lg:text-left">Testimonials</h2>
        </div>

        {/* Testimonial Cards */}
        <div className="lg:flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white border border-solid h-auto border-gray-300 rounded-2xl p-6 transition-all duration-500 w-full hover:border-indigo-600">
              
              {/* Star Ratings */}
              <div className="flex items-center mb-9 gap-2 text-amber-500 transition-all duration-500 group-hover:text-indigo-600">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                      fill="currentColor" />
                  </svg>
                ))}
              </div>

              {/* Feedback */}
              <p className="text-lg text-gray-500 leading-8 h-24 transition-all duration-500 mb-9 group-hover:text-gray-800">
                {testimonial.feedback}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-5">
                {testimonial.avatar}
                <div className="grid gap-1">
                  <h5 className="text-gray-900 font-medium transition-all duration-500 group-hover:text-indigo-600">
                    {testimonial.name}
                  </h5>
                  <span className="text-sm leading-6 text-gray-500">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
