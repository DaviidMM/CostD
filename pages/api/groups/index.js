import { addGroup, getGroups } from '../../../services/firebase/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return getGroups()
      .then((groups) => res.status(200).json(groups))
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  }
  if (req.method === 'POST') {
    const { name, description, members } = req.body;
    return addGroup({ name, description, members })
      .then((doc) => res.status(200).json(doc))
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  }
}
