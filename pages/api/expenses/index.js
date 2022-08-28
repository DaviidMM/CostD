import { addExpense } from '../../../services/firebase/db';

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
  if (req.method === 'PUT') {
    const { id } = req.query;
    return res.status(200).json({ action: 'Actualizar gasto' + id });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    return res.status(200).json({ action: 'Eliminar gasto' + id });
  }
}
