export default function normalizeMovement({ id, data }) {
  return {
    id,
    ...data,
    createdAt: data.createdAt.toDate(),
    payedAt: data.payedAt.toDate(),
  };
}
