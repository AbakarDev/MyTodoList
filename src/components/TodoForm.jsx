import React, { useState } from 'react';
import { PlusCircle, Calendar, Tag, AlertCircle } from 'lucide-react';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('moyenne');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (text.trim() === '') {
      return;
    }
    
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      category: category || null,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    };
    
    addTodo(newTodo);
    setText('');
    setCategory('');
    setDueDate('');
    setPriority('moyenne');
  };
  
  const categories = ['travail', 'personnel', 'courses', 'santé', 'loisirs', 'éducation'];
  
  return (
    <div className="card mb-8">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg mr-3">
          <PlusCircle className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold text-gray-800">Nouvelle Tâche</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="todoText" className="block text-sm font-medium text-gray-700 mb-2">
            Que devez-vous faire ?
          </label>
          <input
            id="todoText"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: Préparer la présentation pour la réunion..."
            className="input-field"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Priorité
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input-field"
            >
              <option value="basse">Basse</option>
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              Catégorie (optionnel)
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              <option value="">Aucune catégorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Date limite (optionnel)
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="btn-primary w-full py-3 flex items-center justify-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Ajouter la tâche
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;