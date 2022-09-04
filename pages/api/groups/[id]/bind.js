import { extractUser } from '../../../../services/firebase/admin';
import { bindUserToMember } from '../../../../services/firebase/db/admin';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: group } = req.query;
    const { member } = req.body;
    const userId = user.uid;

    return bindUserToMember({ group, user: userId, member })
      .then((group) => res.status(200).json(group))
      .catch((err) => {
        console.error(err);
        res.status(err.status || 500).json({ error: err.message });
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
