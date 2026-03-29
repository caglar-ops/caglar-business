import React from 'react';

export default function ProblemSection() {
  const problems = [
    {
      title: "AI Hiring Crisis",
      description: "The market is flooded with mediocre \"AI engineers\" who can't ship production code. How do you separate signal from noise?",
      icon: "⚠️"
    },
    {
      title: "Evaluation Blind Spot",
      description: "Traditional interviews don't reveal real capability. You need frameworks to test actual project delivery skills.",
      icon: "🔍"
    },
    {
      title: "Onboarding Friction",
      description: "New AI hires struggle with your infrastructure, data, and project context. Most fail in the first 90 days.",
      icon: "🚧"
    },
    {
      title: "Retention Challenges",
      description: "AI talent is hot. Without clear growth paths and impact metrics, they leave. You need a retention strategy.",
      icon: "📊"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          The AI Hiring Problem
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <p className="text-4xl mb-4">{problem.icon}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-700 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-8 rounded-xl border-l-4 border-blue-600">
          <p className="text-lg text-gray-800">
            <strong>Without the right framework, you'll hire the wrong people, waste 6 months, and learn lessons the expensive way.</strong> This guide condenses years of hiring data into 1 playbook.
          </p>
        </div>
      </div>
    </section>
  );
}
