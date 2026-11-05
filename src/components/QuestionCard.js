import React from 'react';
import { LEVELS } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ question, questionNumber, selected, status, hiddenOptions, onChoose, correctAnswer }) => (
  <section className="panel">
    <div className="question-meta">Câu {questionNumber}/15 · {question.topic} · {LEVELS[question.level]}</div>
    <h2 className="question-text">{question.question}</h2>
    <div className="answer-grid">
      {question.options.map((option, index) => (
        <AnswerButton
          key={`${question.id}-${index}`}
          letter={String.fromCharCode(65 + index)}
          option={option}
          index={index}
          hidden={hiddenOptions.includes(index)}
          selected={selected === index}
          status={status}
          correct={correctAnswer === index}
          onClick={() => onChoose(index)}
        />
      ))}
    </div>
  </section>
);

export default QuestionCard;
