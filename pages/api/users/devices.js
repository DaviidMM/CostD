import { extractUser } from '../../../services/firebase/admin';
import { addDeviceToUser } from '../../../services/firebase/db/admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { uid } = await extractUser(req.headers.authorization);
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Register FCM token to user
    const { token } = req.body;
    return addDeviceToUser({ id: uid, token })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.message });
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
