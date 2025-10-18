import { Coffee } from 'lucide-react';
import { DaySchedule, Task } from '../types';
import { TaskItem } from './TaskItem';

interface DayCardProps {
  daySchedule: DaySchedule;
  isToday: boolean;
  onToggleComplete: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function DayCard({ daySchedule, isToday, onToggleComplete, onEditTask, onDeleteTask }: DayCardProps) {
  const date = new Date(daySchedule.date);
  const formattedDate = date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const completedTasks = daySchedule.tasks.filter(t => t.completed).length;
  const totalTasks = daySchedule.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div
      className={`bg-gradient-to-br ${
        isToday
          ? 'from-amber-50 to-orange-50 border-amber-300 shadow-lg'
          : 'from-white to-gray-50 border-gray-200'
      } border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-xl`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-gray-800">{daySchedule.dayName}</h3>
          {isToday && (
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
              اليوم
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 text-right">{formattedDate}</p>

        {!daySchedule.isWednesday && totalTasks > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>التقدم</span>
              <span>{completedTasks} من {totalTasks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {daySchedule.isWednesday ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <Coffee className="w-16 h-16 text-amber-600 mb-4 animate-bounce" />
          <p className="text-2xl font-bold text-gray-700 text-center">
            استراحة محارب 😄
          </p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            استمتع بيومك واسترح جيداً
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {daySchedule.tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
