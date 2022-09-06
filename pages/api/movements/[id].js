import { extractUser } from '../../../services/firebase/admin';
import {
  deleteMovement,
  editMovement,
} from '../../../services/firebase/db/admin';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;
    const { amount, description, member, participants, payedAt, type } =
      req.body;

    return editMovement({
      id,
      amount,
      description,
      member,
      participants,
      payedAt,
      type,
    })
      .then((movement) => {
        res.status(200).json(movement);
      })
      .catch((err) => {
        console.log({ err });
        res.status(err.status || 500).json({ error: err.message });
      });
  }
  if (req.method === 'DELETE') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;
    return deleteMovement(id)
      .then(() => res.status(200).json({}))
      .catch((err) => {
        console.log({ err });
        res.status(err.status).json({ error: err.message });
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
