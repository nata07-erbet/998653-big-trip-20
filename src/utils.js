import dayjs from 'dayjs';
// import duration from 'dayjs/plugin/duration';
import { DATA_TIME, DATA_NUMBER_MONTH, DATA_HOUR_MINUTE, MSEC_IN_DAY, MSEC_IN_HOUR, DAY_HOUR_MIN, HOUR_MIN, MIN } from './constants/constants.js';

// dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDueDateTime (dueDate) {
  return dueDate ? dayjs(dueDate).format(DATA_TIME) : '';
}

function humanizePointDueDate (dueDate) {
  return dueDate ? dayjs(dueDate).format(DATA_NUMBER_MONTH) : '';
}

function humanizePointDueTime (dueDate) {
  return dueDate ? dayjs(dueDate).format(DATA_HOUR_MINUTE) : '';
}

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function getRandomValue(items) {
  return items[getRandomInteger(0, items.length - 1)];
}

function getDiffFromDates (dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true) {
    case(timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format(DAY_HOUR_MIN);
      break;
    case(timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format(HOUR_MIN);
      break;
    case(timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format(MIN);
      break;
  }

  return pointDuration;
}

export {getRandomArrayElement, humanizePointDueDateTime, humanizePointDueDate, humanizePointDueTime, getDiffFromDates, getRandomInteger, getRandomValue};
