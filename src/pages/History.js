import React from 'react';

const History = ({ history, setHistory }) => {
  const sortedHistory = [...history].sort((a, b) => b.score - a.score);
  const totalScore = history.reduce((sum, item) => sum + item.score, 0);
  const average = history.length ? Math.round(totalScore / history.length) : 0;
  if (!history.length) return <section className="panel"><h1>Lịch sử lượt chơi</h1><p>Chưa có lượt chơi nào.</p></section>;

  return (
    <section className="panel">
      <div className="history-heading">
        <h1>Lịch sử lượt chơi</h1>
        <button className="danger-button" onClick={() => setHistory([])}>Xóa lịch sử</button>
      </div>
      <div className="stats">
        <div><span>Số lượt chơi</span><strong>{history.length}</strong></div>
        <div><span>Điểm cao nhất</span><strong>{Math.max(...history.map((item) => item.score))}</strong></div>
        <div><span>Điểm trung bình</span><strong>{average}</strong></div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Người chơi</th><th>Số câu đúng</th><th>Điểm</th><th>Danh hiệu</th><th>Thời gian</th></tr></thead>
          <tbody>
            {sortedHistory.map((item) => (
              <tr key={item.id}><td>{item.name}</td><td>{item.correctCount}</td><td>{item.score}</td><td>{item.rank}</td><td>{item.playedAt}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default History;
