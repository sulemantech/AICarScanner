import { DTC } from '../../types/dtc.types';

// These are placeholders for manufacturer-specific codes
// Manufacturers can define these as needed
export const B04XX_B1XXX_DTCS: DTC[] = [
  // B1XXX range is manufacturer controlled (Section 5.4.2)
  { code: "B1000", description: "Manufacturer Specific Body Code 1", location: "Refer to service manual" },
  { code: "B1001", description: "Manufacturer Specific Body Code 2", location: "Refer to service manual" },
  // Add more as needed...
];