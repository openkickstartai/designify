import React, { useState, useEffect } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { PreviewPane } from './components/PreviewPane';
import './App.css';

interface Project {
  id: string;
  name: string;
  code: string;
  preview: string;
  collaborators: string[];
  lastModified: Date;
}

const App: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    // Load existing projects or create a default one
    createNewProject('Welcome Project');
  }, []);

  const createNewProject = async (name: string) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name,
          code: `export default function Component() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Designify!</h1>
      <p>Interactive UI prototyping tool</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Clicked {count} times
      </button>
    </div>
  );
}`
        })
      });
      const project = await response.json();
      setCurrentProject(project);
      setProjects(prev => [...prev, project]);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleCodeChange = async (code: string) => {
    if (!currentProject) return;
    
    try {
      await fetch(`/api/projects/${currentProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      setCurrentProject(prev => prev ? { ...prev, code } : null);
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createNewProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreatingProject(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Designify</h1>
        <div className="project-controls">
          {isCreatingProject ? (
            <div className="create-project">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Project name"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
              />
              <button onClick={handleCreateProject}>Create</button>
              <button onClick={() => setIsCreatingProject(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setIsCreatingProject(true)}>New Project</button>
          )}
        </div>
      </header>
      
      {currentProject ? (
        <div className="workspace">
          <div className="editor-section">
            <h3>Code Editor</h3>
            <CodeEditor
              projectId={currentProject.id}
              initialCode={currentProject.code}
              onCodeChange={handleCodeChange}
            />
          </div>
          <div className="preview-section">
            <h3>Live Preview</h3>
            <PreviewPane
              code={currentProject.code}
              projectId={currentProject.id}
            />
          </div>
        </div>
      ) : (
        <div className="loading">Loading project...</div>
      )}
    </div>
  );
};

export default App;