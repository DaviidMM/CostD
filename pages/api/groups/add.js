import { addGroup } from '../../../services/firebase/db';
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, members } = req.body;
    addGroup({ name, description, members }).then((doc) => {
      res.status(200).json(doc);
    });
  }
}
