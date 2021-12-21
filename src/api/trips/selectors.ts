import { Trip } from '../../types';

export const getTrips = (data: any): Trip[] => data.data;
export const getTrip = (data: any): Trip => data.data;
