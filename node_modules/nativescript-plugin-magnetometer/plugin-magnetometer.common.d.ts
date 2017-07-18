export interface MagnetometerData {
    x: number;
    y: number;
    z: number;
    //magnitude: number;
}

export function startMagnetometerUpdates(callback: (MagntometerData) => void);
export function stopMagnetometerUpdates();