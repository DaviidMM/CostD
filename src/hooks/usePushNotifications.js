import { getMessaging, onMessage } from 'firebase/messaging';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { app, firebaseCloudMessaging } from '../../services/firebase/client';

export default function usePushNotifications() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Calls the getMessage() function if the token is there
    async function setFCMToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          setToken(token);
          const messaging = getMessaging(app);
          onMessage(messaging, (payload) => {
            const { data } = payload;
            console.log('foreground notification', data);
            toast.info(data.body, {
              onClick: () => router.push(data.url)
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    setFCMToken();
  }, [router]);

  return token;
}
