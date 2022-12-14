import dayjs from 'dayjs';

export const findById = (id, list) => {
  return list.find((item) => item.id === id);
};

export const filterById = (id, list, type = 'no-match') => {
  return type === 'match' ? list.filter((item) => item.id === id) : list.filter((item) => item.id !== id);
};

export const generateCurrentTime = (date) => {
  return date ? dayjs(date).format('DD MMM YYYY HH:mm') : dayjs().format();
};

export const orderByPinned = (list) => {
  const pinned = list.filter((note) => note.pinned);
  const notPinned = list.filter((note) => !note.pinned);

  return [...pinned, ...notPinned];
};
