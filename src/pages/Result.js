import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return <Navigate to="/" replace />;
  let heading = 'Bạn đã hoàn thành 15 câu';
  if (state.reason === 'golden') heading = 'Chúc mừng! Bạn đã rung chuông vàng';
  if (state.reason === 'wrong') heading = 'Bạn đã bị loại';
  if (state.reason === 'timeout') heading = 'Hết giờ!';
  return (
    <section className="panel result-panel">
      <span className="eyebrow">KẾT QUẢ LƯỢT CHƠI</span>
      <h1>{heading}</h1>
      <p>Người chơi: <strong>{state.name}</strong></p>
      <p>Số câu trả lời đúng: <strong>{state.correctCount}</strong></p>
      <p>Điểm: <strong>{state.score}</strong></p>
      <p>Danh hiệu: <strong>{state.rank}</strong></p>
      <div className="result-actions">
        <button className="primary-button" onClick={() => navigate('/play')}>Chơi lại</button>
        <Link className="secondary-button" to="/">Về trang chủ</Link>
      </div>
    </section>
  );
};

export default Result;
