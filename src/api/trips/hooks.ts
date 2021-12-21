import { fetchTrips } from './requests';
import { getTripsMethod } from './selectors';
import { useQuery } from 'react-query';
import { handleSelectors } from '../shared';

export const useGetTrips = ({
  selectors = { trips: getTripsMethod },
  ...options
} = {}) =>
  useQuery('trips', fetchTrips, {
    select: handleSelectors(selectors),
    ...options,
  });
