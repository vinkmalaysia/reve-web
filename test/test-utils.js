import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from 'src/theme';

const WithTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

function customRender (ui, options) {
  return render(ui, { wrapper: WithTheme, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
