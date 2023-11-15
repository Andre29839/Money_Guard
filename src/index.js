import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from 'components/App/App';
import { persistor, store } from 'redux/configureStore';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import './index.css';

import 'react-toastify/dist/ReactToastify.css';
import 'modern-normalize/modern-normalize.css';
import './18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={"/"}>
          <App />
          <ToastContainer autoClose={2500} theme="dark" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
