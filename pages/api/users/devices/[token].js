import { extractUser } from '../../../../services/firebase/admin';
import { removeDeviceFromUser } from '../../../../services/firebase/db/admin';

export default async function handler(req, res) {
  const { method } = req;
  if (method === 'DELETE') {
    const { uid } = await extractUser(req.headers.authorization);
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { token } = req.query;

    return removeDeviceFromUser({ uid, token })
      .then((response) => {
        return res.status(200).end();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ err });
      });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
