import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "We went from hiring blindly to having a repeatable, high-quality hiring process in 4 weeks. This is the framework we needed.",
      author: "Sarah Chen",
      role: "VP Engineering",
      company: "Series B AI Startup",
      avatar: "SC"
    },
    {
      quote: "The role assessment matrix alone saved us from hiring the wrong person. This guide is worth 10x the price.",
      author: "Marcus Thompson",
      role: "Hiring Manager",
      company: "Fortune 500 Tech",
      avatar: "MT"
    },
    {
      quote: "We used the retention strategies section and went from losing people to building loyalty. Game changer.",
      author: "Priya Desai",
      role: "Head of Talent",
      company: "ML-First Company",
      avatar: "PD"
    },
    {
      quote: "The interview frameworks helped us identify who could actually ship vs. who was just good at whiteboarding.",
      author: "James Rodriguez",
      role: "Engineering Director",
      company: "AI Infrastructure Startup",
      avatar: "JR"
    },
    {
      quote: "Implementing the 30-60-90 day plan cut our onboarding time in half and improved success rates dramatically.",
      author: "Lisa Wang",
      role: "Head of People Ops",
      company: "Data Science Company",
      avatar: "LW"
    },
    {
      quote: "The compensation benchmarks helped us negotiate better offers and compete with big tech. Highly recommended.",
      author: "Alex Patel",
      role: "CEO",
      company: "AI Agency",
      avatar: "AP"
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          What Hiring Leaders Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 mb-4 italic">"{t.quote}"</p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-600">{t.role}</p>
                  <p className="text-xs text-gray-500">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
