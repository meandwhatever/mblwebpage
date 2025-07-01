'use client'

import { useState } from 'react';
import { MessageSquare, Send, Upload, Search, History, List } from 'lucide-react';
import { Button } from './button';

interface AIChatInterfaceProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
}

const AIChatInterface = ({ activeTab,  setActiveTab, chatMessage, setChatMessage }: AIChatInterfaceProps) => {
  const chatHistory = [
    { message: 'Help me classify electronic devices', time: '2 hours ago' },
    { message: 'What\'s the difference between 8471 and 8473?', time: 'Yesterday' },
    { message: 'Find codes for textile products', time: '2 days ago' },
  ];

  const suggestions = [
    'Help me classify a new product',
    'What are the tariff rates for electronics?',
    'Show me recent classification changes',
    'Explain HS code structure',
  ];

  return (
    <div className="w-1/2 border-l border-slate-200 bg-white flex flex-col">
      {/* Chat Messages Area */}
      <div className="h-1/2 p-6 overflow-y-auto border-b border-slate-100">
        <div className="space-y-4">
          {/* AI Welcome Message */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-50 rounded-lg p-4 max-w-md">
              <p className="text-sm text-slate-700">
                Hello! I'm your {activeTab === 'classification' ? 'HS Code Classification' : activeTab === 'documents' ? 'Document Processing' : 'Shipment Tracking'} AI assistant. 
                How can I help you today?
              </p>
            </div>
          </div>

          {/* Quick Action Suggestions */}
          <div className="space-y-2">
            <p className="text-xs text-slate-500 px-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setChatMessage(suggestion)}
                  className="text-xs bg-white border border-slate-200 rounded-full px-3 py-1 hover:bg-slate-50 hover:border-blue-200 transition-colors text-slate-600"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input and Tools */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex space-x-2 mb-4">
          <textarea
            placeholder={`Ask about ${activeTab === 'classification' ? 'HS codes and classifications' : activeTab === 'documents' ? 'document processing' : 'shipment tracking'}...`}
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            className="flex-1 min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            rows={2}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && console.log('Send message:', chatMessage)}
          />
          <Button 
            onClick={() => console.log('Send message:', chatMessage)}
            className="bg-blue-600 hover:bg-blue-700 self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Upload className="w-4 h-4 text-slate-600" />
            <span className="text-sm text-slate-600">Upload File/Image</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-600" />
            <span className="text-sm text-slate-600">Smart Search</span>
          </Button>
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-slate-600" />
            <h3 className="text-sm font-medium text-slate-900">Chat History</h3>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <List className="w-4 h-4 text-slate-600" />
            <span className="text-sm text-slate-600">All</span>
          </Button>
        </div>
        <div className="space-y-3">
          {chatHistory.map((item, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <p className="text-sm text-slate-700 mb-1">{item.message}</p>
              <p className="text-xs text-slate-500">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
