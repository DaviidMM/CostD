import { db } from '../../../services/firebase/admin';

export default function handler(req, res) {
  const { query } = req;
  const { id } = query;
  db.collection('groups')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(404).json({});
    });
}
