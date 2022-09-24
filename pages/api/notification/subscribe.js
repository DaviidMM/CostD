import { subscribeTopic } from '../../../services/firebase/admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await subscribeTopic('Grupazo');
    return res.status(200).end();
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
