import { useState, useMemo } from 'react';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import { DaySchedule, Task, FilterCategory, FilterStatus } from './types';
import { generateSchedule } from './data/scheduleData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DayCard } from './components/DayCard';
import { FilterBar } from './components/FilterBar';
import { TaskModal } from './components/TaskModal';

function App() {
  const [schedule, setSchedule] = useLocalStorage<DaySchedule[]>('learning-schedule', generateSchedule());
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const today = new Date().toISOString().split('T')[0];

  const filteredSchedule = useMemo(() => {
    return schedule
      .map(day => ({
        ...day,
        tasks: day.tasks.filter(task => {
          const categoryMatch = categoryFilter === 'all' || task.category === categoryFilter;
          const statusMatch =
            statusFilter === 'all' ||
            (statusFilter === 'completed' && task.completed) ||
            (statusFilter === 'pending' && !task.completed);
          return categoryMatch && statusMatch;
        })
      }))
      .filter(day => day.isWednesday || day.tasks.length > 0);
  }, [schedule, categoryFilter, statusFilter]);

  const stats = useMemo(() => {
    const allTasks = schedule.flatMap(day => day.tasks);
    const completed = allTasks.filter(t => t.completed).length;
    const total = allTasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }, [schedule]);

  const handleToggleComplete = (taskId: string) => {
    setSchedule(prevSchedule =>
      prevSchedule.map(day => ({
        ...day,
        tasks: day.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }))
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      setSchedule(prevSchedule =>
        prevSchedule.map(day => ({
          ...day,
          tasks: day.tasks.filter(task => task.id !== taskId)
        }))
      );
    }
  };

  const handleSaveTask = (updatedTask: Task) => {
    if (editingTask) {
      setSchedule(prevSchedule =>
        prevSchedule.map(day => ({
          ...day,
          tasks: day.tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          )
        }))
      );
    } else {
      setSchedule(prevSchedule =>
        prevSchedule.map(day =>
          day.date === selectedDate
            ? { ...day, tasks: [...day.tasks, updatedTask] }
            : day
        )
      );
    }
    setEditingTask(null);
  };

  const handleAddTask = (date: string) => {
    setSelectedDate(date);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Engineer Abdalla Gamal
                </h1>
                <p className="text-gray-600 text-right text-lg">
                  جدول التعلم اليومي - من 18 أكتوبر إلى 18 نوفمبر 2025
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">
                  {new Date().toLocaleDateString('ar-EG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">إجمالي المهام</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <Calendar className="w-10 h-10 opacity-50" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm mb-1">المهام المكتملة</p>
                    <p className="text-3xl font-bold">{stats.completed}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 opacity-50" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm mb-1">نسبة الإنجاز</p>
                    <p className="text-3xl font-bold">{stats.percentage}%</p>
                  </div>
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${(stats.percentage / 100) * 125.6} 125.6`}
                        className="transition-all duration-500"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <FilterBar
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          onCategoryChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchedule.map(day => (
            <div key={day.date} className="relative">
              <DayCard
                daySchedule={day}
                isToday={day.date === today}
                onToggleComplete={handleToggleComplete}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
              {!day.isWednesday && (
                <button
                  onClick={() => handleAddTask(day.date)}
                  className="absolute top-4 left-4 p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 opacity-0 hover:opacity-100 group-hover:opacity-100"
                  title="إضافة مهمة"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {filteredSchedule.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">لا توجد مهام تطابق الفلاتر المحددة</p>
          </div>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />
    </div>
  );
}

export default App;
