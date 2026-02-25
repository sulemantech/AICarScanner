// services/DTCDatabase.ts
import {
    P00XX_DTCS,
    P01XX_DTCS,
    P02XX_DTCS,
    P03XX_DTCS,
    P04XX_DTCS,
    P05XX_DTCS,
    P06XX_DTCS,
    P07XX_DTCS,
    P08XX_DTCS,
    P09XX_DTCS,
    P0AXX_DTCS,
    P20XX_DTCS,
    P21XX_DTCS,
    P22XX_DTCS,
    P23XX_DTCS,
    P24XX_DTCS,
    P25XX_DTCS,
    P26XX_DTCS,
    P27XX_DTCS,
    P2AXX_DTCS,
    P34XX_DTCS,
    U00XX_DTCS,
    U01XX_DTCS,
    U02XX_DTCS,
    U03XX_DTCS,
    U04XX_DTCS,
    C00XX_DTCS,
    C01XX_DTCS,
    C02XX_DTCS,
    C03XX_DTCS,
    B00XX_DTCS,
    B01XX_DTCS,
    B02XX_DTCS,
    B03XX_DTCS,
    B04XX_B1XXX_DTCS
} from '../constants/dtc';

import { DTC, DTCDefinition, SystemRange, SystemType, DTCRepairInfo } from '../types/dtc.types';

// Combine all DTCs
export const ALL_DTCS: DTC[] = [
    ...P00XX_DTCS,
    ...P01XX_DTCS,
    ...P02XX_DTCS,
    ...P03XX_DTCS,
    ...P04XX_DTCS,
    ...P05XX_DTCS,
    ...P06XX_DTCS,
    ...P07XX_DTCS,
    ...P08XX_DTCS,
    ...P09XX_DTCS,
    ...P0AXX_DTCS,
    ...P20XX_DTCS,
    ...P21XX_DTCS,
    ...P22XX_DTCS,
    ...P23XX_DTCS,
    ...P24XX_DTCS,
    ...P25XX_DTCS,
    ...P26XX_DTCS,
    ...P27XX_DTCS,
    ...P2AXX_DTCS,
    ...P34XX_DTCS,
    ...U00XX_DTCS,
    ...U01XX_DTCS,
    ...U02XX_DTCS,
    ...U03XX_DTCS,
    ...U04XX_DTCS,
    ...C00XX_DTCS,
    ...C01XX_DTCS,
    ...C02XX_DTCS,
    ...C03XX_DTCS,
    ...B00XX_DTCS,
    ...B01XX_DTCS,
    ...B02XX_DTCS,
    ...B03XX_DTCS,
    ...B04XX_B1XXX_DTCS
];

// Create a map for quick lookups
export const DTC_MAP: Record<string, DTC> = ALL_DTCS.reduce((acc, dtc) => {
    acc[dtc.code] = dtc;
    return acc;
}, {} as Record<string, DTC>);

// System ranges mapping
const SYSTEM_RANGES: SystemRange = {
    'engine': ['P00', 'P01', 'P02', 'P03', 'P23'],
    'transmission': ['P07', 'P08', 'P09', 'P27'],
    'emissions': ['P04', 'P20', 'P21', 'P22', 'P24', 'P2A'],
    'computer': ['P06', 'P26'],
    'speed': ['P05'],
    'fuel-air': ['P00', 'P01', 'P02', 'P20', 'P21', 'P22'],
    'ignition': ['P03', 'P23'],
    'injector': ['P02'],
    'hybrid': ['P0A'],
    'cylinder-deactivation': ['P34'],
    'network': ['U00', 'U01', 'U02', 'U03', 'U04'],
    'network-electrical': ['U00'],
    'network-communication': ['U01', 'U02'],
    'network-software': ['U03'],
    'network-data': ['U04'],
    'chassis': ['C00', 'C01', 'C02', 'C03'],
    'abs-brakes': ['C00'],
    'steering-suspension': ['C01'],
    'traction-control': ['C02'],
    'chassis-electrical': ['C03'],
    'body': ['B00', 'B01', 'B02', 'B03', 'B04'],
    'airbags': ['B00'],
    'hvac': ['B01'],
    'instrument-cluster': ['B02'],
    'body-electrical': ['B03'],
    'body-manufacturer': ['B04', 'B1']
};

