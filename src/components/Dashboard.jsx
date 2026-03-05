import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const { analytics, theme } = useApp();
  const { completed, total, efficiency, techniqueCounts } = analytics;

  // Prepare Data for Charts
  const techniqueData = [
    { name: 'Pomodoro', value: techniqueCounts.Pomodoro },
    { name: 'Kaizen', value: techniqueCounts.Kaizen },
    { name: 'TimeBoxing', value: techniqueCounts.TimeBoxing },
  ];
  const COLORS = ['#ef4444', '#3b82f6', '#22c55e'];
  const titleText = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';
  const cardBg = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
  const mutedText = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const headingText = theme === 'dark' ? 'text-slate-200' : 'text-slate-700';

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${titleText}`}>Productivity Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-xl shadow-sm border ${cardBg}`}>
          <div className={`flex items-center gap-3 mb-2 ${mutedText}`}>
            <TrendingUp size={20} />
            <span>Completion Rate</span>
          </div>
          <div className={`text-4xl font-bold ${titleText}`}>{efficiency}%</div>
        </div>
        <div className={`p-6 rounded-xl shadow-sm border ${cardBg}`}>
          <div className={`flex items-center gap-3 mb-2 ${mutedText}`}>
            <CheckCircle size={20} />
            <span>Tasks Completed</span>
          </div>
          <div className={`text-4xl font-bold ${titleText}`}>{completed.length}</div>
        </div>
        <div className={`p-6 rounded-xl shadow-sm border ${cardBg}`}>
          <div className={`flex items-center gap-3 mb-2 ${mutedText}`}>
            <Clock size={20} />
            <span>Total Tasks</span>
          </div>
          <div className={`text-4xl font-bold ${titleText}`}>{total}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`p-6 rounded-xl shadow-sm border ${cardBg}`}>
          <h3 className={`text-lg font-semibold mb-4 ${headingText}`}>Technique Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={techniqueData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  fill="#8884d8" 
                  paddingAngle={5} 
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {techniqueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${cardBg}`}>
          <h3 className={`text-lg font-semibold mb-4 ${headingText}`}>Focus Efficiency</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{name: 'Efficiency', value: efficiency}]}>
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis domain={[0, 100]} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

