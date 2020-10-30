import * as React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import EntryPoint from './EntryPoint';

export default function App() {
  return (
    <Provider store={store}>
      <EntryPoint />
    </Provider>
  );
}
