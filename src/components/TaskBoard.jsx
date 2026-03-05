import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, Play, Clock, Target } from 'lucide-react';

const TaskBoard = () => {
  const { tasks, addTask, updateTaskStatus, deleteTask, startTimer, theme } = useApp();
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState('Pomodoro');
  const [estimatedTime, setEstimatedTime] = useState(25);

  const handleAdd = () => {
    const title = taskTitle.trim();
    if (!title) {
      alert('Please enter a task title');
      return;
    }
    addTask({
      title: title,
      description: '',
      estimatedTime: estimatedTime,
      technique: selectedTechnique,
      status: 'Pending'
    });
    setTaskTitle('');
  };

  const columns = ['Pending', 'In Progress', 'Completed'];

  const getTechniqueColor = (technique) => {
    if (technique === 'Pomodoro') return 'bg-red-100 text-red-700 border-red-200';
    if (technique === 'Kaizen') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const getBorderColor = (technique) => {
    if (technique === 'Pomodoro') return 'border-l-red-500';
    if (technique === 'Kaizen') return 'border-l-blue-500';
    return 'border-l-green-500';
  };

  const textPrimary = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';
  const panelBg = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
  const colBg = theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100';
  const colTitle = theme === 'dark' ? 'text-slate-200' : 'text-slate-700';
  const badgeBg = theme === 'dark' ? 'bg-slate-700 text-slate-200' : 'bg-slate-200';
  const inputBg = theme === 'dark' ? 'bg-slate-800 text-slate-100 border-slate-600' : 'border-slate-200';
  const cardBg = theme === 'dark' ? 'bg-slate-800' : 'bg-white';
  const mutedText = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const emptyText = theme === 'dark' ? 'text-slate-500' : 'text-slate-400';

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Task Board</h1>
        
        <div className={`flex flex-wrap gap-2 p-4 rounded-xl shadow-sm border ${panelBg}`}>
          <input 
            type="text" 
            placeholder="New task title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
            }}
            className={`border p-2 rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
          />
          <select 
            value={selectedTechnique}
            onChange={(e) => setSelectedTechnique(e.target.value)}
            className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
          >
            <option value="Pomodoro">Pomodoro</option>
            <option value="Kaizen">Kaizen</option>
            <option value="TimeBoxing">TimeBoxing</option>
          </select>
          <input 
            type="number"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(parseInt(e.target.value) || 25)}
            min="1"
            max="120"
            className={`border p-2 rounded-lg w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
          />
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col} className={`p-4 rounded-xl min-h-[500px] ${colBg}`}>
            <h2 className={`font-bold mb-4 flex items-center gap-2 ${colTitle}`}>
              {col === 'Pending' && <Target size={18} />}
              {col === 'In Progress' && <Clock size={18} />}
              {col === 'Completed' && <Play size={18} className="rotate-90" />}
              {col}
              <span className={`text-xs px-2 py-1 rounded-full ml-auto ${badgeBg}`}>
                {tasks.filter(t => t.status === col).length}
              </span>
            </h2>
            <div className="space-y-3">
              {tasks.filter(t => t.status === col).map(task => (
                <div key={task.id} className={`${cardBg} p-4 rounded-lg shadow-sm border-l-4 ${getBorderColor(task.technique)} hover:shadow-md transition`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${textPrimary}`}>{task.title}</h3>
                    <button 
                      onClick={() => deleteTask(task.id)} 
                      className={`${mutedText} hover:text-red-500 transition`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getTechniqueColor(task.technique)}`}>
                      {task.technique}
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${mutedText}`}>
                      <Clock size={12} /> {task.estimatedTime} min
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {col !== 'Completed' && (
                      <button 
                        onClick={() => startTimer(task)}
                        className="flex-1 bg-green-50 text-green-600 py-1.5 rounded text-sm flex items-center justify-center gap-1 hover:bg-green-100 transition font-medium"
                      >
                        <Play size={14} /> Focus
                      </button>
                    )}
                    {col === 'Pending' && (
                      <button 
                        onClick={() => updateTaskStatus(task.id, 'In Progress')}
                        className="flex-1 bg-slate-100 text-slate-600 py-1.5 rounded text-sm hover:bg-slate-200 transition"
                      >
                        Start
                      </button>
                    )}
                    {col === 'In Progress' && (
                      <button 
                        onClick={() => updateTaskStatus(task.id, 'Completed')}
                        className="flex-1 bg-blue-50 text-blue-600 py-1.5 rounded text-sm hover:bg-blue-100 transition font-medium"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.status === col).length === 0 && (
                <div className={`text-center py-8 text-sm ${emptyText}`}>
                  No tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;

