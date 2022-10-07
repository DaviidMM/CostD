import { extractUser } from '../../../services/firebase/admin';
import { addGroup } from '../../../services/firebase/db/admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { uid } = await extractUser(req.headers.authorization);
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, category, description, members } = req.body;
    return addGroup({
      creator: uid,
      group: { name, category, description, members }
    })
      .then((doc) => res.status(200).json(doc))
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
