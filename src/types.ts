export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  isMeeting: boolean;
  description?: string;
}

export interface CalendarDay {
  date: Date;
  todos: Todo[];
  isToday: boolean;
  isCurrentMonth: boolean;
}