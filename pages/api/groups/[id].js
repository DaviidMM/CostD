import { editGroup } from '../../../services/firebase/db/admin';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, description, category, members } = req.body;

    return editGroup({ id, name, description, category, members })
      .then((expense) => {
        res.status(200).json(expense);
      })
      .catch((err) => {
        res.status(err.status).json({ error: err.message });
      });
  }
}