/**
 * Get DTC definition by code
 */
export const getDTCDefinition = (code: string): DTCDefinition => {
    const dtc = DTC_MAP[code];
    
    if (dtc) {
        return {
            ...dtc,
            ...getRepairInfo(code)
        };
    }
    
    // Return manufacturer-specific code info with default repair info
    return {
        code,
        description: "Manufacturer Specific Code",
        location: "Refer to service manual",
        ...getRepairInfo(code)
    };
};

/**
 * Get all DTCs for a specific system
 */
export const getDTCsBySystem = (system: SystemType): DTC[] => {
    const prefixes = SYSTEM_RANGES[system] || [];
    
    return ALL_DTCS.filter((dtc: DTC) => 
        prefixes.some((prefix: string) => dtc.code.startsWith(prefix))
    );
};

/**
 * Search DTCs by code or description
 */
export const searchDTCs = (query: string): DTC[] => {
    const upperQuery = query.toUpperCase().trim();
    
    if (!upperQuery) {
        return [];
    }
    
    return ALL_DTCS.filter((dtc: DTC) => 
        dtc.code.includes(upperQuery) || 
        dtc.description.toUpperCase().includes(upperQuery)
    );
};

/**
 * Get DTC severity level
 */
export const getDTCSeverity = (code: string): 'critical' | 'warning' | 'info' => {
    const prefix = code.substring(0, 1);
    const numPart = parseInt(code.substring(1, 4)) || 0;
    
    // Critical: Engine misfire, transmission, ABS critical failures
    if (code.match(/P0(1|2|3|7)/) || 
        code.match(/C00/) ||
        (code.startsWith('P') && numPart >= 300 && numPart < 400)) return 'critical';
    
    // Warning: Emissions, auxiliary systems, network issues
    if (code.match(/P0(4|5)/) || 
        code.match(/P2/) || 
        code.match(/U/) ||
        code.match(/C0[1-2]/)) return 'warning';
    
    // Info: Computer, software, informational codes
    if (code.match(/P06/) || 
        code.match(/U03/) ||
        code.match(/B/)) return 'info';
    
    // Default based on first character
    switch(prefix) {
        case 'P': return 'warning';
        case 'C': return 'warning';
        case 'U': return 'warning';
        case 'B': return 'info';
        default: return 'info';
    }
};

/**
 * Get DTC category
 */
export const getDTCCategory = (code: string): string => {
    const prefix = code.substring(0, 3);
    const systemPrefix = code.substring(0, 1);
    
    const categories: Record<string, string> = {
        'P00': 'Fuel & Air Metering',
        'P01': 'Fuel & Air Metering',
        'P02': 'Injector Circuit',
        'P03': 'Ignition System',
        'P04': 'Auxiliary Emissions',
        'P05': 'Vehicle Speed & Idle',
        'P06': 'Computer & Outputs',
        'P07': 'Transmission',
        'P08': 'Transmission',
        'P09': 'Transmission',
        'P0A': 'Hybrid Propulsion',
        'P20': 'Fuel & Air Metering',
        'P21': 'Fuel & Air Metering',
        'P22': 'Fuel & Air Metering',
        'P23': 'Ignition System',
        'P24': 'Auxiliary Emissions',
        'P25': 'Auxiliary Inputs',
        'P26': 'Computer & Outputs',
        'P27': 'Transmission',
        'P2A': 'Fuel & Air Metering',
        'P34': 'Cylinder Deactivation',
        'U00': 'Network Electrical',
        'U01': 'Network Communication',
        'U02': 'Network Communication',
        'U03': 'Network Software',
        'U04': 'Network Data',
        'C00': 'ABS & Brakes',
        'C01': 'Steering & Suspension',
        'C02': 'Traction Control',
        'C03': 'Chassis Electrical',
        'B00': 'Airbags & Restraints',
        'B01': 'HVAC Climate',
        'B02': 'Instrument Cluster',
        'B03': 'Body Electrical'
    };
    
    return categories[prefix] || `${systemPrefix}-Code (Manufacturer Specific)`;
};

