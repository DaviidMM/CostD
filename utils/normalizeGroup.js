export default function normalizeGroup({ id, data }) {
  return {
    id,
    ...data,
    createdAt: new Date(data.createdAt.toDate())
  };
}
