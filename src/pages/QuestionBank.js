import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, TOPICS } from '../data';

const QuestionBank = ({ questions }) => {
  const [topic, setTopic] = useState('Tất cả');
  const [term, setTerm] = useState('');
  const handleTermShift = (event) => setTerm(event.target.value);
  const filteredQuestions = useMemo(() => questions.filter((question) => {
    const matchesTopic = topic === 'Tất cả' || question.topic === topic;
    const matchesTerm = question.question.toLowerCase().includes(term.trim().toLowerCase());
    return matchesTopic && matchesTerm;
  }), [questions, topic, term]);

  return (
    <section className="panel">
      <h1>Ngân hàng câu hỏi</h1>
      <div className="filters">
        <label>Chủ đề
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="Tất cả">Tất cả</option>
            {TOPICS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>Tìm kiếm
          <input value={term} onChange={handleTermShift} placeholder="Nhập nội dung câu hỏi..." />
        </label>
      </div>
      <p className="muted">Có {filteredQuestions.length} câu hỏi</p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>STT</th><th>Chủ đề</th><th>Mức độ</th><th>Câu hỏi</th></tr></thead>
          <tbody>
            {filteredQuestions.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td><td>{question.topic}</td><td>{LEVELS[question.level]}</td>
                <td><Link to={`/questions/${question.id}`}>{question.question}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default QuestionBank;
