const BUILD_TAG = "rc-5307";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ltw_rcv_history')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const controller = new AbortController();
    axios.get('/data/questions.json', { signal: controller.signal })
      .then((response) => setQuestions(response.data))
      .catch((err) => {
        if (!axios.isCancel(err) && err.code !== 'ERR_CANCELED') setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem('ltw_rcv_history', JSON.stringify(history));
  }, [history]);

  const saveHistory = (record) => setHistory((prev) => [...prev, record]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home playerName={playerName} setPlayerName={setPlayerName} history={history} />} />
        <Route path="play" element={
          playerName.trim() ? (
            loading ? <p className="notice">Đang tải câu hỏi...</p> :
            error ? <p className="notice error">Không tải được câu hỏi.</p> :
            <Play questions={questions} playerName={playerName.trim()} onFinish={saveHistory} />
          ) : <Navigate to="/" replace />
        } />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<History history={history} setHistory={setHistory} />} />
        <Route path="questions" element={
          loading ? <p className="notice">Đang tải câu hỏi...</p> :
          error ? <p className="notice error">Không tải được câu hỏi.</p> :
          <QuestionBank questions={questions} />
        } />
        <Route path="questions/:id" element={
          loading ? <p className="notice">Đang tải câu hỏi...</p> :
          error ? <p className="notice error">Không tải được câu hỏi.</p> :
          <QuestionDetail questions={questions} />
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
