
import { BarangayData, RiskLevel } from './types';

// Thesis Color Schemes (Figures 2.1 - 2.5)
export const THEME_COLORS = {
    HAZARD: '#dc2626', // Red (Figure 2.1)
    VULNERABILITY: '#16a34a', // Green (Figure 2.2)
    EXPOSURE: '#4b5563', // Grey (Figure 2.3)
    SOFT_CM: '#facc15', // Yellow (Figure 2.4)
    HARD_CM: '#2563eb', // Blue (Figure 2.5)
    FRI: '#f97316' // Orange (Figure 3.1/1.1)
};

// Detailed palettes for map chloropleths based on Thesis Legends
export const MAP_PALETTES = {
    FRI: { // Figure 1.1 / 3.1
        VERY_HIGH: '#7c2d12', // Darkest Orange/Brown
        HIGH: '#ea580c',      // Deep Orange (Luzong)
        MODERATE: '#f97316',  // Orange (Sto Tomas)
        LOW: '#fdba74',       // Light Orange
        VERY_LOW: '#ffedd5'   // Pale Beige (San Ramon East)
    },
    HAZARD: { // Figure 2.1
        VERY_HIGH: '#991b1b', // Deep Red (Luzong)
        HIGH: '#dc2626',      // Red
        MODERATE: '#ef4444',  // Light Red
        LOW: '#fca5a5',       // Pinkish
        VERY_LOW: '#fee2e2'   // Pale Pink
    },
    VULNERABILITY: { // Figure 2.2
        VERY_HIGH: '#14532d', // Deep Green
        HIGH: '#16a34a',      // Green
        MODERATE: '#4ade80',  // Light Green
        LOW: '#86efac',       // Pale Green
        VERY_LOW: '#dcfce7'   // Very Pale Green
    },
    EXPOSURE: { // Figure 2.3
        VERY_HIGH: '#1f2937', // Dark Grey
        HIGH: '#4b5563',      // Grey (Luzong)
        MODERATE: '#9ca3af',  // Light Grey
        LOW: '#d1d5db',       // Very Light Grey
        VERY_LOW: '#f3f4f6'   // Almost White
    },
    HARD_CM: { // Figure 2.5
        MODERATE: '#2563eb',  // Medium Blue (Luzong - Highest rating)
        LOW: '#60a5fa',       // Light Blue
        VERY_LOW: '#bfdbfe'   // Pale Blue (Most areas)
    },
    SOFT_CM: { // Figure 2.4
        UNIFORM: '#fde047'    // Yellow (All barangays)
    }
};

