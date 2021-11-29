import { ToastProvider } from 'react-toast-notifications';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={3000}
      placement="bottom-center"
    >
      <Header />

      <Main />
      <footer className="h-20" />
    </ToastProvider>
  );
}

export default App;
