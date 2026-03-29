import React from 'react';

export default function CaseStudies() {
  const cases = [
    {
      company: "Fintech Startup (Series B)",
      challenge: "Needed 3 ML engineers to build fraud detection system. Previous hires didn't work out.",
      result: "Hired 3 engineers using the framework. All still there 2 years later. Model improved fraud detection by 67%.",
      metric: "$4.2M value created"
    },
    {
      company: "Enterprise SaaS (1000+ employees)",
      challenge: "Had $500K AI budget but didn't know what to hire for. Risky investment.",
      result: "Used role assessment matrix to identify exact needs. Hired 1 senior ML engineer + 1 data scientist. ROI in 6 months.",
      metric: "5.2x ROI"
    },
    {
      company: "AI-First Scale-up",
      challenge: "Competing with big tech for talent. High turnover despite good pay.",
      result: "Implemented retention framework. Structured growth paths + impact communication. 0 turnover in 18 months.",
      metric: "92% retention"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Results That Speak
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{c.company}</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Challenge</p>
                  <p className="text-gray-700">{c.challenge}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Result</p>
                  <p className="text-gray-700">{c.result}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-blue-600 font-bold">{c.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
