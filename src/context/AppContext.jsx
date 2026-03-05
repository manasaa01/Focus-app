import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- State ---
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('focusFlowTheme');
      return saved ? JSON.parse(saved) : 'light';
    } catch (e) {
      return 'light';
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('focusFlowUser');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('focusFlowTasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing localStorage:', e);
      return [];
    }
  });

  const [activeTask, setActiveTask] = useState(null);
  const [timerState, setTimerState] = useState({ 
    timeLeft: 25 * 60, 
    isActive: false, 
    mode: 'Pomodoro' 
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('focusFlowUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('focusFlowUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('focusFlowTheme', JSON.stringify(theme));
  }, [theme]);

  // --- Actions ---
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  const addTask = (task) => {
    const safeTitle = (task.title || '').trim();
    if (!safeTitle) return;

    const newTask = { 
      ...task, 
      id: uuidv4(), 
      status: 'Pending',
      title: safeTitle,
      description: task.description || '',
      estimatedTime: task.estimatedTime || 25,
      technique: task.technique || 'Pomodoro'
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const startTimer = (task) => {
    setActiveTask(task);
    setTimerState({ 
      timeLeft: task.estimatedTime * 60 || 25 * 60, 
      isActive: true, 
      mode: task.technique || 'Pomodoro' 
    });
  };

  const toggleTimer = () => {
    setTimerState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const resetTimer = () => {
    setTimerState({ timeLeft: 25 * 60, isActive: false, mode: 'Pomodoro' });
    setActiveTask(null);
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
    setActiveTask(null);
    setTimerState({ timeLeft: 25 * 60, isActive: false, mode: 'Pomodoro' });
    localStorage.removeItem('focusFlowUser');
    localStorage.removeItem('focusFlowTasks');
  };

  // --- Analytics Logic ---
  const getAnalytics = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'Completed');
    const total = tasks.length;
    const efficiency = total > 0 ? Math.round((completed.length / total) * 100) : 0;
    
    const techniqueCounts = { Pomodoro: 0, Kaizen: 0, TimeBoxing: 0 };
    completed.forEach(t => {
      if(techniqueCounts[t.technique] !== undefined) techniqueCounts[t.technique]++;
    });

    return { completed, total, efficiency, techniqueCounts };
  }, [tasks]);

  return (
    <AppContext.Provider value={{ 
      tasks, addTask, updateTaskStatus, deleteTask, 
      activeTask, timerState, setTimerState, startTimer, toggleTimer, resetTimer,
      analytics: getAnalytics,
      user, setUser, logout,
      theme, toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    console.error('useApp must be used within AppProvider');
  }
  return context;
};
