import React from 'react';
import { CheckCircle, Moon, Sun } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Todo Master
              </h1>
              <p className="text-gray-500 text-sm mt-1">Organisez votre vie, une tâche à la fois</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-all duration-300"
              aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">En ligne</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;