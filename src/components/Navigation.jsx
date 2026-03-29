import React, { useState } from 'react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">HireAI</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <button 
            onClick={() => scrollToSection('hero')}
            className="hover:text-blue-100 transition"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('playbook')}
            className="hover:text-blue-100 transition"
          >
            Playbook
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="hover:text-blue-100 transition"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="hover:text-blue-100 transition"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection('signup')}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-2">
          <button 
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 hover:text-blue-100 transition"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('playbook')}
            className="block w-full text-left py-2 hover:text-blue-100 transition"
          >
            Playbook
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="block w-full text-left py-2 hover:text-blue-100 transition"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="block w-full text-left py-2 hover:text-blue-100 transition"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection('signup')}
            className="w-full bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
