import React, { ReactNode, createContext, useReducer } from 'react';

type Props = {
  children: ReactNode;
};

type TripOrderContextActions =
  | {
      type: 'setOrder';
      payload: TripOrderContextState;
    }
  | { type: 'setPaymentMethod'; payload: string };

export type TripOrderContextState = {
  order: {
    title: string;
    price: number;
    paymentMethod: string;
    dates: {
      date: string;
      people: number;
    }[];
  };
};

const reducer = (
  state: TripOrderContextState,
  { type, payload }: TripOrderContextActions,
) => {
  switch (type) {
    case 'setOrder': {
      return { ...state, order: payload };
    }
    case 'setPaymentMethod': {
      return { ...state, order: { ...state.order, paymentMethod: payload } };
    }
  }
};

const defaultData = {
  order: {
    title: '',
    price: 0,
    paymentMethod: '',
    dates: [
      {
        date: '',
        people: 0,
      },
    ],
  },
};

const TripOrderContext = createContext({});

const TripOrderProvider = TripOrderContext.Provider;

export const TripOrderWrapper = ({ children }: Props): JSX.Element => {
  const [stateData, dispatch] = useReducer(reducer, defaultData);

  return (
    <TripOrderProvider
      value={{ stateData, dispatchTripOrderContextActions: dispatch }}>
      {children}
    </TripOrderProvider>
  );
};

export default TripOrderContext;
