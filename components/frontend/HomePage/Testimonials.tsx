// TestimonialsSection.tsx
"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FaQuoteRight } from 'react-icons/fa';

type Testimonial = {
  id: number;
  content: string;
  name: string;
  role: string;
  rating: number;
  image: string;
};

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "The EduZim system has transformed how we manage student records and communicate with parents. It's specifically tailored for our Zimbabwean curriculum needs which makes administrative tasks much more efficient.",
      name: "Tendai Moyo",
      role: "School Administrator",
      rating: 5,
      image: "/testimonial-1.jpg" // Placeholder - replace with actual image
    },
    {
      id: 2,
      content: "As a parent, I appreciate being able to track my children's academic progress and fee payments through the EduZim portal. The system sends timely updates and has greatly improved communication with teachers.",
      name: "Grace Mutasa",
      role: "Parent",
      rating: 4,
      image: "/testimonial-2.jpg" // Placeholder - replace with actual image
    },
    {
      id: 3,
      content: "Implementing EduZim at our school has significantly reduced paperwork and administrative overhead. The ZIMSEC-aligned reporting tools save us countless hours during examination periods.",
      name: "Farai Ndlovu",
      role: "School Director",
      rating: 5,
      image: "/testimonial-3.jpg" // Placeholder - replace with actual image
    },
    {
      id: 4,
      content: "The technical support team has been responsive to our needs as a rural school with occasional connectivity challenges. They've customized solutions that work even with limited infrastructure.",
      name: "Blessing Chigumba",
      role: "IT Coordinator",
      rating: 4,
      image: "/testimonial-4.jpg" // Placeholder - replace with actual image
    }
  ];

  // Display testimonials in pairs (can add pagination/sliding functionality for more)
  const [currentPair, setCurrentPair] = useState(0);
  const totalPairs = Math.ceil(testimonials.length / 2);

  const nextPair = () => {
    setCurrentPair((prev) => (prev + 1) % totalPairs);
  };

  const prevPair = () => {
    setCurrentPair((prev) => (prev - 1 + totalPairs) % totalPairs);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "text-orange-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  // Get current pair of testimonials
  const currentTestimonials = testimonials.slice(currentPair * 2, currentPair * 2 + 2);

  return (
    <section className="py-16 px-4 bg-blue-500 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="uppercase text-white font-medium flex justify-center items-center gap-2 mb-2">
            <span className="w-8 h-0.5 bg-white"></span>
            OUR TESTIMONIALS
            <span className="w-8 h-0.5 bg-white"></span>
          </p>
          <h2 className="text-4xl font-bold text-white mb-2">
            Voices Of Success: Our <br />
            Community&#39;s Testimonials
          </h2>
        </div>

        {/* Testimonials Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-transparent border border-white/20 rounded-xl p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 text-orange-400">
                <FaQuoteRight size={24} />
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                <p className="text-white mb-8 text-lg">
                  {testimonial.content}
                </p>

                {/* User Image */}
                <div className="mb-3 flex justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                {/* User Info */}
                <h4 className="text-white text-xl font-semibold">{testimonial.name}</h4>
                <p className="text-white/80 mb-3">{testimonial.role}</p>

                {/* Rating Stars */}
                <div className="text-2xl">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls (if more than 1 pair) */}
        {totalPairs > 1 && (
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevPair}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
              aria-label="Previous testimonials"
            >
              ←
            </button>
            <button 
              onClick={nextPair}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
              aria-label="Next testimonials"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Go To Top Button */}
      {/* <div className="fixed right-4 bottom-4">
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full transition-colors font-medium flex items-center">
          <span className="inline-block transform rotate-90">Go To Top</span>
        </button>
      </div> */}
    </section>
  );
};

