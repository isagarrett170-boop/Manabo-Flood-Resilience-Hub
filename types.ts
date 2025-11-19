export enum RiskLevel {
    VERY_LOW = "Very Low",
    LOW = "Low",
    MODERATE = "Moderate",
    HIGH = "High",
    VERY_HIGH = "Very High"
  }
  
  export interface BarangayData {
    id: string;
    name: string;
    fri: number; // Flood Risk Index
    riskLevel: RiskLevel;
    hazard: number;
    vulnerability: number;
    exposure: number;
    softCM: number; // Soft Countermeasures
    hardCM: number; // Hard Countermeasures
    description: string;
    recommendation: string;
  }
  
  export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    isError?: boolean;
  }
  
  export type TabView = 'dashboard' | 'maps' | 'advisor' | 'about';