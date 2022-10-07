import {
  db,
  extractUser,
  sendGroupNotification
} from '../../../services/firebase/admin';
import {
  deleteMovement,
  editMovement
} from '../../../services/firebase/db/admin';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;
    const { amount, description, member, participants, payedAt, type } =
      req.body;

    return editMovement({
      id,
      amount,
      description,
      member,
      participants,
      payedAt,
      type
    })
      .then(async (movement) => {
        const { group } = movement;
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
          body: `🔀 ${memberName} ha modificado un gasto`,
          group,
          sender: user.uid,
          title: `[${groupName}] Gasto modificado`
        });
        return res.status(200).json(movement);
      })
      .catch((err) => {
        console.error({ err });
        res.status(err.status || 500).json({ error: err.message });
      });
  }
  if (req.method === 'DELETE') {
    const user = await extractUser(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    // Get movement group
    const group = (await db.collection('movements').doc(id).get()).data().group;

    return deleteMovement(id)
      .then(async () => {
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
          body: `❌ ${memberName} ha eliminado un gasto`,
          group,
          sender: user.uid,
          title: `[${groupName}] Gasto eliminado`
        });
        res.status(200).json({});
      })
      .catch((err) => {
        console.error({ err });
        res.status(err.status).json({ error: err.message });
      });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
