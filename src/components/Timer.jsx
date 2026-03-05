import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Timer = () => {
  const { timerState, setTimerState, toggleTimer, resetTimer, activeTask } = useApp();
  const { timeLeft, isActive, mode } = timerState;
  const [showAlert, setShowAlert] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (timeLeft === 0 && !showAlert) {
      setShowAlert(true);
      setTimeout(() => {
        alert("Session Complete! Great job.");
        resetTimer();
        setShowAlert(false);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, setTimerState, resetTimer, showAlert]);

  // Helper to format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Color mapping based on technique
  const getThemeColor = () => {
    if (mode === 'Pomodoro') return 'text-red-500 border-red-500';
    if (mode === 'Kaizen') return 'text-blue-500 border-blue-500';
    return 'text-green-500 border-green-500';
  };

  const getBgColor = () => {
    if (mode === 'Pomodoro') return 'bg-red-500';
    if (mode === 'Kaizen') return 'bg-blue-500';
    return 'bg-green-500';
  };

  if (!activeTask) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex flex-col items-center justify-center z-50 text-white">
      <h2 className="text-2xl mb-4 font-light">{activeTask.title}</h2>
      <div className={`text-8xl font-bold mb-8 ${getThemeColor().split(' ')[0]} font-mono`}>
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex gap-4 mb-8">
        <button 
          onClick={toggleTimer} 
          className={`p-4 rounded-full hover:scale-105 transition shadow-lg ${isActive ? 'bg-white text-gray-900' : getBgColor() + ' text-white'}`}
        >
          {isActive ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button 
          onClick={resetTimer} 
          className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition shadow-lg"
        >
          <RotateCcw size={32} />
        </button>
      </div>
      
      <div className="text-gray-400 flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${getBgColor()}`}></span>
        Technique: <span className="capitalize font-medium text-gray-200">{mode}</span>
      </div>
    </div>
  );
};

export default Timer;

