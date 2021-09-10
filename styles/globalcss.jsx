import { Global, css } from '@emotion/react';

// eslint-disable-next-line import/prefer-default-export
export const GlobalCss = () => (
  <Global
    styles={css`
        html, 
        body {
          padding: 0;
          margin: 0;
          font-family: 'Montserrat', sans-serif;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        
        * {
          box-sizing: border-box;
        }
        
        ul, li {
          list-style: none;
        }
        button {
        font-family: 'Montserrat', sans-serif;
        }
        input {
        font-family: 'Montserrat', sans-serif;
        }
      `}
  />
);
