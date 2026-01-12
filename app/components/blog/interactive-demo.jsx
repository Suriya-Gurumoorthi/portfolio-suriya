'use client';

import { useState } from 'react';
import { FaPlay, FaCode } from 'react-icons/fa';

export function CounterDemo() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#16f2b3]/20 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <FaPlay className="text-[#16f2b3]" />
        <h3 className="text-xl font-semibold text-white">Interactive Demo</h3>
      </div>
      <div className="bg-[#0f0f1e] rounded-lg p-6 border border-[#16213e]">
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-[#16f2b3] mb-2">{count}</p>
          <p className="text-gray-400 text-sm">Click the button to increment!</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setCount(count - 1)}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Decrease
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-2 bg-gradient-to-r from-[#16f2b3] to-[#0d9488] hover:from-[#0d9488] hover:to-[#16f2b3] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Increase
          </button>
        </div>
      </div>
    </div>
  );
}

export function TodoDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#16f2b3]/20 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <FaCode className="text-[#16f2b3]" />
        <h3 className="text-xl font-semibold text-white">Todo List Demo</h3>
      </div>
      <div className="bg-[#0f0f1e] rounded-lg p-6 border border-[#16213e]">
        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a todo..."
            className="flex-1 px-4 py-2 bg-[#1a1a2e] border border-[#16213e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#16f2b3] transition-colors"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-gradient-to-r from-[#16f2b3] to-[#0d9488] hover:from-[#0d9488] hover:to-[#16f2b3] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-[#1a1a2e] rounded-lg border border-[#16213e] hover:border-[#16f2b3]/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 text-[#16f2b3] rounded focus:ring-[#16f2b3]"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-gray-500'
                    : 'text-white'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p className="text-center text-gray-500 py-4">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

