'use client'

import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DatabaseConnection } from '../../types';
import { mockSchema } from '../../lib/mockSchema';

interface FormData {
  type: 'postgresql' | 'mysql';
  host: string;
  port: string;
  username: string;
  password: string;
}

export default function ConnectorForm() {
  const { state, setConnection, setSchema, setCurrentTab, setLoading, setError } = useApp();
  const [formData, setFormData] = useState<FormData>({
    type: 'postgresql',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'type' && { port: value === 'postgresql' ? '5432' : '3306' }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const connection: DatabaseConnection = {
        type: formData.type,
        host: formData.host,
        port: parseInt(formData.port),
        username: formData.username,
        password: formData.password,
        isConnected: true,
      };

      setConnection(connection);
      setSchema(mockSchema);
      setCurrentTab('schema');
    } catch (error) {
      console.log(error);
      setError('Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  const isConnected = state.connection?.isConnected;

  return (
    <div className="p-4">
      {isConnected ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Connected Successfully</span>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">Connection Details</h3>
            <div className="space-y-1 text-sm text-green-700">
              <div>Database: {state.connection?.type}</div>
              <div>Host: {state.connection?.host}</div>
              <div>Port: {state.connection?.port}</div>
              <div>Username: {state.connection?.username}</div>
            </div>
          </div>

          <button
            onClick={() => setCurrentTab('schema')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Schema
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Database Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value as 'postgresql' | 'mysql')}
              className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Host
            </label>
            <input
              type="text"
              value={formData.host}
              onChange={(e) => handleInputChange('host', e.target.value)}
              className="w-full px-3 py-2 text-gray-700  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="localhost"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Port
            </label>
            <input
              type="text"
              value={formData.port}
              onChange={(e) => handleInputChange('port', e.target.value)}
              className="w-full px-3 py-2 text-gray-700  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5432"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-3 py-2 text-gray-700  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="postgres"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-3 py-2 text-gray-700  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {state.error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{state.error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {state.isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <span>Connect</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}