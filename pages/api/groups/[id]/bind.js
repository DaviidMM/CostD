import { bindUserToMember } from '../../../../services/firebase/db/admin';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id: group } = req.query;
    const { member, user } = req.body;

    bindUserToMember({ group, user, member })
      .then((group) => res.status(200).json(group))
      .catch((err) =>
        res.status(err.status || 500).json({ error: err.message })
      );
  }
}
