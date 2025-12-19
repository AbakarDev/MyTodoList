import React, { useState } from 'react';
import { Check, Trash2, Edit2, Star, Calendar, Tag } from 'lucide-react';

const TodoItem = ({ todo, toggleTodo,deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    if(isEditing && editedText.trim() !== "") {
      editTodo(todo.id, editedText.trim());
    }
    setIsEditing(!isEditing);
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'haute': return 'bg-red-100 text-red-800 border-red-200';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'basse': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getCategoryColor = (category) => {
    switch(category) {
      case 'travail': return 'bg-blue-100 text-blue-800';
      case 'personnel': return 'bg-purple-100 text-purple-800';
      case 'courses': return 'bg-emerald-100 text-emerald-800';
      case 'santé': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`card mb-4 transition-all duration-300 ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => toggleTodo(todo.id)}
            className={`mt-1 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              todo.completed 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                : 'border-2 border-gray-300 hover:border-primary'
            }`}
            aria-label={todo.completed ? "Marquer comme non terminé" : "Marquer comme terminé"}
          >
            {todo.completed && <Check className="h-4 w-4 text-white" />}
          </button>
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={handleEdit}
                className="input-field py-2"
                autoFocus
              />
            ) : (
              <div>
                <p className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.text}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {todo.priority && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(todo.priority)}`}>
                      <Star className="h-3 w-3 mr-1" />
                      {todo.priority}
                    </span>
                  )}
                  
                  {todo.category && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(todo.category)}`}>
                      <Tag className="h-3 w-3 mr-1" />
                      {todo.category}
                    </span>
                  )}
                  
                  {todo.dueDate && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            aria-label="Modifier la tâche"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
            aria-label="Supprimer la tâche"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {todo.completed && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center text-sm text-green-600">
          <Check className="h-4 w-4 mr-1" />
          <span>Terminée le {new Date(todo.completedAt).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
};

export default TodoItem;