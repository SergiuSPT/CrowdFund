import { createContext } from 'react';

const ErrorMessageContext = createContext({
  errorMessage: '',
  setErrorMessage: () => {}
});

export default ErrorMessageContext;
