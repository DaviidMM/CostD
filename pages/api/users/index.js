import { extractUser } from '../../../services/firebase/admin';
import { storeDbUser } from '../../../services/firebase/db/admin';
export default async function handler(req, res) {
  const { method } = req;
  if (method === 'POST') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { picture: avatar, name: displayName, email, uid: id } = user;

    return storeDbUser({ avatar, displayName, email, id })
      .then((storedUser) => {
        res.status(200).json(storedUser);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
