import {
  deleteExpense,
  editExpense,
} from '../../../services/firebase/db/admin';

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { amount, description, member, payedAt } = req.body;

    return editExpense({ id, amount, description, member, payedAt })
      .then((expense) => {
        res.status(200).json(expense);
      })
      .catch((err) => {
        console.log({ err });
        res.status(err.status || 500).json({ error: err.message });
      });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    return deleteExpense(id)
      .then(() => res.status(200).json({}))
      .catch((err) => {
        console.log({ err });
        res.status(err.status).json({ error: err.message });
      });
  }
}
