import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { ClipboardList } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <ClipboardList className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-primary">Task Manager</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <TaskForm />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          <TaskList />
        </div>
      </div>
    </div>
  );
}