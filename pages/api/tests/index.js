import { db } from '../../../services/firebase/admin';

export default function handler(req, res) {
  const { query } = req;
  const { id } = query;
  const { authorization } = req.headers;
  console.log({ authorization });
}
