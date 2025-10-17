import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, CreateTaskData, UpdateTaskData } from './types/Task';
import { taskApi } from './services/api';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await taskApi.getAll();
      setTasks(tasksData);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      showSnackbar('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreateTask = async (taskData: CreateTaskData) => {
    try {
      const newTask = await taskApi.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      showSnackbar('Task created successfully!', 'success');
    } catch (err) {
      showSnackbar('Failed to create task', 'error');
    }
  };

  const handleUpdateTask = async (taskData: UpdateTaskData) => {
    if (!editingTask) return;
    
    try {
      const updatedTask = await taskApi.update(editingTask.id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ));
      showSnackbar('Task updated successfully!', 'success');
      setEditingTask(null);
    } catch (err) {
      showSnackbar('Failed to update task', 'error');
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await taskApi.toggleComplete(id, completed);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      showSnackbar(completed ? 'Task completed!' : 'Task marked as pending', 'success');
    } catch (err) {
      showSnackbar('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskApi.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      showSnackbar('Task deleted successfully!', 'success');
    } catch (err) {
      showSnackbar('Failed to delete task', 'error');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  const handleSubmitForm = (taskData: CreateTaskData | UpdateTaskData) => {
    if (editingTask) {
      handleUpdateTask(taskData as UpdateTaskData);
    } else {
      handleCreateTask(taskData as CreateTaskData);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading your tasks...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Header onAddTask={() => setFormOpen(true)} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TaskStats tasks={tasks} />
        </motion.div>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold" color="text.primary">
            Your Tasks
          </Typography>
          
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Box
                textAlign="center"
                py={8}
                color="text.secondary"
              >
                <Typography variant="h6" gutterBottom>
                  No tasks yet
                </Typography>
                <Typography variant="body1">
                  Click "Add Task" to get started with your first task!
                </Typography>
              </Box>
            </motion.div>
          ) : (
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </Paper>
      </Container>

      <TaskForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        task={editingTask}
        isEditing={!!editingTask}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;