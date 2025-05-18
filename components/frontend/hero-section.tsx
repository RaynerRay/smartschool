"use client"
import { useState } from 'react';
import { Sparkles, BookOpen, Users, Calendar, ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-50">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-sky-200 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-purple-200 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 rounded-full bg-yellow-200 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-600 font-medium text-sm">
              <Sparkles size={16} className="mr-2" />
              WELCOME TO SmartSchool <span className='text-orange-600 mx-2'>Zimbabwe</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-sky-600">
              Where School <span className="text-sky-600 underline decoration-orange-500 decoration-4 underline-offset-2">Management</span> Meets Excellence!
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              SmartSchool is a comprehensive platform transforming school administration into a seamless experience. Empower staff, engage parents, and nurture student success with our all-in-one solution.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                className={`px-6 py-3 rounded-lg bg-sky-600 text-white font-medium flex items-center transition-all ${isHovered ? 'shadow-lg shadow-sky-300' : 'shadow-md'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started
                <ChevronRight size={20} className={`ml-2 transition-transform ${isHovered ? 'transform translate-x-1' : ''}`} />
              </button>
              
              <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium flex items-center hover:bg-gray-50 transition-colors">
                <Play size={20} className="mr-2 text-sky-600" />
                Watch Demo
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm">
                <BookOpen size={24} className="text-sky-600 mb-2" />
                <span className="text-sm font-medium text-center">Complete<br />Curriculum</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm">
                <Users size={24} className="text-sky-600 mb-2" />
                <span className="text-sm font-medium text-center">Student<br />Management</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm">
                <Calendar size={24} className="text-sky-600 mb-2" />
                <span className="text-sm font-medium text-center">Advanced<br />Scheduling</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-sky-500 transform rotate-3 rounded-3xl"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-lg transform -rotate-2">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                <Image 
                  src="/two.avif"
                  width={500}
                  height={500} 
                  alt="School Management Dashboard" 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-lg max-w-xs absolute -bottom-6 -right-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                    <span className="text-sky-600 font-bold text-lg">98%</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Satisfaction Rate</h3>
                    <p className="text-sm text-gray-500">From 25+ schools</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/4 -left-6 bg-white p-3 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xs">+32%</span>
                </div>
                <span className="font-medium text-sm">Academic Performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}