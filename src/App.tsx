import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { NotificationContainer } from './components/ui/Notification';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <NotificationContainer />
      <div id="bombOverlay" />
    </>
  );
}

export default App;
