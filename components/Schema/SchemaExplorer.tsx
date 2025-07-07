'use client'

import React, { useState } from 'react';
import { Search, Database, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TableNode from './TableNode';

export default function SchemaExplorer() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  if (!state.schema) {
    return (
      <div className="p-4 text-center">
        <Database className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">No schema loaded</p>
      </div>
    );
  }

  const filteredTables = state.schema.tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search tables..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Tables</h3>
          <span className="text-sm text-gray-500">
            {filteredTables.length} table{filteredTables.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-1">
          {filteredTables.map((table) => (
            <TableNode key={table.name} table={table} />
          ))}
        </div>

        {filteredTables.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500">No tables found matching {`\`${searchTerm}\``}</p>
          </div>
        )}
      </div>

      {state.isLoading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      )}
    </div>
  );
}