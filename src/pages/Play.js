import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Helpers from '../components/Helpers';
import { EXTRA_TIME, POINTS, TIME_PER_QUESTION } from '../data';
import { calcScore, getRank } from '../utils';

const Play = ({ questions, playerName, onFinish }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [time, setTime] = useState(TIME_PER_QUESTION);
  const [status, setStatus] = useState('answering');
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [used, setUsed] = useState({ hide: false, extra: false, rescue: false });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [rescueActive, setRescueActive] = useState(false);
  const [endReason, setEndReason] = useState('');
  const finishedRef = useRef(false);
  const question = questions[currentIndex];
  const score = calcScore(answers);

  const finishGame = (reason, finalAnswers = answers) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const finalScore = calcScore(finalAnswers);
    const correctCount = finalAnswers.filter((item) => item.correct).length;
    const rank = getRank(finalScore);
    const result = { name: playerName, score: finalScore, rank, correctCount, reason };
    const record = { id: `${Date.now()}-${Math.random()}`, ...result, playedAt: new Date().toLocaleString('vi-VN') };
    onFinish(record);
    navigate('/result', { replace: true, state: result });
  };

  const chooseAnswer = (index) => {
    if (status !== 'answering' || hiddenOptions.includes(index)) return;
    setSelected(index);
    setStatus('locked');
  };

  useEffect(() => {
    if (status !== 'answering' || !question) return undefined;
    const interval = setInterval(() => setTime((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(interval);
  }, [status, currentIndex, question]);

  useEffect(() => {
    if (status === 'answering' && time === 0) {
      setEndReason('timeout');
      setSelected(null);
      setStatus('revealed');
    }
  }, [status, time]);

  useEffect(() => {
    if (status === 'locked') {
      const timeout = setTimeout(() => setStatus('revealed'), 2000);
      return () => clearTimeout(timeout);
    }
    if (status === 'revealed') {
      const timeout = setTimeout(() => {
        const isCorrect = selected === question.answer;
        const rescued = rescueActive && !isCorrect;
        const newAnswer = {
          id: question.id,
          level: question.level,
          correct: isCorrect,
          usedRescue: rescueActive
        };
        const nextAnswers = [...answers, newAnswer];
        setAnswers(nextAnswers);

        if (!isCorrect && !rescued) {
          finishGame(endReason === 'timeout' ? 'timeout' : 'wrong', nextAnswers);
        } else if (currentIndex === questions.length - 1) {
          const allCorrect = nextAnswers.every((item) => item.correct);
          finishGame(allCorrect ? 'golden' : 'completed', nextAnswers);
        } else {
          setCurrentIndex((prev) => prev + 1);
          setTime(TIME_PER_QUESTION);
          setSelected(null);
          setHiddenOptions([]);
          setRescueActive(false);
          setEndReason('');
          setStatus('answering');
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [status]); // Mỗi trạng thái chỉ tạo một timeout; cleanup khi rời màn hình hoặc đổi trạng thái.

  useEffect(() => {
    const handleKey = (event) => {
      if (status !== 'answering') return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index <= 3 && !hiddenOptions.includes(index)) chooseAnswer(index);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, hiddenOptions, selected]);

  useEffect(() => {
    document.title = `Câu ${currentIndex + 1}/15 – ${score} điểm`;
    return () => { document.title = 'Rung chuông vàng'; };
  }, [currentIndex, score]);

  const useHide = () => {
    const wrongOptions = question.options.map((_, index) => index).filter((index) => index !== question.answer);
    const randomIndex = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    setHiddenOptions((prev) => [...prev, randomIndex]);
    setUsed((prev) => ({ ...prev, hide: true }));
  };

  const useExtraTime = () => {
    setTime((prev) => prev + EXTRA_TIME);
    setUsed((prev) => ({ ...prev, extra: true }));
  };

  const useRescue = () => {
    setRescueActive(true);
    setUsed((prev) => ({ ...prev, rescue: true }));
  };

  if (!question) return <p className="notice">Không có câu hỏi để thi.</p>;

  return (
    <div className="play-page">
      <div className="play-top">
        <h1>Vòng thi</h1>
        <Timer time={time} />
      </div>
      <QuestionCard
        question={question}
        questionNumber={currentIndex + 1}
        selected={selected}
        status={status}
        hiddenOptions={hiddenOptions}
        onChoose={chooseAnswer}
        correctAnswer={status === 'revealed' ? question.answer : null}
      />
      <Helpers used={used} onHide={useHide} onExtraTime={useExtraTime} onRescue={useRescue} rescueActive={rescueActive} disabled={status !== 'answering'} />
      <ScoreBoard answers={answers} currentIndex={currentIndex} score={score} />
      <p className="muted">Người chơi: {playerName}</p>
    </div>
  );
};

export default Play;
