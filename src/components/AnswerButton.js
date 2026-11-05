import React from 'react';

const AnswerButton = ({ letter, option, index, hidden, selected, status, correct, onClick }) => {
  let className = 'answer-button';
  if (hidden) className += ' answer-hidden';
  if (status === 'locked' && selected) className += ' answer-selected';
  if (status === 'revealed') {
    if (selected && correct) className += ' answer-correct';
    else if (selected && !correct) className += ' answer-wrong';
    else if (correct) className += ' answer-correct';
  }
  return (
    <button className={className} disabled={hidden || status !== 'answering'} onClick={onClick}>
      {hidden ? '' : `${letter}. ${option}`}
    </button>
  );
};

export default AnswerButton;
