export const normalizeLongDate = (date) => {
  const dateObject = new Date(date);
  const weekday = dateObject.toLocaleString('default', { weekday: 'long' });

  return `${weekday}, ${dateObject.getDate()} de ${dateObject.toLocaleString(
    'default',
    { month: 'long' }
  )} de ${dateObject.getFullYear()}, ${dateObject.getHours()}:${dateObject.getMinutes()}`;
};

export const normalizeShortDate = (date) => {
  const dateObject = new Date(date);
  return `${dateObject.getDate()}/${dateObject.toLocaleDateString('default', {
    month: '2-digit',
  })}/${dateObject.getFullYear()}, ${dateObject.getHours()}:${dateObject.getMinutes()}`;
};
