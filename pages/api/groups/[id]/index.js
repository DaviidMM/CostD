import { extractUser } from '../../../../services/firebase/admin';
import { deleteGroup, editGroup } from '../../../../services/firebase/db/admin';

export default async function handler(req, res) {
  const { method } = req;
  if (method === 'PUT') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;
    const { name, description, category, members } = req.body;

    return editGroup({ id, name, description, category, members })
      .then((movement) => {
        res.status(200).json(movement);
      })
      .catch((err) => {
        res.status(err.status || 500).json({ error: err.message });
      });
  }

  if (method === 'DELETE') {
    const { uid } = await extractUser(req.headers.authorization);
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    return deleteGroup({ id, uid })
      .then(() => res.status(200).end())
      .catch((err) => {
        console.error(err);
        return res.status(err.status || 500).json({ error: err.message });
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
