import { useState, useRef, useEffect } from 'react';

// ─── RAG Chat API call → /api/chat (serverless) ──────────────────────────
// The server handles: Jina embedding → Supabase vector search → Groq LLM
// ─── RAG Chat API call → /api/chat (serverless) ──────────────────────────
// The server handles: Jina embedding → Supabase vector search → Groq LLM
const callChatAPI = async (messages) => {
  const lastMsg = messages[messages.length - 1]?.content;
  console.log('%c🤖 [AI ChatBot] Sending query to backend:', 'color: #3b82f6; font-weight: bold; font-size: 12px;', lastMsg);

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Server error: HTTP ${res.status}`);
  }

  const data = await res.json();

  if (data.debugInfo) {
    console.group('%c🔍 [AI RAG Execution Pipeline Debug Info]', 'color: #10b981; font-weight: bold; font-size: 13px;');
    console.log('1. 📥 User Message:', data.debugInfo.userQuery);
    console.log(`2. 🔤 Vector Embedding (Jina AI jina-embeddings-v3): ${data.debugInfo.embeddingDimensions} float dimensions`);
    console.log('   📐 Embedding Sample Vector:', data.debugInfo.embeddingSnippet);
    console.log(`3. 🗄️ Supabase Vector Database Search (pgvector match_resume_chunks): Found ${data.debugInfo.retrievedChunksCount} matching chunks`);
    if (data.debugInfo.retrievedChunks?.length) {
      console.table(data.debugInfo.retrievedChunks);
    }
    console.log('4. 🤖 Groq LLM Generated Answer:', data.reply);
    console.groupEnd();
  }

  return data.reply ?? "I couldn't generate a response. Please try again.";
};


// ─── Typing indicator ─────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="chatbot-typing">
    <span /><span /><span />
  </div>
);

// ─── Link parser utility ──────────────────────────────────────────────────
const renderMessageContent = (text) => {
  if (!text) return null;

  // Matches either [label](url) OR a standalone url
  const regex = /(\[[\w\s\d.-]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)]+)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // 1. Check if it's a markdown link [Label](url)
    const mdMatch = part.match(/^\[([\w\s\d.-]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (mdMatch) {
      return (
        <a key={index} href={mdMatch[2]} target="_blank" rel="noopener noreferrer" className="chatbot-link">
          {mdMatch[1]}
        </a>
      );
    }

    // 2. Check if it's a raw URL
    const urlMatch = part.match(/^https?:\/\/[^\s)]+$/);
    if (urlMatch) {
      let url = part;
      let trailing = '';
      const lastChar = url.slice(-1);
      if (['.', ',', ';', '!', '?'].includes(lastChar)) {
        url = url.slice(0, -1);
        trailing = lastChar;
      }
      return (
        <span key={index}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="chatbot-link">
            {url}
          </a>
          {trailing}
        </span>
      );
    }

    // 3. Otherwise, render as plain text
    return part;
  });
};

// ─── Message bubble ───────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`chatbot-msg-row ${isUser ? 'chatbot-msg-row--user' : 'chatbot-msg-row--ai'}`}>
      {!isUser && (
        <div className="chatbot-avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
      )}
      <div className={`chatbot-bubble ${isUser ? 'chatbot-bubble--user' : 'chatbot-bubble--ai'}`}>
        {renderMessageContent(msg.content)}
      </div>
    </div>
  );
};

// ─── Suggestion chips ─────────────────────────────────────────────────────
const SUGGESTIONS = [
  "What are Sumanth's core skills?",
  "Tell me about Sumanth's projects",
  "Is Sumanth available for internships?",
  "Tell me about Sumanth's background",
];

// ─── Main ChatBot component ───────────────────────────────────────────────
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Welcome. I am Sumanth's AI Assistant. How may I assist you in reviewing his skills, projects, or professional background?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || isLoading) return;

    setShowSuggestions(false);
    setInput('');

    const userMsg = { role: 'user', content: userText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Only pass user/assistant messages to API (skip system)
      const apiMessages = updatedMessages.filter(m => m.role !== 'system');
      const reply = await callChatAPI(apiMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('ChatBot error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Error: ${err?.message || 'Something went wrong. Please try again.'}`,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      <div className={`chatbot-panel ${isOpen ? 'chatbot-panel--open' : ''}`} aria-live="polite">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-header-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="chatbot-header-name">Sumanth's Assistant</p>
              <p className="chatbot-header-status">
                <span className="chatbot-status-dot" /> Online
              </p>
            </div>
          </div>
          <button className="chatbot-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {isLoading && (
            <div className="chatbot-msg-row chatbot-msg-row--ai">
              <div className="chatbot-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
              <div className="chatbot-bubble chatbot-bubble--ai">
                <TypingDots />
              </div>
            </div>
          )}

          {/* Suggestion chips */}
          {showSuggestions && messages.length === 1 && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chatbot-chip" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            className="chatbot-input"
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={500}
            aria-label="Chat input"
          />
          <button
            className="chatbot-send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Trigger Button */}
      <button
        id="chatbot-trigger"
        className={`chatbot-trigger ${isOpen ? 'chatbot-trigger--open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle AI chat assistant"
        title="Chat with AI Assistant"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <circle cx="9" cy="10" r="1" fill="currentColor"/>
            <circle cx="12" cy="10" r="1" fill="currentColor"/>
            <circle cx="15" cy="10" r="1" fill="currentColor"/>
          </svg>
        )}
        {!isOpen && <span className="chatbot-trigger-pulse" />}
      </button>
    </>
  );
};

export default ChatBot;

