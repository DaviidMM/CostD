export default function normalizeExpense({ id, data }) {
  return {
    id,
    ...data,
    createdAt: data.createdAt.toDate(),
    payedAt: data.payedAt.toDate(),
  };
}
