import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoStats from './components/TodoStats';
import TodoList from './components/TodoList';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  // Utilisation de notre hook personnalisé pour le stockage local
  const [todos, setTodos] = useLocalStorage('todos', [
    {
      id: 1,
      text: 'Apprendre les hooks React avancés',
      completed: true,
      priority: 'haute',
      category: 'éducation',
      dueDate: '2024-12-10',
      createdAt: '2024-12-01T10:00:00Z',
      completedAt: '2024-12-05T15:30:00Z',
    },
    {
      id: 2,
      text: 'Créer un projet React avec Tailwind CSS',
      completed: true,
      priority: 'haute',
      category: 'travail',
      dueDate: '2024-12-15',
      createdAt: '2024-12-02T09:00:00Z',
      completedAt: '2024-12-10T11:45:00Z',
    },
    {
      id: 3,
      text: 'Préparer la présentation pour la réunion',
      completed: false,
      priority: 'haute',
      category: 'travail',
      dueDate: '2024-12-20',
      createdAt: '2024-12-10T14:20:00Z',
    },
    {
      id: 4,
      text: 'Faire les courses de la semaine',
      completed: false,
      priority: 'moyenne',
      category: 'courses',
      dueDate: '2024-12-18',
      createdAt: '2024-12-12T16:45:00Z',
    },
    {
      id: 5,
      text: 'Aller à la salle de sport',
      completed: false,
      priority: 'basse',
      category: 'santé',
      dueDate: '2024-12-16',
      createdAt: '2024-12-13T08:30:00Z',
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Effet pour appliquer le mode sombre
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fonction pour ajouter une nouvelle tâche
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  // Fonction pour basculer l'état d'une tâche
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : null,
          };
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  // Fonction pour supprimer une tâche
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Fonction pour modifier une tâche
  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fonction pour effacer toutes les tâches terminées
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : ''}`}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900 dark:text-gray-100' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="max-w-6xl mx-auto px-4 md:px-8 pb-12">
          <TodoStats todos={todos} />

          <TodoForm addTodo={addTodo} />

          <TodoFilter filter={filter} setFilter={setFilter} />

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">
              Vos tâches
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({todos.filter(t => !t.completed).length} restantes)
              </span>
            </h2>

            {todos.some(todo => todo.completed) && (
              <button
                onClick={clearCompleted}
                className="btn-secondary text-sm"
              >
                Effacer les terminées
              </button>
            )}
          </div>

          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            filter={filter}
          />

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <div className="mb-4 md:mb-0">
                <p className="font-medium">Conseils de productivité :</p>
                <p className="mt-1">Commencez par les tâches de priorité haute pour maximiser votre efficacité.</p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{todos.length}</div>
                  <div className="text-xs">Total tâches</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-500">
                    {todos.length > 0
                      ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100)
                      : 0}%
                  </div>
                  <div className="text-xs">Taux de complétion</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-100 dark:border-gray-800">
          <p>Todo Master © {new Date().getFullYear()} - Organisez votre vie efficacement</p>
          <p className="mt-1">Créé avec React, Tailwind CSS et ❤️</p>
        </footer>
      </div>
    </div>
  );
}

export default App;