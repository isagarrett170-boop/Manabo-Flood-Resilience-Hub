
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { BARANGAY_DATA, THEME_COLORS } from '../constants';
import { BarangayData, RiskLevel } from '../types';
import { MapPin, Activity, Info, Droplets, Users, Shield, Megaphone, Construction } from 'lucide-react';

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const colors = {
    [RiskLevel.VERY_HIGH]: 'bg-red-900 text-white',
    [RiskLevel.HIGH]: 'bg-red-600 text-white',
    [RiskLevel.MODERATE]: 'bg-orange-500 text-white',
    [RiskLevel.LOW]: 'bg-yellow-500 text-white',
    [RiskLevel.VERY_LOW]: 'bg-green-600 text-white',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colors[level]}`}>
      {level} Risk
    </span>
  );
};

const Dashboard: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(BARANGAY_DATA[0].id);
  const selectedData = BARANGAY_DATA.find(b => b.id === selectedId) || BARANGAY_DATA[0];

  // Prepare radar data
  const radarData = [
    { subject: 'Hazard', A: selectedData.hazard, fullMark: 1 },
    { subject: 'Vulnerability', A: selectedData.vulnerability, fullMark: 1 },
    { subject: 'Exposure', A: selectedData.exposure, fullMark: 1 },
    { subject: 'Soft CM', A: selectedData.softCM, fullMark: 1 },
    { subject: 'Hard CM', A: selectedData.hardCM, fullMark: 1 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Sidebar List */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[600px] lg:h-auto">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-700 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" /> Select Barangay
          </h2>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-1">
          {BARANGAY_DATA.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedId(b.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex justify-between items-center group ${
                selectedId === b.id 
                  ? 'bg-blue-50 border-blue-200 shadow-sm' 
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <span className={`font-medium ${selectedId === b.id ? 'text-blue-700' : 'text-slate-600'}`}>
                {b.name}
              </span>
              <div className={`w-3 h-3 rounded-full ${
                 b.riskLevel === RiskLevel.HIGH ? 'bg-red-500' :
                 b.riskLevel === RiskLevel.MODERATE ? 'bg-orange-400' : 'bg-green-400'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Details */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Header Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-1">{selectedData.name}</h1>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <span>Municipality of Manabo</span>
                        </div>
                    </div>
                    <RiskBadge level={selectedData.riskLevel} />
                </div>
                <p className="text-slate-600 leading-relaxed mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedData.description}
                </p>
                <div className="flex gap-2 items-start bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="font-bold block text-sm mb-1">Recommendation</span>
                        <span className="text-sm">{selectedData.recommendation}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" /> Risk Profile (0-1 Scale)
                </h3>
                <div className="flex-1 min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} />
                            <Radar
                                name={selectedData.name}
                                dataKey="A"
                                stroke={THEME_COLORS.FRI}
                                strokeWidth={3}
                                fill={THEME_COLORS.FRI}
                                fillOpacity={0.3}
                            />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-1 gap-4">
                {/* Hazard */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-red-50 text-red-600 rounded-lg">
                                <Droplets className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Hazard</span>
                        </div>
                        <span className="text-lg font-bold text-slate-800">{selectedData.hazard.toFixed(3)}</span>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${selectedData.hazard * 100}%`, backgroundColor: THEME_COLORS.HAZARD }}></div>
                     </div>
                </div>

                {/* Vulnerability */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
                                <Users className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Vulnerability</span>
                        </div>
                        <span className="text-lg font-bold text-slate-800">{selectedData.vulnerability.toFixed(3)}</span>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${selectedData.vulnerability * 100}%`, backgroundColor: THEME_COLORS.VULNERABILITY }}></div>
                     </div>
                </div>

                {/* Countermeasures */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <h4 className="font-semibold text-slate-700 text-sm">Countermeasures</h4>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500 flex items-center gap-1"><Megaphone className="w-3 h-3" /> Soft (Education)</span>
                                <span className="font-medium">{selectedData.softCM.toFixed(3)}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                                <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${selectedData.softCM * 100}%`, backgroundColor: THEME_COLORS.SOFT_CM }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500 flex items-center gap-1"><Construction className="w-3 h-3" /> Hard (Infra)</span>
                                <span className="font-medium">{selectedData.hardCM.toFixed(3)}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                                <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${selectedData.hardCM * 100}%`, backgroundColor: THEME_COLORS.HARD_CM }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
