export const normalizeLongDate = (date) => {
  const dateObject = new Date(date);
  const weekday = dateObject.toLocaleString('default', { weekday: 'long' });

  const minutes =
    dateObject.getMinutes() < 10
      ? `0${dateObject.getMinutes()}`
      : dateObject.getMinutes();

  return `${weekday}, ${dateObject.getDate()} de ${dateObject.toLocaleString(
    'default',
    { month: 'long' }
  )} de ${dateObject.getFullYear()}, ${dateObject.getHours()}:${minutes}`;
};

export const normalizeShortDate = (date) => {
  const dateObject = new Date(date);
  return `${dateObject.getDate()}/${dateObject.toLocaleDateString('default', {
    month: '2-digit',
  })}/${dateObject.getFullYear()}, ${dateObject.getHours()}:${dateObject.getMinutes()}`;
};

export const convertUTCToLocal = (date) => {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};

export const formatInputDate = (date) => {
  return convertUTCToLocal(new Date(date))
    .toISOString()
    .split(':')
    .slice(0, -1)
    .join(':');
};
