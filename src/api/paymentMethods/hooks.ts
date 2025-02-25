import { fetchPaymentMethods } from './requests';
import { getPaymentMethods } from './selectors';
import { useQuery } from 'react-query';
import { handleSelectors } from '../shared';

export const useGetPaymentMethods = ({
  selectors = { paymentMetods: getPaymentMethods },
  ...options
} = {}) =>
  useQuery('payment', fetchPaymentMethods, {
    select: handleSelectors(selectors),
    ...options,
  });
