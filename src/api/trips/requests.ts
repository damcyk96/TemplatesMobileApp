import { Trips } from '../../types';
import client from '../client';
export const fetchTrips = (): Promise<Trips[]> => client.get('/trips');
