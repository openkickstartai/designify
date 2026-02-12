import React, { useEffect, useState, useRef } from 'react';

interface PreviewPaneProps {
  code: string;
  projectId: string;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ code, projectId }) => {
  const [previewContent, setPreviewContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    try {
      // Transform TypeScript/JSX code to executable JavaScript
      const transformedCode = transformCode(code);
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Preview</title>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
            .preview-container { min-height: 100vh; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            const { useState, useEffect } = React;
            
            ${transformedCode}
            
            const App = () => {
              try {
                return React.createElement(Component);
              } catch (err) {
                return React.createElement('div', { style: { color: 'red', padding: '20px' } }, 
                  'Error: ' + err.message
                );
              }
            };
            
            ReactDOM.render(React.createElement(App), document.getElementById('root'));
          </script>
        </body>
        </html>
      `;
      
      setPreviewContent(htmlContent);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  }, [code]);

  const transformCode = (code: string): string => {
    // Basic transformation for demo purposes
    // In production, you'd use a proper TypeScript compiler
    return code
      .replace(/export default function/g, 'function')
      .replace(/export function/g, 'function')
      .replace(/import.*from.*[';"]/g, '')
      .replace(/interface\s+\w+\s*{[^}]*}/g, '')
      .replace(/:\s*\w+/g, '') // Remove type annotations
      .replace(/\?:/g, ':'); // Remove optional property markers
  };

  if (error) {
    return (
      <div className="preview-error" style={{ 
        padding: '20px', 
        color: '#d32f2f', 
        backgroundColor: '#ffebee',
        border: '1px solid #ffcdd2',
        borderRadius: '4px',
        margin: '10px'
      }}>
        <h3>Preview Error</h3>
        <pre>{error}</pre>
      </div>
    );
  }

  return (
    <div className="preview-pane" style={{ height: '100%', border: '1px solid #ccc' }}>
      <div style={{ 
        padding: '8px 12px', 
        backgroundColor: '#f5f5f5', 
        borderBottom: '1px solid #ccc',
        fontSize: '12px',
        color: '#666'
      }}>
        Live Preview - Project: {projectId}
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={previewContent}
        style={{
          width: '100%',
          height: 'calc(100% - 40px)',
          border: 'none',
          backgroundColor: 'white'
        }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};