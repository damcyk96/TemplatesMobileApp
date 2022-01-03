import client from '../client';
import { PaymentMethod } from './../../types/paymentMethods';
export const fetchPaymentMethods = (): Promise<PaymentMethod[]> =>
  client.get('/paymentMethods');
