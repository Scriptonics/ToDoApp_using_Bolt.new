import React, { useState } from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { Calendar } from './components/Calendar';
import { Todo } from './types';
import { CheckCircle2, ListTodo } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const addTodo = (newTodo: Omit<Todo, 'id' | 'completed'>) => {
    setTodos((prev) => [
      ...prev,
      {
        ...newTodo,
        id: crypto.randomUUID(),
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Todo Management */}
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <ListTodo className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-800">Tasks & Meetings</h1>
            </div>
            
            <AddTodo onAdd={addTodo} />

            <div className="space-y-6">
              {activeTodos.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Active</h2>
                  <TodoList
                    todos={activeTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                </div>
              )}

              {completedTodos.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    Completed
                  </h2>
                  <TodoList
                    todos={completedTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Calendar */}
          <div className="lg:w-1/2">
            <Calendar
              todos={todos}
              currentDate={currentDate}
              onDateSelect={setCurrentDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;