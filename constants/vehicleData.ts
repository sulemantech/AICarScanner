export const vehicleMakes = [
  'BMW', 'Audi', 'Mercedes', 'Tesla', 'Porsche', 
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen'
];

export const vehicleModels: Record<string, string[]> = {
  BMW: ['X5', 'X3', '3 Series', '5 Series', '7 Series', 'M3'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'e-tron', 'RS7'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'EQS'],
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
  Porsche: ['911', 'Cayenne', 'Macan', 'Taycan', 'Panamera'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Bronco'],
  Chevrolet: ['Silverado', 'Equinox', 'Tahoe', 'Camaro', 'Corvette'],
  Volkswagen: ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Atlas'],
};

export const years = ['2025', '2024', '2023', '2022', '2021', '2020'];

export interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  vin?: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  detected: string;
  system: string;
}

export interface ComponentStatus {
  name: string;
  status: 'good' | 'warning' | 'critical';
  value?: string;
}

export interface ScanResult {
  id: string;
  date: string;
  issues: number;
  critical: number;
  systems: number;
  status: 'good' | 'warning' | 'critical';
  components: ComponentStatus[];
}