/**
 * Get system type from DTC code
 */
export const getDTCDTCSystem = (code: string): string => {
    const prefix = code.substring(0, 1);
    
    switch(prefix) {
        case 'P': return 'Powertrain';
        case 'C': return 'Chassis';
        case 'U': return 'Network';
        case 'B': return 'Body';
        default: return 'Unknown';
    }
};

/**
 * Get code type (ISO/SAE Controlled or Manufacturer Controlled)
 */
export const getDTCCodeType = (code: string): string => {
    const secondChar = code.substring(1, 2);
    
    if (secondChar === '0' || secondChar === '2') {
        return 'ISO/SAE Controlled';
    } else if (secondChar === '1' || secondChar === '3') {
        return 'Manufacturer Controlled';
    } else {
        return 'Unknown';
    }
};

/**
 * Get comprehensive repair information for a DTC
 */
export const getRepairInfo = (code: string): DTCRepairInfo => {
    const repairDatabase: Record<string, DTCRepairInfo> = {
        // Engine Misfire Codes
        'P0300': {
            symptoms: [
                'Rough idle',
                'Engine vibration',
                'Loss of power',
                'Poor fuel economy',
                'Check engine light flashing'
            ],
            commonCauses: [
                'Faulty spark plugs',
                'Bad ignition coils',
                'Vacuum leaks',
                'Fuel injector problems',
                'Low compression'
            ],
            diagnosticSteps: [
                'Check for other codes to identify specific cylinder',
                'Inspect spark plugs and ignition coils',
                'Check for vacuum leaks',
                'Test fuel pressure and injectors',
                'Perform compression test'
            ],
            repairEstimate: {
                time: '2-4 hours',
                cost: '$200-$800',
                difficulty: 'Moderate',
                parts: ['Spark plugs ($40-100)', 'Ignition coils ($150-400)', 'Fuel injectors ($200-600)']
            },
            priority: 'High - Can cause catalytic converter damage',
            diyPossibility: 'Possible for spark plugs and coils',
            professionalRequired: 'For compression issues or injector problems'
        },
        'P0301': {
            symptoms: [
                'Rough idle',
                'Engine misfire on cylinder 1',
                'Loss of power',
                'Check engine light flashing'
            ],
            commonCauses: [
                'Faulty spark plug on cylinder 1',
                'Bad ignition coil on cylinder 1',
                'Fuel injector issue on cylinder 1',
                'Low compression on cylinder 1'
            ],
            diagnosticSteps: [
                'Swap coil with another cylinder to see if misfire moves',
                'Swap spark plug with another cylinder',
                'Check fuel injector on cylinder 1',
                'Perform compression test on cylinder 1'
            ],
            repairEstimate: {
                time: '1-3 hours',
                cost: '$150-$500',
                difficulty: 'Easy to Moderate',
                parts: ['Spark plug ($10-25)', 'Ignition coil ($50-150)', 'Fuel injector ($100-300)']
            },
            priority: 'High - Can cause catalytic converter damage',
            diyPossibility: 'Yes - Start with spark plugs and coils',
            professionalRequired: 'If compression is low'
        },
        'P0420': {
            symptoms: [
                'Check engine light on',
                'Reduced fuel economy',
                'Failed emissions test',
                'Rotten egg smell from exhaust'
            ],
            commonCauses: [
                'Failing catalytic converter',
                'O2 sensor issues',
                'Engine misfire',
                'Exhaust leaks',
                'Oil consumption'
            ],
            diagnosticSteps: [
                'Check for exhaust leaks',
                'Monitor O2 sensor readings',
                'Check for misfire codes',
                'Test catalytic converter efficiency',
                'Inspect for engine oil consumption'
            ],
            repairEstimate: {
                time: '2-4 hours',
                cost: '$800-$2,500',
                difficulty: 'Difficult',
                parts: ['Catalytic converter ($500-2,000)', 'O2 sensors ($100-300)', 'Gaskets ($20-50)']
            },
            priority: 'Medium - Affects emissions and fuel economy',
            diyPossibility: 'Limited - Requires welding equipment',
            professionalRequired: 'Yes - Exhaust system expertise needed'
        },
        'P0171': {
            symptoms: [
                'Lean condition',
                'Rough idle',
                'Hesitation on acceleration',
                'Poor fuel economy',
                'Check engine light'
            ],
            commonCauses: [
                'Vacuum leak',
                'Mass air flow sensor dirty',
                'Fuel pressure low',
                'O2 sensor faulty',
                'Exhaust leak before O2 sensor'
            ],
            diagnosticSteps: [
                'Check for vacuum leaks (hoses, intake gaskets)',
                'Clean MAF sensor',
                'Check fuel pressure',
                'Monitor O2 sensor readings',
                'Inspect for exhaust leaks'
            ],
            repairEstimate: {
                time: '1-3 hours',
                cost: '$150-$500',
                difficulty: 'Easy to Moderate',
                parts: ['MAF sensor cleaner ($10-20)', 'Vacuum hose ($5-20)', 'Fuel filter ($15-40)']
            },
            priority: 'Medium - Affects engine performance',
            diyPossibility: 'Yes - Start with MAF cleaning and checking hoses',
            professionalRequired: 'For fuel pressure issues'
        },
        'P0442': {
            symptoms: [
                'Check engine light',
                'Small EVAP leak detected',
                'No noticeable driveability issues',
                'Failed emissions test'
            ],
            commonCauses: [
                'Loose or faulty gas cap',
                'Small leak in EVAP system',
                'Faulty purge valve',
                'Cracked EVAP hose',
                'Leaking charcoal canister'
            ],
            diagnosticSteps: [
                'Check and tighten gas cap',
                'Perform smoke test on EVAP system',
                'Check purge valve operation',
                'Inspect EVAP hoses for cracks',
                'Test EVAP system integrity'
            ],
            repairEstimate: {
                time: '1-2 hours',
                cost: '$100-$400',
                difficulty: 'Easy',
                parts: ['Gas cap ($15-40)', 'Purge valve ($50-150)', 'EVAP hose ($20-50)']
            },
            priority: 'Low - No immediate driveability concerns',
            diyPossibility: 'Yes - Start with gas cap',
            professionalRequired: 'For smoke testing if gas cap doesn't fix it'
        },
        'P0455': {
            symptoms: [
                'Check engine light',
                'Large EVAP leak detected',
                'Fuel smell possible',
                'Failed emissions test'
            ],
            commonCauses: [
                'Gas cap missing or loose',
                'Damaged EVAP hose',
                'Faulty vent valve',
                'Cracked charcoal canister',
                'Leaking fuel tank'
            ],
            diagnosticSteps: [
                'Check if gas cap is present and tight',
                'Perform smoke test',
                'Inspect EVAP system visually',
                'Test vent valve operation',
                'Check fuel tank for damage'
            ],
            repairEstimate: {
                time: '1-3 hours',
                cost: '$150-$600',
                difficulty: 'Moderate',
                parts: ['Gas cap ($15-40)', 'Vent valve ($80-200)', 'EVAP hose ($20-100)']
            },
            priority: 'Medium - Can cause fuel smell',
            diyPossibility: 'Yes - Check gas cap first',
            professionalRequired: 'For smoke testing and component replacement'
        },
        'P0135': {
            symptoms: [
                'Check engine light',
                'Poor fuel economy',
                'Failed emissions test'
            ],
            commonCauses: [
                'Faulty O2 sensor heater',
                'Blown fuse',
                'Wiring issue',
                'Bad O2 sensor'
            ],
            diagnosticSteps: [
                'Check O2 sensor heater fuse',
                'Test O2 sensor heater circuit',
                'Check wiring for damage',
                'Replace O2 sensor if needed'
            ],
            repairEstimate: {
                time: '1-2 hours',
                cost: '$200-$500',
                difficulty: 'Easy',
                parts: ['O2 sensor ($100-300)', 'Fuse ($5-10)']
            },
            priority: 'Medium - Affects fuel economy',
            diyPossibility: 'Yes - If you can access the sensor',
            professionalRequired: 'If sensor is rusted/seized'
        },
        'P0700': {
            symptoms: [
                'Check engine light',
                'Transmission issues',
                'Limp mode',
                'Harsh shifting'
            ],
            commonCauses: [
                'Transmission control module issue',
                'Communication error',
                'Internal transmission problem',
                'Wiring issue'
            ],
            diagnosticSteps: [
                'Scan for transmission-specific codes',
                'Check transmission fluid level and condition',
                'Inspect wiring and connectors',
                'Test transmission solenoids'
            ],
            repairEstimate: {
                time: '2-6 hours',
                cost: '$500-$2,500',
                difficulty: 'Difficult',
                parts: ['Transmission fluid ($50-150)', 'Solenoids ($200-800)', 'TCM ($500-1,500)']
            },
            priority: 'High - Transmission issues can leave you stranded',
            diyPossibility: 'Limited',
            professionalRequired: 'Yes - Transmission work requires expertise'
        },
        'C0035': {
            symptoms: [
                'ABS light on',
                'Loss of ABS function',
                'Brake warning light'
            ],
            commonCauses: [
                'Faulty wheel speed sensor',
                'Damaged sensor wiring',
                'Tone ring damage',
                'Air gap issue'
            ],
            diagnosticSteps: [
                'Check wheel speed sensor resistance',
                'Inspect sensor wiring for damage',
                'Check tone ring for damage',
                'Test sensor output'
            ],
            repairEstimate: {
                time: '1-2 hours',
                cost: '$200-$400',
                difficulty: 'Easy',
                parts: ['Wheel speed sensor ($80-200)']
            },
            priority: 'Medium - ABS may not work in emergency',
            diyPossibility: 'Yes - Usually bolt-on replacement',
            professionalRequired: 'For tone ring replacement'
        },
        'B0001': {
            symptoms: [
                'Airbag light on',
                'SRS system disabled'
            ],
            commonCauses: [
                'Faulty driver airbag module',
                'Clock spring issue',
                'Wiring problem',
                'Connection issue'
            ],
            diagnosticSteps: [
                'Scan for specific airbag codes',
                'Check clock spring continuity',
                'Inspect wiring under seat',
                'Check connections'
            ],
            repairEstimate: {
                time: '2-4 hours',
                cost: '$400-$1,200',
                difficulty: 'Difficult',
                parts: ['Clock spring ($150-400)', 'Airbag module ($300-800)']
            },
            priority: 'High - Safety system disabled',
            diyPossibility: 'Not recommended - Safety critical',
            professionalRequired: 'Yes - Airbag systems require specialized knowledge'
        }
    };
    
    return repairDatabase[code] || {
        symptoms: [
            'Check engine light on',
            'Diagnostic trouble code stored'
        ],
        commonCauses: [
            'Sensor malfunction',
            'Electrical issue',
            'Component failure',
            'Wiring problem'
        ],
        diagnosticSteps: [
            'Scan for related codes',
            'Check wiring and connections',
            'Consult service manual',
            'Test component operation'
        ],
        repairEstimate: {
            time: '1-3 hours',
            cost: '$150-$600',
            difficulty: 'Moderate',
            parts: ['Diagnosis required']
        },
        priority: 'Medium - Further diagnosis needed',
        diyPossibility: 'Consult service manual',
        professionalRequired: 'For accurate diagnosis'
    };
};

/**
 * Get total count of DTCs
 */
export const getTotalDTCCount = (): number => {
    return ALL_DTCS.length;
};

/**
 * Get counts by system
 */
export const getDTCCountsBySystem = (): Record<string, number> => {
    const counts: Record<string, number> = {};
    
    ALL_DTCS.forEach(dtc => {
        const system = getDTCDTCSystem(dtc.code);
        counts[system] = (counts[system] || 0) + 1;
    });
    
    return counts;
};