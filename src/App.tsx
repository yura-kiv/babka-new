import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { NotificationContainer } from './components/ui/Notification';
import { BOMB_OVERLAY_ID } from './constants';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <NotificationContainer />
      <div id={BOMB_OVERLAY_ID} />
    </>
  );
}

export default App;
