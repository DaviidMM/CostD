import { getGroups } from '../../../services/firebase/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    getGroups().then((groups) => {
      res.status(200).json(groups);
    });
  }
}
