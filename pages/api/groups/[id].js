import { getGroup } from '../../../services/firebase/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    getGroup(id).then((group) => {
      if (group) return res.status(200).json(group);
      return res.status(404).json({ error: 'Grupo no encontrado' });
    });
  }
}
