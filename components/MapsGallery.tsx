
import React, { useState, useCallback, useEffect } from 'react';
import { BARANGAY_DATA, THEME_COLORS, MAP_PALETTES } from '../constants';
import { BarangayData } from '../types';
import { Layers, Info, Image as ImageIcon, Save, UploadCloud, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';

// Categories matching Thesis Figures
type MapCategory = 'FRI' | 'HAZARD' | 'VULNERABILITY' | 'EXPOSURE' | 'SOFT_CM' | 'HARD_CM';

const MapsGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MapCategory>('FRI');
  const [hoveredBarangay, setHoveredBarangay] = useState<string | null>(null);
  
  // Initialize custom images from LocalStorage
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});
  const [retryTrigger, setRetryTrigger] = useState(0);

  // Load from local storage on mount
  useEffect(() => {
    try {
        const saved = localStorage.getItem('manabo_custom_maps');
        if (saved) {
            setCustomImages(JSON.parse(saved));
        }
    } catch (e) {
        console.error("Failed to load maps from storage:", e);
    }
  }, []);

  // Configuration based on Thesis Figures
  // Using absolute paths (starting with /) is standard for assets in the public/ folder
  const categories: { 
    id: MapCategory; 
    label: string; 
    baseColor: string; 
    desc: string; 
    figure: string;
    tableRef: string;
    getValue: (b: BarangayData) => number;
    getRating: (b: BarangayData) => string;
    imagePath: string;
  }[] = [
    { 
      id: 'FRI', 
      label: 'Flood Risk Index', 
      baseColor: THEME_COLORS.FRI, 
      desc: 'Figure 1.1 shows Luzong (High Risk) in deep orange. San Ramon East is the safest.', 
      figure: 'Figure 1.1: Flood Risk Index Map',
      tableRef: 'Table 10.1',
      getValue: (b) => b.fri,
      getRating: (b) => b.riskLevel,
      imagePath: '/fri_map.png'
    },
    { 
      id: 'HAZARD', 
      label: 'Hazard', 
      baseColor: THEME_COLORS.HAZARD, 
      desc: 'Figure 2.1: Luzong and Sto. Tomas are Very High risk (Deep Red) due to river proximity.', 
      figure: 'Figure 2.1: Hazard Map',
      tableRef: 'Table 4.3',
      getValue: (b) => b.hazard,
      getRating: (b) => {
          if (b.hazard > 0.800) return 'Very High';
          if (b.hazard > 0.600) return 'High';
          if (b.hazard > 0.400) return 'Moderate';
          if (b.hazard > 0.200) return 'Low';
          return 'Very Low';
      },
      imagePath: '/hazard_map.png'
    },
    { 
      id: 'VULNERABILITY', 
      label: 'Vulnerability', 
      baseColor: THEME_COLORS.VULNERABILITY, 
      desc: 'Figure 2.2: Sto. Tomas is most vulnerable (socio-economic factors).', 
      figure: 'Figure 2.2: Vulnerability Map',
      tableRef: 'Table 5.3',
      getValue: (b) => b.vulnerability,
      getRating: (b) => {
        if (b.vulnerability > 0.800) return 'Very High';
        if (b.vulnerability > 0.600) return 'High';
        if (b.vulnerability > 0.400) return 'Moderate';
        if (b.vulnerability > 0.200) return 'Low';
        return 'Very Low';
      },
      imagePath: '/vulnerability_map.png'
    },
    { 
      id: 'EXPOSURE', 
      label: 'Exposure', 
      baseColor: THEME_COLORS.EXPOSURE, 
      desc: 'Figure 2.3: Luzong has highest physical exposure (Grey/Black).', 
      figure: 'Figure 2.3: Exposure Map',
      tableRef: 'Table 6.3',
      getValue: (b) => b.exposure,
      getRating: (b) => {
        if (b.exposure > 0.700) return 'High';
        if (b.exposure > 0.400) return 'Moderate';
        if (b.exposure > 0.200) return 'Low';
        return 'Very Low';
      },
      imagePath: '/exposure_map.png'
    },
    { 
      id: 'SOFT_CM', 
      label: 'Soft Countermeasures', 
      baseColor: THEME_COLORS.SOFT_CM, 
      desc: 'Figure 2.4: Uniformly Low (Yellow) across all barangays.', 
      figure: 'Figure 2.4: Soft Countermeasures Map',
      tableRef: 'Table 7.2',
      getValue: (b) => b.softCM,
      getRating: (b) => 'Low',
      imagePath: '/soft_cm_map.png'
    },
    { 
      id: 'HARD_CM', 
      label: 'Hard Countermeasures', 
      baseColor: THEME_COLORS.HARD_CM, 
      desc: 'Figure 2.5: Luzong has moderate defenses (Dark Blue); others are Very Low.', 
      figure: 'Figure 2.5: Hard Countermeasures Map',
      tableRef: 'Table 8.2',
      getValue: (b) => b.hardCM,
      getRating: (b) => {
         if (b.hardCM === 0.500) return 'Moderate';
         if (b.hardCM >= 0.167) return 'Low/Very Low';
         return 'Very Low';
      },
      imagePath: '/hard_cm_map.png'
    },
  ];

  const activeCatData = categories.find(c => c.id === activeCategory)!;
  const sortedData = [...BARANGAY_DATA].sort((a, b) => activeCatData.getValue(b) - activeCatData.getValue(a));

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                const base64String = event.target!.result as string;
                
                const newState = { ...customImages, [activeCategory]: base64String };
                setCustomImages(newState);
                
                // Reset error state for this category
                setImageLoadErrors(prev => ({ ...prev, [activeCategory]: false }));

                try {
                    localStorage.setItem('manabo_custom_maps', JSON.stringify(newState));
                } catch (err) {
                    console.error("Storage quota exceeded", err);
                    alert("Image loaded for this session, but it is too large to save permanently in browser storage.");
                }
            }
        };
        reader.readAsDataURL(file);
    }
  }, [activeCategory, customImages]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clearCustomImage = () => {
      const newState = { ...customImages };
      delete newState[activeCategory];
      setCustomImages(newState);
      localStorage.setItem('manabo_custom_maps', JSON.stringify(newState));
      
      // Reset error state to try loading static file again
      const newErrors = { ...imageLoadErrors };
      delete newErrors[activeCategory];
      setImageLoadErrors(newErrors);
      setRetryTrigger(prev => prev + 1);
  };

  const handleRetryLoad = () => {
      // Clear error for current category to trigger re-render of img tag
      const newErrors = { ...imageLoadErrors };
      delete newErrors[activeCategory];
      setImageLoadErrors(newErrors);
      // Increment trigger to force key change if needed
      setRetryTrigger(prev => prev + 1);
  };

  // Logic to determine which image source to use
  const useCustom = !!customImages[activeCategory];
  const imageSrc = useCustom 
    ? customImages[activeCategory] 
    : `${activeCatData.imagePath}?t=${retryTrigger}`; // Add timestamp to bust cache if file changed

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Digital Atlas</h2>
            <p className="text-slate-500 text-sm">Interactive Maps based on 2025 Thesis Figures</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map((cat) => (
            <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                    ? 'bg-slate-800 text-white shadow-md ring-2 ring-slate-300 ring-offset-1'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.baseColor }} />
                {cat.label}
            </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: Map Container */}
        <div className="lg:col-span-6 xl:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-1 min-h-[500px] relative flex flex-col">
             <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-2xl flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    {activeCatData.figure}
                    </h3>
                    <p className="text-xs text-slate-500 leading-snug mt-1">{activeCatData.desc}</p>
                </div>
                {customImages[activeCategory] && (
                    <button 
                        onClick={clearCustomImage}
                        className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                        title="Reset to default"
                    >
                        <Trash2 className="w-3 h-3" /> Reset
                    </button>
                )}
             </div>

             {/* Map View Area */}
             <div 
                className="flex-1 relative bg-slate-50 overflow-hidden rounded-b-2xl flex items-center justify-center group/dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
             >
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    {/* We use key to force re-mount if category or error state changes */}
                    {!imageLoadErrors[activeCategory] || useCustom ? (
                        <div className="relative group w-full h-full flex justify-center items-center">
                            <img 
                                key={`${activeCategory}-${retryTrigger}`}
                                src={imageSrc}
                                alt={`${activeCatData.label} Map`}
                                className="max-w-full max-h-full object-contain shadow-md rounded-lg"
                                onLoad={() => {
                                    // Success! ensure error is cleared
                                    setImageLoadErrors(prev => {
                                        if (prev[activeCategory]) {
                                            const newErrors = {...prev};
                                            delete newErrors[activeCategory];
                                            return newErrors;
                                        }
                                        return prev;
                                    });
                                }}
                                onError={(e) => {
                                    console.warn(`Failed to load image: ${imageSrc}`);
                                    // Only set error if we aren't using a custom image that might just need a refresh
                                    if (!useCustom) {
                                        setImageLoadErrors(prev => ({...prev, [activeCategory]: true}));
                                    }
                                }}
                            />
                            {useCustom && (
                                <div className="absolute bottom-2 right-2">
                                    <span className="bg-emerald-600/90 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                                        <CheckCircle2 className="w-3 h-3" /> Custom Map
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        // FALLBACK: Image Not Found Placeholder
                        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 w-full h-full max-h-[300px] hover:bg-slate-100 transition-colors cursor-pointer">
                             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover/dropzone:scale-110 transition-transform">
                                <ImageIcon className="w-8 h-8 text-slate-300" />
                             </div>
                             <h3 className="text-slate-700 font-bold mb-1">Map Image Missing</h3>
                             <p className="text-xs text-slate-500 max-w-[200px] mb-4">
                                System could not find <code>{activeCatData.imagePath}</code>.
                             </p>
                             <div className="flex flex-col gap-2 w-full max-w-[200px]">
                                 <button 
                                    onClick={(e) => { e.stopPropagation(); handleRetryLoad(); }}
                                    className="flex items-center justify-center gap-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
                                 >
                                    <RefreshCw className="w-3 h-3" /> Retry Loading
                                 </button>
                                 <div className="flex items-center justify-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg shadow-sm">
                                    <UploadCloud className="w-4 h-4" />
                                    Or Drag & Drop Image
                                 </div>
                             </div>
                        </div>
                    )}
                </div>
             </div>
        </div>

        {/* RIGHT: Detailed Data Table */}
        <div className="lg:col-span-6 xl:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-500" />
                    Detailed Data ({activeCatData.tableRef})
                </h3>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Barangay</th>
                            <th className="px-6 py-3 text-right font-mono">
                                {activeCategory === 'FRI' ? 'Risk Index' : 
                                 activeCategory === 'SOFT_CM' ? 'SCI' : 
                                 activeCategory === 'HARD_CM' ? 'HCI' : 
                                 'Index Value'}
                            </th>
                            <th className="px-6 py-3 text-center">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sortedData.map((b) => {
                            const value = activeCatData.getValue(b);
                            const rating = activeCatData.getRating(b);
                            
                            // Determine badge color
                            let badgeColor = 'bg-slate-100 text-slate-700';
                            if (activeCategory === 'FRI' || activeCategory === 'HAZARD') {
                                if (rating.includes('Very High')) badgeColor = 'bg-red-900 text-white';
                                else if (rating.includes('High')) badgeColor = 'bg-red-600 text-white';
                                else if (rating.includes('Moderate')) badgeColor = 'bg-orange-500 text-white';
                                else if (rating.includes('Low')) badgeColor = 'bg-orange-200 text-orange-900';
                            } else if (activeCategory === 'VULNERABILITY') {
                                if (rating.includes('Moderate')) badgeColor = 'bg-green-500 text-white';
                                else badgeColor = 'bg-green-200 text-green-900';
                            } else if (activeCategory === 'HARD_CM') {
                                if (value > 0) badgeColor = 'bg-blue-500 text-white';
                                else badgeColor = 'bg-blue-100 text-blue-900';
                            } else if (activeCategory === 'SOFT_CM') {
                                badgeColor = 'bg-yellow-200 text-yellow-900';
                            } else if (activeCategory === 'EXPOSURE') {
                                if (rating.includes('High')) badgeColor = 'bg-slate-700 text-white';
                                else if (rating.includes('Moderate')) badgeColor = 'bg-slate-400 text-white';
                                else badgeColor = 'bg-slate-200 text-slate-800';
                            }

                            const isHovered = hoveredBarangay === b.id;

                            return (
                                <tr 
                                    key={b.id} 
                                    className={`transition-colors cursor-pointer ${isHovered ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                                    onMouseEnter={() => setHoveredBarangay(b.id)}
                                    onMouseLeave={() => setHoveredBarangay(null)}
                                >
                                    <td className="px-6 py-3 font-medium text-slate-800">{b.name}</td>
                                    <td className="px-6 py-3 text-right font-mono text-slate-600 font-bold">
                                        {value.toFixed(3)}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badgeColor}`}>
                                            {rating}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
             </div>
             
             <div className="p-4 bg-slate-50 text-xs text-slate-500 border-t border-slate-100 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p>
                    <strong>Data Source:</strong> 2025 Thesis Tables.
                    <span className="block mt-1 font-medium">
                        {useCustom ? 
                            <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Using Custom Map (Browser Storage)</span> : 
                            (!imageLoadErrors[activeCategory] ? 
                                <span className="text-orange-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> System Map Loaded</span> : 
                                <span className="text-slate-400">Map file missing</span>
                            )
                        }
                    </span>
                </p>
             </div>
        </div>

      </div>
    </div>
  );
};

export default MapsGallery;
