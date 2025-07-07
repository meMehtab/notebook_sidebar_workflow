'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';

export default function ChatWindow() {
  const { state, addChatMessage } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      timestamp: new Date(),
      type: 'user',
    };

    addChatMessage(userMessage);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        timestamp: new Date(),
        type: 'system',
      };
      addChatMessage(botResponse);
    }, 500);

    setInputMessage('');
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('table') || lowerMessage.includes('schema')) {
      const tableNames = state.schema?.tables.map(t => t.name).join(', ') || 'none';
      return `I can see the following tables in your schema: ${tableNames}. You can preview any table by clicking the "Preview" button in the Schema tab.`;
    }
    
    if (lowerMessage.includes('query') || lowerMessage.includes('sql')) {
      return `I can help you understand your data! Try previewing tables from the Schema tab to see sample data. The system supports basic SELECT queries with LIMIT clauses.`;
    }
    
    if (lowerMessage.includes('help')) {
      return `Here's what you can do:
      
• Browse tables in the Schema tab
• Preview table data by clicking "Preview"
• View query results in the main area
• Ask me about your database structure

What would you like to explore?`;
    }
    
    return `Thanks for your message! This is a mock chat interface. In a real implementation, this would connect to an AI assistant to help you with database queries and analysis.`;
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium text-gray-900">Database Assistant</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Ask questions about your database schema
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.chatMessages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm">Start a conversation about your database!</p>
            <p className="text-xs mt-1">Try asking about tables, columns, or queries.</p>
          </div>
        ) : (
          state.chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'system' && (
                    <Bot className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  )}
                  {message.type === 'user' && (
                    <User className="w-4 h-4 text-blue-100 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about your database..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}