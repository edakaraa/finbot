'use client';

import React, { useState } from 'react';

interface Message {
  text: string;
  id: number;
  isUser: boolean;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, id: Date.now(), isUser: true };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: input }],
          }),
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        const botMessage = { text: data.response, id: Date.now(), isUser: false };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Chat Error:', error);
        const errorMessage = { text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', id: Date.now(), isUser: false };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-96 h-96 bg-white shadow-lg rounded-t-lg flex flex-col">
      <div className="p-4 bg-gray-100 rounded-t-lg">
        <h3 className="text-lg font-semibold">Sohbet</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded ${
              message.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[80%]`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="mb-2 p-2 bg-gray-100 rounded max-w-[80%]">
            Yazıyor...
          </div>
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-2 border rounded-l"
            placeholder="Mesajınızı yazın..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent; 