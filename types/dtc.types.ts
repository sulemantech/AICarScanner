// types/dtc.types.ts
export interface DTC {
    code: string;
    description: string;
    location?: string;
}

export interface RepairEstimate {
    time: string;
    cost: string;
    difficulty: 'Easy' | 'Moderate' | 'Difficult';
    parts: string[];
}

export interface DTCRepairInfo {
    symptoms: string[];
    commonCauses: string[];
    diagnosticSteps: string[];
    repairEstimate: RepairEstimate;
    priority: string;
    diyPossibility: string;
    professionalRequired: string;
}

export interface DTCDefinition extends DTC, Partial<DTCRepairInfo> {}

export type SystemType = 
    | 'engine' 
    | 'transmission' 
    | 'emissions' 
    | 'computer' 
    | 'speed'
    | 'fuel-air'
    | 'ignition'
    | 'injector'
    | 'hybrid'
    | 'cylinder-deactivation'
    | 'network'
    | 'network-electrical'
    | 'network-communication'
    | 'network-software'
    | 'network-data'
    | 'chassis'
    | 'abs-brakes'
    | 'steering-suspension'
    | 'traction-control'
    | 'chassis-electrical'
    | 'body'
    | 'airbags'
    | 'hvac'
    | 'instrument-cluster'
    | 'body-electrical'
    | 'body-manufacturer';

export interface SystemRange {
    [key: string]: string[];
}