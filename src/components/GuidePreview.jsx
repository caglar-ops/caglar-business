import React, { useState } from 'react';

export default function GuidePreview() {
  const [showPreview, setShowPreview] = useState(false);

  const tableOfContents = [
    "Part 1: Identify Your AI Needs",
    "  • Do You Actually Need an AI Hire?",
    "  • AI Role Assessment Matrix",
    "  • Red Flags & Green Flags",
    "",
    "Part 2: Source & Screen Top Talent",
    "  • Where to Find AI Talent",
    "  • Quick Screening Questions",
    "  • Portfolio Evaluation Rubric",
    "",
    "Part 3: Evaluate Real Capability",
    "  • Technical Interview Framework",
    "  • System Design Questions",
    "  • Work Sample Test Process",
    "",
    "Part 4: Onboard & Deploy",
    "  • Day 1 Setup Checklist",
    "  • Week 1 Foundations",
    "  • 30-60-90 Day Plan",
    "",
    "Part 5: Unlock ROI",
    "  • Project Selection Framework",
    "  • KPI & Impact Tracking",
    "  • Success Case Studies",
    "",
    "Part 6: Retain & Grow",
    "  • Compensation & Benefits Benchmark",
    "  • Career Growth Paths",
    "  • Retention Signals & Interventions"
  ];

  return (
    <section id="guide-preview" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Preview the Playbook
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Preview */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h3>
            <div className="bg-white p-6 rounded-lg font-mono text-sm text-gray-700 max-h-96 overflow-y-auto space-y-1">
              {tableOfContents.map((line, idx) => (
                <div key={idx} className={line === "" ? "h-2" : ""}>
                  {line}
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-4">
              + Detailed frameworks, templates, case studies, and resources for each section
            </p>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Inside the Guide
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <p className="font-bold text-gray-900">6 Complete Modules</p>
                  <p className="text-gray-600">Each with frameworks, templates, and checklists</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-bold text-gray-900">Assessment Tools</p>
                  <p className="text-gray-600">Role matrix, scoring rubrics, evaluation templates</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-bold text-gray-900">Interview Questions</p>
                  <p className="text-gray-600">35+ real questions to identify top talent</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-bold text-gray-900">Case Studies</p>
                  <p className="text-gray-600">Real examples from successful AI hiring</p>
                </div>
              </li>
            </ul>

            <button
              onClick={() => {
                // Mock download - in production, this would fetch the actual PDF
                const link = document.createElement('a');
                link.href = '#';
                link.download = 'how-to-hire-ai-guide.pdf';
                link.click();
                alert('In production, this would download the full PDF guide.');
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition shadow-lg mb-3"
            >
              ⬇️ Download Guide (PDF)
            </button>
            <p className="text-sm text-gray-600 text-center">
              Free preview • Full 50-page guide • Immediately accessible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
