import React from 'react';
import { TrendingUp, Target, CheckCircle, Clock } from 'lucide-react';

const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  
  const highPriorityTodos = todos.filter(todo => todo.priority === 'haute' && !todo.completed).length;
  
  const stats = [
    { 
      label: 'Total des tâches', 
      value: totalTodos, 
      icon: <Target className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Tâches actives', 
      value: activeTodos, 
      icon: <Clock className="h-6 w-6" />,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50'
    },
    { 
      label: 'Tâches terminées', 
      value: completedTodos, 
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50'
    },
    { 
      label: 'Priorité haute', 
      value: highPriorityTodos, 
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50'
    },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor} rounded-xl p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
              <div className="text-white">{stat.icon}</div>
            </div>
          </div>
          
          {stat.label === 'Tâches terminées' && totalTodos > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Taux de complétion</span>
                <span>{completionRate}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-700`}
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoStats;