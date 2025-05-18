"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown,
  Menu,
  X,
  BookOpen,
  LogIn
} from 'lucide-react';

interface NavLinkProps {
  href: string;
  text: string;
  isActive?: boolean;
}

interface NavDropdownProps {
  text: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text, isActive = false }) => {
  return (
    <Link href={href} className={`flex items-center px-3 py-2 rounded-md transition-colors ${
      isActive 
        ? 'text-sky-600 font-medium' 
        : 'text-gray-600 hover:text-sky-600 font-medium'
    }`}>
      <span>{text}</span>
    </Link>
  );
};

const NavDropdown: React.FC<NavDropdownProps> = ({ text, isOpen, toggleDropdown, children }) => {
  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 text-gray-600 hover:text-sky-600 font-medium rounded-md focus:outline-none"
      >
        <span>{text}</span>
        <ChevronDown size={16} className={`ml-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </div>
      )}
    </div>
  );
};

const MobileNavAccordion: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:bg-sky-50"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="px-4 py-2 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDrop, setActiveDrop] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (name: string) => {
    if (activeDrop === name) {
      setActiveDrop(null);
    } else {
      setActiveDrop(name);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-sky-500 rounded-md flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-800">SmartSchool</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavLink href="/" text="Home" isActive={true} />
            {/* <NavLink href="/features" text="Features" /> */}
            
            {/* Solutions Dropdown */}
            <NavDropdown 
              text="Solutions" 
              isOpen={activeDrop === 'solutions'} 
              toggleDropdown={() => toggleDropdown('solutions')}
            >
              <Link href="/solutions/administrators" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                For Administrators
              </Link>
              <Link href="/solutions/teachers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                For Teachers
              </Link>
              <Link href="/solutions/parents-students" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                For Parents & Students
              </Link>
              <Link href="/solutions/districts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                For Districts
              </Link>
            </NavDropdown>
            
            {/* Trust & Proof Dropdown */}
            <NavDropdown 
              text="Trust & Proof" 
              isOpen={activeDrop === 'trust'} 
              toggleDropdown={() => toggleDropdown('trust')}
            >
              <Link href="/trust/case-studies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Case Studies
              </Link>
              <Link href="/trust/testimonials" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Testimonials
              </Link>
              <Link href="/trust/security-compliance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Security & Compliance
              </Link>
            </NavDropdown>
            
            {/* Resources Dropdown */}
            <NavDropdown 
              text="Resources" 
              isOpen={activeDrop === 'resources'} 
              toggleDropdown={() => toggleDropdown('resources')}
            >
              <Link href="/resources/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Blog
              </Link>
              <Link href="/resources/library" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Resource Library
              </Link>
              <Link href="/resources/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Events & Webinars
              </Link>
              <Link href="/resources/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Help Center
              </Link>
            </NavDropdown>
            
            {/* Company Dropdown */}
            <NavDropdown 
              text="Company" 
              isOpen={activeDrop === 'company'} 
              toggleDropdown={() => toggleDropdown('company')}
            >
              <Link href="/company/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                About Us
              </Link>
              <Link href="/company/careers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Careers
              </Link>
              <Link href="/company/pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Pricing & Plans
              </Link>
              <Link href="/company/terms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Terms & Conditions
              </Link>
              <Link href="/company/privacy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                Privacy Policy
              </Link>
            </NavDropdown>
            
            <NavLink href="/contact" text="Contact" />
          </div>

          {/* Call to Action Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <Link href="/login" className="px-4 py-2 text-sky-600 border border-sky-600 font-medium rounded-md hover:bg-sky-50 transition-colors flex items-center">
              <LogIn size={16} className="mr-1" />
              <span>Login</span>
            </Link>
            <Link href="/demo" className="px-4 py-2 bg-sky-600 text-white font-medium rounded-md hover:bg-sky-700 transition-colors">
              Request Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:bg-sky-50 hover:text-sky-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 overflow-hidden">
          <div className="pt-2 pb-4 space-y-1">
            <Link href="/" className="block px-4 py-2 text-sky-600 font-medium">
              Home
            </Link>
            <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
              About
            </Link>
            <Link href="/features" className="block px-4 py-2 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
              Features
            </Link>
            
            <MobileNavAccordion title="Solutions">
              <div className="space-y-2">
                <Link href="/solutions/administrators" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  For Administrators
                </Link>
                <Link href="/solutions/teachers" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  For Teachers
                </Link>
                <Link href="/solutions/parents-students" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  For Parents & Students
                </Link>
                <Link href="/solutions/districts" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  For Districts
                </Link>
              </div>
            </MobileNavAccordion>
            
            <MobileNavAccordion title="Trust & Proof">
              <div className="space-y-2">
                <Link href="/trust/case-studies" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Case Studies
                </Link>
                <Link href="/trust/testimonials" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Testimonials
                </Link>
                <Link href="/trust/security-compliance" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Security & Compliance
                </Link>
              </div>
            </MobileNavAccordion>
            
            <MobileNavAccordion title="Resources">
              <div className="space-y-2">
                <Link href="/resources/blog" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Blog
                </Link>
                <Link href="/resources/library" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Resource Library
                </Link>
                <Link href="/resources/events" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Events & Webinars
                </Link>
                <Link href="/resources/help" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Help Center
                </Link>
              </div>
            </MobileNavAccordion>
            
            <MobileNavAccordion title="Company">
              <div className="space-y-2">
                <Link href="/company/about" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  About Us
                </Link>
                <Link href="/company/careers" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Careers
                </Link>
                <Link href="/company/pricing" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Pricing & Plans
                </Link>
                <Link href="/company/terms" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Terms & Conditions
                </Link>
                <Link href="/company/privacy" className="block py-1 text-sm text-gray-600 hover:text-sky-600">
                  Privacy Policy
                </Link>
              </div>
            </MobileNavAccordion>
            
            <Link href="/contact" className="block px-4 py-2 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
              Contact
            </Link>
            
            <div className="pt-4 px-4 space-y-3">
              <Link href="/login" className="flex items-center justify-center w-full px-4 py-2 border border-sky-600 text-sky-600 font-medium rounded-md hover:bg-sky-50 transition-colors">
                <LogIn size={16} className="mr-1" />
                <span>Login</span>
              </Link>
              <Link href="/demo" className="block w-full px-4 py-2 bg-sky-600 text-white font-medium rounded-md text-center hover:bg-sky-700 transition-colors">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;