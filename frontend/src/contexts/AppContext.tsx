/* eslint-disable react-refresh/only-export-components */
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import * as apiClient from '../api-client';
import Toast from '../components/Toast';

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};
const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  const showToast = (toastMessage: ToastMessage) => {
    setToast(toastMessage);
  };
  return (
    <AppContext.Provider
      value={{
        showToast,
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) console.log('out of context box');

  return context as AppContext;
};
