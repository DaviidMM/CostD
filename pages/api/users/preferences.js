import { extractUser } from '../../../services/firebase/admin';
import {
  getUserPreferences,
  updateUserPreference
} from '../../../services/firebase/db/admin';

export default async function handler (req, res) {
  const { method } = req;

  if (method === 'GET') {
    const { uid } = await extractUser(req.headers.authorization);
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return getUserPreferences(uid)
      .then((preferences) => res.status(200).json(preferences))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err });
      });
  }

  if (method === 'PUT') {
    const { uid } = await extractUser(req.headers.authorization);
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { preference, value } = req.body;
    return updateUserPreference({ uid, preference, value })
      .then((result) => {
        console.log(result);
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
