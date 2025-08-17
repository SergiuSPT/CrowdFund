import { createContext } from 'react';

const MinContributionContext = createContext({
  minContribution: '',
  setMinContribution: () => {}
});

export default MinContributionContext;
