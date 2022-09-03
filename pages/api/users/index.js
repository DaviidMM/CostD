import { storeDbUser } from '../../../services/firebase/db/admin';
export default function handler(req, res) {
  const { method } = req;
  if (method === 'POST') {
    const { avatar, displayName, email, id } = req.body;
    storeDbUser({ avatar, displayName, email, id })
      .then((storedUser) => {
        res.status(200).json(storedUser);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
}
