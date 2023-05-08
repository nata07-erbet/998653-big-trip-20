import dayjs from 'dayjs';
import { DATA_TIME, DATA_NUMBER_MONTH, DATA_HOUR_MINUTE } from './constants/constants.js';

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

export {getRandomArrayElement, humanizePointDueDateTime, humanizePointDueDate, humanizePointDueTime, getRandomInt };
