import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          THE Guide to <span className="text-blue-600">Hiring AI</span> Effectively
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Stop hiring AI talent blindly. Learn the exact framework used by 500+ teams to source, evaluate, and onboard top AI engineers and researchers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={() => document.getElementById('guide-preview')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition shadow-lg"
          >
            Download Guide (Free Preview)
          </button>
          <button 
            onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg text-lg border-2 border-blue-600 transition"
          >
            Explore Training
          </button>
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div>
            <p className="text-4xl font-bold text-blue-600">500+</p>
            <p className="text-gray-600">Teams Built with This Framework</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600">92%</p>
            <p className="text-gray-600">Successful Hires in First Year</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-orange-500">$2.4M</p>
            <p className="text-gray-600">Avg Value Created by Teams</p>
          </div>
        </div>
      </div>
    </section>
  );
}
