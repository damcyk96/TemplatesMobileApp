import { TripQueryKey } from './../../types/trips';
import { fetchTrips, fetchTrip } from './requests';
import { getTrips, getTrip } from './selectors';
import { useQuery } from 'react-query';
import { handleSelectors } from '../shared';

export const useGetTrips = ({
  selectors = { trips: getTrips },
  ...options
} = {}) =>
  useQuery('trips', fetchTrips, {
    select: handleSelectors(selectors),
    ...options,
  });

export const useGetTrip = ({
  tripId = 0,
  selectors = { trip: getTrip },
  ...options
} = {}) => {
  const queryKey: TripQueryKey = ['trip', { tripId }];

  return useQuery(queryKey, fetchTrip, {
    select: handleSelectors(selectors),
    ...options,
  });
};
