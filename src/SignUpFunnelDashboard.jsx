import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Filter } from 'lucide-react';

export default function SignUpFunnelDashboard() {
  // Sample data - replace with your actual API data
  const [dateRange, setDateRange] = useState('last-7-days');
  const [marketplace, setMarketplace] = useState('all');
  
  // Sample metrics data
  const rawMetrics = {
    landingPageVisits: 10000,
    signUpClicked: 7500,
    existingAccountUsed: 2000,
    newAccountClicked: 5500,
    reachedEligibility: 4800,
    instagramAttempted: 2400,
    youtubeAttempted: 1200,
    tiktokAttempted: 800,
    facebookAttempted: 400,
    instagramPassed: 2000,
    youtubePassed: 900,
    tiktokPassed: 600,
    facebookPassed: 300,
    addedPictureBio: 3500,
    addedAddress: 3200,
    signUpSuccess: 3000
  };

  // Calculate funnel data with conversion rates
  const funnelData = useMemo(() => {
    const data = [
      { 
        step: 'Landing Page Visits', 
        value: rawMetrics.landingPageVisits,
        previous: rawMetrics.landingPageVisits,
        percentage: 100
      },
      { 
        step: 'Sign Up Clicked', 
        value: rawMetrics.signUpClicked,
        previous: rawMetrics.landingPageVisits,
        percentage: ((rawMetrics.signUpClicked / rawMetrics.landingPageVisits) * 100).toFixed(1)
      },
      { 
        step: 'Existing Account', 
        value: rawMetrics.existingAccountUsed,
        previous: rawMetrics.signUpClicked,
        percentage: ((rawMetrics.existingAccountUsed / rawMetrics.signUpClicked) * 100).toFixed(1)
      },
      { 
        step: 'New Account Created', 
        value: rawMetrics.newAccountClicked,
        previous: rawMetrics.signUpClicked,
        percentage: ((rawMetrics.newAccountClicked / rawMetrics.signUpClicked) * 100).toFixed(1)
      },
      { 
        step: 'Reached Eligibility', 
        value: rawMetrics.reachedEligibility,
        previous: rawMetrics.signUpClicked,
        percentage: ((rawMetrics.reachedEligibility / rawMetrics.signUpClicked) * 100).toFixed(1)
      },
      { 
        step: 'Added Picture & Bio', 
        value: rawMetrics.addedPictureBio,
        previous: rawMetrics.reachedEligibility,
        percentage: ((rawMetrics.addedPictureBio / rawMetrics.reachedEligibility) * 100).toFixed(1)
      },
      { 
        step: 'Added Address', 
        value: rawMetrics.addedAddress,
        previous: rawMetrics.addedPictureBio,
        percentage: ((rawMetrics.addedAddress / rawMetrics.addedPictureBio) * 100).toFixed(1)
      },
      { 
        step: 'Sign Up Complete', 
        value: rawMetrics.signUpSuccess,
        previous: rawMetrics.addedAddress,
        percentage: ((rawMetrics.signUpSuccess / rawMetrics.addedAddress) * 100).toFixed(1)
      }
    ];
    return data;
  }, []);

  // Social verification data
  const socialData = [
    { 
      platform: 'Instagram', 
      attempted: rawMetrics.instagramAttempted, 
      passed: rawMetrics.instagramPassed,
      passRate: ((rawMetrics.instagramPassed / rawMetrics.instagramAttempted) * 100).toFixed(1)
    },
    { 
      platform: 'YouTube', 
      attempted: rawMetrics.youtubeAttempted, 
      passed: rawMetrics.youtubePassed,
      passRate: ((rawMetrics.youtubePassed / rawMetrics.youtubeAttempted) * 100).toFixed(1)
    },
    { 
      platform: 'TikTok', 
      attempted: rawMetrics.tiktokAttempted, 
      passed: rawMetrics.tiktokPassed,
      passRate: ((rawMetrics.tiktokPassed / rawMetrics.tiktokAttempted) * 100).toFixed(1)
    },
    { 
      platform: 'Facebook', 
      attempted: rawMetrics.facebookAttempted, 
      passed: rawMetrics.facebookPassed,
      passRate: ((rawMetrics.facebookPassed / rawMetrics.facebookAttempted) * 100).toFixed(1)
    }
  ];

  // Calculate overall conversion rate
  const overallConversion = ((rawMetrics.signUpSuccess / rawMetrics.landingPageVisits) * 100).toFixed(2);

  // Get color based on conversion rate
  const getConversionColor = (rate) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Sign-Up Funnel Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Track user journey from landing to completion</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 px-6 py-3 rounded-lg border border-blue-200">
                <div className="text-sm text-slate-600">Overall Conversion</div>
                <div className="text-2xl font-bold text-blue-600">{overallConversion}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Date Range
              </label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Marketplace
              </label>
              <select 
                value={marketplace}
                onChange={(e) => setMarketplace(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">All Marketplaces</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="uae">UAE</option>
                <option value="saudi">Saudi Arabia</option>
                <option value="egypt">Egypt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Detailed Funnel Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Detailed Funnel Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Stage</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Users</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Drop-off</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Conversion %</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Overall %</th>
                </tr>
              </thead>
              <tbody>
                {funnelData.map((item, index) => {
                  const dropOff = index > 0 ? funnelData[index - 1].value - item.value : 0;
                  const overallPercent = ((item.value / rawMetrics.landingPageVisits) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-slate-800 font-medium">{item.step}</td>
                      <td className="py-3 px-4 text-sm text-slate-800 text-right font-semibold">
                        {item.value.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-red-600 text-right">
                        {dropOff > 0 ? `-${dropOff.toLocaleString()}` : '-'}
                      </td>
                      <td className={`py-3 px-4 text-sm text-right font-semibold ${getConversionColor(parseFloat(item.percentage))}`}>
                        {item.percentage}%
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 text-right">
                        {overallPercent}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Social Verification Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Social Media Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={socialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="platform" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="attempted" fill="#3b82f6" name="Attempted" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="passed" fill="#22c55e" name="Passed" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {socialData.map((platform, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">{platform.platform}</h3>
                    <span className={`text-lg font-bold ${getConversionColor(parseFloat(platform.passRate))}`}>
                      {platform.passRate}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600">Attempted</div>
                      <div className="text-xl font-semibold text-blue-600">{platform.attempted.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Passed</div>
                      <div className="text-xl font-semibold text-green-600">{platform.passed.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="mt-3 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all duration-500"
                      style={{ width: `${platform.passRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
