import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { io, Socket } from 'socket.io-client';

interface CodeEditorProps {
  projectId: string;
  initialCode: string;
  onCodeChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ projectId, initialCode, onCodeChange }) => {
  const socketRef = useRef<Socket | null>(null);
  const editorRef = useRef<any>(null);
  const [code, setCode] = React.useState(initialCode);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    
    socketRef.current.emit('join-project', projectId);
    
    socketRef.current.on('code-updated', (newCode: string) => {
      setCode(newCode);
      if (editorRef.current) {
        editorRef.current.setValue(newCode);
      }
    });
    
    return () => {
      socketRef.current?.disconnect();
    };
  }, [projectId]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onCodeChange(value);
      
      // Debounce socket emission
      clearTimeout(window.codeChangeTimeout);
      window.codeChangeTimeout = setTimeout(() => {
        socketRef.current?.emit('code-change', {
          projectId,
          code: value
        });
      }, 300);
    }
  };

  return (
    <div className="code-editor" style={{ height: '100%', border: '1px solid #ccc' }}>
      <Editor
        height="100%"
        defaultLanguage="typescript"
        value={code}
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true
        }}
      />
    </div>
  );
};

declare global {
  interface Window {
    codeChangeTimeout: number;
  }
}