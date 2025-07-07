'use client'

import React from 'react';
import { Database, Table, MessageSquare, Plug, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SidebarTab } from '../types';
import ConnectorForm from './Connect/ConnectorForm';
import SchemaExplorer from './Schema/SchemaExplorer';
import ChatWindow from './Chat/ChatWindow';

const tabs: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
  { id: 'connect', label: 'Connect', icon: <Plug className="w-4 h-4" /> },
  { id: 'schema', label: 'Schema', icon: <Table className="w-4 h-4" /> },
  { id: 'chat', label: 'Chat', icon: <MessageSquare className="w-4 h-4" /> },
];

export default function Sidebar() {
  const { state, setCurrentTab } = useApp();

  const isTabDisabled = (tabId: SidebarTab) => {
    if (tabId === 'connect') return false;
    if (tabId === 'schema') return !state.connection?.isConnected;
    if (tabId === 'chat') return !state.schema;
    return false;
  };

  const renderTabContent = () => {
    switch (state.currentTab) {
      case 'connect':
        return <ConnectorForm />;
      case 'schema':
        return state.connection?.isConnected ? <SchemaExplorer /> : null;
      case 'chat':
        return state.schema ? <ChatWindow /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900">Notebook</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex" aria-label="Tabs">
          {tabs.map((tab) => {
            const isDisabled = isTabDisabled(tab.id);
            const isActive = state.currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && setCurrentTab(tab.id)}
                disabled={isDisabled}
                className={`
                  flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center space-x-2
                  border-b-2 transition-colors duration-200
                  ${isActive 
                    ? 'border-blue-500 text-blue-600 bg-blue-50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                  ${isDisabled 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'cursor-pointer'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Connection Status */}
      {state.connection?.isConnected && (
        <div className="p-3 bg-green-50 border-b border-green-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700">
              Connected to {state.connection.type}
            </span>
            <ChevronRight className="w-3 h-3 text-green-500" />
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}