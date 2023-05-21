import dayjs from 'dayjs';

function getWeigthForNullDate(dateA, dateB) {
  if (dateB === null) {
    return -1;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateA === null && dateB === null){
    return 0;
  }
  return null;
}

function sortUp(pointA, pointB) {
  const weight = getWeigthForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

export {sortUp};
