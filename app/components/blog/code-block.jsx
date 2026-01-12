'use client';

import { useState, useRef, useEffect } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

// Helper function to extract text from children while preserving line breaks
function getCodeString(children) {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(child => {
      const text = getCodeString(child);
      // Preserve line breaks between array items
      return text;
    }).join('');
  }
  if (children?.props?.children) {
    return getCodeString(children.props.children);
  }
  if (children?.type === 'br' || children === '\n') {
    return '\n';
  }
  if (children?.toString) {
    return children.toString();
  }
  return String(children || '');
}

export default function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  const language = className?.replace('language-', '') || 'text';

  // Get code text from the DOM element to preserve formatting
  const getCodeFromDOM = () => {
    if (codeRef.current) {
      return codeRef.current.textContent || codeRef.current.innerText || '';
    }
    // Fallback to extracting from children
    return getCodeString(children).trim();
  };

  const copyToClipboard = () => {
    const code = getCodeFromDOM();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-[#1a1a2e] rounded-lg border border-[#16213e] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0f0f1e] border-b border-[#16213e]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-400 ml-2 font-mono">{language}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 text-xs text-gray-400 hover:text-[#16f2b3] transition-colors duration-200 rounded hover:bg-[#16213e]"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <FaCheck className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <FaCopy />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        {/* Code Content */}
        <pre className="p-4 overflow-x-auto bg-[#1a1a2e]">
          <code 
            ref={codeRef}
            className={`language-${language} hljs`} 
            {...props}
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}

