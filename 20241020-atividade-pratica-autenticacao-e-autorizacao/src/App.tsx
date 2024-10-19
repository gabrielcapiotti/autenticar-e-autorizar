import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
