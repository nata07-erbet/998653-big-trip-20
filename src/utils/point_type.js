import dayjs from 'dayjs';

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);

}

function isPointPresent(point) {
  return (dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo));
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}


export {isPointFuture, isPointPresent, isPointPast};
