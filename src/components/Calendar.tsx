import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  parseISO,
} from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Todo, CalendarDay } from '../types';

interface CalendarProps {
  todos: Todo[];
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ todos, currentDate, onDateSelect }: CalendarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const calendarDays: CalendarDay[] = days.map((date) => ({
    date,
    todos: todos.filter((todo) => {
      if (!todo.dueDate) return false;
      const todoDate = typeof todo.dueDate === 'string' ? parseISO(todo.dueDate) : todo.dueDate;
      return format(todoDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    }),
    isToday: isToday(date),
    isCurrentMonth: isSameMonth(date, currentDate),
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CalendarIcon className="w-6 h-6" />
          {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            onClick={() => onDateSelect(day.date)}
            className={`
              min-h-[100px] p-2 rounded-lg cursor-pointer transition-all
              ${day.isToday ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50'}
              ${!day.isCurrentMonth ? 'opacity-50' : ''}
            `}
          >
            <div className="font-medium text-gray-700">{format(day.date, 'd')}</div>
            <div className="mt-1">
              {day.todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`
                    text-xs p-1 mb-1 rounded truncate
                    ${todo.isMeeting ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}
                  `}
                >
                  {todo.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}