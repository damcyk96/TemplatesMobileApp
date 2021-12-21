import { Trips } from '../../types';

export const getTripsMethod = (data: any): Trips[] => data.data;
export const getTripMethod = (data: any): Trips => data.data;
