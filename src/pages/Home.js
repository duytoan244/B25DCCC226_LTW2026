import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();
  const best = history.length ? [...history].sort((a, b) => b.score - a.score)[0] : null;
  const handleStart = (event) => {
    event.preventDefault();
    if (playerName.trim()) navigate('/play');
  };
  return (
    <div className="home-page">
      <section className="hero panel">
        <span className="eyebrow">THỬ THÁCH KIẾN THỨC WEB</span>
        <h1>Rung chuông vàng</h1>
        <p>15 câu hỏi · 20 giây mỗi câu · Tối đa 300 điểm</p>
      </section>
      <section className="panel">
        <h2>Luật chơi</h2>
        <ul className="rules">
          <li>Trả lời lần lượt 15 câu hỏi về HTML, CSS, JavaScript và React.</li>
          <li>Câu dễ: 10 điểm · Trung bình: 20 điểm · Khó: 30 điểm.</li>
          <li>Trả lời sai hoặc hết giờ sẽ bị loại, trừ khi sử dụng phao cứu sinh.</li>
          <li>Bạn có 3 quyền trợ giúp, mỗi quyền dùng một lần trong một lượt chơi.</li>
        </ul>
        <form onSubmit={handleStart} className="start-form">
          <label htmlFor="playerName">Tên người chơi</label>
          <input id="playerName" value={playerName} onChange={(event) => setPlayerName(event.target.value)} placeholder="Nhập tên của bạn" />
          <button className="primary-button" type="submit" disabled={!playerName.trim()}>Vào thi</button>
        </form>
      </section>
      {best && <p className="record">Kỷ lục: {best.score} điểm – {best.name}</p>}
    </div>
  );
};

export default Home;
