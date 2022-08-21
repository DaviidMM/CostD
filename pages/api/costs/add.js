import { addCost } from '../../../services/firebase/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { member, payedAt, amount, group } = req.body;
    addCost({ member, payedAt, amount, group }).then((result) => {
      return res.status(200).json({ result });
    });
  }
}
