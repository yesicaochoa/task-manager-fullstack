# TaskFlow - Beautiful Full-Stack Task Manager

A modern, responsive task management application built with React, TypeScript, Express.js, and SQLite. Features a beautiful Material-UI design with smooth animations and excellent user experience.

![TaskFlow Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=TaskFlow+Task+Manager)

## ✨ Features

- 🎨 **Beautiful Modern UI** - Clean, responsive design with Material-UI components
- 🚀 **Real-time Updates** - Instant task updates with smooth animations
- 📊 **Task Statistics** - Visual progress tracking and completion metrics
- 🏷️ **Categories & Priorities** - Organize tasks with categories and priority levels
- ✅ **Complete CRUD Operations** - Create, read, update, and delete tasks
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎭 **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 💾 **Persistent Storage** - SQLite database for reliable data persistence

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for beautiful components
- **Framer Motion** for smooth animations
- **Axios** for API communication
- **CSS3** with custom styling

### Backend
- **Node.js** with Express.js
- **SQLite3** for database
- **CORS** for cross-origin requests
- **UUID** for unique task IDs

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-fullstack
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend development server (port 3000).

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 📁 Project Structure

```
task-manager-fullstack/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── ...
│   └── package.json
├── server/                 # Express backend
│   ├── index.js           # Main server file
│   ├── tasks.db           # SQLite database (created automatically)
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🎯 Usage

### Creating Tasks
1. Click the "Add Task" button in the header
2. Fill in the task details:
   - **Title** (required): Brief description of the task
   - **Description** (optional): Detailed information
   - **Priority**: Low, Medium, or High
   - **Category**: Choose from predefined categories
3. Click "Create Task"

### Managing Tasks
- **Complete**: Check the checkbox to mark as done
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the delete icon to remove the task
- **View Stats**: See completion progress and task distribution

### Task Categories
- General
- Work
- Personal
- Shopping
- Health
- Learning
- Travel
- Finance

## 🔧 API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update existing task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/health` - Health check

## 🎨 Design Features

### Color Scheme
- Primary: Gradient from #667eea to #764ba2
- Background: #f5f7fa
- Cards: White with subtle shadows
- Priority colors: Red (high), Yellow (medium), Green (low)

### Animations
- Page load animations with staggered delays
- Smooth card hover effects
- Form modal slide-in animations
- Task completion transitions

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Deployment

### Production Build
```bash
# Build the frontend
npm run build

# Start the production server
cd server && npm start
```

### Environment Variables
Create a `.env` file in the server directory:
```
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the beautiful component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [React](https://reactjs.org/) for the amazing frontend framework
- [Express.js](https://expressjs.com/) for the robust backend framework

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

**Made with ❤️ and lots of ☕**
