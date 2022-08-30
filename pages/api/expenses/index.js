import { addExpense } from '../../../services/firebase/db/admin';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { description, member, payedAt, amount, group } = req.body;
    return addExpense({
      description,
      member,
      payedAt,
      amount: Number(amount),
      group,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  }
}
