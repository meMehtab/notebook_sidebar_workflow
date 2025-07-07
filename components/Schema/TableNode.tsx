import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Table, Eye, Key, FileText } from 'lucide-react';
import { Table as TableType } from '../../types';
import { useApp } from '../../context/AppContext';
import { QueryRunner } from '../../lib/queryRunner';

interface TableNodeProps {
  table: TableType;
}

interface Column {
  name: string;
  type: string;
  primaryKey?: boolean;
  nullable?: boolean;
  foreignKey?: boolean;
  unique?: boolean;
  defaultValue?: string | number | null;
  maxLength?: number;
  precision?: number;
  scale?: number;
}

export default function TableNode({ table }: TableNodeProps) {
  const { setQueryResult, setLoading, setError } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handlePreview = async () => {
    setIsPreviewing(true);
    setLoading(true);
    setError(null);

    try {
      const query = `SELECT * FROM ${table.name} LIMIT 10`;
      const result = await QueryRunner.executeQuery(query);
      setQueryResult(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to preview table');
    } finally {
      setLoading(false);
      setIsPreviewing(false);
    }
  };

  const getColumnIcon = (column: Column) => {
    if (column.primaryKey) {
      return <Key className="w-3 h-3 text-yellow-500" />;
    }
    return <FileText className="w-3 h-3 text-gray-400" />;
  };

  const getColumnBadge = (column: Column) => {
    const badges = [];
    if (column.primaryKey) badges.push('PK');
    if (!column.nullable) badges.push('NOT NULL');
    return badges.join(', ');
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-left hover:bg-gray-50 p-1 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <Table className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-900">{table.name}</span>
            <span className="text-xs text-gray-500">
              ({table.columns.length} column{table.columns.length !== 1 ? 's' : ''})
            </span>
          </button>

          <button
            onClick={handlePreview}
            disabled={isPreviewing}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span>{isPreviewing ? 'Loading...' : 'Preview'}</span>
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3 border-t border-gray-100 pt-3">
            <div className="space-y-2">
              {table.columns.map((column) => (
                <div
                  key={column.name}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                >
                  <div className="flex items-center space-x-2">
                    {getColumnIcon(column)}
                    <span className="font-medium text-gray-900">{column.name}</span>
                    <span className="text-gray-500">{column.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getColumnBadge(column) && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {getColumnBadge(column)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}