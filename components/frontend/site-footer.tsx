"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Linkedin, Twitter, Youtube, BookOpen } from "lucide-react";
import Link from "next/link";

// Custom Logo component (since the original imported a separate Logo component)
const FooterLogo = () => {
  return (
    <div className="flex items-center">
      <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
        <BookOpen className="h-5 w-5 text-sky-600" />
      </div>
      <span className="ml-2 text-xl font-bold text-white">SmartSchool</span>
    </div>
  );
};

export default function SiteFooter() {
  return (
    <footer className="w-full bg-sky-600 text-white">
      <div className="container px-4 py-16 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <FooterLogo />
            <p className="text-sm text-white/90">
              From admissions to academics, simplify every aspect of school
              administration with our comprehensive and user-friendly platform.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="rounded-full bg-white p-2 hover:bg-white/90"
              >
                <Twitter className="h-4 w-4 text-sky-600" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white p-2 hover:bg-white/90"
              >
                <Instagram className="h-4 w-4 text-sky-600" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white p-2 hover:bg-white/90"
              >
                <Linkedin className="h-4 w-4 text-sky-600" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white p-2 hover:bg-white/90"
              >
                <Youtube className="h-4 w-4 text-sky-600" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Get In Touch</h3>
            <div className="space-y-2 text-sm">
              <p>support@smartschool.com</p>
              <p>+91 945 658 3256</p>
              <p>61-A, Elm street, Gujarat, India.</p>
            </div>
            <div className="pt-2">
              <Link href="/demo" className="inline-block px-4 py-2 bg-white text-sky-600 font-medium rounded-md hover:bg-white/90 transition-colors">
                Request Demo
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Solutions</h3>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link className="hover:underline" href="/solutions/administrators">
                  For Administrators
                </Link>
                <Link className="hover:underline" href="/solutions/teachers">
                  For Teachers
                </Link>
                <Link className="hover:underline" href="/solutions/parents-students">
                  For Parents & Students
                </Link>
                <Link className="hover:underline" href="/solutions/districts">
                  For Districts
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Trust & Proof</h3>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link className="hover:underline" href="/trust/case-studies">
                  Case Studies
                </Link>
                <Link className="hover:underline" href="/trust/testimonials">
                  Testimonials
                </Link>
                <Link className="hover:underline" href="/trust/security-compliance">
                  Security & Compliance
                </Link>
              </nav>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources & Company</h3>
            <div className="grid grid-cols-2 gap-x-2">
              <nav className="flex flex-col space-y-2 text-sm">
                <Link className="hover:underline" href="/resources/blog">
                  Blog
                </Link>
                <Link className="hover:underline" href="/resources/library">
                  Resource Library
                </Link>
                <Link className="hover:underline" href="/resources/events">
                  Events & Webinars
                </Link>
                <Link className="hover:underline" href="/resources/help">
                  Help Center
                </Link>
              </nav>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link className="hover:underline" href="/company/about">
                  About Us
                </Link>
                <Link className="hover:underline" href="/company/careers">
                  Careers
                </Link>
                <Link className="hover:underline" href="/company/pricing">
                  Pricing & Plans
                </Link>
                <Link className="hover:underline" href="/contact">
                  Contact
                </Link>
              </nav>
            </div>
            <form className="space-y-2 pt-2">
              <Input
                className="bg-white/10 border-white/20 placeholder:text-white/50"
                placeholder="Enter email.."
                type="email"
              />
              <Button
                className="w-full bg-white text-sky-600 hover:bg-white/90"
                type="submit"
              >
                Subscribe
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-center text-sm md:flex-row md:py-4">
          <div className="text-white/60">
            Copyright © {new Date().getFullYear()} SmartSchool. All Rights Reserved.
          </div>
          <div className="flex space-x-4 text-white/60">
            <Link className="hover:text-white" href="/company/terms">
              Terms & Conditions
            </Link>
            <Link className="hover:text-white" href="/company/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}