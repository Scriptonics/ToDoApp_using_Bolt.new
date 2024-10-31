import React from 'react';
import { Check, Clock, Trash2, CalendarClock } from 'lucide-react';
import { Todo } from '../types';
import { format } from 'date-fns';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`
            flex items-center justify-between p-4 rounded-lg shadow-sm transition-all
            ${todo.completed ? 'bg-gray-50' : 'bg-white'}
            ${todo.isMeeting ? 'border-l-4 border-purple-500' : 'border-l-4 border-blue-500'}
          `}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => onToggle(todo.id)}
              className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  todo.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <div>
              <h3
                className={`font-medium ${
                  todo.completed ? 'text-gray-500 line-through' : 'text-gray-700'
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
              )}
              {todo.dueDate && (
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  {todo.isMeeting ? (
                    <CalendarClock className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  {format(new Date(todo.dueDate), 'MMM d, yyyy h:mm a')}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}