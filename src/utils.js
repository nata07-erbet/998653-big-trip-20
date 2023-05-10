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

const getRandomInt = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

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

export {getRandomArrayElement, humanizePointDueDateTime, humanizePointDueDate, humanizePointDueTime, getRandomInt, getDiffFromDates};
