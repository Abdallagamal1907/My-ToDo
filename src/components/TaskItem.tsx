import { CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const categoryColors = {
  networks: 'from-emerald-500 to-teal-500',
  design: 'from-rose-500 to-pink-500',
  frontend: 'from-blue-500 to-indigo-500'
};

const categoryLabels = {
  networks: 'Networks & Linux',
  design: 'Graphic Design',
  frontend: 'Frontend Development'
};

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  return (
    <div
      className={`group relative bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-300 hover:shadow-md ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 mt-0.5 transition-all duration-300 ${
            task.completed ? 'text-green-500 scale-110' : 'text-gray-400 hover:text-green-500'
          }`}
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 animate-[bounce_0.5s_ease-in-out]" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[task.category]}`}
            >
              {categoryLabels[task.category]}
            </span>
            <span className="text-xs text-gray-500">45 دقيقة</span>
          </div>
          <p
            className={`text-gray-800 text-right transition-all duration-300 ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.title}
          </p>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
            title="تعديل"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
