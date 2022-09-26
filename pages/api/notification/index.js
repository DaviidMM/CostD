import { sendNotification } from '../../../services/firebase/admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body, image, title, token } = req.body;
    await sendNotification({ body, image, title, token });
    return res.status(200).end();
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
