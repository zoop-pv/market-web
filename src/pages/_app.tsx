import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../styles.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#3653FE",
      light: "#BCC6FF",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}> 
  <Component {...pageProps} /> 
  </ThemeProvider>
  
}
