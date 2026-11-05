import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LETTERS, LEVELS, POINTS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find((item) => item.id === Number(id));

  if (!question) return <section className="panel"><h2>Không tìm thấy câu hỏi</h2><button onClick={() => navigate(-1)}>Quay lại</button></section>;

  return (
    <section className="panel">
      <h1>Câu hỏi số {question.id} – {question.topic} ({LEVELS[question.level]}, {POINTS[question.level]} điểm)</h1>
      <h2 className="question-text">{question.question}</h2>
      <div className="detail-options">
        {question.options.map((option, index) => (
          <div key={index} className={`detail-option ${index === question.answer ? 'detail-correct' : ''}`}>
            <strong>{LETTERS[index]}.</strong> {option} {index === question.answer && <strong>(Đáp án đúng)</strong>}
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </section>
  );
};

export default QuestionDetail;
