import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Dashboard from './components/Dashboard';
import TaskBoard from './components/TaskBoard';
import Timer from './components/Timer';
import Login from './components/Login'; 
import { CheckSquare, BarChart3, LogOut, Sun, Moon } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('board');
  const { user, logout, theme, toggleTheme } = useApp();

  // Theme-aware classes
  const bgMain = theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50';
  const bgSidebar = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const textMain = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';
  const textMuted = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const bgTip = theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100';
  const bgActive = theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-50';
  const hoverBg = theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-50';
  const activeBtnClass = theme === 'dark' ? 'bg-blue-900/50 text-blue-400 font-medium' : 'bg-blue-50 text-blue-600 font-medium';
  const normalBtnClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className={`min-h-screen ${bgMain} flex`}>
      {/* Sidebar */}
      <aside className={`w-64 ${bgSidebar} border-r p-6 flex flex-col`}>
        <h1 className={`text-2xl font-bold text-blue-500 mb-10`}>FocusFlow</h1>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('board')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
              activeTab === 'board' 
                ? activeBtnClass
                : `${normalBtnClass} ${hoverBg}`
            }`}
          >
            <CheckSquare size={20} /> Task Board
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
              activeTab === 'dashboard' 
                ? activeBtnClass
                : `${normalBtnClass} ${hoverBg}`
            }`}
          >
            <BarChart3 size={20} /> Analytics
          </button>
        </nav>
        
        <div className="mt-auto space-y-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-2 w-full p-3 rounded-lg transition ${hoverBg} ${textMuted}`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          
          <div className={`${bgTip} p-4 rounded-lg`}>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium mb-2`}>Productivity Tips</p>
            <p className={`text-xs ${textMuted}`}>Use the Pomodoro technique for deep work sessions.</p>
          </div>
          <div className={`flex items-center gap-2 text-sm ${textMuted}`}>
            <span className={`w-8 h-8 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center text-blue-500 font-medium`}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
            <span className="truncate">{user?.name || 'User'}</span>
          </div>
          <button 
            onClick={logout}
            className={`flex items-center gap-2 w-full p-2 ${textMuted} hover:text-red-500 transition text-sm`}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'board' && <TaskBoard />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>

      {/* Active Timer Overlay */}
      <Timer />
    </div>
  );
};

const AppShell = () => {
  const { user, setUser, theme } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-blue-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <AppContent />;
};

const App = () => {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
};

export default App;
