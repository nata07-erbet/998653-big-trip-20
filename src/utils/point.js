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

function getPointsDateDiff(pointA, pointB) {
  return new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
}

function getPointsPriceDiff(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function getPointsDurationDiff(pointA, pointB) {
  const durationA = new Date(pointA.dateFrom) - new Date(pointA.dateTo);
  const durationB = new Date(pointB.dateFrom) - new Date(pointB.dateTo);

  return durationA - durationB;
}

export {isPointFuture, isPointPresent, isPointPast, getPointsDateDiff, getPointsPriceDiff, getPointsDurationDiff };
