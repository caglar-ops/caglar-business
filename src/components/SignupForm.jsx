import React, { useState } from 'react';

export default function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    teamSize: '',
    service: 'training'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In production, this would send to a backend API or email service
      const response = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {
        // Fallback for static deployment
        console.log('Form submission (would send to backend):', formData);
        return { ok: true };
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', role: '', company: '', teamSize: '', service: 'training' });
        onSuccess?.();
        
        // Reset after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Form error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="signup" className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 border-l-4 border-green-600 p-8 rounded-lg">
            <p className="text-4xl mb-4">✅</p>
            <h3 className="text-2xl font-bold text-green-900 mb-2">Got it!</h3>
            <p className="text-green-700 text-lg">
              Check your email for access to the playbook and next steps. We'll reach out within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="signup" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Started Today</h2>
          <p className="text-gray-600 mb-8">
            Join 500+ teams using this framework to hire top AI talent
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="you@company.com"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Your Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select role</option>
                <option value="recruiter">Recruiter</option>
                <option value="hiring-manager">Hiring Manager</option>
                <option value="engineering-lead">Engineering Lead</option>
                <option value="cto">CTO/VP Engineering</option>
                <option value="founder">Founder/CEO</option>
                <option value="hr">HR/People Ops</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your company"
              />
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                AI/ML Team Size
              </label>
              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select team size</option>
                <option value="0">None yet (first hire)</option>
                <option value="1-3">1-3 people</option>
                <option value="4-10">4-10 people</option>
                <option value="11-50">11-50 people</option>
                <option value="50+">50+ people</option>
              </select>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Which service are you interested in? *
              </label>
              <div className="space-y-3">
                {[
                  { value: 'training', label: 'Training Bundle ($4,999)', desc: 'Self-paced learning' },
                  { value: 'setup', label: 'Setup Service ($12,999)', desc: 'We customize it for you' },
                  { value: 'coaching', label: 'Retained Coaching ($2,499/mo)', desc: 'Ongoing support' }
                ].map(option => (
                  <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                    <input
                      type="radio"
                      name="service"
                      value={option.value}
                      checked={formData.service === option.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Get Access to the Playbook'}
            </button>

            <p className="text-xs text-gray-600 text-center">
              We respect your privacy. Unsubscribe anytime. No spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
