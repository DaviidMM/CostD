import {
  db,
  extractUser,
  sendGroupNotification
} from '../../../services/firebase/admin';
import { addMovement } from '../../../services/firebase/db/admin';

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { amount, description, group, member, participants, payedAt, type } =
      req.body;
    return addMovement({
      amount: Number(amount),
      description,
      group,
      member,
      participants,
      payedAt,
      type
    })
      .then(async (result) => {
        // Get group name
        const groupName = await db
          .collection('groups')
          .doc(group)
          .get()
          .then((doc) => doc.data().name);

        // Get member name
        const memberName = (await db.collection('groups').doc(group).get())
          .data()
          .members.find((m) => m.uid === user.uid).name;

        await sendGroupNotification({
          body: `🧾 ${memberName} ha añadido un gasto de ${amount}€`,
          group,
          sender: user.uid,
          title: `[${groupName}] Gasto añadido`
        });

        return res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
