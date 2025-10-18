export interface Task {
  id: string;
  title: string;
  category: 'networks' | 'design' | 'frontend';
  completed: boolean;
}

export interface DaySchedule {
  date: string;
  dayName: string;
  isWednesday: boolean;
  tasks: Task[];
}

export type FilterCategory = 'all' | 'networks' | 'design' | 'frontend';
export type FilterStatus = 'all' | 'completed' | 'pending';
