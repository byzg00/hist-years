import React from 'react';

import AppRouter from './router';
import GlobalStyles from './GlobalStyles';

const App: React.FC = () => {
  return (
      <>
          <GlobalStyles />
          <AppRouter />
      </>
  );
};

export default App;
