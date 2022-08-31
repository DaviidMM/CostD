export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, description, category, members } = req.body;

    return res.status(200).json({});
  }
}
