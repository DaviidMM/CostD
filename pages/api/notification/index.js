import { sendGroupNotification } from '../../../services/firebase/admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body, group, image, title } = req.body;
    return sendGroupNotification({ body, group, image, title })
      .then(() => res.status(200).end())
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.message });
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
