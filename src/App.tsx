import { RouterProvider } from 'react-router-dom';
import { NotificationContainer } from '@/components/ui/Notification';
import { router } from '@/routes';
import { BOMB_OVERLAY_ID } from '@/constants';

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
