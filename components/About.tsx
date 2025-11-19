import React from 'react';
import { FileText, Target, Users, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">About the Study</h2>
        <p className="text-slate-500">Mapping and Indexing Flood Risk in Manabo, Abra (2025)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-700">Objective</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">
                        To develop a comprehensive Flood Risk Index (FRI) map for the 11 barangays of Manabo, identifying high-risk zones to guide local government planning.
                    </p>
                </div>
            </div>
            
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-700">Methodology</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">
                        A quantitative-developmental design integrating GIS mapping, secondary data analysis, and the Analytic Hierarchy Process (AHP) to weigh risk factors.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" /> Key Findings
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Luzong</strong> is the only High Risk barangay due to river proximity and lack of structural defenses.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Awareness Gap:</strong> Residents have high general hazard awareness but low personal vulnerability awareness.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Soft Countermeasures:</strong> Low across the board. Education and drills need significant improvement.</span>
                </li>
            </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-8">
        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 justify-center">
            <Users className="w-5 h-5 text-slate-400" /> Research Team
        </h3>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <span className="px-4 py-2 bg-slate-50 rounded-full border border-slate-200">Benedito, Angelzen A.</span>
            <span className="px-4 py-2 bg-slate-50 rounded-full border border-slate-200">Duran, Rolly A.</span>
            <span className="px-4 py-2 bg-slate-50 rounded-full border border-slate-200">Pasal, Dominique B.</span>
            <span className="px-4 py-2 bg-slate-50 rounded-full border border-slate-200">Tadeo, Jeffershane Mae R.</span>
            <span className="px-4 py-2 bg-slate-50 rounded-full border border-slate-200">Tulan, Whitney B.</span>
        </div>
      </div>
    </div>
  );
};

export default About;