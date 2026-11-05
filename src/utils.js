import { POINTS, RANKS } from './data';

export const calcScore = (answers) =>
  answers.filter((item) => item.correct)
    .reduce((total, item) => total + POINTS[item.level], 0);

export const getRank = (score) =>
  RANKS.find((item) => score >= item.min)?.title || 'Cần cố gắng';
