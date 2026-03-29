import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import PlaybookSection from './components/PlaybookSection';
import GuidePreview from './components/GuidePreview';
import ServiceOffering from './components/ServiceOffering';
import SignupForm from './components/SignupForm';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  const [signupSuccess, setSignupSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ProblemSection />
      <PlaybookSection />
      <GuidePreview />
      <ServiceOffering />
      <CaseStudies />
      <Testimonials />
      <SignupForm onSuccess={() => setSignupSuccess(true)} />
      <Footer />
    </div>
  );
}
