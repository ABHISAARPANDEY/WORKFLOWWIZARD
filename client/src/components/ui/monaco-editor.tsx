import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MonacoEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
  className?: string;
}

export function MonacoEditor({ 
  value, 
  onChange, 
  language = 'json', 
  height = '300px', 
  readOnly = false,
  className 
}: MonacoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Simple syntax highlighting for JSON
      const highlighted = highlightJSON(value);
      editorRef.current.innerHTML = highlighted;
    }
  }, [value]);

  const highlightJSON = (json: string) => {
    try {
      const formatted = JSON.stringify(JSON.parse(json), null, 2);
      return formatted
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
          let cls = 'text-blue-400';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'text-purple-400';
            } else {
              cls = 'text-green-400';
            }
          } else if (/true|false/.test(match)) {
            cls = 'text-orange-400';
          } else if (/null/.test(match)) {
            cls = 'text-red-400';
          } else if (/\d/.test(match)) {
            cls = 'text-yellow-400';
          }
          return `<span class="${cls}">${match}</span>`;
        });
    } catch (e) {
      return value;
    }
  };

  return (
    <div 
      className={cn(
        "bg-slate-900 text-slate-100 font-mono text-sm rounded-lg border border-slate-700 overflow-auto",
        className
      )}
      style={{ height }}
    >
      <div
        ref={editorRef}
        className="p-4 whitespace-pre-wrap"
        contentEditable={!readOnly}
        suppressContentEditableWarning
        onInput={(e) => {
          if (onChange && !readOnly) {
            onChange(e.currentTarget.textContent || '');
          }
        }}
      />
    </div>
  );
}
