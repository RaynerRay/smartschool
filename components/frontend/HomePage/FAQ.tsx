// FAQSection.tsx
"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FaChevronUp, FaChevronDown, FaCheckCircle } from 'react-icons/fa';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
};

export const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      question: 'What is SmartSchool - School Management System?',
      answer: 'SmartSchool is a comprehensive school management system designed specifically for Zimbabwean schools. It integrates student records, fee management, attendance tracking, examination results, and communication tools into one platform tailored to meet the requirements of the Zimbabwean education system.',
      isOpen: true
    },
    {
      id: 2,
      question: 'What features are included in the system?',
      answer: 'Our system includes student information management, fee tracking and payment processing, examination result recording, attendance monitoring, timetable scheduling, resource allocation, parent-teacher communication portal, and reporting tools compliant with Zimbabwean Ministry of Education requirements.',
      isOpen: false
    },
    {
      id: 3,
      question: 'How does SmartSchool support the Zimbabwean curriculum?',
      answer: 'SmartSchool is built around the ZIMSEC curriculum requirements, supporting both primary and secondary education levels. The system accommodates continuous assessment, practical examinations, and term-based evaluation methods used in Zimbabwean schools.',
      isOpen: false
    },
    {
      id: 4,
      question: 'What are the system requirements for installation?',
      answer: 'SmartSchool can be deployed as a cloud-based solution or installed on local servers. For local installation, we recommend servers with minimum 8GB RAM, 500GB storage, and reliable internet connectivity. The system works with all major browsers and includes mobile-responsive interfaces for access via smartphones.',
      isOpen: false
    }
  ]);

  const toggleFAQ = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  return (
    <section className="py-16 px-4 bg-gray-50 relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute left-4 top-20 text-gray-300">
        <div className="grid grid-cols-5 gap-2">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="lg:w-1/2 relative">
          <div className="rounded-full overflow-hidden border-8 border-white shadow-xl w-[500px] h-[500px] relative">
            <Image 
              src="/faq.png" 
              alt="Zimbabwean students in classroom" 
              width={500} 
              height={500}
              className="object-cover"
              // This is a placeholder. In a real implementation, you would need an actual image.
              unoptimized
            />
          </div>
        </div>
        
        {/* FAQ Content */}
        <div className="lg:w-1/2">
          <div className="mb-8">
            <p className="uppercase text-blue-500 font-medium flex items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-blue-500"></span>
              OUR EDUCATION FAQ
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Got Questions? Here Are Your Answers - FAQ
            </h2>
            <p className="text-gray-600">
              SmartSchool provides tailored school management solutions for Zimbabwean educational institutions, supporting curriculum management, student records, and administrative processes.
            </p>
          </div>
          
          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className={`w-full text-left p-4 flex justify-between items-center ${faq.isOpen ? 'bg-sky-500 text-white' : 'bg-white text-gray-800'}`}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="flex items-center">
                    <span className={`mr-3 ${faq.isOpen ? 'text-white' : 'text-sky-500'}`}>
                      <FaCheckCircle size={20} />
                    </span>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                  <span>
                    {faq.isOpen ? <FaChevronUp /> : <FaChevronDown className="text-blue-500" />}
                  </span>
                </button>
                
                {faq.isOpen && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    
    </section>
  );
};



