import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface Project {
  id: string;
  name: string;
  code: string;
  preview: string;
  collaborators: string[];
  lastModified: Date;
}

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const projects: Map<string, Project> = new Map();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));

// API Routes
app.post('/api/projects', (req, res) => {
  const { name, code } = req.body;
  const project: Project = {
    id: uuidv4(),
    name,
    code: code || 'export default function Component() {\n  return <div>Hello World</div>;\n}',
    preview: '',
    collaborators: [],
    lastModified: new Date()
  };
  projects.set(project.id, project);
  res.json(project);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.get(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.put('/api/projects/:id', (req, res) => {
  const project = projects.get(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  Object.assign(project, req.body, { lastModified: new Date() });
  projects.set(req.params.id, project);
  
  // Broadcast changes to all connected clients
  io.to(req.params.id).emit('project-updated', project);
  res.json(project);
});

// Socket.IO for real-time collaboration
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-project', (projectId: string) => {
    socket.join(projectId);
    const project = projects.get(projectId);
    if (project) {
      socket.emit('project-data', project);
    }
  });
  
  socket.on('code-change', (data: { projectId: string; code: string }) => {
    const project = projects.get(data.projectId);
    if (project) {
      project.code = data.code;
      project.lastModified = new Date();
      socket.to(data.projectId).emit('code-updated', data.code);
    }
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});