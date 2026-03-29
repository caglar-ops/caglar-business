import React from 'react';

export default function ServiceOffering() {
  const services = [
    {
      name: "Training Bundle",
      price: "$4,999",
      duration: "4 weeks",
      description: "Learn the framework at your own pace",
      features: [
        "Access to complete playbook",
        "Weekly office hours",
        "60+ templates & checklists",
        "Interview question bank",
        "Lifetime updates"
      ],
      icon: "📚"
    },
    {
      name: "Setup Service",
      price: "$12,999",
      duration: "8 weeks",
      description: "We customize and implement it for you",
      features: [
        "Everything in Training",
        "Custom role assessments",
        "Job description templates",
        "Interview process setup",
        "Onboarding plan creation",
        "2x monthly consultation"
      ],
      icon: "⚙️",
      featured: true
    },
    {
      name: "Retained Coaching",
      price: "$2,499/mo",
      duration: "Ongoing",
      description: "We're your AI hiring coach",
      features: [
        "Everything in Setup",
        "Unlimited consultations",
        "Real-time candidate feedback",
        "Offer negotiation help",
        "Retention strategy",
        "Quarterly strategy reviews"
      ],
      icon: "🎯"
    }
  ];

  return (
    <section id="services" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Choose Your Path
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Whether you're doing it solo or want expert guidance
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`rounded-xl p-8 transition ${
                service.featured 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105 md:scale-110' 
                  : 'bg-white border border-gray-200 hover:shadow-lg'
              }`}
            >
              <p className="text-5xl mb-4">{service.icon}</p>
              <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
              <p className={`text-sm mb-4 ${service.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                {service.duration}
              </p>
              <div className={`text-3xl font-bold mb-2 ${service.featured ? '' : 'text-blue-600'}`}>
                {service.price}
              </div>
              <p className={`text-sm mb-6 ${service.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className={service.featured ? 'text-blue-200' : 'text-blue-600'}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full font-bold py-3 px-6 rounded-lg transition ${
                  service.featured 
                    ? 'bg-white text-blue-600 hover:bg-blue-50' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
