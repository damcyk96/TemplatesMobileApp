import { TripQueryKey } from './../../types/trips';
import { Trip } from '../../types';
import client from '../client';

type FetchTrip = {
  queryKey: TripQueryKey;
};
export const fetchTrips = (): Promise<Trip[]> => client.get('/trips');

export const fetchTrip = ({ queryKey: [, param] }: FetchTrip): Promise<Trip> =>
  client.get(`/trips/${param.tripId}`);
