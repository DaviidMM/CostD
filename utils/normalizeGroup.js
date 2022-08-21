export default async function normalizeGroup({ id, data }) {
  return {
    id,
    ...data,
    createdAt: data.createdAt.toDate(),
  };
}
