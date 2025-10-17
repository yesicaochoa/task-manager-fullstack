import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Checkbox,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          mb: 2,
          opacity: task.completed ? 0.7 : 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 4,
          },
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="flex-start" gap={2}>
            <Checkbox
              checked={task.completed}
              onChange={(e) => onToggleComplete(task.id, e.target.checked)}
              color="primary"
              sx={{ mt: -1 }}
            />
            
            <Box flex={1}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.secondary' : 'text.primary',
                  mb: 1,
                }}
              >
                {task.title}
              </Typography>
              
              {task.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.description}
                </Typography>
              )}
              
              <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                <Chip
                  icon={<FlagIcon />}
                  label={task.priority}
                  color={getPriorityColor(task.priority) as any}
                  size="small"
                  variant="outlined"
                />
                
                {task.category && task.category !== 'general' && (
                  <Chip
                    label={task.category}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                )}
                
                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                  {new Date(task.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            
            <Box display="flex" flexDirection="column" gap={1}>
              <Tooltip title="Edit task">
                <IconButton
                  size="small"
                  onClick={() => onEdit(task)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Delete task">
                <IconButton
                  size="small"
                  onClick={() => onDelete(task.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
