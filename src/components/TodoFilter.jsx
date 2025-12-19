import React from 'react';
import { Filter, ListTodo, CheckCircle, Clock, Star } from 'lucide-react';

const TodoFilter = ({ filter, setFilter }) => {
  const filters = [
    { id: 'all', label: 'Toutes', icon: <ListTodo className="h-4 w-4" />, count: null },
    { id: 'active', label: 'Actives', icon: <Clock className="h-4 w-4" />, count: null },
    { id: 'completed', label: 'Terminées', icon: <CheckCircle className="h-4 w-4" />, count: null },
    { id: 'high', label: 'Priorité haute', icon: <Star className="h-4 w-4" />, count: null },
  ];
  
  return (
    <div className="card mb-6">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg mr-3">
          <Filter className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold text-gray-800">Filtrer les tâches</h2>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              filter === f.id
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{f.icon}</span>
            <span className="font-medium">{f.label}</span>
            {f.count !== null && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filter === f.id ? 'bg-white text-primary' : 'bg-gray-300 text-gray-700'
              }`}>
                {f.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;