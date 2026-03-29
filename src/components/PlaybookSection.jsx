import React from 'react';

export default function PlaybookSection() {
  const steps = [
    {
      num: "01",
      title: "Identify Your AI Needs",
      description: "Assessment framework to determine what AI role you actually need, and the red flags that indicate you're not ready.",
      checklist: ["Role Assessment Matrix", "Data Requirements", "Success Metrics"]
    },
    {
      num: "02",
      title: "Source & Screen Top Talent",
      description: "Know where to find real AI talent and how to quickly disqualify candidates without deep technical interviews.",
      checklist: ["High-Signal Sources", "Quick Screen Questions", "Portfolio Evaluation"]
    },
    {
      num: "03",
      title: "Evaluate Real Capability",
      description: "Interview frameworks that reveal actual project delivery skills, not just whiteboard ability.",
      checklist: ["Technical Assessment", "System Design", "Work Sample Tests"]
    },
    {
      num: "04",
      title: "Onboard & Deploy Quickly",
      description: "90-day ramp plan to get new hires productive, integrated with your infrastructure and team.",
      checklist: ["Day 1 Setup", "Week 1 Foundations", "30-60-90 Milestones"]
    },
    {
      num: "05",
      title: "Unlock ROI",
      description: "Project structure and impact measurement frameworks to ensure you're getting value from your AI investment.",
      checklist: ["Project Selection", "KPI Tracking", "Impact Analysis"]
    },
    {
      num: "06",
      title: "Retain & Grow",
      description: "Long-term retention strategy including career paths, compensation benchmarks, and continuous development.",
      checklist: ["Compensation Strategy", "Growth Paths", "Retention Signals"]
    }
  ];

  return (
    <section id="playbook" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          The 6-Step Hiring Framework
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          This is what's inside the playbook. Each section includes templates, checklists, and real examples.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>
              
              <div className="space-y-2">
                {step.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
