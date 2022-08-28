import { editExpense } from '../../../services/firebase/db';

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { amount, description, member, payedAt } = req.body;

    return editExpense({ id, amount, description, member, payedAt })
      .then((expense) => {
        res.status(200).json(expense);
      })
      .catch((err) => {
        res.status(err.status).json({ error: err.message });
      });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    return res.status(200).json({ action: 'Eliminar gasto' + id });
  }
}