import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import App from 'App';
import client from 'providers/client';
import Store from 'providers/Store';
import registerServiceWorker from 'registerServiceWorker';

import 'normalize.css';
import 'assets/css/fonts.css';

import './index.css';


const Root = () => (
  <BrowserRouter>
    <Store.Provider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Store.Provider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
