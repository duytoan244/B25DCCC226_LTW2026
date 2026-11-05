import React from 'react';

const ScoreBoard = ({ answers, currentIndex, score }) => (
  <section className="score-panel">
    <strong>Điểm: {score}</strong>
    <div className="score-grid">
      {Array.from({ length: 15 }, (_, index) => {
        const answer = answers[index];
        let className = 'score-cell';
        if (answer?.correct) className += ' score-correct';
        if (answer?.usedRescue) className += ' score-rescue';
        if (index === currentIndex) className += ' score-current';
        return <div key={index + 1} className={className}>{index + 1}</div>;
      })}
    </div>
  </section>
);

export default ScoreBoard;
