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

function getPointsDateDiff() {

}

function getPointsPriceDiff() {

}

function getPointsDurationDiff() {

}


export {isPointFuture, isPointPresent, isPointPast, getPointsDateDiff, getPointsPriceDiff, getPointsDurationDiff };
