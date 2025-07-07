'use client'

import React from 'react';
import { useApp } from '../context/AppContext';
import { Database } from 'lucide-react';
import QueryOutput from './Output/QueryOutput';

export default function MainContent() {
  const { state } = useApp();

  const renderWelcomeScreen = () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md">
        <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Notebook</h2>
        <p className="text-gray-600 mb-6">
          Connect to a database to start exploring your data schema and running queries.
        </p>
        <div className="grid grid-cols-1 gap-4 text-sm">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-700">Connect to your database</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-gray-600">Browse schema and tables</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-gray-600">Run queries and view results</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQueryResult = () => {
    if (!state.queryResult) return null;
    
    return (
      <div className="h-full p-6">
        <QueryOutput result={state.queryResult} />
      </div>
    );
  };

  const renderLoadingState = () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Executing query...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-white">
      {state.isLoading ? renderLoadingState() : 
       state.queryResult ? renderQueryResult() : 
       renderWelcomeScreen()}
    </div>
  );
}