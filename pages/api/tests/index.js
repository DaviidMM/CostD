import { db } from '../../../services/firebase/admin';

export default function handler(req, res) {
  const { query } = req;
  const { id } = query;
  const { authorization } = req.headers;
  return res.status(200).json({});
}
