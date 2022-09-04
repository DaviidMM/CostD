import { extractUser } from '../../../services/firebase/admin';
import { addMovement } from '../../../services/firebase/db/admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { amount, description, group, member, payedAt, type } = req.body;
    return addMovement({
      amount: Number(amount),
      description,
      group,
      member,
      payedAt,
      type,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
