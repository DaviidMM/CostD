import { getGroupCosts } from '../../../../services/firebase/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    getGroupCosts(id).then((costs) => {
      res.status(200).json(costs);
    });
  }
}