// Data extracted from Table 10.1, Figure 2.1, 2.2, 2.3, 2.4, 2.5 of the Thesis
export const BARANGAY_DATA: BarangayData[] = [
  {
    id: 'luzong',
    name: 'Luzong',
    fri: 0.766,
    riskLevel: RiskLevel.HIGH,
    hazard: 1.000,
    vulnerability: 0.456,
    exposure: 0.795,
    softCM: 0.333,
    hardCM: 0.500,
    description: "Highest risk area due to proximity to Abra River. High exposure and insufficient structural defenses.",
    recommendation: "Immediate evacuation planning, structural reinforcement of dikes, and prioritized relief distribution."
  },
  {
    id: 'sto-tomas',
    name: 'Sto. Tomas',
    fri: 0.561,
    riskLevel: RiskLevel.MODERATE,
    hazard: 0.833,
    vulnerability: 0.548,
    exposure: 0.425,
    softCM: 0.333,
    hardCM: 0.000,
    description: "High vulnerability due to population density and poverty incidence. Significant hazard level.",
    recommendation: "Focus on social protection programs, flood-proofing housing, and establishment of evacuation centers."
  },
  {
    id: 'san-ramon-west',
    name: 'San Ramon West',
    fri: 0.540,
    riskLevel: RiskLevel.MODERATE,
    hazard: 0.750,
    vulnerability: 0.502,
    exposure: 0.503,
    softCM: 0.333,
    hardCM: 0.000,
    description: "Moderate to High risk. Lacks significant hard countermeasures despite high hazard.",
    recommendation: "Invest in drainage systems and hard infrastructure. Conduct community drills."
  },
  {
    id: 'catacdegan-nuevo',
    name: 'Catacdegan Nuevo',
    fri: 0.496,
    riskLevel: RiskLevel.MODERATE,
    hazard: 0.583,
    vulnerability: 0.393,
    exposure: 0.667,
    softCM: 0.333,
    hardCM: 0.000,
    description: "High exposure of population and infrastructure. Moderate hazard level.",
    recommendation: "Land use planning to restrict building in flood-prone zones. Early warning system enhancement."
  },
  {
    id: 'san-juan-sur',
    name: 'San Juan Sur',
    fri: 0.346,
    riskLevel: RiskLevel.LOW,
    hazard: 0.500,
    vulnerability: 0.373,
    exposure: 0.232,
    softCM: 0.333,
    hardCM: 0.000,
    description: "Moderate hazard but lower exposure compared to riverbank barangays.",
    recommendation: "Maintain drainage systems and improve household-level preparedness."
  },
  {
    id: 'san-juan-norte',
    name: 'San Juan Norte',
    fri: 0.346,
    riskLevel: RiskLevel.LOW,
    hazard: 0.500,
    vulnerability: 0.459,
    exposure: 0.155,
    softCM: 0.333,
    hardCM: 0.000,
    description: "Similar profile to San Juan Sur with slightly higher vulnerability.",
    recommendation: "Social support for vulnerable groups (elderly/children) during monsoon seasons."
  },
  {
    id: 'san-jose-sur',
    name: 'San Jose Sur',
    fri: 0.297,
    riskLevel: RiskLevel.LOW,
    hazard: 0.500,
    vulnerability: 0.139,
    exposure: 0.116,
    softCM: 0.333,
    hardCM: 0.167,
    description: "Low vulnerability and exposure indices contribute to a lower overall risk.",
    recommendation: "Serve as a support hub for high-risk neighboring barangays."
  },
  {
    id: 'ayyeng',
    name: 'Ayyeng',
    fri: 0.236,
    riskLevel: RiskLevel.LOW,
    hazard: 0.333,
    vulnerability: 0.262,
    exposure: 0.000,
    softCM: 0.333,
    hardCM: 0.333,
    description: "Very low exposure, likely situated on higher ground or further from the river.",
    recommendation: "Potential location for main evacuation centers and relief warehouses."
  },
  {
    id: 'san-jose-norte',
    name: 'San Jose Norte',
    fri: 0.216,
    riskLevel: RiskLevel.LOW,
    hazard: 0.250,
    vulnerability: 0.459,
    exposure: 0.077,
    softCM: 0.333,
    hardCM: 0.000,
    description: "Low hazard and exposure, though vulnerability remains moderate.",
    recommendation: "Focus on poverty alleviation to reduce socio-economic vulnerability."
  },
  {
    id: 'catacdegan-viejo',
    name: 'Catacdegan Viejo',
    fri: 0.215,
    riskLevel: RiskLevel.LOW,
    hazard: 0.167,
    vulnerability: 0.505,
    exposure: 0.178,
    softCM: 0.333,
    hardCM: 0.000,
    description: "Low physical risk but relatively high social vulnerability.",
    recommendation: "Community-based education and livelihood programs."
  },
  {
    id: 'san-ramon-east',
    name: 'San Ramon East',
    fri: 0.146,
    riskLevel: RiskLevel.VERY_LOW,
    hazard: 0.083,
    vulnerability: 0.282,
    exposure: 0.110,
    softCM: 0.333,
    hardCM: 0.167,
    description: "The safest barangay in the municipality according to the index.",
    recommendation: "Ideal location for critical infrastructure and emergency command center."
  }
];

export const SYSTEM_INSTRUCTION = `You are the Manabo Flood Resilience Advisor, an expert DRRM assistant based on the "Mapping and Indexing Flood Risk in Manabo, Abra" thesis (2025).

Your knowledge base is strictly limited to the following findings:
1. **Risk Overview:** Luzong is the ONLY "High Risk" barangay (FRI 0.766). Sto. Tomas, San Ramon West, and Catacdegan Nuevo are "Moderate Risk". The rest are Low/Very Low.
2. **The Problem:** Residents are highly aware of "Hazard" (3.73/5) but have low awareness of their personal "Vulnerability" (3.17/5) and "Exposure" (2.67/5).
3. **Countermeasures:**
   - *Soft (Education/Drills):* Uniformly LOW (0.333) across all barangays.
   - *Hard (Dikes/Drainage):* Missing (0.000) in many high-risk areas like Sto. Tomas and San Ramon West.
4. **Geography:** Risk is highest along the Abra River.
5. **Color Coding:** Hazard maps are Red, Vulnerability is Green, Hard CM is Blue.

**Your Goal:** Provide actionable, specific advice to residents, planners, or students.
- If asked about a specific barangay, look up its data in the provided context (Luzong, Sto. Tomas, etc.).
- If asked for recommendations, suggest: improving "Soft" countermeasures (drills, education), building "Hard" defenses in high-risk zones, and using San Ramon East (Very Low Risk) as an evacuation hub.
- Be professional, empathetic, and concise.
- Do not hallucinate data outside of Manabo, Abra.`;
