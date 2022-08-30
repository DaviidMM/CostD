import { addGroup } from '../../../services/firebase/db/admin';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, category, description, members } = req.body;
    return addGroup({ name, category, description, members })
      .then((doc) => res.status(200).json(doc))
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  }
}
