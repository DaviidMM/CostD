import { editGroup, getGroup } from '../../../../services/firebase/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    return getGroup(id).then((group) => {
      if (group) return res.status(200).json(group);
      return res.status(404).json({ error: 'Grupo no encontrado' });
    });
  }
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
