'use client';

import { useState, useEffect } from 'react';

interface Signup {
  name: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  year: string;
  willingToPay: string;
  timestamp: string;
}

export default function AdminPage() {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    willingToPay: 0,
    maybe: 0,
    uploadOnly: 0
  });

  useEffect(() => {
    // Fetch from API
    const fetchSignups = async () => {
      try {
        const response = await fetch('/api/signups');
        if (response.ok) {
          const result = await response.json();
          const data = result.data || [];
          setSignups(data);
          
          const stats = {
            total: data.length,
            willingToPay: data.filter((s: Signup) => s.willingToPay === 'yes').length,
            maybe: data.filter((s: Signup) => s.willingToPay === 'maybe').length,
            uploadOnly: data.filter((s: Signup) => s.willingToPay === 'no').length
          };
          setStats(stats);
        } else {
          // Fallback to localStorage if API fails
          const data = JSON.parse(localStorage.getItem('studyhero-signups') || '[]');
          setSignups(data);
          
          const stats = {
            total: data.length,
            willingToPay: data.filter((s: Signup) => s.willingToPay === 'yes').length,
            maybe: data.filter((s: Signup) => s.willingToPay === 'maybe').length,
            uploadOnly: data.filter((s: Signup) => s.willingToPay === 'no').length
          };
          setStats(stats);
        }
      } catch (error) {
        console.error('Error fetching signups:', error);
        // Fallback to localStorage
        const data = JSON.parse(localStorage.getItem('studyhero-signups') || '[]');
        setSignups(data);
        
        const stats = {
          total: data.length,
          willingToPay: data.filter((s: Signup) => s.willingToPay === 'yes').length,
          maybe: data.filter((s: Signup) => s.willingToPay === 'maybe').length,
          uploadOnly: data.filter((s: Signup) => s.willingToPay === 'no').length
        };
        setStats(stats);
      }
    };
    
    fetchSignups();
  }, []);

  const exportToCSV = () => {
    if (signups.length === 0) return;
    
    const headers = ['Name', 'Email', 'Phone', 'University', 'Course', 'Year', 'Willing to Pay', 'Timestamp'];
    const rows = signups.map(s => [
      s.name,
      s.email,
      s.phone,
      s.university,
      s.course,
      s.year,
      s.willingToPay,
      new Date(s.timestamp).toLocaleString()
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studyhero-signups-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">StudyHero Admin Dashboard</h1>
          <p className="text-gray-600">Waitlist signups and validation metrics</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Signups</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.willingToPay}</div>
            <div className="text-sm text-gray-600">Willing to Pay (Yes)</div>
            {stats.total > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                {((stats.willingToPay / stats.total) * 100).toFixed(1)}%
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.maybe}</div>
            <div className="text-sm text-gray-600">Maybe (Content Dependent)</div>
            {stats.total > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                {((stats.maybe / stats.total) * 100).toFixed(1)}%
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.uploadOnly}</div>
            <div className="text-sm text-gray-600">Upload-to-Unlock Only</div>
            {stats.total > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                {((stats.uploadOnly / stats.total) * 100).toFixed(1)}%
              </div>
            )}
          </div>
        </div>

        {/* Export Button */}
        <div className="mb-6">
          <button
            onClick={exportToCSV}
            disabled={signups.length === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export to CSV ({signups.length} records)
          </button>
        </div>

        {/* Signups Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Pay?
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {signups.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No signups yet. Visit the homepage to test the form.
                    </td>
                  </tr>
                ) : (
                  signups.map((signup, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{signup.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{signup.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{signup.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{signup.university}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{signup.course}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{signup.year}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          signup.willingToPay === 'yes' ? 'bg-green-100 text-green-800' :
                          signup.willingToPay === 'maybe' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {signup.willingToPay}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(signup.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Validation Decision */}
        {signups.length > 0 && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Validation Decision Guide</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                ✅ <strong>Green light if:</strong> 100+ signups AND 40%+ willing to pay
              </p>
              <p>
                ⚠️ <strong>Consider proceeding if:</strong> 50+ signups AND strong university concentration
              </p>
              <p>
                ❌ <strong>Pivot/adjust if:</strong> Low signups OR less than 20% willing to pay
              </p>
              <p className="mt-4 font-semibold">
                Your status: {
                  signups.length >= 100 && (stats.willingToPay / stats.total) >= 0.4 ? '✅ GREEN LIGHT - Build MVP!' :
                  signups.length >= 50 ? '⚠️ CONSIDER PROCEEDING' :
                  '❌ Keep validating or adjust positioning'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
