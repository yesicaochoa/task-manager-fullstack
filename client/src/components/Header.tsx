import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Task as TaskIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface HeaderProps {
  onAddTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <TaskIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" component="div" fontWeight="bold">
              TaskFlow
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Your productivity companion
            </Typography>
          </Box>
        </motion.div>

        <Box flexGrow={1} />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddTask}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Add Task
          </Button>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
