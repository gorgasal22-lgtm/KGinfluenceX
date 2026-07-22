import { useState } from 'react'

export default function AiChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if(!input.trim()) return
    setMessages(prev => [...prev, {role: 'user', text: input}])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {role: 'bot', text: 'I am your KG AI Assistant. My full features will be available soon!'}])
    }, 1000)
  }

  return (
    <>
      <button className="kg-chat-fab" onClick={() => setOpen(!open)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
      
      {open && (
        <div className="kg-chat-popup">
          <div className="kg-chat-head">
            <div className="kg-chat-head-title">
              <div>
                <div className="kg-chat-head-name">KG AI ASSISTANT</div>
                <div className="kg-chat-head-status">Online</div>
              </div>
            </div>
            <button className="kg-chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          
          <div className="kg-chat-body">
            {messages.length === 0 && (
              <div className="kg-chat-welcome">
                <div className="kg-chat-welcome-icon">✨</div>
                <div className="kg-chat-welcome-text">Hello! How can I help you with your influencer campaigns today?</div>
                <div className="kg-suggestions">
                  <button className="kg-chat-suggestion" onClick={() => setInput('Find top tech influencers')}>Find top tech influencers</button>
                  <button className="kg-chat-suggestion" onClick={() => setInput('Generate a campaign brief')}>Generate a campaign brief</button>
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'kg-chat-msg-user' : 'kg-chat-msg-bot'}>
                {msg.role === 'bot' && <div className="kg-chat-bot-label">KG AI</div>}
                {msg.text}
              </div>
            ))}
          </div>

          <div className="kg-chat-foot">
            <input 
              type="text" 
              className="kg-chat-inp" 
              placeholder="Ask anything..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button className="kg-chat-send" onClick={handleSend} disabled={!input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
