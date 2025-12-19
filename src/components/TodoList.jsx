import React from 'react';
import TodoItem from './TodoItem';
import { ClipboardCheck, ClipboardX } from 'lucide-react';


const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo, filter }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if(filter === 'high') return todo.priority === 'haute' && !todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="card text-center py-12">
        {filter === 'completed' ? (
          <>
            <ClipboardCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-gray-600 mb-2">Aucune tâche terminée</h3>
            <p className="text-gray-500">Les tâches que vous terminez apparaîtront ici.</p>
          </>
        ) : (
          <>
            <ClipboardX className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-gray-600 mb-2">
              {filter === 'all' ? 'Aucune tâche pour le moment' : 'Aucune tâche correspondante'}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'Commencez par ajouter votre première tâche ci-dessus !' 
                : 'Essayez de modifier vos filtres pour voir plus de tâches.'}
            </p>
          </>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;