'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { deleteTask, toggleTaskComplete, updateTask } from '@/lib/store/tasksSlice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

export function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleEdit = (id: string, title: string, description: string) => {
    dispatch(
      updateTask({
        id,
        title,
        description,
        completed: tasks.find((task) => task.id === id)?.completed || false,
      })
    );
    setEditingTask(null);
    setIsEditDialogOpen(false);
    toast.success('Task updated successfully');
  };

  const handleDelete = (id: string) => {
    setTaskToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
      toast.success('Task deleted successfully');
    }
  };

  const handleToggleComplete = (id: string) => {
    dispatch(toggleTaskComplete(id));
    const task = tasks.find((t) => t.id === id);
    toast.success(`Task marked as ${task?.completed ? 'incomplete' : 'complete'}`);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggleComplete(task.id)}
              />
              <div>
                <h3
                  className={`font-medium ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingTask({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                      });
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <Input
                      value={editingTask?.title || ''}
                      onChange={(e) =>
                        setEditingTask(
                          editingTask
                            ? { ...editingTask, title: e.target.value }
                            : null
                        )
                      }
                      placeholder="Task title"
                    />
                    <Textarea
                      value={editingTask?.description || ''}
                      onChange={(e) =>
                        setEditingTask(
                          editingTask
                            ? { ...editingTask, description: e.target.value }
                            : null
                        )
                      }
                      placeholder="Task description"
                    />
                    <Button
                      onClick={() =>
                        editingTask &&
                        handleEdit(
                          editingTask.id,
                          editingTask.title,
                          editingTask.description
                        )
                      }
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tasks yet. Add some tasks to get started!
        </div>
      )}
    </div>
  );
}