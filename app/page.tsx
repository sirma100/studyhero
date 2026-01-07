'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    year: '',
    willingToPay: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const universities = [
    'University of Nairobi',
    'Kenyatta University',
    'Strathmore University',
    'Jomo Kenyatta University of Agriculture and Technology',
    'United States International University Africa',
    'Mount Kenya University',
    'Egerton University',
    'Moi University',
    'Kenya Methodist University',
    'KCA University',
    'Technical University of Kenya',
    'The Catholic University of Eastern Africa',
    'Maseno University',
    'University of Eldoret',
    'Murang\'a University of Technology',
    'Daystar University',
    'Pwani University',
    'Dedan Kimathi University of Technology',
    'Kabarak University',
    'Chuka University',
    'Tangaza University',
    'Masinde Muliro University of Science and Technology',
    'Zetech University',
    'Meru University of Science and Technology',
    'South Eastern Kenya University',
    'Technical University of Mombasa',
    'Africa Nazarene University',
    'Islamic University of Kenya',
    'Jaramogi Oginga Odinga University of Science and Technology',
    'Karatina University',
    'Kisii University',
    'University of Embu',
    'Riara University',
    'University of Eastern Africa, Baraton',
    'Maasai Mara University',
    'The Co-operative University of Kenya',
    'Multimedia University of Kenya',
    'Kaimosi Friends University',
    'Africa International University',
    'Machakos University',
    'Kibabii University',
    'The Presbyterian University of East Africa',
    'Management University of Africa',
    'Garissa University',
    'Laikipia University',
    'Adventist University of Africa',
    'Pan Africa Christian University',
    'Pioneer International University',
    'Umma University',
    'Taita Taveta University',
    'Lukenya University',
    'Kiriri Women\'s University of Science and Technology',
    'GRETSA University',
    'Kaimosi Friends University',
    'Tom Mboya University',
    'Tharaka University',
    'Scott Christian University',
    'International Leadership University',
    'KAG East University',
    'Kabarak University',
    'Kenya Highlands University',
    'Alupe University',
    'The East African University',
    'Uzima University',
    'University of Kabianga',
    'Rongo University',
    'Amref International University',
    'Great Lakes University of Kisumu',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to API (and also keep localStorage as backup)
      const response = await fetch('/api/signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save signup');
      }

      // Also save to localStorage as backup
      const submissions = JSON.parse(localStorage.getItem('studyhero-signups') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('studyhero-signups', JSON.stringify(submissions));

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SH</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">StudyHero</span>
          </div>
          <span className="text-sm text-gray-600 font-medium">.co.ke</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            🇰🇪 Built for Kenyan Students
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stop Searching WhatsApp Groups for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Past Papers & Notes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access <span className="font-semibold text-gray-800">past papers, CATs, assignments, and verified notes</span> from your university. 
            Get AI tutoring in Swahili & English. Pay with M-Pesa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">10,000+ Resources</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">AI Tutor Included</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">From KES 50/day</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-12 md:py-16 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Tired of This? 🤦🏾‍♂️
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="text-3xl mb-3">😤</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Endless WhatsApp Searches</h3>
                <p className="text-gray-600">Scrolling through 20 class groups to find last year's paper</p>
              </div>
              
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="text-3xl mb-3">💸</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Expensive Foreign Sites</h3>
                <p className="text-gray-600">CourseHero charges $10/month and has zero Kenyan content</p>
              </div>
              
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="text-3xl mb-3">🗑️</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Broken Google Drive Links</h3>
                <p className="text-gray-600">"Access denied" or outdated notes from 2018</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              How StudyHero Works 🚀
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">Upload & Unlock</h3>
                <p className="text-gray-600">Upload 1 past paper → unlock 3 documents. No money needed!</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">Or Pay via M-Pesa</h3>
                <p className="text-gray-600">KES 50/day, KES 300/month. STK push. Done in 30 seconds.</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">AI Tutor Included</h3>
                <p className="text-gray-600">Ask questions in Swahili/English. Get explanations & practice questions.</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">Your University, Your Course</h3>
                <p className="text-gray-600">Filter by university, unit code, year. Find exactly what you need.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!submitted ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                  Join the Waitlist 🎓
                </h2>
                <p className="text-center text-blue-100 mb-8 text-lg">
                  Be among the first 500 students to get <span className="font-bold text-white">3 months FREE</span> + lifetime upload rewards
                </p>
                
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Kamau"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@student.ku.ac.ke"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0712345678"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">University *</label>
                      <select
                        required
                        value={formData.university}
                        onChange={(e) => setFormData({...formData, university: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select your university</option>
                        {universities.map(uni => (
                          <option key={uni} value={uni}>{uni}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Course/Program *</label>
                      <input
                        type="text"
                        required
                        value={formData.course}
                        onChange={(e) => setFormData({...formData, course: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Computer Science, Medicine, Business"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Year of Study *</label>
                      <select
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select year</option>
                        <option value="1">Year 1</option>
                        <option value="2">Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4</option>
                        <option value="5+">Year 5+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Would you pay KES 300/month for unlimited access? *
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            required
                            value="yes"
                            checked={formData.willingToPay === 'yes'}
                            onChange={(e) => setFormData({...formData, willingToPay: e.target.value})}
                            className="mr-2"
                          />
                          <span>Yes, absolutely!</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="maybe"
                            checked={formData.willingToPay === 'maybe'}
                            onChange={(e) => setFormData({...formData, willingToPay: e.target.value})}
                            className="mr-2"
                          />
                          <span>Maybe, depends on content quality</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="no"
                            checked={formData.willingToPay === 'no'}
                            onChange={(e) => setFormData({...formData, willingToPay: e.target.value})}
                            className="mr-2"
                          />
                          <span>No, prefer upload-to-unlock only</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Joining...' : 'Join Waitlist - Get 3 Months FREE 🎉'}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By signing up, you agree to get updates about StudyHero launch
                  </p>
                </form>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">You're In!</h3>
                <p className="text-lg text-gray-600 mb-6">
                  You're #<span className="font-bold text-blue-600">{Math.floor(Math.random() * 500) + 1}</span> on the waitlist
                </p>
                <p className="text-gray-600 mb-8">
                  We'll email you at <span className="font-semibold">{formData.email}</span> when we launch. 
                  Share with classmates to move up the list!
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                    Share on WhatsApp
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    Share on Twitter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold">StudyHero</span>
            <span className="text-gray-400">.co.ke</span>
          </div>
          <p className="text-gray-400 text-sm">
            Made with 💚 for Kenyan students | Launching 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
